import { router } from '../../router.js'
import { ApiLectureList, ApiProblemsInfo, ApiLectureProblems } from '../../controller/lecture.js'
import { ApiActivateClass, ApiInsertDatabase } from '../../controller/manager.js'
import { ProblemForm, AddProblemEvent, ModifyProblemEvent, ReturnContentForm } from './problem.js'
import { AddClassOne, ModifyClassOne, DeleteClassOneEvent, AddClassOneEvent, ModifyClassOneEvent } from './classes.js'
import { Snackbar } from '../snackbar.js'

const Manager = ()=> {
	let view = `
		<div class="menu">
			<div id="menu_title" class="menu_title noselect" data-name="">Loading..</div>
			<div id="menu"></div>
			<div id="lecture_manage_btn" class="lecture_add_btn noselect pointer">+</div>
			<div id="sql_btn" class="sql_btn noselect pointer">.sql push&nbsp;&nbsp;<i class="fas fa-file-upload"></i></div>
			<input id="sql_file" type="file" class="display_none" accept=".sql">
		</div>
		<div id="content" class="content_container_block">
			<div class="manager_empty_box noselect wow animated zoomIn">Welcome to management of class!</div>
		</div>
	`;
	return view;
}

const ManagerEvent = ()=> {	
	let lecture_id = null;
	if (location.href.indexOf("#cl?") == -1) {
		router._goTo("/board");
		return;
	} else {
		lecture_id = location.href.split("#cl?")[1].split("#")[0];
	}
	// 해당 분반 주차 반환
	ApiLectureList(lecture_id, (data)=> {
		document.querySelector("#menu_title").dataset.name = data[0]['class_name'];
		document.querySelector("#menu_title").textContent = data[0]['class_name'];
		let target = document.querySelector("#menu");
		target.innerHTML = "";	// 메뉴 초기화
		for (let row of data) {
			let lecture = document.createElement('div');
			lecture.classList.add(...['menu_item', 'noselect','pointer']);
			lecture.textContent = row['pg_name'];
			lecture.addEventListener("click", ()=> {
				// 문제 작성/수정 중 나가기
				if (document.querySelector("#shell") != null) {
					if (!confirm("WARNING! What you wrote is not saved! Don't change your determine?")) {
						return;
					}
				}
				ReturnContentForm();
				ManageClass(row['pg_id']);
			});
			target.append(lecture);
		}
	});
	// 주차 추가 이벤트
	document.querySelector("#lecture_manage_btn").addEventListener("click", ()=>{
		// 문제 작성/수정 중 나가기
		if (document.querySelector("#shell") != null) {
			if (!confirm("WARNING! What you wrote is not saved! Don't change your determine?")) {
				return;
			}
		}
		ReturnContentForm();
		AddClassEventBinding(lecture_id);
	});
	// sql 파일 업로드 이벤트
	document.querySelector("#sql_btn").addEventListener("click", UploadSQL);
	document.querySelector("#sql_file").addEventListener("change", UploadSQLEvent, false);
}

// 주차 관리
const ManageClass = (class_id)=> {
	let target = document.querySelector("#content");
	target.innerHTML = "";
	// 문제집 정보 반환
	new Promise((resolve, reject)=> {
		ApiProblemsInfo(class_id, (data)=> {
			let title_box = document.createElement("div");
			title_box.id = 'class_title';
			title_box.classList.add(...['content_container_title', 'noselect']);
			title_box.dataset.name = data['pg_name'];
			title_box.textContent = document.querySelector("#menu_title").dataset.name+' - '+data['pg_name'];
			target.append(title_box);

			let time_box = document.createElement('div');
			time_box.classList.add(...['content_container_time_cont', 'noselect']);
			let start = null, end = null;
			if (data['pg_exam_start'] != null) {
				start = new Date(data['pg_exam_start']);
				start = start.getFullYear()+'-'+(start.getMonth()*1+1)+'-'+start.getstart()+" "+start.getHours()+":"+start.getMinutes()+":"+start.getSeconds();
			} else {
				start = "Infinite";
			}
			if (data['pg_exam_end'] != null) {
				end = new Date(data['pg_exam_end']);
				end = end.getFullYear()+'-'+(end.getMonth()*1+1)+'-'+end.getstart()+" "+end.getHours()+":"+end.getMinutes()+":"+end.getSeconds();
			} else {
				end = "Infinite";
			}
			let start_date = new Date(data['pg_exam_start']);
			if (data['pg_exam_start'] == null) {
				start_date = 'infinite';
			}
			let end_date = new Date(data['pg_exam_start']);
			if (data['pg_exam_end'] == null) {
				end_date = 'infinite';
			}

			time_box.innerHTML = `
				<div>Start Time : <span id="class_start" data-date="${start_date}">${start}</span><div>
				<div>End Time : <span id="class_end" data-date="${end_date}">${end}</span><div>
			`;
			target.append(time_box);

			let class_activate = document.createElement('div');
			class_activate.classList.add(...['class_activate_box', 'noselect', 'wow', 'animated', 'fadeInRight']);
			class_activate.innerHTML = `
				Activate&nbsp;&nbsp;
				<label class="class_activate">
					<input id="class_activate" type="checkbox" checked>
					<span class="class_activate_slider"></span>
				</label>
			`;
			target.append(class_activate);
			document.querySelector("#class_activate").addEventListener('change', ()=> {
				ActivateClass(class_id);
			});

			let problem_box = document.createElement('div');
			problem_box.id = "class_container";
			problem_box.classList.add(...['content_container_class_cont', 'noselect']);
			target.append(problem_box);

			let setting_btn = document.createElement('div');
			setting_btn.id = 'class_modify_btn';
			setting_btn.classList.add(...['class_modify_btn', 'noselect', 'pointer', 'wow', 'animated', 'fadeInRight']);
			setting_btn.innerHTML = `modify&nbsp; <i class="fas fa-keyboard"></i>`;
			setting_btn.addEventListener("click", function ModifyClassInfo() {
				ModifyClassEventBinding(class_id);
				this.removeEventListener("click", ModifyClassInfo);
			});
			target.append(setting_btn);

			let delete_btn = document.createElement('div');
			delete_btn.id = 'class_delete_btn';
			delete_btn.classList.add(...['class_delete', 'noselect', 'pointer', 'wow', 'animated', 'fadeInRight']);
			delete_btn.innerHTML = `delete&nbsp;&nbsp; <i class="fas fa-times"></i>`;
			delete_btn.addEventListener("click", ()=> {
				DeleteClassOneEvent(class_id);
			});
			target.append(delete_btn);

			resolve(data['class_id']);
		});
	}).then((class_id)=> {
		// 해당 주차 문제 반환
		ApiLectureProblems(class_id, (data)=> {
			let target = document.querySelector("#class_container");
			target.innerHTML = "";
			for (let problem of data) {
				let problem_cont = document.createElement('div');
				problem_cont.classList.add(...['content_container_class', 'box', 'noselect', 'pointer', 'wow', 'animated', 'flipInY']);

				let problem_title = document.createElement('div');
				problem_title.classList.add('content_container_class_title');
				problem_title.textContent = problem['p_name'];
				problem_cont.append(problem_title);

				let problem_arrow = document.createElement('div');
				problem_arrow.classList.add(...['class_content_arrow', 'arrow_yellow']);
				problem_arrow.innerHTML = 'modify  <i class="fas fa-arrow-right"></i>';
				problem_cont.append(problem_arrow);
				problem_cont.addEventListener("click", ()=> {
					ModifyProblemEventBinding(problem['p_id']);
				});

				target.append(problem_cont);
			}
			// 문제 추가 버튼
			let problem_cont = document.createElement('div');
			problem_cont.classList.add(...['problem_add_btn', 'noselect', 'pointer', 'wow', 'animated', 'fadeIn']);
			problem_cont.textContent = '+';

			problem_cont.addEventListener("click", ()=> {
				AddProblemEventBinding(class_id);
			});

			target.append(problem_cont);
		});
	})
}

// 주차 추가
const AddClassEventBinding = (lecture_id)=> {
	document.querySelector("#content").innerHTML = AddClassOne();
	AddClassOneEvent(lecture_id);
}

// 주차 수정
const ModifyClassEventBinding = (class_id)=> {
	ModifyClassOneEvent(class_id);
}

// 문제 추가
const AddProblemEventBinding = (class_id)=> {
	document.querySelector("#content").innerHTML = ProblemForm();
	AddProblemEvent(class_id);
}

// 문제 수정
const ModifyProblemEventBinding = (problem_id)=> {
	document.querySelector("#content").innerHTML = ProblemForm();
	ModifyProblemEvent(problem_id);
}

// 주차 활성화/비활성화
const ActivateClass = (class_id)=> {
	let activate = document.querySelector("#class_activate").checked;
	ApiActivateClass(class_id, activate);
}

// sql 파일 업로드
const UploadSQL = ()=> {
	document.querySelector("#sql_file").click();
}

// sql 파일 업로드 이벤트
const UploadSQLEvent = ()=> {
	if (document.querySelector("#sql_file").files.length > 1) {
		Snackbar("Upload only one file.");
		return;
	}
	const sql = document.querySelector("#sql_file").files[0];
	// sql 외 다른 파일 제외
	if (sql.name.split('.')[sql.name.split('.').length-1] != 'sql') {
		Snackbar("Upload only SQL file.");
		return;
	}
	// 파일 사이즈 검사 : 10MB
	if (sql.size > (10 * 1024 * 1024)) {
		Snackbar("The file size is too large.");
		return;
	}
	let lecture_id = null;
	if (location.href.indexOf("#cl?") == -1) {
		router._goTo("/board");
		return;
	} else {
		lecture_id = location.href.split("#cl?")[1].split("#")[0];
	}
	ApiInsertDatabase(lecture_id, sql, (data)=> {
		Snackbar("SQL file applied successful!");
	})
}




export { Manager, ManagerEvent, ModifyClassEventBinding }