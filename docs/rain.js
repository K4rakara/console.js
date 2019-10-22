// Rain effect
// (C) Karakara 2019
// MIT Liscense.

console.clear(); // Clear the debug console/log.

// Set up the render target.
const bg_canvas = window.document.getElementById('bg');
bg_canvas.width = bg_canvas.clientWidth;
bg_canvas.height = bg_canvas.clientHeight;
const bg_ctx = bg_canvas.getContext('2d');
let bg_width = bg_canvas.clientWidth;
let bg_height = bg_canvas.clientHeight;

// Set up some variables.
const bg_particles = [];
const bg_startDrops = 18;
const bg_maxDrops = 64;
const bg_maxParticles = 1024;
const bg_randDepth = 0.2;
const bg_constDepth = 0.8;
const bg_showFps = false;
let bg_thunderOpacity = 1;
let bg_thunderCountdown = Date.now() + (Math.random() * 25000 + 2500);
let bg_thunderState = 0;
let bg_startFrameTime = 0;
let bg_endFrameTime = 0;
let bg_lastFrameTime = 0;
let bg_thisFrameTime = 0;
let bg_avgFrameTime = [0];
let bg_frameUpdate1 = 0;
let bg_frameUpdate2 = 0;
let bg_frameUpdate3 = 0;
let bg_exemptFrames = 0;
let bg_curFrameTime = [];
let bg_active = true;
let bg_debug = {
	pause : false,
	ctl : false,
	lsh : false,
	alt : false,
	e : false,
	pls : false,
}

class bg_particle {
  constructor( t, x, y, d) {
    this.id = bg_particles.length;
    this.typ = t;
    this.x = x;
    this.y = y;
    this.d = d;
    this.o = 1;
    this.r = 0;
    this.mx = 0;
    this.my = 0;
    this.imx = 0;
    this.imy = 0;
    this.mmx = 0;
    this.mmy = 0;
    this.state = 'default';
    if (t === 'droplet') {
      this.mx = (Math.random() * -3) - 2;
      this.my = (Math.random() * 3) + 2;
      this.imx = this.mx;
      this.imy = this.my;
      this.state = 'fall';
      this.update = function() {
        if (this.state === 'fall') {
          this.x = this.x + (0.001 * this.mx);
          this.y = this.y + (0.001 * this.my);
          if (this.mx > -10) {this.mx = this.mx + (this.imx / 100)};
          if (this.my < 10) {this.my = this.my + (this.imy / 100)};
          if (this.y >= 0.85) {
            this.state = 'fadeout';
						bg_particles.push(new bg_particle( 'ripple1', this.x, this.y, this.d));
            bg_particles.push(new bg_particle( 'ripple2', this.x, this.y, this.d));
            bg_particles.push(new bg_particle( 'ripple3', this.x, this.y, this.d));
            bg_particles.push(new bg_particle( 'splashdrop', this.x, this.y, this.d));
            bg_particles.push(new bg_particle( 'splashdrop', this.x, this.y, this.d));
            bg_particles.push(new bg_particle( 'splashdrop', this.x, this.y, this.d));
          }
        } else if (this.state === 'fadeout') {
					if (this.mx >= 0.25 || this.my >= 0.25) {
						this.mx = this.mx / 1.125;
						this.my = this.my / 1.125;
						this.o = this.o / 1.125;
					} else {
						this.state = 'delete';
					}
				}
      }
      this.draw = function() {
        bg_ctx.fillStyle = '#7161ef';
        bg_ctx.globalAlpha = this.o;
        bg_ctx.beginPath();
        bg_ctx.arc( this.x * bg_width, this.y * bg_height * this.d, (0.00275 * this.d) * bg_width, 0, 2 * Math.PI);
        bg_ctx.closePath();
        bg_ctx.fill();
        bg_ctx.beginPath();
        bg_ctx.moveTo( (this.x - (0.003 * this.d)) * bg_width, this.y * bg_height * this.d);
        bg_ctx.lineTo( (this.x - (this.mx/(475 * this.d))) * bg_width, (this.y - (0.005 * this.my)) * bg_height * this.d);
        bg_ctx.lineTo( (this.x + (0.003 * this.d)) * bg_width, this.y * bg_height * this.d);
        bg_ctx.lineTo( (this.x - (0.003 * this.d)) * bg_width, this.y * bg_height * this.d);
        bg_ctx.closePath();
				bg_ctx.fill();
      }
    } else if (t === 'ripple1') {
      this.s = 0;
      this.update = function() {
        if (this.state === 'default') {
          this.o = this.o - 0.03333333333333;
          this.s = this.s + 0.03333333333333;
          if (this.s >= 1) {
            this.state = 'delete';
          }
        }
      }
      this.draw = function() {
        bg_ctx.strokeStyle = '#7161ef';
        bg_ctx.lineWidth = 0.0025 * bg_width;
        bg_ctx.globalAlpha = this.o;
        bg_ctx.beginPath();
        bg_ctx.ellipse( this.x * bg_width, this.y * bg_height * this.d, (this.s * 0.04) * bg_width * this.d, (this.s * 0.0125) * bg_width * this.d, 0, 0, 2 * Math.PI);
        bg_ctx.closePath();
        bg_ctx.stroke();
      }
    } else if (t === 'ripple2') {
      this.s = 0;
      this.update = function() {
        if (this.state === 'default') {
          this.o = this.o - 0.01;
          this.s = this.s + 0.005;
          if (this.s >= 0.5) {
            this.state = 'delete';
          }
        }
      }
      this.draw = function() {
        bg_ctx.strokeStyle = '#7161ef';
        bg_ctx.lineWidth = 0.00125 * bg_width;
        bg_ctx.globalAlpha = this.o;
        bg_ctx.beginPath();
        bg_ctx.ellipse( this.x * bg_width, this.y * bg_height * this.d, (this.s * 0.07) * bg_width * this.d, (this.s * 0.035) * bg_width * this.d, 0, 0, 2 * Math.PI);
        bg_ctx.closePath();
        bg_ctx.stroke();
      }
    } else if (t === 'ripple3') {
      this.s = 0;
      this.o = 0.5;
      this.update = function() {
        if (this.state === 'default') {
          this.o = this.o - 0.0025;
          this.s = this.s + 0.0025;
          if (this.s >= 0.5) {
            this.state = 'delete';
          }
        }
      }
      this.draw = function() {
        bg_ctx.strokeStyle = '#7161ef';
        bg_ctx.lineWidth = 0.000625 * bg_width;
        bg_ctx.globalAlpha = this.o;
        bg_ctx.beginPath();
        bg_ctx.ellipse( this.x * bg_width, this.y * bg_height * this.d, (this.s * 0.10) * bg_width * this.d, (this.s * 0.05) * bg_width * this.d, 0, 0, 2 * Math.PI);
        bg_ctx.closePath();
        bg_ctx.stroke();
      }
    } else if (t === 'splashdrop') {
      // Angle
      this.a = (-0.25 * Math.PI) + (Math.random() * 0.5 * Math.PI);
      // Momentum
      this.mx = (Math.random() * 2) + 1.5;
      this.my = 0.01;
      this.mmy = 0.25; //0.25
      this.ma = (Math.random() * 2) + 1;
      // Scale
      this.s = 1;
      // Previous frame location
      this.prev = { x : x, y : y, t : 0};
      this.update = function() {
        if (this.prev.t > 3) {
          this.prev.x = this.x;
          this.prev.y = this.y;
          this.prev.t = 0;
        } else {
          this.prev.t++;
        }
        this.x = this.x + (Math.sin(this.a) * (0.005 * this.ma));
        this.y = this.y - (Math.cos(this.a) * (0.005 * this.ma));
        let tempFunc = function(a){if(Math.abs(a)===a*-1){return -1}else{return 1}};
        this.x = this.x + 0.001 * (this.mx * tempFunc(this.a));
        this.y = this.y + (0.001 * this.my);
        this.my = this.my + this.mmy;
        if (this.s > 0.1) {
          this.s = this.s - 0.1;
          this.o = this.o - 0.1;
        } else {
          this.state = 'delete';
        }
      }
      this.draw = function() {
        bg_ctx.fillStyle = '#7161ef';
        bg_ctx.globalAlpha = this.o;
        bg_ctx.beginPath();
        bg_ctx.arc( this.x * bg_width, this.y * bg_height * this.d, (0.0075 * this.s) * bg_width * this.d, 0, 2 * Math.PI);
        bg_ctx.closePath();
        bg_ctx.fill();
        bg_ctx.moveTo( (this.x - (0.0075 * this.s)) * bg_width, this.y * bg_height * this.d);
        bg_ctx.lineTo( this.prev.x * bg_width, this.prev.y * bg_height * this.d);
        bg_ctx.lineTo( (this.x + (0.0075 * this.s)) * bg_width, this.y * bg_height * this.d);
        bg_ctx.closePath();
        bg_ctx.fill();
      }
    }
  }
}

function bg_logFt(ft) {
	if (bg_exemptFrames > 64) {
		if (bg_avgFrameTime.length < 4096) {
			if (bg_exemptFrames === 64) {
				bg_avgFrameTime.pop;
				bg_avgFrameTime.push(ft); 
				bg_exemptFrames ++;
			} else {
				bg_avgFrameTime.push(ft); 
			}
		} else {
			bg_avgFrameTime.shift();
			bg_avgFrameTime.push(ft);
		}
	} else {
		bg_exemptFrames ++;
	}
	if (bg_curFrameTime.length < 128) {
    bg_curFrameTime.push(ft); 
  } else {
    bg_curFrameTime.shift();
    bg_curFrameTime.push(ft);
  }
}

function bg_getAvgFt() {
  let totalTime = 0;
  for (let i = 0; i < bg_avgFrameTime.length; i++) {
    totalTime = totalTime + bg_avgFrameTime[i];
  }
  let avg = totalTime / bg_avgFrameTime.length;
  return avg;
}

function bg_getCurFt() {
  let totalTime = 0;
  for (let i = 0; i < bg_curFrameTime.length; i++) {
    totalTime = totalTime + bg_curFrameTime[i];
  }
  let avg = totalTime / bg_curFrameTime.length;
  return avg;
}

function bg_scheduledUpdate( time, scheculedAt) {
	if (Date.now() - scheculedAt > time - 8 && Date.now() - scheculedAt < time + 8) {
		bg_update()
	} else {
		console.log('[Error]: Time between the creation and the execution of this update was too long. Skipping...');
	}
}

function bg_generateParticles() {
  for (let i = 0; i < bg_startDrops; i++) {
    let tempX = Math.random() + 0.75;
    let tempY = Math.random() - 0.8;
    let tempD = (Math.random() * bg_randDepth) + bg_constDepth;
    bg_particles.push(new bg_particle( 'droplet', tempX, tempY, tempD));
  }
}

function bg_onVisibilitySwitch() {
  if (document.hidden) {
    bg_active = false;
  } else {
    bg_active = true;
    window.requestAnimationFrame(bg_draw);
  }
}

function bg_keydownhandler() {
	if (event.keyCode === 17) {
		bg_debug.ctl = true;
	} else if (event.keyCode === 18) {
		bg_debug.alt = true;
	} else if (event.keyCode === 16) {
		bg_debug.lsh = true;
	} else if (event.keyCode === 69) {
		bg_debug.e = true;
	} else if (event.keyCode === 187) {
		bg_debug.pls = true;
	}
	if (bg_debug.ctl === true && bg_debug.alt === true && bg_debug.lsh === true && bg_debug.e === true) {
		if (bg_debug.pause === true) {
			bg_debug.pause = false;
		} else {
			bg_debug.pause = true;
		}
		bg_debug.ctl = false;
		bg_debug.alt = false;
		bg_debug.lsh = false;
		bg_debug.e = false;
	} else if (bg_debug.pause === true && bg_debug.ctl === true && bg_debug.alt === true && bg_debug.pls === true) {
		setTimeout( bg_update, 10);
	}
}

function bg_keyuphandler() {
	if (event.keyCode === 17) {
		bg_debug.ctl = false;
	} else if (event.keyCode === 18) {
		bg_debug.alt = false;
	} else if (event.keyCode === 16) {
		bg_debug.lsh = false;
	} else if (event.keyCode === 69) {
		bg_debug.e = false;
	} else if (event.keyCode === 187) {
		bg_debug.pls = false;
	}
}

function bg_update() {
  let tempTotalDrops = 0;
  // Update each particle.
  for (let i = 0; i < bg_particles.length; i++) {
    if (typeof bg_particles[i].update === 'function') {
      bg_particles[i].update();
      if (bg_particles[i].typ === 'droplet') {tempTotalDrops++};
    }
  }
  // If allowed for, add attitional droplets.
  if (Math.random() <= 0.5 && tempTotalDrops < bg_maxDrops && bg_particles.length < bg_maxParticles) {
    let tempX = (Math.random() * 2) + 1.5;
    let tempY = Math.random() - 1.75;
    let tempD = (Math.random() * bg_randDepth) + bg_constDepth;
    bg_particles.push(new bg_particle( 'droplet', tempX, tempY, tempD));
  }
  // Delete particles labeled for destruction.
  for (let i = 0; i < bg_particles.length; i++) {
    if (bg_particles[i].state === 'delete') {
      bg_particles.splice(i,1);
      i--;
		}
  }
	// Check if the thunder should happen
  /*
	if (Date.now() >= bg_thunderCountdown) {
		bg_thunderState = 1;
		bg_thunderOpacity = 0;
		bg_thunderCountdown = Date.now() + (Math.random() * 25000 + 2500);
	}
	// Update the thunder if its happening at the current moment
	if (bg_thunderState === 1) {
		if (bg_thunderOpacity < 0.5) {
			bg_thunderOpacity = bg_thunderOpacity + 0.025;
		} else {
			bg_thunderOpacity = 0;
			bg_thunderState = 2;
		}
	} else if (bg_thunderState === 2) {
		if (bg_thunderOpacity < 1) {
			bg_thunderOpacity = bg_thunderOpacity + 0.0075;
		} else {
			bg_thunderState = 0;
		}
	}
  */
	if (bg_debug.pause === false) {
		let tempFrameTime = bg_thisFrameTime - bg_lastFrameTime;
		if (tempFrameTime > 16) {tempFrameTime = 16};
		if (tempFrameTime <= 0) {tempFrameTime = 1};
		setTimeout( bg_update, tempFrameTime/4);
	}
}

function bg_draw() {
  if (bg_active) {
    // Get frametime
    bg_endFrameTime = Date.now();
    bg_lastFrameTime = bg_thisFrameTime;
    bg_thisFrameTime = bg_endFrameTime - bg_startFrameTime;
    bg_logFt(Math.abs(bg_thisFrameTime - bg_lastFrameTime));
    // Clear the canvas.
		bg_ctx.clearRect( 0, 0, bg_width, bg_height);
		// Draw the ground.
		bg_ctx.fillStyle = '#1c1c1c';
		bg_ctx.beginPath();
		bg_ctx.fillRect( 0, (0.8 * bg_constDepth) * bg_height, bg_width, bg_height);
		// Draw the overlay used when there isnt any thunder.
		bg_ctx.globalAlpha = bg_thunderOpacity;
    bg_ctx.fillRect( 0, 0, bg_width, bg_height);
    // Draw each particle.
		bg_ctx.globalAlpha = 1;
    for (let i = 0; i < bg_particles.length; i++) {
      if (typeof bg_particles[i].draw === 'function') {
        bg_particles[i].draw();
      }
    }
    // Show the current and average FPS if true.
    if (bg_showFps) {
      bg_ctx.fillStyle = '#aea9ba';
      bg_ctx.globalAlpha = 1;
      bg_ctx.fillText( 'Current FPS:'.concat(Math.round(1000/bg_getCurFt())).toString(), 10, 10);
			bg_ctx.fillText( 'Average FPS:'.concat(Math.round(1000/bg_getAvgFt())).toString(), 10, 30);
			if (bg_debug.pause === true) {
				bg_ctx.fillText( 'Debug mode enabled. CTRL+ALT+SHIFT+E to disable.', 10, 50);
				bg_ctx.fillText( 'CTRL+SHIFT+PLUS to advance one frame.', 10, 70);
			}
    }
    //Request to call code when the browser is ready for a new frame.
    window.requestAnimationFrame(bg_draw);
  }
}

// Generate the initial particles.
bg_generateParticles();
// Register events.
document.addEventListener( 'visibilitychange', bg_onVisibilitySwitch, false);
document.addEventListener( 'keydown', bg_keydownhandler, false);
document.addEventListener( 'keyup', bg_keyuphandler, false);
// Prepare to start loop.
bg_update();
bg_startFrameTime = Date.now();
window.requestAnimationFrame(bg_draw);