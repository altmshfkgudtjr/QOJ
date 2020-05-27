import { Snackbar } from './components/snackbar.js'

const FETCH = (URL, METHOD, DATA, callback) => {
	let token = sessionStorage.getItem('tk');
	let authorization;
    if (token != null && token != undefined && token != 'undefined') {
        authorization = {'Authorization': "Bearer " + token};
    } else {
    	authorization = {};
    }
	if (METHOD == "GET") {
		fetch(URL, {
			header : authorization,
			method: METHOD
		})
		.then((res)=> {
			if (res.status == 401) {
				alert("Permission denied");
				location.href = "/";
			}
			return res;
		})
		.then(res => res.json())
		.then((res) => {
			if (typeof(callback) == 'function') {
				callback(res);
			}
		})
		.catch((err)=> {
			console.log(err);
			Snackbar("Server Error");
		});
	} else {
		fetch(URL, {
			method: METHOD,
			headers: Object.assign({}, {
				'Content-Type': 'application/json'
			}, authorization),
			body: JSON.stringify(DATA)
		})
		.then((res)=> {
			if (res.status == 401) {
				alert("Permission denied");
				location.href = "/";
			}
			return res;
		})
		.then(res => res.json())
		.then((res)=> {
			if (typeof(callback) == 'function') {
				callback(res);
			}
		})
		.catch((err)=> {
			console.log(err);
			Snackbar("Server Error");
		});
	}
}

const FETCH_FILE = (URL, METHOD, DATA, callback) => {
	let token = sessionStorage.getItem('tk');
	let authorization;
    if (token != null && token != undefined && token != 'undefined') {
        authorization = {'Authorization': "Bearer " + token};
    } else {
    	authorization = {};
    }
	fetch(URL, {
		method: METHOD,
		headers: Object.assign({
			"Content-Type": "multipart/form-data"
		}, authorization),
		body: DATA
	})
	.then((res)=> {
		if (res.status == 401) {
			alert("Permission denied");
			location.href = "/";
		}
		return res;
	})
	.then(res => res.json())
	.then((res)=> {
		if (typeof(callback) == 'function') {
			callback(res);
		}
	})
	.catch((err)=> {
		console.log(err);
		Snackbar("Server Error");
	});
}

export { FETCH, FETCH_FILE }