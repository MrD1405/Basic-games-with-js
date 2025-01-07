const canvas=document.getElementById("canvas1");
const ctx=canvas.getContext('2d');

const CANVAS_WIDTH=window.innerWidth;
const CANVAS_HEIGHT=window.innerHeight;
console.log(CANVAS_WIDTH,CANVAS_HEIGHT)
let ravenInterval=500;
let timeToNextRaven=0;
let lastTime=0;

class Raven{
    constructor(){
        this.width=10;
        this.height=5;
        this.x=(canvas.width);
        this.y=Math.random()*(canvas.height-this.height);
        this.isToBeDeleted=false;
        this.directionX=Math.random()*5+0.5;
        this.directionY=Math.random()*5-2.5;
    }
    update(){
        this.x-=this.directionX;
       if(this.x <0-this.width)this.isToBeDeleted=true;
    }
    draw(){
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
};

let ravens=[];
function animate(timestamp){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    let deltatime=timestamp-lastTime;
    lastTime=timestamp;
    timeToNextRaven+=deltatime;
    if(timeToNextRaven>ravenInterval){
        ravens.push(new Raven());
        timeToNextRaven=0;
    }
    [...ravens].forEach(object=>object.update());
    [...ravens].forEach(object=>object.draw());
    ravens=ravens.filter(object=>!object.isToBeDeleted);
    
    requestAnimationFrame(animate);
}
animate(0);
