/*
	알림바
*/

const Snackbar = (text)=> {
	if (document.querySelector(".snackbar") != null) {
		SnackbarOff(document.querySelector(".snackbar"));
		SnackbarOn(text);
	} else {
		SnackbarOn(text);
	}
}

// 알림바 켜기
const SnackbarOn = (text)=> {
	let target = document.querySelector('#app');
	let snackbar = document.createElement('div');
	snackbar.classList.add(...['snackbar', 'noselect', 'pointer', 'wow', 'animated', 'fadeInUp']);
	snackbar.textContent = text;
	snackbar.addEventListener("click", ()=> { SnackbarOff(snackbar) });
	target.append(snackbar);
	setTimeout(function() {
		SnackbarOff(snackbar);
	}, 3000);
}

// 알림바 닫기
const SnackbarOff = (snackbar)=> {
	return new Promise((resolve, reject) => {
		snackbar.classList.remove(...['animated', 'fadeInUp']);
		snackbar.classList.add(...['animated', 'fadeOutDown']);
		setTimeout(function() { snackbar.remove(); }, 1000);
		resolve();
	});
}

export { Snackbar }