document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');

    // Array.from collects all divs and puts them in an Array
    let squares = Array.from(document.querySelectorAll('.grid div'));

    const scoreDisplay = document.querySelector('#score');

    const startBtn = document.querySelector('#start-button');
    // const startBtn = document.getElementById('#start-button');
    
    const width = 10;

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

    let current = allTetrominoes[getRandomTetrominoIndex()][currentRotation];


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

            //if there is another tetromino it's not valid to move left
            if(current.some(element => squares[currentPosition + element].classList.contains('taken'))){
                currentPosition -= 1;
            }
        }
        draw();
    }

    function getRandomTetrominoIndex(){
        return Math.floor(Math.random() * allTetrominoes.length);
    }

    // stop the tetromino if there is no space left
    function stopTetromino(){
        if(current.some(element => squares[currentPosition + element + width].classList.contains('taken'))){
            current.forEach(element => squares[currentPosition + element].classList.add('taken'));

            // if Tetromino stopped create a new one
            current = allTetrominoes[getRandomTetrominoIndex()][currentRotation];
            currentPosition = 4;
            draw();
        }
    }


    let timerId = setInterval(moveDown, 200);





})