var canvas, backgroundImage
var form
var distance = 0;
var gameState = "start" ;
var spaceBackground 
var spaceBackgroundImage
var spaceship
var asteroid
var lives = 4;
var score = 0;
var lazer = null;
var  rand1;
var flag = 0;

function preload(){
  spaceBackgroundImage = loadAnimation("images/background1.png","images/background1.png","images/background2.png","images/background2.png",
  "images/background3.png","images/background3.png","images/background4.png","images/background4.png")
  healthbar0image = loadImage("images/0healthBar.png")
  healthbar1image = loadImage("images/1healthBar.png")
  healthbar2image = loadImage("images/2healthBars.png")
  healthbar3image = loadImage("images/3healthBars.png")
  asteroidTitanimage = loadImage("images/asteroid3.png")
spaceshipImage = loadImage("images/spaceship.png")
lazerImage = loadAnimation("images/laser1.png","images/laser2.png","images/laser3.png","images/laser4.png")




}

function setup(){
  canvas = createCanvas(windowWidth , windowHeight);
asteroidsmallGroup = new Group()
asteroidmediumGroup = new Group()

   form = new Form();
 spaceBackground = createSprite(windowWidth/2,windowHeight/2);
 spaceBackground.addAnimation("background1image",spaceBackgroundImage);
 spaceBackground.visible=false;
 spaceBackground.scale=1.5;

 spaceship=createSprite(windowWidth/2,windowHeight-150);
 spaceship.addImage(spaceshipImage)
 spaceship.visible=false;
 spaceship.scale=0.4;

 healthbar =  createSprite(windowWidth-120,150);
 healthbar.addImage(healthbar3image);
 healthbar.visible=false;

asteroidTitan=createSprite(windowWidth/2,50);
asteroidTitan.visible=false;
}

 
 function draw(){
  if(gameState === "start"){
    form.play.visible=true;
    form.title.visible=true;
    if(mousePressedOver(form.play)){
      gameState="play"
      console.log("gameState changed to play")
    }
  }

  



if(gameState=== "play"){
  form.title.visible=false;
  form.play.visible=false;
  spaceBackground.visible=true;
  spaceship.visible=true;
  healthbar.visible=true;


if(keyDown("right")){
 spaceship.x=spaceship.x+8;
}
if(keyDown("left")){
  spaceship.x= spaceship.x-8;
}
asteroid=new Asteroid()
asteroid.spawn();
if(score>20 ){
  flag=1;
}

if(lazer){
originX=lerp(originX,targetx,0.2)
originY=lerp(originY,targety,0.2)
lazer.x = originX;
lazer.y = originY;

if(lazer.isTouching(asteroidsmallGroup) || lazer.isTouching(asteroidmediumGroup)){
if(lazer.isTouching(asteroidsmallGroup)){
  for(var i = 0;i<asteroidsmallGroup.length;i++){
    if(asteroidsmallGroup.get(i).isTouching(lazer)){
asteroidsmallGroup.get(i).lifetime=0;
lazer.lifetime=0;
    }
    
  }
  console.log("asteroidsnapped")
 // asteroidGroup.destroyEach()
 
  
score++
}
if(lazer.isTouching(asteroidmediumGroup)){
  for(var i = 0;i<asteroidmediumGroup.length;i++){
    if(asteroidmediumGroup.get(i).isTouching(lazer)){
asteroidmediumGroup.get(i).lifetime=0;
lazer.lifetime=0;
    }
  console.log("asteroidsnapped")
  //asteroidsmallGroup.destroyEach()
  
score++
  }
}
}

if(lazer.isTouching(asteroidTitan)){
  score=score+50;
  //gameState=end;
  asteroidTitan.lifetime=20;
  lazer.lifetime=0;
  setInterval(function(){ gameState = "end"},5000 );
}
}

if(spaceship.isTouching(asteroidsmallGroup)|| spaceship.isTouching(asteroidmediumGroup)){
  gameState="lostlife"
  console.log("collision")
}

document.addEventListener("click",fire,true)
}
if(gameState === "lostlife"){
  //asteroidGroup.destroyEach()
  asteroidsmallGroup.destroyEach()
  asteroidmediumGroup.destroyEach()
  lives=lives-1;
  switch(lives){
    case 2 : healthbar.addImage(healthbar2image);
    gameState = "play"
    break ;
    case 1: healthbar.addImage(healthbar1image);
    gameState="play"
    break;
    case 0 : healthbar.addImage(healthbar0image);
    gameState="end"
    break;
  }
  }
   if(gameState === "end"){
  background("black")
  textSize(45);
  fill("red");
  
  text("Press R to Restart",windowWidth/2-180,windowHeight/2)
  if(keyDown("R")){
    gameState="start";
    lives=4;
    score=0;
    healthbar.addImage(healthbar3image);
    spaceBackground.visible=false;
    spaceship.visible=false;
    healthbar.visible=false;
    
  }
  
   }

else{
  drawSprites();
  textSize(30)
fill("red")
text("score:" + score,windowWidth-120,75);

}

}
function fire(e){
  
  console.log(e)
  targetx = e.pageX ;
targety = e.pageY ;
lazer = createSprite(spaceship.x,spaceship.y);
lazer.addAnimation("fire",lazerImage)
lazer.scale = 0.4;
lazer.lifetime=25;
lazer.shapeColor = "red";
originX=spaceship.x;
originY=spaceship.y;

}



 
