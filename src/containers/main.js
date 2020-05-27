import { Header, HeaderEvent } from '../components/main/header.js'
import { LoginBox, LoginBoxEvent } from '../components/main/login_box.js'
import { Background } from '../components/background.js'
import { router } from '../router.js'


const MainContainer = ()=> {
	let view = `
	${Background()}
	${Header()}
	<div id="sign_box">
		${LoginBox()}
	</div>
	`;

	document.querySelector('#app').innerHTML = view;
	MainContainerEventBinding();
}


const MainContainerEventBinding = ()=> {
	if (sessionStorage.getItem('tk') != undefined) {
		router._goTo("/board");
		return;
	}
	HeaderEvent();						// Header 이벤트 바인딩
	LoginBoxEvent();					// MainBox 이벤트 바인딩
}


export { MainContainer }