let outerContainer = document.querySelector('.container');
let defaultGridSize = 16; 

outerContainer.addEventListener("mouseover", hoverOver); 

drawGrid(); 

function drawGrid(userSelection = defaultGridSize){
    let gridSize = userSelection ** 2; 
    outerContainer.innerHTML = ""; 

    outerContainer.style.gridTemplateColumns = `repeat(${userSelection}, 1fr)`;
    outerContainer.style.gridTemplateRows = `repeat(${userSelection}, 1fr)`;

    for(let i = 1; i <= gridSize; i++){
        outerContainer.appendChild(document.createElement("div")); 
    }
}

function hoverOver(event){
    if(event.target != outerContainer){
        event.target.style.backgroundColor = `rgba(0, 0, 0, ${getAlpha(event.target)}`;
    }
}

function getAlpha(element){
    let alphaTag = Number(window.getComputedStyle(element).backgroundColor.match(/[.?\d]+/g)[3]);

    if (alphaTag <= 1 ){
        return alphaTag += 0.1; 
    }
    return alphaTag
}

let resetButton = document.querySelector('#reset-sketchbook'); 
resetButton.addEventListener("click", resetSketchbook);

function resetSketchbook(){
    let newGridSize = requestGridSize(); 

    if (newGridSize === "cancel"){
        return; 
    }

    let gridChildren = getGridChildren(); 

    for (const child of gridChildren){
        child.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
    }

    let keepGridlines = gridChildren[0].classList.contains("add-gridlines"); 

    drawGrid(newGridSize); 
    adjustGrislines(keepGridlines);
}

function requestGridSize(){
    userSelection = prompt("how many rows would you like the sketchbook to have?");

    if(typeof Number(userSelection) === "number" && Number(userSelection) > 0){
        return Number(userSelection); 
    }else if(userSelection == null || userSelection === ''){
        return "cancel"; 
    }else{
        return requestGridSize(); 
    }
}

let gridlineButton = document.querySelector('#display-gridlines'); 
gridlineButton.addEventListener("click", adjustGrislines); 

function adjustGrislines(keepGridlines = true){
    let gridChildren = getGridChildren(); 

    if(gridChildren[0].classList.contains("add-gridlines") || !keepGridlines){
        for( const child of gridChildren){
            child.classList.remove("add-gridlines"); 
            gridlineButton.textContent = "Remove Gridlines"; 
        }
    }
}

function getGridChildren(){
    return document.querySelector('.container').children; 
}
