import { router } from '../../router.js'

const CreateLecture = ()=> {
	let view = `

	`;

	return view;
}

// 분반 생성버튼 생성
const CreateLectureBtn = (target)=> {
	target.innerHTML = `
		<div class="class_container_title noselect">분반 생성하기</div>
		<div id="create_lecture" class="class_content_container"></div>
	`;
	let btn = document.createElement('div');
	btn.classList.add(...['create_lecture_btn', 'noselect', 'pointer']);
	btn.textContent = '+';
	btn.addEventListener("click", ()=> {
		router._goTo("/creation");
	})
	document.querySelector("#create_lecture").append(btn);
}

export { CreateLectureBtn }