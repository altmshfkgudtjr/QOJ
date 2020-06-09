import { FETCH } from '../fetch.js'
import { Snackbar } from '../components/snackbar.js'
import { LoadingOn, LoadingOff } from '../components/loading.js'

// 로그인 API
const ApiUserLogin = (id, pw, callback)=> {
	sessionStorage.removeItem('tk');
	let sendData = {'id': id, 'pw': pw};
	LoadingOn();
	FETCH('/API/V1/auth/sign_in', 'POST', sendData, (data)=> {
		LoadingOff();
		if (data.API_STATUS == 'success') {
			if (data.RESULT == 'Not Found') {				// ID 없음
				Snackbar("Check your ID or PW");
			} else if (data.RESULT == 'Incorrect pw') {		// PW 틀림
				Snackbar("Check your ID or PW");
			} else {
				if (typeof(callback) == 'function') {
					callback(data.RESULT);
				} else {
					Snackbar("Wrong Data");
				}
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

// 회원가입 API
const ApiUserSignUp = (id, pw, name, email, callback)=> {
	let sendData = {'id': id, 'pw': pw, 'name': name, 'email': email};
	LoadingOn();
	FETCH('/API/V1/auth/sign_up', 'POST', sendData, (data)=> {
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

// 회원정보수정 API
const ApiUserUpdate = (pw, re_pw, email, callback)=> {
	let sendData = {'pw': pw, 'check_pw': re_pw, 'email': email};
	LoadingOn();
	FETCH('/API/V1/auth/update', 'POST', sendData, (data)=> {
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

// 회원탈퇴 API
const ApiUserDelete = (callback)=> {
	LoadingOn();
	FETCH('/API/V1/auth/withdrawal', 'GET', null, (data)=> {
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

// 사용자 정보 반환 API
const ApiUserInfo = (callback)=> {
	LoadingOn();
	FETCH('/API/V1/auth/get_userinfo', 'GET', null, (data)=> {
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

// 사용자 분반 반환 API
const ApiUserClasses = (callback)=> {
	LoadingOn();
	FETCH('/API/V1/class_manage/get_class', 'GET', null, (data)=> {
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

// 사용자 푼 문제 반환 API
const ApiUserProblems = (callback)=> {
	LoadingOn();
	FETCH('/API/V1/problem_manage/get_myproblem', 'GET', null, (data)=> {
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

export { ApiUserLogin, ApiUserSignUp, ApiUserUpdate, ApiUserDelete, ApiUserInfo, ApiUserClasses, ApiUserProblems }