import { FETCH } from '../fetch.js'
import { Snackbar } from '../components/snackbar.js'
import { LoadingOn, LoadingOff } from '../components/loading.js'

// 어드민 확인 API
const ApiCheckAdmin = (callback)=> {
	LoadingOn();
	FETCH('/API/V1/auth/check_admin', 'GET', null, (data)=> {
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
	LoadingOn();
	FETCH('/API/V1/class_manage/get_all_class', 'GET', null, (data)=> {
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

// 해당 분반 조회 API <관리자, 사용자 관리>
const ApiGetLecture = (lecture_id, callback)=> {
	let sendData = {'class_id': lecture_id};
	LoadingOn();
	FETCH('/API/V1/class_manage/get_class_member', 'POST', sendData, (data)=> {
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
const ApiGetAllManager = (lecture_id, callback)=> {
	let sendData = {'class_id': lecture_id};
	LoadingOn();
	FETCH('/API/V1/auth/get_all_user', 'POST', sendData, (data)=> {
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
	let sendData = {'class_name': title, 'class_admin': main_manager, 'class_sub_admin': sub_managers};
	LoadingOn();
	FETCH('/API/V1/class_manage/create_class', 'POST', sendData, (data)=> {
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
	let sendData = {'class_id': lecture_id, 'class_name': title, 'class_admin': main_manager, 'class_sub_admin': sub_managers};
	LoadingOn();
	FETCH('/API/V1/class_manage/update_class', 'POST', sendData, (data)=> {
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

// 분반 삭제 API
const ApiDeleteLecture = (lecture_id, callback)=> {
	let sendData = {'class_id': lecture_id};
	LoadingOn();
	FETCH('/API/V1/class_manage/delete_class', 'POST', sendData, (data)=> {
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



export { ApiCheckAdmin, ApiGetAllLectures, ApiGetAllManager, ApiGetLecture, ApiCreateLecture, ApiUpdateLecture, ApiDeleteLecture }