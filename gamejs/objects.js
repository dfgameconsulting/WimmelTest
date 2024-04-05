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

class pickObject {
  constructor(name, x, y, place, text, img) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.place = place;
    this.text = text;
    this.img = img;
    this.wasFound = false;

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
    background-image: url(img/${this.img});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    filter: brightness(0.1) sepia(1) opacity(0.3); 
    `; //  blur(3px)
    } else if (this.place === "screen02") {
      document.getElementById("inventory-wrapper02").appendChild(divInventory);
      document.getElementById(this.name + "Inventory").style.cssText = `
    height: var(--inventorySize);
    width: var(--inventorySize);
    background-image: url(img/${this.img});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    filter: brightness(0.1) sepia(1) opacity(0.3); 
    `; // blur(3px)
    } else if (this.place === "screen03") {
      document.getElementById("inventory-wrapper03").appendChild(divInventory);
      document.getElementById(this.name + "Inventory").style.cssText = `
    height: var(--inventorySize);
    width: var(--inventorySize);
    background-image: url(img/${this.img});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    filter: brightness(0.1) sepia(1) opacity(0.3); 
    `; //blur(3px)
    } else if (this.place === "screen04") {
      document.getElementById("inventory-wrapper04").appendChild(divInventory);
      document.getElementById(this.name + "Inventory").style.cssText = `
    height: var(--inventorySize);
    width: var(--inventorySize);
    background-image: url(img/${this.img});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    filter: brightness(0.1) sepia(1) opacity(0.3); 
    `; //blur(3px)
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
  if (countedObjects02.length >= 15) {
    sound04.play();
    objectCopy = objectCopy.filter((element) => element.place != "screen02");
    animateWin("#inventory-wrapper02");
  }
  if (countedObjects03.length >= 15) {
    sound04.play();
    objectCopy = objectCopy.filter((element) => element.place != "screen03");
    animateWin("#inventory-wrapper03");
  }
  if (countedObjects04.length >= 15) {
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
  object01 = new pickObject("Bar", 0.19974, 0.269444, "screen01", "Das ist ein Barschild", "Bild001/Objekte_ImBild/Bar.png");
  object02 = new pickObject("Burger", 0.279167, 0.53704, "screen01", "Das ist ein Burger Schild", "Bild001/Objekte_ImBild/Burger.png"); //Wimmelbild/content/img/Bild001/Objekte_ImBild/EinarmigerBandit.png
  object03 = new pickObject("Bandit", 0.0, 0.601852, "screen01", "Das ist ein einarmiger Bandit", "Bild001/Objekte_ImBild/EinarmigerBandit.png");
  object04 = new pickObject("Glasscontainer", 0.295052, 0.627315, "screen01", "Das ist ein ", "Bild001/Objekte_ImBild/Glasscontainer.png");
  object05 = new pickObject("Lootbox", 0.183073, 0.609722, "screen01", "Das ist ein ", "Bild001/Objekte_ImBild/Lootbox.png");
  object06 = new pickObject("Nasenspray", 0.883333, 0.607407, "screen01", "Das ist ein ", "Bild001/Objekte_ImBild/Nasenspray.png");
  object07 = new pickObject("Pizza", 0.704427, 0.193519, "screen01", "Das ist ein ", "Bild001/Objekte_ImBild/Pizza.png");
  object08 = new pickObject("Pokerchip", 0.519531, 0.418981, "screen01", "Das ist ein ", "Bild001/Objekte_ImBild/Pokerchip.png");
  object09 = new pickObject("Sale", 0.247396, 0.04537, "screen01", "Das ist ein ", "Bild001/Objekte_ImBild/Sale.png");
  object10 = new pickObject("Tüte", 0.599219, 0.591667, "screen01", "Das ist eine Tüte ", "Bild001/Objekte_ImBild/Tüte.png");

  object11 = new pickObject("Apotheke", 0.734635, 0.506944, "screen02", "Das ist ein ", "Bild004/Objekte_ImBild/Apotheke.png"); //, "objects/BIB001_Inventar_Testobjektgefunden_01_hz.png"
  object12 = new pickObject("Arbeitsausweis", 0.115625, 0.136111, "screen02", "Das ist ein ", "Bild004/Objekte_ImBild/Arbeitsausweis.png");
  object13 = new pickObject("Erste_Hilfe_Kasten", 0.065625, 0.074074, "screen02", "Das ist ein ", "Bild004/Objekte_ImBild/ErsteHilfeKasten.png");
  object14 = new pickObject("Gelber_Schein", 0.836198, 0.953704, "screen02", "Das ist ein ", "Bild004/Objekte_ImBild/GelberSchein.png");
  object15 = new pickObject("Glühbirne", 0.083854, 0.618519, "screen02", "Das ist ein ", "Bild004/Objekte_ImBild/Glühbirne.png");
  object16 = new pickObject("Jogger", 0.27526, 0.623148, "screen02", "Das ist ein ", "Bild004/Objekte_ImBild/Jogger.png");
  object17 = new pickObject("Krücken", 0.839062, 0.344444, "screen02", "Das ist ein ", "Bild004/Objekte_ImBild/Krücken.png");
  object18 = new pickObject("Mappe", 0.451042, 0.206944, "screen02", "Das ist ein ", "Bild004/Objekte_ImBild/Mappe.png");
  object19 = new pickObject("Maske", 0.857292, 0.343519, "screen02", "Das ist ein ", "Bild004/Objekte_ImBild/Maske.png");
  object20 = new pickObject("Sicherheitshinweise", 0.241927, 0.568519, "screen02", "Das ist ein ", "Bild004/Objekte_ImBild/Sicherheitshinweise.png");
  object39 = new pickObject("Sportgerät", 0.704948, 0.172222, "screen02", "Das ist ein ", "Bild004/Objekte_ImBild/Sportgerät.png");
  object40 = new pickObject("Tisch", 0.52474, 0.734722, "screen02", "Das ist ein ", "Bild004/Objekte_ImBild/Tisch.png");

  object21 = new pickObject("Briefkasten", 0.778906, 0.547685, "screen03", "Das ist ein ", "Bild002/Objekte_ImBild/Briefkasten.png");
  object22 = new pickObject("Casino", 0.66224, 0.513426, "screen03", "Das ist ein ", "Bild002/Objekte_ImBild/Casino.png");
  object23 = new pickObject("Einkaufswagen", 0.784115, 0.657407, "screen03", "Das ist ein ", "Bild002/Objekte_ImBild/Einkaufswagen.png");
  //object24 = new pickObject("Geldautomat", 0.360938, 0.546759, "screen03", "Das ist ein ", "Bild002/Objekte_ImBild/Geldautomat.png");
  object25 = new pickObject("Gerichtshammer", 0.229688, 0.24537, "screen03", "Das ist ein ", "Bild002/Objekte_ImBild/Gerichtshammer.png");
  object26 = new pickObject("Handyvertrag", 0.378125, 0.272685, "screen03", "Das ist ein ", "Bild002/Objekte_ImBild/Handyvertrag.png");
  object27 = new pickObject("Hund", 0.313802, 0.619444, "screen03", "Das ist ein ", "Bild002/Objekte_ImBild/Hund.png");
  object28 = new pickObject("Lieferauto", 0.502604, 0.51713, "screen03", "Das ist ein ", "Bild002/Objekte_ImBild/Lieferauto.png");
  object29 = new pickObject("Lottoschein", 0.083594, 0.885648, "screen03", "Das ist ein ", "Bild002/Objekte_ImBild/Lottoschein.png");
  object30 = new pickObject("Rechnungen", 0.448698, 0.8875, "screen03", "Das ist ein ", "Bild002/Objekte_ImBild/Rechnungen.png");

  object31 = new pickObject("Agentur_für_Arbeit", 0.405469, 0.084259, "screen04", "Das ist ein ", "Bild003/Objekte_ImBild/AgenturArbeit.png"); //, "objects/BIB001_Inventar_Testobjektgefunden_01_hz.png"
  object32 = new pickObject("HausvomNikolaus", 0.557292, 0.585648, "screen04", "Das ist ein ", "Bild003/Objekte_ImBild/HausvomNikolaus.png");
  object33 = new pickObject("Kartons", 0.696094, 0.704167, "screen04", "Das ist ein ", "Bild003/Objekte_ImBild/Kartons.png");
  object34 = new pickObject("Krawatte", 0.645573, 0.440741, "screen04", "Das ist ein ", "Bild003/Objekte_ImBild/Krawatte.png");
  object35 = new pickObject("Leichenwagen", 0, 0.636574, "screen04", "Das ist ein ", "Bild003/Objekte_ImBild/Leichenwagen.png");
  object36 = new pickObject("Schlafsack", 0.676562, 0.872222, "screen04", "Das ist ein ", "Bild003/Objekte_ImBild/Schlafsack.png");
  object37 = new pickObject("Schlüssel", 0.216146, 0.760648, "screen04", "Das ist ein ", "Bild003/Objekte_ImBild/Schlüssel.png");
  object38 = new pickObject("Zeitung", 0.565104, 0.82037, "screen04", "Das ist ein ", "Bild003/Objekte_ImBild/Zeitung.png");
  // object48 = new pickObject("object54", Math.random() * 0.9, Math.random() * 0.9, "screen04", "Das ist ein ", "Bild003/Objekte_ImBild/");
  // object49 = new pickObject("object55", Math.random() * 0.9, Math.random() * 0.9, "screen04", "Das ist ein ", "Bild003/Objekte_ImBild/");
  // object50 = new pickObject("object56", Math.random() * 0.9, Math.random() * 0.9, "screen04", "Das ist ein ", "Bild003/Objekte_ImBild/");

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

// Inventar raus / rein
let switchInventory = document.querySelectorAll(".switchInventory");
let inventoryOut = true;
switchInventory.forEach((sw) => {
  sw.onclick = () => {
    inventoryOut = !inventoryOut;
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