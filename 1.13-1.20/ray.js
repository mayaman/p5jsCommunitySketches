ctrb.ray = function(p, x0, y0) {
  this.p = p;
  this.t = 0;

  this.x0 = x0;
  this.y0 = y0;

  var x, y, c, n = 0, found = false;
  
  while(!found) {
    x = Math.random();
    y = 1 - ((++n + p.frameCount) % 200) / 200;
    c = ctrb.asterisk.get(Math.floor(x * ctrb.asterisk.width), Math.floor(y * ctrb.asterisk.height));
    if(c[3] > 100) {
      p.noStroke();
      p.fill(237, 34, 93);
      this.x1 = p.map(x, 0, 1, p.windowWidth * 0.7, p.windowWidth * 0.7 + p.windowHeight * 0.7);
      this.y1 = p.map(y, 0, 1, 0, p.windowHeight * 0.7);
      found = true;
    }
  }

  this.cx = this.x1;
  this.cy = this.y1;

  this.linePoints = [];
  this.lineColor = 255;

  this.points = [];
  var a, aOff, radius, px, py;

  // create shape
  p.colorMode(p.RGB, 255);
  var size = p.random(10, 70);
  var sides = Math.floor(3 + 4 * Math.random());
  for(var i=0; i<sides; i++) {
    var a = i * p.TWO_PI / sides;
    px = size * Math.cos(a);
    py = size * Math.sin(a);
    this.points.push([px, py]);
  }
  this.color0 = p.color(['', '', '', '#6BC26C', '#F9D567', '#E09DFB', '#9BD2FA'][sides]);
  this.color1 = p.color('#ED225D');
  this.colorFade = 0;
  
  this.rot = Math.random() * Math.PI;
  this.rotd = Math.random() * 0.02 - 0.01;
}
ctrb.ray.prototype.update = function(t) {
  if(this.t <= 1) {
    this.cx = this.p.lerp(this.x0, this.x1, this.t);
    this.cy = this.p.lerp(this.y0, this.y1, this.t) - 100 * Math.sin(this.t * Math.PI);
    this.linePoints.push([this.cx, this.cy]);
    this.t += 0.05;
  } else {
    if(this.colorFade < 1) {
      this.colorFade += 0.05;
    }
  }
  this.rot += this.rotd;
}
ctrb.ray.prototype.paint = function() {

  this.p.stroke(255, this.lineColor);
  this.p.noFill();
  this.p.beginShape();
  for(var i=0; i<this.linePoints.length; i++) {
    this.p.vertex(this.linePoints[i][0], this.linePoints[i][1]);  
  }
  this.p.endShape();
  if(this.lineColor > 0) {
    this.lineColor -= 5; 
  }
  
  this.p.noStroke();
  this.p.fill(this.p.lerpColor(this.color0, this.color1, this.colorFade));
  this.p.push();
  this.p.translate(this.cx, this.cy);
  this.p.rotate(this.rot);
  this.p.beginShape();
  var i, p;
  for(i=0; i<this.points.length; i++) {
    p = this.points[i];
    this.p.vertex(p[0], p[1]);
  }
  this.p.endShape(this.p.CLOSE);
  this.p.pop();  
}
