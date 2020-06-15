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
const ApiActivateClass = (lecture_id, class_id, activation)=> {
	let sendData = {'class_id': lecture_id, 'pg_id': class_id, 'pg_activate': activation};
	LoadingOn();
	FETCH('/API/V1/problem_manage/change_activate', 'POST', sendData, (data)=> {
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
const ApiActivateExam = (lecture_id, class_id, activation)=> {
	let sendData = {'class_id': lecture_id, 'pg_id': class_id, 'pg_exam': activation};
	LoadingOn();
	FETCH('/API/V1/problem_manage/change_exam', 'POST', sendData, (data)=> {
		LoadingOff();
		if (data.API_STATUS == 'success') {
			if (activation == true) {
				Snackbar('Exam mode start.');
			} else {
				Snackbar('Exam mode end.');
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
const ApiInsertClass = (lecture_id, title, callback)=> {
	let sendData = {'class_id': lecture_id, 'pg_title': title};
	LoadingOn();
	FETCH('/API/V1/problem_manage/create_problem_group', 'POST', sendData, (data)=> {
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
const ApiUpdateClass = (lecture_id, class_id, title, start_time, end_time, callback)=> {
	let sendData = {
		'class_id': lecture_id,
		'pg_id': class_id,
		'pg_title': title,
		'pg_exam_start': start_time,
		'pg_exam_end': end_time
	}
	LoadingOn();
	FETCH('/API/V1/problem_manage/update_problem_group', 'POST', sendData, (data)=> {
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
const ApiDeleteClass = (lecture_id, class_id, callback)=> {
	let sendData = {'class_id': lecture_id, 'pg_id': class_id};
	LoadingOn();
	FETCH('/API/V1/problem_manage/delete_problem_group', 'POST', sendData, (data)=> {
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

// 문제 호출 API
const ApiViewProblem = (class_id, problem_id, callback)=> {
	let sendData = {'class_id': class_id, 'p_id': problem_id};
	LoadingOn();
	FETCH('/API/V1/problem_manage/admin_problem', 'POST', sendData, (data)=> {
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
const ApiInsertProblem = (lecture_id, class_id, title, post, query, callback)=> {
	let sendData = {'class_id': lecture_id, 'pg_id': class_id, 'p_title': title, 'p_content': post, 'p_answer': query};
	LoadingOn();
	FETCH('/API/V1/problem_manage/create_problem', 'POST', sendData, (data)=> {
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
const ApiModifyProblem = (lecture_id, problem_id, title, post, query, callback)=> {
	let sendData = {'class_id': lecture_id, 'p_id': problem_id, 'p_title': title, 'p_content': post, 'p_answer': query};
	LoadingOn();
	FETCH('/API/V1/problem_manage/update_problem', 'POST', sendData, (data)=> {
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
const ApiDeleteProblem = (lecture_id, problem_id, callback)=> {
	let sendData = {'class_id': lecture_id, 'p_id': problem_id};
	LoadingOn();
	FETCH('/API/V1/problem_manage/delete_problem', 'POST', sendData, (data)=> {
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
	sendData.append('class_id', lecture_id);
	sendData.append('file', file);
	LoadingOn();
	FETCH_FILE('/API/V1/problem_manage/push_testdb', 'POST', sendData, (data)=> {
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
	let sendData = {'class_id': lecture_id};
	LoadingOn();
	FETCH('/API/V1/problem_manage/get_testdb', 'POST', sendData, (data)=> {
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
const ApiDeleteDatabase = (db_id, lecture_id, callback)=> {
	let sendData = {'mt_id': db_id, 'class_id': lecture_id};
	LoadingOn();
	FETCH('/API/V1/problem_manage/delete_testdb', 'POST', sendData, (data)=> {
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

// 분반 Member 수정 API
const ApiUpdateLectureMember = (lecture_id, members, callback)=> {
	let sendData = {'class_id': lecture_id, 'user_list': members};
	LoadingOn();
	FETCH('/API/V1/class_manage/push_user', 'POST', sendData, (data)=> {
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
// 분반 모든 Member에 대한 점수 정보 API
const ApiClassScores = (lecture_id, class_id, callback)=> {
	let sendData = {'class_id': lecture_id, 'pg_id': class_id};
	LoadingOn();
	FETCH('/API/V1/problem_manage/get_total_score', 'POST', sendData, (data)=> {
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

// 분반 특정 Member의 특정 문제에 대한 Code와 정보 API
const ApiUserCodeInfo = (user_problem_id, callback)=> {
	let sendData = {'up_id': user_problem_id};
	LoadingOn();
	FETCH('/API/V1/problem_manage/get_up_id', 'POST', sendData, (data)=> {
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
 ApiInsertProblem, ApiModifyProblem, ApiDeleteProblem, ApiInsertDatabase, ApiGetDatabase, ApiDeleteDatabase, ApiUpdateLectureMember,
 ApiClassScores, ApiViewProblem, ApiUserCodeInfo }