let answer = [
    ["гаррі поттер", "гарри поттер","harry potter"],
    ["губка боб","sponge bob", "spongebob", "губка боб квадратные штаны", "губка боб квадратні штани"],
    ["пірати", "пірати карибского моря", "капитан джек горобець", "пираты","пираты карибского моря", "капитан джек воробей", "pirates of the caribbean"],
    ["сімпсони", "симпсоны","simpsons", "the simpsons"],
    ["зоряні війни", "звездные войны","star wars", "имперский марш", "імперский марш"],
    ["lion king","the lion king", "король лев", "симба", "сімба"],
    ["frozen","холодное сердце", "холодне серце", "эльза", "ельза"],
    ["shrek","шрек"],
    ["shrek","шрек"],
    ["rocky","рокки", "роккі"],
    ["индиана джонс","indiana jones"],
    ["один вдома", "один дома","home alone"],
    ["термінатор", "терминатор","terminator"],
    ["назад у майбутнє", "назад в будущее", "back to the future", "марти макфлай"],
    ["мисливці за привидами", "охотники за привидениями","ghost busters"]
];

let rand = Math.floor(1 + Math.random()*15);

let progres = 0;

let count = true

let timeStorage = localStorage;
let time;

if (timeStorage.getItem("timer") != null) {
    time = parseInt(timeStorage.getItem("timer"));
} else {
    time = 250;
    timeStorage.setItem("timer", time)
}

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
        'inputColor' : 'black',
        'bgColor' : 'grey',
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
        'inputColor' : 'black',
        'bgColor' : 'grey',
    });

    $(".info").hide();
    $(".next").hide();
    $(".sound").hide();
    $(".inp-text").hide();
    $(".inp-sub").hide();

    
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
        startRebus(rand);
        startTime();
        $(".start").hide();
        $(".sound").show();
        $(".inp-text").show();
        $(".inp-sub").show();
    })
    
    $(".inp-sub").click(function () {
        if (answer[rand-1].indexOf($(".inp-text").val().toLowerCase()) != -1) {
            console.log(rand)
            let old_rand = rand;
            progres++
            $("#progress").val(progres).trigger('change')
            while (true) {
                rand = Math.floor(1 + Math.random()*15);

                if(answer[rand-1].indexOf($(".inp-text").val().toLowerCase()) != "0") {
                    startRebus(rand)
                    break;
                }
            }
            if(old_rand == rand) {
                $("#melody").hide()
            }
            if (progres == 5) {
                $(".next").show()
                $("#melody").hide()
                $(".inp-text").hide()
                $(".inp-sub").hide()
            }
        }
        $(".inp-text").val("")
    })
})

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

function startRebus (arg) {
    $("#melody").attr("src",`sound/${arg}.mp3`)
};
