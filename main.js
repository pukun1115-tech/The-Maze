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

const items = {
    key1: false,
    key2: false
};

let cleared = false;
let goalHue = 0;//ゴールの色

loop();

function loop(){
    if(cleared){
        clear();
    }
    else{
        ctx.clearRect(0,0,canvas.width,canvas.height);

        goalHue = (goalHue + 1) % 360;

        move();
        mazedraw();
        playerdraw();
        itemDraw();
        requestAnimationFrame(loop);
    }
}

function clear(){
    ctx.clearRect(0, 0 ,canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.font = "100px Comic Sans MS";
    ctx.textAlign = "center";
    ctx.fillText("CLEAR!", canvas.width/2, canvas.height/2);

    requestAnimationFrame(clear);
}

function move(){
    let speed = keys["ShiftLeft"] ? 3 : 1.5;
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

function itemDraw(){
    let x = 30;
    if(items.key1){
        ctx.fillStyle = "#ffff00";

        ctx.beginPath();
        ctx.arc(x,30,20,0,Math.PI * 2);
        ctx.fill();

        x += 60;
    }

    if(items.key2){
        ctx.fillStyle = "#ff00ff";

        ctx.beginPath();
        ctx.arc(x,30,20,0,Math.PI * 2);
        ctx.fill();
    }
}

function playerdraw(){
    ctx.fillStyle = "#00ff40";
    ctx.fillRect((canvas.width) / 2, (canvas.height) / 2, player.size, player.size);
}

function checkCollision(newX, newY){

    for(let my = 0; my < maze.length; my++){
        for(let mx = 0; mx < maze[0].length; mx++){
            let wx = mx * mazeSize;
            let wy = my * mazeSize;
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
                    items.key1 = true;
                    maze[my][mx] = 0;
                    continue;
                }

                if(maze[my][mx] === 3){
                    if(items.key1){
                        items.key1 = false;
                        maze[my][mx] = 0;
                        continue;
                    }
                    else{
                        return true;
                    }
                }

                if(maze[my][mx] === 4){
                    items.key2 = true;
                    maze[my][mx] = 0;
                    continue;
                }

                if(maze[my][mx] === 5){
                    if(items.key2){
                        items.key2 = false;
                        maze[my][mx] = 0;
                        continue;
                    }
                    else{
                        return true;
                    }
                }

                if(maze[my][mx] === 6){
                    cleared = true;
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

            const r = (mazeSize / 2) * 0.5;
            let cx = mx * mazeSize - player.pos.x + (canvas.width / 2);
            let cy = my * mazeSize - player.pos.y +(canvas.height / 2);

            if(maze[my][mx] === 1){
                ctx.fillStyle = "#808080";
                
                ctx.fillRect(
                    cx - 0.4,
                    cy - 0.4,
                    mazeSize + 0.8,
                    mazeSize + 0.8
                );
            }

            if(maze[my][mx] === 6){
                ctx.fillStyle = `hsl(${goalHue}, 100%, 60%)`;
                
                ctx.fillRect(
                    cx - 0.4,
                    cy - 0.4,
                    mazeSize + 0.8,
                    mazeSize + 0.8
                );
            }

            if(maze[my][mx] === 2){
                ctx.fillStyle = "#ffff00";

                ctx.beginPath();
                ctx.arc(cx + (mazeSize / 2),cy + (mazeSize / 2),r,0,Math.PI * 2);
                ctx.fill();
            }

            if(maze[my][mx] === 4){
                ctx.fillStyle = "#ff00ff";

                ctx.beginPath();
                ctx.arc(cx + (mazeSize / 2),cy + (mazeSize / 2),r,0,Math.PI * 2);
                ctx.fill();
            }

            if(maze[my][mx] === 3){
                ctx.fillStyle = "#ffff00";

                ctx.fillRect(
                cx - 0.4,
                cy - 0.4,
                mazeSize + 0.8,
                mazeSize + 0.8);

                ctx.fillStyle = "#000000";

                ctx.beginPath();
                ctx.arc(cx + (mazeSize / 2),cy + (mazeSize / 2),r,0,Math.PI * 2);
                ctx.fill();
            }

            if(maze[my][mx] === 5){
                ctx.fillStyle = "#ff00ff";

                ctx.fillRect(
                cx - 0.4,
                cy - 0.4,
                mazeSize + 0.8,
                mazeSize + 0.8);

                ctx.fillStyle = "#000000";

                ctx.beginPath();
                ctx.arc(cx + (mazeSize / 2),cy + (mazeSize / 2),r,0,Math.PI * 2);
                ctx.fill();
            }
        }
    }
}

