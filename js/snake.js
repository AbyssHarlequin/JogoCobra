let canvas = document.querySelector("#snake");
let ctx = canvas.getContext("2d");

let box = 20; //caixas que compõem o corpo da cobra
let snake = []; //corpo da cobra - a cobra em si

let score = 0;

function showScore(){
    ctx.font="20px Arial";
    ctx.fillStyle="black";
    ctx.fillText(`Score: ${score}`,0,20);
}


snake[0] = {
    x : 10 * box,
    y : 10 * box
} //vetor - coordenadas/posições de cada pedaço da cobra

let maça = new Image();
maça.src="img/apple.png";
maça.name="maça";

let food = {
   x : Math.floor(Math.random()*29) * box,
   y: Math.floor(Math.random()*29) * box
} //gera comida aleatóriamente pelo cenário


let teclas; //chama teclas

document.addEventListener("keydown",direcao);//chama função para teclas ao serem acionadas

function direcao(event){
    let key = event.keyCode;
    if (key == 37 && direcao != "RIGHT"){
        direcao = "LEFT";
    } else  if (key == 38 && direcao != "DOWN"){
        direcao = "UP";
    } else  if (key == 39 && direcao != "LEFT"){
        direcao = "RIGHT";
    } else  if (key == 40 && direcao != "UP"){
        direcao = "DOWN";
    }
}//verificações que impedem cobra de colidir com seu próprio corpo

    function draw(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i=0; i < snake.length; i++){
            ctx.fillStyle = (i == 0)? "green" : "green";
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
        }

        ctx.drawImage(maça, food.x, food.y, box, box);

        let snakeX = snake[0].x;
        let snakeY = snake[0].y; //vetor da movimentação da variável snake

        if (direcao == "LEFT") snakeX -= box;
        if (direcao == "RIGHT") snakeX += box;
        if (direcao == "UP") snakeY -= box;
        if (direcao == "DOWN") snakeY += box; //movimentação da variável snake
        
        if(snakeX == food.x && snakeY == food.y){
            score++;
            food = {
                x : Math.floor(Math.random()*29) * box,
                y: Math.floor(Math.random()*29) * box
             }//se cobra entrar em contato com comida, sorteia nova posição
        }else{
            snake.pop(); //se não tocar continua em movimento
        }
        let newHead = {
            x : snakeX,
            y : snakeY
        } 

        if (snakeX < 0 || snakeX > canvas.width-box ||
            snakeY < 0 || snakeY > canvas.height-box ||
            colisao(newHead, snake)){
                clearInterval(game);
        }
        snake.unshift(newHead);
        showScore();
        }//função que desenha objetos

        function colisao(head,array){
            for(let i = 0;i < array.length; i++){
                if(head.x == array[i].x && head.y == array[i].y){
                    return true;
                }
            }
            return false;
        }

    let game = setInterval(draw, 100); //utiliza função que desenha objetos
    
    

    
