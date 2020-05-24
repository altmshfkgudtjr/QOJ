const Problem = ()=> {
	let view = `
	<div id="problem_cont" class="problem_container">
		<div class="problem_info noselect">문제 설명</div>
		<div class="problem_post">test 데이터베이스 중에서 컴퓨터공학과인 학생들만 조회하고 싶을 때, 쿼리문을 작성하여라.</div>
	</div>
	<div id="handler" class="problem_x_shell"></div>
	<div id="shell_cont" class="shell_container">
		
	</div>
	`;

	return view;
}

const ProblemEvent = (problem_id)=> {
	console.log(problem_id);
	ScreenSizing();
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
	let left_screen = document.querySelector('#problem_cont');
	document.selection ? document.selection.empty() : window.getSelection().removeAllRanges();
	left_screen.style.width  = (e.layerX) + 'px';
}



export { Problem, ProblemEvent }