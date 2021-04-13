const deg = 6;
const hr = document.querySelector("#hr");
const mn = document.querySelector("#mn");
const sc = document.querySelector("#sc");

var hour1 = document.querySelector("#hou1");
var hour2 = document.querySelector("#hou2");
var min1 = document.querySelector("#min1");
var min2 = document.querySelector("#min2");

var timeoutHandler = null;

document.querySelectorAll('.input').forEach(element => {
    element.addEventListener('keyup', function(){
        this.value = this.value.replace(/[^\d]/g, '');
})
});

function getInputTime() {
    
    var h1 = hour1.value;
    var h2 = hour2.value;
    var m1 = min1.value;
    var m2 = min2.value;

    var hour = Number(h1 + h2);
    var minutes = Number(m1 + m2);

    if (hour >= 24) {
        alert("ERROR: Incorrect time");
        hour1.value = "0";
        hour2.value = "0";
        hour = 0;
        min1.value = "0";
        min2.value = "0";
        minutes = 0;
    }

    if (minutes >= 59) {
        alert("ERROR: Incorrect time");
        min1.value = "0";
        min2.value = "0";
        minutes = 0;
        hour1.value = "0";
        hour2.value = "0";
        hour = 0;
    }

    var date = new Date();

    return new Date(date.setHours(hour, minutes, 0));
}

function updateClock(date) {
    
    const hh = date.getHours() * 30;
    const mm = date.getMinutes() * deg;
    const ss = date.getSeconds() * deg;

    hr.style.transform = `rotateZ(${hh + mm / 12}deg)`;
    mn.style.transform = `rotateZ(${mm}deg)`;
    sc.style.transform = `rotateZ(${ss}deg)`;
}

function updateInput(date) {
    function updateHours() {
        if (date.getHours() < 10) {
            hour1.value = 0;
            hour2.value = date.getHours();
        } else {
            var arr = String(date.getHours()).split("");
            hour1.value = arr[0];
            hour2.value = arr[1];
        }
    }

    function updateMinutes() {
        if (date.getMinutes() < 10) {
            min1.value = 0;
            min2.value = date.getMinutes();
        } else {
            var arr = String(date.getMinutes()).split("");
            min1.value = arr[0];
            min2.value = arr[1];
        }
    }

    updateHours();
    updateMinutes();
}

function startTime(date) {
    updateClock(date);
    const updatedDate = new Date(date.getTime() + 1000);

    timeoutHandler = setTimeout(function () {
        if (
            updatedDate.getHours() !== date.getHours() ||
            updatedDate.getMinutes() !== date.getMinutes()
        ) {
            updateInput(updatedDate);
        }

        return startTime(updatedDate);
    }, 1000);

    return timeoutHandler;
}

function onInputChange() {
    if (timeoutHandler) {
        clearTimeout(timeoutHandler);
    }

    startTime(getInputTime());
}
