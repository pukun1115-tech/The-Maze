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
    pos : {x : 80.5, y : 80.5},//左上の座標
    size : 32
};

loop();

function loop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    move();
    playerdraw();
    mazedraw();
    requestAnimationFrame(loop);
}

function move(){
    const speed = 2;
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
    ctx.fillRect((canvas.width) / 2 - 0.5, (canvas.height) / 2 - 0.5, player.size + 1, player.size + 1);
}

function checkCollision(newX, newY){

    for(let my = 0; my < maze.length; my++){
        for(let mx = 0; mx < maze[0].length; mx++){
            if(maze[my][mx]===1){
                const wx = mx * mazeSize;
                const wy = my * mazeSize;
                if(
                    newX - 0.5 < wx + mazeSize + 0.5 &&
                    newX + player.size + 0.5 > wx - 0.5 &&
                    newY - 0.5 < wy + mazeSize +0.5 &&
                    newY + player.size + 0.5> wy - 0.5
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
                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(mx * mazeSize - player.pos.x + (canvas.width / 2) - 0.5,
                             my * mazeSize - player.pos.y + (canvas.height / 2) - 0.5,
                             mazeSize + 1,
                             mazeSize + 1);
            }
        }
    }
}