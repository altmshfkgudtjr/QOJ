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
				<div id="shell_result"></div>
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
		document.querySelector("#problem_title").textContent = data['p_title'];
		document.querySelector("#problem_post").textContent = data['p_content'];
		if (data['up_query'] == null)
			document.querySelector("#shell").innerHTML = "";
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
	// 복붙할 때, 개행은 유지한 채로, style을 제거시켜준다.
	document.querySelector('#shell').addEventListener("paste", function(e) {
		OnPaste_StripFormatting(this, event);
	});
}


// 코드실행
const RunQuery = ()=> {
	let lecture_id = null;
	if (location.href.indexOf("#cl?") == -1) {
		router._goTo("/board");
		return;
	} else {
		lecture_id = location.href.split("#cl?")[1].split("#")[0];
	}
	// Enter -> 공백으로, 2칸 이상 공백 -> 한칸 공백으로
	let query = document.querySelector("#shell").innerText.trim().replace(/\n/gi, " ").replace(/\s{2,}/gi, ' ');
	console.log(query);
	ApiRunProblem(query, lecture_id, (data)=> {
		let target = document.querySelector("#shell_result");
		if (typeof(data) == 'string') {
			let result = data;
			target.innerHTML = "";
			target.textContent = result;
		} else {
			let table = document.createElement('table');
			let post = `<thead><tr>`;
			for (let info of Object.keys(data[0])) {
				post += `<th>${info}</th>`;
			}
			post += `</tr></thead>`;

			post += `<tbody>`;
			for (let row of data) {
				post += `<tr>`;
				for (let info of Object.keys(data[0])) {
					post += `<td>${row[info]}</td>`;
				}
				post += `</tr>`;
			}
			post += `</tbody>`

			table.innerHTML = post;

			target.textContent = "";
			target.append(table);
		}
	});
}

// 코드제출
const SubmitQuery = (problem_id)=> {
	let lecture_id = null;
	if (location.href.indexOf("#cl?") == -1) {
		router._goTo("/board");
		return;
	} else {
		lecture_id = location.href.split("#cl?")[1].split("#")[0];
	}
	let query = document.querySelector("#shell").innerText.trim().replace(/\n/gi, " ").replace(/\s{2,}/gi, ' ');
	ApiSubmitProblem(lecture_id, problem_id, query, (data)=> {
		if (data == true) {
			Snackbar("Right Answer!", "green");
		} else if (data == false) {
			Snackbar("Wrong Answer", "red");
		} else {
			Snackbar("Wrong Answer", "red");
			let result = data;
			document.querySelector("#shell_result").innerHTML = "";
			document.querySelector("#shell_result").textContent = result;
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

// 복붙할 때, 개행은 유지한 채로, style을 제거시켜준다.
let _onPaste_StripFormatting_IEPaste = false;
function OnPaste_StripFormatting(elem, e) {

    if (e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData) {
        e.preventDefault();
        var text = e.originalEvent.clipboardData.getData('text/plain');
        window.document.execCommand('insertText', false, text);
    }
    else if (e.clipboardData && e.clipboardData.getData) {
        e.preventDefault();
        var text = e.clipboardData.getData('text/plain');
        window.document.execCommand('insertText', false, text);
    }
    else if (window.clipboardData && window.clipboardData.getData) {
        // Stop stack overflow
        if (!_onPaste_StripFormatting_IEPaste) {
            _onPaste_StripFormatting_IEPaste = true;
            e.preventDefault();
            window.document.execCommand('ms-pasteTextOnly', false);
        }
        _onPaste_StripFormatting_IEPaste = false;
    }

}


export { Problem, ProblemEvent, ChangeCodeLine, RunQuery }