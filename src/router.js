// import SPARouter from "@kodnificent/sparouter";
import SPARouter from "../node_modules/@kodnificent/sparouter/dist/sparouter.js";
import { App } from './app.js';

const app_ = new App();

const options = {
	historyMode : true
}
const router = new SPARouter(options);


// Home
router.get("/", function(req, router){ 
	app_.reset();
	document.title = "QOJ";
	// HomeContainer();
}).setName("Home");

// 404 Not found!
router.notFoundHandler(function(){
	console.log("404 ^_^");
});

router.init();
window.router = router;




export { router }