const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

window.addEventListener("resize", resize);

resize();

function resize(){    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

const keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

const player = {
    pos : {x : 320, y : 64},//左上の座標
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
    
    if(keys["w"]){
        nextPlayerY -= speed;
    }

    if(keys["s"]){
        nextPlayerY += speed;
    }

    if(keys["d"]){
        nextPlayerX += speed;
    }

    if(keys["a"]){
        nextPlayerX -= speed;
    }

    if(!checkCollision(nextPlayerX, player.pos.y)) player.pos.x = nextPlayerX;
    if(!checkCollision(player.pos.x, nextPlayerY)) player.pos.y = nextPlayerY;
}

function playerdraw(){
    ctx.fillStyle = "#0040ff";
    ctx.fillRect((canvas.width) / 2 - 1, (canvas.height) / 2 - 1, player.size + 2, player.size + 2);
}

function checkCollision(newX, newY){

    for(let my = 0; my < maze.length; my++){
        for(let mx = 0; mx < maze[0].length; mx++){
            if(maze[my][mx]===1){
                const wx = mx * mazeSize;
                const wy = my * mazeSize;
                if(
                    newX < mx * mazeSize + mazeSize&&
                    newX + player.size>mx * mazeSize&&
                    newY < my * mazeSize + mazeSize &&
                    newY + player.size > my * mazeSize
                ){
                 return true;
                }
            }
        }
    }
    return false;
}
function mazedraw(){
    for(let my = 0; my < 8; my++){
        for(let mx = 0; mx < 8; mx++){
            if(maze[my][mx]===1){
                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(mx * mazeSize - player.pos.x + (canvas.width / 2) - 1,
                             my * mazeSize - player.pos.y + (canvas.height / 2) - 1,
                             mazeSize + 2,
                             mazeSize + 2);
            }
        }
    }
}