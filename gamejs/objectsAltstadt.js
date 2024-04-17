const r = document.querySelector(":root");

const screen01 = document.querySelector("#screen01-image");
let screen01Pos = screen01.getBoundingClientRect();
let screen01Height = screen01Pos.bottom - screen01Pos.top;
let screen01Width = screen01Pos.right - screen01Pos.left;

const screen02 = document.querySelector("#screen02-image");
let screen02Pos = screen02.getBoundingClientRect();
let screen02Height = screen02Pos.bottom - screen02Pos.top;
let screen02Width = screen02Pos.right - screen02Pos.left;

const screen03 = document.querySelector("#screen03-image");
let screen03Pos = screen03.getBoundingClientRect();
let screen03Height = screen03Pos.bottom - screen03Pos.top;
let screen03Width = screen03Pos.right - screen03Pos.left;

const screen04 = document.querySelector("#screen04-image");
let screen04Pos = screen04.getBoundingClientRect();
let screen04Height = screen04Pos.bottom - screen04Pos.top;
let screen04Width = screen04Pos.right - screen04Pos.left;

// TEST Object
r.style.setProperty("--size", `${screen01Width * 0.055}px`);

let scaleFactor, scaleFactorObjects;

function resetRatios() {
  // Screens
  screen01Pos = screen01.getBoundingClientRect();
  screen01Height = screen01Pos.bottom - screen01Pos.top;
  screen01Width = screen01Pos.right - screen01Pos.left;
  screen02Pos = screen02.getBoundingClientRect();
  screen02Height = screen02Pos.bottom - screen02Pos.top;
  screen02Width = screen02Pos.right - screen02Pos.left;
  screen03Pos = screen03.getBoundingClientRect();
  screen03Height = screen03Pos.bottom - screen03Pos.top;
  screen03Width = screen03Pos.right - screen03Pos.left;
  screen04Pos = screen04.getBoundingClientRect();
  screen04Height = screen04Pos.bottom - screen04Pos.top;
  screen04Width = screen04Pos.right - screen04Pos.left;

  scaleFactor = Math.floor((screen01Pos.width + screen01Pos.height) / 2) / 2000;
  r.style.setProperty("--scaleFactor", `scale(${scaleFactor})`);
  r.style.setProperty("--scaleFactorObjects", `scale(${scaleFactor * 0.667})`);
  r.style.setProperty("--size", `${screen01Width * 0.055}px`); // 0.0309

  //Setze Objekte auf den Screen
  objects.forEach((element) => {
    let pos = element.place == "screen01" ? screen01Pos : element.place == "screen02" ? screen02Pos : element.place == "screen03" ? screen03Pos : screen04Pos;
    let width =
      element.place == "screen01" ? screen01Width : element.place == "screen02" ? screen02Width : element.place == "screen03" ? screen03Width : screen04Width;
    let height =
      element.place == "screen01"
        ? screen01Height
        : element.place == "screen02"
        ? screen02Height
        : element.place == "screen03"
        ? screen03Height
        : screen04Height;
    r.style.setProperty(`--${element.name}X`, `${pos.left + width * element.x}px`);
    r.style.setProperty(`--${element.name}Y`, `${pos.top + height * element.y}px`);
  });
  // Geheime Eingänge
  secrets.forEach((element) => {
    let pos = element.place == "screen01" ? screen01Pos : element.place == "screen02" ? screen02Pos : element.place == "screen03" ? screen03Pos : screen04Pos;
    let width =
      element.place == "screen01" ? screen01Width : element.place == "screen02" ? screen02Width : element.place == "screen03" ? screen03Width : screen04Width;
    let height =
      element.place == "screen01"
        ? screen01Height
        : element.place == "screen02"
        ? screen02Height
        : element.place == "screen03"
        ? screen03Height
        : screen04Height;
    r.style.setProperty(`--${element.name}X`, `${pos.left + width * element.x}px`);
    r.style.setProperty(`--${element.name}Y`, `${pos.top + height * element.y}px`);
  });
}

//Ratios berechnen
window.addEventListener("resize", resetRatios);

let objects = [];
let secrets = [];
let invCss = `
height: var(--inventorySize);
width: var(--inventorySize);
background-image: url(img/${this.invImg});
background-repeat: no-repeat;
background-position: center;
background-size: contain;
filter: brightness(0.1) sepia(1) opacity(0.3); 
`;

class pickObject {
  constructor(name, x, y, place, text, img, invImg) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.place = place;
    this.text = text;
    this.img = img;
    this.wasFound = false;
    this.invImg = invImg;

    this.imgProxy = new Image();
    this.imgProxy.src = "img/" + this.img;
    this.w = this.imgProxy.width;
    this.h = this.imgProxy.height;

    this.imgProxy.onload = () => {
      console.log('Image "' + this.name + '" loaded...' + " x: " + this.imgProxy.width + " y: " + this.imgProxy.height);
    };

    // Suchbild
    let div = document.createElement("div");
    div.id = this.name;
    div.className = "pickObject";
    document.getElementById(this.place).appendChild(div);

    let pos = this.place === "screen01" ? screen01Pos : this.place == "screen02" ? screen02Pos : this.place == "screen03" ? screen03Pos : screen04Pos;
    r.style.setProperty(`--${this.name}X`, `${pos.left + screen01Width * this.x}px`);
    r.style.setProperty(`--${this.name}Y`, `${pos.top + screen01Height * this.y}px`);
    document.getElementById(this.name).style.cssText = `
    position: absolute;
    width: ${this.w}px;
    height: ${this.h}px;
    left: var(--${this.name}X);
    top: var(--${this.name}Y); 
    transform-origin: 0% 0%;
    transform: translate(0%, 0%) var(--scaleFactorObjects);
    background-image: url(img/${this.img});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;`;
    // Inventory
    let divInventory = document.createElement("div");
    divInventory.id = this.name + "Inventory";
    divInventory.className = "inventoryObject";
    if (this.place === "screen01") {
      document.getElementById("inventory-wrapper01").appendChild(divInventory);
      document.getElementById(this.name + "Inventory").style.cssText = `
      height: var(--inventorySize);
      width: var(--inventorySize);
      background-image: url(img/${this.invImg});
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      filter: brightness(0.1) sepia(1) opacity(0.3); 
      `;
    } else if (this.place === "screen02") {
      document.getElementById("inventory-wrapper02").appendChild(divInventory);
      document.getElementById(this.name + "Inventory").style.cssText = `
height: var(--inventorySize);
width: var(--inventorySize);
background-image: url(img/${this.invImg});
background-repeat: no-repeat;
background-position: center;
background-size: contain;
filter: brightness(0.1) sepia(1) opacity(0.3); 
`;
    } else if (this.place === "screen03") {
      document.getElementById("inventory-wrapper03").appendChild(divInventory);
      document.getElementById(this.name + "Inventory").style.cssText = `
height: var(--inventorySize);
width: var(--inventorySize);
background-image: url(img/${this.invImg});
background-repeat: no-repeat;
background-position: center;
background-size: contain;
filter: brightness(0.1) sepia(1) opacity(0.3); 
`;
    } else if (this.place === "screen04") {
      document.getElementById("inventory-wrapper04").appendChild(divInventory);
      document.getElementById(this.name + "Inventory").style.cssText = `
height: var(--inventorySize);
width: var(--inventorySize);
background-image: url(img/${this.invImg});
background-repeat: no-repeat;
background-position: center;
background-size: contain;
filter: brightness(0.1) sepia(1) opacity(0.3); 
`;
    }
    div.onclick = () => {
      if (isRunning) return;
      anime({
        begin: () => {
          isRunning = true;
          this.wasFound = true;
          // GameManager!
          localStorage.setItem(this.name, "true");
          console.log(this.name + " was found");
          let tl = new anime.timeline();
          tl.add({
            begin: () => {
              document.querySelector('#foundInfo').innerHTML = this.name.replace(/_/g, ' ') + " gefunden!";
            },
            targets: "#options-info",
            opacity: [0, 1],
            duration: 500,
            easing: "easeInOutSine",
          }).add({
            duration: 1000,
          }).add({
            targets: "#options-info",
            opacity: [1, 0],
            duration: 500,
            easing: "easeInOutSine",
          })
          
        },
        targets: "#" + this.name,
        scale: [1.5, 1, 0.01],
        translate: "-33% -33%",
        transformOrigin: "50% 50%",
        easing: "linear",
        duration: 500,
        complete: () => {
          sound01.play();
          let index = objects.indexOf(this);
          objectCopy.push(...objects.splice(index, 1));
          console.log(objectCopy);
          document.getElementById(this.name).remove();
          isRunning = false;
          anime({
            targets: `#${this.name + "Inventory"}`,
            filter: ["brightness(0.1) sepia(1) opacity(0.3)", "brightness(1) sepia(0) opacity(1)"],
            scale: [0.9, 1.3, 1],
            easing: "easeInOutExpo",
            duration: 300,
            complete: () => {
              checkAllObjectsFound();
            },
          });
        },
      });
    };
    objects.push(this);
    console.log(this);
    console.log(" ...was created!")
  }
}

// Objekte checken
let objectCopy = [];

function checkAllObjectsFound() {
  let countedObjects01 = objectCopy.filter((element) => element.wasFound == true && element.place == "screen01");
  let countedObjects02 = objectCopy.filter((element) => element.wasFound == true && element.place == "screen02");
  let countedObjects03 = objectCopy.filter((element) => element.wasFound == true && element.place == "screen03");
  let countedObjects04 = objectCopy.filter((element) => element.wasFound == true && element.place == "screen04");

  if (countedObjects01.length >= 10) {
    sound04.play();
    objectCopy = objectCopy.filter((element) => element.place != "screen01");
    animateWin("#inventory-wrapper01");
  }
  if (countedObjects02.length >= 10) {
    sound04.play();
    objectCopy = objectCopy.filter((element) => element.place != "screen02");
    animateWin("#inventory-wrapper02");
  }
  if (countedObjects03.length >= 6) {
    sound04.play();
    objectCopy = objectCopy.filter((element) => element.place != "screen03");
    animateWin("#inventory-wrapper03");
  }
  if (countedObjects04.length >= 9) {
    sound04.play();
    objectCopy = objectCopy.filter((element) => element.place != "screen04");
    animateWin("#inventory-wrapper04");
  }
}

function animateWin(div) {
  anime({
    targets: div + " " + ".inventoryObject",
    scale: [
      { value: 0.1, easing: "easeOutSine", duration: 120 },
      { value: 1, easing: "easeInOutQuad", duration: 240 },
    ],
    delay: anime.stagger(120),
  });
}

let isRunning = false;
// let object01, object02, object03, object04, object05, object06, object07, object08, object09, object10, object11, object12, object13, object14, object15, object16, ;

window.onload = () => {
  let tl = new anime.timeline();
  tl.add({
    targets: "#start-titel",
    opacity: [0, 1],
    scale: [0.1, 1],
    duration: 500,
    easing: "easeInOutSine",
  })
    .add({
      duration: 100,
    })
    .add({
      begin: () => {
        startGame();
      },
      targets: "#start-screen",
      translateY: [0, "-100%"],
      duration: 500,
      easing: "easeInSine",
    });
  // startGame();
};

document.addEventListener("DOMContentLoaded", function() {
 
});

var sound01 = new Pizzicato.Sound("sound/VUMark_complete.mp3");
var sound02 = new Pizzicato.Sound("sound/Button_Normal.mp3");
var sound04 = new Pizzicato.Sound("sound/Sterne.mp3");

class hintCircleObject {
  constructor(name, x, y, place, img) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.place = place;
    this.img = img;
    let div = document.createElement("div");
    div.id = this.name;
    div.className = "hintCircle";
    document.getElementById(place).appendChild(div);
    let pos = this.place === "screen01" ? screen01Pos : this.place == "screen02" ? screen02Pos : this.place == "screen03" ? screen03Pos : screen04Pos;
    r.style.setProperty(`--${this.name}X`, `${pos.left + screen01Width * this.x}px`);
    r.style.setProperty(`--${this.name}Y`, `${pos.top + screen01Height * this.y}px`);
    document.getElementById(this.name).style.cssText = `
    position: absolute;
    width: var(--size);
    height: var(--size);
    left: var(--${this.name}X);
    top: var(--${this.name}Y); 
    background-image: url(img/objects/${this.img});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    transform: scale(7);
    opacity: 0;
    `;
    objects.push(this);
  }
}
let startGame = () => {
  blurAll();
  //sound05.play();                                                                                                      
  Aktienzeichen = new pickObject("Aktienzeichen", 0.452604, 0.063426, "screen01", "Das ist ein Aktienzeichen", "Altstadt/Bild_001/Objekte_imBild/Aktienzeichen.png" , "Altstadt/Bild_001/Objekte_Inventar/Aktienzeichen.png");
  Bankzeichen = new pickObject("Bankzeichen", 0.249740, 0.330093, "screen01", "Das ist eine Bankzeichen", "Altstadt/Bild_001/Objekte_imBild/Bankzeichen.png" , "Altstadt/Bild_001/Objekte_Inventar/Bankzeichen.png");
  Brieftasche = new pickObject("Brieftasche", 0.559115, 0.572685, "screen01", "Das ist eine Brieftasche", "Altstadt/Bild_001/Objekte_imBild/Brieftasche.png" , "Altstadt/Bild_001/Objekte_Inventar/Brieftasche.png");
  Hosentaschenmann = new pickObject("Hosentaschen_Mann", 0.559115, 0.572685, "screen01", "Das ist ein Hosentaschen Mann", "Altstadt/Bild_001/Objekte_imBild/HosentaschenMann.png" , "Altstadt/Bild_001/Objekte_Inventar/HosentaschenMann.png");
  Muenzhaufen = new pickObject("Münzhaufen", 0.453646, 0.319907, "screen01", "Das ist ein Münzhaufen", "Altstadt/Bild_001/Objekte_imBild/Muenzhaufen.png" , "Altstadt/Bild_001/Objekte_Inventar/Muenzhaufen.png");
  Sparkontoauszug = new pickObject("Sparkontoauszug", 0.469531, 0.896759, "screen01", "Das ist ein Sparkontoauszug", "Altstadt/Bild_001/Objekte_imBild/Sparkontoauszug.png" , "Altstadt/Bild_001/Objekte_Inventar/Sparkontoauszug.png");
  Sparschwein = new pickObject("Sparschwein", 0.747396, 0.603241, "screen01", "Das ist ein Sparschwein", "Altstadt/Bild_001/Objekte_imBild/Sparschwein.png" , "Altstadt/Bild_001/Objekte_Inventar/Sparschwein.png");
  Vertragspapiere = new pickObject("Vertragspapiere", 0.363021, 0.111111, "screen01", "Das sind Vertagspapiere", "Altstadt/Bild_001/Objekte_imBild/Vertragspapiere.png" , "Altstadt/Bild_001/Objekte_Inventar/Vertragspapiere.png");
  Waehrungszeichen = new pickObject ("Währungszeichen", 0.290625, 0.492593, "screen01", "Das ist ein Währungszeichen", "Altstadt/Bild_001/Objekte_imBild/Waehrungszeichen.png" , "Altstadt/Bild_001/Objekte_Inventar/Waehrungszeichen.png");
  Zeitung = new pickObject("Zeitung", 0.578646, 0.443519, "screen01", "Das ist eine Zeitung", "Altstadt/Bild_001/Objekte_imBild/Zeitung.png" , "Altstadt/Bild_001/Objekte_Inventar/Zeitung.png");

  Gewitterwolke = new pickObject("Gewitterwolke", 0.169010, 0.881019, "screen02", "Das ist eine Gewitterwolke", "Altstadt/Bild_002/Objekte_imBild/Gewitterwolke.png" , "Altstadt/Bild_002/Objekte_Inventar/Gewitterwolke.png");
  Hoergeraet = new pickObject("Hörgerät", 0.641927, 0.379630, "screen02", "Das ist ein Hörgerät", "Altstadt/Bild_002/Objekte_imBild/Hoergeraet.png" , "Altstadt/Bild_002/Objekte_Inventar/Hoergeraet.png");
  SchwangereFrau = new pickObject("Schwangere_Frau", 0.335156, 0.680093, "screen02", "Das ist eine schwangere Frau", "Altstadt/Bild_002/Objekte_imBild/SchwangereFrau.png" , "Altstadt/Bild_002/Objekte_Inventar/SchwangereFrau.png");
  //Waage = new pickObject("Waage", 0.832813, 0.200463, "screen02", "Das ist eine Waage", "Altstadt/Bild_002/Objekte_imBild/Waage.png" , "Altstadt/Bild_002/Objekte_Inventar/Waage.png");
  Gluehbirne = new pickObject("Glühbirne", 0.788802, 0.478704, "screen02", "Das ist eine Glühbirne", "Altstadt/Bild_002/Objekte_imBild/Gluehbirne.png" , "Altstadt/Bild_002/Objekte_Inventar/Gluehbirne.png");
  HandhaltenSchild = new pickObject("HandhaltenSchild", 0.140104, 0.676389, "screen02", "Das ist eine Hand, die ein Schild hält", "Altstadt/Bild_002/Objekte_imBild/HandhaltenSchild.png" , "Altstadt/Bild_002/Objekte_Inventar/HandhaltenSchild.png");
  Strassenschild = new pickObject("Straßenschild", 0.135937, 0.623148, "screen02", "Das ist ein Straßenschild", "Altstadt/Bild_002/Objekte_imBild/Strassenschild.png" , "Altstadt/Bild_002/Objekte_Inventar/Strassenschild.png");
  NachdenklicherMann = new pickObject("Nachdenklicher_Mann", 0.388281, 0.066667, "screen02", "Das ist ein nachdenklicher Mann", "Altstadt/Bild_002/Objekte_imBild/NachdenklicherMann.png" , "Altstadt/Bild_002/Objekte_Inventar/NachdenklicherMann.png");
  Paragraph = new pickObject("Paragraph", 0.528906, 0.532870, "screen02", "Das ist ein Paragraph", "Altstadt/Bild_002/Objekte_imBild/Paragraph.png" , "Altstadt/Bild_002/Objekte_Inventar/Paragraph.png");
  Woerterbuch = new pickObject("Wörterbuch", 0.580990, 0.224074, "screen02", "Das ist ein Wörterbuch", "Altstadt/Bild_002/Objekte_imBild/Woerterbuch.png" , "Altstadt/Bild_002/Objekte_Inventar/Woerterbuch.png");
  
  ErsteHilfe = new pickObject("Erste_Hilfe", 0.934115, 0.287037, "screen03", "Das ist eine Erste Hilfe Kasten", "Altstadt/Bild_003/Objekte_imBild/ErsteHilfe.png" , "Altstadt/Bild_003/Objekte_Inventar/ErsteHilfe.png");
  Flamme = new pickObject("Flamme", 0.800000, 0.271759, "screen03", "Das ist eine Flamme", "Altstadt/Bild_003/Objekte_imBild/Flamme.png" , "Altstadt/Bild_003/Objekte_Inventar/Flamme.png");
  Blindenzeichen = new pickObject("Blindenzeichen", 0.543229, 0.018981, "screen03", "Das ist ein Blindenzeichen", "Altstadt/Bild_003/Objekte_imBild/Blindenzeichen.png" , "Altstadt/Bild_003/Objekte_Inventar/Blindenzeichen.png");
  NassesBuch = new pickObject("Nasses_Buch", 0.358854, 0.811574, "screen03", "Das ist ein nasses Buch", "Altstadt/Bild_003/Objekte_imBild/NassesBuch.png" , "Altstadt/Bild_003/Objekte_Inventar/NassesBuch.png");
  Stethoskop = new pickObject("Stethoskop", 0.218229, 0.517130, "screen03", "Das ist ein Stethoskop", "Altstadt/Bild_003/Objekte_imBild/Stethoskop.png" , "Altstadt/Bild_003/Objekte_Inventar/Stethoskop.png");
  Haendedruck = new pickObject("Händedruck", 0.298438, 0.612963, "screen03", "Das ist ein Händedruck", "Altstadt/Bild_003/Objekte_imBild/Haendedruck.png" , "Altstadt/Bild_003/Objekte_Inventar/Haendedruck.png");
  Rollstuhl = new pickObject("Rollstuhl", 0.542188, 0.629167, "screen03", "Das ist ein Rollstuhl", "Altstadt/Bild_003/Objekte_imBild/Rollstuhl.png" , "Altstadt/Bild_003/Objekte_Inventar/Rollstuhl.png");
  Schild = new pickObject("Schild", 0.800781, 0.497222, "screen03", "Das ist ein Schild", "Altstadt/Bild_003/Objekte_imBild/Schild.png" , "Altstadt/Bild_003/Objekte_Inventar/Schild.png");
  UhrGraffiti = new pickObject("Uhr_Graffiti", 0.422917, 0.725926, "screen03", "Das ist eine Uhr mit Graffiti", "Altstadt/Bild_003/Objekte_imBild/UhrGraffiti.png" , "Altstadt/Bild_003/Objekte_imBild/UhrGraffiti.png");
  MonokelFrau = new pickObject("Monokel_Frau", 0.678385, 0.560648, "screen03", "Das ist eine Frau mit Monokel", "Altstadt/Bild_003/Objekte_imBild/MonokelFrau.png" , "Altstadt/Bild_003/Objekte_Inventar/MonokelFrau.png");

  RennenderMann = new pickObject("Rennender_Mann", 0.377865, 0.600000, "screen04", "Das ist ein rennender Mann", "Altstadt/Bild_004/Objekte_imBild/RennenderMann.png" , "Altstadt/Bild_004/Objekte_Inventar/RennenderMann.png");
  Buecher = new pickObject("Bücher", 0.481771, 0.349074, "screen04", "Das sind Bücher", "Altstadt/Bild_004/Objekte_imBild/Buecher.png" , "Altstadt/Bild_004/Objekte_Inventar/Buecher.png");
  Whiteboard = new pickObject("Whiteboard", 0.704427, 0.480556, "screen04", "Das ist ein Whiteboard", "Altstadt/Bild_004/Objekte_imBild/Whiteboard.png" , "Altstadt/Bild_004/Objekte_Inventar/Whiteboard.png");
  Ortsschild = new pickObject("Ortsschild", 0.839844, 0.575463, "screen04", "Das ist ein Ortsschild", "Altstadt/Bild_004/Objekte_imBild/Ortsschild.png" , "Altstadt/Bild_004/Objekte_Inventar/Ortsschild.png");
  Korb = new pickObject("Korb", 0.918750, 0.275463, "screen04", "Das ist ein Korb", "Altstadt/Bild_004/Objekte_imBild/Korb.png" , "Altstadt/Bild_004/Objekte_Inventar/Korb.png");
  Feuerwehrauto = new pickObject("Feuerwehrauto", 0.671354, 0.422685, "screen04", "Das ist ein Feuerwehrauto", "Altstadt/Bild_004/Objekte_imBild/Feuerwehrauto.png" , "Altstadt/Bild_004/Objekte_Inventar/Feuerwehrauto.png");
  Azubi = new pickObject("Azubi", 0.653125, 0.048148, "screen04", "Das ist ein Azubi", "Altstadt/Bild_004/Objekte_imBild/Azubi.png" , "Altstadt/Bild_004/Objekte_Inventar/Azubi.png");
  KaputtesAuto = new pickObject("Kaputtes_Auto", 0.562500, 0.590741, "screen04", "Das ist ein kaputtes Auto", "Altstadt/Bild_004/Objekte_imBild/KaputtesAuto.png" , "Altstadt/Bild_004/Objekte_Inventar/KaputtesAuto.png");
  Arbeitsagentur = new pickObject("Arbeitsagentur", 0.065365, 0.056481, "screen04", "Das ist eine Arbeitsagentur", "Altstadt/Bild_004/Objekte_imBild/Arbeitsagentur.png" , "Altstadt/Bild_004/Objekte_Inventar/Arbeitsagentur.png");
  Bushaltestelle = new pickObject("Bushaltestelle", 0.231250, 0.338889, "screen04", "Das ist eine Bushaltestelle", "Altstadt/Bild_004/Objekte_imBild/Bushaltestelle.png" , "Altstadt/Bild_004/Objekte_Inventar/Bushaltestelle.png");

  resetRatios();

  // Hint System
  let hints = document.querySelectorAll(".hint");

  let hintCoolDown = false;
  let allInventorys = document.querySelectorAll(".inventory");

  hints.forEach((hint) => {
    hint.onclick = (e) => {
      if (hintCoolDown) return;
      let screen = e.target.parentNode.parentNode.id; //Check welcher Bildschirm angeklickt wurde
      let filteredObjects = [];
      objects.forEach((object) => {
        // Bekomme alle Objekte des Bildschirms
        object.place === screen ? filteredObjects.push(object) : null;
      });
      if (filteredObjects.length < 1) {
        // Wenn keine Objekt mehr da gehe auf Pfeil
        let rnd = Math.random();
        let side = rnd > 0.5 ? "left" : "right";
        if (side === "left") {
          target = document.querySelector("#hintCircleLeft");
        } else {
          target = document.querySelector("#hintCircleRight");
        }
        anime({
          begin: () => {
            hintCoolDown = true;
            target.style.display = "block";
          },
          targets: target,
          opacity: [0, 1, 1, 1, 1, 0],
          easing: "easeInOutQuad",
          duration: 2000,
          complete: () => {
            target.style.display = "none";
            hintCoolDown = false;
          },
        });
      } else {
        hintCoolDown = true;
        allInventorys.forEach((inv) => {
          let div = document.createElement("div");
          div.className = "hint-bar";
          inv.appendChild(div);
        });
        // sonst such Dir eine Objekt aus und gehe da drauf
        let rand = Math.random() * filteredObjects.length;
        let randObject = filteredObjects[Math.floor(rand)];
        let offset = () => Math.random() * 0.033 - 0.0167;
        console.log("Rand:" + randObject.x);
        hintCircle01 = new hintCircleObject("hintCircle01", randObject.x + offset(), randObject.y + offset(), screen, "BIB001_Stadt_Hinweiskreis_01_hz.png");
        let randRot = Math.floor(Math.random() * 360);
        let leftRight = Math.random() > 0.5 ? -360 : 360;
        anime({
          targets: ".hintCircle",
          scale: [2, 4, 3],
          opacity: [0, 1, 1, 1, 1, 0],
          rotate: [randRot, randRot + leftRight],
          translateY: [0, -10, 0, 10],
          translateX: [10, 0, -10, 0],
          easing: "easeInOutQuad",
          duration: 5000,
        });
        setTimeout(() => {
          let index = objects.indexOf(hintCircle01);
          objects.splice(index, 1);
          document.getElementById("hintCircle01").remove();
        }, 5000);
        setTimeout(() => {
          hintCoolDown = false;
          removeElementsByClass("hint-bar");
        }, 15000);
      }
    };
  });
};


function removeElementsByClass(className) {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

