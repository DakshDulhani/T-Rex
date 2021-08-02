var checkpoint
var die
var hop
var GameOver
var GameOverImg
var RESTART
var RESTARTImg
var PLAY =1;
var END = 0;
var gameState = PLAY;
var trex
var trex_running;
var ground
var land
var invisibleGround
var cloud
var cloudImg
var obstacle;
var obstacleImg1;
var obstacleImg2;
var obstacleImg3;
var obstacleImg4;
var obstacleImg5;
var obstacleImg6;
var obstaclesGroup
var cloudsGroup;
var trexFreze
var meter = 0
function preload(){
 trex_running= loadAnimation("trex1.png","trex3.png","trex4.png") 
 land= loadImage("ground2.png") 
cloudImg = loadImage("cloud.png");
trexFreze= loadAnimation("trex_collided.png")  
  obstacleImg1 = loadImage("obstacle1.png")
  obstacleImg2 = loadImage("obstacle2.png")
  obstacleImg3 = loadImage("obstacle3.png")
  obstacleImg4 = loadImage("obstacle4.png")
  obstacleImg5 = loadImage("obstacle5.png")
  obstacleImg6 = loadImage("obstacle6.png")
GameOverImg = loadImage("gameOver.png")
RESTARTImg = loadImage("restart.png")
hop=loadSound("jump.wav")
die=loadSound("DEAD.flac")
checkpoint=  loadSound("okay.wav")
}

function setup(){
  
  createCanvas(600,200);
  
  trex= createSprite(40,100,10,20);
  trex.addAnimation("sprint",trex_running)
  trex.addAnimation("stop", trexFreze)
  trex.scale=0.5
  trex.debug=false
  //trex.setCollider("circle",0,0,40)
  ground= createSprite(300,170,600,10) 
  ground.addImage(land)
  
  invisibleGround = createSprite(300,185,600,10);
  invisibleGround.visible = false;
  obstaclesGroup= new Group()
  cloudsGroup = new Group();
  GameOver = createSprite(300,100,10,10)
  GameOver.addImage(GameOverImg)
GameOver.scale = 0.5
GameOver.visible=false
  RESTART = createSprite(300, 130,10,10)
RESTART.addImage(RESTARTImg)
RESTART.scale = 0.5
RESTART.visible=false
}


function draw(){
  
  background("tan");
  text("score: "+meter,500,25)
  
  if(gameState === PLAY){
    if(keyDown("space")  &&  trex.y  > 155){
    hop.play()
  trex.velocityY = -9
     
     }
     trex.velocityY= trex.velocityY+0.5
    
      ground.velocityX= -6

    if(ground.x<0){
  ground.x=300  
  }
    
    if(frameCount % 1 ===0){
      meter=meter+1   
    }
  
if(meter%100===0 && meter>0){
 checkpoint.play()  
   }
    CreateObstacles()
  CreateClouds()
    
    if(obstaclesGroup.isTouching(trex)){
      gameState = END
    die.play()
    }
  }
  
  else if(gameState ===  END) {

      ground.velocityX= 0;
    trex.velocityY= 0;
    obstaclesGroup.setVelocityXEach(0)
      cloudsGroup.setVelocityXEach(0)
  obstaclesGroup.setLifetimeEach(-1)
      cloudsGroup.setLifetimeEach(-1) 
trex.changeAnimation("stop", trexFreze)  
 GameOver.visible= true 
 RESTART.visible= true 
if(mousePressedOver(RESTART)){
gameState= PLAY  
obstaclesGroup.destroyEach()
trex.changeAnimation("sprint",trex_running)
GameOver.visible= false
 RESTART.visible= false
cloudsGroup.destroyEach()
meter=0
}
  }
  
 
  trex.collide(invisibleGround)

  
  

    drawSprites();
}


function CreateClouds(){
  

if(frameCount % 120 === 0){
  
  cloud =  createSprite(620,random(10,100),10,10);
  cloud.addImage(cloudImg)
  cloud.scale = 0.5;
  cloud.velocityX = -6;
  cloud.lifetime = 300
  cloudsGroup.add(cloud)
  
}
}


function CreateObstacles(){
  if(frameCount % 50 ===0){
    
    obstacle = createSprite(620,160,10,30);
    obstacle.addImage(obstacleImg1)
    obstacle.scale = 0.5;
    obstacle.velocityX = -6
    obstacle.lifetime = 160
    obstaclesGroup.add(obstacle)
    var fiveStar = Math.round(random(1,6))
    
  
      switch(fiveStar) {
      case 1: obstacle.addImage(obstacleImg1);
              break;
      case 2: obstacle.addImage(obstacleImg2);
              break;
      case 3: obstacle.addImage(obstacleImg3);
              break;
      case 4: obstacle.addImage(obstacleImg4);
              break;
      case 5: obstacle.addImage(obstacleImg5);
              break;
      case 6: obstacle.addImage(obstacleImg6);
              break;
      default: break;
    }
  }
  
}