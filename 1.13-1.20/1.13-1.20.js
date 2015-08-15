var s = function( p ) {

  // aBe's sketch for p5.js welcome video
  // @hamoid @fun_pro
  // 05.08.2015

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode(p.RGB, 255);
    p.background('#2D7BB6');
 
    // create new people
    for(var i=0; i<ctrb.count; i++) {
      ctrb.people.push(new ctrb.person(p, i));
    }

    // load asterisk
    ctrb.asterisk = p.loadImage('assets/p5-asterisk.png');
  };

  // var t; // milliseconds

  p.draw = function() {
    var person, ray;

    if(ctrb.startTime < 0) {
      ctrb.startTime = p.millis();
    } else {
      // show last 7 seconds
      var t = (p.millis() - ctrb.startTime) / 7000;

      if (t < 1) {
        p.colorMode(p.RGB, 255);
        p.background('#2D7BB6');
        p.fill(255);
        p.noStroke();

        // draw people
        for(var i in ctrb.people) {
          person = ctrb.people[i];
          person.update(t);
          person.paint();
        }
        for(var i in ctrb.rays) {
          ray = ctrb.rays[i];
          ray.update(t);
          ray.paint();
        }
      }
    }
  };
};

var myp5 = new p5(s);
