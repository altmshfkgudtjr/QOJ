import { Header, HeaderEvent } from '../components/board/header.js'
import { Manager, ManagerEvent } from '../components/manager/manager.js'
import { Background } from '../components/background.js'
import { ApiUserInfo } from '../controller/user.js'
import { router } from '../router.js'
import { Snackbar } from '../components/snackbar.js'

const ManagerContainer = ()=> {
	let view = `
	${Background()}
	${Header()}
	<div id="board_container" class="board_container_flex">
		${Manager()}
	</div>
	`;

	document.querySelector('#app').innerHTML = view;

	AutoLogin();
}

const ManagerContainerEventBinding = (userinfo)=> {
	HeaderEvent(userinfo);						// Header 이벤트 바인딩
	ManagerEvent();								// Manager 이벤트 바인딩
}

const AutoLogin = ()=> {
	let tk = sessionStorage.getItem('tk');
	if (tk != null) {
		ApiUserInfo((data)=> {
			ManagerContainerEventBinding(data);
		});
	} else {
		router._goTo("/");
		Snackbar("Login to unlock QOJ");
	}
}


export { ManagerContainer }