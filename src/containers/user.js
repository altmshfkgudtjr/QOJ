import { Header, HeaderEvent } from '../components/board/header.js'
import { User, UserEvent } from '../components/user/user.js'
import { Background } from '../components/background.js'
import { ApiUserInfo } from '../controller/user.js'
import { router } from '../router.js'
import { Snackbar } from '../components/snackbar.js'

const UserContainer = ()=> {
	let view = `
	${Background()}
	${Header()}
	${User()}
	`;

	document.querySelector('#app').innerHTML = view;

	AutoLogin();
}

const UserContainerEventBinding = (userinfo)=> {
	HeaderEvent(userinfo);						// Header 이벤트 바인딩
	UserEvent(userinfo);
}

const AutoLogin = ()=> {
	let tk = sessionStorage.getItem('tk');
	if (tk != null) {
		ApiUserInfo((data)=> {
			UserContainerEventBinding(data);
		});
	} else {
		router._goTo("/");
		Snackbar("Login to unlock QOJ");
	}
}


export { UserContainer }