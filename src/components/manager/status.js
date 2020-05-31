import { ApiProblemsInfo } from '../../controller/lecture.js'
import { ApiUserClassScore } from '../../controller/manager.js'

const Status = ()=> {
	let view = `
		<div id="problems_title" class="content_container_title noselect">&nbsp;</div>
		<div class="content_container_time_cont noselect">
			<div>
				Start Time : <span id="class_start"></span>
			</div><div>
				End Time : <span id="class_end"></span>
			</div>
		</div>
		<div id="score_container" class="content_score_cont noselect"></div>
	`;

	return view;
}

const StatusEvent = (class_id)=> {
	let target = document.querySelector("#content");
	target.innerHTML = Status();

	ApiProblemsInfo(class_id, (data)=> {
		let title = document.querySelector("#menu_title").dataset.name;
		let class_name = data['pg_title'];
		document.querySelector("#problems_title").textContent = title+' - '+class_name;
		let date = null;
		if (data['pg_exam_start'] != "Mon, 01 Jan 1990 00:00:00 GMT") {
			date = new Date(data['pg_exam_start']);
			date = date.getFullYear()+'-'+(date.getMonth()*1+1)+'-'+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
		} else {
			date = "Infinite";
		}
		document.querySelector("#class_start").textContent = date;
		if (data['pg_exam_end'] != "Wed, 01 Jan 3000 00:00:00 GMT") {
			date = new Date(data['pg_exam_end']);
			date = date.getFullYear()+'-'+(date.getMonth()*1+1)+'-'+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
		} else {
			date = "Infinite";
		}
		document.querySelector("#class_end").textContent = date;

		UserClassStatus(class_id);
	});
}

// 해당 분반 Memeber 점수 반환
const UserClassStatus = (class_id)=> {
	ApiUserClassScore(class_id, (data)=> {
		let target = document.querySelector("#score_container");
		target.innerHTML = "";
		// Info Box
		let info_box = document.createElement('div');
		info_box.classList.add('content_score_info_wrap');
		// ID Info
		let info = document.createElement('div');
		info.classList.add('content_score_info');
		info.textContent = "User ID";
		info_box.append(info);
		// 이름 Info
		info = document.createElement('div');
		info.classList.add(...['content_score_info', 'content_score_info_static']);
		info.textContent = "Name";
		info_box.append(info);
		let infoes = data.map(node=> node.problem_name);
		infoes = [...new Set(infoes)];
		for (let problem of infoes) {
			info = document.createElement('div');
			info.classList.add('content_score_info');
			info.textContent = problem;
			info_box.append(info);
		}
		target.append(info_box);

		// 사용자 출력================================================
		let wrap = document.createElement('div');
		wrap.classList.add('content_score_wrap');
		// ID
		let content = document.createElement('div');
		content.classList.add('content_score_info');
		content.textContent = data[0]['user_id'];
		wrap.append(content);
		// Name
		content = document.createElement('div');
		content.classList.add(...['content_score_info', 'content_score_info_static']);
		content.textContent = data[0]['user_name'];
		wrap.append(content);
		for (let user of data.filter(user => user.user_name == '홍길동')) {
			content = document.createElement('div');
			content.classList.add('content_score_info');
			if (user['up_state'] == 1) {
				content.classList.add(...['content_score_info_green', 'pointer']);
				content.textContent = "Accept";
			} else if (user['up_state'] == 0) {
				content.classList.add(...['content_score_info_red', 'pointer']);
				content.textContent = "Fail";
			} else {
				content.classList.add('content_score_info_none');
				content.textContent = "-"
			}
			wrap.append(content);
		}
		target.append(wrap);

		wrap = document.createElement('div');
		wrap.classList.add('content_score_wrap');
		// ID
		content = document.createElement('div');
		content.classList.add('content_score_info');
		content.textContent = data[1]['user_id'];
		wrap.append(content);
		// Name
		content = document.createElement('div');
		content.classList.add(...['content_score_info', 'content_score_info_static']);
		content.textContent = data[1]['user_name'];
		wrap.append(content);
		for (let user of data.filter(user => user.user_name == '원빈')) {
			content = document.createElement('div');
			content.classList.add('content_score_info');
			if (user['up_state'] == 1) {
				content.classList.add(...['content_score_info_green', 'pointer']);
				content.textContent = "Accept";
			} else if (user['up_state'] == 0) {
				content.classList.add(...['content_score_info_red', 'pointer']);
				content.textContent = "Fail";
			} else {
				content.classList.add('content_score_info_none');
				content.textContent = "-"
			}
			wrap.append(content);
		}
		target.append(wrap);
	});
}

const ViewUserCode = ()=> {

}

export { Status, StatusEvent }