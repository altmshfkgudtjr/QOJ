import { Snackbar } from '../snackbar.js'
import { ApiUserUpdate, ApiUserDelete, ApiUserProblems } from '../../controller/user.js'
import { ProblemEvent } from '../lecture/problem.js'
import { router } from '../../router.js'
import { SelectLayout } from '../lecture/layout.js'
import { MenuUrlCheck } from '../lecture/menu.js'

const User = ()=> {
	let view = `
	<div class="class_container_title noselect wow animated fadeInDown">User Information</div>
	<div class="user_box box noselect wow animated fadeIn" data-wow-duration="2s">
		<div class="user_title">ID / Student Number</div>
		<input id="id" class="user_input" disabled style="cursor: not-allowed;" placeholder="ID / Student Number">
		<div class="user_title">Name</div>
		<input id="name" class="user_input" disabled style="cursor: not-allowed;" placeholder="Name">
		<div class="user_title">E-mail</div>
		<input id="email" class="user_input" type="email" placeholder="E-mail">
		<div class="user_title">Old Password</div>
		<input id="old_pw" class="user_input" type="password" placeholder="Old Password">
		<div class="user_title">New Password</div>
		<input id="pw" class="user_input" type="password" placeholder="New Password">
		<div class="user_title">Confirm Password</div>
		<input id="re_pw" class="user_input" type="password" placeholder="Confirm Password">
		<div id="update" class="user_update_btn noselect pointer">Update&nbsp; <i class="fas fa-wrench"></i></div>
	</div>
	<div class="class_container_title user_delete_account user_info_title noselect wow animated fadeInDown">Delete account</div>
	<div class="user_info wow animated fadeIn" data-wow-duration="2s">Once you delete your account, there is no going back. Please be certain.</div>
	<div class="user_button_box wow animated fadeInDown""><div id="delete_btn" class="user_delete_button noselect pointer">Are you sure?</div></div>
	<div class="class_container_title user_info_title noselect wow animated fadeInDown">Status</div>
	<div class="user_info wow animated fadeIn" data-wow-duration="2s">The feed shows the problems you solved.</div>
	<div id="problems" class="user_problem_cont"></div>
	`;

	return view;
}

const UserEvent = (userinfo)=> {
	document.querySelector("#id").value = userinfo['user_id'];
	document.querySelector("#name").value = userinfo['user_name'];
	document.querySelector("#email").value = userinfo['user_email'];
	[...document.querySelectorAll('.user_input')].map(node => node.addEventListener('keyup', ()=> {
		if (event.keyCode == 13) UserInfoUpdate();
	}));
	document.querySelector("#update").addEventListener("click", UserInfoUpdate);
	document.querySelector("#delete_btn").addEventListener("click", UserDelete);
	UserGetProblem();
}

// 사용자 정보 갱신 함수
const UserInfoUpdate = ()=> {
	let email = document.querySelector("#email").value;
	let old_pw = document.querySelector("#old_pw").value;
	let new_pw = document.querySelector("#pw").value;
	let re_pw = document.querySelector("#re_pw").value;

	if (email == '') {
		document.querySelector("#email").focus();
		Snackbar("Check your E-mail");
		return;
	} else if (email.indexOf('@') == -1) {
		document.querySelector("#email").focus();
		Snackbar("Check your E-mail format");
		return;
	}
	if (old_pw == '') {
		document.querySelector("#old_pw").focus();
		Snackbar("Check your Password");
		return;
	}
	if (new_pw == '') {
		document.querySelector("#pw").focus();
		Snackbar("Re-enter password");
		return;
	}
	if (old_pw == new_pw) {
		document.querySelector("#pw").focus();
		Snackbar("New password is the same as the old one.");
		return;
	}
	if (re_pw == '') {
		document.querySelector("#re_pw").focus();
		Snackbar("Re-enter password");
		return;
	}
	if (new_pw != re_pw) {
		document.querySelector("#re_pw").focus();
		Snackbar("Passwords do not match.");
		return;
	}
	// 사용자 정보 갱신
	ApiUserUpdate(pw, re_pw, email, (data)=> {
		Snackbar("Update Successful!");
		document.querySelector("#old_pw").value = '';
		document.querySelector("#pw").value = '';
		document.querySelector("#re_pw").value = '';
	})
}

// 사용자 탈퇴 함수
const UserDelete = ()=> {
	if (!confirm("Really you want to delete your account?")) {
		return;
	}
	ApiUserDelete((data)=> {
		sessionStorage.removeItem('tk');
		router._goTo("/");
		Snackbar("Thank you to use QOJ!");
	})
}

// 사용자 푼 문제 생성 함수
const UserGetProblem = ()=> {
	ApiUserProblems((data)=> {
		let target = document.querySelector("#problems");
		target.innerHTML = "";
		for (let problem of data) {
			let user_score = problem['up_state'], user_score_color = '';
			if (user_score == null) {
				user_score = 0;
			} else {
				user_score = 100;
				user_score_color = 'content_container_class_score_correct';
			}

			let problem_cont = document.createElement('div');
			problem_cont.classList.add(...['content_container_class', 'box', 'noselect', 'pointer', 'wow', 'animated', 'flipInY']);

			let problem_title = document.createElement('div');
			problem_title.classList.add('content_container_class_title');
			problem_title.textContent = problem['p_title'];
			problem_cont.append(problem_title);

			let problem_score_box = document.createElement('div');
			problem_score_box.classList.add('content_container_class_score_box');
			problem_score_box.innerHTML = `<span>My Score</span><span>/ 100</span><span class="content_container_class_score ${user_score_color}">${user_score}</span></div>`
			problem_cont.append(problem_score_box);

			let problem_arrow = document.createElement('div');
			problem_arrow.classList.add('class_content_arrow');
			problem_arrow.innerHTML = 'solve  <i class="fas fa-arrow-right"></i>';
			problem_cont.append(problem_arrow);
			problem_cont.addEventListener("click", ()=> {
				history.pushState(null,null,location.href.split('lecture')[3]);
				// 문제 View는 시험모드때문에 History가 없음.
				router._goTo(`/lecture#cl?${problem['class_id']}#cn?${problem['pg_id']}`);
				MenuUrlCheck();
				SelectLayout(1);			// Layout 변경
				ProblemEvent(problem['p_id']);
			})

			target.append(problem_cont);
		}
	});
}

export { User, UserEvent }