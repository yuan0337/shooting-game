var gun;
var bullet = [];
var player;      
var score=0;
var time = 0;
var GameTime;
var canShootTime;
var canshoot = true;     //定義變數

function startGame() {        //讓遊戲開始的函式
    myGameArea.start();
    
    gun = new component(100, 100, "gun.png", 5, 255,"image");   //建立槍
    player = new component(150, 150, "player.png", 800, 200, "image");  //建立玩家
    window.addEventListener("keydown", function(e) {
    if(e.code == "Space" && canshoot) {       //判斷是否可以發射子彈
        bullet.push(new component(40, 40, "bullet.png", gun.x + 100, gun.y + 5,"image"));   //建立子彈
        bullet[bullet.length - 1].speedX = 8;   //設定子彈的速度
        canshoot = false;
        canShootTime = time + 30;     //設定每槍至少間隔0.3秒才能射擊
        
    }
    
    })
   
    
    document.getElementById("score").innerHTML = "your score: " + score;   //顯示分數
}

var myGameArea = {    //定義遊戲區域
    canvas : document.createElement("canvas"),    //建立canvas
    SpaceKey : false ,
    ArrowUpKey : false ,
    ArrowDownKey : false ,
    ArrowLeftKey : false ,
    ArrowRightKey : false ,
    KeyW : false ,
    KeyS : false ,        //預設各個按鍵為false
    canshoot : true,      
    
    start : function() {       //遊戲的初始設定
        this.canvas.width = 960;
        this.canvas.height = 540;
        this.context = this.canvas.getContext("2d");
        
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 10);   //設定canvas
        window.addEventListener('keydown', function (e) {  //判斷按下鍵盤時的按鍵
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
        window.addEventListener('keyup', function (e) {    //判斷放開的按鍵
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
    clear : function() {    //由於canvas是一張畫布，所以要做出動態效果就必須不斷更新畫布
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {   //遊戲結束的函式
        clearInterval(this.interval);
    },
    
    
    
    
}
function component(width, height, color, x, y, type) {    //建立物件的函式
    this.type = type;
    if (type == "image" ){
        this.image = new Image();
        this.image.src = color;
    }

    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;     //設定物件的長寬高位置速度
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
    this.newPos = function(){   //物件下一張畫布位置的函式
        this.x += this.speedX;
        this.y += this.speedY;
        
    }
    
}
function updateGameArea() {   //更新畫布
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
            if (bullet[i].x > 930 && bullet[i].x < 940 && player.x > 500 && player.x <= 800)  {   //判斷得分情況
                score++;
                document.getElementById("score").innerHTML = "your score: " + score;
                
            }
            else if (bullet[i].x > 930 && bullet[i].x < 940 && player.x > 300 && player.x <= 500) {   //判斷得分情況
                score+=2;
                document.getElementById("score").innerHTML = "your score: " + score;
            }
            else if (bullet[i].x > 930 && bullet[i].x < 940 && player.x >= 98 && player.x <= 300) {  //判斷得分情況
                score+=3;
                document.getElementById("score").innerHTML = "your score: " + score;
            } 
            if (bullet[i].x <= player.x + 44 && bullet[i].x >= player.x + 36 && bullet[i].y > player.y+24 && bullet[i].y < player.y+88 ) {      //判斷槍獲勝的情況
                document.getElementById("result").innerHTML = "gun win!!!";
                myGameArea.stop();     //槍獲勝遊戲結束
            }
            
            
        }
        time++;     //此canvas的更新頻率為100Hz因此更新一次為10ms
        GameTime = 30-(time-time%100)/100;    //計算遊戲時間
        document.getElementById("time").innerHTML = "time: " + GameTime;    //顯示遊戲時間
        
        if (time == 3000 || score >= 20 ) {    //判斷人獲勝的情況
            document.getElementById("result").innerHTML = "human win!!!";
            myGameArea.stop();    //人獲勝遊戲結束
        }
        

        if (myGameArea.ArrowUpKey) {    //控制人往上移動
            if(player.y <= -26){
                player.speedY = 0;
            }
            else{
                player.speedY = -3;
            }
        }
        if (myGameArea.ArrowDownKey) {   //控制人往下移動
            if(player.y >= 400) {
                player.speedY = 0;
            }
            else{
                player.speedY = 3;
            }
        }
        if (myGameArea.ArrowRightKey) {   //控制人往右移動
            if(player.x >= 800) {
                player.speedX = 0;
            }
            else {
                player.speedX = 3;
            }
        }
        if (myGameArea.ArrowLeftKey) {  //控制人往左移動
            if(player.x <= 100) {
                player.speedX = 0;
            }
            else {
                player.speedX = -3;
            }
        }
        if (myGameArea.KeyW) {  //控制槍往上移動
            if(gun.y <= 3) {
                gun.speedY = 0;
            }
            else {
                gun.speedY = -2;
            }
        }
        if (myGameArea.KeyS) {  //控制槍往下移動
            if(gun.y >= 430) {
                gun.speedY = 0;
            }
            else {
                gun.speedY = 2;
            }
        }
        if (time >= canShootTime) {   //判斷可以射擊的情況
            canshoot = true;
        }
        
            
            
        
    }
    
