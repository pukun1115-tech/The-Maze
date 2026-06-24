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
    requestAnimationFrame(loop);
}

function move(){
    const speed = 0.5;
    
    if(keys["w"]){
        player.pos.y += speed;
    }

    if(keys["s"]){
        player.pos.y -= speed;
    }

    if(keys["d"]){
        player.pos.x += speed;
    }

    if(keys["a"]){
        player.pos.x -= speed;
    }
}

function playerdraw(){
    ctx.fillStyle = "white";
    ctx.fillRect(((canvas.width) / 2) - (player.size / 2), ((canvas.height) / 2) - (player.size / 2), player.size, player.size);
}
