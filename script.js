
let timerObj = {
    minutes:0,
    seconds:0,
    timerId:0
}


function soundAlarm(){
    let amount=5;
    let audio= new Audio("Timer_Sound_Effect.mp3");
    function playsound(){
        audio.pause();
        audio.currentTime=0;
        audio.play();
    }
    for (let i = 0; i < amount; i++) {
        setTimeout(playsound,1200*i);
    }

}

function updateValue(key, value){
    if(value < 0){
        value = 0;
        console.log("Positive Numbers Only");
    }
    if(key == "seconds"){
        if(value<10){
            value="0" + value;
        }
        if(value>59){value=59;}
    }
    $("#" + key).html(value || 0);
    timerObj[key]=value;
}

(function detectChanges(key) {

    let input= "#" + key + "-input";

    $(input).change( function(){
        updateValue(key,$(input).val());
    });

    $(input).keyup(function(){
        updateValue(key,$(input).val());
    });
    return arguments.callee;
})("minutes")("seconds");

function startTimer(){
    freezeInputs();
    buttonManager(["start",false],["pause",true],["stop",true]);
    timerObj.timerId=setInterval(function(){
        timerObj.seconds--;
        if(timerObj.seconds<0){
            if(timerObj.minutes==0){
                soundAlarm();
                return stopTimer();
            }
            timerObj.minutes--;
            timerObj.seconds=59;
        }
        updateValue("minutes",timerObj.minutes);
        updateValue("seconds",timerObj.seconds);
    },1000);

}

function stopTimer() {
    clearInterval(timerObj.timerId);
    buttonManager(["start",true],["pause",false],["stop",false]);
    unfreezeInputs();
    updateValue("minutes",$("#minutes-input").val());
    updateValue("seconds",$("#seconds-input").val());
}

function pauseTimer(){
    clearInterval(timerObj.timerId);
    buttonManager(["start",true],["pause",false],["stop",true]);

}

function buttonManager(...buttonsArray){

    for (let i = 0; i < buttonsArray.length; i++) {

        let button= "#"+buttonsArray[i][0]+"-button";
        if (buttonsArray[i][1]) {
            $( button).removeAttr("disabled");


        }
        else{$(button).attr("disabled","disabled")}

    }



    }

function freezeInputs(){
    $("#minutes-input").attr("disabled","disabled");
    $("#seconds-input").attr("disabled","disabled");

}

function unfreezeInputs(){
    $("#minutes-input").removeAttr("disabled");
    $("#seconds-input").removeAttr("disabled");

}
