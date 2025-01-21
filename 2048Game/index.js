import Grid from "./Grid.js";
import Tile from "./Tile.js";
const gridElement=document.getElementById("game-board");

const grid=new Grid(gridElement);
console.log(grid.randomEmptyCell());
grid.randomEmptyCell().tile=new Tile(gridElement);
grid.randomEmptyCell().tile=new Tile(gridElement);


function setupInput(){
    window.addEventListener("keydown",handleInput,{once:true});
}
function handleInput(e){
    console.log(e.key)
    switch (e.key){
    case 'ArrowUp':
        moveUp();
        break;
    case 'ArrowDown':
        moveDown();
        break;
    case 'ArrowRight':
        moveRight();
        break;
    case 'ArrowLeft':
        moveLeft();
        break;
    default:
        setupInput();
        break;
    }



    setupInput();

}
setupInput();

console.log(grid.cellsByColumn);
function moveUp(){
    
   //return  slideTiles(grid.cellsByColumn);
    
}

function slideTiles(cells){
    cells.forEach(group => {
        for(let i=1;i<group.length;i++){
            const cell=group[i];
            let lastValidCell;
            for(let j=i-1;j>=0;j--){
                const moveToCell=group[j];
                if(!moveToCell.canAccept(cell.tile))break;
                lastValidCell=group[j];
            }
            if(lastValidCell!=null){
                if(lastValidCell.tile!=null){
                    lastValidCell.mergeTile=cell.tile;
                }
                else{
                    lastValidCell.tile=cell.tile;
                    
                }
                cell.tile=null;
            }
        }
    });
}