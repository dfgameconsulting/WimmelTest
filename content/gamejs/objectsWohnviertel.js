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
  if (countedObjects03.length >= 10) {
    sound04.play();
    objectCopy = objectCopy.filter((element) => element.place != "screen03");
    animateWin("#inventory-wrapper03");
  }
  if (countedObjects04.length >= 7) {
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
  reisekarte = new pickObject("Reisekarte", 0.923958, 0.475926, "screen01", "Das ist eine Reisekarte", "Wohnviertel/Bild_001/Objekte_imBild/reisekarte.png", "Wohnviertel/Bild_001/Objekte_Inventar/reisekarte.png");
  buecher = new pickObject("Bücher", 0.772917, 0.463426, "screen01", "Das sind Bücher", "Wohnviertel/Bild_001/Objekte_imBild/buecher.png", "Wohnviertel/Bild_001/Objekte_Inventar/buecher.png");
  ghettoblaster = new pickObject("Ghettoblaster", 0.887760, 0.223611, "screen01", "Das ist ein Ghettoblaster", "Wohnviertel/Bild_001/Objekte_imBild/ghettoblaster.png", "Wohnviertel/Bild_001/Objekte_Inventar/ghettoblaster.png");
  mbti = new pickObject("MBTI", 0.764844, 0.168056, "screen01", "Das ist ein MBTI", "Wohnviertel/Bild_001/Objekte_imBild/mbti.png", "Wohnviertel/Bild_001/Objekte_Inventar/mbti.png");
  controller = new pickObject("Controller", 0.493490, 0.131481, "screen01", "Das ist ein Controller", "Wohnviertel/Bild_001/Objekte_imBild/controller.png", "Wohnviertel/Bild_001/Objekte_Inventar/controller.png");
  halfpipe = new pickObject("Halfpipe", 0.487760, 0.528704, "screen01", "Das ist eine Halfpipe", "Wohnviertel/Bild_001/Objekte_imBild/halfpipe.png", "Wohnviertel/Bild_001/Objekte_Inventar/halfpipe.png");
  kuscheltier = new pickObject("Kuscheltier", 0.129167, 0.686111, "screen01", "Das ist ein Kuscheltier", "Wohnviertel/Bild_001/Objekte_imBild/kuscheltier.png", "Wohnviertel/Bild_001/Objekte_Inventar/kuscheltier.png");
  graffiti = new pickObject("Graffiti", 0.409115, 0.105093, "screen01", "Das ist Graffiti", "Wohnviertel/Bild_001/Objekte_imBild/graffiti.png", "Wohnviertel/Bild_001/Objekte_Inventar/graffiti.png");
  poster = new pickObject("Poster", 0.333594, 0.356019, "screen01", "Das ist ein Poster", "Wohnviertel/Bild_001/Objekte_imBild/poster.png", "Wohnviertel/Bild_001/Objekte_Inventar/poster.png");
  wegweiser = new pickObject("Wegweiser", 0.219531, 0.527315, "screen01", "Das ist ein Wegweiser", "Wohnviertel/Bild_001/Objekte_imBild/wegweiser.png", "Wohnviertel/Bild_001/Objekte_Inventar/wegweiser.png");

  dankeskarte = new pickObject("Dankeskarte", 0.173177, 0.579630, "screen02", "Das ist eine Dankeskarte", "Wohnviertel/Bild_002/Objekte_imBild/dankeskarte.png", "Wohnviertel/Bild_002/Objekte_Inventar/dankeskarte.png");
  notizbuch = new pickObject("Notizbuch", 0.770052, 0.131019, "screen02", "Das ist ein Notizbuch", "Wohnviertel/Bild_002/Objekte_imBild/notizbuch.png", "Wohnviertel/Bild_002/Objekte_Inventar/notizbuch.png");
  highfive = new pickObject("HighFive", 0.794792, 0.327778, "screen02", "Das ist ein HighFive", "Wohnviertel/Bild_002/Objekte_imBild/highfive.png", "Wohnviertel/Bild_002/Objekte_Inventar/highfive.png");
  checkliste = new pickObject("Checkliste", 0.564583, 0.170833, "screen02", "Das ist eine Checkliste", "Wohnviertel/Bild_002/Objekte_imBild/checkliste.png", "Wohnviertel/Bild_002/Objekte_Inventar/checkliste.png");
  erstehilfe = new pickObject("ErsteHilfe", 0.328125, 0.483796, "screen02", "Das ist Erste Hilfe", "Wohnviertel/Bild_002/Objekte_imBild/erstehilfe.png", "Wohnviertel/Bild_002/Objekte_Inventar/ersteHilfe.png");
  uhr = new pickObject("Uhr", 0.295312, 0.097685, "screen02", "Das ist eine Uhr", "Wohnviertel/Bild_002/Objekte_imBild/uhr.png", "Wohnviertel/Bild_002/Objekte_Inventar/uhr.png");
  whiteboard = new pickObject("Whiteboard", 0.131510, 0.357407, "screen02", "Das ist ein Whiteboard", "Wohnviertel/Bild_002/Objekte_imBild/whiteboard.png", "Wohnviertel/Bild_002/Objekte_Inventar/whiteboard.png");
  gruppenfoto = new pickObject("Gruppenfoto", 0.241406, 0.757870, "screen02", "Das ist ein Gruppenfoto", "Wohnviertel/Bild_002/Objekte_imBild/gruppenfoto.png", "Wohnviertel/Bild_002/Objekte_Inventar/gruppenfoto.png");
  tagebuch = new pickObject("Tagebuch", 0.795052, 0.715741, "screen02", "Das ist ein Tagebuch", "Wohnviertel/Bild_002/Objekte_imBild/tagebuch.png", "Wohnviertel/Bild_002/Objekte_Inventar/tagebuch.png");
  teilnahmezertifikat = new pickObject("Teilnahmezertifikat", 0.529688, 0.693981, "screen02", "Das ist ein Teilnahmezertifikat", "Wohnviertel/Bild_002/Objekte_imBild/teilnahmezertifikat.png", "Wohnviertel/Bild_002/Objekte_Inventar/teilnahmezertifikat.png");

  meditierendeperson = new pickObject("MeditierendePerson", 0.796615, 0.586574, "screen03", "Das ist eine meditierende Person", "Wohnviertel/Bild_003/Objekte_imBild/meditierendeperson.png", "Wohnviertel/Bild_003/Objekte_Inventar/meditierendeperson.png");
  stressball = new pickObject("Stressball", 0.433854, 0.198611, "screen03", "Das ist ein Stressball", "Wohnviertel/Bild_003/Objekte_imBild/stressball.png", "Wohnviertel/Bild_003/Objekte_Inventar/stressball.png");
  kompass = new pickObject("Kompass", 0.505990, 0.947685, "screen03", "Das ist ein Kompass", "Wohnviertel/Bild_003/Objekte_imBild/kompass.png", "Wohnviertel/Bild_003/Objekte_Inventar/kompass.png");
  gendersymbole = new pickObject("GenderSymbole", 0.658333, 0.019907, "screen03", "Das sind Gender-Symbole", "Wohnviertel/Bild_003/Objekte_imBild/gendersymbole.png", "Wohnviertel/Bild_003/Objekte_Inventar/gendersymbole.png");
  wahrsagekugel = new pickObject("Wahrsagekugel", 0.791406, 0.379630, "screen03", "Das ist eine Wahrsagekugel", "Wohnviertel/Bild_003/Objekte_imBild/wahrsagekugel.png", "Wohnviertel/Bild_003/Objekte_Inventar/wahrsagekugel.png");
  achterbahn = new pickObject("Achterbahn", 0.308854, 0.416204, "screen03", "Das ist eine Achterbahn", "Wohnviertel/Bild_003/Objekte_imBild/achterbahn.png", "Wohnviertel/Bild_003/Objekte_Inventar/achterbahn.png");
  herzkissen = new pickObject("Herzkissen", 0.318490, 0.640741, "screen03", "Das ist ein Herzkissen", "Wohnviertel/Bild_003/Objekte_imBild/herzkissen.png", "Wohnviertel/Bild_003/Objekte_Inventar/herzkissen.png");
  blitzableiter = new pickObject("Blitzableiter", 0.189062, 0.130556, "screen03", "Das ist ein Blitzableiter", "Wohnviertel/Bild_003/Objekte_imBild/blitzableiter.png", "Wohnviertel/Bild_003/Objekte_Inventar/blitzableiter.png");
  traene = new pickObject("Träne", 0.241146, 0.263889, "screen03", "Das ist eine Träne", "Wohnviertel/Bild_003/Objekte_imBild/traene.png", "Wohnviertel/Bild_003/Objekte_Inventar/traene.png");
  daumen = new pickObject("Daumen", 0.112240, 0.056944, "screen03", "Das ist ein Daumen", "Wohnviertel/Bild_003/Objekte_imBild/daumen.png", "Wohnviertel/Bild_003/Objekte_Inventar/daumen.png");
  
  vogelimnest = new pickObject("Vogel_im_Nest", 0.280208, 0.375000, "screen04", "Das ist ein Vogel im Nest", "Wohnviertel/Bild_004/Objekte_imBild/vogelimnest.png", "Wohnviertel/Bild_004/Objekte_Inventar/vogelimnest.png");
  stromkabel = new pickObject("Stromkabel", 0.489062, 0.450000, "screen04", "Das ist ein Stromkabel", "Wohnviertel/Bild_004/Objekte_imBild/stromkabel.png", "Wohnviertel/Bild_004/Objekte_Inventar/stromkabel.png");
  radio = new pickObject("Radio", 0.591927, 0.670833, "screen04", "Das ist ein Radio", "Wohnviertel/Bild_004/Objekte_imBild/radio.png", "Wohnviertel/Bild_004/Objekte_Inventar/radio.png");
  reisekoffer = new pickObject("Reisekoffer", 0.198698, 0.654167, "screen04", "Das ist ein Reisekoffer", "Wohnviertel/Bild_004/Objekte_imBild/reisekoffer.png", "Wohnviertel/Bild_004/Objekte_Inventar/reisekoffer.png");
  fliegendegeldscheine = new pickObject("FliegendeGeldscheine", 0.045833, 0.035648, "screen04", "Das sind fliegende Geldscheine", "Wohnviertel/Bild_004/Objekte_imBild/fliegendegeldscheine.png", "Wohnviertel/Bild_004/Objekte_Inventar/fliegendegeldscheine.png");
  fernseher = new pickObject("Fernseher", 0.879688, 0.179167, "screen04", "Das ist ein Fernseher", "Wohnviertel/Bild_004/Objekte_imBild/fernseher.png", "Wohnviertel/Bild_004/Objekte_Inventar/fernseher.png");
  umzugskisten = new pickObject("Umzugskisten", 0.569010, 0.142130, "screen04", "Das sind Umzugskisten", "Wohnviertel/Bild_004/Objekte_imBild/umzugskisten.png", "Wohnviertel/Bild_004/Objekte_Inventar/umzugskisten.png");
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

