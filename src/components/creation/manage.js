import { ApiGetLecture } from '../../controller/creation.js'

const ManageLecture = ()=> {
	let view = `
		<div class="creation_title noselect">분반 생성</div>
		<div class="box creation_box noselect">
			<input id="lecture_name" class="creation_lecture_name" placeholder="Please enter the lecture name." spellcheck="false">
			<div class="creation_title noselect">주 관리자</div>
			<div id="creation_main">
			</div>
			<div class="creation_title noselect">부 관리자</div>
			<div id="creation_sub">
			</div>
		</div>
	`;

	return view;
}

const ManageLectureEvent = (lecture_id = '')=> {
	if (lecture_id != '') {						// 분반 수정
		ApiGetLecture((data)=> {
			document.querySelector("#lecture_name").value = data['class_name'];
		});
	} else {									// 분반 생성
		
	}
}




export { ManageLecture, ManageLectureEvent }