// your sketch goes here!

var s = function( p ) {

/////////////////
// my stuff ~  //
/////////////////
  var size = 15;
  var delta = 0;
  var padding = 2.5;
  var width = p.windowWidth;
  var height = p.windowHeight;

  // list of all p5 colors
  var p5colors = [ p.color(237, 34, 93),    // pink
                   p.color(45, 123, 182),   // blue
                   p.color(255, 255, 255),  // white
                   p.color(238, 153, 0) ]; // brown

  // list of astersisks
  var asters = [];

  var drawLine = function(x, y) {
    p.line(x+padding, y+padding, x+(size-padding*2)*p.sqrt(2), y+(size-padding*2)*p.sqrt(2));
  }

  var drawCrosshatch = function(x, y) {
    p.line(x+padding+1, y+padding-1, x+1+((size-1)-padding*2)*p.sqrt(2), y-1+((size-1)-padding*2)*p.sqrt(2));
    p.line(x+padding-1, y+padding+1, x-1+((size-1)-padding*2)*p.sqrt(2), y+1+((size-1)-padding*2)*p.sqrt(2));
  }

  // Aster class
  // x: x position
  // y: y position
  // w: weight i.e. size
  // c: color
  // b: initial rotation
  // s: speed
  function Aster(x, y, w, c, s) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.c = c;
    this.s = s;
  }

  Aster.prototype.drawAster = function() {
    p.noStroke();
    p.push();
    p.translate(this.x, this.y);
    p.rotate(this.s * p.radians(delta));
    for (var i = 0; i < 5; i++) {
        p.fill(this.c);
        p.rotate((-2.0*p.PI/5.0));
        p.rect(0 - 23*this.w/2.0, 0, 23*this.w, 55*this.w);
    };
    p.pop();  
  };

  p.setup = function() {
    // put setup code here

    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background('#AFAFAF');

    // always have big pink
    var big_pink = new Aster(200, 350, 10.5, p.color(237, 34, 93), 0.5);
    asters.push(big_pink);

    // randoms~
    var randx, randy, randw, randc, speed;
    for (var i = 0; i < 4; i++) {
        randx = p.random(100, width-100);
        randy = p.random(100, height-100);
        randw = p.random(2, 8);
        randc = p5colors[Math.round(p.random(0, p5colors.length-1))];
        speed = p.map(randw, 2, 8, 5, 0.5);
        var randaster = new Aster(randx, randy, randw, randc, speed);
        asters.push(randaster);
    };

    // for (var i = 0; i < 2; i++) {
        // var aster = Aster(200, 350, 10.5, p.color(237, 34, 93), p.radians(delta), 0.5)
        // asters.push()
    // };
    // layer = p.createGraphics();
    // p.noLoop();
  };

  p.draw = function() {
    p.background('#AFAFAF');

    // always have the big pink
    for (var i = 0; i < asters.length; i++) {
        asters[i].drawAster();
    };

    // console.log(asss);
    // asss.drawAster();

    // drawAster(400, 460, 4.5, p.color(90, 50, 200), p.radians(delta), 1.2);
    // drawAster(800, 700, 1.5, p.color(90, 50, 200), p.radians(delta), 2.5);

    // get a random color from the list of colors
    // randc = p5colors[Math.round(p.random(p5colors.length-1))];
    
    // make random asters
    // for (var i = 0; i < 6; i++) {
    //     randx = p.random(100, width-100);
    //     randy = p.random(100, height-100);
    //     randw = p.random(2, 8);
    //     randc = p5colors[p.random(0, p5colors.length-1)];
    //     speed = p.map(randw, 2, 8, 5, 0.5);

    //     randc = p.color(166, 127, 89);
    //     // drawAster(randx, randy, randw, randc, p.radians(delta), speed);
    // };

    // rotation delta
    delta++;

  };
};

var myp5 = new p5(s);