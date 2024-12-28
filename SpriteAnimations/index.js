
let playerState='idle';
const dropdown=document.getElementById("dropdown");
dropdown.addEventListener('change',function(e){
    playerState=e.target.value;
})
const canvas=document.getElementById("canvas1");
const ctx=canvas.getContext("2d");
const CANVAS_WIDTH=canvas.width=600;
const CANVAS_HEIGHT=canvas.height=600;

const playerImage=new Image();
playerImage.src='shadow_dog.png';
const SpriteWidth=575;
const SpriteHeight=523;

let gameFrame=0;
const staggerFrames=4;
let animationState=[
    {
        name:"idle",
        frames:7,
    },
    {
        name:"jump",
        frames:7,
    },
    {
        name:"fall",
        frames:7,
    },
    {
        name:"run",
        frames:9,
    },
    {
        name:"dizzy",
        frames:11,
    },
    {
        name:"sit",
        frames:5,
    },
    {
        name:"roll",
        frames:7,
    },
    {
        name:"bite",
        frames:7,
    },
    {
        name:"getHit",
        frames:11,
    }

];
let spriteAnimations=[];

animationState.forEach((state,index)=>{
    let frames={
        loc:[],
    };
    for(let i=0;i<state.frames;i++){
       let  positionX=i*SpriteWidth;
        let positionY=index*SpriteHeight;
        frames.loc.push({x:positionX,y:positionY});
    }
    spriteAnimations[state.name]=frames;
    

})

function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    let position= Math.floor(gameFrame/staggerFrames)%(spriteAnimations[playerState].loc.length);
    let frameX=spriteAnimations[playerState].loc[position].x;
    let frameY=spriteAnimations[playerState].loc[position].y;
    ctx.drawImage(playerImage,(frameX),(frameY),SpriteWidth,SpriteHeight,0,0,SpriteWidth,SpriteHeight);
    gameFrame++;
    requestAnimationFrame(animate);
}
const selectValue=document.getElementById("dropdown");

animate();
