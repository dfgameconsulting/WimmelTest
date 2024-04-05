let left = document.querySelector("#arrow-left");
let right = document.querySelector("#arrow-right");
let screens = document.querySelector("#screens");
let scrollin = false;

let pos = 0;
var sound03 = new Pizzicato.Sound("sound/269308__kwahmah_02__swoosh02.wav");
right.onclick = () => {
  if (scrollin) return;
  scrollin = true;
  sound03.play();
  pos++;
  console.log("Screen: " + pos);
  if (pos > 3) {
    pos = 0;
    anime({
      begin: () => {
        blurAll();
      },
      targets: "#screen01, #screen02, #screen03, #screen04",
      translateX: "0%",

      easing: "easeOutInQuad",
      duration: 500,
      complete: () => {
        resetRatios();
        scrollin = false;
      },
    });
    return;
  }
  anime({
    begin: () => {
      blurAll();
    },
    targets: "#screen01, #screen02, #screen03, #screen04",
    translateX: `-=100%`,
    easing: "easeOutInQuad",
    duration: 500,
    complete: () => {
      resetRatios();
      scrollin = false;
    },
  });
  
  // document.querySelector("#screens").style.transform = `translateX(${pos}%)`;
};
left.onclick = () => {
  if (scrollin) return;
  sound03.play();
  scrollin = true;
  pos--;
  if (pos < 0) {
    pos = 3;
    anime({
      begin: () => {
        blurAll();
      },
      targets: "#screen01, #screen02, #screen03, #screen04",
      translateX: "-300%",

      easing: "easeOutInQuad",
      duration: 500,
      complete: () => {
        resetRatios();
        scrollin = false;
      },
    });
    return;
  }
  anime({
    begin: () => {
      blurAll();
    },
    targets: "#screen01, #screen02, #screen03, #screen04",
    translateX: "+=100%",
    easing: "easeOutInQuad",
    duration: 500,
    complete: () => {
      resetRatios();
      scrollin = false;
    },
  });
  console.log("Screen: " + pos);
  // document.querySelector("#screens").style.transform = `translateX(${pos}%)`;
};

let blurAll = () => {
  let tlScroll = anime.timeline();
  tlScroll
    .add({
      targets: "#screens",
      filter: ["blur(32px)"],
      easing: "easeInSine",
      duration: 400,
    })
    .add({
      targets: "#screens",
      filter: ["blur(0px)"],
      easing: "easeOutSine",
      duration: 200,
    });
};

let shiftDivsUp = () => {
  var screensParent = document.getElementById("screens");
  // Finde das letzte Kind-Element
  var lastChild = screensParent.lastElementChild;

  // Finde das erste Kind-Element
  var firstChild = screensParent.firstElementChild;

  // Verschiebe das letzte Kind-Element vor das erste Kind-Element
  screensParent.insertBefore(lastChild, firstChild);
};
