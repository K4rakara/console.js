/*=================================================================================================
Console.js
===================================================================================================
A Bookmarklet that lets users of locked
down or managed devices that have inspect element
disabled use a tool similar to the inspect
element JavaScript console.*/


/*=================================================================================================
Define variables.
=================================================================================================*/
var cjs_oldLog;
var cjs_oldError;
var cjs_oldWarn;
var cjs_oldClear;
var cjs_expandBtnMode = 0;
var cjs_lockBtnMode = 0;
var cjs_hideBtnMode = 0;
var cjs_cmdSelected = 0;
var cjs_cmdHistoryIndex = -1;
var cjs_cmdHistory = [];


/*=================================================================================================
Define functions.
=================================================================================================*/
function cjs_handleExpandBtn() {
	if (cjs_expandBtnMode === 0) {
		cjs_expandLog();
	} else if (cjs_expandBtnMode === 1) {
		cjs_contractLog();
	}
}
function cjs_expandLog() {
	cjs_logContainer.style.height = '75%';
	cjs_logContent.style.height = '95%';
	cjs_logExpBtn.style.top = '-0.5em';
	cjs_logExpBtn.style.transform = 'rotateX(180deg)';
	cjs_expandBtnMode = -1;
	setTimeout(function(){
		cjs_expandBtnMode = 1;
	},1000);
	cjs_cmdContainer.style.top = '86.875%';
}
function cjs_contractLog() {
	cjs_logContainer.style.height = '10%';
	cjs_logContent.style.height = '75%';
	cjs_logExpBtn.style.top = '0.15em';
	cjs_logExpBtn.style.transform = 'rotateX(360deg)';
	cjs_expandBtnMode = -1;
	setTimeout(function(){
		cjs_logExpBtn.style.transitionDuration = '0s';
		setTimeout(function(){
			cjs_logExpBtn.style.transform = 'rotateX(0deg)';
			setTimeout(function(){
				cjs_logExpBtn.style.transitionDuration = '1s';
				cjs_expandBtnMode = 0;
			},50);
		},50);
	},1000);
	cjs_cmdContainer.style.top = '21%';
}
function cjs_handleScrollLockBtn() {
	if (cjs_lockBtnMode === 0) {
		cjs_logLockBtn.innerHTML = '&#128275;';
		cjs_lockBtnMode = 1;
	} else if (cjs_lockBtnMode === 1) {
		cjs_logLockBtn.innerHTML = '&#128274;';
		cjs_lockBtnMode = 0;
	}
}
function cjs_handleHideBtn() {
	if (cjs_hideBtnMode === 0) {
		cjs_hideLog();
	} else if (cjs_hideBtnMode === 1) {
		cjs_showLog();
	}
}
function cjs_hideLog() {
	cjs_logContainer.style.right = 'calc(-25% - 4em)';
	cjs_cmdContainer.style.right = 'calc(-22.5% - 8em)';
	cjs_hideBtnMode = -1;
	setTimeout(function(){
		cjs_hideBtnMode = 1;
	},1000);
}
function cjs_showLog() {
	cjs_logContainer.style.right = '0%';
	cjs_cmdContainer.style.right = '2.5%';
	cjs_hideBtnMode = -1;
	setTimeout(function(){
		cjs_hideBtnMode = 0;
	},1000);
}
function cjs_scrollbarController() {
	let cjs_tmpScrollTop = cjs_logContent.scrollTop;
	let cjs_tmpScrollHeight = (cjs_logContent.clientHeight/cjs_logContent.scrollHeight)*cjs_logContainer.clientHeight;
	let cjs_tmpScrollFullHeight = cjs_logContent.scrollHeight;
	let cjs_tmpScrollBarOffset = (cjs_tmpScrollTop/cjs_tmpScrollFullHeight)*125;
	cjs_logScrollbar.style.top = (cjs_tmpScrollBarOffset+5)+'%';
	cjs_logScrollbar.style.height = ((cjs_tmpScrollHeight/cjs_tmpScrollFullHeight)*100)+'%';
	if (cjs_tmpScrollBarOffset+7.5 >= 100) {
		cjs_logScrollbar.style.opacity = '0';
	} else {
		cjs_logScrollbar.style.opacity = '0.5';
	}
}
function cjs_scrollToNewest() {
	if (cjs_lockBtnMode === 0) {
		cjs_logContent.scrollTop = cjs_logContent.scrollHeight;
	}
}
function cjs_onKeyDown(event) {
	if (event.which === 13) {
		if (cjs_cmdSelected === 1) {
			cjs_runCmd();
		}
	} else if (event.which === 38) {
		if (cjs_cmdSelected === 1) {
			cjs_cmdHistoryUp();
		}
	} else if (event.which === 40) {
		if (cjs_cmdSelected === 1) {
			cjs_cmdHistoryDown();
		}
	}
}
function cjs_runCmd() {
	let cmdStr = cjs_cmdInput.value;
	cjs_cmdInput.value = '';
	if (cmdStr.toLowerCase() === 'help()') {
		cjs_cjsMessage('<b>=== Help menu ===</b><br>');
		cjs_cjsMessage('=== Commands: ===<br>- help():Presents this menu.<br>- [JavaScript code]:Evaluates the provided input as JavaScript.<br>');
		cjs_cjsMessage('=== Controls: ====<br>- Expand/contract the console: &#9660; in the upper-right hand corner.<br>- Enable/Disable automatically jumping to the newest line: &#128274; in the upper-right hand corner.<br>- Show/Hide the console: &#128065; on the upper-left hand corner of the console window.');
	} else if (cmdStr.toLowerCase() === '') {} else {
		try {
			eval(cmdStr);
		} catch(error) {
			cjs_cjsInputError(error);
		}
	}
	if (cjs_cmdHistory.length < 256) {
		cjs_cmdHistory.unshift(cmdStr);
		cjs_cmdHistoryIndex = -1;
	} else {
		cjs_cmdHistory.pop();
		cjs_cmdHistory.unshift(cmdStr);
		cjs_cmdHistoryIndex = -1;
	}
	cjs_scrollbarController();
	cjs_scrollToNewest();
}
function cjs_cmdHistoryUp() {
	if (cjs_cmdHistory.length > cjs_cmdHistoryIndex + 1) {
		cjs_cmdHistoryIndex += 1;
		cjs_cmdInput.value = cjs_cmdHistory[cjs_cmdHistoryIndex];
	} else if (cjs_cmdHistory.length === 0) {
		cjs_cmdInput.value = '';
	}
}
function cjs_cmdHistoryDown() {
	if (cjs_cmdHistoryIndex > 0) {
		cjs_cmdHistoryIndex -= 1;
		cjs_cmdInput.value = cjs_cmdHistory[cjs_cmdHistoryIndex];
	} else {
		cjs_cmdHistoryIndex = -1;
		cjs_cmdInput.value = '';
	}
}
function cjs_cjsMessage(message) {
	let logger = document.getElementById('logContent');
	logger.innerHTML += '<span style = "color:#5F5C6E">-&gt; <span style = "color:#02C39A">&lt;Console.js&gt;</span> ' + message + '</span><br/>';
	cjs_scrollbarController();
	cjs_scrollToNewest();
}
function cjs_cjsInputError(message) {
	let logger = document.getElementById('logContent');
	logger.innerHTML += '<span style = "color:#5F5C6E">-&gt;</span> <span style = "color:#02C39A">&lt;Console.js&gt; <span style = "color:#EF798A">&lt;Input Error&gt; ' + message + '</span></span><br/>';
	cjs_oldError(message);
	cjs_scrollbarController();
	cjs_scrollToNewest();
}


/*=================================================================================================
HTML DOM Insertion.
=================================================================================================*/
/*==========Log Window==========*/
let cjs_logContainerInit = document.createElement('DIV');
cjs_logContainerInit.id = 'log';
cjs_logContainerInit.style.cssText = `
	all: unset;
	position:fixed;
	z-index:999255;
	top:-20%;
	right:0;
	width:25%;
	height:10%;
	padding:2em;
	border-bottom-left-radius:1em;
	overflow:visible;
	background-color:#242038;
	color:#ffffff;
	font-family:"Courier New", Courier, monospace;
	font-size:14px;
	transition:top,width,height,right;
	transition-duration:1s;`;
var cjs_logContainer = document.body.appendChild(cjs_logContainerInit);

/*==========Log Window Title==========*/
let cjs_logTitleInit = document.createElement('DIV');
cjs_logTitleInit.style.cssText = `
	position:absolute;
	top:0.25em;
	left:2.5%;
	width:50%;
	height:2em;
	background-color:#242038;
	user-select:none;`;
cjs_logTitleInit.innerHTML = '&#128187;Console.js<span style = "font-size:0.75em;font-weight:1.25;">[v1.0.0]</span>';
var cjs_logTitle = cjs_logContainer.appendChild(cjs_logTitleInit);

/*==========Log Window Underline==========*/
let cjs_logTitleULInit = document.createElement('DIV');
cjs_logTitleULInit.style.cssText = `
	position:absolute;
	top:1.5em;
	left:2.5%;
	width:95%;
	height:0.01em;
	border-bottom:0.125em dotted #ffffff;`;
cjs_logTitleUL = cjs_logContainer.appendChild(cjs_logTitleULInit);

/*==========Log Window Expand Button==========*/
let cjs_logExpBtnInit = document.createElement('DIV');
cjs_logExpBtnInit.style.cssText = `
	position:absolute;
	top:0.15em;
	right:0.25em;
	width:1.5em;
	height:1.5em;
	cursor:pointer;
	font-size:1.5em;
	text-align:center;
	transform:rotateX(0deg);
	transition:top,right,color,transform;
	transition-duration:1s;
	user-select:none;`;
cjs_logExpBtnInit.innerHTML = '&#9660;';
cjs_logExpBtnInit.addEventListener('click',cjs_handleExpandBtn);
cjs_logExpBtnInit.addEventListener('mouseover',(function(){cjs_logExpBtn.style.color = '#02C39A';}));
cjs_logExpBtnInit.addEventListener('mouseout',(function(){cjs_logExpBtn.style.color = '#ffffff';}));
var cjs_logExpBtn = cjs_logContainer.appendChild(cjs_logExpBtnInit);

/*==========Log Window Lock Scroll Button==========*/
let cjs_logLockBtnInit = document.createElement('DIV');
cjs_logLockBtnInit.style.cssText = `
	position:absolute;
	top:0.15em;
	right:4em;
	width:1.5em;
	height:1.5em;
	cursor:pointer;
	font-size:0.75em;
	text-align:center;
	transition:top,right,color;
	transition-duration:1s;
	user-select:none;`;
cjs_logLockBtnInit.innerHTML = '&#128274;';
cjs_logLockBtnInit.addEventListener('click',cjs_handleScrollLockBtn);
var cjs_logLockBtn = cjs_logContainer.appendChild(cjs_logLockBtnInit);

/*==========Log Window Hide Button==========*/
let cjs_logHideBtnInit = document.createElement('DIV');
cjs_logHideBtnInit.style.cssText = `
	position:absolute;
	top:0.15em;
	left:-2.25em;
	width:1.5em;
	height:1.5em;
	cursor:pointer;
	color:#ffffff;
	background-color:#242038;
	padding:0.25em;
	border-radius:99em;
	font-size:1em;
	text-align:center;
	transition:top,right,background-color;
	transition-duration:1s;
	user-select:none;`;
cjs_logHideBtnInit.innerHTML = '&#128065;';
cjs_logHideBtnInit.addEventListener('click',cjs_handleHideBtn);
cjs_logHideBtnInit.addEventListener('mouseover',(function(){cjs_logHideBtn.style.backgroundColor = '#02C39A';}));
cjs_logHideBtnInit.addEventListener('mouseout',(function(){cjs_logHideBtn.style.backgroundColor = '#242038';}));
var cjs_logHideBtn = cjs_logContainer.appendChild(cjs_logHideBtnInit);

/*==========Log Window Content==========*/
let cjs_logContentInit = document.createElement('DIV');
cjs_logContentInit.id = 'logContent';
cjs_logContentInit.style.cssText = `
	position:absolute;
	top:calc(2em+5%);
	left:2.5%;
	width:97.5%;
	height:95%;
	padding-right: 100%;
	overflow-x:hidden;
	overflow-y:scroll;
	cursor:default;`;
var cjs_logContent = cjs_logContainer.appendChild(cjs_logContentInit);

/*==========Log Window Content Scrollbar==========*/
let cjs_logScrollbarInit = document.createElement('DIV');
cjs_logScrollbarInit.style.cssText = `
	position:absolute;
	top:0;
	right:2.5%;
	width:1%;
	min-height:1%;
	height:5%;
	border-radius:1em;
	background-color:#ffffff;
	opacity:0.5;`;
cjs_logContent.addEventListener('scroll',cjs_scrollbarController);
cjs_logContent.addEventListener('resize',cjs_scrollbarController);
var cjs_logScrollbar = cjs_logContainer.appendChild(cjs_logScrollbarInit);
cjs_scrollbarController();

/*==========Command Input==========*/
let cjs_cmdContainerInit = document.createElement('DIV');
cjs_cmdContainerInit.style.cssText = `
	all:unset;
	position:fixed;
	z-index:999254;
	top:-20%;
	right:calc(25% / 8);
	width:22.5%;
	height:2.5em;
	border-radius:1em;
	background-color:#5F5C6E;
	color:#ffffff;
	font-family:"Courier New", Courier, monospace;
	font-size:12px;
	transition:top,width,height,right;
	transition-duration:1s;`;
var cjs_cmdContainer = document.body.appendChild(cjs_cmdContainerInit);

/*==========Command Input Textbox==========*/
let cjs_cmdInputInit = document.createElement('INPUT');
cjs_cmdInputInit.style.cssText = `
	position:absolute;
	top:15%;
	left:2.5%;
	width:70%;
	height:60%;
	border-radius:0.5em;
	color:#ffffff;
	background-color:#242038;
	outline:none;
	border:none;`;
cjs_cmdInputInit.placeholder = 'Type JavaScript here...';
cjs_cmdInputInit.setAttribute('autocomplete','off');
cjs_cmdInputInit.addEventListener('focus',(function(){cjs_cmdSelected = 1}));
cjs_cmdInputInit.addEventListener('blur',(function(){cjs_cmdSelected = 0}));
var cjs_cmdInput = cjs_cmdContainer.appendChild(cjs_cmdInputInit);

/*==========Command Input Run Button==========*/
let cjs_cmdRunBtnInit = document.createElement('BUTTON');
cjs_cmdRunBtnInit.style.cssText = `
	position:absolute;
	top:15%;
	right:2.5%;
	width:20%;
	height:60%;
	cursor:pointer;
	border-radius:0.5em;
	color:#000000;
	background-color:#ffffff;
	transition:color,background-color;
	transition-duration:0.5s;
	outline:none;
	border:none;`;
cjs_cmdRunBtnInit.innerHTML = '&#9755;Run';
cjs_cmdRunBtnInit.addEventListener('click',cjs_runCmd);
cjs_cmdRunBtnInit.addEventListener('mouseover',(function(){cjs_cmdRunBtn.style.color = '#ffffff';cjs_cmdRunBtn.style.backgroundColor = '#02C39A';}));
cjs_cmdRunBtnInit.addEventListener('mouseout',(function(){cjs_cmdRunBtn.style.color = '#000000';cjs_cmdRunBtn.style.backgroundColor = '#ffffff';}));
var cjs_cmdRunBtn = cjs_cmdContainer.appendChild(cjs_cmdRunBtnInit);


/*=================================================================================================
Override console functions.
=================================================================================================*/
function cjs_overrideConsoleFunctions() {
	cjs_oldLog = console.log;
	cjs_oldError = console.error;
	cjs_oldWarn = console.warn;
	cjs_oldClear = console.clear;
	var logger = document.getElementById('logContent');
	console.log = function (message) {
		if (typeof message == 'object') {
			logger.innerHTML += '<span style = "color:#5F5C6E">-&gt; <span style = "color:#725AC1;">&lt;Object&gt; ' + (JSON && JSON.stringify ? JSON.stringify(message) : message) + '</span></span><br/>' + '<br />';
		} else {
			logger.innerHTML += '<span style = "color:#5F5C6E">-&gt; &lt;Log&gt; ' + message + '</span><br/>';
		}
		cjs_oldLog(message);
	};
	console.error = function(message) {
		logger.innerHTML += '<span style = "color:#5F5C6E">-&gt; <span style = "color:#EF798A">&lt;Error&gt;</span> <span style = "color:#EF798A">' + message + '</span></span><br/>';
		cjs_oldError(message);
	};
	console.warn = function(message) {
		logger.innerHTML += '<span style = "color:#5F5C6E">-&gt; <span style = "color:#F2DC5D">&lt;Warning&gt; ' + message + '</span></span><br/>';
		cjs_oldWarn(message);
	};
	console.clear = function() {
		logger.innerHTML = '';
		cjs_cjsMessage('Console.js log cleared. (Type console.fullclear() to clear the inspect element log as well)');
	};
	console.fullclear = function() {
		cjs_oldClear();
		logger.innerHTML = '';
		cjs_cjsMessage('Inspect element log cleared.');
		cjs_cjsMessage('Console.js log cleared.');
	};
}
cjs_overrideConsoleFunctions();


/*=================================================================================================
Run initial code.
=================================================================================================*/
document.addEventListener('keydown',cjs_onKeyDown);
cjs_cjsMessage('Console.js started.');
cjs_cjsMessage('Type help() for more info.');
setTimeout(function(){
	cjs_logContainer.style.top = '0';
	cjs_cmdContainer.style.top = '21%';
},100);