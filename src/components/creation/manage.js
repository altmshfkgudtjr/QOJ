import { ApiGetLecture, ApiCreateLecture, ApiUpdateLecture, ApiDeleteLecture } from '../../controller/creation.js'
import { ApiLectureInfo } from '../../controller/lecture.js'
import { Snackbar } from '../snackbar.js'
import { router } from '../../router.js'
import { LoadingOn, LoadingOff } from '../loading.js'

const ManageLecture = ()=> {
	let view = `
		<div class="creation_title noselect">
			<span id="creation_title">분반 생성</span>
			<div id="creation_submit" class="creation_btn pointer">submit&nbsp; <i class="fas fa-arrow-right"></i></div>
			<div id="creation_cancel" class="creation_btn pointer">delete&nbsp; <i class="fas fa-times"></i></div>
		</div>
		<div class="box creation_box noselect">
			<input id="lecture_name" class="creation_lecture_name" type="text" placeholder="Please enter the lecture name." spellcheck="false">
			<div class="creation_title noselect">담당 교수</div>
			<div id="hidden_master" class="display_none"></div>
			<input id="main_manager" class="creation_lecture_name" type="text" placeholder="Professor ID" spellcheck="false">
			<div class="creation_title noselect">분반 관리자</div>
			<div id="creation_sub">
				<input class="creation_lecture_name" type="text" placeholder="Submanager ID" spellcheck="false">
			</div>
			<div id="creation_submanger_btn" class="creation_submanger_btn noselect pointer">+</div>
		</div>
	`;

	return view;
}

const ManageLectureEvent = (lecture_id = '')=> {
	if (lecture_id != '') {						// 분반 수정
		ApiLectureInfo(lecture_id, (data)=> {
			document.querySelector("#lecture_name").value = data['class_name'];
			document.querySelector("#main_manager").value = data['user_id'];
		})
		ApiGetLecture(lecture_id, (data)=> {
			data = data.filter(member => member.uc_type == 1);
			document.querySelector("#creation_sub").innerHTML = "";
			for (let submanager of data) {
				let box = document.createElement('input');
				box.classList.add("creation_lecture_name");
				Object.assign(box, {
					'type': 'text',
					'placeholder': 'Submanager ID',
					'spellcheck': false
				});
				box.value = submanager['user_id'];
				document.querySelector("#creation_sub").append(box);
				[...document.querySelectorAll("#creation_sub .creation_lecture_name")].reverse()[0].focus();
			}
		});
		document.querySelector("#creation_title").textContent = '분반 수정';
		document.querySelector("#creation_submit").innerHTML = `modify&nbsp; <i class="fas fa-arrow-right"></i>`;
		document.querySelector("#creation_submit").addEventListener("click", ()=> {
			CreateCreation(lecture_id);
		});
	} else {									// 분반 생성
		document.querySelector("#creation_submit").innerHTML = `submit&nbsp; <i class="fas fa-arrow-right"></i>`;
		document.querySelector("#creation_submit").addEventListener("click", ()=> {
			CreateCreation();
		});
	}
	// 부 관리자 추가
	document.querySelector("#creation_submanger_btn").addEventListener("click", AppendSubmanager);
	// 취소
	document.querySelector("#creation_cancel").addEventListener("click", ()=> {
		CancelCreation(lecture_id);
	});
}

// 부관리자 추가 Event
const AppendSubmanager = ()=> {
	// 아직 빈 input 값이 있으면 생성안함
	for (let node of document.querySelectorAll("#creation_sub .creation_lecture_name")) {
		if (node.value == '') {
			node.focus();
			Snackbar("Input empty box first.");
			return;
		}
	}
	let submanager = document.createElement('input');
	submanager.classList.add("creation_lecture_name");
	Object.assign(submanager, {
		'type': 'text',
		'placeholder': 'Submanager ID',
		'spellcheck': false
	});
	document.querySelector("#creation_sub").append(submanager);
}

// 분반 생성/수정 취소
const CancelCreation = (lecture_id) => {
	if (!confirm("There is no going back. Please be certain.")) return;
	ApiDeleteLecture(lecture_id, (data)=> {
		router._goTo("/board");
		Snackbar("Lecture deleted successful!");
	});
}

// 분반 생성/수정 제출
const CreateCreation = (lecture_id='')=> {
	let title = document.querySelector("#lecture_name").value;
	let main_manager = document.querySelector("#main_manager").value;
	let sub_managers = [...document.querySelectorAll("#creation_sub .creation_lecture_name")].map(submanager => submanager.value);
	sub_managers = sub_managers.filter(submanager => submanager.length > 0);
	if (title == '') {
		Snackbar("Check the lecture name.");
		document.querySelector("#lecture_name").focus();
		return;
	}
	if (main_manager == '') {
		Snackbar("Check the professor ID.");
		document.querySelector("#main_manager").focus();
		return;
	}
	for (let sub_id of sub_managers) {
		let ch = false;
		for (let user of document.querySelectorAll(".creation_user_box")) {
			if (user.textContent.indexOf(sub_id) != -1) {
				ch = true;
				break;
			}
		}
		if (ch == false) {
			Snackbar(`${sub_id} is not a member.`);
			LoadingOff();
			return;
		}
	}
	if (lecture_id == '') {	// 생성
		ApiCreateLecture(title, main_manager, sub_managers, (data)=> {
			router._goTo("/board");
			Snackbar("Lecture created successful!");
		});
	} else {				// 수정
		ApiUpdateLecture(lecture_id, title, main_manager, sub_managers, (data)=> {
			router._goTo("/board");
			Snackbar("Lecture updated successful!");
		});
	}
}


export { ManageLecture, ManageLectureEvent }