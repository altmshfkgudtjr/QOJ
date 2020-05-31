import { ApiLectureList } from '../../controller/lecture.js'
import { ContentEvent, ContentUrlCheck } from './content.js'
import { SelectLayout } from './layout.js'

const Menu = ()=> {
	let view = `
		<div class="menu">
			<div id="menu_title" class="menu_title noselect" data-name=""></div>
			<div id="menu"></div>
		</div>
	`;

	return view;
}

// 해당 분반 주차 목록 가져오기
const MenuEvent = (lecture_id)=> {
	ApiLectureList(lecture_id, (data)=> {
		document.querySelector("#menu_title").dataset.name = data[0]['class_name'];
		document.querySelector("#menu_title").textContent = data[0]['class_name'];
		let target = document.querySelector("#menu");
		target.innerHTML = "";	// 메뉴 초기화
		for (let row of data) {
			if (row['pg_activate'] == 0) continue;
			let lecture = document.createElement('div');
			lecture.classList.add(...['menu_item', 'noselect','pointer']);
			lecture.textContent = row['pg_title'];
			lecture.addEventListener("click", ()=> {
				MenuItemClick(lecture_id, row['pg_id'], row['pg_exam']);
			});
			target.append(lecture);
		}
		ContentUrlCheck();
	});
}

// 메뉴를 클릭했을 때, (분반선택)
const MenuItemClick = (lecture_id, class_id, exam_activate)=> {
	if (document.querySelector("#shell") != null) {	// 문제에서 벗어나려는 경우
		if (!confirm("Your query has not been saved. Submit it before going back to the page!")) {
			return;
		}
	}
	if (location.href.split('lecture')[1] != undefined &&
		!location.href.split('lecture')[1].startsWith(`#cl?${lecture_id}#cn?${class_id}`)) {
		history.pushState(null,null,`lecture#cl?${lecture_id}#cn?${class_id}`);
	}
	SelectLayout(0);
	ContentEvent(class_id);
}

const MenuUrlCheck = ()=> {
	if (location.href.split("#cl?")[1] == undefined) {
		router._goTo("board");
		return;
	} else {
		let lecture_id = location.href.split("#cl?")[1];
		if (lecture_id.indexOf('#') != -1) lecture_id = location.href.split("#cl?")[1].split('#')[0];
		MenuEvent(lecture_id);
	}
}

export { Menu, MenuUrlCheck }