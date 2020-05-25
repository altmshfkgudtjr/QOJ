import { FETCH } from '../fetch.js'
import { Snackbar } from '../components/snackbar.js'
import { LoadingOn, LoadingOff } from '../components/loading.js'

// 관리자 분반 반환
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



export { ApiManagerClasses }