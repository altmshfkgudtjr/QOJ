import { ApiProblemsInfo, ApiLectureProblems, ApiCheckExamEnter } from '../../controller/lecture.js'
import { ProblemEvent } from './problem.js'
import { SelectLayout } from './layout.js'
import { Snackbar } from '../snackbar.js'

const Content = ()=> {
	let view = `
		<div id="problems_title" class="content_container_title noselect">&nbsp;</div>
		<div class="content_container_time_cont noselect">
			<div>
				Start Time : <span id="class_start"></span>
			</div><div>
				End Time : <span id="class_end"></span>
			</div>
		</div>
		<div id="class_container" class="content_container_class_cont noselect"></div>
	`;

	return view;
}

// 해당 주차 문제들 가져오기
const ContentEvent = (class_id)=> {
	if (document.querySelector("#shell") != null) return;
	// 문제집 정보 반환
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

		// 시험모드일 경우, 문제 view 제한
		if (data['pg_exam'] == 1) {
			let exam_btn = document.createElement('div');
			exam_btn.classList.add(...['exam_start_btn', 'noselect', 'pointer']);
			exam_btn.textContent = "Exam Start";
			exam_btn.addEventListener("click", ()=> {
				ApiCheckExamEnter(class_id, (data)=> {
					if (data == true) {
						ShowProblems(class_id);
					} else {
						Snackbar("It is currently not a test time!");
						return;
					}
				});
			});
			document.querySelector("#class_container").append(exam_btn);
			return;
		} else {
			ShowProblems(class_id);
		}
	});
}

// 문제 보여주기
const ShowProblems = (class_id)=> {
	ApiLectureProblems(class_id, (data)=> {
		let target = document.querySelector("#class_container");
		target.innerHTML = "";
		for (let problem of data) {
			let user_score = problem['up_state'], user_score_color = '';
			if (user_score == null) {
				user_score = 0;
			} else {
				user_score = 100;
				user_score_color = 'content_container_class_score_correct';
			}

			let problem_cont = document.createElement('div');
			problem_cont.classList.add(...['content_container_class', 'box', 'noselect', 'pointer', 'wow', 'animated', 'flipInY']);

			let problem_title = document.createElement('div');
			problem_title.classList.add('content_container_class_title');
			problem_title.textContent = problem['p_title'];
			problem_cont.append(problem_title);

			let problem_score_box = document.createElement('div');
			problem_score_box.classList.add('content_container_class_score_box');
			problem_score_box.innerHTML = `<span>My Score</span><span>/ 100</span><span class="content_container_class_score ${user_score_color}">${user_score}</span></div>`
			problem_cont.append(problem_score_box);

			let problem_arrow = document.createElement('div');
			problem_arrow.classList.add('class_content_arrow');
			problem_arrow.innerHTML = 'solve  <i class="fas fa-arrow-right"></i>';
			problem_cont.append(problem_arrow);
			problem_cont.addEventListener("click", ()=> {
				history.pushState(null,null,location.href.split('lecture')[3]);
				// 문제 View는 시험모드때문에 History가 없음.
				SelectLayout(1);			// Layout 변경
				ProblemEvent(problem['p_id']);
			})

			target.append(problem_cont);
		}
	});
}

const ContentUrlCheck = ()=> {
	if (location.href.split("#cn?")[1] == undefined) {
		return;
	} else {
		let class_id = location.href.split("#cn?")[1];
		if (class_id.indexOf('#') != -1) class_id = class_id.split('#')[0];
		ContentEvent(class_id);
	}
}

export { Content, ContentEvent, ContentUrlCheck }