var forest,forestImg
var boy,boyImg
var dog,dogImg
var rockImg
var invisibleBlock
var PLAY = 1
var END = 0
var gameState = PLAY

function preload(){
forestImg=loadImage("forest.png")
boyImg=loadImage("boy.gif")
rockImg=loadImage("rock2.png")
gameOverImg=loadImage("gameOver.png")
restartImg=loadImage("restart.jpg")
}

function setup(){

  createCanvas(windowWidth,windowHeight)

  forest=createSprite(100,height,width,2)
  forest.addImage("forest1",forestImg)
  forest.scale=2
  forest.velocityX=1
  forest.y=height/2.1
  forest.x=width/2

  invisibleGround = createSprite(width/2,height-60,width,125);  

  boy=createSprite(80,height-235,20,50);
  boy.addImage("boy_moving",boyImg);
  boy.scale=0.4

  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.1;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  

  rockG=new Group();
  coinsG=new Group();
}

function draw()
{
  background("white")

  if (gameState===PLAY){

    if (forest.x < 0){
      forest.x = forest.width/2;
    }

    boy.velocityX=1;
  if(keyDown("space")&& boy.y >= 100) {
    boy.velocityY = -12;
  }
   boy.velocityY = boy.velocityY + 0.8
  boy.collide(invisibleGround);
  spawnRocks()

  if(boy.isTouching(rockG)){
     gameState=END
  }
}


  else if (gameState === END)
   {
    gameOver.visible = true;
    restart.visible = true;
    boy.velocityX = 0;
    boy.visible=false;
  
    rockG.velocityYEach = 0
    rockG.setLifetimeEach(-1);
   
 }

  drawSprites()
}


function spawnRocks(){
  if (frameCount%100===0){
  var rock=createSprite(600,height-160,20,30)
  rock.x=Math.round(random(width/1,width/1))
  rock.addImage(rockImg)
  rock.velocityX=-4
  rock.lifetime=800
  rock.scale=0.1
  rockG.add(rock)

  }
}