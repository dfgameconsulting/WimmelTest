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
class PickObject {
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
       // this.w = this.imgProxy.width;
    // this.h = this.imgProxy.height;

    this.imgProxy.onload = () => {
      this.w = this.imgProxy.width;
      this.h = this.imgProxy.height;
      console.log('Image "' + this.name + '" loaded...' + " x: " + this.imgProxy.width + " y: " + this.imgProxy.height);
      setTimeout(() => {
        this.render();
      }, 300);
    };
  }

  render() {
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

    let divInventory = document.createElement("div");
    divInventory.id = this.name + "Inventory";
    divInventory.className = "inventoryObject";
    let inventoryWrapper = document.getElementById(`inventory-wrapper${this.place.slice(-2)}`);
    inventoryWrapper.appendChild(divInventory);
    divInventory.style.cssText = `
      height: var(--inventorySize);
      width: var(--inventorySize);
      background-image: url(img/${this.invImg});
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      filter: brightness(0.1) sepia(1) opacity(0.3);`;

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
    console.log(" ...was created!");
  }
}
// class PickObject {
//   constructor(name, x, y, place, text, img) {
//     this.name = name;
//     this.x = x;
//     this.y = y;
//     this.place = place;
//     this.text = text;
//     this.img = img;
//     this.wasFound = false;

//     this.imgProxy = new Image();
//     this.imgProxy.src = "img/" + this.img;
//     this.w = this.imgProxy.width;
//     this.h = this.imgProxy.height;

//     this.imgProxy.onload = () => {
//       console.log('Image "' + this.name + '" loaded...' + " x: " + this.imgProxy.width + " y: " + this.imgProxy.height);
//     };

//     // Suchbild
//     let div = document.createElement("div");
//     div.id = this.name;
//     div.className = "PickObject";
//     document.getElementById(this.place).appendChild(div);

//     let pos = this.place === "screen01" ? screen01Pos : this.place == "screen02" ? screen02Pos : this.place == "screen03" ? screen03Pos : screen04Pos;
//     r.style.setProperty(`--${this.name}X`, `${pos.left + screen01Width * this.x}px`);
//     r.style.setProperty(`--${this.name}Y`, `${pos.top + screen01Height * this.y}px`);
//     document.getElementById(this.name).style.cssText = `
//     position: absolute;
//     width: ${this.w}px;
//     height: ${this.h}px;
//     left: var(--${this.name}X);
//     top: var(--${this.name}Y); 
//     transform-origin: 0% 0%;
//     transform: translate(0%, 0%) var(--scaleFactorObjects);
//     background-image: url(img/${this.img});
//     background-repeat: no-repeat;
//     background-position: center;
//     background-size: contain;`;
//     // Inventory
//     let divInventory = document.createElement("div");
//     divInventory.id = this.name + "Inventory";
//     divInventory.className = "inventoryObject";
//     if (this.place === "screen01") {
//       document.getElementById("inventory-wrapper01").appendChild(divInventory);
//       document.getElementById(this.name + "Inventory").style.cssText = `
//     height: var(--inventorySize);
//     width: var(--inventorySize);
//     background-image: url(img/${this.img});
//     background-repeat: no-repeat;
//     background-position: center;
//     background-size: contain;
//     filter: brightness(0.1) sepia(1) opacity(0.3); 
//     `; //  blur(3px)
//     } else if (this.place === "screen02") {
//       document.getElementById("inventory-wrapper02").appendChild(divInventory);
//       document.getElementById(this.name + "Inventory").style.cssText = `
//     height: var(--inventorySize);
//     width: var(--inventorySize);
//     background-image: url(img/${this.img});
//     background-repeat: no-repeat;
//     background-position: center;
//     background-size: contain;
//     filter: brightness(0.1) sepia(1) opacity(0.3); 
//     `; // blur(3px)
//     } else if (this.place === "screen03") {
//       document.getElementById("inventory-wrapper03").appendChild(divInventory);
//       document.getElementById(this.name + "Inventory").style.cssText = `
//     height: var(--inventorySize);
//     width: var(--inventorySize);
//     background-image: url(img/${this.img});
//     background-repeat: no-repeat;
//     background-position: center;
//     background-size: contain;
//     filter: brightness(0.1) sepia(1) opacity(0.3); 
//     `; //blur(3px)
//     } else if (this.place === "screen04") {
//       document.getElementById("inventory-wrapper04").appendChild(divInventory);
//       document.getElementById(this.name + "Inventory").style.cssText = `
//     height: var(--inventorySize);
//     width: var(--inventorySize);
//     background-image: url(img/${this.img});
//     background-repeat: no-repeat;
//     background-position: center;
//     background-size: contain;
//     filter: brightness(0.1) sepia(1) opacity(0.3); 
//     `; //blur(3px)
//     }
//     div.onclick = () => {
//       if (isRunning) return;
//       anime({
//         begin: () => {
//           isRunning = true;
//           this.wasFound = true;
//           // GameManager!
//           localStorage.setItem(this.name, "true");
//           console.log(this.name + " was found");
//           let tl = new anime.timeline();
//           tl.add({
//             begin: () => {
//               document.querySelector('#foundInfo').innerHTML = this.name.replace(/_/g, ' ') + " gefunden!";
//             },
//             targets: "#options-info",
//             opacity: [0, 1],
//             duration: 500,
//             easing: "easeInOutSine",
//           }).add({
//             duration: 1000,
//           }).add({
//             targets: "#options-info",
//             opacity: [1, 0],
//             duration: 500,
//             easing: "easeInOutSine",
//           })
          
//         },
//         targets: "#" + this.name,
//         scale: [1.5, 1, 0.01],
//         translate: "-33% -33%",
//         transformOrigin: "50% 50%",
//         easing: "linear",
//         duration: 500,
//         complete: () => {
//           sound01.play();
//           let index = objects.indexOf(this);
//           objectCopy.push(...objects.splice(index, 1));
//           console.log(objectCopy);
//           document.getElementById(this.name).remove();
//           isRunning = false;
//           anime({
//             targets: `#${this.name + "Inventory"}`,
//             filter: ["brightness(0.1) sepia(1) opacity(0.3)", "brightness(1) sepia(0) opacity(1)"],
//             scale: [0.9, 1.3, 1],
//             easing: "easeInOutExpo",
//             duration: 300,
//             complete: () => {
//               checkAllObjectsFound();
//             },
//           });
//         },
//       });
//     };
//     objects.push(this);
//     console.log(this);
//     console.log(" ...was created!")
//   }
// }

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
  if (countedObjects02.length >= 12) {
    sound04.play();
    objectCopy = objectCopy.filter((element) => element.place != "screen02");
    animateWin("#inventory-wrapper02");
  }
  if (countedObjects03.length >= 9) {
    sound04.play();
    objectCopy = objectCopy.filter((element) => element.place != "screen03");
    animateWin("#inventory-wrapper03");
  }
  if (countedObjects04.length >= 8) {
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
  object01 = new PickObject("Bar", 0.19974, 0.269444, "screen01", "Das ist ein Barschild", "CityCenter/Bild001/Objekte_ImBild/bar.png" , "CityCenter/Bild001/Objekte_Inventar/bar.png");
  object02 = new PickObject("Burger", 0.279167, 0.53704, "screen01", "Das ist ein Burger Schild", "CityCenter/Bild001/Objekte_ImBild/burger.png" , "CityCenter/Bild001/Objekte_Inventar/burger.png"); 
  object03 = new PickObject("Bandit", 0.0, 0.601852, "screen01", "Das ist ein einarmiger Bandit", "CityCenter/Bild001/Objekte_ImBild/einarmigerbandit.png" , "CityCenter/Bild001/Objekte_Inventar/einarmigerbandit.png");
  object04 = new PickObject("Glasscontainer", 0.295052, 0.627315, "screen01", "Das ist ein ", "CityCenter/Bild001/Objekte_ImBild/glasscontainer.png" , "CityCenter/Bild001/Objekte_Inventar/glasscontainer.png");
  object05 = new PickObject("Lootbox", 0.183073, 0.609722, "screen01", "Das ist ein ", "CityCenter/Bild001/Objekte_ImBild/lootbox.png", "CityCenter/Bild001/Objekte_Inventar/lootbox.png");
  object06 = new PickObject("Nasenspray", 0.883333, 0.607407, "screen01", "Das ist ein ", "CityCenter/Bild001/Objekte_ImBild/nasenspray.png" , "CityCenter/Bild001/Objekte_Inventar/nasenspray.png");
  object07 = new PickObject("Pizza", 0.704427, 0.193519, "screen01", "Das ist ein ", "CityCenter/Bild001/Objekte_ImBild/pizza.png" , "CityCenter/Bild001/Objekte_Inventar/pizza.png");
  object08 = new PickObject("Pokerchip", 0.519531, 0.418981, "screen01", "Das ist ein ", "CityCenter/Bild001/Objekte_ImBild/pokerchip.png", "CityCenter/Bild001/Objekte_Inventar/pokerchip.png");
  object09 = new PickObject("Sale", 0.247396, 0.04537, "screen01", "Das ist ein ", "CityCenter/Bild001/Objekte_ImBild/sale.png", "CityCenter/Bild001/Objekte_Inventar/sale.png");
  object10 = new PickObject("Tüte", 0.599219, 0.591667, "screen01", "Das ist eine Tüte ", "CityCenter/Bild001/Objekte_ImBild/tuete.png", "CityCenter/Bild001/Objekte_Inventar/tuete.png");

  object11 = new PickObject("Apotheke", 0.734635, 0.506944, "screen02", "Das ist ein ", "CityCenter/Bild004/Objekte_ImBild/Apotheke.png" , "CityCenter/Bild004/Objekte_Inventar/Apotheke.png"); 
  object12 = new PickObject("Arbeitsausweis", 0.115625, 0.136111, "screen02", "Das ist ein ", "CityCenter/Bild004/Objekte_ImBild/Arbeitsausweis.png" , "CityCenter/Bild004/Objekte_Inventar/Arbeitsausweis.png");
  object13 = new PickObject("Erste_Hilfe_Kasten", 0.065625, 0.074074, "screen02", "Das ist ein ", "CityCenter/Bild004/Objekte_ImBild/ErsteHilfeKasten.png", "CityCenter/Bild004/Objekte_Inventar/ErsteHilfeKasten.png");
  object14 = new PickObject("Gelber_Schein", 0.836198, 0.953704, "screen02", "Das ist ein ", "CityCenter/Bild004/Objekte_ImBild/GelberSchein.png", "CityCenter/Bild004/Objekte_Inventar/GelberSchein.png");
  object15 = new PickObject("Glühbirne", 0.083854, 0.618519, "screen02", "Das ist ein ", "CityCenter/Bild004/Objekte_ImBild/Glühbirne.png", "CityCenter/Bild004/Objekte_Inventar/Glühbirne.png");
  object16 = new PickObject("Jogger", 0.27526, 0.623148, "screen02", "Das ist ein ", "CityCenter/Bild004/Objekte_ImBild/Jogger.png", "CityCenter/Bild004/Objekte_Inventar/Jogger.png");
  object17 = new PickObject("Krücken", 0.839062, 0.719444, "screen02", "Das ist ein ", "CityCenter/Bild004/Objekte_ImBild/Krücken.png", "CityCenter/Bild004/Objekte_Inventar/Krücken.png");
  object18 = new PickObject("Mappe", 0.451042, 0.206944, "screen02", "Das ist ein ", "CityCenter/Bild004/Objekte_ImBild/Mappe.png", "CityCenter/Bild004/Objekte_Inventar/Mappe.png");
  object19 = new PickObject("Maske", 0.857292, 0.343519, "screen02", "Das ist ein ", "CityCenter/Bild004/Objekte_ImBild/Maske.png", "CityCenter/Bild004/Objekte_Inventar/Maske.png");
  object20 = new PickObject("Sicherheitshinweise", 0.241927, 0.568519, "screen02", "Das ist ein ", "CityCenter/Bild004/Objekte_ImBild/Sicherheitshinweise.png", "CityCenter/Bild004/Objekte_Inventar/Sicherheitshinweise.png");
  object39 = new PickObject("Sportgerät", 0.704948, 0.172222, "screen02", "Das ist ein ", "CityCenter/Bild004/Objekte_ImBild/Sportgerät.png", "CityCenter/Bild004/Objekte_Inventar/Sportgerät.png");
  object40 = new PickObject("Tisch", 0.52474, 0.734722, "screen02", "Das ist ein ", "CityCenter/Bild004/Objekte_ImBild/Tisch.png", "CityCenter/Bild004/Objekte_Inventar/Tisch.png");

  object21 = new PickObject("Briefkasten", 0.778906, 0.547685, "screen03", "Das ist ein ", "CityCenter/Bild002/Objekte_ImBild/Briefkasten.png", "CityCenter/Bild002/Objekte_Inventar/Briefkasten.png");
  object22 = new PickObject("Casino", 0.66224, 0.513426, "screen03", "Das ist ein ", "CityCenter/Bild002/Objekte_ImBild/Casino.png", "CityCenter/Bild002/Objekte_Inventar/Casino.png");
  object23 = new PickObject("Einkaufswagen", 0.784115, 0.657407, "screen03", "Das ist ein ", "CityCenter/Bild002/Objekte_ImBild/Einkaufswagen.png", "CityCenter/Bild002/Objekte_Inventar/Einkaufswagen.png");
  //object24 = new PickObject("Geldautomat", 0.360938, 0.546759, "screen03", "Das ist ein ", "CityCenter/Bild002/Objekte_ImBild/Geldautomat.png");
  object25 = new PickObject("Gerichtshammer", 0.229688, 0.24537, "screen03", "Das ist ein ", "CityCenter/Bild002/Objekte_ImBild/Gerichtshammer.png", "CityCenter/Bild002/Objekte_Inventar/Gerichtshammer.png");
  object26 = new PickObject("Handyvertrag", 0.378125, 0.272685, "screen03", "Das ist ein ", "CityCenter/Bild002/Objekte_ImBild/Handyvertrag.png", "CityCenter/Bild002/Objekte_Inventar/Handyvertrag.png");
  object27 = new PickObject("Hund", 0.313802, 0.619444, "screen03", "Das ist ein ", "CityCenter/Bild002/Objekte_ImBild/Hund.png", "CityCenter/Bild002/Objekte_Inventar/Hund.png");
  object28 = new PickObject("Lieferauto", 0.502604, 0.51713, "screen03", "Das ist ein ", "CityCenter/Bild002/Objekte_ImBild/Lieferauto.png", "CityCenter/Bild002/Objekte_Inventar/Lieferauto.png");
  object29 = new PickObject("Lottoschein", 0.083594, 0.885648, "screen03", "Das ist ein ", "CityCenter/Bild002/Objekte_ImBild/Lottoschein.png", "CityCenter/Bild002/Objekte_Inventar/Lottoschein.png");
  object30 = new PickObject("Rechnungen", 0.448698, 0.8875, "screen03", "Das ist ein ", "CityCenter/Bild002/Objekte_ImBild/Rechnungen.png", "CityCenter/Bild002/Objekte_Inventar/Rechnungen.png");

  object31 = new PickObject("Agentur_für_Arbeit", 0.405469, 0.084259, "screen04", "Das ist ein ", "CityCenter/Bild003/Objekte_ImBild/AgenturArbeit.png", "CityCenter/Bild003/Objekte_Inventar/AgenturArbeit.png");
  object32 = new PickObject("HausvomNikolaus", 0.557292, 0.585648, "screen04", "Das ist ein ", "CityCenter/Bild003/Objekte_ImBild/HausvomNikolaus.png", "CityCenter/Bild003/Objekte_Inventar/HausvomNikolaus.png");
  object33 = new PickObject("Kartons", 0.696094, 0.704167, "screen04", "Das ist ein ", "CityCenter/Bild003/Objekte_ImBild/Kartons.png", "CityCenter/Bild003/Objekte_Inventar/Kartons.png");
  object34 = new PickObject("Krawatte", 0.645573, 0.440741, "screen04", "Das ist ein ", "CityCenter/Bild003/Objekte_ImBild/Krawatte.png", "CityCenter/Bild003/Objekte_Inventar/Krawatte.png");
  object35 = new PickObject("Leichenwagen", 0, 0.636574, "screen04", "Das ist ein ", "CityCenter/Bild003/Objekte_ImBild/Leichenwagen.png", "CityCenter/Bild003/Objekte_Inventar/Leichenwagen.png");
  object36 = new PickObject("Schlafsack", 0.676562, 0.872222, "screen04", "Das ist ein ", "CityCenter/Bild003/Objekte_ImBild/Schlafsack.png", "CityCenter/Bild003/Objekte_Inventar/Schlafsack.png");
  object37 = new PickObject("Schlüssel", 0.216146, 0.760648, "screen04", "Das ist ein ", "CityCenter/Bild003/Objekte_ImBild/Schlüssel.png", "CityCenter/Bild003/Objekte_Inventar/Schlüssel.png");
  object38 = new PickObject("Zeitung", 0.565104, 0.82037, "screen04", "Das ist ein ", "CityCenter/Bild003/Objekte_ImBild/Zeitung.png", "CityCenter/Bild003/Objekte_Inventar/Zeitung.png");
  // object48 = new PickObject("object54", Math.random() * 0.9, Math.random() * 0.9, "screen04", "Das ist ein ", "Bild003/Objekte_ImBild/");
  // object49 = new PickObject("object55", Math.random() * 0.9, Math.random() * 0.9, "screen04", "Das ist ein ", "Bild003/Objekte_ImBild/");
  // object50 = new PickObject("object56", Math.random() * 0.9, Math.random() * 0.9, "screen04", "Das ist ein ", "Bild003/Objekte_ImBild/");

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
          opacity: [1, 1, 1, 1, 1, 0],
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

