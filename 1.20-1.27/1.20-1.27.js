//	p5js Community Sketches
//
//	João Martinho Moura (2015)
//
//	work in progress ...
//
//	based on previous author's artwork (Joao Martinho Moura, 'tr-lines' 2011)
//
var s = function(p) {


    var contadorTempoRefresh = 0;
    var contadorTempoRefresh = 0;

    var tempoBrancoPreto = 0;
    var tempoApaga = 0;
    var tempo = 0;

    var tamanhoWIDTH = p.windowWidth;
    var tamanhoHEIGHT = p.windowHeight;

    var numeroPontos = 50;

    var NumerosArrayX = [numeroPontos];
    var NumerosArrayY = [numeroPontos];


    var RND_NumerosArrayX = [numeroPontos];
    var RND_NumerosArrayY = [numeroPontos];


    var contaMouse = 0;
    var MX = tamanhoWIDTH / 2;
    var MY = tamanhoHEIGHT / 2;


    var corReset = '#f5f5f5';

    var apaga = false;
    var riscosVerticais = false;

    p.setup = function() {


        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(corReset);

        for (var i = 0; i < numeroPontos; i++) {
            NumerosArrayX[i] = p.random(0, tamanhoWIDTH); //tamanhoWIDTH/2;
            NumerosArrayY[i] = p.random(0, tamanhoHEIGHT);
        }

        for (var i = 0; i < numeroPontos; i++) {
            RND_NumerosArrayX[i] = tamanhoWIDTH / 2;
            RND_NumerosArrayY[i] = tamanhoHEIGHT / 2;
        }


    };

    p.mousePressed = function() {

    	apaga=true;
    	riscosVerticais=true;

    }

    p.draw = function() {

        tempoApaga++;

        if ((tempoApaga > 100) || apaga) {
            p.fill(255, 255, 255, 150);
            p.noStroke();
            p.rect(-20, -20, tamanhoWIDTH + 20, tamanhoHEIGHT + 20);
            tempoApaga = 0;
            apaga = false;
        }

        tempo++;


        if (tempo > 5) {
            var padding = -5;
            MX = (p.random(-500, tamanhoWIDTH + 500)); 
            MY = (p.random(padding, tamanhoHEIGHT - padding));
            tempo = 0;
        }


        contaMouse++;

        var margem = -100;

        if (contaMouse < numeroPontos) {

            if ((MX > margem) && (MX < tamanhoWIDTH - margem)) {
                NumerosArrayX[contaMouse] = MX;
                RND_NumerosArrayX[contaMouse] = MX + (p.random(-10, 10));
            }

            if ((MY > margem) && (MY < tamanhoHEIGHT - margem)) {
                NumerosArrayY[contaMouse] = MY;
                RND_NumerosArrayY[contaMouse] = MY + (p.random(-10, 10));
            }
        } else {
            contaMouse = 0;
        }

        tempoBrancoPreto++;
        if (tempoBrancoPreto > 100) {
            tempoBrancoPreto = 0;
        }

        if (tempoApaga == 50) {
            p.strokeWeight(10);
        } else {
            p.strokeWeight(p.random(1, 2));
        }

        if (tempoApaga == 400) {
            p.strokeWeight(10);
        } else {
            p.strokeWeight(p.random(1, 3));
        }

        for (var i = 0; i < numeroPontos; i++) {
            if ((i > 0) && (i < numeroPontos)) {
                p.noStroke();

                var tamanhoBola = p.random(5);

                if (p.random(40) < 1) tamanhoBola = p.random(5, 10);
                //if (p.random(50) < 1) tamanhoBola = p.random(20,100);

                if (p.random(100) < 0.5) tamanhoBola = p.random(10, 50);


                p.fill(255, 255, 255, 120);
                if (p.random(100) < 10) p.fill(237, 34, 93, 255);

                p.ellipse(RND_NumerosArrayX[i], RND_NumerosArrayY[i], tamanhoBola, tamanhoBola);

                p.fill(237, 34, 93, 255);
                p.ellipse(RND_NumerosArrayX[i] + p.random(-200, 200), RND_NumerosArrayY[i] + p.random(-200, 200), tamanhoBola / 2, tamanhoBola / 2);


                p.stroke(10, 10, 10, 20);

                //p.line(RND_NumerosArrayX[i],RND_NumerosArrayY[i],RND_NumerosArrayX[i-1],RND_NumerosArrayY[i-1]);


                if (tempoBrancoPreto < 50) {
                    p.stroke(5, 5, 5, 80);
                    if (p.random(100) < 1) p.stroke(237, 34, 93, 255);
                } else {
                    p.stroke(255, 255, 255, 120);
                    p.strokeWeight(2);
                }




                p.line(NumerosArrayX[i], NumerosArrayY[i], NumerosArrayX[i - 1], NumerosArrayY[i - 1]);

                if (!tempoBrancoPreto < 50) {
                    p.stroke(5, 5, 5, 80);
                	p.strokeWeight(1);
                
                } else {
                    p.stroke(255, 255, 255, 200);
                    p.strokeWeight(10);
                
                }

                p.line(NumerosArrayX[i], NumerosArrayY[i], NumerosArrayX[i - 1] + p.random(-50, 50), NumerosArrayY[i - 1] + p.random(-50, 50));



                p.fill(45, 123, 182, 255);

                p.ellipse(RND_NumerosArrayX[i] + p.random(-150, 150), RND_NumerosArrayY[i] + p.random(-150, 150), tamanhoBola, tamanhoBola);

                if (p.random(100)<20){

                }
            }


            NumerosArrayX[i] = NumerosArrayX[i] + (p.random(-3, 3));
            NumerosArrayY[i] = NumerosArrayY[i] + (p.random(-3, 3));


            RND_NumerosArrayX[i] = RND_NumerosArrayX[i] + (p.random(-8, 8));
            RND_NumerosArrayY[i] = RND_NumerosArrayY[i] + (p.random(-8, 8));

        };

        if (riscosVerticais){
			p.stroke(237, 34, 93, 255);
			for (var i=p.mouseX-100; i<p.mouseX+100; i+=10){
	
				p.strokeWeight(p.random(0,5));

				p.line(i+p.random(-250,250),0,i+p.random(-50,50),tamanhoHEIGHT);
			}
			riscosVerticais=false;
        }


    };
};






var myp5 = new p5(s);
