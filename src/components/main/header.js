import { LoginBox, LoginBoxEvent, LoginBoxRemove } from './login_box.js'
import { SignupBox, SignupBoxEvent, SignupBoxRemove } from './signup_box.js'

const Header = ()=> {
	let view = `
	<div class="header noselect">
		<div id="logo" class="logo pointer">Q O J</div>
		<div id="user_signup" class="header_icon pointer">
			<i class="fas fa-user-plus"></i>
			<span>Sign Up</span>
		</div>
		<div id="user_login" class="header_icon pointer">
			<i class="fas fa-sign-in-alt"></i>
			<span>Login</span>
		</div>
	</div>
	`;

	return view;
}

const HeaderEvent = ()=> {
	document.querySelector('#logo').addEventListener("click", ()=> {
		location.href = "/";
	});
	document.querySelector('#user_signup').addEventListener("click", ()=> {
		LoginBoxRemove();
		setTimeout(function() {
			document.querySelector("#sign_box").innerHTML = SignupBox();
			SignupBoxEvent();
		}, 1000);
	});
	document.querySelector('#user_login').addEventListener("click", ()=> {
		SignupBoxRemove();
		setTimeout(function() {
			document.querySelector("#sign_box").innerHTML = LoginBox();
		LoginBoxEvent();
		}, 1000);
	});
}



export { Header, HeaderEvent }