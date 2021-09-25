const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
var engine, world,ground;
var backgroundImg; 
var tower,towerImg
var canon;
var balls = [] 
var boats = []

function preload() {
 backgroundImg = loadImage("background.gif")
 towerImg = loadImage("tower.png");
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  angleMode(DEGREES)
  world = engine.world;
  var groundOptions = {isStatic : true 

  }

  ground= Matter.Bodies.rectangle(600,600,1200,10,groundOptions)
  World.add(world,ground); 

  var towerOptions = {isStatic : true 

  }
  tower=Matter.Bodies.rectangle(160,350,160,310,towerOptions)
  World.add(world,tower);

  canon = new Canon(180,110,130,100,20)
 
  
}

function draw() {
  background(backgroundImg);
 
  Engine.update(engine);
  rect(ground.position.x,ground.position.y,1200,10);
   rectMode(CENTER)
   push()
   imageMode(CENTER);
   image(towerImg,tower.position.x,tower.position.y,160,310);
   pop()
   
   
   for(var i=0;i<balls.length;i++){
     showCanonBalls(balls[i],i)
     collisionWithBoat(i)
   }
   canon.display();
  showBoats();
}
function keyPressed(){
  if(keyCode===DOWN_ARROW){
    canonBall = new Ball(canon.x+10,canon.y);
    balls.push(canonBall)
  }
}
function showCanonBalls(ball,index){
  if(ball){
    ball.display()
    if(ball.body.position.x>=width||ball.body.position.y>=height-50){
     ball.remove(index)
    }
  }
}
function showBoats(){
  if(boats.length>0){
    if(boats.length<4&&
      boats[boats.length-1].body.position.x<width-300){
        var positions = [-40,-60,-70,-20]
        var position = random(positions)
        var boat = new Boat(width,height-100,170,170,position)
        boats.push(boat);
      }
  for(var i=0;i<boats.lenth;i++){
    Body.setVelocity(boats[i].body,{x:-0.9,y:0})
    boats[i].display()
  }
  }
  else {
   var boat = new Boat(width,height-60,170,170,-60)
   boats.push(boat);
  }
}
function collisionWithBoat(index){
for(var i=0;i<boats.length;i++){
  if(balls[index]!==undefined&&boats[i]!==undefined){
    var collision = Matter.SAT.collides(balls[index].body,boats[i].body)
    if(collision.collided){
      score+=5
      boats[i].remove(i)
      balls[index].remove(index)
    }
  }
}
}
function keyReleased(){
  if(keyCode===DOWN_ARROW){
    balls[balls.length-1].shoot();
  }
}