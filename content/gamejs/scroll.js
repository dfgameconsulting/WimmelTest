let left = document.querySelector("#arrow-left");
let right = document.querySelector("#arrow-right");
let screens = document.querySelector("#screens");
let scrollin = false;

let pos = 0;
var sound03 = new Pizzicato.Sound("sound/woop.wav");
soundGroup.addSound(sound03)
right.onclick = () => {
  if (scrollin) return;
  scrollin = true;
  sound03.play();
  pos++;
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

// Inventar raus / rein
let switchInventory = document.querySelectorAll(".switchInventory");
let inventoryOut = true;
switchInventory.forEach((sw) => {
  sw.onclick = () => {
    inventoryOut = !inventoryOut;
    sound03.play();
    if (inventoryOut) {
      anime({
        targets: ".switchInventory",
        translate: ["50%","50%"],
        rotate: [-270, -90],
        // scale: [0.75,0.5],
        scale: 0.5,
        top: "-25%",
        duration: 500,
        easing: "easeOutSine",
      });
      anime({
        targets: ".inventory",
        bottom: 0,
        // opacity: [0, 1],
        duration: 500,
        easing: "easeOutSine",
      })
    } else {
      anime({
        targets: ".switchInventory",
        translate: ["50%","50%"],
        rotate: [-90, -270],  
        // scale: [0.5,0.75],
        scale: 0.5,
        top: "-50%",
        duration: 500,
        easing: "easeOutSine",
      });
      anime({
        targets: ".inventory",
        bottom: "-11vw",
        // opacity: [1, 0],
        duration: 500,
        easing: "easeOutSine",
      })
    }
   
    
 
  };
});