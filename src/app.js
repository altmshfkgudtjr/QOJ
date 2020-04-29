import './router.js';	// 라우터 호출
import WOW from 'wowjs';

function App() {
	this.reset = function() {
		document.querySelector("#app").innerHTML = "";
		document.querySelector("#app").removeAttribute('style');
		document.querySelector("#app").className = "";
	};
	this.css = function(styletarget, stylevalue) {
		if (typeof(styletarget) == 'string') {
			document.querySelector("#app").style[styletarget] = stylevalue;
		} else if (Array.isArray(styletarget) == false
			&& typeof(styletarget) == 'object') {
			for (let key in styletarget) {
				document.querySelector("#app").style[key] = styletarget[key];
			}
		} else {
			console.log("SyntaxError: Unexpected token,", styletarget, stylevalue);
		}
	};
}

new WOW.WOW().init();

export { App }