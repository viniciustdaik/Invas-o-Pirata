const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var cannonBall;
var leftbutton, leftbuttonimg, rightbutton, rightbuttonimg;

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  leftbuttonimg = loadImage("./assets/left_arrow.png");
  rightbuttonimg = loadImage("./assets/right_arrow.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);//1200, 600
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 15;
  
  leftbutton = createSprite(width/2-45, 45, 15, 15);
  leftbutton.addImage("leftb", leftbuttonimg);
  
  rightbutton = createSprite(width/2+45, 45, 15, 15);
  rightbutton.addImage("leftb", rightbuttonimg);
  
  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);
  
  tower = Bodies.rectangle(160, windowHeight-280, 160, 310, { isStatic: true });//160, 350
  World.add(world, tower);
  
  cannon = new Cannon(180, windowHeight-490, 130, 100, angle);//180, 110, 130, 100, angle
  cannonBall = new CannonBall(cannon.x, cannon.y);
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);
  
  Engine.update(engine);

  rect(ground.position.x, ground.position.y, width * 2, 1);
  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();

  cannon.display();
  cannonBall.display();

  drawSprites();
}

function keyReleased(){
  if(keyCode === DOWN_ARROW
  ||touches.length > 0&&!mouseIsOver(leftbutton)
  ||touches.length > 0&&!mouseIsOver(rightbutton)){
    cannonBall.shoot();
  }
}
