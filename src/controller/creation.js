import { FETCH } from '../fetch.js'
import { Snackbar } from '../components/snackbar.js'
import { LoadingOn, LoadingOff } from '../components/loading.js'

// 어드민 확인 API
const ApiCheckAdmin = (callback)=> {
	callback();
	return;
	LoadingOn();
	FETCH('/API/V1/root/check', 'GET', null, (data)=> {
		LoadingOff();
		if (data.API_STATUS == 'success') {
			if (typeof(callback) == 'function') {
				if (data.RESULT == true) {
					callback();
				} else {
					return;
				}
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

// 모든 분반 조회 API
const ApiGetAllLectures = (callback)=> {
	callback([{'class_id':1, 'class_name': 'QOJ 연습문제'}]);
	return;
	LoadingOn();
	FETCH('/API/V1/class/all', 'GET', null, (data)=> {
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

// 해당 분반 조회 API <분반명, 관리자, 사용자 관리>
const ApiGetLecture = (lecture_id, callback)=> {
	callback({'class_name': 'QOJ 연습문제', 'main_id': 'QOJ_ADMIN', 'submanager': [], 'member': [{'id': '16011075', 'name': '김형석'}]});
	return;
	let sendData = {'id': lecture_id};
	LoadingOn();
	FETCH('/API/V1/class/one', 'POST', sendData, (data)=> {
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

// 모든 사용자 조회 API
const ApiGetAllManager = (callback)=> {
	callback([{'user_id': '사용자아이디', 'user_name': '사용자이름'}]);
	return;
	LoadingOn();
	FETCH('/API/V1/user/all', 'GET', null, (data)=> {
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

// 분반 생성 API
const ApiCreateLecture = (title, main_manager, sub_managers, callback)=> {
	let sendData = {'title': title, 'main': main_manager, 'sub': sub_managers};
	LoadingOn();
	FETCH('/API/V1/lecture/insert', 'POST', sendData, (data)=> {
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

// 분반 수정 API
const ApiUpdateLecture = (lecture_id, title, main_manager, sub_managers, callback)=> {
	let sendData = {'id': lecture_id, 'title': title, 'main': main_manager, 'sub': sub_managers};
	LoadingOn();
	FETCH('/API/V1/lecture/update', 'POST', sendData, (data)=> {
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



export { ApiCheckAdmin, ApiGetAllLectures, ApiGetAllManager, ApiGetLecture, ApiCreateLecture, ApiUpdateLecture }