// import SPARouter from "@kodnificent/sparouter";
import SPARouter from "../node_modules/@kodnificent/sparouter/dist/sparouter.js"
import { App } from './app.js'
import { MainContainer } from './containers/main.js'
import { BoardContainer } from './containers/board.js'
import { LectureContainer } from './containers/lecture.js'
import { UserContainer } from './containers/user.js'
import { NotfoundContainer } from './containers/notfound.js'

const app_ = new App();

const options = {
	historyMode : true
}
const router = new SPARouter(options);


// Home
router.get("/", function(req, router){ 
	app_.reset();
	document.title = "Query-Oline Judge";
	MainContainer();
}).setName("Home");

// Board
router.get("/board", function(req, router){ 
	app_.reset();
	document.title = "분반선택 | Query-Oline Judge";
	BoardContainer();
}).setName("Board");

// Lecture
router.get("/lecture", function(req, router){
	app_.reset();
	document.title = "주차선택 | Query-Oline Judge";
	LectureContainer();
}).setName("Lecture");

// User
router.get("/user", function(req, router){
	app_.reset();
	document.title = "내 정보 | Query-Oline Judge";
	UserContainer();
}).setName("User");

// 404 Not found!
router.notFoundHandler(function(){
	fetch(window.location.pathname, {
		method: 'GET'
	});
	NotfoundContainer();
});

router.init();
window.router = router;




export { router }