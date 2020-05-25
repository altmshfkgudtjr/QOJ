import { ApiUserSignUp } from '../../controller/user.js'
import { Snackbar } from '../snackbar.js'
import { router } from '../../router.js'

const SignupBox = ()=> {
	let view = `
	<div class="box_info noselect wow animated fadeInUp">Query Online Judge 가입하기</div>
	<div class="login_box box noselect wow animated fadeIn">
		<div class="login_title">S I G N &nbsp&nbsp U P</div>
		<input id="user_id" type="text" class="login_input" placeholder="ID/Student Number" autocompete="off">
		<input id="user_pw" type="password" class="login_input" placeholder="Password">
		<input id="user_pw_re" type="password" class="login_input" placeholder="Re-Password">
		<input id="user_name" type="text" class="login_input" placeholder="Name" autocompete="off">
		<input id="user_mail" type="email" class="login_input" placeholder="E-mail" autocompete="on">
		<div id="signup_submit" class="login_submit pointer">Sign Up</div>
	</div>
	`;
	return view;
}

const SignupBoxRemove = ()=> {
	document.querySelector(".box_info").classList.remove(...['animated', 'fadeInUp']);
	document.querySelector(".login_box").classList.remove(...['animated', 'fadeInUp']);
	document.querySelector(".box_info").classList.add(...['animated', 'fadeOutUp']);
	document.querySelector(".login_box").classList.add(...['animated', 'fadeOutUp']);
}

const SignupBoxEvent = ()=> {
	document.querySelector("#user_id").focus();

	// Enter 입력
	[...document.querySelector(".login_box").querySelectorAll('input')].map(node => node.addEventListener('keyup', ()=> {
		if (event.keyCode == 13) SignupAction();
	}));
	// 회원가입 버튼 
	document.querySelector("#signup_submit").addEventListener("click", ()=> {
		SignupAction();
	});
}

const SignupAction = ()=> {
	let id = document.querySelector("#user_id").value;
	let pw = document.querySelector("#user_pw").value;
	let pw_re = document.querySelector("#user_pw_re").value;
	let name = document.querySelector("#user_name").value;
	let email = document.querySelector("#user_mail").value;
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
	if (pw_re == '') {
		document.querySelector("#user_pw_re").focus();
		Snackbar("Re-enter password");
		return;
	}
	if (pw != pw_re) {
		document.querySelector("#user_pw_re").focus();
		Snackbar("Passwords do not match.");
		return;
	}
	if (name == '') {
		document.querySelector("#user_name").focus();
		Snackbar("Check your name");
		return;
	}
	if (email == '') {
		document.querySelector("#user_mail").focus();
		Snackbar("Check your E-mail");
		return;
	} else if (email.indexOf('@') == -1) {
		document.querySelector("#user_mail").focus();
		Snackbar("Check your E-mail format");
		return;
	}
	ApiUserSignUp(id, pw, name, email, (data)=> {
		if (data == 'exist user') {
			Snackbar("This user already exists.");
			return;
		}
		sessionStorage.setItem('tk', data);
		router._goTo("/board");
		Snackbar(`Hello! ${id}`);
	});
}
export { SignupBox, SignupBoxEvent, SignupBoxRemove }