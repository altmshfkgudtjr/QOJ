import { ApiUserClasses } from '../../controller/user.js'
import { ApiManagerClasses } from '../../controller/manager.js'
import { CreateLectureBtn } from '../creation/creation.js'
import { router } from '../../router.js'

const Class = ()=> {
	let view = `
		<div id="user"></div>
		<div id="manager"></div>
		<div id="maker"></div>
	`;

	return view;
}

const ClassEvent = (userinfo)=> {	
	// 사용자 분반 불러오기
	ApiUserClasses((data)=> {
		if (data.length == 0) return;
		document.querySelector("#user").innerHTML = `
			<div class="class_container_title noselect">분반 선택하기</div>
			<div id="user_classes" class="class_content_container"></div>
		`;
		let target = document.querySelector('#user_classes');
		for (let cls of data) {
			let content = document.createElement('div');
			content.classList.add(...['box', 'class_content', 'noselect', 'pointer']);

			let title = document.createElement('div');
			title.classList.add('class_content_title');
			title.textContent = cls['class_name'];
			content.append(title);

			let arrow = document.createElement('div');
			arrow.classList.add('class_content_arrow');
			arrow.innerHTML = 'move  <i class="fas fa-arrow-right"></i>';
			content.append(arrow);

			content.addEventListener("click", ()=> { ClassSelect(cls['class_id']) });

			target.append(content);
		}
	});
	// 관리 분반 불러오기
	ApiManagerClasses((data)=> {
		if (data.length == 0) return;
		// 분반 생성
		CreateLectureBtn(document.querySelector("#maker"));

		document.querySelector("#manager").innerHTML = `
			<div class="class_container_title noselect">분반 관리하기</div>
			<div id="manager_classes" class="class_content_container"></div>
		`;
		let target = document.querySelector('#manager_classes');
		for (let cls of data) {
			let content = document.createElement('div');
			content.classList.add(...['box', 'class_content', 'noselect', 'pointer']);

			let title = document.createElement('div');
			title.classList.add('class_content_title');
			title.textContent = cls['class_name'];
			content.append(title);

			let arrow = document.createElement('div');
			arrow.classList.add(...['class_content_arrow', 'arrow_yellow']);
			arrow.innerHTML = 'manager  <i class="fas fa-arrow-right"></i>';
			content.append(arrow);

			content.addEventListener("click", ()=> { ClassManage(cls['class_id']) });

			target.append(content);
		}
	});
}

const ClassSelect = (lecture_id)=> {
	router._goTo(`lecture#cl?${lecture_id}`);
}

const ClassManage = (lecture_id)=> {
	router._goTo(`/manager#cl?${lecture_id}`);
}


export { Class, ClassEvent }