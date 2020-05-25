import { router } from '../../router.js'
import { Snackbar } from '../snackbar.js'

const Header = ()=> {
	let view = `
	<div class="header noselect">
		<div id="logo" class="logo pointer">Q O J</div>
		<div id="logout" class="header_icon pointer">
			<i class="fas fa-sign-out-alt"></i>
			<span>Logout</span>
		</div>
		<div id="user_info" class="header_icon pointer">
			<i class="fas fa-user"></i>
			<span>Unknown</span>
		</div>
	</div>
	`;

	return view;
}

const HeaderEvent = (userinfo)=> {
	document.querySelector("#user_info").querySelector("span").textContent = userinfo.user_id;

	document.querySelector('#logo').addEventListener("click", ()=> {
		router._goTo(router._pathFor("Home"));
	});
	document.querySelector('#user_info').addEventListener("click", ()=> {
		console.log("내정보");
	});
	document.querySelector('#logout').addEventListener("click", ()=> {
		sessionStorage.removeItem('tk');
		router._goTo(router._pathFor("Home"));
		Snackbar('Logout successful.');
	});
}



export { Header, HeaderEvent }