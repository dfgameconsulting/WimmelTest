let options = document.querySelector("#options-volume"); 
let volumeSlider = document.querySelector('#volume .slider')
let optionsBack = document.querySelector("#options-back img");

let targets = ['#screens','#arrow-left', '#arrow-right', '#options-volume', '#options-glossar' ,'.close-level'];  

let optionsPanelClick = () => {
    if (volume.style.display == 'none' || volume.style.display == '') {
        anime({
            begin: () => {
                volume.style.display = 'flex';
            },
            targets: '#volume',
            opacity: [0,1],
            duration: 500,
            easing: 'easeInOutSine',
        })
        anime({
            begin: () => {
                targets.forEach(e => {
                    console.log(e)
                    document.querySelector(e).style.pointerEvents = "none";
                });
            },
            targets: ['#screens','#menu-wrapper','#arrow-left', '#arrow-right'],
            filter: ['brightness(1)','brightness(0.3)'],
            duration: 500,
            easing: 'easeInOutSine',
        })
    } else {
        anime({
            complete: () => {
                volume.style.display = 'none';
            },
            targets: '#volume',
            opacity: [1,0],
            duration: 500,
            easing: 'easeInOutSine',
        })
        anime({
            begin: () => {
                targets.forEach(e => {
                    document.querySelector(e).style.pointerEvents = "all";
                });
            },
            targets: ['#screens','#menu-wrapper','#arrow-left', '#arrow-right'],
            filter: ['brightness(0.3)', 'brightness(1)'],
            duration: 500,
            easing: 'easeInOutSine',
        })
    }
}

options.addEventListener("click", optionsPanelClick);
optionsBack.addEventListener("click", optionsPanelClick);

function getVolume(){
    if(localStorage.getItem("volume") != null){
        volumeSlider.value = localStorage.getItem("volume")
        soundGroup.volume = localStorage.getItem("volume")/100

    }
}
getVolume()

function setVolume(value){
    localStorage.setItem("volume", value)
    console.log(soundGroup)
    soundGroup.volume = value/100
}

let glossarOptions = document.querySelector("#options-glossar");
let glossarBack = document.querySelector("#glossar-back img");
let glossar = document.querySelector("#glossar");

let firstTime = false;
let glossarPanelClick = () => {

    // Glossar LocalStorage

    // for (var i = 0; i < localStorage.length; i++){
    //     console.log('localStorage');
    //     console.log(localStorage.key(i) + " " +localStorage.getItem(localStorage.key(i)));
    // }


    if (glossar.style.display == 'none' || glossar.style.display == '') {
        anime({
            begin: () => {
                glossar.style.display = 'block';
            },
            targets: '#glossar',
            opacity: [0,1],
            duration: 500,
            easing: 'easeInOutSine',
        })
        anime({
            begin: () => {
                targets.forEach(e => {
                    document.querySelector(e).style.pointerEvents = "none";
                });
            },
            targets: ['#screens','#menu-wrapper','#arrow-left', '#arrow-right'],
            filter: ['brightness(1)','brightness(0.3)'],
            duration: 500,
            easing: 'easeInOutSine',
        })
    } else {
        anime({
            complete: () => {
                glossar.style.display = 'none';
            },
            targets: '#glossar',
            opacity: [1,0],
            duration: 500,
            easing: 'easeInOutSine',
        })
        anime({
            begin: () => {
                targets.forEach(e => {
                    document.querySelector(e).style.pointerEvents = "all";
                });
            },
            targets: ['#screens','#menu-wrapper','#arrow-left', '#arrow-right'],
            filter: ['brightness(0.3)', 'brightness(1)'],
            duration: 500,
            easing: 'easeInOutSine',
        })
    }
    // Lade erste Seite
    if (!firstTime) {
        firstTime = true;
        document.querySelector('#studium').click();
        //document.querySelector('#unter-kat').firstChild.click();
    }
}

glossarOptions.addEventListener("click", glossarPanelClick);
glossarBack.addEventListener("click", glossarPanelClick);
