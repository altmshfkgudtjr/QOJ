import { ModifyClassEventBinding, ManageClass } from './manager.js'
import { Snackbar } from '../snackbar.js'
import { ApiInsertClass, ApiUpdateClass, ApiDeleteClass } from '../../controller/manager.js'
import { router } from '../../router.js'
import { ReturnContentForm } from './problem.js'
import { StatusUrlCheck } from './status.js'

const AddClassOne = ()=> {
	let view = `
		<div id="class_modify_box" class="content_container_title noselect">
			${document.querySelector("#menu_title").dataset.name} - <input id="class_title_input" class="content_container_title_input" placeholder="Input class name.">
		</div>
		<div id="class_submit_btn" class="class_modify_btn noselect pointer wow animated fadeInRight">Create&nbsp; <i class="fas fa-arrow-right"></i></div>
	`;

	return view;
}

// 문제집 생성 이벤트
const AddClassOneEvent = (lecture_id)=> {
	// 제출
	document.querySelector("#class_submit_btn").addEventListener("click", ()=> {
		AddClassOneSubmit(lecture_id);
	});
	document.querySelector("#class_title_input").addEventListener("keyup", ()=> {
		if (event.keyCode == 13) {
			AddClassOneSubmit(lecture_id);
		}
	});
	document.querySelector("#class_title_input").focus();
}

// 문제집 생성 제출
const AddClassOneSubmit = (lecture_id)=> {
	// 문제집 제목 검사
	let title = document.querySelector("#class_title_input").value;
	if (title == '') {
		Snackbar("Check the class name.");
		document.querySelector("#class_title_input").focus();
		return;
	}
	ApiInsertClass(lecture_id, title, (data)=> {
		router._goTo(`/manager${location.href.split('/manager')[1]}`);
		Snackbar("Class appended successful!");
	});
}

// 문제집 삭제 이벤트
const DeleteClassOneEvent = (class_id)=> {
	if (!confirm("Are you sure?")) {
		return;
	}
	let lecture_id = null;
	if (location.href.indexOf("#cl?") == -1) {
		router._goTo("/board");
		return;
	} else {
		lecture_id = location.href.split("#cl?")[1].split("#")[0];
	}
	ApiDeleteClass(lecture_id, class_id, (data)=> {
		router._goTo(`/manager${location.href.split('/manager')[1]}`);
		Snackbar("Delete Successful!");
	});
}

// 문제집 수정 이벤트
const ModifyClassOneEvent = (class_id)=> {
	if (document.querySelector("#class_title_input") != null) {
		return;
	}
	// 수정 버튼을 취소버튼으로 바꾸기
	document.querySelector("#class_modify_btn").innerHTML = `cancel&nbsp; <i class="fas fa-undo"></i>`;
	// 분반명 설정
	let target = document.querySelector("#class_title");
	target.classList.add('display_none');
	let title_box = document.createElement('div');
	title_box.id = 'class_modify_box';
	title_box.classList.add(...['content_container_title', 'noselect']);
	title_box.textContent = document.querySelector("#menu_title").dataset.name+' - ';
	let title_input = document.createElement('input');
	title_input.id = 'class_title_input';
	title_input.classList.add(...['content_container_title_input']);
	title_input.value = target.dataset.name;
	title_input.addEventListener("keyup", ()=> {
		if (event.keyCode == 13) {
			ModifyClassOneSubmit(class_id);
		}
	})
	title_box.append(title_input);
	target.after(title_box);
	title_input.focus();

	// 시작-마감시간 설정
	let now = new Date();
	let now2 = new Date();
	// 시작시간 설정
	let start_div_date = document.createElement('input');
	start_div_date.classList.add('content_container_time_input');
	Object.assign(start_div_date, {
		'id': 'time_start_date',
		'type': 'date',
		'min': new Date(now.setFullYear(now.getFullYear()-1)).toISOString().split('T')[0],
		'max': new Date(now.setFullYear(now.getFullYear()+2)).toISOString().split('T')[0]
	});
	let start_div_time = document.createElement('input');
	start_div_time.classList.add('content_container_time_input');
	Object.assign(start_div_time, {
		'id': 'time_start_time',
		'type': 'time'
	});
	if (document.querySelector("#class_start").dataset.date != 'infinite') {
		let before_time = new Date(document.querySelector("#class_start").dataset.date);
		Object.assign(start_div_date, {
			'value': before_time.toISOString().split('T')[0]
		});
		Object.assign(start_div_time, {
			'value': before_time.getHours()+":"+before_time.getMinutes()+":"+before_time.getSeconds()
		});
	}
	// 마감시간 설정
	let end_div_date = document.createElement('input');
	end_div_date.classList.add('content_container_time_input');
	Object.assign(end_div_date, {
		'id': 'time_end_date',
		'type': 'date',
		'min': new Date(now2.setFullYear(now2.getFullYear()-1)).toISOString().split('T')[0],
		'max': new Date(now2.setFullYear(now2.getFullYear()+2)).toISOString().split('T')[0]
	});
	let end_div_time = document.createElement('input');
	end_div_time.classList.add('content_container_time_input');
	Object.assign(end_div_time, {
		'id': 'time_end_time',
		'type': 'time'
	});
	// 시작-마감 시각 데이터가 있을 경우, value 설정
	if (document.querySelector("#class_end").dataset.date != 'infinite') {
		let before_time = new Date(document.querySelector("#class_end").dataset.date);
		Object.assign(end_div_date, {
			'value': before_time.toISOString().split('T')[0]
		});
		Object.assign(end_div_time, {
			'value': before_time.getHours()+":"+before_time.getMinutes()+":"+before_time.getSeconds()
		});
	}
	// 마감시간 역주행을 방지한 이벤트 삽입
	start_div_date.addEventListener('change', LimitEndDate);
	end_div_date.addEventListener('change', LimitEndTime);
	start_div_time.addEventListener('change', LimitEndTime);
	end_div_time.addEventListener('change', LimitEndTime);
	// 시작 시간 삽입
	document.querySelector("#class_start").classList.add('display_none');
	document.querySelector("#class_start").after(start_div_time);
	document.querySelector("#class_start").after(start_div_date);
	// 마감 시간 삽입
	document.querySelector("#class_end").classList.add('display_none');
	document.querySelector("#class_end").after(end_div_time);
	document.querySelector("#class_end").after(end_div_date);
	// 제출 버튼 생성
	let submit_btn = document.createElement('div');
	submit_btn.id = 'class_submit_btn';
	submit_btn.classList.add(...['class_modify_submit', 'noselect', 'pointer']);
	submit_btn.addEventListener("click", ()=> {	// 제출 버튼 이벤트 바인딩
		ModifyClassOneSubmit(class_id);
	})
	submit_btn.innerHTML = `submit&nbsp; <i class="fas fa-arrow-right"></i>`;
	document.querySelector("#content").append(submit_btn);
	// 삭제 버튼 가리기
	document.querySelector("#class_delete_btn").classList.add('display_none');

	// 취소 버튼 이벤트 바인딩
	document.querySelector("#class_modify_btn").addEventListener("click", function CancelModifyClassInfo() {
		// 취소 버튼을 수정 버튼으로 바뀍
		document.querySelector("#class_modify_btn").innerHTML = `modify&nbsp; <i class="fas fa-keyboard"></i>`;
		document.querySelector("#class_modify_box").remove();
		// 분반명 되돌리기
		document.querySelector("#class_title").classList.remove('display_none');
		// 시작시간 되돌리기
		document.querySelector("#time_start_date").remove();
		document.querySelector("#time_start_time").remove();
		document.querySelector("#class_start").classList.remove('display_none');
		// 마감시간 되돌리기
		document.querySelector("#time_end_date").remove();
		document.querySelector("#time_end_time").remove();
		document.querySelector("#class_end").classList.remove('display_none');
		// 제출버튼 제거
		document.querySelector("#class_submit_btn").remove();
		// 삭제버튼 되돌리기
		document.querySelector("#class_delete_btn").classList.remove('display_none');
		// 취소버튼 이벤트 날리고, 수정버튼 이벤트 바인딩
		this.removeEventListener("click", CancelModifyClassInfo);
		this.addEventListener("click", function ModifyClassInfo() {
			ModifyClassEventBinding(class_id);
			this.removeEventListener("click", ModifyClassInfo);
		});
	});
}

// 문제 수정 제출
const ModifyClassOneSubmit = (class_id)=> {
	let lecture_id = null;
	if (location.href.indexOf("#cl?") == -1) {
		router._goTo("/board");
		return;
	} else {
		lecture_id = location.href.split("#cl?")[1].split("#")[0];
	}
	if (document.querySelector("#class_title_input").value == "") {
		Snackbar("Check the class name.");
		document.querySelector("#class_title_input").focus();
		return;
	}
	let title, start_date, start_time, end_date, end_time;
	title = document.querySelector("#class_title_input").value;
	start_date = document.querySelector("#time_start_date").value;
	start_time = document.querySelector("#time_start_time").value;
	start_time = start_date+' '+start_time+':00';
	end_date = document.querySelector("#time_end_date").value;
	end_time = document.querySelector("#time_end_time").value;
	end_time = end_date+' '+end_time+':00';

	// 업데이트 실행
	ApiUpdateClass(lecture_id, class_id, title, start_time, end_time, (data)=> {
		router._goTo(`/manager${location.href.split('/manager')[1]}`);
		Snackbar("Update successful!");
	});
}

// 마감 날짜 제한
const LimitEndDate = ()=> {
	let time = document.querySelector("#time_start_date").value;
	let max_time = new Date(Date.parse(time));
	max_time = new Date(max_time.setFullYear(max_time.getFullYear()+1)).toISOString().split('T')[0];
	Object.assign(document.querySelector("#time_end_date"), {
		'min': time,
		'max': max_time
	});
}
// 마감 시간 제한
const LimitEndTime = ()=> {
	let start_date = document.querySelector("#time_start_date").value;
	let end_date = document.querySelector("#time_end_date").value;
	let start_time = document.querySelector("#time_start_time").value;
	let end_time = document.querySelector("#time_end_time").value;
	if (start_date == '' || end_date == '') return true;
	if (start_date == end_date && start_time != '') {
		Object.assign(document.querySelector("#time_end_time"), {
			'min': start_time
		});
	}
	if (start_date == end_date && end_time != '') {
		Object.assign(document.querySelector("#time_start_time"), {
			'max': end_time
		});
	}
	if (start_date == end_date && start_time != '' && end_time != '' && start_time > end_time) {
		Snackbar(`Set Start-Time before ${end_time}`);
		document.querySelector("#time_start_time").value = end_time;
		return false;
	}
	return true;
}

// 분반 관리 URL Check
const ContentUrlCheck = ()=> {
	if (location.href.split("#cn?")[1] == undefined) {
		return;
	} else {
		let class_id = location.href.split("#cn?")[1];
		if (class_id.indexOf('#') != -1) class_id = class_id.split('#')[0];
		// 이부분 살짝 legacy...
		if (location.href.indexOf('#status') != -1) {
			StatusUrlCheck();
		} else {
			ReturnContentForm();
			ManageClass(class_id);
		}
	}
}

export { AddClassOne, AddClassOneEvent, ModifyClassOneEvent, DeleteClassOneEvent, ContentUrlCheck }