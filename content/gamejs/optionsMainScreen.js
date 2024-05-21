let options = document.querySelector("#options-volume"); 
let optionsBack = document.querySelector("#options-back img");

let targets = [ '#options-volume', '#options-glossar'];  

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
                    document.querySelector(e).style.pointerEvents = "none";
                });
            },
            targets: ['#menu-wrapper'],
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
            targets: ['#menu-wrapper'],
            filter: ['brightness(0.3)', 'brightness(1)'],
            duration: 500,
            easing: 'easeInOutSine',
        })
    }

}

options.addEventListener("click", optionsPanelClick);
optionsBack.addEventListener("click", optionsPanelClick);

let glossarOptions = document.querySelector("#options-glossar");
let glossarBack = document.querySelector("#glossar-back img");
let glossar = document.querySelector("#glossar");

let firstTime = false;
let glossarPanelClick = () => {
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
            targets: ['#menu-wrapper'],
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
            targets: ['#menu-wrapper'],
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


// const r = document.querySelector(":root");
// const startScreenBG = document.querySelector("#screen01-image");
// let screenPos = startScreenBG.getBoundingClientRect();
// let screenHeight = screenPos.bottom - screenPos.top;
// let screenWidth = screenPos.right - screenPos.left;

// function positionLevelStarts() {
//     screenPos = startScreenBG.getBoundingClientRect();
//     screenHeight = screenPos.bottom - screenPos.top;
//     screenWidth = screenPos.right - screenPos.left;
//     r.style.setProperty(`--${"level1"}X`, `${screenPos.left + screenWidth * 0.1}px`);
//     r.style.setProperty(`--${"level1"}Y`, `${screenPos.top + screenHeight * 0.1}px`);
//     console.log(screenPos.left + screenWidth * 0.1);
// }

// positionLevelStarts();

// window.onresize = positionLevelStarts;