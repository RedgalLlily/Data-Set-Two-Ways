//no animation / interaction chart
//if you want to use animation or create a loading state look at the cat fact example from last week 
// use a boolean to control when your data is loaded


let breakfast;
let strokeWmin =1;
let strokeWmax = 5;
function setup() {
  createCanvas(1000,1000);

  //no animation / interaction chart
  noLoop();

  fetch("./json/breakfast.json").then(function(response) {
    return response.json();
  }).then(function(data) {

    console.log(data);
    
    breakfast = data.breakfast;

    //using no Loop? you can just call your function once the data is loaded
    drawChart();
  
  }).catch(function(err) {
    console.log(`Something went wrong: ${err}`);
  });

}

function draw() {
  background(200);

}

function drawChart(){

  let total = 0; 
  for (let i= 0 ; i<breakfast.length; i++) {
    total += breakfast[i].amount;
  }

  let centreX = width/2;
  let centreY = height/2; 
  let diam = 300;
  //let angleStart = TWO_PI*0.5; 

  for (let i=0; i<breakfast.length; i++) {

    let item = breakfast[i];
    let angleStart = TWO_PI*0.5; 

    let itemFraction = item.amount/total;
    let itemAngle = itemFraction * TWO_PI; 
    let angleEnd = angleStart + itemAngle;

    //normal pie
    noFill();
    stroke(item.color); 
    
    //strokeJoin(ROUND); 
    
    for(let f=10;f<15;f++){
      diam+=f;
      strokeWeight(random(strokeWmin,strokeWmax));
      
    arc(centreX, centreY, diam+25*i, diam+25*i, angleStart, angleEnd); 

    }

   
    //PIE creates closed slices the the center


    noStroke();
    fill(0); 
    push();
    translate(centreX, centreY); 
    rotate(angleEnd); 
    textAlign(RIGHT, TOP); 
    //normal pie
    text(item.ingredient, diam/2 , -8); 

    pop();

    //update the angle start before the next iteration
    angleStart += itemAngle;
  }

}