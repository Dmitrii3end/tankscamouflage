import { ROENTGEN, ROENTGENCOLOR, MAXVISIBILITY, MAXVISIBILITYCOLOR, MAPSIZE, 
    MAXDISTANCE, MAXDISTANCECOLOR, MAXDISGUISE, TREEDISGUISE, DRYTREEDISGUISE } from "./const.js"
import Tank from "./tank.js";

const map = {
    width: 0, 
    height: 0,
    centerWidth: 0,
    centerHeight: 0,
    lineWidth: 1,
    lineColor: 'white',
    koef: 1,
    centerColor: 'white',
    centerRadius: 5,
    enemyColor: '#990000',
    enemySize: 16,

    isManyTree: true,
    isTreeAndDryTree: false,
    isTree: false,
    isDryTree: false,
    isClear: false,

    isMovieng: false,
    isAttack: false,
}

const mainTank = new Tank(522, 51.21, 9.22, 51.21, 9.22, true, true, false, true);
const enemyTank = new Tank();

const canvas = document.querySelector('#map');
const ctx = canvas.getContext("2d");

const addEventListeners = () =>{
    const addEventListener = (elementID, event, func) =>{
        document.querySelector(elementID).addEventListener(event, (e) => {
            func(e);
            drawUpdate();
        });
    }
    
    addEventListener('#mainTankVisibility', 'input', (e) => changeTankProperty(mainTank, 'visibility', e.target.value));
    addEventListener('#mainTankDisguise', 'input', (e) => changeTankProperty(mainTank, 'disguise', e.target.value));
    addEventListener('#mainTankDisguiseWithAttack', 'input', (e) => changeTankProperty(mainTank, 'disguiseWithAttack', e.target.value));
    addEventListener('#mainTankDisguiseWithMove', 'input', (e) => changeTankProperty(mainTank, 'disguiseWithMove', e.target.value));
    addEventListener('#mainTankDisguiseWithMoveAndAttack', 'input', (e) => changeTankProperty(mainTank, 'disguiseWithMoveAndAttack', e.target.value));

    addEventListener('#enemyTankVisibility', 'input', (e) => changeTankProperty(enemyTank, 'visibility', e.target.value));
    addEventListener('#enemyTankDisguise', 'input', (e) => changeTankProperty(enemyTank, 'disguise', e.target.value));
    addEventListener('#enemyTankDisguiseWithAttack', 'input', (e) => changeTankProperty(enemyTank, 'disguiseWithAttack', e.target.value));
    addEventListener('#enemyTankDisguiseWithMove', 'input', (e) => changeTankProperty(enemyTank, 'disguiseWithMove', e.target.value));
    addEventListener('#enemyTankDisguiseWithMoveAndAttack', 'input', (e) => changeTankProperty(enemyTank, 'disguiseWithMoveAndAttack', e.target.value));


    addEventListener('#manyTree', 'input', (e) => {
        dropMapDisguise();
        changeTankProperty(map, 'isManyTree', e.target.checked);
    });

    addEventListener('#treeAndDryTree', 'input', (e) => {
        dropMapDisguise();
        changeTankProperty(map, 'isTreeAndDryTree', e.target.checked);
    });

    addEventListener('#tree', 'input', (e) => {
        dropMapDisguise();
        changeTankProperty(map, 'isTree', e.target.checked);
    });

    addEventListener('#dryTree', 'input', (e) => {
        dropMapDisguise();
        changeTankProperty(map, 'isDryTree', e.target.checked);
    });

    addEventListener('#clear', 'input', (e) => {
        dropMapDisguise();
        changeTankProperty(map, 'isClear', e.target.checked);
    });


    addEventListener('#isNotMovieng', 'input', (e) => {
        changeTankProperty(map, 'isMovieng', false)
    });

    addEventListener('#isMovieng', 'input', (e) => {
        changeTankProperty(map, 'isMovieng', true)
    });


    addEventListener('#isNotAttack', 'input', (e) => {
        changeTankProperty(map, 'isAttack', false)
    });

    addEventListener('#isAttack', 'input', (e) => {
        changeTankProperty(map, 'isAttack', true)
    });


    addEventListener('#mainCommandersDevice', 'input', (e) => {
        changeTankProperty(mainTank, 'isHaveCommandersDevice', e.target.checked);
    });

    addEventListener('#enemyCommandersDevice', 'input', (e) => {
        changeTankProperty(enemyTank, 'isHaveCommandersDevice', e.target.checked);
    });


    addEventListener('#mainCommandersDeviceSlot', 'input', (e) => {
        changeTankProperty(mainTank, 'isCommandersDeviceInSlot', e.target.checked);
    });

    addEventListener('#enemyCommandersDeviceSlot', 'input', (e) => {
        changeTankProperty(enemyTank, 'isCommandersDeviceInSlot', e.target.checked);
    });


    addEventListener('#mainLeftModernization', 'input', (e) => {
        let checked = e.target.checked;

        if (checked){
            dropTankModernization(mainTank, 'left');
            document.querySelector('#mainRightModernization').checked = false;
        } else{
            dropTankModernization(mainTank);
        }
    });

    addEventListener('#mainRightModernization', 'input', (e) => {
        let checked = e.target.checked;
        
        
        if (checked){
            dropTankModernization(mainTank, 'right');
            document.querySelector('#mainLeftModernization').checked = false;
        } else{
            dropTankModernization(mainTank);
        }
    });

    addEventListener('#enemyLeftModernization', 'input', (e) => {
        let checked = e.target.checked;

        if (checked){
            dropTankModernization(enemyTank, 'left');
            document.querySelector('#enemyRightModernization').checked = false;
        } else{
            dropTankModernization(enemyTank);
        }
    });

    addEventListener('#enemyRightModernization', 'input', (e) => {
        let checked = e.target.checked;

        if (checked){
            dropTankModernization(enemyTank, 'right');
            document.querySelector('#enemyLeftModernization').checked = false;
        } else{
            dropTankModernization(enemyTank);
        }
    });
}

function dropTankModernization(tank, modernization){
    tank.isLeftModernization = false;
    tank.isRightModernization = false;

    if (modernization == 'left'){
        tank.isLeftModernization = true;
        
    } else if (modernization == 'right'){
        tank.isRightModernization = true;
        
    }
}

function showTanksProperty(){
    const inputValueUpdate = (inputID, value) =>{
        document.querySelector(inputID).value = value;
    }

    const inputCheckboxUpdate = (inputID, value) =>{
        document.querySelector(inputID).checked = value;
    }

    inputValueUpdate('#mainTankVisibility', mainTank.visibility);
    inputValueUpdate('#mainTankDisguise', mainTank.disguise);
    inputValueUpdate('#mainTankDisguiseWithAttack', mainTank.disguiseWithAttack);
    inputValueUpdate('#mainTankDisguiseWithMove', mainTank.disguiseWithMove);
    inputValueUpdate('#mainTankDisguiseWithMoveAndAttack', mainTank.disguiseWithMoveAndAttack);
    inputCheckboxUpdate('#mainCommandersDevice', mainTank.isHaveCommandersDevice);
    inputCheckboxUpdate('#mainCommandersDeviceSlot', mainTank.isCommandersDeviceInSlot);
    inputCheckboxUpdate('#mainLeftModernization', mainTank.isLeftModernization);
    inputCheckboxUpdate('#mainRightModernization', mainTank.isRightModernization);
    
    
    inputValueUpdate('#enemyTankVisibility', enemyTank.visibility);
    inputValueUpdate('#enemyTankDisguise', enemyTank.disguise);
    inputValueUpdate('#enemyTankDisguiseWithAttack', enemyTank.disguiseWithAttack);
    inputValueUpdate('#enemyTankDisguiseWithMove', enemyTank.disguiseWithMove);
    inputValueUpdate('#enemyTankDisguiseWithMoveAndAttack', enemyTank.disguiseWithMoveAndAttack);
    inputCheckboxUpdate('#enemyCommandersDevice', enemyTank.isHaveCommandersDevice);
    inputCheckboxUpdate('#enemyCommandersDeviceSlot', enemyTank.isCommandersDeviceInSlot);
    inputCheckboxUpdate('#enemyLeftModernization', enemyTank.isLeftModernization);
    inputCheckboxUpdate('#enemyRightModernization', enemyTank.isRightModernization);
}

function dropMapDisguise() {
    map.isManyTree = false;
    map.isTreeAndDryTree = false;
    map.isTree = false;
    map.isDryTree = false;
    map.isClear = false;
}

const init = () =>{
    addEventListeners();

    map.width = canvas.clientWidth;
    map.height = canvas.clientHeight;

    map.centerWidth = map.width / 2;
    map.centerHeight = map.height / 2;

    ctx.lineWidth = map.lineWidth;

    map.koef = MAPSIZE / map.width;

    drawUpdate();
    showTanksProperty();
};

init();

function changeTankProperty(tank, key, value){
    tank[key] = value? +value : 0;
}

function getEnemyXPos(){
    let mapDisguise = 0;
    
    let enemyDisguise = enemyTank.disguise;
    
    if (map.isMovieng){
        enemyDisguise = map.isAttack ? enemyTank.disguiseWithMoveAndAttack : enemyTank.disguiseWithMove;

        if (mainTank.isHaveCommandersDevice){
            enemyDisguise -= 10;

            if (mainTank.isCommandersDeviceInSlot){
                enemyDisguise -= 2.5;
            }
        }

        if (mainTank.isLeftModernization){
            enemyDisguise -= 2.62;
        } else if (mainTank.isRightModernization){
            enemyDisguise += 2.62;
        }
    } else{
        enemyDisguise = map.isAttack ? enemyTank.disguiseWithAttack : enemyTank.disguise;
    }

    if (enemyDisguise < 0){
        enemyDisguise = 0;
    }

    if (map.isManyTree){
        mapDisguise = MAXDISGUISE;
    } else if (map.isTreeAndDryTree){
        mapDisguise = TREEDISGUISE + DRYTREEDISGUISE;
    } else if (map.isTree){
        mapDisguise = TREEDISGUISE;
    } else if (map.isDryTree){
        mapDisguise = DRYTREEDISGUISE;
    }

    if (mapDisguise > 0){
        if (mainTank.isRightModernization){
            mapDisguise -= 2.4;
        } else if (mainTank.isLeftModernization){
            mapDisguise += 2.4;
        }

        if (mainTank.isHaveCommandersDevice){
            mapDisguise -= 15;
    
            if (mainTank.isCommandersDeviceInSlot){
                mapDisguise -= 5;
            }
        }

        if (mapDisguise < 0){
            mapDisguise = 0;
        }
    }

    let disguise = enemyDisguise + mapDisguise;

    let posX = mainTank.visibility - (mainTank.visibility - 50) * disguise / 100;

    if (posX < ROENTGEN){
        posX = ROENTGEN;
    }
    
    if (posX > MAXVISIBILITY){
        posX = MAXVISIBILITY;
    }

    return posX;
}


function drawUpdate(){
    ctx.clearRect(0, 0, map.width, map.height);
    
    drawCenter();
    drawRoentgenCircle();
    drawMaxVisibilityCircle();
    drawMaxDistanceCircle();

    let pos = getEnemyXPos();

    drawEnemyTank(pos);

    updateDistanceInfo(pos.toFixed(2));
}

function updateDistanceInfo(text = ''){
    document.querySelector('#distance').innerText = text;
}

function drawEnemyTank(position){
    ctx.fillStyle = map.enemyColor;
    ctx.fillRect(map.centerWidth + position / map.koef - map.enemySize / 2, map.centerHeight - map.enemySize / 2, map.enemySize, map.enemySize)
}

function drawCenter(){
    ctx.fillStyle = map.centerColor;
    ctx.beginPath();
    ctx.arc(map.centerWidth, map.centerHeight, map.centerRadius / map.koef, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
};

function drawRoentgenCircle(){
    ctx.strokeStyle = ROENTGENCOLOR;
    ctx.beginPath();
    ctx.arc(map.centerWidth, map.centerHeight, ROENTGEN / map.koef, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
};

function drawMaxVisibilityCircle(){
    ctx.strokeStyle = MAXVISIBILITYCOLOR;
    ctx.beginPath();
    ctx.arc(map.centerWidth, map.centerHeight, MAXVISIBILITY / map.koef, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
};

function drawMaxDistanceCircle(){
    ctx.strokeStyle = MAXDISTANCECOLOR;
    ctx.beginPath();
    ctx.arc(map.centerWidth, map.centerHeight, MAXDISTANCE / map.koef, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
};