import { FETCH } from '../fetch.js'
import { Snackbar } from '../components/snackbar.js'
import { LoadingOn, LoadingOff } from '../components/loading.js'

// 분반 정보 반환 API
const ApiLectureInfo = (lecture_id, callback)=> {
	let sendData = {'class_id': lecture_id};
	LoadingOn();
	FETCH('/API/V1/class_manage/get_classinfo', 'POST', sendData, (data)=> {
		LoadingOff();
		if (data.API_STATUS == 'success') {
			if (typeof(callback) == 'function') {
				callback(data.RESULT);
			} else {
				Snackbar("Wrong Data");
			}
		} else if (data.API_STATUS == 'fail') {
			console.log(data);
			Snackbar("The connection attempt failed");
		} else {
			console.log('failed');
			Snackbar("Request failed");
		}
	});
}

// 문제집 목록 반환 API
const ApiLectureList = (lecture_id, callback)=> {
	let sendData = {'class_id': lecture_id};
	LoadingOn();
	FETCH('/API/V1/problem_manage/get_problem_group1', 'POST', sendData, (data)=> {
		LoadingOff();
		if (data.API_STATUS == 'success') {
			if (typeof(callback) == 'function') {
				callback(data.RESULT);
			} else {
				Snackbar("Wrong Data");
			}
		} else if (data.API_STATUS == 'fail') {
			console.log(data);
			Snackbar("The connection attempt failed");
		} else {
			console.log('failed');
			Snackbar("Request failed");
		}
	});
}

// 문제집 정보 반환 API
const ApiProblemsInfo = (class_id, callback)=> {
	let sendData = {'pg_id': class_id};
	LoadingOn();
	FETCH('/API/V1/problem_manage/get_problem_group2', 'POST', sendData, (data)=> {
		LoadingOff();
		if (data.API_STATUS == 'success') {
			if (typeof(callback) == 'function') {
				callback(data.RESULT);
			} else {
				Snackbar("Wrong Data");
			}
		} else if (data.API_STATUS == 'fail') {
			console.log(data);
			Snackbar("The connection attempt failed");
		} else {
			console.log('failed');
			Snackbar("Request failed");
		}
	});
}

// 문제집 문제 반환 API
const ApiLectureProblems = (class_id, callback)=> {
	let sendData = {'pg_id': class_id};
	LoadingOn();
	FETCH('/API/V1/problem_manage/get_problem_list', 'POST', sendData, (data)=> {
		LoadingOff();
		if (data.API_STATUS == 'success') {
			if (typeof(callback) == 'function') {
				callback(data.RESULT);
			} else {
				Snackbar("Wrong Data");
			}
		} else if (data.API_STATUS == 'fail') {
			console.log(data);
			Snackbar("The connection attempt failed");
		} else {
			console.log('failed');
			Snackbar("Request failed");
		}
	});	
}

// 문제 반환 API
const ApiProblem = (problem_id, callback)=> {
	let sendData = {'p_id': problem_id};
	LoadingOn();
	FETCH('/API/V1/problem_manage/get_problem', 'POST', sendData, (data)=> {
		LoadingOff();
		if (data.API_STATUS == 'success') {
			if (typeof(callback) == 'function') {
				callback(data.RESULT);
			} else {
				Snackbar("Wrong Data");
			}
		} else if (data.API_STATUS == 'fail') {
			console.log(data);
			Snackbar("The connection attempt failed");
		} else {
			console.log('failed');
			Snackbar("Request failed");
		}
	});
}

// 문제 실행 API
const ApiRunProblem = (query, lecture_id, callback)=> {
	let sendData = {'query': query, 'class_id': lecture_id};
	LoadingOn();
	FETCH('/API/V1/problem_manage/execute', 'POST', sendData, (data)=> {
		LoadingOff();
		if (data.API_STATUS == 'success') {
			if (typeof(callback) == 'function') {
				callback(data.RESULT);
			} else {
				Snackbar("Wrong Data");
			}
		} else if (data.API_STATUS == 'fail') {
			console.log(data);
			Snackbar("The connection attempt failed");
		} else {
			console.log('failed');
			Snackbar("Request failed");
		}
	});
}

// 문제 제출 API
const ApiSubmitProblem = (lecture_id, problem_id, query, callback)=> {
	let sendData = {'class_id': lecture_id, 'p_id': problem_id, 'query': query};
	LoadingOn();
	FETCH('/API/V1/problem_manage/submit', 'POST', sendData, (data)=> {
		LoadingOff();
		if (data.API_STATUS == 'success') {
			if (typeof(callback) == 'function') {
				callback(data.RESULT);
			} else {
				Snackbar("Wrong Data");
			}
		} else if (data.API_STATUS == 'fail') {
			console.log(data);
			Snackbar("The connection attempt failed");
		} else {
			console.log('failed');
			Snackbar("Request failed");
		}
	});
}

// 시험시간 Check API
const ApiCheckExamEnter = (class_id, callback)=> {
	callback(true);
	return;
	let sendData = {'id': class_id};
	LoadingOn();
	FETCH('/API/V1/problem/submit', 'POST', sendData, (data)=> {
		LoadingOff();
		if (data.API_STATUS == 'success') {
			if (typeof(callback) == 'function') {
				callback(data.RESULT);
			} else {
				Snackbar("Wrong Data");
			}
		} else if (data.API_STATUS == 'fail') {
			console.log(data);
			Snackbar("The connection attempt failed");
		} else {
			console.log('failed');
			Snackbar("Request failed");
		}
	});
}

export { ApiLectureInfo, ApiLectureList, ApiProblemsInfo, ApiLectureProblems, ApiProblem, ApiRunProblem, ApiSubmitProblem, ApiCheckExamEnter }