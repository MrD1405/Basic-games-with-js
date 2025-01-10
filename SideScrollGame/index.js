
//start only after the screen is loaded
window.addEventListener("load",function(){
const canvas=document.getElementById("canvas1");
const ctx=canvas.getContext('2d');
canvas.width=1000;
canvas.height=720;
//handling input
class InputHandler{
    constructor(){
        this.keys=[];
        window.addEventListener("keydown",e =>{
            if(((e.key=="ArrowDown")||
            (e.key=="ArrowUp")||
            (e.key=="ArrowRight")||
            (e.key=="ArrowLeft"))
            && this.keys.indexOf(e.key)===-1){
                this.keys.push(e.key);
            }
        });
        window.addEventListener("keyup",e=>{
            if(((e.key=="ArrowDown")||
            (e.key=="ArrowUp")||
            (e.key=="ArrowRight")||
            (e.key=="ArrowLeft"))
            ){
                this.keys.splice(this.keys.indexOf(e.key),1);
            }
        });
    }
}

//handling player sprites
class Player{
    constructor(gameWidth,gameHeight){
        
        this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;
        this.speedX=0;
        this.speedY=0;
        this.image=document.getElementById("player-img");
        this.width=200;
        this.height=200;
        this.frameX=0;
        this.frameY=0;
        this.x=0;
        this.y=this.gameHeight-this.height;
        this.gravity=1;
        
    }
    draw(context){
       // context.fillStyle='white';
        //context.fillRect(this.x,this.y,this.width,this.height);
        context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,
            this.width,this.height,this.x,this.y,this.width,this.height);
        

    }
    update(input){
        //horizontal movement
        
        if(input.keys.indexOf('ArrowRight')>-1){
            this.speedX=5;
        }
        else if(input.keys.indexOf('ArrowLeft')>-1){
            this.speedX=-5;
        }
        else if((input.keys.indexOf('ArrowUp')> -1) && this.onGround()){
            this.speedY-=32;
        }
        else{
            this.speedX=0;
        }
        this.x+=this.speedX;
        if(this.x<0)this.x=0;
        if(this.x>canvas.width-this.width)this.x=canvas.width-this.width;
        this.y+=this.speedY;
        if(this.onGround()){
            this.speedY=0;
            this.frameY=0;
        }
        else{
            this.speedY+=this.gravity;
            this.frameY=1;
        }
        console.log(this.y);
        if(this.y > this.gameHeight-this.height)this.y=this.gameHeight-this.height;
        
    }
    onGround(){
        return this.y>=canvas.height-this.height;
    }

}

//handling background
class Background{
    constructor(gameWidth,gameHeight){
        this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;
        this.x=0;
        this.y=0;
        this.speed=7;
        this.width=2400;
        this.height=720;
        this.image=document.getElementById("background-img");
    }
    update(){
        this.x-=this.speed;
        if(this.x<=-this.width)this.x=0;
    }
    draw(context){
        context.drawImage(this.image,this.x,this.y,this.width,this.height);
        context.drawImage(this.image,this.x+this.width-this.speed,this.y,this.width,this.height);
    }
}

//details of enemies
class Enemies{
    constructor(gameWidth,gameHeight){
        this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;
        this.width=160;
        this.height=119;
        this.x=this.gameWidth;
        this.y=this.gameHeight-this.height;
        this.image=document.getElementById("enemy-img");
        this.speedX=5;
        this.frameX=0;
    }
    draw(context){
        context.drawImage(this.image,this.frameX*this.width,0,this.width,this.height,
            this.x,this.y,this.width,this.height);

    }
    update(){
        this.x-=this.speedX;
    }
}


let enemies=[];
//interaction of enemies
function handleEnemies(deltaTime){
    enemyTimer+=deltaTime;
    if(enemyTimer>=enemyInterval+randomEnemyInterval){
        enemies.push(new Enemies(canvas.width,canvas.height));
        randomEnemyInterval=Math.random()*5000+500;
        enemyTimer=0;
    }
    enemies.forEach(enemy=>{
        enemy.update();
        enemy.draw(ctx);
        console.log("hi");
    })
}

//status based on input
//function  displayStatusText(){}

//state variables of enemy
let enemyTimer=0;
let enemyInterval=1000;
let randomEnemyInterval=Math.random()*5000+500;


//deltatime
let lastTime=0;


const input=new InputHandler();
const player=new Player(canvas.width,canvas.height);
const background=new Background(canvas.width,canvas.height);
//main animation loop frame
function animate(timestamp){
    const deltaTime=timestamp-lastTime;
    lastTime=timestamp;


    ctx.clearRect(0,0,canvas.width,canvas.height);
    background.update();
    background.draw(ctx);
    player.update(input);
    player.draw(ctx);
    handleEnemies(deltaTime);
    // console.log(input.keys);
    
     requestAnimationFrame(animate);
    }
    animate(0);





});

