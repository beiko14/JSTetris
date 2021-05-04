document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');

    // Array.from collects all divs and puts them in an Array
    let squares = Array.from(document.querySelectorAll('.grid div'));

    const scoreDisplay = document.querySelector('#score');

    const startBtn = document.querySelector('#start-button');
    // const startBtn = document.getElementById('#start-button');
    
    const width = 10;

    console.log(squares);


})