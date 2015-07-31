
ctrb = {};

ctrb.people = [];
ctrb.rays = [];
ctrb.asterisk;

ctrb.person = function(p, idx) {
  this.p = p;
  
  this.x0 = p.windowWidth * p.random(1.0, 1.1);
  this.y0 = p.windowHeight * p.map(idx, 0, 20, 0.2, 0.4);

  this.x1 = p.windowWidth * p.random(0.10, 0.3);
  this.y1 = this.y0;

  this.cx = this.x0;
  this.cy = this.y0;

  this.jumps = Math.floor(p.random(5, 10));
  this.jumpHeight = p.random(20, 80);

  this.tStart = 0.1 * Math.random();
  this.tDur = 0.1 + 0.3 * Math.random() * Math.random();

  this.rot = p.random(p.TWO_PI);

  this.nextLaunch = 0;

  this.points = [];
  var a, radius, px, py;

  // create shape
  var sizeMin = p.random(5, 50);
  var sizeMax = sizeMin + p.random(5, 50);
  var baseWidth = p.random(5, 30);
  for(var i=0; i<15; i++) {
    var a = i * p.TWO_PI / 15;
    radius = i % 3 == 0 ? sizeMin : sizeMax;
    px = radius * Math.cos(a);
    py = radius * Math.sin(a);
    this.points.push(p.createVector(px, py));
  }

  // set color
  p.colorMode(p.HSB, 360, 100, 100);
  this.color = p.color(p.random(15,30), p.random(20,35), 20 + (idx * 2743 % 75));
}

ctrb.person.prototype.update = function(t) {
  // t 0 .. 0.2
  if(t >= this.tStart && t <= this.tStart + this.tDur) {
    var ct = t - this.tStart;
    var currJump = Math.floor(ct * this.jumps / this.tDur);
    var nextJump = currJump + 1;
    var map = this.p.map;
    var x0 = map(currJump, 0, this.jumps, this.x0, this.x1);
    var y0 = map(currJump, 0, this.jumps, this.y0, this.y1);
    var x1 = map(nextJump, 0, this.jumps, this.x0, this.x1);
    var y1 = map(nextJump, 0, this.jumps, this.y0, this.y1);
    var sublen = this.tDur / this.jumps;
    var subt = ct % sublen;
    var sin = Math.sin(subt/sublen * Math.PI);

    this.cx = map(subt, 0, sublen, x0, x1);
    this.cy = y0 - this.jumpHeight * sin;
    if(sin < 0.2) {
      this.rot -= 0.15;
    }
  } else if(t > this.tStart + this.tDur && t > this.nextLaunch && t < 0.7) {
    if(this.nextLaunch > 0) {
      ctrb.rays.push(new ctrb.ray(this.p, this.cx, this.cy));
    } 
    this.nextLaunch = t + 0.05 + this.p.random() * 0.15;
  }
}

ctrb.person.prototype.paint = function() {
  // set color
  this.p.fill(this.color);

  // draw shape
  this.p.push();
  this.p.translate(this.cx, this.cy);
  this.p.rotate(this.rot);
  this.p.beginShape();
  var i, p;
  for(i=0; i<this.points.length; i++) {
    p = this.points[i];
    this.p.vertex(p.x, p.y);
  }
  this.p.endShape(this.p.CLOSE);
  this.p.pop();
}
