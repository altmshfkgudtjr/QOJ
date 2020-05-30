import { Header, HeaderEvent } from '../components/board/header.js'
import { Background } from '../components/background.js'
import { ApiUserInfo } from '../controller/user.js'
import { ApiCheckAdmin } from '../controller/creation.js'
import { Creation, CreationEvent } from '../components/creation/creation.js'
import { router } from '../router.js'
import { Snackbar } from '../components/snackbar.js'

const CreationContainer = ()=> {
	let view = `
	${Background()}
	${Header()}
	${Creation()}
	`;

	document.querySelector('#app').innerHTML = view;

	AutoLogin();
}

const CreationContainerEventBinding = ()=> {
	CreationEvent();								// 관리 이벤트 바인딩
}

const AutoLogin = ()=> {
	let tk = sessionStorage.getItem('tk');
	if (tk != null) {
		ApiUserInfo((data)=> {
			HeaderEvent(data);						// Header 이벤트 바인딩
			ApiCheckAdmin(()=> {
				CreationContainerEventBinding();
			});
		});
	} else {
		router._goTo("/");
		Snackbar("Login to unlock QOJ");
	}
}


export { CreationContainer }