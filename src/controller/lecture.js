import { FETCH } from '../fetch.js'
import { Snackbar } from '../components/snackbar.js'
import { LoadingOn, LoadingOff } from '../components/loading.js'

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
const ApiRunProblem = (query, callback)=> {
	let sendData = {'query': query};
	LoadingOn();
	FETCH('/API/V1/problem/run', 'POST', sendData, (data)=> {
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
const ApiSubmitProblem = (problem_id, query, callback)=> {
	let sendData = {'id': problem_id, 'query': query};
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

export { ApiLectureList, ApiProblemsInfo, ApiLectureProblems, ApiProblem, ApiRunProblem, ApiSubmitProblem }