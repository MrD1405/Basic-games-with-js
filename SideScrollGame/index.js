
//start only after the screen is loaded
window.addEventListener("load",function(){
const canvas=document.getElementById("canvas1");
const ctx=canvas.getContext('2d');
canvas.width=1667;
canvas.height=500;


let score=0;
let gameOver=false;
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
        this.spriteX=8;
        this.frameTime=0;
        this.fps=60;
        this.frameInterval=1000/this.fps;
        
    }
    draw(context){
        context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,
            this.width,this.height,this.x,this.y,this.width,this.height);
        

    }
    update(input,deltaTime,enemies){
        //horizontal movement
        enemies.forEach(enemy=>{
            const dx=(this.x+this.width/2)-(enemy.x+enemy.width/2);
            const dy=(this.y+this.height/2)-(enemy.y+enemy.height/2);
            const dist=Math.sqrt(dx*dx+dy*dy);
            if(dist<this.width/2+enemy.width/4){
                gameOver=true;
            }
        })



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

        //vertical movement
        this.y+=this.speedY;
        if(this.onGround()){
            this.speedY=0;
            this.frameY=0;
            this.spriteX=8;
        }
        else{
            this.speedY+=this.gravity;
            this.frameY=1;
            this.spriteX=6;
        }
        
        if(this.y > this.gameHeight-this.height)this.y=this.gameHeight-this.height;


        //spriteAnimation
        this.frameTime+=deltaTime;
        if(this.frameTime>this.frameInterval){
            (this.frameX>=this.spriteX)?this.frameX=0:this.frameX++;
            this.frameTime=0;
        }
        
    }
    onGround(){
        return this.y>=canvas.height-this.height;
    }

}


const player=new Player(canvas.width,canvas.height);
//handling background
class Background{
    constructor(gameWidth,gameHeight,image,speedModifier){
        this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;
        this.x=0;
        this.y=0;
        this.image=image;
        this.speed=10;
        this.width=1667;
        this.height=500;
        this.speedModifier=speedModifier;
    }
    update(){
        this.x-=this.speed*this.Modifier;
        
        if(this.x<= 0-this.width)this.x=0;
    }
    draw(context){
        context.drawImage(this.image,this.x,this.y,this.width,this.height);
        context.drawImage(this.image,this.x+this.width-(this.speed*this.speedModifier),this.y,this.width,this.height);
    }
}

//details of enemies
class Enemies{
    constructor(gameWidth,gameHeight){
        this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;
        this.spriteWidth=1215;
        this.spriteHeight=751;
        this.width=this.spriteWidth*0.25;
        this.height=this.spriteHeight*0.25;
        this.x=this.gameWidth;
        this.y=this.gameHeight-this.height;
        this.image=document.getElementById("enemy-img");
        this.speedX=5;
        this.frame=0;
        this.fps=15;
        this.frameInterval=1000/this.fps;
        this.frameTime=0;
        this.markedForDeletion=false;
        this.isStillDangerous=true;
    }
    draw(context){
        context.drawImage(this.image,this.frame*this.spriteWidth,0,this.spriteWidth,this.spriteHeight,
            this.x,this.y,this.width,this.height);

    }
    update(deltaTime){
        this.frameTime+=deltaTime;
        if(this.frameTime >= this.frameInterval){
            (this.frame>11)? this.frame=0 :this.frame++;
            this.frameTime=0;
        }
        if(this.x< 0-this.width){
            this.markedForDeletion=true;

        }
        if(this.x<player.x-this.width/2 && this.isStillDangerous){
            score++;
            this.isStillDangerous=false;
        }

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
        enemy.update(deltaTime);
        enemy.draw(ctx);
      
    })
    enemies=enemies.filter(enemy=> !enemy.markedForDeletion);
}

//status based on input
function  displayStatusText(context){
    context.fillStyle='white';
    context.font='40px sans-serif';
    context.fillText('Score: '+score,20,50);
    context.fillStyle='black';
    context.font='40px sans-serif';
    context.fillText('Score: '+score,20,52);
    if(gameOver){
        context.fillStyle='black';
        context.textAlign='center';
        context.font='40px sans-serif';
        context.fillText('Game Over!!!!',canvas.width/2-50,100);
        
        context.fillStyle='white';
        context.textAlign='center';
        context.font='40px sans-serif';
        context.fillText('Game Over!!!',canvas.width/2-50,102);

        context.fillStyle='black';
        context.textAlign='center';
        context.font='40px sans-serif';
        context.fillText('Double-click mouse to start again',canvas.width/2-50,150);

        context.fillStyle='white';
        context.textAlign='center';
        context.font='40px sans-serif';
        context.fillText('Double-click mouse to start again',canvas.width/2-50,152);
        
    }

}

//state variables of enemy
let enemyTimer=0;
let enemyInterval=1000;
let randomEnemyInterval=Math.random()*5000+500;


//deltatime
let lastTime=0;


const input=new InputHandler();

const img1=document.getElementById("background-img1");

const background1=new Background(canvas.width,canvas.height,img1,0.2);
const background2=new Background(canvas.width,canvas.height,document.getElementById("background-img2"),0.4);
const background3=new Background(canvas.width,canvas.height,document.getElementById("background-img3"),0.6);
const background4=new Background(canvas.width,canvas.height,document.getElementById("background-img4"),0.8);
const background5=new Background(canvas.width,canvas.height,document.getElementById("background-img5"),1);
//main animation loop frame
function animate(timestamp){
    const deltaTime=timestamp-lastTime;
    lastTime=timestamp;


    ctx.clearRect(0,0,canvas.width,canvas.height);


    background1.update();
    background1.draw(ctx);
    background2.update();
    background2.draw(ctx);
    background3.update();
    background3.draw(ctx);
    background4.update();
    background4.draw(ctx);
    background5.update();
    background5.draw(ctx);


    player.update(input,deltaTime,enemies);
    player.draw(ctx);
    handleEnemies(deltaTime);
    
    displayStatusText(ctx);
    
    if(!gameOver) requestAnimationFrame(animate);
    }
    animate(0);
    


});
window.addEventListener("dblclick",e=>{
    location.reload();
})



