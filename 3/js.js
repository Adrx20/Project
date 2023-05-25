let cards = [
    {
     name: "php",
     img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/php-logo_1.png",
     id: 1,
    },
    {
     name: "css3",
     img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/css3-logo.png",
     id: 2
    },
    {
     name: "html5",
     img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/html5-logo.png",
     id: 3
    },
    {
     name: "jquery",
     img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/jquery-logo.png",
     id: 4
    },
    {
     name: "javascript",
     img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/js-logo.png",
     id: 5
    },
    {
     name: "node",
     img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/nodejs-logo.png",
     id: 6
    },
    {
     name: "photoshop",
     img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/photoshop-logo.png",
     id: 7
    },
    {
     name: "python",
     img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/python-logo.png",
     id: 8
    },
    {
     name: "rails",
     img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/rails-logo.png",
     id: 9
    },
    {
     name: "sass",
     img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/sass-logo.png",
     id: 10
    },
    {
     name: "sublime",
     img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/sublime-logo.png",
     id: 11
    },
    {
     name: "wordpress",
     img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/wordpress-logo.png",
     id: 12
    }
];

let timeStorage = localStorage;
let time;
let progres = 0;

if (timeStorage.getItem("timer") != null) {
    time = parseInt(timeStorage.getItem("timer"));
} else {
    time = 15;
    timeStorage.setItem("timer", time)
}

let firstCard = null;
let secondCard = null;
$(document).ready(function() {
    $("#progress").knob({
        'max': 12, // максимальне значення
        'step': 1, // крок змінення
        'angleOffset': 270, // зміщення кута початку, default = 0
        'angleArc': 180, // змінення кута всього поля, default = 360
        'readOnly': true, // змінення елементу вимкнено, default = false
        'rotation': 'clockwise', // направлення зростання (clockwise/anticlockwise)
        'thickness': 0.2, //    
        'lineCap': 'round', // вигляд "шапки", default = butt , round
        'width' : 250,
        'height' : 250,
        'displayInput' : true, // числове значення, default = true
        'displayPrevious' : false, // попереднє значення, default = false
        'fgColor' : 'green',
        'inputColor' : 'darkgreen',
        'bgColor' : 'lightgreen',
    });

    $(".timer").knob({ 
        'min': 0,
        'max': 300, // максимальне значення
        'angleOffset': 0, // зміщення кута початку, default = 0
        'angleArc': 360, // змінення кута всього поля, default = 360
        'readOnly': true, // змінення елементу вимкнено, default = false
        'thickness': 0.2, //    
        'lineCap': 'round', // вигляд "шапки", default = butt , round
        'width' : '100%' ,
        'displayInput' : true, // числове значення, default = true
        'fgColor' : 'green',
        'inputColor' : 'darkgreen',
        'bgColor' : 'lightgreen',
    });

    $(".info").hide();
    $(".next").hide();

    
    $(".block-1").click( function () {
        $(".info").slideToggle();
        if (count) {
            $(".block-1").text("Description g Ruleses ▲")
        } else {
            $(".block-1").text("Description g Ruleses ▼")
        }
        count =! count
    });

    $(".start").click(function () {
        $(".start").hide();
        $(".game-board").css("display", "grid")
        fillBoard();
        $(".card").on("click", cardClicked)
    })
})

function cardClicked(event) {
    if(secondCard || $(this).hasClass('matched')){
        return
    }

    if(!firstCard){
        firstCard = $(this);
        firstCard.addClass('flip');
        return
    }

    if(firstCard){
        secondCard = $(this);
        secondCard.addClass('flip');
        if(firstCard.attr('data-id') == secondCard.attr('data-id')){
            firstCard.addClass('matched');
            secondCard.addClass('matched');
            firstCard = null;
            secondCard = null;
            progres++;
            $('#progress').val(progres).trigger('change');

            if(progres==12) {
                win();
            } 
            return
        }
        else {
            setTimeout(function(){
                firstCard.removeClass('flip');
                secondCard.removeClass('flip');
                firstCard = null;
                secondCard = null;
            },600);
        }
    }
}

function shuffle(array){
    let counter = array.length; 
    let temp;
    let index;
    // Поки в масиві є елементи
    while (counter > 0) {
    // Виберіть випадковий індекс
    index = Math.floor(Math.random() * counter);
    // Зменшити лічильник на 1
    counter--;
    // І поміняйте з ним останній елемент
    temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
    }
    return array;
}

function fillBoard() {
    let board = shuffle([...cards, ...cards])
    for (let i=0; i < board.length; i++) {
        let cardHtml = 
        `<div class="card" data-id="${board[i].id}">
            <div class="front">
                CLICK
            </div>
            <div class="back" id="${board[i].name}">
                <img src="${board[i].img}" alt="${board[i].name}">
            </div>
        </div>`
        $(".game-board").append(cardHtml)
    }
}

function startTime () {
    setInterval(function (){
        time = parseInt(localStorage.getItem("timer")) - 1;
        $(".timer").val(time).trigger("change")
        if (time == 0) {
            alertify.error("Time ist out!")
            setTimeout(() => window.open("music.html", "_self", false), 2000);
            localStorage.removeItem("timer")
        } else if (time > 0) {
            localStorage.setItem("timer", time)
        }
    }, 1000)
}

function win() {
    $(".gmae-board").css({
        'display' : 'none'
    })
    $("#win").css({
        'display' : 'flex'
    })
    localStorage.removeItem("item")
}