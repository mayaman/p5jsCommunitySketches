//bobcook47@hotmail.com, creative commons license, GNU GPL
function frect(f, particle) {
    f.p.fill(f.f.colors[Math.floor(particle.life*f.f.colors.length)]);
    f.p.noStroke();   
    f.p.rect(particle.x, particle.y, particle.partSize, particle.partSize);
}
function fellipse(f, particle) {
    f.p.fill(f.f.colors[Math.floor(particle.life*f.f.colors.length)]);
    f.p.noStroke();
    f.p.ellipse(particle.x, particle.y, particle.partSize, particle.partSize);
}
function fimage(f, particle) {
    f.p.tint(f.f.colors[Math.floor(particle.life*f.f.colors.length)]);
    f.p.noStroke();
    if (particle.rotation==0 && particle.partSize == 1) {
      f.p.image(f.f.image, particle.x, particle.y);
      return;
    }
    f.p.push();
    f.p.translate(particle.x, particle.y);  
    f.p.rotate(particle.rotation);
    f.p.scale(particle.partSize);    
    f.p.image(f.f.image, 0, 0);
    f.p.pop();
}

var fdisplay = {ellipse: fellipse, rect: frect, image: fimage};
function Particle() {
  this.xVel = 0;
  this.yVel = 0;
  this.partSize = 0;
  this.x = 0;
  this.y = 0;
  this.life = 0;
  this.rotation = 0;
  this.id = 0;
}

function Fountain(p, defs, name, x, y) {
    this.particles = [];
    for (var i = 0; i < defs.parts.length; i++)
    if (defs.parts[i].name == name) {
        this.p = p;
        this.f = defs.parts[i];
        this.x = p.width / x || this.f.x;
        this.y = p.height / y || this.f.y;
        this.n = this.f.limit;
        this.draw = fdisplay[this.f.shape];
        this.f.rotation = this.f.rotation || 0;
        this.id = 0;
        if (this.f.file) {
            if (!this.f.image) this.f.image = p.loadImage(this.f.file);
            this.image = this.f.image;
        }
        if (!this.f.colors) {
            this.f.colors = [];
            for (var j=0; j<this.f.color.length; j++)
              this.f.colors[j] = p.color(this.f.color[j]);
        }
    }
    Object.defineProperties(this, {
        "length": {
            "get": function () {
                return this.particles.length;
            }
        }
    });
    Object.defineProperties(this, {
        "left": {
            "get": function () {
                return this.n;
            }
        }
    });
    Object.defineProperties(this, {
        "done": {
            "get": function () {
                return this.n <= 0 && this.particles.length==0;
            }
        }
    });
}

Fountain.prototype.Draw = function () {
  this.p.imageMode(this.p.CENTER); this.p.angleMode(this.p.DEGREES);
  for (var x = this.particles.length-1; x >= 0 ; x--) {
    this.draw(this, this.particles[x]);
  }
  this.p.angleMode(this.p.RADIANS);
}

Fountain.prototype.Create = function(x, y, ang) {
  if (this.n-- <= 0) return;
  var ps = new Particle();
  var angle = ang || this.p.random(this.f.angle[0], this.f.angle[1]);
  ps.xVel = this.p.cos(this.p.radians(angle))*this.f.speed;
  ps.yVel = this.p.sin(this.p.radians(angle)) * this.f.speed;
  ps.partSize = this.p.random(this.f.size[0], this.f.size[1]);
  ps.x = x || this.p.width / this.x;
  ps.y = y || this.p.height / this.y;
  ps.life = 0;
  ps.id = this.id++;
  if (this.f.rotation!=0) ps.rotation = this.p.random(0,360);
  this.particles.push(ps);
  return ps;
}
Fountain.prototype.Step = function() {
 for (var x = 0; x < this.particles.length; x++) {
  var particle = this.particles[x];
  // add the velocity to the positions
  particle.x += particle.xVel;
  particle.y += particle.yVel;
  // add some gravity
  particle.yVel += this.f.gravity;
  // make the particles shrink
  particle.partSize *= this.f.sizePercent;
  particle.rotation += this.f.rotation;
  particle.life += 1.0/this.f.lifetime;
  if (particle.partSize < 0.1 || particle.y > this.p.height || particle.life >= 1)
        this.particles.splice(x, 1);
 }
}
Fountain.prototype.Stop = function() {
  this.n=0;
  this.particles = [];
}
