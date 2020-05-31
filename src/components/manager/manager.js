import { router } from '../../router.js'
import { ApiLectureInfo, ApiLectureList, ApiProblemsInfo, ApiLectureProblems } from '../../controller/lecture.js'
import { ApiActivateClass, ApiActivateExam, ApiInsertDatabase, ApiGetDatabase, ApiDeleteDatabase, ApiUpdateLectureMember } from '../../controller/manager.js'
import { ApiGetLecture  } from '../../controller/creation.js'
import { ProblemForm, AddProblemEvent, ModifyProblemEvent, ReturnContentForm } from './problem.js'
import { AddClassOne, ModifyClassOne, DeleteClassOneEvent, AddClassOneEvent, ModifyClassOneEvent } from './classes.js'
import { Snackbar } from '../snackbar.js'
import { UserCont, UserContEvent } from '../creation/user.js'
import { StatusEvent } from './status.js'

const Manager = ()=> {
	let view = `
		<div class="menu">
			<div id="menu_title" class="menu_title noselect pointer" data-name="">Loading..</div>
			<div id="menu"></div>
			<div id="lecture_manage_btn" class="lecture_add_btn noselect pointer">+</div>
			<div id="user_btn" class="sql_btn noselect pointer">User management&nbsp;&nbsp;<i class="fas fa-users"></i></div>
		</div>
		<div id="content" class="content_container_block">
			<div class="manager_empty_box noselect wow animated zoomIn">Welcome to management of class!</div>
		</div>
		<div class="database_menu">
			<div class="menu_title noselect" data-name="">Using DB Tables</div>
			<div id="database_menu"></div>
			<div id="sql_btn" class="sql_btn noselect pointer">.sql push&nbsp;&nbsp;<i class="fas fa-file-upload"></i></div>
			<input id="sql_file" type="file" class="display_none" accept=".sql">
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
		ApiLectureInfo(lecture_id, (data)=> {
			document.querySelector("#menu_title").dataset.name = data['class_name'];
			document.querySelector("#menu_title").textContent = data['class_name'];
			document.querySelector("#menu_title").addEventListener("click", ()=> {
				// 문제 작성/수정 중 나가기
				if (document.querySelector("#shell") != null || document.querySelector("#creation_sub") != null) {
					if (!confirm("WARNING! What you wrote is not saved! Don't change your determine?")) {
						return;
					}
				}
				router._goTo(`/manager${location.href.split("/manager")[1]}`);
			});
		});
		let target = document.querySelector("#menu");
		target.innerHTML = "";	// 메뉴 초기화
		for (let row of data) {
			let lecture = document.createElement('div');
			lecture.classList.add(...['menu_item', 'noselect','pointer']);
			lecture.textContent = row['pg_title'];
			lecture.addEventListener("click", ()=> {
				// 문제 작성/수정 중 나가기
				if (document.querySelector("#shell") != null || document.querySelector("#creation_sub") != null) {
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
		if (document.querySelector("#shell") != null || document.querySelector("#creation_sub") != null) {
			if (!confirm("WARNING! What you wrote is not saved! Don't change your determine?")) {
				return;
			}
		}
		ReturnContentForm();
		AddClassEventBinding(lecture_id);
	});
	// sql 파일 업로드 이벤트
	document.querySelector("#sql_btn").addEventListener("click", UploadSQL);
	document.querySelector("#sql_file").addEventListener("change", ()=> { UploadSQLEvent(lecture_id) }, false);
	// 사용 중인 Database 조회
	ViewDatabase(lecture_id);
	// 사용자 관리
	document.querySelector("#user_btn").addEventListener("click", ()=> { ManagementUser(lecture_id) });
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
			title_box.dataset.name = data['pg_title'];
			title_box.textContent = document.querySelector("#menu_title").dataset.name+' - '+data['pg_title'];
			target.append(title_box);

			let time_box = document.createElement('div');
			time_box.classList.add(...['content_container_time_cont', 'noselect']);
			let start = null, end = null;
			if (data['pg_exam_start'] != "Mon, 01 Jan 1990 00:00:00 GMT") {
				start = new Date(data['pg_exam_start']);
				start = new Date(start.setHours(start.getHours() - 9));
				start = start.getFullYear()+'-'+(start.getMonth()*1+1)+'-'+start.getDate()+" "+start.getHours()+":"+start.getMinutes()+":"+start.getSeconds();
			} else {
				start = "Infinite";
			}
			if (data['pg_exam_end'] != "Wed, 01 Jan 3000 00:00:00 GMT") {
				end = new Date(data['pg_exam_end']);
				end = new Date(end.setHours(end.getHours() - 9));
				end = end.getFullYear()+'-'+(end.getMonth()*1+1)+'-'+end.getDate()+" "+end.getHours()+":"+end.getMinutes()+":"+end.getSeconds();
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
					<input id="class_activate" type="checkbox">
					<span class="class_activate_slider"></span>
				</label>
			`;
			target.append(class_activate);
			if (data['pg_activate'] == 1) {
				document.querySelector("#class_activate").checked = true;
			} else {
				document.querySelector("#class_activate").checked = false;
			}
			document.querySelector("#class_activate").addEventListener('change', ()=> {
				ActivateClass(class_id);
			});

			let exam_activate = document.createElement('div');
			exam_activate.classList.add(...['exam_activate_box', 'noselect', 'wow', 'animated', 'fadeInRight']);
			exam_activate.innerHTML = `
				Exam Mode&nbsp;&nbsp;
				<label class="class_activate exam_activate">
					<input id="exam_activate" type="checkbox">
					<span class="class_activate_slider"></span>
				</label>
			`;
			target.append(exam_activate);
			if (data['pg_exam'] == 1) {
				document.querySelector("#exam_activate").checked = true;
			} else {
				document.querySelector("#exam_activate").checked = false;
			}
			document.querySelector("#exam_activate").addEventListener('change', ()=> {
				ActivateExam(class_id);
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

			// 통계버튼
			let analysis_btn = document.createElement('div');
			analysis_btn.classList.add(...['analysis_btn', 'noselect', 'pointer', 'wow', 'animated', 'fadeIn']);
			analysis_btn.innerHTML = `Member Status&nbsp;&nbsp; <i class="fas fa-project-diagram"></i>`;
			analysis_btn.addEventListener("click", ()=> { StatusEvent(class_id); })
			target.append(analysis_btn);
			resolve([data['class_id'], data['pg_id']]);
		});
	}).then((ids)=> {
		let lecture_id = ids[0], class_id = ids[1];
		// 해당 주차 문제 반환
		ApiLectureProblems(class_id, (data)=> {
			let target = document.querySelector("#class_container");
			target.innerHTML = "";
			for (let problem of data) {
				let problem_cont = document.createElement('div');
				problem_cont.classList.add(...['content_container_class', 'box', 'noselect', 'pointer', 'wow', 'animated', 'flipInY']);

				let problem_title = document.createElement('div');
				problem_title.classList.add('content_container_class_title');
				problem_title.textContent = problem['p_title'];
				problem_cont.append(problem_title);

				let problem_arrow = document.createElement('div');
				problem_arrow.classList.add(...['class_content_arrow', 'arrow_yellow']);
				problem_arrow.innerHTML = 'modify  <i class="fas fa-arrow-right"></i>';
				problem_cont.append(problem_arrow);
				problem_cont.addEventListener("click", ()=> {
					ModifyProblemEventBinding(lecture_id, problem['p_id']);
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
const ModifyProblemEventBinding = (lecture_id, problem_id)=> {
	document.querySelector("#content").innerHTML = ProblemForm();
	ModifyProblemEvent(lecture_id, problem_id);
}

// 주차 활성화/비활성화
const ActivateClass = (class_id)=> {
	let activate = document.querySelector("#class_activate").checked;
	if (activate == true) activate = 1;
	else activate = 0;
	ApiActivateClass(class_id, activate);
}

// 시험모드 활성화/비활성화
const ActivateExam = (class_id)=> {
	let activate = document.querySelector("#exam_activate").checked;
	if (activate == true) activate = 1;
	else activate = 0;
	ApiActivateExam(class_id, activate);
}

// sql 파일 업로드
const UploadSQL = ()=> {
	document.querySelector("#sql_file").click();
}

// sql 파일 업로드 이벤트
const UploadSQLEvent = (lecture_id)=> {
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
	ApiInsertDatabase(lecture_id, sql, (data)=> {
		router._goTo(`/manager${location.href.split("/manager")[1]}`);
		Snackbar("SQL file applied successful!");
	})
}

// 데이터베이스 조회
const ViewDatabase = (lecture_id)=> {
	ApiGetDatabase(lecture_id, (data)=> {
		let target = document.querySelector("#database_menu");
		for (let db of data) {
			let db_btn = document.createElement('div');
			db_btn.classList.add(...['database_menu_item', 'noselect', 'pointer']);
			db_btn.textContent = db['mt_table_name'];

			let hidden_view = document.createElement('div');
			hidden_view.classList.add('database_menu_item_hidden');
			hidden_view.innerHTML = `<i class="fas fa-times"></i>&nbsp;&nbsp; Drop?`;
			db_btn.append(hidden_view);

			db_btn.addEventListener("click", ()=> {
				DropDatabase(db['mt_id'], db['mt_table_name'], lecture_id);
			})

			target.append(db_btn);
		}
	});
}

// 데이터베이스 삭제
const DropDatabase = (db_id, db_title, lecture_id)=> {
	if (!confirm(`Drop table ${db_title}. Continue?`)) {
		return;
	}
	ApiDeleteDatabase(db_id, lecture_id, (data)=> {
		router._goTo(`/manager${location.href.split("/manager")[1]}`);
		Snackbar("Table deleted successful!");
	});
}

// 사용자 관리
const ManagementUser = (lecture_id)=> {
	let target = document.querySelector('#content');
	target.innerHTML = "";
	target.classList.remove("content_container_block");
	target.classList.add("content_container_flex");
	let view = `
		<div class="creation_cont_content">
			<div class="creation_title noselect">
				Member
				<div id="creation_submit" class="creation_btn pointer">update&nbsp; <i class="fas fa-arrow-right"></i></div>
			</div>
			<div id="creation_sub">
				<input class="creation_lecture_name creation_lecture_name_black" type="text" placeholder="ID / Student Number" spellcheck="false">
			</div>
			<div id="creation_submanger_btn" class="creation_submanger_btn noselect pointer">+</div>
		</div>
		<div class="creation_cont_user">${UserCont()}</div>
	`;
	target.innerHTML = view;
	UserContEvent();	// 모든 사용자 조회
	DisplayMemeber(lecture_id);	// 현재 분반 사용자 조회
	// 사용자 추가
	document.querySelector("#creation_submanger_btn").addEventListener("click", AppendMember);
	// 업데이트 버튼 이벤트
	document.querySelector("#creation_submit").addEventListener("click", ()=> { UpdateMemeber(lecture_id) });
}

// 분반 사용자 조회
const DisplayMemeber = (lecture_id)=> {
	ApiGetLecture(lecture_id, (data)=> {
		data = data.filter(member => member.uc_type == 0);
		document.querySelector("#creation_sub").innerHTML = "";
		for (let member of data) {
			let box = document.createElement('input');
			box.classList.add(...['creation_lecture_name', 'creation_lecture_name_black']);
			Object.assign(box, {
				'type': 'text',
				'placeholder': 'ID / Student Number',
				'spellcheck': 'false'
			});
			box.value = member['user_id'];
			document.querySelector("#creation_sub").append(box);
		}
	});
}

// 사용자 추가 Event
const AppendMember = ()=> {
	// 아직 빈 input 값이 있으면 생성안함
	for (let node of document.querySelectorAll(".creation_lecture_name")) {
		if (node.value == '') {
			node.focus();
			Snackbar("Input empty box first.");
			return;
		}
	}
	let member = document.createElement('input');
	member.classList.add(...["creation_lecture_name", "creation_lecture_name_black"]);
	Object.assign(member, {
		'type': 'text',
		'placeholder': 'ID / Student Number',
		'spellcheck': 'false'
	});
	document.querySelector("#creation_sub").append(member);
}

// 분반 사용자 업데이트
const UpdateMemeber = (lecture_id)=> {
	let members = [...document.querySelectorAll(".creation_lecture_name")].map(member => member.value);
	members = members.filter(member => member.length > 0);
	members = [...new Set(members)];
	ApiUpdateLectureMember(lecture_id, members, (data)=> {
		router._goTo(`/manager${location.href.split("/manager")[1]}`);
		Snackbar("Memeber updated Done!");
	});
}


export { Manager, ManagerEvent, ModifyClassEventBinding }