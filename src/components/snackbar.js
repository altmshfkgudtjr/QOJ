/*
	알림바
*/

const Snackbar = (text, color='black')=> {
	if (document.querySelector(".snackbar") != null) {
		SnackbarOff(document.querySelector(".snackbar"));
		SnackbarOn(text, color);
	} else {
		SnackbarOn(text, color);
	}
}

// 알림바 켜기
const SnackbarOn = (text, color)=> {
	let target = document.querySelector('#app');
	let snackbar = document.createElement('div');
	snackbar.classList.add(...['snackbar', 'noselect', 'pointer', 'wow', 'animated', 'fadeInUp']);
	if (color == 'red') snackbar.classList.add('snackbar_red');
	else if (color == 'green') snackbar.classList.add('snackbar_green');
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