// your sketch goes here!

var s = function( p ) {

/////////////////
// my stuff ~  //
/////////////////

  var size = 15;
  var padding = 3;
  var asterisk;
  
  var drawLine = function(x, y) {
    p.line(x+padding, y+padding, x+(size-padding*2)*p.sqrt(2), y+(size-padding*2)*p.sqrt(2));
  }

  var drawCrosshatch = function(x, y) {
    p.line(x+padding+1, y+padding-1, x+1+((size-1)-padding*2)*p.sqrt(2), y-1+((size-1)-padding*2)*p.sqrt(2));
    p.line(x+padding-1, y+padding+1, x-1+((size-1)-padding*2)*p.sqrt(2), y+1+((size-1)-padding*2)*p.sqrt(2));
  }

  p.preload = function() {
    asterisk = p.loadImage('assets/p5-asterisk.png');
  }

  p.setup = function() {
    // put setup code here
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background('#AFAFAF');

    // p.image(asterisk, 0, 0, p.windowWidth, p.windowHeight);
    // asterisk.loadPixels();

    p.loadPixels();
    // p.noLoop();

  };

  p.draw = function() {
    var width = p.windowWidth;
    var height = p.windowHeight;

    // size of square
    // padding amount

    // p.fill(255,0,0)
    // p.noStroke()
    // p.rect(100, 100, size, size);
    // p.fill(0,0,255);
    // p.rect(100 + 3, 100 + 3, size - 6, size - 6);
    p.strokeWeight(1);
    p.stroke(133);

    p.background('#AFAFAF');


    // draw all the "squares"
    for (var i = 0; i < width + size; i+=size) {
        for (var j = 0; j < height + size; j+=size) {

            if (i <= p.mouseX && i+size > p.mouseX) {
                p.stroke(237, 34, 93);   
                drawCrosshatch(i, j);
            } else {
                p.stroke(255);   
                drawLine(i, j);
            }

            // drawLine(i, j);



            // c = asterisk.get(i, j);
            // console.log("color is", c);
            // if (c[0] == 237) {
            //     p.stroke(237, 34, 93);
            //     drawCrosshatch(i, j);
            // } else {
            //     p.stroke(255);
            //     drawLine(i, j);
            // }

            // // p.fill('#AFAFAF');
            // p.fill(p.random(255),p.random(255),p.random(255));
            
            // p.line(i+padding+1, j+padding-1, i+1+((size-1)-padding*2)*p.sqrt(2), j-1+((size-1)-padding*2)*p.sqrt(2));
            // p.stroke(238, 153, 0);
            // p.stroke(237, 34, 93);
            // p.line(i+padding-1, j+padding+1, i-1+((size-1)-padding*2)*p.sqrt(2), j+1+((size-1)-padding*2)*p.sqrt(2));

            // var pick = p.round(p.random(0, 1));
            // console.log(pick);

            // p.line(i+padding, j+padding, i+(size-padding*2)*p.sqrt(2), j+(size-padding*2)*p.sqrt(2));
            // p.rect(i, j, size, size);
            // p.point(i+3, j+3);
            // p.line(j+3, i+3, 10, 10);
        };
    };

  };
};

var myp5 = new p5(s);