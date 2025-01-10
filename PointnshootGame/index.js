const canvas=document.getElementById("canvas1");
const ctx=canvas.getContext('2d');

const CANVAS_WIDTH=window.innerWidth;
const CANVAS_HEIGHT=window.innerHeight;
console.log(CANVAS_WIDTH,CANVAS_HEIGHT)
let BlueBatInterval=500;
let timeToNextBlueBat=0;
let lastTime=0;
let gameFrame=0;
class BlueBat{
    constructor(){
        this.image=new Image();
        this.image.src='raven.png';
        this.spriteWidth=271;
        this.spriteHeight=194;
        this.width=this.spriteWidth*0.1;
        this.height=this.spriteHeight*0.1;
        this.x=(canvas.width);
        this.y=Math.random()*(canvas.height-this.height);
        this.isToBeDeleted=false;
        this.directionX=Math.random()*5+0.5;
        this.directionY=Math.random()*5-2.5;
        this.frame=0;
        this.speed=10;
    }
    update(){
        this.x-=this.directionX;
       if(this.x <0-this.width)this.isToBeDeleted=true;
       
       this.frame++;
       if(this.frame>5)this.frame=0;
    }
    draw(){
        
        ctx.drawImage(this.image,this.frame*this.spriteWidth,0,this.spriteWidth,this.spriteHeight,
            this.x,this.y,this.width,this.height)

    }
};

let blueBats=[];
function animate(timestamp){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    gameFrame++;
    let deltatime=timestamp-lastTime;
    lastTime=timestamp;
    timeToNextBlueBat+=deltatime;
    if(timeToNextBlueBat>BlueBatInterval){
        blueBats.push(new BlueBat());
        timeToNextBlueBat=0;
    }
    [...blueBats].forEach(object=>object.update());
    [...blueBats].forEach(object=>object.draw());
    blueBats=blueBats.filter(object=>!object.isToBeDeleted);
    
    requestAnimationFrame(animate);
}
animate(0);
