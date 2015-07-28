var s = function( p ) {

  var ff;

var vehicles = [];///////////

var type = 1;
var sizee = 1000;//////

var wan = false;
var grid = false;
var imm = false;

var zImage;

p.setup = function() {
  var c = p.createCanvas(p.windowWidth,p.windowHeight);
 // c.position(0,0);

  zImage = p.loadImage("zz.jpg");
  ff = new FlowField();
  for (var i=0; i<sizee; i++) { /////
    vehicles[i] = new Vehicle(); /////
  } //////////
  
  p.background(0);
}
p.draw = function() {
 // p.image(zImage,0,0);
  p.fill(38,25,50, 30);
  p.rect(0, 0, p.width, p.height);
  p.fill(255);
  p.textAlign(p.LEFT);
  p.text("try pressing: left mouse, keys: 1, 2, 3, 4.",100,p.height-100);
  for (var i=0; i<sizee; i++) {/////
    vehicles[i].run(ff);/////
  }////////
  ff.run();
}

p.mousePressed = function() {
  wan = !wan;
  grid = !grid;
  imm = !imm;
}

p.keyPressed = function() {
  if (p.key == '1') {
    type = 1;
  } else if (p.key == '2') {
    type = 2;
  } else if (p.key == '3') {
    type = 3;
  } else if (p.key == '4') {
    type = 4;
  } //else if (p.key == '5') {
   // type = 5;
  //}
}





function FlowField() {
    this.rad = 100;
    this.zoff = 0;
    this.resolution = 10;
    this.rows = p.width/this.resolution;
    this.cols = p.height/this.resolution;
    this.flow = [];
    this.flowGen();
    this.zoff = 0;
    this.aoff;
  }
  FlowField.prototype.run= function() {
    this.flowGen();
    if (grid)this.display();
  };
  FlowField.prototype.flowGen = function(){
    var xoff = 0;
    for (var i=0; i<this.rows; i++) {
      this.flow[i] = [];
      var yoff = 0;
      for (var j=0; j<this.cols; j++) {
        switch(type) {
        case 1:
          var angle = p.map(p.noise(xoff, yoff, this.zoff), 0, 1, 0, p.TWO_PI);
          this.flow[i][j] = p.createVector(p.sin(angle), p.cos(angle));
          yoff+=0.1;
          break;
          case 2: 
          angle = p.map(p.noise(xoff, yoff), 0, 1, 0, p.TWO_PI);
          this.flow[i][j] = p.createVector(p.sin(angle), p.cos(angle));
          yoff+=0.1;
          break;
        case 3: 
          angle = p.map(p.noise(xoff, yoff), 0, 1, 0, p.PI);
          this.flow[i][j] = p.createVector(p.sin(angle), p.cos(angle));
          yoff+=0.1;
          break; 
        case 4: 
          var mouse = p.createVector(p.mouseX, p.mouseY);
          var location = p.createVector(i*this.resolution, j*this.resolution);
          var target = p5.Vector.sub(mouse, location);
          
          target.normalize();
          this.flow[i][j] = target;
          yoff+=0.1;
          break;

        case 5: 
          var imgCenter = p.createVector(zImage.width/2, zImage.height/2);
          angle = p.map(p.noise(xoff, yoff, this.zoff), 0, 1, 0, p.TWO_PI);
          var rann = p.createVector(0,p.random(-1,3));
          this.flow[i][j] = p.createVector(p.sin(angle), p.cos(angle));
          this.flow[i][j].add(rann);
          if (zImage.pixels[j*this.resolution+zImage.width*this.resolution*i] == -16777216) {
            var location1 = p.createVector(j*this.resolution,i*this.resolution);
            p.fill(200);
            p.ellipse(location1.x,location1.y,1,1);
            this.flow[i][j].mult(0);
          }
          yoff+=.01;
          break;
      }
      xoff+=0.001;
    }
    this.zoff+=0.0001;
    }
    
         // console.log( this.flow );
  };
  FlowField.prototype.display = function(){
    for (var i=0; i<this.rows; i++) {
      for (var j=0; j<this.cols; j++) {
        this.drawVector(this.flow[i][j], i*this.resolution, j*this.resolution, this.resolution-2); //// ISSUE HERE !
        //this.drawVector(createVector(1,1), i*this.resolution, j*this.resolution, this.resolution-2);
      }
    }
  };
  FlowField.prototype.drawVector = function(v, x, y, l) {
    p.push();
    var  orientation = v.heading();
    p.translate(x, y);
    p.rotate(orientation-p.PI/4);
    p.stroke(100, 100);
    var len = v.mag()*l;
    p.line(0, 0, len, len);
    p.pop();
  };
  FlowField.prototype.lookup = function(loc) {
    var row = p.int(p.constrain(loc.x/this.resolution, 0, this.rows-1));
    var col = p.int(p.constrain(loc.y/this.resolution, 0, this.cols-1));
    return this.flow[row][col];
  };
  
  //======================================================================================================================
  
  function Vehicle() {
    this.loc = p.createVector(p.random(p.width), p.random(p.height));
    this.velocity = p.createVector(0, 0);
    this.acceleration = p.createVector(0, 0);
    this.maxVel = p.random(2, 2);
    this.maxForce = p.random(0.1, 0.1);
    this.twist = 0;
    this.colran = p.int(p.random(1, 4));
    this.rad = 0;
  }
  Vehicle.prototype.run = function(ff) {
    this.seek(ff);
    this.update();
    this.display();
  };
  Vehicle.prototype.update = function() {
    if (this.loc.x>p.width) {
      this.loc.x = 0;
    }
    if (this.loc.x<0) {
      this.loc.x = p.width;
    }
    if (this.loc.y>p.height) {
      this.loc.y = 0;
    }
    if (this.loc.y<0) {
      this.loc.y = p.height;
    }
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxVel);
    this.loc.add(this.velocity);
    this.acceleration.mult(0);
  };
  Vehicle.prototype.applyForce = function(f) {
    this.acceleration.add(f);
  };
  Vehicle.prototype.seek = function(flow) {
    var desired = flow.lookup(this.loc);    ///////// ISSUE HERE !
    desired.mult(this.maxVel);
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  };
  Vehicle.prototype.display = function() {
    p.push();
    p.noStroke();
    p.translate(this.loc.x, this.loc.y);
    p.rotate(this.velocity.heading()-p.PI/2);
    switch(this.colran) {
    case 1: 
      p.fill('#fe0249'); 
      break;
    case 2: 
      p.fill('#00aeff'); 
      break;
    case 3: 
      p.fill('#fcff00'); 
      break;
    }
    switch(type) {
    case 1 : 
      this.rad = 2;
      break;
    case 2 : 
      this.rad = 5; 
      break;
    case 3 : 
      this.rad = 2;
      break;

    case 4 : 
      this.rad = 2;
      break;
      default: this.rad = 1;
    }
    p.ellipse(0, 0, this.rad, this.rad);
    switch(this.colran) {
    case 1: 
      p.fill(254,2,73, 30); 
      break;
    case 2: 
      p.fill(0,174,255, 30); 
      break;
    case 3: 
      p.fill(252,255,0, 30); 
      break;
    }
    if(this.velocity.mag() === 0) this.rad = 3;
    p.ellipse(0, 0, this.rad*3, this.rad*3);
    p.pop();
  };

}

var myp5 = new p5(s);
