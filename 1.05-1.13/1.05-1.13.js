/*

   P5.js sketch contributed by Krystof Pesek
   Copyright (C) 2015 Krystof Pesek (Kof)

   This program is free software; you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation; either version 2 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program; if not, see <http://www.gnu.org/licenses/>.
   */

var s = function( p ) {

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background('#2D7BB6');
  };

  p.draw = function() {
    p.background('#2D7BB6');

    for(var ii=0;ii<10;ii++){

      p.translate(p.width/2,p.height/2);
      p.rotate((p.frameCount+ii)/(600.0));
      p.translate(-p.width/2,-p.height/2);

      for(var i = -p.height ; i < p.height*2;i+=80){
        p.stroke(255,10);
        p.strokeWeight(p.noise(p.frameCount/11.0+i/10.0)*20);
        var f = p.noise(p.frameCount/100.0+i/10.0)*50;
        p.line(-p.width,i+f,p.width*2,i+f);
      };
    };
  };

};

var myp5 = new p5(s);
