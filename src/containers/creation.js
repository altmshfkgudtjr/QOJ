import { Header, HeaderEvent } from '../components/board/header.js'
import { Background } from '../components/background.js'
import { ApiUserInfo } from '../controller/user.js'
import { router } from '../router.js'
import { Snackbar } from '../components/snackbar.js'

const CreationContainer = ()=> {
	let view = `
	${Background()}
	${Header()}
	
	`;

	document.querySelector('#app').innerHTML = view;

	AutoLogin();
}

const CreationContainerEventBinding = (userinfo)=> {
	HeaderEvent(userinfo);						// Header 이벤트 바인딩
}

const AutoLogin = ()=> {
	let tk = sessionStorage.getItem('tk');
	if (tk != null) {
		ApiUserInfo((data)=> {
			CreationContainerEventBinding(data);
		});
	} else {
		router._goTo("/");
		Snackbar("Login to unlock QOJ");
	}
}


export { CreationContainer }