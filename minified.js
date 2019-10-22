/*Console.js*/;
var cjs_00;
var cjs_01;
var cjs_02;
var cjs_03;
var cjs_04=0;
var cjs_05=0;
var cjs_06=0;
var cjs_07=0;
var cjs_08=-1;
var cjs_09=[];
function cjs_0A() {
if (cjs_04 === 0) {
cjs_0B();
} else if (cjs_04 === 1) {
cjs_0C();
}
}
function cjs_0B() {
cjs_0R.style.height='75%';
cjs_13.style.height='95%';
cjs_0X.style.top='-0.5em';
cjs_0X.style.transform='rotateX(180deg)';
cjs_04=-1;
setTimeout(function(){
cjs_04=1;
},1000);
cjs_17.style.top='86.875%';
}
function cjs_0C() {
cjs_0R.style.height='10%';
cjs_13.style.height='75%';
cjs_0X.style.top='0.15em';
cjs_0X.style.transform='rotateX(360deg)';
cjs_04=-1;
setTimeout(function(){
cjs_0X.style.transitionDuration='0s';
setTimeout(function(){
cjs_0X.style.transform='rotateX(0deg)';
setTimeout(function(){
cjs_0X.style.transitionDuration='1s';
cjs_04=0;
},50);
},50);
},1000);
cjs_17.style.top='21%';
}
function cjs_0D() {
if (cjs_05 === 0) {
cjs_0Z.innerHTML='&#128275;';
cjs_05=1;
} else if (cjs_05 === 1) {
cjs_0Z.innerHTML='&#128274;';
cjs_05=0;
}
}
function cjs_0F() {
if (cjs_06 === 0) {
cjs_0G();
} else if (cjs_06 === 1) {
cjs_0H();
}
}
function cjs_0G() {
cjs_0R.style.right='calc(-25% - 4em)';
cjs_17.style.right='calc(-22.5% - 8em)';
cjs_06=-1;
setTimeout(function(){
cjs_06=1;
},1000);
}
function cjs_0H() {
cjs_0R.style.right='0%';
cjs_17.style.right='2.5%';
cjs_06=-1;
setTimeout(function(){
cjs_06=0;
},1000);
}
function cjs_0I() {
let cjs_1D=cjs_13.scrollTop;
let cjs_1E=(cjs_13.clientHeight/cjs_13.scrollHeight)*cjs_0R.clientHeight;
let cjs_1F=cjs_13.scrollHeight;
let cjs_1G=(cjs_1D/cjs_1F)*125;
cjs_15.style.top=(cjs_1G+5)+'%';
cjs_15.style.height=((cjs_1E/cjs_1F)*100)+'%';
if (cjs_1G+7.5 >= 100) {
cjs_15.style.opacity='0';
} else {
cjs_15.style.opacity='0.5';
}
}
function cjs_0J() {
if (cjs_05 === 0) {
cjs_13.scrollTop=cjs_13.scrollHeight;
}
}
function cjs_0K(event) {
if (event.which === 13) {
if (cjs_07 === 1) {
cjs_0L();
}
} else if (event.which === 38) {
if (cjs_07 === 1) {
cjs_0M();
}
} else if (event.which === 40) {
if (cjs_07 === 1) {
cjs_0N();
}
}
}
function cjs_0L() {
let cjs_1H=cjs_19.value;
cjs_19.value='';
if (cjs_1H.toLowerCase() === 'help()') {
cjs_0O('<b>=== Help menu ===</b><br>');
cjs_0O('=== Commands: ===<br>- help():Presents this menu.<br>- [JavaScript code]:Evaluates the provided input as JavaScript.<br>');
cjs_0O('=== Controls: ====<br>- Expand/contract the console: &#9660; in the upper-right hand corner.<br>- Enable/Disable automatically jumping to the newest line: &#128274; in the upper-right hand corner.<br>- Show/Hide the console: &#128065; on the upper-left hand corner of the console window.');
} else if (cjs_1H.toLowerCase() === '') {} else {
try {
eval(cjs_1H);
} catch(error) {
cjs_0P(error);
}
}
if (cjs_09.length < 256) {
cjs_09.unshift(cjs_1H);
cjs_08=-1;
} else {
cjs_09.pop();
cjs_09.unshift(cjs_1H);
cjs_08=-1;
}
cjs_0I();
cjs_0J();
}
function cjs_0M() {
if (cjs_09.length > cjs_08 + 1) {
cjs_08 += 1;
cjs_19.value=cjs_09[cjs_08];
} else if (cjs_09.length === 0) {
cjs_19.value='';
}
}
function cjs_0N() {
if (cjs_08 > 0) {
cjs_08 -= 1;
cjs_19.value=cjs_09[cjs_08];
} else {
cjs_08=-1;
cjs_19.value='';
}
}
function cjs_0O(cjs_1J) {
let cjs_1I=document.getElementById('logContent');
cjs_1I.innerHTML += '<span style="color:#5F5C6E">-&gt; <span style="color:#02C39A">&lt;Console.js&gt;</span> ' + cjs_1J + '</span><br/>';
cjs_0I();
cjs_0J();
}
function cjs_0P(cjs_1J) {
let cjs_1I=document.getElementById('logContent');
cjs_1I.innerHTML += '<span style="color:#5F5C6E">-&gt;</span> <span style="color:#02C39A">&lt;Console.js&gt; <span style="color:#EF798A">&lt;Input Error&gt; ' + cjs_1J + '</span></span><br/>';
cjs_01(cjs_1J);
cjs_0I();
cjs_0J();
}
cjs_0Q=document.createElement('DIV');
cjs_0Q.id='log';
cjs_0Q.style.cssText=`
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
cjs_0R=document.body.appendChild(cjs_0Q);
cjs_0S=document.createElement('DIV');
cjs_0S.style.cssText=`
position:absolute;
top:0.25em;
left:2.5%;
width:50%;
height:2em;
background-color:#242038;
user-select:none;`;
cjs_0S.innerHTML='&#128187;Console.js<span style="font-size:0.75em;font-weight:1.25;">[v1.0.0]</span>';
cjs_0T=cjs_0R.appendChild(cjs_0S);
cjs_0U=document.createElement('DIV');
cjs_0U.style.cssText=`
position:absolute;
top:1.5em;
left:2.5%;
width:95%;
height:0.01em;
border-bottom:0.125em dotted #ffffff;`;
cjs_0V=cjs_0R.appendChild(cjs_0U);
cjs_0W=document.createElement('DIV');
cjs_0W.style.cssText=`
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
cjs_0W.innerHTML='&#9660;';
cjs_0W.addEventListener('click',cjs_0A);
cjs_0W.addEventListener('mouseover',(function(){cjs_0X.style.color='#02C39A';}));
cjs_0W.addEventListener('mouseout',(function(){cjs_0X.style.color='#ffffff';}));
cjs_0X=cjs_0R.appendChild(cjs_0W);
cjs_0Y=document.createElement('DIV');
cjs_0Y.style.cssText=`
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
cjs_0Y.innerHTML='&#128274;';
cjs_0Y.addEventListener('click',cjs_0D);
cjs_0Z=cjs_0R.appendChild(cjs_0Y);
cjs_10=document.createElement('DIV');
cjs_10.style.cssText=`
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
cjs_10.innerHTML='&#128065;';
cjs_10.addEventListener('click',cjs_0F);
cjs_10.addEventListener('mouseover',(function(){cjs_11.style.backgroundColor='#02C39A';}));
cjs_10.addEventListener('mouseout',(function(){cjs_11.style.backgroundColor='#242038';}));
cjs_11=cjs_0R.appendChild(cjs_10);
cjs_12=document.createElement('DIV');
cjs_12.id='logContent';
cjs_12.style.cssText=`
position:absolute;
top:calc(2em+5%);
left:2.5%;
width:97.5%;
height:95%;
padding-right: 100%;
overflow-x:hidden;
overflow-y:scroll;
cursor:default;`;
cjs_13=cjs_0R.appendChild(cjs_12);
cjs_14=document.createElement('DIV');
cjs_14.style.cssText=`
position:absolute;
top:0;
right:2.5%;
width:1%;
min-height:1%;
height:5%;
border-radius:1em;
background-color:#ffffff;
opacity:0.5;`;
cjs_13.addEventListener('scroll',cjs_0I);
cjs_13.addEventListener('resize',cjs_0I);
cjs_15=cjs_0R.appendChild(cjs_14);
cjs_0I();
cjs_16=document.createElement('DIV');
cjs_16.style.cssText=`
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
cjs_17=document.body.appendChild(cjs_16);
cjs_18=document.createElement('INPUT');
cjs_18.style.cssText=`
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
cjs_18.placeholder='Type JavaScript here...';
cjs_18.setAttribute('autocomplete','off');
cjs_18.addEventListener('focus',(function(){cjs_07=1}));
cjs_18.addEventListener('blur',(function(){cjs_07=0}));
cjs_19=cjs_17.appendChild(cjs_18);
cjs_1A=document.createElement('BUTTON');
cjs_1A.style.cssText=`
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
cjs_1A.innerHTML='&#9755;Run';
cjs_1A.addEventListener('click',cjs_0L);
cjs_1A.addEventListener('mouseover',(function(){cjs_1B.style.color='#ffffff';cjs_1B.style.backgroundColor='#02C39A';}));
cjs_1A.addEventListener('mouseout',(function(){cjs_1B.style.color='#000000';cjs_1B.style.backgroundColor='#ffffff';}));
cjs_1B=cjs_17.appendChild(cjs_1A);
function cjs_1C() {
cjs_00=console.log;
cjs_01=console.error;
cjs_02=console.warn;
cjs_03=console.clear;
var cjs_1I=document.getElementById('logContent');
console.log=function (cjs_1J) {
if (typeof cjs_1J == 'object') {
cjs_1I.innerHTML += '<span style="color:#5F5C6E">-&gt; <span style="color:#725AC1;">&lt;Object&gt; ' + (JSON && JSON.stringify ? JSON.stringify(cjs_1J) : cjs_1J) + '</span></span><br/>' + '<br />';
} else {
cjs_1I.innerHTML += '<span style="color:#5F5C6E">-&gt; &lt;Log&gt; ' + cjs_1J + '</span><br/>';
}
cjs_00(cjs_1J);
};
console.error=function(cjs_1J) {
cjs_1I.innerHTML += '<span style="color:#5F5C6E">-&gt; <span style="color:#EF798A">&lt;Error&gt;</span> <span style="color:#EF798A">' + cjs_1J + '</span></span><br/>';
cjs_01(cjs_1J);
};
console.warn=function(cjs_1J) {
cjs_1I.innerHTML += '<span style="color:#5F5C6E">-&gt; <span style="color:#F2DC5D">&lt;Warning&gt; ' + cjs_1J + '</span></span><br/>';
cjs_02(cjs_1J);
};
console.clear=function() {
cjs_1I.innerHTML='';
cjs_0O('Console.js log cleared. (Type console.fullclear() to clear the inspect element log as well)');
};
console.fullclear=function() {
cjs_03();
cjs_1I.innerHTML='';
cjs_0O('Inspect element log cleared.');
cjs_0O('Console.js log cleared.');
};
}
cjs_1C();
document.addEventListener('keydown',cjs_0K);
cjs_0O('Console.js started.');
cjs_0O('Type help() for more info.');
setTimeout(function(){
cjs_0R.style.top='0';
cjs_17.style.top='21%';
},100);
/*Console.js*/