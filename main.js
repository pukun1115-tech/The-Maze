const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

window.addEventListener("resize", resize);

resize();

function resize(){    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

const keys = {};
document.addEventListener("keydown", e => {
    keys[e.code] = true;
});
document.addEventListener("keyup", e => {
    keys[e.code] = false;
});

const player = {
    pos : {x : 160, y : 160},//左上の座標
    size : 64
};

canvas.addEventListener("touchstart", e => {
    player.pos.x += 0;
});

canvas.addEventListener("touchend", e => {
    player.pos.x += 10;
});

loop();

function loop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    move();
    playerdraw();
    mazedraw();
    requestAnimationFrame(loop);
}

function move(){
    const speed = 1.5;
    let nextPlayerX = player.pos.x;
    let nextPlayerY = player.pos.y;
    
    if(keys["KeyW"]){
        nextPlayerY -= speed;
    }

    if(keys["KeyS"]){
        nextPlayerY += speed;
    }

    if(keys["KeyD"]){
        nextPlayerX += speed;
    }

    if(keys["KeyA"]){
        nextPlayerX -= speed;
    }

    if(!checkCollision(nextPlayerX, player.pos.y)) player.pos.x = nextPlayerX;
    if(!checkCollision(player.pos.x, nextPlayerY)) player.pos.y = nextPlayerY;
}

function playerdraw(){
    ctx.fillStyle = "#0040ff";
    ctx.fillRect((canvas.width) / 2, (canvas.height) / 2, player.size, player.size);
}

function checkCollision(newX, newY){

    for(let my = 0; my < maze.length; my++){
        for(let mx = 0; mx < maze[0].length; mx++){
            if(maze[my][mx]===1){
                const wx = mx * mazeSize;
                const wy = my * mazeSize;
                if(
                    newX < wx + mazeSize + 0.4 &&
                    newX + player.size > wx - 0.4 &&
                    newY < wy + mazeSize +0.4 &&
                    newY + player.size > wy - 0.4
                ){
                 return true;
                }
            }
        }
    }
    return false;
}
function mazedraw(){
    for(let my = 0; my < maze.length; my++){
        for(let mx = 0; mx < maze[0].length; mx++){
            if(maze[my][mx]===1){
                ctx.fillStyle = "#808080";
                ctx.fillRect(
                    mx * mazeSize - player.pos.x + (canvas.width / 2) - 0.4,
                    my * mazeSize - player.pos.y + (canvas.height / 2) - 0.4,
                    mazeSize + 0.8,
                    mazeSize + 0.8
                );
            }
        }
    }
}
