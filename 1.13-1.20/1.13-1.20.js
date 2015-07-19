// your sketch goes here!

abe = {};
abe.person = function(p, x, y) {
  this.p = p;
  this.x = x;
  this.y = y;
  this.isWalking = false;
  this.dx = p.random(5, 30);
  this.points = [];
  var a, aOff, tx, ty, radius, amt;

  var sizeMin = p.random(5, 30);
  var sizeMax = sizeMin + p.random(5, 30);
  var baseWidth = p.random(5, 30);

  this.points.push(p.createVector(baseWidth/2, 0));
  this.points.push(p.createVector(-baseWidth/2, 0));

  aOff = p.PI + p.random(p.PI/2);
  for(a=aOff; a<p.TWO_PI; a+=p.random(p.PI/2)) {
    radius = p.random(sizeMin, sizeMax);
    px = radius * Math.cos(a);
    py = 2 * radius * Math.sin(a);
    this.points.push(p.createVector(px, py));
  }
  p.colorMode(p.HSB, 360, 100, 100);
  this.color = p.color(p.random(15,30), p.random(20,35), p.random(20, 95));
}
abe.person.prototype.breathe = function() {

}
abe.person.prototype.walking = function(isWalking) {
  this.isWalking = isWalking;
}
abe.person.prototype.update = function() {
  if(this.isWalking) {
    if(this.dx < 0.5) {
      this.dx = this.p.random(5, 30);
      this.isWalking = false;
    } else {
      this.x -= this.dx;
      this.dx *= this.p.random(0.65, 0.85);
    }
  }
}
abe.person.prototype.paint = function() {
  this.p.fill(this.color);
  this.p.beginShape();
  var i, p;
  for(i=0; i<this.points.length; i++) {
    p = this.points[i];
    this.p.vertex(this.x + p.x, this.y + p.y);
  }
  this.p.endShape(this.p.CLOSE);
}

var s = function( p ) {

  var people = [];
 
  // TO DO:
  //
  // load ../p5-asterisk.svg and paint it on an invisible layer
  // on the top left area centered at width*0.2, height*0.3
  //
  // make people jump when walking
  //
  // add person who is late
  //
  // make people throw colorful shapes (contribute)
  //
  // shapes fly to where invisible asterisk is
  //
  // when they arrive, they fade to rainbow, then to pink
  //
  // add translucid rays coming from speaker
  //
  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background('#2D7BB6');
  
    for(var i=0; i<20; i++) {
      var x = p.windowWidth * p.random(1.0, 1.1);
      var y = p.windowHeight * 0.3;
      people.push(new abe.person(p, x, y));
    }
    p.colorMode(p.RGB, 255);
  };

  // var t; // milliseconds

  p.draw = function() {
    p.background('#2D7BB6');
    p.fill(255);
    p.noStroke();

    var t = p.millis();

    // t<2 move people into screen
    if(t<2000) {
      for(var i in people) {
        people[i].walking(true);
      }
      
    // 3<t<2 pause
    } else if(t < 3000) {

    // 5<t<3 people creating star
    } else if(t < 5000) {

    // 7<t<5 rotate star
    } else if(t < 7000) {

    }

    // draw people
    for(var i in people) {
      var person = people[i];
      person.update();
      person.paint();
    }
    
  };
};

var myp5 = new p5(s);
