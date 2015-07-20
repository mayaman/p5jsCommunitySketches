// your sketch goes here!

/*
 Transcript of relevant video section, with keywords 
 that could be used highlighted:


 "We acknowledge that not everyone has the TIME,
 FINANCIAL MEANS, or CAPACITY to ACTIVELY PARTICIPATE, 
 but we RECOGNIZE and ENCOURAGE INVOLVEMENT of all kinds."


 Current idea: floating particles of various shapes and 
 colours, represinting people of different backgrounds. 
 They all gently float around.

 One particle is the p5 asterisk. It "hunts" for 
 friends, moving from unvisited particle to unvisited
 particle. A particle may or may not join the network
 of friends (chance of joining determined by testing). 

 If it joins, it will become connected to the network.
 A line between itself and the particle that befriended
 it is formed, and it will start to hunt for friends as
 well.

 Note that this is a reference to Fry & Reas' famous
 Processing sketch. You know, the one that looks like:
 http://studio.sketchpad.cc/sp/pad/view/ro.9sfQKA0T6QIW-/rev.10

 "user.png", "befriended.png" and "unavailable.png" are rasterised
 versions of the Font Awesome glyps "user", "user plus" and 
 "user times".
 http://fontawesome.io/icon/user/
 http://fontawesome.io/icon/user-plus/
 http://fontawesome.io/icon/user-times/
*/

var s = function( p ) {
  var p5Asterisk;
  
  var particles;
  var nextTargetIndex, askedIndex;
  
  var userIcon, befriendIcon, notAvailableIcon;
  
  // Create a center-point to gently nudge 
  // the particles towards, so they don't
  // drift off-screen
  var cx, cy, cradius;

  var particleRadius;

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(255, 255, 255);

    cx = (p.width/4 | 0);
    cy = (p.height/2 | 0);
    cradius = (p.min(cx, cy)/2 | 0);

    particleRadius = (p.max( p.min(p.width, p.height)/16, 40) | 0);

    particles = new Array(20);
    for (var i = 0; i < particles.length; i++) {
      particles[i] = new Drifter();
    };
    
    nextTargetIndex = 0;
    askedIndex = 0;

    p5Asterisk = new Asterisk();
    
    userIcon = p.createGraphics(particleRadius, particleRadius);
    befriendIcon = p.createGraphics(particleRadius, particleRadius);
    notAvailableIcon = p.createGraphics(particleRadius, particleRadius);

    p.loadImage("assets/user.png", function(tempImg){
      userIcon.image(tempImg, 0, 0, particleRadius, particleRadius);
    });
    
    p.loadImage("assets/befriended.png", function(tempImg){
      befriendIcon.image(tempImg, 0, 0, particleRadius, particleRadius);
    });
       
    p.loadImage("assets/unavailable.png", function(tempImg){
      notAvailableIcon.image(tempImg, 0, 0, particleRadius, particleRadius);    
    });
    
    p.imageMode(p.CENTER);
    p.strokeWeight(particleRadius/8);

  };

  p.draw = function() {
    p.background(255, 255, 255);

   for (var i = particles.length - 1; i >= 0; i--) {
      particles[i].move();
    };
    p5Asterisk.move();

    // Draw the unavailable particles in the back
    for (var i = askedIndex - 1; i >= 0; i--) { // can only be unavailable if already asked
      if (!particles[i].isBefriended){
        particles[i].draw();
        particles[i].drawIcon(notAvailableIcon);
      }
    };

    // Draw the friendship network
    // Match color of asterisk
    p.stroke(237, 34, 93, 128);
    for (var i = askedIndex - 1; i >= 0; i--) { // can only be part of the network is asked
      if (particles[i].isBefriended){
        particles[i].drawNetwork();
      }
    };

    p5Asterisk.drawNetwork();
    
    // Draw the befriended particles thoughts
    for (var i = askedIndex - 1; i >= 0; i--) {
      if (particles[i].isBefriended){
        particles[i].imagine().draw();
      }
    };

    // Draw the followed/unasked particles' icons
    for (var i = particles.length - 1; i >= askedIndex; i--) {
      particles[i].drawIcon(userIcon);
    };
    
    // Draw the befriended particles' icons
    for (var i = askedIndex - 1; i >= 0; i--) {
      if (particles[i].isBefriended){
        particles[i].drawIcon(befriendIcon);
      }
    };
    
    p5Asterisk.draw();
   
  };


  // ========== DRIFTER ==========

  var Drifter = function () {

    this.isBefriended = false;

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
    this.v = p.random(.25, 3/4);
    this.dx = Math.sin(this.theta) * this.v;
    this.dy = Math.cos(this.theta) * this.v;

    this.squiggle = new Squiggle(0);

    this.friends = new Array(0);
    this.maxFriends = 2;

    this.nextFriend = null;
    
    this.iconTimer = 0;
  };

  Drifter.prototype.draw = function() {
    this.squiggle.draw(this.x + particleRadius, this.y - particleRadius);
    return this;
  };

  Drifter.prototype.drawNetwork = function() {
    if (this.friends.length > 0){
      for (var i = this.friends.length - 1; i >= 0; i--) {
        p.line(this.x, this.y, this.friends[i].x, this.friends[i].y);
      };
    }
    return this;
  }

  Drifter.prototype.drawIcon = function(icon) {
    p.image(icon, (this.x|0), (this.y|0));
  }
  
  Drifter.prototype.move = function() {
    if (this.nextFriend != null){
      this.follow();
    } else {
      this.drift();
    }
    return this;
  }
  
  Drifter.prototype.imagine = function() {
    this.squiggle.move();
    return this;    
  }

  Drifter.prototype.drift = function() {
    // random acceleration with negative feedback to angular velocity
    this.ddtheta = p.random(-0.09375 - this.dtheta * 0.09375, 0.09375 - this.dtheta * 0.09375);
    this.dtheta = this.dtheta + this.ddtheta;
    this.theta = (this.theta + this.dtheta + p.TAU) % p.TAU;

    // convert polar to carthesian coordinates
    this.dx = Math.sin(this.theta) * this.v;
    this.dy = Math.cos(this.theta) * this.v;

    if (this.isBefriended){
      // more active!
      this.dx *= 4;
      this.dy *= 4;
      // gently nudge into a ring around (cx, cy)
      var dx = this.x - cx;
      var dy = this.y - cy;
      var dist = Math.sqrt(dx*dx + dy*dy);
      if (dist > cradius * 0.5) {
         this.x = this.x - dx * 0.0048828125;
         this.y = this.y - dy * 0.0048828125;
      } else {
         this.x = this.x + dx * 0.009765625;
         this.y = this.y + dy * 0.009765625;
      }
    }    
    // add velocity to position
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;

    return this;
  }  

  Drifter.prototype.follow = function() {
    if (this.nextFriend != null){
      this.x = this.x * 0.9375 + this.nextFriend.x * 0.0625;
      this.y = this.y * 0.9375 + this.nextFriend.y * 0.0625;

      // If less than particleRadius pixels away from nextFriend
      if (this.sqDist(this.nextFriend) < particleRadius*particleRadius){
        //Try to befriend 
        this.befriend();
      }
    }
    return this;
  }

  Drifter.prototype.befriend = function(){
  	// the more friends you have, the harder it is to make new ones
  	// Gives a more evenly distributed network
    if (p.random(1)*(this.friends.length + 5) < 3){
      
      if (!this.nextFriend.isBefriended){
        this.nextFriend.isBefriended = true;
        this.nextFriend.squiggle.tfactor = 2;
        this.nextFriend.nextTarget();
      }

      // Connect to new friend
      this.friends.push(this.nextFriend);

      // Connect new friend to the p5 Asterisk
      p5Asterisk.friends.push(this.nextFriend);

    } else {
      // Initialised to this value by default
      // this.nextFriend.isBefriended = false;
    }

    // we asked if nextFriend wants to be our friend,
    // so we increment askedIndex, but first swap
    // the particle at that point with this.nextFriend
    for (var i = askedIndex; i < nextTargetIndex; i++){
      if (particles[i] === this.nextFriend){
        particles[i] = particles[askedIndex];
        particles[askedIndex] = this.nextFriend;
        break;
      }
    }
    askedIndex++;

    // find a new potential friend to chase
    this.nextTarget();    
  }

  Drifter.prototype.nextTarget = function(){
    // If we're not at our maximum number of friends,
    // and there are still particles to ask, ask the
    // next particle in line.
    if (this.friends.length < this.maxFriends && nextTargetIndex < particles.length){
      this.nextFriend = particles[nextTargetIndex++];
    } else {
      this.nextFriend = null;
    }
    return this;
  }

  Drifter.prototype.sqDist = function(that){
  	var dx = this.x - that.x;
  	var dy = this.y - that.y;
  	return dx*dx + dy*dy;
  }
  // ========== ASTERISK ==========
  // Inherits from Drifter
  // Is the first to look for friends

  var Asterisk = function () {
    Drifter.call(this);
    // Image and matching colors
    this.p5img = p.createGraphics(particleRadius, particleRadius);
    var ast = this;
    p.loadImage("assets/p5-asterisk.png", function(tempImg){
      console.log("loaded asterisk!");
      ast.p5img.image(tempImg, 0, 0, particleRadius, particleRadius);
    });
    

    //p5 is always looking for friends!
    this.maxFriends = particles.length;
    this.nextTarget();
  }

  Asterisk.prototype = Object.create(Drifter.prototype);

  Asterisk.prototype.constructor = Asterisk;

  Asterisk.prototype.draw = function(){
    p.image(this.p5img, (this.x|0), (this.y|0));
  }
  
  Asterisk.prototype.drift = function() {
    // nudge towards the center
    this.x = (this.x*15 + cx)*0.0625;
    this.y = (this.y*15 + cy)*0.0625;
    
    // random acceleration with negative feedback to angular velocity
    this.ddtheta = p.random(-0.09375 - this.dtheta * 0.09375, 0.09375 - this.dtheta * 0.09375);
    this.dtheta = this.dtheta + this.ddtheta;
    this.theta = (this.theta + this.dtheta + p.TAU) % p.TAU;

    // convert polar to carthesian coordinates
    this.dx = Math.sin(this.theta) * this.v;
    this.dy = Math.cos(this.theta) * this.v;

    // add velocity to position
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;
  } 
  
  // ========== SQUIGGLE ==========
  // Squiggle shape - used by drifter, refactored into separate class

  var Squiggle = function (_factor) {
  	this.factor = _factor;
  	this.tfactor = _factor;
  	this.verticeTimer = p.random(2*this.factor, 5*this.factor);

    // make it a random squiggle
    var points = 2 * (p.random(7, 10) | 0);
    this.vertices = new Float32Array(points);
    this.nextvertices = new Float32Array(this.vertices.length);
    this.randomiseVertices();
    this.randomiseNextVertices();

    // squiggle's colour
    this.r, this.g, this.b;
    this.nextr, this.nextg, this.nextb;
    
    this.randomiseColour();
    this.randomiseNextColour()

    this.alpha = 0;
    this.talpha = 128;
  }

  Squiggle.prototype.randomiseVertices = function () {
    for (var i = 0; i < this.vertices.length; i += 2) {
      var t = p.TAU* (p.random(2) + i) / this.vertices.length;
      var r =  p.random(0.1, 1);
      this.vertices[i]     = r*Math.sin(t);
      this.vertices[i + 1] = r*Math.cos(t);
    };
  }

  Squiggle.prototype.randomiseNextVertices = function () {
    for (var i = 0; i < this.nextvertices.length; i += 2) {
      var t = p.TAU * (p.random(2) + i) / this.nextvertices.length;
      var r =  p.random(0.1, 1);
      this.nextvertices[i]     = r*Math.sin(t);
      this.nextvertices[i + 1] = r*Math.cos(t);
    };
  }
  
  Squiggle.prototype.randomiseColour = function() {
    this.r = p.random(64, 255);
    this.g = p.random(64, 255);
    this.b = p.random(64, 255);
    
    //ensure that one channel is darker,
    //for visibility reasons
    var t = (p.random(3) | 0);
    switch(t){
      case 2:
      this.r = p.random(128);
      break;
      case 1:
      this.g = p.random(128);
      break;
      case 0:
      this.b = p.random(128);
    }
  }
  
  Squiggle.prototype.randomiseNextColour = function() {
    this.nextr = p.random(64, 255);
    this.nextg = p.random(64, 255);
    this.nextb = p.random(64, 255);
    
    //ensure that one channel is darker,
    //for visibility reasons
    var t = (p.random(3) | 0);
    switch(t){
      case 2:
      this.nextr = p.random(128);
      break;
      case 1:
      this.nextg = p.random(128);
      break;
      case 0:
      this.nextb = p.random(128);
    }
  }

  // Makes it look like they're talking :)
  Squiggle.prototype.move = function() {
  	this.factor = this.factor * 0.9375 + this.tfactor * 0.0625;
    
    if (--this.verticeTimer < 0){
      this.randomiseNextVertices();
      this.randomiseNextColour();
      this.verticeTimer = (p.random(4*this.factor, 10*this.factor) | 0);
    }
    else {
      var speed = 0.25 / this.factor 
      this.r = (1 - speed)*this.r + speed*this.nextr;
      this.g = (1 - speed)*this.g + speed*this.nextg;
      this.b = (1 - speed)*this.b + speed*this.nextb;
      for (var i = this.vertices.length - 1; i >= 0; i -= 1) {
        this.vertices[i] = (1 - speed)*this.vertices[i] + speed*this.nextvertices[i];
      }
    }
  }

  Squiggle.prototype.draw = function(x, y) {
    this.alpha = this.alpha * 0.90625 + this.talpha * 0.09375;
    p.fill(this.r, this.g, this.b, this.alpha);
    p.noStroke();
    p.beginShape();
    {
      var radius = particleRadius * this.factor;
      for (var i = 0; i < this.vertices.length; i += 2) {
        p.curveVertex(x + radius * this.vertices[i], y + radius * this.vertices[i+1]);
      };
      p.curveVertex(x + radius * this.vertices[0], y + radius * this.vertices[1]);
      p.curveVertex(x + radius * this.vertices[2], y + radius * this.vertices[3]);
      p.curveVertex(x + radius * this.vertices[4], y + radius * this.vertices[5]);
    }
    p.endShape();
  }

};

var myp5 = new p5(s);

