const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg,boat;
var canvas, angle, tower, ground, cannon;
var balls = [];
var boats = [];
var leftbutton, leftbuttonimg, 
rightbutton, rightbuttonimg, 
cannonballbutton, cannonballbuttonimg;

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  leftbuttonimg = loadImage("./assets/left_arrow.png");
  rightbuttonimg = loadImage("./assets/right_arrow.png");
  cannonballbuttonimg = loadImage("./assets/cannonballbutton.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);//1200, 600
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15
  
  leftbutton = createSprite(width/2 - 85, 45, 15, 15);
  leftbutton.addImage("leftb", leftbuttonimg);
  
  rightbutton = createSprite(width/2 + 85, 45, 15, 15);
  rightbutton.addImage("leftb", rightbuttonimg);
  
  cannonballbutton = createSprite(width/2, 45, 15, 15);
  cannonballbutton.addImage("cannonballb", cannonballbuttonimg);
  cannonballbutton.scale = 0.3;
  
  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);
  
  tower = Bodies.rectangle(160, windowHeight-280, 160, 310, { isStatic: true });//160, 350
  World.add(world, tower);
  
  cannon = new Cannon(180, windowHeight-490, 130, 100, angle);//180, 110, 130, 100, angle
  
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

 
  rect(ground.position.x, ground.position.y, width * 2, 1);
  

  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();



  showBoats();
  
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    collisionwithboat(i);
  }

  cannon.display();

  drawSprites();
}

function collisionwithboat(index){
  for(var i=0; i < boats.length; i++){
    if(balls[index] !== undefined && boats[i] !== undefined){
      var collision = Matter.SAT.collides(balls[index].body, boats[i].body);
      if(collision.collided){
        boats[i].remove(i);
        Matter.World.remove(world, balls[index].body);
        delete balls[index];
      }
    }
  }
  
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
    if(ball.body.position.x >= width || ball.body.position.y >= height-50){
      ball.remove(index);
    }
  }
}

function showBoats() {
  if (boats.length > 0) {
    if (
      boats[boats.length - 1] === undefined ||
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var boat = new Boat(width, height - 100, 170, 170, position);

      boats.push(boat);
    }

    for (var i = 0; i < boats.length; i++) {
      if (boats[i]) {
        Matter.Body.setVelocity(boats[i].body, {
          x: -0.9,
          y: 0
        });

        boats[i].display();
      } 
    }
  } else {
    var boat = new Boat(width, height - 60, 170, 170, -60);
    boats.push(boat);
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}

