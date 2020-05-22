import { Background } from '../components/background.js'

const NotfoundContainer = ()=> {
	let view = `
	${Background()}
	<div class="header noselect">
		<div id="logo" class="logo pointer">Q O J</div>
	</div>
	<div class="notfound_cont">
		<div class="notfound_info noselect">Not Found!</div>
		<div id="return" class="notfound_return noselect pointer">Return ?</div>
	</div>
	`;

	document.querySelector('#app').innerHTML = view;
	NotfoundContainerEventBinding();
}

const NotfoundContainerEventBinding = ()=> {
	document.querySelector("#logo").addEventListener("click", ()=> {
		router._goTo(router._pathFor("Home"));
	});
	document.querySelector("#return").addEventListener("click", ()=> {
		router._goTo(router._pathFor("Home"));
	});
}


export { NotfoundContainer }