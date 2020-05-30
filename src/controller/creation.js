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
	callback([{'class_id':2, 'class_name': '알고리즘'}]);
	return;
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

// 해당 분반 조회 API <분반명, 관리자 관리>
const ApiGetLecture = (lecture_id, callback)=> {
	let sendData = {'id': lecture_id};
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
	callback([{'user_id': '사용자아이디', 'user_email': '사용자이메일', 'user_name': '사용자이름'}]);
	return;
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

export { ApiCheckAdmin, ApiGetAllLectures, ApiGetAllManager, ApiGetLecture }