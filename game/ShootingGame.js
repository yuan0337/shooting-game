var gun;
var score=0;
var bullet = [];
var player;

function startGame() {
    myGameArea.start();
    gun = new component(100, 100, "gun.png", 5, 255,"image");   //x max: 930    y max:510
    player = new component(150, 150, "player.png", 800, 200, "image");   //x max: 800     y max:400
    window.addEventListener("keydown", function(e) {
    if(e.code == "Space") {
        bullet.push(new component(40, 40, "bullet.png", gun.x + 100, gun.y + 5,"image"));bullet[bullet.length - 1].speedX = 5;
    }
    })
    
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    SpaceKey : false ,
    ArrowUpKey : false ,
    ArrowDownKey : false ,
    ArrowLeftKey : false ,
    ArrowRightKey : false ,
    KeyW : false ,
    KeyS : false ,
    
    
    start : function() {
        this.canvas.width = 960;
        this.canvas.height = 540;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 10);
        window.addEventListener('keydown', function (e) {
            if(e.code == "ArrowUp") {
                myGameArea.ArrowUpKey = true;
            }
            if(e.code == "ArrowDown") {
                myGameArea.ArrowDownKey = true;
            }
            if(e.code == "ArrowLeft") {
                myGameArea.ArrowLeftKey = true;
            }
            if(e.code == "ArrowRight") {
                myGameArea.ArrowRightKey = true;
            }
            if(e.code == "KeyW") {
                myGameArea.KeyW = true;
            }
            if(e.code == "KeyS") {
                myGameArea.KeyS= true;
            }
            if(e.code == "Space") {
                myGameArea.SpaceKey = true;
            }
        })
        window.addEventListener('keyup', function (e) {
            if(e.code == "ArrowUp") {
                myGameArea.ArrowUpKey = false;
            }
            if(e.code == "ArrowDown") {
                myGameArea.ArrowDownKey = false;
            }
            if(e.code == "ArrowLeft") {
                myGameArea.ArrowLeftKey = false;
            }
            if(e.code == "ArrowRight") {
                myGameArea.ArrowRightKey = false;
            }
            if(e.code == "KeyW") {
                myGameArea.KeyW = false;
            }
            if(e.code == "KeyS") {
                myGameArea.KeyS= false;
            }
            if(e.code == "Space") {
                myGameArea.SpaceKey = false;
            }
        })
    }, 
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    
    
}
function component(width, height, color, x, y, type) {
    if (type == "image"){
        this.image = new Image();
        this.image.src = color;
    }

    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.update = function(){
    ctx = myGameArea.context;
    if (type == "image") {
        ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height);
        } 
        else {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
    
}
function updateGameArea() {
        myGameArea.clear();
        gun.newPos();
        gun.update();
        gun.speedX = 0;
        gun.speedY = 0;
        player.newPos();
        player.update();
        player.speedX = 0;
        player.speedY = 0;
        for(i = 0; i < bullet.length; i++) {
            bullet[i].update();
            bullet[i].newPos();
            
        }
        
        
        if (myGameArea.ArrowUpKey) {if(player.y <= -26){player.speedY = 0;}else{player.speedY = -2;}}
        if (myGameArea.ArrowDownKey) {if(player.y >= 400){player.speedY = 0;}else{player.speedY = 2;}}
        if (myGameArea.ArrowRightKey) {if(player.x >= 800){player.speedX = 0;}else{player.speedX = 2;}}
        if (myGameArea.ArrowLeftKey) {if(player.x <= 100){player.speedX = 0;}else{player.speedX = -2;}}
        if (myGameArea.KeyW) {if(gun.y <= 3){gun.speedY = 0;}else{gun.speedY = -2;}}
        if (myGameArea.KeyS) {if(gun.y >= 430){gun.speedY = 0;}else{gun.speedY = 2;}}
        if (myGameArea.SpaceKey) {bullet.speedX = 1;}
        for(i = 0; i < bullet.length; i++) {
            if (bullet[i].x > 930){
                score ++;
                document.getElementById("score").innerHTML = "your score: " + score;
            }
            
        }
    }
    







function moveup(){
    gun.speedY --;
}


function movedown(){
    gun.speedY ++;
}