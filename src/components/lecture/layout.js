import { Content } from './content.js'
import { Problem } from './problem.js'

// 레이아웃 선택 <문제선택: 0, 문제풀이: 1, 시험모드: 2>
const SelectLayout = (type)=> {
	let target = document.querySelector('#board_content');
	let view = ``;
	if (type == 0) {			// 문제선택 Layout
		view = Content();
		target.innerHTML = "";
		target.classList.remove("content_container_flex");
		target.classList.add("content_container_block");
		target.innerHTML = view;

	} else if (type == 1) {		// 문제풀이 Layout
		view = Problem();
		target.innerHTML = "";
		target.classList.remove("content_container_block");
		target.classList.add("content_container_flex");
		target.innerHTML = view;
	}
}

export { SelectLayout }