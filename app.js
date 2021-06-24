document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');

    // Array.from collects all divs and puts them in an Array
    let squares = Array.from(document.querySelectorAll('.grid div'));

    const scoreDisplay = document.querySelector('#score');

    const startBtn = document.querySelector('#start-button');
    // const startBtn = document.getElementById('#start-button');
    
    const width = 10;



    const miniGrid = document.querySelector(".mini-grid");
    const miniGridSquares = document.querySelectorAll(".mini-grid div");
    const miniGridWidth = 4;
    let miniGridIndex = 0;
    let nextRandom = 0;

    const nextTetromino = [
        [miniGridWidth, miniGridWidth + 1, miniGridWidth + 2, miniGridWidth * 2 + 2], // lTetromino
        [0, miniGridWidth, miniGridWidth + 1, miniGridWidth * 2 + 1], // Z
        [0, miniGridWidth, miniGridWidth * 2, miniGridWidth + 1], // T
        [0, miniGridWidth, 1, miniGridWidth + 1], // Q
        [0, 1, 2, 3] // i
    ]

    function showNextTetromino(){
        miniGridSquares.forEach(element => {
            //remove all tetrominoes from the div, so there is space to show the next one
            element.classList.remove("tetromino");
        })
        nextTetromino[nextRandom].forEach(element => {
            //show the next Tetromino at the mini-grid
            miniGridSquares[miniGridIndex + element].classList.add("tetromino");
        })
    }




    console.log(squares);


    //      0 2   1 2   2 2
    //
    //      0 1   1 1   2 1
    //
    //      0 0   1 0   2 0
    //
    //      width is x-axis
    //
    // Tetrominoes
    const lTetromino = [
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [0, width, width + 1, width + 2],
        [1, 0, width, width * 2]
    ]

    const zTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [2, 1, width + 1, width],
        [0, width, width + 1, width * 2 + 1],
        [2, 1, width + 1, width]
    ]

    const tTetromino = [
        [0, width, width * 2, width + 1],
        [0, 1, 2, width + 1],
        [1, width + 1, width * 2 + 1, width],
        [1, width, width + 1, width + 2]
    ]

    const qTetromino = [
        [0, width, 1, width + 1],
        [0, width, 1, width + 1],
        [0, width, 1, width + 1],
        [0, width, 1, width + 1]
    ]

    const iTetromino = [
        [0, 1, 2, 3],
        [0, width, width * 2, width * 3],
        [0, 1, 2, 3],
        [0, width, width * 2, width * 3]
    ]


    const allTetrominoes = [lTetromino, zTetromino, tTetromino, qTetromino, iTetromino];

    let currentPosition = 4;
    let currentRotation = 0;

    var randomTetromino = getRandomTetrominoIndex();

    let current = allTetrominoes[randomTetromino][currentRotation];

    // keyCodes
    function control(e){
        if(e.keyCode === 37){
            moveLeft();
        } else if(e.keyCode === 39){
            moveRight();
        } else if(e.keyCode === 38){
            rotate();
        } else if(e.keyCode === 40){
            moveDown();
        }
    }

    document.addEventListener("keyup", control);


    // draw a tetromino
    function draw(){
        current.forEach(element => {
            squares[currentPosition + element].classList.add('tetromino');
        });
    }

    // undraw a tetromino
    function undraw(){
        current.forEach(element => {
            squares[currentPosition + element].classList.remove('tetromino');
        });
    }

    // move the tetromino
    function moveDown(){
        undraw();
        currentPosition += width;
        draw();
        stopTetromino();
    }

    // move left, if valid option
    function moveLeft(){
        undraw();
        let isAtLeftEdge = current.some(element => (currentPosition + element) % width === 0)
        if(!isAtLeftEdge){

            // & if there is NOT another tetromino to the left, move it left
            if(!current.some(element => squares[currentPosition + element].classList.contains('taken'))){
                currentPosition -= 1;
            }
        }
        draw();
    }

    // move right, if valid option
    function moveRight(){
        undraw();
        let isAtRightEdge = current.some(element => (currentPosition + element + 1) % width === 0)
        if(!isAtRightEdge){

            // & if there is NOT another tetromino to the right, move it right
            if(!current.some(element => squares[currentPosition + element].classList.contains('taken'))){
                currentPosition += 1;
            }
        }
        draw();
    }

    function rotate(){
        undraw();
        if(currentRotation < 3){
            currentRotation++;
        } else{
            currentRotation = 0;
        }
        current = allTetrominoes[randomTetromino][currentRotation];
        draw();
    }

    function getRandomTetrominoIndex(){
        //randomTetromino = Math.floor(Math.random() * allTetrominoes.length);
        return Math.floor(Math.random() * allTetrominoes.length);
    }

    // stop the tetromino if there is no space left
    function stopTetromino(){
        if(current.some(element => squares[currentPosition + element + width].classList.contains('taken'))){
            current.forEach(element => squares[currentPosition + element].classList.add('taken'));

            // if Tetromino stopped create a new one
            randomTetromino = nextRandom;
            nextRandom = getRandomTetrominoIndex();
            current = allTetrominoes[randomTetromino][currentRotation];
            currentPosition = 4;
            draw();
            showNextTetromino();
        }
    }


    let timerId = 0;

    startBtn.addEventListener("click", function(){
        if(timerId > 0){
            console.log(timerId);
            clearInterval(timerId);
            timerId = 0;
        } else{
            console.log(timerId);
            draw();
            timerId = setInterval(moveDown, 1000);
            nextRandom = getRandomTetrominoIndex();
            showNextTetromino();
        }
    })







})