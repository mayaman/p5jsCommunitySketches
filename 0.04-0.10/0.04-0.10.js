// your sketch goes here!
// 
// 600ms
// 
// Are we running 24, 30 or 60 fps?
// 6 seconds * 60 fps = 360 frames
// 

var s = function( p ) {

  p.Star = function () {
    this.x = p.random( 0, p.width );
    this.y = p.random( 0, p.height );

    this.r = p.random( 0, 360 );

    // p.fill(255,17,148);
    //this.r = p.random( 239, 255 );
    this.g = p.random( 1, 33 );
    this.b = p.random( 132, 164 );

    this.scale = 1;
  }

  p.Star.prototype.draw = function ( move ) {
    p.noStroke();
    p.fill( this.r, this.g, this.b );
    p.push( );
      p.translate( this.x, this.y );
      p.rotate( this.r );
      p.scale( this.scale );
      p.drawLogo( p.p5Logo, this.x, this.y );
    p.pop();
    if ( move ) { this.r += p.random( -1, 1 ); }
  }

  p.drawLogo = function ( ) {
    p.beginShape();
    p.vertex(28,-36);
    p.vertex(113,-61);
    p.vertex(129,-10);
    p.vertex(45,18);
    p.vertex(98,92);
    p.vertex(53,124);
    p.vertex(-1,51);
    p.vertex(-54,122);
    p.vertex(-97,89);
    p.vertex(-45,18);
    p.vertex(-129,-12);
    p.vertex(-113,-63);
    p.vertex(-28,-36);
    p.vertex(-28,-124);
    p.vertex(28,-124);
    p.vertex(28,-36);
    p.vertex(28,-36);
    p.endShape( p.CLOSE );
  }

  p.setup = function() {
    // put setup code here
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.angleMode( p.DEGREES );
    p.background( 255 );

    p.halfWidth = p.width / 2;
    p.halfHeight = p.height / 2;

    p.stars = [];

    p.whiteStar = new p.Star();
    p.whiteStar.scale = 0.001;
    p.whiteStar.x = p.halfWidth;
    p.whiteStar.y = p.halfHeight;
    p.whiteStar.r = 255;
    p.whiteStar.g = 255;
    p.whiteStar.b = 255;
  };

  // POPULAAAATE THE WHOLE WORLD WITH STARS *-*
  p.drawFirstScene = function () {
    p.stars.push( new p.Star() );
  }

  // GROUP THOSE STARS
  p.drawSecondScene = function () {
    var star;
    for( var i = 0, l = p.stars.length; i < l; i++ ) {
      star = p.stars[ i ];
      star.x += ( star.x > p.halfWidth ) ? p.random( -6 , 0 ) : p.random( 0, 6 );
      star.y += ( star.y > p.halfHeight ) ? p.random( -3, 0 ) : p.random( 0, 3 );
    }
  }

  // so there are those stars, who stay far and quiet in the long night
  // they only shine for your eyes when you pay attention and try
  // try to feel what it means to be here, what direction you're supposed to go
  // and even when you don't know where to go, they will be there, 
  // shinning for you in the sky
  // that's beatiful  
  p.drawThirdScene = function () {
    var star;
    for( var i = 0, l = p.stars.length; i < l; i++ ) {
      star = p.stars[ i ];
      star.scale *= 1.07;
    }
    p.stars.pop();
    p.stars.pop();

    p.whiteStar.scale *= 1.1;
  }

  p.draw = function() {
    // put draw code here
  
    // Create stars everywhere!
    // Group them together
    // Explode a rainbow worth of colors
    // grow bigger white p5 logo
    p.background( 45, 123, 182 );

    if ( p.frameCount < 120 ) {
      p.drawFirstScene();
    }
    else if ( p.frameCount < 240 ) {
      p.drawSecondScene();
    }
    else if ( p.frameCount < 360 ) {
      p.drawThirdScene();
    }

    // Drawing stars  
    var star;
    for( var i = 0, l = p.stars.length; i < l; i++ ) {
      star = p.stars[ i ];
      star.draw( true );
    }

    p.whiteStar.draw( false );

  };
};

var myp5 = new p5(s);