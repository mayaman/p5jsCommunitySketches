var s = function( p ) {

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode(p.RGB, 255);
    p.background('#2D7BB6');
 
    // create new people
    for(var i=0; i<20; i++) {
      ctrb.people.push(new ctrb.person(p, i));
    }

    // load asterisk
    ctrb.asterisk = p.loadImage('assets/p5-asterisk.png');
  };

  // var t; // milliseconds

  p.draw = function() {
    p.colorMode(p.RGB, 255);
    p.background('#2D7BB6');
    p.fill(255);
    p.noStroke();


    var t = p.millis() / 7000;

    if (t < 1) {
      // draw people
      for(var i in ctrb.people) {
        var person = ctrb.people[i];
        person.update(t);
        person.paint();
      }
      for(var i in ctrb.rays) {
        var ray = ctrb.rays[i];
        ray.update(t);
        ray.paint();
      }
    }

  };
};

var myp5 = new p5(s);
