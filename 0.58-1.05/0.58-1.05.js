var s = function( p ) {
  // your sketch goes here!

  p.setup = function() {
    // put setup code here
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background('#2D7BB6');
  };

  p.draw = function() {
    
  };
};

var myp5 = new p5(s);