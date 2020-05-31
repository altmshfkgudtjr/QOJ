import { router } from '../../router.js'
import { ApiCheckAdmin, ApiGetAllLectures } from '../../controller/creation.js'
import { ManageLecture, ManageLectureEvent } from './manage.js'
import { UserCont, UserContEvent } from './user.js'


const Creation = ()=> {
	let view = `
	<div class="creation_cont">
		<div id="content_cont" class="creation_cont_content">${ManageLecture()}</div>
		<div class="creation_cont_user">${UserCont()}</div>
	</div>
	`;

	return view;
}

const CreationEvent = ()=> {
	let lecture_id = null;
	if (location.href.indexOf("#cl?") == -1) {						// 분반 생성
		ManageLectureEvent();
	} else {														// 분반 배정 수정
		lecture_id = location.href.split("#cl?")[1].split("#")[0];
		ManageLectureEvent(lecture_id)
	}
	UserContEvent();
}

// 분반 생성버튼 생성
const CreateLectureBtn = (target)=> {
	ApiCheckAdmin(()=> {
		target.innerHTML = `
			<div class="class_container_title noselect">분반 배정하기</div>
			<div id="create_lecture" class="class_content_container"></div>
		`;
		ApiGetAllLectures((data)=> {
			let btn_target = document.querySelector("#create_lecture");
			btn_target.innerHTML = "";
			for (let lecture of data) {
				let btn = document.createElement('div');
				btn.classList.add(...['box', 'class_content', 'noselect', 'pointer']);

				let btn_title = document.createElement('div');
				btn_title.classList.add('class_content_title');
				btn_title.textContent = lecture['class_name'];
				btn.append(btn_title);

				let btn_arrow = document.createElement('div');
				btn_arrow.classList.add(...['class_content_arrow', 'arrow_yellow']);
				btn_arrow.innerHTML = `manager&nbsp;&nbsp;<i class="fas fa-arrow-right"></i>`;
				btn.append(btn_arrow);

				btn.addEventListener("click", ()=> {
					router._goTo(`/creation#cl?${lecture['class_id']}`);
				});

				btn_target.append(btn);
			}
			// 분반 생성 버튼
			let btn = document.createElement('div');
			btn.classList.add(...['class_content', 'create_lecture_btn', 'noselect', 'pointer']);
			btn.textContent = '+';
			btn.addEventListener("click", ()=> {
				router._goTo("/creation");
			})
			document.querySelector("#create_lecture").append(btn);
		});
	});
}

export { Creation, CreationEvent, CreateLectureBtn }