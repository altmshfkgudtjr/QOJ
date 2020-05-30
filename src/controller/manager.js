import { FETCH, FETCH_FILE } from '../fetch.js'
import { Snackbar } from '../components/snackbar.js'
import { LoadingOn, LoadingOff } from '../components/loading.js'

// 관리자 분반 반환 API
const ApiManagerClasses = (callback)=> {
	LoadingOn();
	FETCH('/API/V1/class_manage/get_admin_class', 'GET', null, (data)=> {
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

// 분반 활성화/비활성화 API
const ApiActivateClass = (class_id, activation)=> {
	let sendData = {'id': class_id, 'activate': activation};
	LoadingOn();
	FETCH('/API/V1/class_manage/activate_class', 'POST', sendData, (data)=> {
		LoadingOff();
		if (data.API_STATUS == 'success') {
			if (activation == true) {
				Snackbar('This class is activate.');
			} else {
				Snackbar('This class is deactivate.');
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

// 시험모드 활성화/비활성화 API
const ApiActivateExam = (class_id, activation)=> {
	let sendData = {'id': class_id, 'activate': activation};
	LoadingOn();
	FETCH('/API/V1/class_manage/activate_exam', 'POST', sendData, (data)=> {
		LoadingOff();
		if (data.API_STATUS == 'success') {
			if (activation == true) {
				Snackbar('This class is activate.');
			} else {
				Snackbar('This class is deactivate.');
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

// 문제집 추가 API
const ApiInsertClass = (lecture_id, title, start_time, end_time, callback)=> {
	let sendData = {'id': lecture_id, 'title': title, 'start_time': start_time, 'end_time': end_time};
	LoadingOn();
	FETCH('/API/V1/class_manage/insert_class', 'POST', sendData, (data)=> {
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

// 문제집 수정 업데이트 API
const ApiUpdateClass = (class_id, title, start_time, end_time, callback)=> {
	let sendData = {
		'id': class_id,
		'title': title,
		'start_time': start_time,
		'end_time': end_time
	}
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

// 문제집 삭제 API
const ApiDeleteClass = (class_id, callback)=> {
	let sendData = {'id': class_id};
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

// 문제 생성 API
const ApiInsertProblem = (class_id, title, post, query, callback)=> {
	let sendData = {'id': class_id, 'title': title, 'post': post, 'query': query};
	LoadingOn();
	FETCH('/API/V1/problem/insert_problem', 'POST', sendData, (data)=> {
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

// 문제 수정 API
const ApiModifyProblem = (problem_id, title, post, query, callback)=> {
	let sendData = {'id': problem_id, 'title': title, 'post': post, 'query': query};
	LoadingOn();
	FETCH('/API/V1/problem/update_problem', 'POST', sendData, (data)=> {
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

// 문제 삭제 API
const ApiDeleteProblem = (problem_id, callback)=> {
	let sendData = {'id': problem_id};
	LoadingOn();
	FETCH('/API/V1/problem/delete_problem', 'POST', sendData, (data)=> {
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

// 데이터베이스 삽입 API
const ApiInsertDatabase = (lecture_id, file, callback)=> {
	let sendData = new FormData();
	sendData.append('id', lecture_id);
	sendData.append('file', file);
	LoadingOn();
	FETCH_FILE('/API/V1/database/insert', 'POST', sendData, (data)=> {
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

// 데이터베이스 조회 API
const ApiGetDatabase = (lecture_id, callback)=> {
	callback([{'mt_id': 1, 'mt_table_name': 'practice'}]);
	return;
	let sendData = {'id': lecture_id};
	LoadingOn();
	FETCH('/API/V1/database/view', 'POST', sendData, (data)=> {
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

// 데이터베이스 삭제 API
const ApiDeleteDatabase = (db_id, callback)=> {
	let sendData = {'id': db_id};
	LoadingOn();
	FETCH('/API/V1/database/drop', 'POST', sendData, (data)=> {
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

export { ApiManagerClasses, ApiActivateClass, ApiActivateExam, ApiInsertClass, ApiUpdateClass, ApiDeleteClass,
 ApiInsertProblem, ApiModifyProblem, ApiDeleteProblem, ApiInsertDatabase, ApiGetDatabase, ApiDeleteDatabase }