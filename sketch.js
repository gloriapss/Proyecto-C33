//Declaración de variables del motor físico
var Engine = Matter.Engine,
    World = Matter.World,
    Events = Matter.Events,
    Bodies = Matter.Bodies; 

//Declaración de variables elementos gráficos del juego
var balls = [];
var plinkos = [];
var divisions =[];
var ball;

//Delclaración de variables para la manipulación del juego
var divisionHeight=300;
var score =0;
var count = 0;
var gameState ="start";

//Función que inicializa los objetos del juego
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  //Ciclo que agrega las divisiones
  for (var k = 0; k <=width; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }
  
  //Ciclo que prepara la primera fila de bolitas
  for (var j = 75; j <=width; j=j+50) {
    plinkos.push(new Plinko(j,75));
  }

  //Ciclo que prepara la segunda fila de bolitas 
  for (var j = 50; j <=width-10; j=j+50) {
    plinkos.push(new Plinko(j,175));
  }

  //Ciclo que prepara la tercera fila de bolitas
  for (var j = 75; j <=width; j=j+50) {
    plinkos.push(new Plinko(j,275));
  }

  //Ciclo que prepara la cuarta fila de bolitas
  for (var j = 50; j <=width-10; j=j+50) {
    plinkos.push(new Plinko(j,375));
  }    
}

//Función que dibuja los elementos gráficos
function draw() {
  background("black");
  textSize(35)
  text("Puntuación : "+score,20,40);
  fill("white");
   
  textSize(35)
  text(" 500 ", 5, 550);
  text(" 500 ", 80, 550);
  text(" 500 ", 160, 550);
  text(" 500 ", 240, 550);
  text(" 100 ", 320, 550);
  text(" 100 ", 400, 550);
  text(" 100 ", 480, 550);
  text(" 200 ", 560, 550);
  text(" 200 ", 640, 550);
  text(" 200 ", 720, 550);
  Engine.update(engine);
  ground.display();
  
  //Comprueba el estado del juego, si es end entonces ya terminó
  if ( gameState =="end") 
  {    
    textSize(60);
    fill ("maroon");
    text("Juego Terminado", 150, 250);    
  }

  //ciclo que muestra las hilera de las bolitas
  for (var i = 0; i < plinkos.length; i++) 
  {
     plinkos[i].display();  
  }

  if(ball!=null) 
  {
    ball.display();        
    if (ball.body.position.y>760) 
    {
      if (ball.body.position.x < 300) 
      {
        score=score+500;      
        ball=null;
        if ( count>= 5) gameState ="end";                    
      }
      else if (ball.body.position.x < 600 && ball.body.position.x > 301 ) 
      {
        score = score + 100;
        ball=null;
        if ( count>= 5) gameState ="end";
      }
      else if (ball.body.position.x < 900 && ball.body.position.x > 601 )
      {
        score = score + 200;
        ball=null;
        if ( count>= 5)  gameState ="end";

      }      
              
    }  
  }

  for (var k = 0; k < divisions.length; k++) 
  {
    divisions[k].display();
  } 
}

//Función que permite la activación del mouse para que caiga la bolita
function mousePressed()
{
  if(gameState!=="end")
  {
    count++;
    ball=new Ball(mouseX, 10, 10, 10); 
  }   
}