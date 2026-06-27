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

let tap = false;

canvas.addEventListener("touchstart", (e) => {
    tap = true;
});

canvas.addEventListener("touchmove", (e) => {
    tap = true;
});

canvas.addEventListener("touchend", (e) => {
    tap = false;
});

const items = {
    key:false
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
    let speed = keys["ShiftLeft"] ? 6 : 1.5;
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

    if(tap){
        player.pos.x += 1;
    }
    
    if(!checkCollision(nextPlayerX, player.pos.y)) player.pos.x = nextPlayerX;
    if(!checkCollision(player.pos.x, nextPlayerY)) player.pos.y = nextPlayerY;
}

function playerdraw(){
    ctx.fillStyle = "#00ff40";
    ctx.fillRect((canvas.width) / 2, (canvas.height) / 2, player.size, player.size);
}

function checkCollision(newX, newY){

    for(let my = 0; my < maze.length; my++){
        for(let mx = 0; mx < maze[0].length; mx++){
            const wx = mx * mazeSize;
            const wy = my * mazeSize;
            if(maze[my][mx] === 0) continue;
            if(
                newX < wx + mazeSize + 0.4 &&
                newX + player.size > wx - 0.4 &&
                newY < wy + mazeSize + 0.4 &&
                newY + player.size > wy - 0.4
            ){
                if(maze[my][mx] === 1){
                    return true;
                }

                if(maze[my][mx] === 2){
                    items.key = true;
                    maze[my][mx] = 0;
                }

                if(maze[my][mx] === 3)
                {
                    if(items.key){
                        maze[my][mx] = 0;
                    }
                    else{
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function mazedraw(){
    for(let my = 0; my < maze.length; my++){
        for(let mx = 0; mx < maze[0].length; mx++){
            if(maze[my][mx] === 0) continue;
            if(maze[my][mx] === 1) ctx.fillStyle = "#808080";
            if(maze[my][mx] === 2){
                ctx.fillStyle = "#ffff00"

                const r = (mazeSize / 2) * 0.5;
                const cx = mx * mazeSize - player.pos.x + (canvas.width / 2) + mazeSize / 2;
                const cy = my * mazeSize - player.pos.y +(canvas.height / 2) + mazeSize / 2;

                ctx.beginPath();
                ctx.arc(cx,cy,r,0,Math.PI * 2);
                ctx.fill();
                continue;
            }
            ctx.fillRect(
                mx * mazeSize - player.pos.x + (canvas.width / 2) - 0.4,
                my * mazeSize - player.pos.y + (canvas.height / 2) - 0.4,
                mazeSize + 0.8,
                mazeSize + 0.8
            );
            
        }
    }
}

