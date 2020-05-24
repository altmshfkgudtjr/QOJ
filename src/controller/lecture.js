import { FETCH } from '../fetch.js'
import { Snackbar } from '../components/snackbar.js'

// 문제집 목록 반환
const ApiLectureList = (lecture_name, callback)=> {
	let sendData = {'id': lecture_name};
	FETCH('/API/V1/lecture/lecture_list', 'POST', sendData, (data)=> {
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

// 문제집 문제 반환
const ApiLectureProblems = (class_name, callback)=> {
	let sendData = {'id': class_name};
	FETCH('/API/V1/lecture/problems', 'POST', sendData, (data)=> {
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

// 문제 반환
const ApiProblem = (problem_id, callback)=> {
	let sendData = {'id': problem_id};
	FETCH('/API/V1/lecture/problem', 'POST', sendData, (data)=> {
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

export { ApiLectureList, ApiLectureProblems, ApiProblem }