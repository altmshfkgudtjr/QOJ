import { router } from '../../router.js'
import { Snackbar } from '../snackbar.js'
import { Problem, ProblemEvent, ChangeCodeLine } from '../lecture/problem.js'
import { ApiProblem, ApiRunProblem } from '../../controller/lecture.js'
import { ApiInsertProblem, ApiModifyProblem, ApiDeleteProblem, ApiViewProblem } from '../../controller/manager.js'

const ProblemForm = ()=> {
	let view = `
	<div id="problem_cont" class="problem_container">
		<div class="problem_container_content">
			<input id="problem_title" class="problem_title_edit" type="text" autocomplete="off" placeholder="Problem title">
			<div class="problem_info noselect">문제 설명</div>
			<textarea id="problem_post" class="problem_post_edit" placeholder="Problem description"></textarea>
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
			<div id="query_submit" class="shell_btn pointer">Create <i class="fas fa-arrow-right"></i></div>
			<div id="query_run" class="shell_btn pointer">Run <i class="fas fa-arrow-right"></i></div>
			<div id="problem_delete" class="shell_btn shell_btn_delete pointer">Delete <i class="fas fa-times"></i></div>
		</div>
	</div>
	`;
	return view;
}

// 문제 추가 이벤트
const AddProblemEvent = (class_id)=> {
	let target = document.querySelector('#content');
	target.classList.remove("content_container_block");
	target.classList.add("content_container_flex");
	ScreenSizing();
	document.querySelector("#shell").addEventListener("input",()=> { ChangeCodeLine(); });
	document.querySelector("#query_run").addEventListener("click", RunQuery);
	document.querySelector("#problem_delete").remove();
	document.querySelector("#query_submit").addEventListener("click", ()=> {
		AddProblem(class_id)
	});
	// 복붙할 때, 개행은 유지한 채로, style을 제거시켜준다.
	document.querySelector('#shell').addEventListener("paste", function(e) {
		OnPaste_StripFormatting(this, event);
	});
}

// 문제 수정 이벤트
const ModifyProblemEvent = (lecture_id, problem_id)=> {
	let target = document.querySelector('#content');
	target.classList.remove("content_container_block");
	target.classList.add("content_container_flex");
	ScreenSizing();
	document.querySelector("#shell").addEventListener("input",()=> { ChangeCodeLine(); });
	document.querySelector("#query_run").addEventListener("click", RunQuery);
	document.querySelector("#problem_delete").addEventListener("click", ()=> {
		DeleteProblem(problem_id);
	});
	// 문제 내용 호출
	ApiViewProblem(lecture_id, problem_id, (data)=> {
		document.querySelector("#problem_title").value = data['p_title'];
		document.querySelector("#problem_post").value = data['p_content'];
		document.querySelector("#shell").innerHTML = `<div>${data['p_answer']}</div>`;
	});
	document.querySelector("#query_submit").innerHTML = `Modify <i class="fas fa-arrow-right"></i>`;
	document.querySelector("#query_submit").addEventListener("click", ()=> {
		ModifyProblem(problem_id)
	});
	// 복붙할 때, 개행은 유지한 채로, style을 제거시켜준다.
	document.querySelector('#shell').addEventListener("paste", function(e) {
		OnPaste_StripFormatting(this, event);
	});
}

// 문제 생성
const AddProblem = (class_id)=> {
	let title = document.querySelector("#problem_title").value; 
	let post = document.querySelector("#problem_post").value;
	let query = document.querySelector("#shell").textContent.trim().replace(/\s{2,}/gi, ' ');
	if (title == '') {
		Snackbar("Check the title");
		document.querySelector("#problem_title").focus();
		return;
	}
	if (post == '') {
		Snackbar("Check the description");
		document.querySelector("#problem_post").focus();
		return;
	}
	if (query == '') {
		Snackbar("Check the query");
		document.querySelector("#shell").focus();
		return;
	}
	ApiInsertProblem(class_id, title, post, query, (data)=> {
		router._goTo(`/manager${location.href.split("/manager")[1]}`);
		Snackbar("Problem Created Successful!");
	});
}

// 문제 수정
const ModifyProblem = (problem_id)=> {
	let title = document.querySelector("#problem_title").value; 
	let post = document.querySelector("#problem_post").value;
	let query = document.querySelector("#shell").textContent.trim().replace(/\s{2,}/gi, ' ');
	if (title == '') {
		Snackbar("Check the title");
		document.querySelector("#problem_title").focus();
		return;
	}
	if (post == '') {
		Snackbar("Check the description");
		document.querySelector("#problem_post").focus();
		return;
	}
	if (query == '') {
		Snackbar("Check the query");
		document.querySelector("#shell").focus();
		return;
	}
	ApiModifyProblem(problem_id, title, post, query, (data)=> {
		router._goTo(`/manager${location.href.split("/manager")[1]}`);
		Snackbar("Problem Modified Successful!");
	});
}

// 문제 삭제
const DeleteProblem = (problem_id)=> {
	if (!confirm("Are you sure?")) {
		return;
	}
	ApiDeleteProblem(problem_id, (data)=> {
		router._goTo(`/manager${location.href.split("/manager")[1]}`);
		Snackbar("Problem Deleted Successful!");
	})
}

// 쿼리문 실행
const RunQuery = ()=> {
	let lecture_id = null;
	if (location.href.indexOf("#cl?") == -1) {
		router._goTo("/board");
		return;
	} else {
		lecture_id = location.href.split("#cl?")[1].split("#")[0];
	}
	// Enter -> 공백으로, 2칸 이상 공백 -> 한칸 공백으로
	let query = document.querySelector("#shell").textContent.trim().replace(/\s{2,}/gi, ' ');
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

// content box display 되돌리기
const ReturnContentForm = ()=> {
	let target = document.querySelector('#content');
	target.classList.add("content_container_block");
	target.classList.remove("content_container_flex");
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
	screen.style.width  = (document.querySelector("#content").offsetWidth - e.clientX + 300) + 'px';
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

export { ProblemForm, AddProblemEvent, ModifyProblemEvent, ReturnContentForm }