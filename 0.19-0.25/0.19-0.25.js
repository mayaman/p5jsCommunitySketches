// your sketch goes here!
// d3 as dependency—added in the index file
// inspired http://sciutoalex.github.io/p5-D3-cookbook/ & SOL LEWIT

var s = function( p ) {

// ****************************
  // vars
// ****************************

  var custom, // custom DOM elements for D3
      transitionDuration = 300,
      width = p.windowWidth,
      height = p.windowHeight,
      col = {
          pink: '#ED225D', 
          blue: '#2D7BB6',
          grey: '#AFAFAF', 
          white: '#FFFFFF', 
          orange: '#EE9900', 
          brown: '#A67F59'
      },
      colArray = [col.grey, col.pink, col.orange, col.brown, col.blue, col.orange,col.grey, col.pink],
      nLines, // grid number of lines
      counter = 0;

// ****************************
  // data 
// ****************************

  // attempt some kind of responsive design changing data
  if (p.windowWidth >= 800 && p.windowWidth < 1400) {
    nLines = 88;
  } else if (p.windowWidth < 800) {
    nLines = 44;
  } else {
    nLines = 144;
  }   

  var data = d3.range(nLines);

// ****************************
  // utility functions 
// ****************************

  var xScale = d3.scale.linear()
    .domain([0,data.length])
    .range([0,width]);

  function lineRender(_object) {
    return p.line(_object.attr('x1'), 
          _object.attr('y1'),
          _object.attr('x2'),
          _object.attr('y2'));
  }

// ****************************
  // p5 setup
// ****************************

  p.setup = function() {
    // put setup code here
    var c = p.createCanvas(p.windowWidth, p.windowHeight);
    // c.position(0, 0);
    p.background(255, 255, 255);
    // c.parent('sketchCanvas');

    // create a d3 connection to the DOM (that is ignored by the browser)
    custom = d3.select('body').append('custom');

    // use d3 enter() to append the circles to the custom object
    var bars = custom.selectAll('line')
      .data(data)
      .enter()
      .append('bar')
          .classed('bar', true)
          .attr({ // d3 to set p5 attributes
              x1: function(d,i) { return xScale(i); },
              y1: height,
              x2: function(d,i) { return xScale(i); },
              y2: height,
              id: function(d,i) { return 'l-' + i; },
          });

      // fade in using d3 transitions
      function updateBars(_duration) {
        var r = p.random(height); 
        bars
        .transition()
        .duration(_duration)
        .attr({ // d3 to set p5 attributes
          x1: function(d,i) { return xScale(i); },
          y1: function(d,i) { 
            if (counter === 0) {
              return height;
            } else if (counter === 1) {
              return r + p.random(20); 
            } else if (counter > 1 && counter <= 3) {
              return r + p.random(5, 88); 
            } else  {
              return height; 
            }
          },
          x2: function(d,i) { return xScale(i); },
          y2: function(d,i) { 
            if (counter === 0) {
              return 0; 
            } else if (counter === 1) {
              return p.random(height); 
            } else if (counter > 1 && counter <= 3) {
              return p.random(0, r); 
            }  else {
              return p.random(height); 
            }  
          },
          id: function(d,i) { return 'l-' + i; },
        });
      }

      console.log(counter);
      updateBars(0);
      counter++;

      // update every counterond with new attributes
    var update = setInterval(function() {
      counter++;
      console.log(counter);
      var randomUpdate = Math.round(p.random(250, 600));
      console.log(randomUpdate);
      updateBars(randomUpdate);

      if (counter === 18) {
        window.clearInterval(update);
      }
    }, transitionDuration);

  };

// ****************************
  // draw
// ****************************

  p.draw = function() {
    // put draw code here
    // p.stroke(colArray[(counter % colArray.length)]);
    p.strokeWeight(5);
    p.strokeCap(p.SQUARE);
    p.colorMode(p.RGB);
    p.stroke(colArray[(counter % colArray.length)]);

    // use loop to go apply the lines to p5 canvas
    for (var i = 0; i < data.length; i++) {
      // use D3 select each line via it's #ID
      var thisObject = custom.select('#l-' +i);
      lineRender(thisObject);
    }
    
  };
};

var myp5 = new p5(s);