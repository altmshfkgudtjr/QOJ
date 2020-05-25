import { ApiUserLogin } from '../../controller/user.js'
import { Snackbar } from '../snackbar.js'
import { router } from '../../router.js'

const LoginBox = ()=> {
	let view = `
	<div class="box_info noselect wow animated fadeInUp">Query Online Judge 시작하기</div>
	<div class="login_box box noselect wow animated fadeIn">
		<div class="login_title">L O G I N</div>
		<input id="user_id" type="text" class="login_input" placeholder="ID/Student Number" autocompete="on">
		<input id="user_pw" type="password" class="login_input" placeholder="PW">
		<div id="login_submit" class="login_submit pointer">Login</div>
	</div>
	<div class="sql_image_cont noselect">
		<img class="sql_image wow animated jackInTheBox" data-wow-delay="1s" src="/dist/static/images/sql.png">
	</div>
	`;

	return view;
}

const LoginBoxRemove = ()=> {
	document.querySelector(".box_info").classList.remove(...['animated', 'fadeInUp']);
	document.querySelector(".login_box").classList.remove(...['animated', 'fadeInUp']);
	document.querySelector(".box_info").classList.add(...['animated', 'fadeOutUp']);
	document.querySelector(".login_box").classList.add(...['animated', 'fadeOutUp']);
}

const LoginBoxEvent = ()=> {
	document.querySelector("#user_id").focus();

	// Enter 입력
	[...document.querySelector(".login_box").querySelectorAll('input')].map(node => node.addEventListener('keyup', ()=> {
		if (event.keyCode == 13) LoginAction();
	}));
	// 로그인 버튼
	document.querySelector("#login_submit").addEventListener("click", ()=> {
		LoginAction();
	});
}

const LoginAction = ()=> {
	let id = document.querySelector("#user_id").value;
	let pw = document.querySelector("#user_pw").value;
	if (id == '') {
		document.querySelector("#user_id").focus();
		Snackbar("Check your ID");
		return;
	}
	if (pw == '') {
		document.querySelector("#user_pw").focus();
		Snackbar("Check your Password");
		return;
	}
	ApiUserLogin(id, pw, (data)=> {
		sessionStorage.setItem('tk', data);
		router._goTo("/board");
		Snackbar("Login successful!");
	});
}



export { LoginBox, LoginBoxEvent, LoginBoxRemove }