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
    pos : {x : 320, y : 0},//左上の座標
    size : 32
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

    if(!checkCollision(nextPlayerX, player.pos.y)) player.pos.x = nextPlayerX;
    if(!checkCollision(player.pos.x, nextPlayerY)) player.pos.y = nextPlayerY;
}

function playerdraw(){
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect((canvas.width) / 2, (canvas.height) / 2, player.size, player.size);
}

function checkCollision(newX, newY){
    for(let my = 0; my < 8; my++){
        for(let mx = 0; mx < 8; mx++){
            if(maze[my][mx]===1){
                const wx = mx * 32;
                const wy = my * 32;
                if(newX > wx &&
                   newX < wx + 32 &&
                   newY > wy &&
                   newY < wy + 32){
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
                ctx.fillRect(mx * 32 - player.pos.x + (canvas.width / 2),
                             my * 32 - player.pos.y + (canvas.height / 2),
                             32,
                             32);
            }
        }
    }
}

