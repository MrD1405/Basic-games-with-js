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


const speedOftheGame=document.getElementById('slider');
speedOftheGame.value=gameSpeed;
const showGameSpeed=document.getElementById('showGameSpeed');
showGameSpeed.innerHTML=gameSpeed;
speedOftheGame.addEventListener('change',(e)=>{
    gameSpeed=e.target.value;
    showGameSpeed.innerHTML=gameSpeed;
});

class Layer{
    constructor(image,speedModifier){
        this.image=image;
        this.x=0;
        this.y=0;
        this.width=2400;
        this.height=700;
        this.speedModifier=speedModifier;
        this.speed=gameSpeed*speedModifier;
    }
    update(){
        this.speed=gameSpeed*this.speedModifier;
        if(this.x<=-this.width)this.x=0;
        this.x-=this.speed;
    }
    draw(){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        ctx.drawImage(this.image,this.x+this.width,this.y,this.width,this.height);
    }
}

const layer1=new Layer(backgroundlayer1,0.2);
const layer2=new Layer(backgroundlayer2,0.4);
const layer3=new Layer(backgroundlayer3,0.6);
const layer4=new Layer(backgroundlayer4,0.8);
const layer5=new Layer(backgroundlayer5,1);

let gameObjects=[layer1,layer2,layer3,layer4,layer5];

function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    gameObjects.forEach((layer)=>{
        layer.update();
        layer.draw();
    })
    requestAnimationFrame(animate);
}
animate();


