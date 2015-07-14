// your sketch goes here!
//bobcook47@hotmail.com, creative commons license, GNU GPL
function Flower4(p, x, y, colors, scale) //by oggy from openprocessing.org
{
  this.nbPetals = Math.floor(p.random(5, 8));
  this.petalLength = p.random(20, 40);
  this.heartRadius = p.random(3, 5);
  this.XfactorUp = p.random(.3, .9);
  this.YfactorUp = p.random(.2, .7);
  this.XfactorDown = p.random(.1, .25);
  this.YfactorDown = p.random(.1, .5);
  this.x = x;
  this.y = y;
  this.p=p;
  this.colors = Array.isArray(colors) ? colors : [p.color(p.random(255), p.random(255), p.random(255))];
    this.scale = scale || 1;
  }
 
Flower4.prototype.draw = function()
  {
    var p = this.p;
    p.push();
    p.translate(this.x, this.y);
    if (this.scale != 1) p.scale(this.scale, this.scale); 
    //petals
    p.stroke(0);
    p.fill(this.colors[0]);
    for (var i = 0; i < this.nbPetals; i ++)
    {
      p.rotate(p.TWO_PI / this.nbPetals);
      p.beginShape();
      p.vertex(0, 0);
      p.bezierVertex(-this.petalLength*this.XfactorDown, -this.petalLength*this.YfactorDown, -this.petalLength*(1-this.XfactorUp), -this.petalLength*(1-this.YfactorUp), 0, -this.petalLength);
      p.bezierVertex(this.petalLength*(1-this.XfactorUp), -this.petalLength*(1-this.YfactorUp), this.petalLength*this.XfactorDown, -this.petalLength*this.YfactorDown, 0, 0);   
      p.endShape();
    }
 
    p.fill(p.lerpColor(this.colors[0], p.color(0,0,0,0), 0.8));
    p.noStroke();
    for (var i = 0; i < this.nbPetals; i ++)
    {
      p.rotate(p.TWO_PI / this.nbPetals);
      p.beginShape();
      p.vertex(0, 0);
      p.bezierVertex(-this.petalLength*this.XfactorDown, -this.petalLength*this.YfactorDown, -this.petalLength*(1-this.XfactorUp), -this.petalLength*(1-this.YfactorUp), 0, -this.petalLength);
      p.bezierVertex(this.petalLength*(1-this.XfactorUp), -this.petalLength*(1-this.YfactorUp), this.petalLength*this.XfactorDown, -this.petalLength*this.YfactorDown, 0, 0);   
      p.endShape();
    }
 
    //heart
    p.fill(200, 150, 12);
    p.stroke(0);
    p.ellipse(0, 0, this.heartRadius, this.heartRadius);
     
    p.pop();
  }
function textf(f, particle) {
    f.p.fill(f.f.colors[Math.floor(particle.life*f.f.colors.length)]);
    f.p.noStroke();
    f.p.textSize(particle.partSize);
    f.p.push();
    f.p.translate(particle.x, particle.y);
    f.p.rotate(particle.rotation);   
    f.p.text(f.text,0,0);
    f.p.pop();
}

var s = function( p ) {
var ef,sf,ff,gf;
  p.setup = function() {
    // put setup code here
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(255, 255, 255);
        var t =
        '{   ' +
        '    "parts": [   ' +
        '    {   ' +
        '    "name": "foo",   ' +
        '    "color":   ' +
        '        [[255,0,0],[255,255,0],[0,255,0]],   ' +
        '    "shape": "text",   ' +
        '    "gravity": 0.01,   ' +
        '    "sizePercent": 0.995,   ' +
        '    "angle": [180,270],   ' +
        '    "speed": 3.5,   ' +
        '    "limit": 2500000,   ' +
        '    "lifetime": 100,   ' +
        '    "size": [24,48],   ' +
        '    "rotation": -0.1,   ' +
        '    "x": 4,   ' +
        '    "y": 3}]}';
    var defs = JSON.parse(t);
    fdisplay.text = textf;
    ef = new Fountain(p, defs, 'foo');
    ef.text = "We are all learning P5.";
    sf = new Fountain(p, defs, 'foo');
    sf.text = "Todos somos P5 aprendizaje.";
    ff = new Fountain(p, defs, 'foo');
    ff.text = "Nous apprenons tous P5.";
    gf = new Fountain(p, defs, 'foo');
    gf.text = "Wir alle lernen P5.";
   };
  var count=0;
  var flowers = [];
  p.draw = function() {
    // put draw code here
    p.background(255, 255, 255);
    for (var i=0; i<flowers.length; i++) flowers[i].draw();
    p.stroke(0);  p.fill(0);
    p.text("Drag the Mouse",p.width/2-20,30);
    ef.Draw();
    if (count%50 == 15) ef.Create();
    ef.Step();
    sf.Draw();
    if (count%50 == 0) sf.Create(p.width/4, p.height*2/3);
    sf.Step();
    ff.Draw();
    if (count%50 == 30) ff.Create(p.width, p.height*2/3);
    ff.Step();
    gf.Draw();
    if (count++%50 == 40) gf.Create(p.width, p.height*1/3);
    gf.Step();
  };
  p.mouseDragged = function() {
    flowers.push(new Flower4(p, p.mouseX, p.mouseY,null,p.random(0.4,1.2)));
  }
};

var myp5 = new p5(s);
