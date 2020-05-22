import { Header, HeaderEvent } from '../components/board/header.js'
import { Menu, MenuEvent } from '../components/lecture/menu.js'
import { Content, ContentEvent } from '../components/lecture/content.js'
import { Background } from '../components/background.js'

const LectureContainer = ()=> {
	let view = `
	${Background()}
	${Header()}
	<div id="board_container" class="board_container_flex">
		${Menu()}
		${Content()}
	</div>
	`;

	document.querySelector('#app').innerHTML = view;
	LectureContainerEventBinding();
}

const LectureContainerEventBinding = ()=> {
	HeaderEvent();						// Header 이벤트 바인딩
}


export { LectureContainer }