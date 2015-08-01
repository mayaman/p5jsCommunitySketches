// your sketch goes here!

var s = function( p ) {

  var img;
  var rot = 0;
  var scale_size = 2;
  var speed = 0.0001;


  p.preload = function() {
    
    img = p.loadImage("assets/p5-asterisk-160.png");

  }


  p.setup = function() {
	
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background( 255 );
    p.noStroke();
    p.ellipseMode(p.CORNER);
    p.smooth();
    
  };


  p.draw = function() {

    p.fill(255, 255);
    p.noStroke();
    p.rect(0,0, p.width, p.height);
  
    var x = 0;

    while ( x < p.windowWidth / 30 )  {
      
      var y = 0;

      while ( y < p.windowHeight / 30 ) {
        
        scale_size  = scale_size + speed;

        if ( p.random(100) < 33.3 ) {

          p.fill(237, 34, 93, 255);

        } else if ( p.random(100) > 33.3 && p.random(100) < 66.6 ) {

          p.fill(45, 123, 182, 255);

        } else {

          p.fill(238, 153, 0, 255 );

        }

        p.teste(15 + x * 30, 15 + y * 30, scale_size, rot + x + y);

        if ( scale_size > 10 ) {

          speed = speed * -1;

        } else if (scale_size < 2) {

          speed = speed * -1;

        }

        y = y + 1;

      }

      x = x + 1;

    }

    p.translate(120,120);
    p.image(img, -80, -80);
    p.resetMatrix();

    rot = rot + 0.1;
    
  };


  p.teste = function( x, y, rect_size, r ) {

    this.translate( x, y );
    this.rotate(r);
    this.ellipse( 0, 0, rect_size, rect_size );
    this.resetMatrix(); 
  
  }


  p.windowResized = function() {

    p.resizeCanvas(p.windowWidth, p.windowHeight);

  }

};

var myp5 = new p5(s);
