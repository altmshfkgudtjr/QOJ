import { ApiRunProblem } from '../../controller/lecture.js'
import { RunQuery } from '../lecture/problem.js'

const CodeView = ()=> {
	let view = `
		<div id="shell_cont" class="codeview_cont">
			<div class="shell_box">
				<div class="shell_box_content">
					<div class="problem_info noselect">쿼리 보기</div>
					<div class="shell_code_box">
						<div id="shell_num" class="shell_num_list noselect"><div class="shell_num">1</div></div>
						<div id="shell" class="codeview_shell" contenteditable="false" spellcheck="false"></div>
					</div>
				</div>
			</div>
			<div class="shell_result">
				<div class="shell_result_content">
					<div class="problem_info noselect">실행 결과</div>
					<div id="shell_result"></div>
				</div>
			</div>
		</div>
	`;

	return view;
}


const CodeViewEvent = (data)=> {
	let target = document.querySelector("#content");
	target.innerHTML = CodeView();

	let user_answer = document.createElement('div');
	user_answer.textContent = data['up_query'];
	document.querySelector("#shell").append(user_answer);

	RunQuery();
}



export { CodeViewEvent }