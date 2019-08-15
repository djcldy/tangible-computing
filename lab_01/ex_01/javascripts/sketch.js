console.log('sketch.js')






// Sketch One

var s = function(q){

  let canvas

  // addapted from https://p5js.org/examples/interaction-tickle.html

  let message = 'Tangible Computing'
  let font;
  let bounds; // holds x, y, w, h of the text's bounding box
  let fontsize = 60;
  let x;
  let y; // x and y coordinates of the text

  q.setup = function() {


    q.createCanvas(innerWidth,500)
    q.background(255)
    q.textSize(fontsize)
    q.textAlign(q.CENTER,q.CENTER);

    // font = q.loadFont('assets/29LTAdir-Medium.ttf')

    x = innerWidth / 2 -500
    y = 500 / 2 

    bounds = {}
    console.log(x,y)
    bounds.x = 200
    bounds.y = 200

  }

  q.draw = function(){
  	console.log('hi')

    let x = q.mouseX
    let y = q.mouseY
    let string = message + ' (' + Math.floor(x) + "," + Math.floor(y) + ')'

    q.fill(0,10);
    q.stroke(0)
    q.text(string, x, y);
    q.fill(255,50)
    q.noStroke()
    q.rect(0,0,q.width,q.height)
    const date = new Date()
    document.getElementById('date').innerHTML = date.toTimeString();

  }

}
console.log('set p5')
var myp5 = new p5(s, 'clock');
 

    