const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

window.addEventListener("resize",resize);

resize();

function resize(){    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

const keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

const player = {
    pos : {x : 0, y : 0},
    size : 8
};

loop();

function loop(){
    move();
    playerdraw();
    mazedraw();
    requestAnimationFrame(loop);
}

function move(){
    const speed = 0.5;
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

    if(!checkCollision(nextPlayerX,player.pos.y)) player.pos.x = nextPlayerX;
    if(!checkCollision(player.pos.x,nextPlayerY)) player.pos.y = nextPlayerY;
}

function playerdraw(){
    ctx.fillStyle = "white";
    ctx.fillRect(((canvas.width) / 2) - (player.size / 2), ((canvas.height) / 2) - (player.size / 2), player.size, player.size);
}

function checkCollision(newX,newY){
    for(let my = 0;my < 80;my++){
        for(let mx = 0;mz < 8;mx++){
            if(maze[my][mx]===1){
                const wx = mx * 16;
                const wy = my * 16;
                if(newX > wx &&
                   newX < wx + 16 &&
                   newY > wy &&
                   newY < wy +16){
                 return true;
                }
            }
        }
    }
    return false;
}
function mazedraw(){
    for(let my = 0;my < 80;my++){
        for(let mx = 0;mx<80;mx++){
            if(maze[my][mx]===1){
                ctx.fillRect(mx * 16 - player.pos.x,
                             my * 16 - player.pos.y,
                             16,
                             16);
            }
        }
    }
}

