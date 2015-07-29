// your sketch goes here!

var s = function( p ) {

  p.scenes = [];
  p.p5Logo = null;

  // "Class" representing scene one, state (elements and variables) and
  // animation methods
  p.sceneOne = function (w, h) {
  
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
        adv : 2
      },
      robot1Shake : {
      	x : 5,
      	y : 5
      }
    };
  
    this.drawScene = function () {
      
      p.stroke(0);
      p.strokeWeight(3);
      p.noFill();
      
      // Draw "robot 1"
      var rW = this.sW / 10;
      var rH = this.sH / 4;
      var rPosX = 100;
      var rPosY = ((3 * this.sH) / 4) - 100;
      
      // Lets shake!
      p.push(); // shake push
      p.translate(p.random(-this.elementState.robot1Shake.x, this.elementState.robot1Shake.x),
        p.random(-this.elementState.robot1Shake.y, this.elementState.robot1Shake.y));
      
      this.elementState.robot1Shake.x *= -1;
      this.elementState.robot1Shake.y *= -1;
      
      p.rect(rPosX, rPosY, rW, rH, 20);
      p.rect(rPosX + 5, ((rPosY + rH) + rPosY) / 2 , rW - 5, rH / 4);
      
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
      p.ellipse(0, 0, wheel1D / 4, wheel1D / 4);
      
      var wheel1Xb = 0;
      var wheel1Yb = -wheel1D / 3; 
      var wheel1Db = wheel1D / 4;
      
      p.rotate(this.elementState.robot1WheelAngle);
      p.fill(0);
      p.ellipse(wheel1Xb, wheel1Yb, wheel1Db, wheel1Db);
      p.ellipse(-wheel1Xb, -wheel1Yb, wheel1Db / 2, wheel1Db / 2);
      this.elementState.robot1WheelAngle += this.elementState.robot1WheelRotation;
      p.pop(); // wheel location pop
      
      // Draw random smoke pufs
      
      p.pop(); // robot shake pop
    };
    
  };
  
  
  // This will be about "people" making "improvements"
  p.sceneTwo = function (w, h) {
  
    this.sW = w;
    this.sH = h;
    
    this.elementState = {
      MAX_PEOPLE : 20,
      people : [],
      nFramesToAddPerson : 10,
      nFramesToAddText : 45,
      texts : ["Hello!", "Welcome!", "Thank you!", "You're welcome", "Thx", "noprobs",
        ":)", "sin(X)", "line()", "random()"]
    };
  
    this.drawScene = function () {
      
      p.stroke(0);
      p.strokeWeight(2);
      p.textSize(this.sH / 32);
      
      // To draw each "person"
      for (var i = 0; i < this.elementState.people.length; ++i) {
      
        p.fill(this.elementState.people[i].color);
        
        if (p.frameCount % this.elementState.nFramesToAddText == 0) {
          
          this.elementState.people[i].text = this.elementState.texts[p.floor(
            p.random(0, this.elementState.texts.length - 1))];
        }      
        
        // body
        p.line(this.elementState.people[i].x, this.elementState.people[i].y, 
          this.elementState.people[i].x, this.elementState.people[i].y + 20);
        // arms  
        p.line(this.elementState.people[i].x - 10, this.elementState.people[i].y + 10, 
          this.elementState.people[i].x + 10, this.elementState.people[i].y + 10);  
        //left leg  
        p.line(this.elementState.people[i].x, this.elementState.people[i].y + 20, 
          this.elementState.people[i].x - 10, this.elementState.people[i].y + 40);  
        //right leg  
        p.line(this.elementState.people[i].x, this.elementState.people[i].y + 20, 
          this.elementState.people[i].x + 10, this.elementState.people[i].y + 40);
        // head
        p.ellipse(this.elementState.people[i].x, this.elementState.people[i].y, 10, 10);
        
        p.stroke(this.elementState.people[i].color);
        p.strokeWeight(1);
        p.text(this.elementState.people[i].text, this.elementState.people[i].x,
          this.elementState.people[i].y - 5);
        p.strokeWeight(2);
        p.stroke(0);
      }
      
      // After certain quantity of frames, add another person
      if (p.frameCount % this.elementState.nFramesToAddPerson == 0 &&
	    this.elementState.people.length <= this.elementState.MAX_PEOPLE) {
      
        var gapValX = (((19 * this.sW) / 20) - ((3 * this.sW) / 4)) / 20;
        var gapValY = (((9 * this.sH) / 10) - ((this.sH) / 10)) / 20;
        
        this.elementState.people.push({
          x : ((3 * this.sW) / 4) + (p.floor(p.random(0, gapValX)) * 20),
          y : ((this.sH) / 10) + (p.floor(p.random(0, gapValY)) * 20),
          color : p.color(p.random(0, 225), p.random(0, 225), p.random(0, 225)),
          text : ""
        });  
      }
    };
  };
  
  // this scene is about "sketching", the idea is to show a
  // progress from simple to complex
  p.sceneThree = function (w, h) {
  
    this.sW = w;
    this.sH = h;
    
    this.elementState = {
      // Set of graphic buffers
      sketches : [],
      nFramesToAddSketches : 35,
      currSketch : 0
    };
    
    // Loading the sketches
    var size = p.min(w / 4, h / 4);
    
    var sketch1 = p.createGraphics(size, size);
    sketch1.background("#FFFFFF");
    sketch1.stroke(0);
    sketch1.strokeWeight(5);
    sketch1.point(size / 2, size / 2);
    
    this.elementState.sketches.push({sketch : sketch1, posX : w / 10,
      posY : h / 10});
    
    sketch1 = p.createGraphics(size, size);
    sketch1.background("#8F8F8F");
    sketch1.stroke(0);
    sketch1.line(size / 10, size / 10, 9 * size / 10, 9 * size / 10);
    
    this.elementState.sketches.push({sketch : sketch1, posX : w / 10,
      posY : h / 10});
      
    sketch1 = p.createGraphics(size, size);
    sketch1.background("#44AAFF");
    sketch1.stroke("#771122");
    sketch1.noFill();
    sketch1.strokeWeight(2);
    sketch1.quad(size / 10, size / 10, 9 * size / 10, size / 10, 9 * size / 10,
      9 * size / 10, size / 10, 9 * size / 10);
    sketch1.line(size / 6, size / 4, size / 6, size / 2);
    sketch1.line((5 * size) / 6, size / 4, (5 * size) / 6, size / 2);
    sketch1.curve(size / 4, size / 3, size / 3, size / 2, (2 * size) / 3, size / 2,  (3 * size) / 4, size / 3);
    
    this.elementState.sketches.push({sketch : sketch1, posX : w / 10,
      posY : h / 10});
      
    sketch1 = p.createGraphics(size, size);
    sketch1.background(0);
    sketch1.stroke(255);
    sketch1.noFill();
    sketch1.beginShape(p.TRIANGLE_STRIP);
    
    for (var j = 0; j < 10; ++j) {
      
      sketch1.vertex(p.random(0, size), p.random(0, size));
      sketch1.vertex(p.random(0, size), p.random(0, size));
      sketch1.vertex(p.random(0, size), p.random(0, size));
    }
    
    sketch1.endShape();
    
    this.elementState.sketches.push({sketch : sketch1, posX : w / 10,
      posY : h / 10});
	
    sketch1 = p.createGraphics(size, size);
    sketch1.background("#FFFFFF");
    sketch1.stroke(0);
    sketch1.strokeWeight(2);
    sketch1.blendMode(p.DIFFERENCE);
    sketch1.fill("#0000FF");
    sketch1.ellipse(0, 0, 2 * size, 2 * size);
    sketch1.fill("#00FF00");
    sketch1.ellipse(size, 0, 2 * size, 2 * size);
    sketch1.fill("#FF0000");
    sketch1.ellipse(size / 2, size, size, size);
    
    this.elementState.sketches.push({sketch : sketch1, posX : w / 10,
      posY : h / 10});
    
    sketch1 = p.createGraphics(size, size);
    sketch1.background(0);
    
    var maxCol = p.constrain(size * size, 0, p.unhex("FFFFFF"));
    var currCol = 0;
    for (var k = 0; k < size; k+=2) {
      for (var l = 0; l < size; l+=2) {
        var col = p.color("#" + p.hex(currCol, 6));
        sketch1.stroke(col);  
        sketch1.point(k, l);
        currCol = (currCol + 1) % maxCol;
      }
    }
    
    //img.updatePixels();
    //sketch1.image(img, 0, 0);
    
    this.elementState.sketches.push({sketch : sketch1, posX : w / 10,
      posY : h / 10})
    
    this.drawScene = function () {
      
      p.stroke(75);
      p.strokeWeight(1);
      
      var curr = this.elementState.currSketch % this.elementState.sketches.length;
      for (i = 0; i <= curr; ++i) {
        
        p.image(this.elementState.sketches[i].sketch, this.elementState.sketches[i].posX,
          this.elementState.sketches[i].posY);
      }
      
      if (p.frameCount % this.elementState.nFramesToAddSketches == 0) {
        ++this.elementState.currSketch;
      }
    };
  };
  
  // Scene to draw bacground decoration
  p.sceneFour = function (w, h) {
    this.sW = w;
    this.sH = h;
    
    this.elementState = {
      MAX_BOXES : 10,
      MAX_TEXT  : 10
    };
    
    p.stroke(75);
    p.noFill();
    
    this.drawScene = function () {
    
      // drawing random "plot boxes"
      for (var i = 0; i < this.elementState.MAX_BOXES; ++i) {
        
        var points = [
          p.random(w / 20, w),
          p.random(h / 20, h),
          p.random(0, w),
          p.random(0, h)
        ];
        
        p.line(points[2], points[3], points[0], points[3]);
        p.line(points[0], points[3], points[0], points[1]);
        p.line(points[0], points[1], points[2], points[1]);
        p.line(points[2], points[1], points[2], points[3]);
      }
      
      // Random text
      p.textSize(this.sH / 32)
      p.fill(0);
	  p.stroke(0);
      for (var j = 0; j < this.elementState.MAX_TEXT; ++j) {
        
        var points = [
          p.random(0, w),
          p.random(0, h)
        ];
        
        p.text(p.char(p.floor(p.random(65, 90))), points[0], points[1]);
      }
    }
  };

  p.preload = function () {
    
    p.p5Logo = p.loadImage("assets/p5-asterisk.png");
    p.imageMode(p.CENTER);
    p.textFont("Times");
  };

  p.setup = function() {
    // put setup code here
    p.frameRate(40);
    p.createCanvas(p.windowWidth, p.windowHeight);
    
    // Adding scenes
    p.scenes.push(new p.sceneFour(p.windowWidth, p.windowHeight));
    p.scenes.push(new p.sceneTwo(p.windowWidth, p.windowHeight));
    p.scenes.push(new p.sceneThree(p.windowWidth, p.windowHeight));
    p.scenes.push(new p.sceneOne(p.windowWidth, p.windowHeight));
  };

  p.draw = function() {

    p.background("#AFAFAF");
    p.scenes[0].drawScene();
    p.scenes[1].drawScene();
    p.scenes[2].drawScene();
    p.scenes[3].drawScene();
  };
};

var myp5 = new p5(s);
