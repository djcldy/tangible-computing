function setup(){

	let numLines = 500 
	createCanvas(500,500)
	background(255)
	drawLine(width/2,height/2,numLines)
	stroke(34,155,215)

}

function drawLine(x,y,numLines){

	const xn = x + random(-5,5)
	const yn = y + random(-5,5)
	numLines -- 
	line(x,y,xn,yn)
	console.log(numLines)
	if (numLines> 0) drawLine(xn,yn,numLines)

}
