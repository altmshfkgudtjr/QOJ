const Loading = ()=> {
	let view = `
	<div id="loading" class="loading_background wow animated fadeIn">
		<div class="loading noselect">
			<div class="line"></div>
			<div class="line"></div>
			<div class="line"></div>
			<div class="loading_title">L O A D I N G</div>
		</div>
	</div>
	`;
	return view;
}

let loading_cnt = 0;
const LoadingOn = ()=> {
	if (loading_cnt == 0) {
		document.querySelector("body").style.overflow = "hidden";
		document.querySelector("body").insertAdjacentHTML("beforeend", Loading());
	}
	loading_cnt += 1;
}

const LoadingOff = ()=> {
	loading_cnt -= 1;
	if (loading_cnt != 0) {
		return;
	} else {
		document.querySelector("body").removeAttribute("style");
		document.querySelector("#loading").remove();
	}
}

export { LoadingOn, LoadingOff }