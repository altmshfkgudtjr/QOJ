import { Header, HeaderEvent } from '../components/board/header.js'
import { Class, ClassEvent } from '../components/board/class.js'
import { Background } from '../components/background.js'
import { ApiUserInfo } from '../controller/user.js'
import { router } from '../router.js'
import { Snackbar } from '../components/snackbar.js'


const BoardContainer = ()=> {
	let view = `
	${Background()}
	${Header()}
	<div id="board_container" class="board_container_box">
		${Class()}
	</div>
	`;

	document.querySelector('#app').innerHTML = view;
	AutoLogin();
}

const BoardContainerEventBinding = (userinfo)=> {
	HeaderEvent(userinfo);						// Header 이벤트 바인딩
	ClassEvent(userinfo);						// Class 이벤트 바인딩
}

const AutoLogin = ()=> {
	let tk = sessionStorage.getItem('tk');
	if (tk != null) {
		ApiUserInfo((data)=> {
			BoardContainerEventBinding(data);
		});
	} else {
		router._goTo("/");
		Snackbar("Login to unlock QOJ");
	}
}

export { BoardContainer }