'use strict';

var s = function(p) {

  var gridPoints = [];
  var segmentWidth = 40;
  var segmentHeight = 40;
  var noiseScale = 0.0005;
  var time = 0;

  function renderTriangle(x, y) {
    var rot = p.map(p.noise(x * noiseScale, y * noiseScale, time), 0, 1, -p.TWO_PI, p.TWO_PI) * 2;
    p.push();
    p.noStroke();
    p.translate(x, y);
    p.rotate(rot);
    p.scale(2.25);
    p.fill(p.map(y, 0, p.height, 220, 255), 200);
    p.arc(0, 0, segmentWidth, segmentHeight, p.PI, p.TWO_PI);
    p.fill(p.map(y, 0, p.height, 0, 255), 200);
    p.arc(0, 0, segmentWidth, segmentHeight, -p.PI, -p.TWO_PI);
    p.pop();
  }

  function renderScene() {
    time += 0.005;
    p.background(255);
    for (var j = 0; j < gridPoints.length; j++) {
      renderTriangle(gridPoints[j][0], gridPoints[j][1]);
    }
  }

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(255, 255, 255);
    gridPoints = [];
    for (var ix = -segmentWidth; ix <= p.width + segmentWidth; ix += segmentWidth) {
      for (var iy = -segmentHeight * 2; iy <= p.height; iy += segmentHeight) {
        gridPoints.push([ix, iy]);
      }
    }
  };

  p.draw = function() {
    renderScene();
  };

};

var myp5 = new p5(s);
