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
  var p5colors = [ p.color(237, 34, 93),
                   p.color(45, 123, 182),
                   p.color(255, 255, 255),
                   p.color(238, 153, 0),
                   p.color(166, 127, 89) ];

  // list of astersisks
  var asters = [];

  var drawLine = function(x, y) {
    p.line(x+padding, y+padding, x+(size-padding*2)*p.sqrt(2), y+(size-padding*2)*p.sqrt(2));
  }

  var drawCrosshatch = function(x, y) {
    p.line(x+padding+1, y+padding-1, x+1+((size-1)-padding*2)*p.sqrt(2), y-1+((size-1)-padding*2)*p.sqrt(2));
    p.line(x+padding-1, y+padding+1, x-1+((size-1)-padding*2)*p.sqrt(2), y+1+((size-1)-padding*2)*p.sqrt(2));
  }

  // programmatically make an asterisk:
  //    position (x, y),
  //    weight,
  //    color,
  //    inital rotation,
  //    speed
  // var drawAster = function(x, y, w, c, b, s) {
  //   p.noStroke();
  //   p.push();
  //   p.translate(x, y);
  //   p.rotate(s*b);
  //   for (var i = 0; i < 5; i++) {
  //       p.fill(c);
  //       p.rotate((-2.0*p.PI/5.0));
  //       p.rect(0 - 23*w/2.0, 0, 23*w, 55*w);
  //   };
  //   p.pop();
  // }

  // Aster class
  // x: x position
  // y: y position
  // w: weight i.e. size
  // c: color
  // b: initial rotation
  // s: speed
  function Aster(x, y, w, c, b, s) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.c = c;
    this.b = b;
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

  var asss;
  p.setup = function() {
    // put setup code here
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background('#AFAFAF');

    asss = new Aster(200, 350, 10.5, p.color(137, 34, 93), p.radians(delta), 1.5);

    // for (var i = 0; i < 2; i++) {
        // var aster = Aster(200, 350, 10.5, p.color(237, 34, 93), p.radians(delta), 0.5)
        // asters.push()
    // };
    // layer = p.createGraphics();
    // p.noLoop();
  };

  var randx, randy, randw, randc, speed;
  p.draw = function() {
    p.background('#AFAFAF');

    // console.log(asss);
    asss.drawAster();

    // drawAster(400, 460, 4.5, p.color(90, 50, 200), p.radians(delta), 1.2);
    // drawAster(800, 700, 1.5, p.color(90, 50, 200), p.radians(delta), 2.5);

    // get a random color from the list of colors
    // randc = p5colors[Math.round(p.random(p5colors.length-1))];
    
    // always have the big pink
    // drawAster(200, 350, 10.5, p.color(237, 34, 93), p.radians(delta), 0.5);
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