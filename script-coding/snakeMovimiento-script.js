//Vamos a usar http://processingjs.org/
// o https://p5js.org/reference/

// Importamos las librerias
let { append, cons, first, isEmpty, isList, length, rest, map, forEach }  = functionalLight;

// Actualiza los atributos del objeto y retorna una copia profunda
function update(data, attribute) {
  return Object.assign({}, data, attribute);
}

//////////////////////// Mundo inicial
let Mundo = {}
////////////////////////
/**
 * Actualiza la serpiente. Creando una nuevo cabeza y removiendo la cola
 */
function moveSnake(snake, dir) {
  const head = first(snake);
  return cons({x: head.x + dir.x, y: head.y + dir.y}, snake.slice(0, length(snake) - 1));
}


const dx = 20;
const dy = 20;
const Limit = 0
const Limit1 = 19

/**
 * Esto se llama antes de iniciar el juego
 */
function setup() {
  frameRate(5);
  createCanvas(400, 400);
  background(0, 0, 0);

  Mundo = {
    snake2: [{ x: 3, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 2 }],
    snake: [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }],
    dir2: {x: 1, y: 0}, 
    dir: {x: 1, y: 0}, 
    food: foodGen()
  };
}


function foodGen() { 
  return {x: (Math.round(Math.random(200)*10)*20), y: (Math.round(Math.random(200)*10)*20)}
}

function comer(firstSnake) {
  if (firstSnake.x*dx == Mundo.food.x && firstSnake.y*dy == Mundo.food.y) {return true} 
    else return false}

// ejemplo : if comer(first(Mundo.snake)) es boolean o  if comer(first(Mundo.snake2)) 

function chocar(Mundo) {
  if (first(Mundo.snake).x == Limit1 && dir.x == 1 || first(Mundo.snake).x == Limit && Mundo.dir.x == 1 ) {return true}
  else if (first(Mundo.snake).y == Limit1 && dir.y == 1 || first(Mundo.snake).y == Limit && Mundo.dir.y == -1 ) {return true}
  else  return false;
}


function chocar2(Mundo) {
  if (first(Mundo.snake2).x == Limit1 && dir2.x == 1 || first(Mundo.snake2).x == Limit && Mundo.dir2.x == 1 ) {return true}
  else if (first(Mundo.snake2).y == Limit1 && dir2.y == 1 || first(Mundo.snake2).y == Limit && Mundo.dir2.y == -1 ) {return true}
  else  return false;
}


function morderse(body,head) {
  if (JSON.stringify(first(rest(body)))===JSON.stringify(head)) {return true}
  else if (isEmpty(body)) {return false}
  else return morderse(rest(body),head)
}

// Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar
function drawGame(Mundo){

  const body1 = Mundo.snake;
  const head1 = first(Mundo.snake);
  const body2 = Mundo.snake2;
  const head2 = first(Mundo.snake2);

  background(0, 0, 0);
  fill(240, 240, 200);

  forEach(Mundo.snake, s => {
    rect(s.x * dx, s.y * dy, dx, dy);
  });
  fill(0, 240, 200);
  forEach(Mundo.snake2, s => {
    rect(s.x * dx, s.y * dy, dx, dy);
  });

  fill(250,0,0);
  rect(Mundo.food.x,Mundo.food.y,dx,dy);
  if (chocar(Mundo)||chocar2(Mundo)||morderse(body1,head1)||morderse(body2,head2)) {
    textSize(32)
    text("Try Again",150,200);
    fill(0,102,153);
    return noLoop();
  }


}


// Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones
function onTic(Mundo){
  if (comer(first(Mundo.snake))) {
  //comer Culebra 1
    if (Mundo.dir.x == 1) {
      return update(Mundo,{
        food: foodGen(), 
        snake:cons({x:first(Mundo.snake).x+1 ,y:first(Mundo.snake).y },Mundo.snake) 
      })
    }
    else if (Mundo.dir.x == -1) {
      return update(Mundo,{
        food: foodGen(), 
        snake:cons({x:first(Mundo.snake).x-1 ,y:first(Mundo.snake).y },Mundo.snake) 
      })
    }

    else if (Mundo.dir.y == 1) {
      return update(Mundo,{
        food: foodGen(), 
        snake:cons({x:first(Mundo.snake).x ,y:first(Mundo.snake).y+1 },Mundo.snake) 
      })
    }

    else if (Mundo.dir.y == -1) {
      return update(Mundo,{
        food: foodGen(), 
        snake:cons({x:first(Mundo.snake).x ,y:first(Mundo.snake).y-1 },Mundo.snake) 
      })
    }



  }
  else if (comer(first(Mundo.snake2))) {
  //Comer Culebra 2

    if (Mundo.dir2.x == 1) {
      return update(Mundo,{
        food: foodGen(), 
        snake2:cons({x:first(Mundo.snake2).x+1 ,y:first(Mundo.snake2).y },Mundo.snake2) 
      })
    }
    else if (Mundo.dir2.x == -1) {
      return update(Mundo,{
        food: foodGen(), 
        snake2:cons({x:first(Mundo.snake2).x-1 ,y:first(Mundo.snake2).y },Mundo.snake2) 
      })
    }

    else if (Mundo.dir2.y == 1) {
      return update(Mundo,{
        food: foodGen(), 
        snake2:cons({x:first(Mundo.snake2).x ,y:first(Mundo.snake2).y+1 },Mundo.snake2) 
      })
    }

    else if (Mundo.dir2.y == -1) {
      return update(Mundo,{
        food: foodGen(), 
        snake2:cons({x:first(Mundo.snake2).x ,y:first(Mundo.snake2).y-1 },Mundo.snake2) 
      })
    }



  }
  else return update(Mundo, {snake: moveSnake(Mundo.snake, Mundo.dir),snake2: moveSnake(Mundo.snake2, Mundo.dir2)});



}

//Implemente esta función si quiere que su programa reaccione a eventos del mouse
function onMouseEvent (Mundo, event) {
   return update(Mundo,{});
}


/**
* Actualiza el mundo cada vez que se oprime una tecla. Retorna el nuevo stado del mundo
*/
function onKeyEvent (Mundo, keyCode) {
  // Cambiamos la dirección de la serpiente. Noten que no movemos la serpiente. Solo la dirección
  switch (keyCode) {
    case UP_ARROW:
      return update(Mundo, {dir: {y: -1, x: 0}});
      break;
    case DOWN_ARROW:
      return update(Mundo, {dir: {y: 1, x: 0}});
      break;
    case LEFT_ARROW:
      return update(Mundo, {dir: {y: 0, x: -1}});
      break;
    case RIGHT_ARROW:
      return update(Mundo, {dir: {y: 0, x: 1}});
      break;
    case 87:
      return update(Mundo, {dir2: {y: -1, x: 0}});
      break;
    case 83:
      return update(Mundo, {dir2: {y: 1, x: 0}});
      break;
    case 65:
      return update(Mundo, {dir2: {y: 0, x: -1}});
      break;
    case 68:
      return update(Mundo, {dir2: {y: 0, x: 1}});
      break;
    default:
      console.log(keyCode);
      return update(Mundo, {});
  }




}
