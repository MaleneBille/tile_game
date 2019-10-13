let canvas = document.getElementById("canvas").getContext('2d');
let map  = {
    gameMap: [
        [3, 1, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0], 
        [0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0],
        [0, 0, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0],
        [0, 0, 2, 0, 0, 2, 2, 0, 2, 2, 2, 0, 0, 0],
        [0, 2, 2, 0, 2, 2, 2, 0, 2, 1, 1, 0, 0, 0], 
        [0, 2, 2, 0, 2, 2, 2, 0, 2, 1, 1, 0, 0, 0],
        [0, 0, 2, 0, 0, 0, 2, 0, 2, 2, 2, 2, 2, 0],
        [1, 0, 0, 2, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0],
        [1, 1, 0, 2, 2, 0, 2, 2, 0, 0, 1, 1, 2, 0],
        [1, 1, 0, 0, 0, 0, 2, 2, 2, 1, 1, 1, 2, -1],
    ],
    tileSize: 50, 
}

let column = 0;
let row = 0;

let player = {
    x: 0,
    y: 0,
};

let time = 90;

let sound = new Audio('cow-moo.mp3');

//Load event
window.onload = function(){
    drawGame(map, canvas);
    countdown(time);
}

//Draw game
function drawGame(map, canvas)
{
    for (var column = 0; column < map.gameMap.length; column++) {
        for (var row = 0; row < map.gameMap[column].length; row++) {

            switch(map.gameMap[column][row]) {
            case -1:
                player.x = column;
                player.y = row;
                canvas.drawImage(playerImg, row*map.tileSize, column*map.tileSize, map.tileSize, map.tileSize);
                break;
            case 0:
                canvas.drawImage(img, row*map.tileSize, column*map.tileSize, map.tileSize, map.tileSize);
                break;
            case 1:
                canvas.drawImage(img1, row*map.tileSize, column*map.tileSize, map.tileSize, map.tileSize);
                break;
            case 2:
                canvas.drawImage(img2, row*map.tileSize, column*map.tileSize, map.tileSize, map.tileSize);
                break;
            case 3:
                canvas.drawImage(targetImg, row*map.tileSize, column*map.tileSize, map.tileSize, map.tileSize);
                break;
            }
        }
    }
}

// Assets
let img = new Image(); //grass
img.src='https://images.unsplash.com/photo-1498925008800-019c7d59d903?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60';

let img1 = new Image(); //Water
img1.src = "https://images.unsplash.com/photo-1476897017502-219c9169bd6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60";

let img2 = new Image(); // Hay
img2.src = "https://images.unsplash.com/photo-1467842976472-03f46c6b1e3d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60";

let playerImg = new Image(); // Player
playerImg.src = "https://p7.hiclipart.com/preview/192/35/607/cattle-cartoon-illustration-cartoon-cow.jpg";

let targetImg = new Image(); // Target
targetImg.src = "https://freepngimg.com/thumb/target/6-2-target-picture.png";

window.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
        case 37: //Key Left
            if(canWeMove(player.x, player.y - 1) === true) {
                // Old position
                map.gameMap[player.x][player.y] = 0

                // New position
                map.gameMap[player.x][player.y - 1] = -1;

                drawGame(map, canvas);
            } else {
                sound.play();
             }
            break;
        case 38: //Key Up
        if(canWeMove(player.x - 1, player.y) === true) {
            // Old position
            map.gameMap[player.x][player.y] = 0

            // New position
            map.gameMap[player.x - 1][player.y] = -1;

            drawGame(map, canvas);
        } else {
            sound.play();
         }
            break;
        case 39: //Key right
        if(canWeMove(player.x, player.y + 1) === true) {
            // Old position
            map.gameMap[player.x][player.y] = 0

            // New position
            map.gameMap[player.x][player.y + 1] = -1;

            drawGame(map, canvas);
        } else {
            sound.play();
         }
            break;
        case 40: //Key Down
        if(canWeMove(player.x + 1, player.y) === true) {
            // Old position
            map.gameMap[player.x][player.y] = 0

            // New position
            map.gameMap[player.x + 1][player.y] = -1;

            drawGame(map, canvas);
        } else {
            sound.play();
         }
            break;
        default:
            break;
    }
})

function canWeMove(x, y) {
    if (map.gameMap[x] || map.gameMap[y] !== undefined) {
        switch(map.gameMap[x][y]) {
        case -1:
        case 0:
            return true;
        case 3:
                new Audio('winner.mp3').play();
                if (window.confirm('Du vandt, hurra! Prøv igen?')) {
                    resetGame()
                }
            return true;
        default:
            return false;
        }
    } else {
        return false;
    }
}

function countdown(duration) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById('countdown').textContent = minutes + ":" + seconds;

    if (--timer < 0) {
        timer = duration;
    }   
    if(--timer === 0) {
        new Audio('loser.mp3').play();
        if (window.confirm('Du nåede det ikke. Prøv igen?')) {
            resetGame()
        }
    }
    
    }, 1000);
}

function resetGame() {
    location.reload(); 
}