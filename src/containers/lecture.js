import { Header, HeaderEvent } from '../components/board/header.js'
import { Menu, MenuUrlCehck } from '../components/lecture/menu.js'
import { Background } from '../components/background.js'
import { ApiUserInfo } from '../controller/user.js'
import { SelectLayout } from '../components/lecture/layout.js'

const LectureContainer = ()=> {
	let view = `
	${Background()}
	${Header()}
	<div id="board_container" class="board_container_flex">
		${Menu()}
		<div id="board_content" class="content_container_block">
		</div>
	</div>
	`;

	document.querySelector('#app').innerHTML = view;

	SelectLayout(0);	// 문제선택 Layout
	AutoLogin();
}

const LectureContainerEventBinding = (userinfo)=> {
	HeaderEvent(userinfo);						// Header 이벤트 바인딩
	MenuUrlCehck();
}

const AutoLogin = ()=> {
	let tk = sessionStorage.getItem('tk');
	if (tk != null) {
		ApiUserInfo((data)=> {
			LectureContainerEventBinding(data);
		});
	}
}


export { LectureContainer }