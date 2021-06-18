var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed;
var lastFed;

var h, ho;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,600);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed=createButton('Feed');
  feed.position(725,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  

 
}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  database.ref('feedTime').on('value',trans);

 
  //write code to display text lastFed time here
  textSize(22);
  fill('white');
  ho = h - 12;
  
if (h < 12) {
  text("Last Fed: "+h+" am",625,95);
}
else if (h === 12) {
  text("Last Fed: "+h+" pm",625,95);
}
else if (h > 12) {
  text("Last Fed: "+ho+" pm",625,95)
}
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  if (foodS>=1)
  foodS = foodS-1;
  //write code here to update food stock and last fed time
  database.ref('/').update({
    Food:foodS,
    feedTime:hour(),
  })


}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS,
  })
}

function trans(data) {
h = data.val();
}
