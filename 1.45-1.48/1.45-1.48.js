// your sketch goes here!

var s = function( p ) {

/////////////////
// my stuff ~  //
/////////////////

  var size = 15;
  var padding = 2.5;
  var width = p.windowWidth;
  var height = p.windowHeight;
  var weight = 2;

  var drawLine = function(x, y) {
    p.line(x+padding, y+padding, x+(size-padding*2)*p.sqrt(2), y+(size-padding*2)*p.sqrt(2));
  }

  var drawCrosshatch = function(x, y) {
    p.line(x+padding+1, y+padding-1, x+1+((size-1)-padding*2)*p.sqrt(2), y-1+((size-1)-padding*2)*p.sqrt(2));
    p.line(x+padding-1, y+padding+1, x-1+((size-1)-padding*2)*p.sqrt(2), y+1+((size-1)-padding*2)*p.sqrt(2));
  }

  // programmatically make an asterisk: position (x, y), weight, and color
  var drawAster = function(x, y, w, c) {
    p.noStroke();
    p.push();
    p.translate(x, y);
    for (var i = 0; i < 5; i++) {
        p.fill(c);
        p.rotate(-2.0*p.PI/5.0);
        p.rect(0 - 23*w/2.0, 0, 23*w, 55*w);
    };
    p.pop();
  }

  p.preload = function() {
    // aster = p.loadImage('assets/p5-xsmall-aster.png');
  }

  p.setup = function() {
    // put setup code here
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background('#AFAFAF');

    // layer = p.createGraphics();
    // p.noLoop();
  };

  p.draw = function() {
    // p.push();
    //     p.noStroke();

    //     p.rotate(-2.0*p.PI/5.0);
    //     p.fill(0, 245, 0);
    //     p.rect(0 - 23*weight/2.0, 0, 23*weight, 55*weight);

    //     p.rotate(-2.0*p.PI/5.0);
    //     p.fill(0, 245, 0);
    //     p.rect(0 - 23*weight/2.0, 0, 23*weight, 55*weight);

    //     p.rotate(-2.0*p.PI/5.0);
    //     p.fill(0, 245, 0);
    //     p.rect(0 - 23*weight/2.0, 0, 23*weight, 55*weight);

    //     p.rotate(-2.0*p.PI/5.0);
    //     p.fill(0, 245, 0);
    //     p.rect(0 - 23*weight/2.0, 0, 23*weight, 55*weight);

    //     p.rotate(-2.0*p.PI/5.0);
    //     p.fill(0, 245, 0);
    //     p.rect(0 - 23*weight/2.0, 0, 23*weight, 55*weight);
    // p.pop();

    drawAster(100, 100, 1, p.color(200, 0, 100));
    drawAster(400, 400, 1.5, p.color(90, 50, 200));

    // layer.image(aster, 0, 0, 100, 100);
    // p.image(aster, 0, 0, 100, 100);
    // p.ellipse(100, 100, 230, 230);

  };
};

var myp5 = new p5(s);