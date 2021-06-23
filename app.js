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
    let current = allTetrominoes[0][0];

    console.log(allTetrominoes[0][0]);

    // draw first rotatino of lTetromino
    function draw(){
        current.forEach(element => {
            squares[currentPosition + element].classList.add('tetromino')
        });
    }

    draw();






})