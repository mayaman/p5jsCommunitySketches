// your sketch goes here!

var s = function( p ) {

  p.scenes = [];

  // "Class" representing scene one, state (elements and variables) and
  // animation methods
  p.sceneOne = function (w, h, dur) {
  
    this.duration = dur;
    this.sW = w;
    this.sH = h;
    
    // To store element state
    this.elementState = {
      robot1WheelAngle : 0,
      robot1WheelRotation : p.PI / 12,
      robot1CableAnimationPos: {
        x : 0,
        y : 0
      }
    };
  
    this.drawScene = function () {
      p.stroke(0);
      p.strokeWeight(2);
      p.noFill();
      
      // Draw "robot 1"
      var rW = this.sW / 10;
      var rH = this.sH / 4;
      var rPosX = 100;
      var rPosY = ((3 * this.sH) / 4) - 100;
      p.rect(rPosX, rPosY, rW, rH, 20);
      
      // Robot 1 wheel
      var wheel1X = rPosX + (rW / 3);
      var wheel1Y = rPosY + (rH / 3); 
      var wheel1D = p.min(rW / 2, rH / 2);
      p.ellipse(wheel1X, wheel1Y, wheel1D, wheel1D);
      
      // Robot 1 Cable
      p.line(wheel1X, wheel1Y - (wheel1D / 2), this.sW / 2, this.sW / 40);
      p.stroke(255);
      
      // Robot 1 Wheel Rotation
      p.stroke(0);
      p.push();
      p.translate(wheel1X, wheel1Y);
      
      var wheel1Xb = 0;
      var wheel1Yb = -wheel1D / 3; 
      var wheel1Db = wheel1D / 4;
      
      p.rotate(this.elementState.robot1WheelAngle);
      p.fill(0);
      p.ellipse(wheel1Xb, wheel1Yb, wheel1Db, wheel1Db);
      this.elementState.robot1WheelAngle += this.elementState.robot1WheelRotation;
      p.pop();
      
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
      
      
      //p.pop();
    };
    
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