let canvas;
let button;

//food setting
let food = 0;
let feeding = false;

let hungry = 0;
let full = 1;
let tamaState = hungry;

//emotion setting
let emotionValue = 0;
let touching = false;

let sad = 0;
let happy = 1;
let tamaEmotion = sad;

//basic setting
let tamaX;
let tamaY;
let tamaDiam;

function setup() {

  canvas = createCanvas(500, 500);
  canvas.parent("sketch-container"); //move our canvas inside this HTML element

  tamaX = width/2;
  tamaY = height/2;
  tamaDiam = width/6;

  addGUI();

  
}

function draw() {
  background(200,200,250);
  
  //Drawing
  noStroke();
  
  //manage food state of Tama
  if(tamaState == hungry){
    fill(255);
    

    //manage switching to full state
    if(tamaDiam > width/4){
      tamaState = full;
    }

  }else if(tamaState == full){
    //full color
    fill(0,255,0);

    //manage returning to hungry state
    if(tamaDiam > width/6){
      if(frameCount % 2 == 0) tamaDiam--; // reduce every second frame
    }else{
      tamaState = hungry;
    }
  }

  //manage emotion state of Tama
  if(tamaEmotion == sad){
    fill(100);
    tamaX = width/2;
    tamaY = height-tamaDiam/4;

    //manage switching to happy state
    if(tamaDiam > width/4){
      tamaEmotion = happy;
    }

  }else if(tamaEmotion == happy){
    //happy color
    fill(255,100,0);

    //manage returning to sad state
    if(tamaDiam > width/5){
      if(frameCount % 5 == 0) tamaDiam--; // reduce 
    }else{
      tamaState = sad;
    }
  }

  //draw Tama and closed mouth and eyes
  circle(tamaX,tamaY,tamaDiam);
  fill(0);
  let mouthOffset = tamaDiam/2;
  rect(tamaX-mouthOffset/2,tamaY+mouthOffset/3,mouthOffset,3);
  ellipse(tamaX,tamaY-mouthOffset/5,20,25);


  //food
  if(food > 0 ){

    //Tama Eat
    if(frameCount % 30 < 15 && tamaState == hungry){
      eatFood();
    }

    //draw food
    fill(100);
    circle(tamaX,tamaY+food,food);

  }else if(feeding){
    //manage button state, only do this once IF the button is inactive
    feeding = false;
    button.html("FEED");
    button.removeClass("inactive");
  }

  //emotion
  if(emotionValue > 0 ){

    //Tama Eat
    if(frameCount % 30 < 15 && tamaEmotion == sad){
      touch();
    }

    //draw tears&smile???
    fill(100);
    circle(tamaX,tamaY+food,food);

  }else if(touching){
    //manage button state, only do this once IF the button is inactive
    touching = false;
    buttonB.html("TOUCH");
    buttonB.removeClass("inactive");
  }
  

}

function eatFood(){

  //draw open mouth
  fill(0);
  circle(tamaX,tamaY,tamaDiam/2);

  //reduce food & grow Tama
  food --;
  tamaDiam++;

}

function touch(){

  //draw smile
  fill(0);
  circle(tamaX,tamaY,tamaDiam/2);

  //reduce food & grow Tama
  emotionValue --;
  tamaDiam++;

}

function addGUI()
{
  //add a button
  button = createButton("FEED");
  button.addClass("button");

  //Add the play button to the parent gui HTML element
  button.parent("gui-container");
  
  //Adding a mouse pressed event listener to the button 
  button.mousePressed(handleButtonPress); 


  //touch
  //add a button
  buttonB = createButton("TOUCH");
  buttonB.addClass("button");
  //Add the play button to the parent gui HTML element
  buttonB.parent("gui-container");
  //Adding a mouse pressed event listener to the button 
  buttonB.mousePressed(touchButtonPress); 
}

function handleButtonPress()
{
    if(!feeding){
      //set food to random value
      food = random(40,60);
      feeding = true;

      //manage button state
      button.html("FEEDING");
      button.addClass("inactive");
    }
    
}

function touchButtonPress()
{
  if(!touching){
    //set emotionValue to random value
    emotionValue = random(20,60);
    touching = true;

    //manage button state
    buttonB.html("TOUCHING");
    buttonB.addClass("inactive");
  }
}

function tear(){
  push();
  fill(0);
  stroke(0);
  strokeWeight(5);
  let mouthOffset = tamaDiam/2;
  arc(tamaX,tamaY-mouthOffset/5,20,25,PI,OPEN);
  line(tamaX,tamaX+20,tamaY,tamaY+20);
  pop();
}

function smilingMouth(){
 
}


