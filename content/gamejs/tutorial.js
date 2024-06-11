let question = document.querySelector("#question");
let tutWrapper = document.querySelector("#tutWrapper");
let tutAniRunning = false;

question.onclick = () => {
  if (tutAniRunning) {
    return;
  }
  tutAniRunning = true;
  if (tutWrapper.style.opacity == "1") {
    anime({
      targets: "#tutWrapper, #tutImg, #backgroundDark",
      opacity: [1, 0],
      duration: 500,
      easing: "easeInOutSine",
      complete: () => {
        tutAniRunning = false;
        tutWrapper.style.display = "none";
      },
    });
  } else {
    anime({
      begin: () => {
        tutWrapper.style.display = "block";
      },
      targets:  "#tutWrapper, #tutImg, #backgroundDark",
      opacity: [0, 1],
      duration: 500,
      easing: "easeInOutSine",
      complete: () => {
        tutAniRunning = false;
      },
    });
  }
};

// Tut Text
let welcomeText = document.querySelector("#welcome-text");
let weiterImg = document.querySelector("#weiter");
let introText = [
  "Willkommen in zynd-City! Ich bin Zynd-3-Rella, deine Reisebegleitung. Werfen wir mal einen Blick auf die Stadtkarte.",
  "Zynd-City hat vier Stadtteile. Jeder hat ein bestimmtes Thema. Klick auf einen Marker auf der Stadtkarte und du erfährst, worum es dort geht. Wenn du etwas gefunden hast, das dich interessiert, besuch diesen Stadtteil!",
  "In den Stadtteilen sind Objekte versteckt. Die Objekte haben alle was mit dem Thema des Stadtteils zu tun. Ihre Umrisse siehst du unten in der Leiste. Such die Gegend ab und klick die Gegenstände an, wenn du sie gefunden hast.",
  "Objekte, die du findest, sind meistens mit einem Eintrag im Glossar verknüpft. Der Eintrag beinhaltet weitere Informationen und Anlaufstellen. Immer wenn du ein Objekt findest, erhältst du eine kurze Information. Wenn dich das Thema interessiert, kannst du über das [i-Symbol] oben rechts ins Glossar wechseln und mehr darüber nachlesen. ",
  "Noch ein paar Hinweise: Du kannst dich mit den Pfeilen am Bildschirmrand nach links oder rechts bewegen, um dich in der Gegend umzusehen und weitere Objekte zu entdecken.",
  "Mit der Lupe über der Objektleiste kannst du an manchen Stellen näher heranzoomen und dir bestimmte Ecken noch genauer ansehen.",
  "Wenn du schon alles mehrfach abgesucht hast, du aber trotzdem nix findest, kann dir das Fragezeichen weiterhelfen: Dir wird ein Umkreis angezeigt, indem du das Objekt finden wirst. Noch Fragen? Nein? Dann los!",
];

let i = 0;
weiterImg.onclick = () => {
  if (i < introText.length - 1) {
    i++;
  } else {
    i = 0;
  }
  welcomeText.innerHTML = introText[i];
  switch (i) {
    case 1:
      document.querySelectorAll(".menu-levelcontainer").forEach((e, index) => {
        setTimeout(() => {
          e.classList.add("highlight");
        }, 300 * (index + 1));
      });
      break;
    case 2:
      document.querySelectorAll(".menu-levelcontainer").forEach((e, index) => {
        setTimeout(() => {
          e.classList.remove("highlight");
        }, 300 * (index + 1));
      });
      showTutorial(0);
      break;
    case 3:
      showTutorial(1);
      break;
    case 4:
      showTutorial(2);
      break;
    case 5:
      showTutorial(3);
      break;
    case 6:
      showTutorial(4);
      break;
    case 0:
      closeTutorial();
      break;
  }
};

const tutImg = document.querySelector("#tutImg");
const tutHintergrund = document.querySelector("#backgroundDark");
let tutBild1 = document.querySelector("#eins");
let tutBild2 = document.querySelector("#zwei");

function closeTutorial() {
    question.click();
    fadeOut("#tutImg");
    fadeOut("#backgroundDark");
    setTimeout(() => {
        tutHintergrund.style.display = "none";
        tutImg.style.display = "none";
        document.querySelectorAll(".menu-levelcontainer").forEach((e, index) => {
            setTimeout(() => {
              e.classList.add("highlight");
            }, 300 * (index + 1));
          });
    }, 500);
}
let zyd3rella = document.querySelector("#avatar img"); // `url(${loadedzynImages[0].src})`;
function showTutorial(step) {
  switch (step) {
    case 0:
      tutImg.style.display = "flex";
      fadeIn("#tutImg");
      tutHintergrund.style.display = "block";
      fadeIn("#backgroundDark");
      tutBild1.style.backgroundImage = "url(../img/objects/BIB001_Inventar_Testobjektgefunden_01_hz.png)";
      tutBild2.style.backgroundImage = "url(../img/tutorial/Leiste.png)";
      tutBild1.style.display = "block";
      tutBild2.style.display = "block";
      tutBild1.classList.remove("highlight4");
      tutBild1.classList.add("highlight2");
      fadeIn(tutBild1);
      fadeIn(tutBild2);
      zyd3rella.src = loadedzynImages[0].src;
      break;
    case 1:
      fadeOut(tutBild1);
      fadeOut(tutBild2);
      zyd3rella.src = loadedzynImages[1].src;
      setTimeout(() => {
        tutBild1.classList.remove("highlight2");
        tutBild1.style.backgroundImage = "url(../img/Glossar/GlossarButton/BIB001_GlossarButton_01_hz.png)";
        tutBild2.style.display = "none";
        tutBild1.classList.add("highlight4");
        fadeIn(tutBild1);
      }, 500);
      break;
    case 2:
      fadeOut(tutBild1);
      zyd3rella.src = loadedzynImages[2].src;
      setTimeout(() => {
        tutBild1.style.backgroundImage = "url(../img/options/BIB001_Wimmelbild_UmsehenPfeil_01_hz.png)";
        fadeIn(tutBild1);
      }, 500);
      break;
    case 3:
      fadeOut(tutBild1);
      zyd3rella.src = loadedzynImages[0].src;
      setTimeout(() => {
        tutBild1.style.backgroundImage = "url(../img/inventar/BIB001_Inventar_Lupe_01_hz.png)";
        fadeIn(tutBild1);
      }, 500);
      break;
    case 4:
      fadeOut(tutBild1);
      zyd3rella.src = loadedzynImages[5].src;
      setTimeout(() => {
        tutBild1.style.backgroundImage = "url(../img/inventar/BIB001_Inventar_Fragezeichen_01_hz.png)";
        fadeIn(tutBild1);
      }, 500);
      break;
  }
}

function fadeIn(selector) {
  anime({
    targets: selector,
    opacity: [0, 1],
    duration: 500,
    easing: "easeInOutSine",
  });
}
function fadeOut(selector) {
  anime({
    targets: selector,
    opacity: [1, 0],
    duration: 500,
    easing: "easeInOutSine",
  });
}

//Preload Tutorial Images
let loadedzynImages = [];
let zynImages = [
  "img/Zyn/Zyn-3-rella_Normal_Blinzeln.png", 
  "img/Zyn/Zyn-3-rella_GoodJob.png",
  "img/Zyn/Zyn-3-rella_Nachdenklich.png",
  "img/Zyn/Zyn-3-rella_Talking.png",
  "img/Zyn/Zyn-3-rella_Talking_Blinzeln.png",
  "img/Zyn/Zyn-3-rella_Normal_.png",
];
zynImages.forEach((e) => {
  let img = new Image();
  img.src = e;
  loadedzynImages.push(img);
});