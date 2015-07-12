// your sketch goes here!

var s = function( p ) {

  p.setup = function() {
    // put setup code here
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background('#AFAFAF');
  };

  p.draw = function() {
    // put draw code here
    p.textFont("AvenirNextLTW01-Medium");
    p.textSize(32);
    p.fill(0, 102, 153);
    p.text("Better!", p.windowWidth / 4, p.windowHeight / 4);    
  };
};

var myp5 = new p5(s);