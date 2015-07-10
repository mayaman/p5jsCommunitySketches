// your sketch goes here!

/*
 Transcript of relevant video section, with keywords 
 that could be used highlighted:


 "We acknowledge that not everyone has the TIME,
 FINANCIAL MEANS, or CAPACITY to ACTIVELY PARTICIPATE, 
 but we RECOGNIZE and ENCOURAGE INVOLVEMENT of all kinds."


 First idea: floating particles of various shapes and 
 colours, represinting people of different backgrounds. 
 They all gently float around (and try to avoid the mouse
 cursor, to give some interactivity).

 One particle is the p5 asterisk. It "hunts" for 
 friends, moving from unvisited particle to unvisited
 particle. A particle may or may not join the network
 of friends (let's say 20% chance of joining). 

 If it joins, it will become connected to the network.
 A line between itself and the particle that befriended
 it is formed, and it will start to hunt for friends as
 well.

 Note that this is a reference to Fry & Reas' famous
 Processing sketch. You know, the one that looks like:
 http://studio.sketchpad.cc/sp/pad/view/ro.9sfQKA0T6QIW-/rev.10


 Particles should have wobbly soft bodies, like so:
 https://processing.org/examples/softbody.html

*/

var s = function( p ) {

  p.setup = function() {
    // put setup code here
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(255, 255, 255);
  };

  p.draw = function() {
    // put draw code here
    
  };
};

var myp5 = new p5(s);
