console.log('sketch.js')

let system;
let interval
let interval02

function setup() {

  createCanvas(640, 480);
  system = new ParticleSystem(createVector(50+(width-100)*(minute()/60), hour()/24*(height-100)+50));
  interval = 0
  interval02 = 0
  noStroke()
  myCallback()

}

function draw() {

  // background('#00000')
  const date = new Date();
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
 const col = [date.getHours()/24*255,date.getMinutes()/60*255,date.getSeconds()/60*255]
 background(0)
 strokeWeight(5)
  stroke(col)
  noFill()

  for (var i = 0; i < hours; i++ ){
    const x = i/24*(width-100)+50 
    ellipse(x,50,60,60)
  }

  for (var i = 0; i < minutes; i++ ){
    
    const x = i/60*(width-100)+50
    ellipse(x,100,25,25)
  
  }

  for (var i = 0; i < seconds; i++ ){
    
    const x = i/60*(width-100)+50 
    line(x,height/2-50,x,height/2+50)

  }
  document.getElementById('date').innerHTML = date.toTimeString();

  if (interval > 32){
    interval = 0
    myCallback()
  } else { 
    interval ++ 
  }


  system.run();

}


function myCallback() {



    const date = new Date();
 // my Callback 
  // const date = new Date()
  const rad = map(date.getSeconds(),0,60,1,30)
 const col = [date.getHours()/24*255,date.getMinutes()/60*255,date.getSeconds()/60*255]
  system.addParticle({color:col,radius:rad,date:date});
  // var intervalID = window.setInterval(myCallback, 1000);

}

// A simple Particle class
let Particle = function(params) {
  this.velocity = createVector(random(-0.5, 0.5), random(-0.5,0.5));
  this.position = params.pos.copy();
  this.date = params.date.toTimeString()

  this.acceleration = createVector(mouseX-this.position.x, mouseY - this.position.y);
  this.acceleration.setMag(0.01)
  this.lifespan = 255;
  this.color = params.col
  this.radius = params.radius
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  // if (this.position.y > height){
  //   this.position.y = 0
  //   return
  // } 
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  const col = this.color
  // const c = [...col,this.lifespan]
  // console.log(col)
  const t = this.lifespan/10

  fill(col[0],col[1],col[2])
  // fill(127, this.lifespan);
  // text(this.date, this.position.x, this.position.y);
  ellipse(this.position.x, this.position.y, this.radius, this.radius);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function(params) {
  this.particles.push(new Particle({pos:this.origin,col:params.color,radius:params.radius,date:params.date}));
};

ParticleSystem.prototype.run = function() {

  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];

    if (i>1){
      console.log('line')

      // let k = i - 1 
      // let p02 = this.particles[k]
      // const col = p.color
      // const t = p.lifespan/10
      // stroke(col[0],col[1],col[2],t)
      // strokeWeight(1)
      // line(p.position.x,p.position.y,p02.position.x,p02.position.y)
      // noStroke()
    
    }


    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};


// function 


// Sketch One

// var s = function(q){

//   let canvas

//   // addapted from https://p5js.org/examples/interaction-tickle.html

//   let message = 'Tangible Computing'
//   let font;
//   let bounds; // holds x, y, w, h of the text's bounding box
//   let fontsize = 60;
//   let x;
//   let y; // x and y coordinates of the text

//   q.setup = function() {


//     q.createCanvas(innerWidth,500)
//     q.background(255)
//     q.textSize(fontsize)
//     q.textAlign(q.CENTER,q.CENTER);

//     // font = q.loadFont('assets/29LTAdir-Medium.ttf')

//     x = innerWidth / 2 -500
//     y = 500 / 2 

//     bounds = {}
//     console.log(x,y)
//     bounds.x = 200
//     bounds.y = 200

//   }

//   q.draw = function(){
//   	console.log('hi')

//     let x = q.mouseX
//     let y = q.mouseY
//     let string = message + ' (' + Math.floor(x) + "," + Math.floor(y) + ')'

//     q.fill(0,10);
//     q.stroke(0)
//     q.text(string, x, y);
//     q.fill(255,50)
//     q.noStroke()
//     q.rect(0,0,q.width,q.height)


//   }

// }
// console.log('set p5')
// var myp5 = new p5(s, 'clock');
 

//     