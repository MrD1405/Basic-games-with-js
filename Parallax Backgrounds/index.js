const canvas=document.getElementById("canvas1");
const ctx=canvas.getContext("2d");
const CANVAS_WIDTH=canvas.width=800;
const CANVAS_HEIGHT=canvas.height=700;
let gameSpeed=5;

const backgroundlayer1=new Image();
backgroundlayer1.src='layer-1.png';
const backgroundlayer2=new Image();
backgroundlayer2.src='layer-2.png';
const backgroundlayer3=new Image();
backgroundlayer3.src='layer-3.png';
const backgroundlayer4=new Image();
backgroundlayer4.src='layer-4.png';
const backgroundlayer5=new Image();
backgroundlayer5.src='layer-5.png';

class Layer{
    constructor(image,speedModifier){
        this.image=image;
        this.x=0;
        this.y=0;
        this.width=2400;
        this.height=700;
        this.x2=this.width;
        this.speedModifier=speedModifier;
        this.speed=gameSpeed*speedModifier;
    }
    update(){
        if(this.x<=-this.width)this.x=this.width+this.x2-this.speed;
        if(this.x2<= -this.width)this.x2=this.width+this.x-this.speed;
        this.x-=this.speed;
        this.x2-=this.speed;
    }
    draw(){
        ctx.drawImage(this.image,this.x,this.y);
        ctx.drawImage(this.image,this.x2,this.y);
    }
}

const layer4=new Layer('layer-4.png',0.5);


function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    
    requestAnimationFrame(animate);
}
animate();


