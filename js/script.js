let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");

let direcao = "right";
let velocidade = 250;

let box = 32;
let cobrinha = [];
cobrinha[0] = {
  x: 8 * box,
  y: 8 * box
}

let comida = {
  x: geraNumeroAleatorio(),
  y: geraNumeroAleatorio()
}


function criarBG() {
  context.fillStyle = "#ddd";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobra() {
  for (i = 0; i < cobrinha.length; i++) {
    context.fillStyle = "blue";
    context.fillRect(cobrinha[i].x, cobrinha[i].y, box, box);
  }
}

function printComida() {
  context.fillStyle = "red";
  context.lineWidth = 2;
  context.fillRect(comida.x, comida.y, box, box);
}

function loopDaCobra() {
  if (cobrinha[0].x > 16 * box && direcao == "right") {
    cobrinha[0].x = 1;
  }

  if (cobrinha[0].x < 0 && direcao == "left") {
    cobrinha[0].x = 16 * box;
  }

  if (cobrinha[0].y < 0 && direcao == "up") {
    cobrinha[0].y = 16 * box;
  }

  if (cobrinha[0].y > 15 * box && direcao == "down") {
    cobrinha[0].y = 0;
  }
}


function verificaSeCobraColidiu() {
  for (i = 1; i < cobrinha.length; i++) {
    if ( (cobrinha[0].x === cobrinha[i].x) && (cobrinha[0].y === cobrinha[i].y) ) {
        clearInterval(game);
        alert("Game over!");
    }
  }
}

function cobraComportamento() {
  let cabecaCobraX = cobrinha[0].x;
  let cabecaCobraY = cobrinha[0].y;

  if (direcao == "right") cabecaCobraX += box;
  if (direcao == "left") cabecaCobraX -= box;
  if (direcao == "up") cabecaCobraY -= box;
  if (direcao == "down") cabecaCobraY += box;

  if (cabecaCobraX == comida.x && cabecaCobraY == comida.y) {
    comida.x = geraNumeroAleatorio();
    comida.y = geraNumeroAleatorio();    
  } else {
    cobrinha.pop();
  }

  let newHead = {
    x: cabecaCobraX,
    y: cabecaCobraY
  }
  
  cobrinha.unshift(newHead);
}


document.addEventListener('keydown', atualizarEventoSetas);
function atualizarEventoSetas(event) {
  if (event.keyCode == 37 && direcao !== "right") direcao = "left";
  if (event.keyCode == 38 && direcao !== "down") direcao = "up";
  if (event.keyCode == 39 && direcao !== "left") direcao = "right";
  if (event.keyCode == 40 && direcao !== "up") direcao = "down";
}

function geraNumeroAleatorio() {
  return Math.floor(Math.random() * 15 + 1) * box;
}

function iniciarJogo() {  
  verificaSeCobraColidiu();
  loopDaCobra();
  criarBG();
  criarCobra();
  printComida();
  cobraComportamento();  
}

//Inicia o jogo
let game = setInterval(iniciarJogo, velocidade);