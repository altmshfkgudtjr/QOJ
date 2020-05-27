import { ApiProblem, ApiRunProblem, ApiSubmitProblem } from '../../controller/lecture.js'
import { Snackbar } from '../snackbar.js'

const Problem = ()=> {
	let view = `
	<div id="problem_cont" class="problem_container">
		<div class="problem_container_content">
			<div id="problem_title" class="problem_title"></div>
			<div class="problem_info noselect">문제 설명</div>
			<div id="problem_post" class="problem_post"></div>
		</div>
	</div>
	<div id="handler" class="problem_x_shell"><div class="problem_x_shell_icon"></div></div>
	<div id="shell_cont" class="shell_container">
		<div class="shell_box">
			<div class="shell_box_content">
				<div class="problem_info noselect">쿼리 작성</div>
				<div class="shell_code_box">
					<div id="shell_num" class="shell_num_list noselect"><div class="shell_num">1</div></div>
					<div id="shell" class="shell_mirror" contenteditable="true" spellcheck="false"></div>
				</div>
			</div>
		</div>
		<div class="shell_result">
			<div class="shell_result_content">
				<div class="problem_info noselect">실행 결과</div>
			</div>
		</div>
		<div class="shell_ctl noselect">
			<div id="query_submit" class="shell_btn pointer">Submit <i class="fas fa-arrow-right"></i></div>
			<div id="query_run" class="shell_btn pointer">Run <i class="fas fa-arrow-right"></i></div>
		</div>
	</div>
	`;

	return view;
}

const ProblemEvent = (problem_id)=> {
	ScreenSizing();
	document.querySelector("#shell").focus();
	document.querySelector("#shell").addEventListener("input",()=> {
		ChangeCodeLine();
	});
	ApiProblem(problem_id, (data)=> {
		document.querySelector("#problem_title").textContent = data['p_name'];
		document.querySelector("#problem_post").textContent = data['p_content'];
		if (data['up_query'] == null)
			document.querySelector("#shell").innerHTML = "SELECT * FROM test;";
		else
			document.querySelector("#shell").innerHTML = data['up_query'];
		// 코드 실행 버튼
		document.querySelector("#query_run").addEventListener("click", ()=> {
			RunQuery();
		});
		// 코드 제출 버튼
		document.querySelector("#query_submit").addEventListener("click", ()=> {
			SubmitQuery(data['p_id']);
		});
	});
}


// 코드실행
const RunQuery = ()=> {
	let query = document.querySelector("#shell").textContent.trim().replace(/\s{2,}/gi, ' ');
	ApiRunProblem(query, (data)=> {
		console.log(data);
	});
}

// 코드제출
const SubmitQuery = (problem_id)=> {
	let query = document.querySelector("#shell").textContent.trim();
	console.log(query);
	ApiSubmitProblem(problem_id, query, (data)=> {
		if (data['result'] == 'right') {
			Snackbar("Right Answer!", "green");
		} else if (data['result'] == 'wrong') {
			Snackbar("Wrong Answer", "red");
		}
	});
}

// 화면 분활 크기 조절
const ScreenSizing = ()=> {
	let bar = document.querySelector('#handler');
	bar.addEventListener('mousedown', () => {
	  document.addEventListener('mousemove', drag);
	});

	document.removeEventListener('mouseup', drag_out);
	document.addEventListener('mouseup', drag_out);
}
const drag_out = ()=> {
	document.removeEventListener('mousemove', drag);
}
const drag = (e) => {
	let bar = document.querySelector('#handler');
	let screen = document.querySelector('#shell_cont');
	document.selection ? document.selection.empty() : window.getSelection().removeAllRanges();
	screen.style.width  = (document.querySelector("#board_content").offsetWidth - e.clientX + 300) + 'px';
}

// 코드미러 - Line number 조정
const ChangeCodeLine = ()=> {
	let num = [...document.querySelector("#shell").querySelectorAll('div')].length;	// 실제 줄 수
	let last_num = [...document.querySelectorAll(".shell_num")];
	last_num = last_num.splice(last_num.length-1, 1)[0].textContent*1;				// 표시된 줄 수
	if (num+1 > last_num) {
		do {
			let line = document.createElement('div');
			line.classList.add('shell_num');
			if (document.querySelector("#shell").childNodes[0].nodeType == 3)	// text가 1번째 줄
				line.textContent = last_num+1;
			else
				line.textContent = last_num;
			if ([...document.querySelectorAll('.shell_num')].reverse()[0].textContent != line.textContent) {
				document.querySelector("#shell_num").append(line);
			}
			last_num+=1;
		} while (num+1 > last_num)
	} else if (num+1 < last_num) {
		for (let node of [...document.querySelectorAll('.shell_num')].reverse()) {
			if (node.textContent == num+1) break;
			else if (node.textContent == 1) break;
			else node.remove();
		}
	}
}

export { Problem, ProblemEvent, ChangeCodeLine }