import { FETCH } from '../fetch.js'
import { Snackbar } from '../components/snackbar.js'

// 관리자 분반 반환
const ApiManagerClasses = (callback)=> {
	FETCH('/API/V1/auth/get_userclass', 'GET', null, (data)=> {
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