import { ApiGetAllManager } from '../../controller/creation.js'


const UserCont = ()=> {
	let view = `
	<div class="creation_title_user noselect">사용자 검색</div>
	<input id="creation_input_user" class="creation_input_user" spellcheck="false" placeholder="Input User ID/Student ID">
	<div id="user_cont" class="creation_user_cont"></div>
	`;

	return view;
}

const UserContEvent = ()=> {
	InserAllUser();		// 모든 사용자 조회
	document.querySelector("#creation_input_user").addEventListener("keyup", ()=> {
		SearchUser();
	})
}

// 사용자 간편 검색
const SearchUser = ()=> {
	let text = document.querySelector("#creation_input_user").value;
	[...document.querySelectorAll(".creation_user_box")].map(user => user.classList.remove("display_none"));
	for (let user of document.querySelectorAll(".creation_user_box")) {
		if (user.textContent.indexOf(text) == -1) {
			user.classList.add("display_none");
		}
	}
}

// 모든 사용자 조회
const InserAllUser = ()=> {
	ApiGetAllManager((data)=> {
		let target = document.querySelector('#user_cont');
		target.innerHTML = ``
		for (let user of data) {
			let box = document.createElement('div');
			box.classList.add(...['creation_user_box']);
			box.innerHTML = `
				<div class="creation_user_box_set">
					<div class="creation_user_box_title noselect">ID</div>
					<div class="creation_user_box_info">${user['user_id']}</div>
				</div><div class="creation_user_box_set">
					<div class="creation_user_box_title noselect">Name</div>
					<div class="creation_user_box_info">${user['user_name']}</div>
				</div>
			`;
			target.append(box);
		}
	});
}


export { UserCont, UserContEvent }