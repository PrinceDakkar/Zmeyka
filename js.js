var canvas = document.getElementById('game');

 
// Классическая змейка — двухмерная, сделаем такую же

var context = canvas.getContext('2d');

//Размер клеточки - 16 пикселей.
var grid = 16;
//Переменная счет/скорость.
var count = 0;

// Сама змейка.
var snake = {
    x:160,
    y:160,
    // Скорость змеки = в каждом новом кадре змейка смещается по оси
    // X или Y. На старте будет двигаться горизонатльно, поэтому по игреку на старте 0.
    dx: grid,
    dy: 0,
    //Тащим хвост.
    cells: [],
    // Стартовая длина.
    maxCells: 4

};

var apple = {
    x: 320,
    y: 320
};

// Генератор случайных чисел в заданном диапазоне.
function getRandomInt(min, max){
    return Math.floor(Math.random()*(max - min)) + min;
}

// Основной игровой цикл
function loop(){
    //Замедление игры
    requestAnimationFrame(loop)
    
    if (++count < 4){
        return;
    }

    count = 0; // обнуление скорости
    
    context.clearRect(0,0, canvas.width, canvas.height);//очистка поля

    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0){
        snake.x = canvas.width - grid;
    }
    else if (snake.x >=canvas.width){
        snake.x = 0;
    }

    if (snake.y < 0){
        snake.y = canvas.height - grid;
    }
    else if (snake.y >= canvas.height){
        snake.y = 0;
    }

    // Массив где змейка. В начале координаты
    snake.cells.unshift({x: snake.x, y: snake.y});

    if (snake.cells.length > snake.maxCells){
        snake.cells.pop();
    }
    

    //рисуем еду
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid-1, grid-1,);

    // одно движение - один квадратик.
    context.fillStyle = 'green';

    // обрабатываем каждый элемент змейки
    snake.cells.forEach(function(cell, index){
        // Чтобы создать эффект клеточек, делаем зеленые квадры.
        context.fillRect(cell.x, cell.y, grid-1, grid-1);
        
        if (cell.x === apple.x && cell.y === apple.y){
            snake.maxCells++
            apple.x = getRandomInt(0,25) * grid;
            apple.y = getRandomInt(0,25) * grid;
        }

        for (var i = index+1; i < snake.cells.length; i++){

            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y){
                snake.x = 160;
                snake.y = 160;
                snake.cells = [];
                snake.maxCells = 4;
                snake.dx = grid;
                snake.dy = 0;
                apple.x = getRandomInt(0, 25) * grid;
                apple.y = getRandomInt(0, 25) * grid; 
            }
        }


    });
}

document.addEventListener('keydown', function(e) {
    if (e.which === 37  && snake.dx === 0){
        snake.dx = -grid;
        snake.dy = 0;
    }
    else if (e.which === 38 && snake.dy === 0) {

        snake.dy = -grid;
        snake.dx = 0;
    }
    else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }


});

requestAnimationFrame(loop);


       