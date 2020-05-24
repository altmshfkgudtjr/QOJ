import { ApiLectureList } from '../../controller/lecture.js'
import { ContentEvent, ContentUrlCehck } from './content.js'
import { SelectLayout } from './layout.js'

const Menu = ()=> {
	let view = `
		<div class="menu">
			<div id="menu_title" class="menu_title noselect" data-name="QOJ 연습문제">QOJ 연습문제</div>
			<div id="menu"></div>
		</div>
	`;

	return view;
}

// 해당 분반 주차 목록 가져오기
const MenuEvent = (lecture_id)=> {
	let data = [{'name': 'SELECT 연습문제', 'pg_id': 1}]; // 임시데이터
	// ApiLectureList(lecture_id, (data)=> {
		let target = document.querySelector("#menu");
		target.innerHTML = "";	// 메뉴 초기화
		for (let row of data) {
			let lecture = document.createElement('div');
			lecture.classList.add(...['menu_item', 'noselect','pointer']);
			lecture.textContent = row['name'];
			lecture.addEventListener("click", ()=> {
				if (location.href.split('lecture')[1] != undefined &&
					!location.href.split('lecture')[1].startsWith(`#cl?${lecture_id}#cn?${row['pg_id']}`)) {
					history.pushState(null,null,`lecture#cl?${lecture_id}#cn?${row['pg_id']}`);
				} 
				SelectLayout(0);
				ContentEvent(row['pg_id']);
			});
			target.append(lecture);
		}
		ContentUrlCehck();
	// });
}

const MenuUrlCehck = ()=> {
	if (location.href.split("#cl?")[1] == undefined) {
		router._goTo("board");
		return;
	} else {
		let lecture_id = location.href.split("#cl?")[1];
		if (lecture_id.indexOf('#') != -1) lecture_id = location.href.split("#cl?")[1].split('#')[0];
		MenuEvent(lecture_id);
	}
}

export { Menu, MenuUrlCehck }