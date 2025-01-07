/** @type {HTMLCanvasElement}*/

const canvas=document.getElementById("canvas1");
const ctx=canvas.getContext('2d');
const CANVAS_HEIGHT=canvas.height=500;
const CANVAS_WIDTH=canvas.width=1000;

let gameFrame=0;
let gameSpeed=10;
const ExplosionImg= new Image();
ExplosionImg.src='boom.png';
class Explosion{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.width=;
        this.height=;
        this.spriteWidth=this.width*0.5;
        this.spritHeight=this.height*0.8;
        this.frame=0;

    }
    update() {
        if(gameFrame%gameSpeed === 0){
            frame= (frame>4)?0: this.frame++;
        }
    }
    draw(){
        ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        canvas.drawImage(ExplosionImg,this.frame*this.width,0,this.width,this.height,this.x,this.y,
            this.spriteWidth,this.spritHeight);
        

    }

}
let ExplosionArray=[];
window.addEventListener('click',(e)=>{
    ExplosionArray.push(new Explosion(e.target.x.e.target.y));
    animate();
})
function animate(){
    ExplosionArray.forEach((explosion)=>{
        explosion.update();
        explosion.draw();
    })
    gameFrame++;
    requestAnimationFrame(animate);
}
