/**@type {HTMLCanvasElement} */
//tells VSCode on what type of stuff i am working on

const canvas=document.getElementById('canvas1');
const ctx=canvas.getContext('2d');

const CANVAS_HEIGHT=canvas.height=1000;
const CANVAS_WIDTH=canvas.width=500;
const numberOfEnemies=100;
let enemyArray=[];
let gameFrame=0;
let enemyDetails=[];

class Enemy{
    constructor(image){
        this.x=Math.random()*canvas.width;
        this.y=Math.random()*canvas.height;
        this.image=image;
        this.spriteWidth=293;
        this.spriteHeight=155;
        this.width=this.spriteWidth/2.5;
        this.height=this.spriteHeight/3;
        this.speed=Math.random()*4-2;
        this.frame=0;
        this.flapSpeed=Math.floor(Math.random()*2+1);

    }
    update(){
        this.x+=this.speed;
        this.y+=this.speed;
        if(gameFrame % this.flapSpeed===0){
            this.frame> 4 ? this.frame = 0 : this.frame++;
        }

    }
    draw(){
        
        ctx.drawImage(this.image,this.frame*this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height);
    }
}
const batImage=new Image();
batImage.src='enemy1.png'
for(let i=0;i<100;i++){
    enemyArray.push(new Enemy(batImage));
}
function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    enemyArray.forEach((enemy)=>{
        enemy.update();
        enemy.draw();
    })
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();