// your sketch goes here!

/*
 Transcript of relevant video section, with keywords 
 that could be used highlighted:


 "We acknowledge that not everyone has the TIME,
 FINANCIAL MEANS, or CAPACITY to ACTIVELY PARTICIPATE, 
 but we RECOGNIZE and ENCOURAGE INVOLVEMENT of all kinds."


 First idea: floating particles of various shapes and 
 colours, represinting people of different backgrounds. 
 They all gently float around (and try to avoid the mouse
 cursor, to give some interactivity).

 One particle is the p5 asterisk. It "hunts" for 
 friends, moving from unvisited particle to unvisited
 particle. A particle may or may not join the network
 of friends (let's say 20% chance of joining). 

 If it joins, it will become connected to the network.
 A line between itself and the particle that befriended
 it is formed, and it will start to hunt for friends as
 well.

 Note that this is a reference to Fry & Reas' famous
 Processing sketch. You know, the one that looks like:
 http://studio.sketchpad.cc/sp/pad/view/ro.9sfQKA0T6QIW-/rev.10


 Particles should have wobbly soft bodies, like so:
 https://processing.org/examples/softbody.html

*/

var s = function( p ) {
  var particles, p5Asterisk;

  var freeDrifters;

  // Create a center-point to gently nudge 
  // the particles towards, so they don't
  // drift off-screen
  var cx, cy, cradius;

  // A drifter is either freely drifting around,
  // being followed by the p5 Asterisk or one
  // of its friends, a friend of the asterisk,
  // or not available
  var DRIFTING = 0;
  var FOLLOWED = 1;
  var FRIENDED = 2;
  var NOTAVAILABLE = 3;

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(255, 255, 255);

    cx = p.width/4;
    cy = p.height/2;
    cradius = p.min(cx, cy)/2;

    particles = new Array(0);
    for (var i = 0; i < 50; i++) {
    	particles.push(new Drifter());
    };
    freeDrifters = true;

    p5Asterisk = new Asterisk();
    p.imageMode(p.CENTER);
  };

  p.draw = function() {
    p.background(255, 255, 255);
    for (var i = particles.length - 1; i >= 0; i--) {
      particles[i].move();
    };

    // Draw the network in the background
    for (var i = particles.length - 1; i >= 0; i--) {
      particles[i].drawNetwork();
    };
    p5Asterisk.drawNetwork();

    // Draw the not (yet) friended particles in the middle
    for (var i = particles.length - 1; i >= 0; i--) {
      if (particles[i].state != FRIENDED){
        particles[i].draw();
      }
    };

    // Draw the friended particles in the foreground
    for (var i = particles.length - 1; i >= 0; i--) {
      if (particles[i].state == FRIENDED){
        particles[i].draw();
      }
    };    

    p5Asterisk.move().draw();
  };


  // ========== DRIFTER ==========

  var Drifter = function () {
  	this.state = DRIFTING;

  	// colour
  	this.r = p.random(255);
  	this.g = p.random(255);
  	this.b = p.random(255);
  	this.alpha = 0;
  	this.talpha = 0;

  	// sets first position within a circle
  	// make sure cx, cy and cradius are set before creating a Drifter!
  	var t = p.random(p.TAU);
  	var r = p.random(cradius/2, cradius*2);
  	this.x = cx + r * Math.sin(t);
  	this.y = cy + r * Math.cos(t);

  	// store motion in polar coordinates
  	this.theta = p.random(p.TAU);
  	this.dtheta = p.random(-0.01, 0.01);
  	this.ddtheta = p.random(-0.05 - this.dtheta * 0.1, 0.05 - this.dtheta * 0.1);
  	this.v = p.random(0.5, 1);
  	this.dx = Math.sin(this.theta) * this.v;
  	this.dy = Math.cos(this.theta) * this.v;

    // make it a random squiggle
  	this.vertices = new Float32Array(14);
  	for (var i = 0; i < this.vertices.length; i += 2) {
  		// re-using t & r
  		t = p.TAU* (p.random(2) + i) / this.vertices.length;
  		r = p.random(5, 20);
  		this.vertices[i]     = r * Math.sin(t);
  		this.vertices[i + 1] = r * Math.cos(t);
  	};

  	this.tvertices = new Float32Array(this.vertices.length);
  	for (var i = 0; i < this.tvertices.length; i += 2) {
  		// re-using t & r
  		t = p.TAU * (p.random(2) + i) / this.tvertices.length;
  		r = p.random(5, 30);
  		this.tvertices[i]     = r * Math.sin(t);
  		this.tvertices[i + 1] = r * Math.cos(t);
  	};

  	this.verticeCounter = p.random(10, 20);

  	this.friends = new Array(0);

  	this.nextFriend = null;
  };

  Drifter.prototype.draw = function() {
  	if (this.state != DRIFTING){
      if (this.state == NOTAVAILABLE){
        this.talpha = 32;
      } else if (this.state == FOLLOWED){
        this.talpha = 128;
      } else {
        this.talpha = 255;
      }
      this.alpha = this.alpha * 0.8 + this.talpha * 0.2;
      p.fill(this.r, this.g, this.b, this.alpha);
  	  
      p.noStroke();
  	  p.beginShape();
  	  for (var i = 0; i < this.vertices.length; i += 2) {
        p.curveVertex(this.x + this.vertices[i], this.y + this.vertices[i+1]);
  	  };
      p.curveVertex(this.x + this.vertices[0], this.y + this.vertices[1]);  	
      p.curveVertex(this.x + this.vertices[2], this.y + this.vertices[3]);  	
      p.curveVertex(this.x + this.vertices[4], this.y + this.vertices[5]); 	
      p.endShape();
    }
  	return this;
  };

  Drifter.prototype.drawNetwork = function() {
    if (this.state == FRIENDED){
      p.stroke(this.r, this.g, this.b);
      p.strokeWeight(1);
      for (var i = this.friends.length - 1; i >= 0; i--) {
      	p.line(this.x, this.y, this.friends[i].x, this.friends[i].y);
      };
    }
    return this;
  }

  Drifter.prototype.move = function() {
  	this.drift();
  	if (this.state == FRIENDED){
      this.follow();
  	}
    this.squiggleVertices();
  	return this;
  }

  Drifter.prototype.drift = function() {
  	// random acceleration with negative feedback to angular velocity
  	this.ddtheta = p.random(-0.1 - this.dtheta * 0.1, 0.1 - this.dtheta * 0.1);
  	this.dtheta = this.dtheta + this.ddtheta;
  	this.theta = (this.theta + this.dtheta + p.TAU) % p.TAU;

  	// convert polar to carthesian coordinates
   	this.dx = Math.sin(this.theta) * this.v;
  	this.dy = Math.cos(this.theta) * this.v; 	
    // add velocity to position, gently nudge towards (cx, cy)
  	this.x = this.x + this.dx + (cx - this.x)*0.002;
  	this.y = this.y + this.dy + (cy - this.y)*0.002;

  	return this;
  }

  // Makes it look like they're talking :)
  Drifter.prototype.squiggleVertices = function() {
    
  	for (var i = this.vertices.length - 1; i >= 0; i -= 1) {
  	  this.vertices[i] = 0.8125*this.vertices[i] + 0.1875*this.tvertices[i];
    }
    this.verticeCounter -= 1;
    if (this.verticeCounter < 0){
      for (var i = 0; i < this.tvertices.length; i += 2) {
  	    var t = p.TAU* (p.random(2) + i) / this.tvertices.length;
  	    var r = p.random(2, 30);
  	    this.tvertices[i]     = r * Math.sin(t);
  	    this.tvertices[i + 1] = r * Math.cos(t);
  	  };
  	 this.verticeCounter = p.random(5, 20);
    }  	
  }

  Drifter.prototype.follow = function() {
    if (this.nextFriend != null){
    	this.x = this.x * 0.90 + this.nextFriend.x * 0.1;
    	this.y = this.y * 0.90 + this.nextFriend.y * 0.1;

    	var dx = (this.x - this.nextFriend.x);
    	var dy = (this.y - this.nextFriend.y);
    	// if less than 20 pixels away from nextFriend
    	if (dx*dx + dy*dy < 400){
          this.befriend();
    	}
    }
    return this;
  }

  Drifter.prototype.befriend = function(){
    if (p.random(1) < 0.5){ // 1 in 2 chance of befriending
      
      if (this.nextFriend.state != FRIENDED){
        this.nextFriend.state = FRIENDED;
        this.nextFriend.nextTarget();
      }
      var alreadyFriends = false;
      for (var i = 0; i < this.friends.length; i++){
      	alreadyFriends = alreadyFriends || this.friends[i] == this.nextFriend;
      }
      if (!alreadyFriends){
        this.friends.push(this.nextFriend);
      }

    } else if (this.nextFriend.state != FRIENDED){
      this.nextFriend.state = NOTAVAILABLE;
    }
    this.nextTarget();
  }

  Drifter.prototype.nextTarget = function(){
  	this.findTarget();
    //this.createTarget();
  }

  Drifter.prototype.findTarget = function() {
  	if (freeDrifters){
      // Filter out the particles who are not freely drifting
      var potentialFriends = new Array(0);
      var stillFree = false;
      for (var i = particles.length - 1; i >= 0; i--) {
        if (particles[i].state == DRIFTING || particles[i].state == FRIENDED){
          stillFree = stillFree || particles[i].state == DRIFTING;
          potentialFriends.push(particles[i]);
        }
      };
      freeDrifters = stillFree;
  
      if (freeDrifters && potentialFriends.length > 0){
        var index = Math.floor( p.random(potentialFriends.length) );
        this.nextFriend = potentialFriends[index];
        if (this.nextFriend.state != FRIENDED){
          this.nextFriend.state = FOLLOWED;
        }
      } else {
        this.nextFriend = null;
      }
    }
    return this;
  }

  // Alternatively: spawn a new potential friend
  Drifter.prototype.createTarget = function() {
  	if (particles.length < 200){
      this.nextFriend = new Drifter();
      particles.push(this.nextFriend);
    } else {
      this.nextFriend = null;
    }
  }

  // ========== ASTERISK ==========
  // Inherits from Drifter
  // Is the first to look for friends

  var Asterisk = function () {
  	Drifter.call(this);
  	this.img = p.loadImage("p5-asterisk.svg");
    //p5 is always looking for friends!
  	this.state = FRIENDED;
    this.nextTarget();
  }

  Asterisk.prototype = Object.create(Drifter.prototype);

  Asterisk.prototype.constructor = Asterisk;


  Asterisk.prototype.draw = function(){
    p.image(this.img, this.x, this.y);
  }

};

var myp5 = new p5(s);
