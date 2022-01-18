const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;
var backImg;
var bunnyImg;
var fruitImg;
var bunny;
var button;

function preload()
{
  backImg = loadImage("background.png")
  bunnyImg = loadImage("Rabbit-01.png");
  fruitImg = loadImage("melon.png");

}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);

  rope = new Rope(7,{x:245,y:30});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
  bunny = createSprite(250,650,100,100);
  bunny.addImage("bunny", bunnyImg)
  bunny.scale = 0.25;

  button = createImg("cut_button.png");
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);
}

function draw() 
{
  background(51);
  image(backImg, 0, 0, displayWidth + 80, displayHeight);
  imageMode(CENTER);
  if(fruit != null){
  image(fruitImg, fruit.position.x, fruit.position.y, 60, 60);
  }
  rope.show();
  //ellipse(fruit.position.x,fruit.position.y,30,30);
  Engine.update(engine);
  ground.show();

 
  drawSprites(); 
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}