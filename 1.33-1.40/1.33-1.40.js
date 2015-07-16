// your sketch goes here!

var s = function( p ) {

  p.scenes = [];
  p.p5Logo = null;

  // "Class" representing scene one, state (elements and variables) and
  // animation methods
  p.sceneOne = function (w, h, dur) {
  
    this.duration = dur;
    this.sW = w;
    this.sH = h;
    
    // To store element state
    this.elementState = {
      robot1WheelAngle : 0,
      robot1WheelRotation : p.PI / 9,
      robot1CableAnimation: {
        x : 0,
        y : 0
      },
      robot1Cable2Animation: {
        x : 0,
        y : 0,
        y2 : 10,
        adv : 5
      },
      robot1Shake : {
      	x : 5,
      	y : 5
      }
    };
  
    this.drawScene = function () {
      
      p.frameRate(60);
      p.stroke(0);
      p.strokeWeight(3);
      p.noFill();
      
      // Draw "robot 1"
      var rW = this.sW / 10;
      var rH = this.sH / 4;
      var rPosX = 100;
      var rPosY = ((3 * this.sH) / 4) - 100;
      
      // Let's shake!
      p.push(); // shake push
      p.translate(p.random(-this.elementState.robot1Shake.x, this.elementState.robot1Shake.x),
        p.random(-this.elementState.robot1Shake.y, this.elementState.robot1Shake.y));
      
      this.elementState.robot1Shake.x *= -1;
      this.elementState.robot1Shake.y *= -1;
      
      p.rect(rPosX, rPosY, rW, rH, 20);
      
      // Robot 1 wheel
      var wheel1X = rPosX + (rW / 3);
      var wheel1Y = rPosY + (rH / 3); 
      var wheel1D = p.min(rW / 2, rH / 2);
      p.ellipse(wheel1X, wheel1Y, wheel1D, wheel1D);
      
      // Robot 1 Cable
      var cableX = wheel1X;
      var cableY = wheel1Y - (wheel1D / 2)
      var m = ((this.sH / 40) - cableY) / ((this.sW / 4) - cableX);
      var angle = p.atan(m);
      p.line(cableX, cableY, this.sW / 4, this.sH / 40);
      p.stroke(255);
      
      var cableXb = cableX + this.elementState.robot1CableAnimation.x;
      var cableYb = cableY - this.elementState.robot1CableAnimation.y;
       
      p.line(cableXb, cableYb, cableXb + (40 * p.cos(angle)), cableYb + (40 * p.sin(angle)));
      
      // loop animation
      if (this.elementState.robot1CableAnimation.x <= (this.sW / 4)) {
        this.elementState.robot1CableAnimation.x += (40 * p.cos(angle));
  	    this.elementState.robot1CableAnimation.y -= (40 * p.sin(angle));
      } else {
      
        this.elementState.robot1CableAnimation.x = 0;
        this.elementState.robot1CableAnimation.y = 0;
      }
      
      // Robot 1 Cable 2
      p.stroke(0);
      var cable2X = (this.sW / 3);
      var cable2Y = (this.sH / 40);
      
      // The cable and the animation also "rise"
      p.line(cable2X, cable2Y, cable2X, cableY + rH - this.elementState.robot1Cable2Animation.y2);
      p.stroke(255);
      var cable2Yb = cableY + rH - this.elementState.robot1Cable2Animation.y - this.elementState.robot1Cable2Animation.y2;
      
      p.line(cable2X, cable2Yb, cable2X, cable2Yb - 40);
      
      // loop animation
      if (cable2Yb >= cable2Y) {
  	    this.elementState.robot1Cable2Animation.y += 40;
      } else {
      
        this.elementState.robot1Cable2Animation.y = 0;
      }
      
      // p5 logo!
      p.image(p.p5Logo, cable2X, cableY + rH - this.elementState.robot1Cable2Animation.y2, this.sH / 5, this.sH / 5);
      
      // Test if the cable must keep rising
      if ((cableY + rH - this.elementState.robot1Cable2Animation.y2) > (this.sH / 8)) {
        this.elementState.robot1Cable2Animation.y2 += this.elementState.robot1Cable2Animation.adv;
      }
      
      // Robot 1 Wheel Rotation
      p.stroke(0);
      p.push(); // wheel location push
      p.translate(wheel1X, wheel1Y);
      
      var wheel1Xb = 0;
      var wheel1Yb = -wheel1D / 3; 
      var wheel1Db = wheel1D / 4;
      
      p.rotate(this.elementState.robot1WheelAngle);
      p.fill(0);
      p.ellipse(wheel1Xb, wheel1Yb, wheel1Db, wheel1Db);
      this.elementState.robot1WheelAngle += this.elementState.robot1WheelRotation;
      p.pop(); // wheel location pop
      
      // Draw random smoke pufs
      var puf1X = p.random(rPosX, (rPosX + rW) / 2);
      var puf1Y = p.random((rPosY + rH) / 2, rPosY + rH);
      var puf2X = p.random((rPosX + rW) / 2, rPosX + rW);
      var puf2Y = p.random((rPosY + rH) / 2, rPosY + rH);
      
      p.strokeWeight(1);
      p.fill(255);
      var puffD = p.random(15, 30);
      var puff2D = p.random(15, 30);
      p.ellipse(puf1X, puf1Y, puffD, puffD);
      p.ellipse(puf2X, puf2Y, puff2D, puff2D);
      
      p.pop(); // robot shake pop
    };
    
  };

  p.preload = function () {
    
    p.p5Logo = p.loadImage("../p5-asterisk.png");
    p.imageMode(p.CENTER);
  };

  p.setup = function() {
    // put setup code here
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background('#AFAFAF');
    
    // Adding scenes
    p.scenes.push(new p.sceneOne(p.windowWidth, p.windowHeight, 4000));
    //p.scenes.push(new p.sceneTwo());
  };

  p.draw = function() {

    p.background('#AFAFAF');
    p.scenes[0].drawScene();
  };
};

var myp5 = new p5(s);