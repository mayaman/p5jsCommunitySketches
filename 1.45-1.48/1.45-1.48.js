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
  var pixd = p.pixelDensity;
  var text_show = true;

  // list of all p5 colors
  var p5colors = [ p.color(237, 34, 93),    // pink
                   p.color(45, 123, 182),   // blue
                   p.color(255, 255, 255),  // white
                   p.color(238, 153, 0) ]; // brown

  // list of astersisks
  var asters = [];

  // sampling layer
  var layer;

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

  // function to draw asterisks onto canvas
  Aster.prototype.drawAster = function() {
    // console.log(layer);
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

  // function to draw asterisks (onto the layer)
  // todo: implement this later ~
  Aster.prototype.drawAsterOnLayer = function() {
    // console.log(layer);
    layer.noStroke();
    layer.push();
    layer.translate(this.x, this.y);
    layer.rotate(this.s * p.radians(delta));
    for (var i = 0; i < 5; i++) {
        layer.fill(this.c);
        layer.rotate((-2.0*p.PI/5.0));
        layer.rect(0 - 23*this.w/2.0, 0, 23*this.w, 55*this.w);
    };
    layer.pop();  
  };

  p.setup = function() {
    // put setup code here

    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background('#AFAFAF');

    layer = p.createGraphics(p.windowWidth, p.windowHeight);

    // always have big pink
    var big_pink = new Aster(200, 350, 10.5, p.color(237, 34, 93), 0.5);
    asters.push(big_pink);

    // generate randoms~
    var randx, randy, randw, randc, speed;
    for (var i = 0; i < 4; i++) {
        randx = p.random(100, width-100);
        randy = p.random(100, height-100);
        randw = p.random(2, 8);
        randc = p5colors[Math.round(p.random(0, p5colors.length-1))];
        speed = p.map(randw, 2, 8, 4, 0.5);
        var randaster = new Aster(randx, randy, randw, randc, speed);
        // push new randoms
        asters.push(randaster);
    };

    // get that pixel data
    p.loadPixels();
    p.textFont("AvenirNextLTW01­Medium");
    p.textSize(140);

    // layer.loadPixels();

    // layer.frameRate(100);
    // p.frameRate(100);

  };

  p.draw = function() {
    p.background('#AFAFAF');
    layer.background('#AFAFAF');

    // draw random asters onto the layer
    for (var i = 0; i < asters.length; i++) {
        asters[i].drawAster();
    };

    if (text_show) {
      p.text("THE FUTURE", width/2-300, 100);
    }

    // layer.updatePixels();
    // draw all the "squares"
    // var layerc;
    // for (var i = 0; i < width + size; i+=size) {
    //     for (var j = 0; j < height + size; j+=size) {

    //     }
    // }

    // console.log(layer.get(100, 100));
    // layer.rect(10, 10, 100, 100);
    // layer.fill(200);
    // p.image(layer, 0, 0);

    // rotation delta
    delta++;

  };

  p.mouseClicked = function() {
    asters = [];
    p.setup();
    text_show = false;
  };

  p.keyPressed = function() {
    asters = [];
    p.setup();
    text_show = false;
  }
};


var myp5 = new p5(s);