
//start only after the screen is loaded
window.addEventListener("load",function(){
const canvas=document.getElementById("canvas1");
const ctx=canvas.getContext('2d');
canvas.width=800;
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
        context.fillStyle='white';
        context.fillRect(this.x,this.y,this.width,this.height);
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
        }
        else{
            this.speedY+=this.gravity;
        }
        console.log(this.y);
        if(this.y > this.gameHeight-this.height)this.y=this.gameHeight-this.height;
        
    }
    onGround(){
        return this.y>=canvas.height-this.height;
    }

}

//handling background
class Background{}

//details of enemies
class Enemies{}

//interaction of enemies
//function handleEnemies{}

//status based on input
//function  displayStatusText{}

const input=new InputHandler();
const player=new Player(canvas.width,canvas.height);
//main animation loop frame
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    player.draw(ctx);
    player.update(input);
    // console.log(input.keys);
     requestAnimationFrame(animate);
    }
    animate();
});

