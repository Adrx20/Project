let answer = ["яблоко","груша","город","школа","сайт","браузер","плагин","цвет","стиль","язык","узор","сорока"];

let rand = Math.floor(1 + Math.random()*12);

let progres = 0;

let count = true



// if ($(".inp-text").val() != `${answer[rand-1]}`) {
//     $(".skip").show()
//     $(".skip").click(function () {
//         rand = Math.floor(1 + Math.random()*12);
//         if (alt_rand != rand) {
//             startRebus(rand)    
//             $(".skip").hide()
//         }
//     })
// }

$(document).ready(function() {
    $(".info").hide();
    $(".next").hide();
    $(".skip").hide();

    
    $(".block-1").click( function () {
        $(".info").slideToggle();
        if (count) {
            $(".block-1").text("Description g Ruleses ▲")
        } else {
            $(".block-1").text("Description g Ruleses ▼")
        }
        count =! count
    });
    
    $(".inp-sub").click(function () { 
        if ($(".inp-text").val() == `${answer[rand-1]}`) {
            answer[rand-1] = "0";
            let old_rand = rand;
            progres++
            $("#progress").val(progres).trigger('change')
            while (true) {
                rand = Math.floor(1 + Math.random()*12);

                if(answer[rand-1] != "0") {
                    startRebus(rand)
                    break;
                }
            }
            if(old_rand == rand) {
                $("#picture").hide()
            }
            if (progres == 5) {
                $(".next").show()
                $("#picture").hide()
                $(".inp-text").hide()
                $(".inp-sub").hide()
            }
        }
        $(".inp-text").val("")
    })

    startRebus(rand);

    
    $(function() {
        $("#progress").knob({
            'max': 5, // максимальне значення
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
    });
    
})



function startRebus (arg) {
    $("#picture").attr("src",`rebuses/${arg}.jpg`)
};