const r = document.querySelector(':root');

const screen01 = document.querySelector('#screen01-image');
let screen01Pos = screen01.getBoundingClientRect();
let screen01Height = screen01Pos.bottom - screen01Pos.top;
let screen01Width = screen01Pos.right - screen01Pos.left;

const screen02 = document.querySelector('#screen02-image');
let screen02Pos = screen02.getBoundingClientRect();
let screen02Height = screen02Pos.bottom - screen02Pos.top;
let screen02Width = screen02Pos.right - screen02Pos.left;

const screen03 = document.querySelector('#screen03-image');
let screen03Pos = screen03.getBoundingClientRect();
let screen03Height = screen03Pos.bottom - screen03Pos.top;
let screen03Width = screen03Pos.right - screen03Pos.left;

const screen04 = document.querySelector('#screen04-image');
let screen04Pos = screen04.getBoundingClientRect();
let screen04Height = screen04Pos.bottom - screen04Pos.top;
let screen04Width = screen04Pos.right - screen04Pos.left;

// TEST Object
r.style.setProperty('--size', `${screen01Width * 0.055}px`);

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
  r.style.setProperty('--scaleFactor', `scale(${scaleFactor})`);
  r.style.setProperty('--scaleFactorObjects', `scale(${scaleFactor * 0.667})`);
  r.style.setProperty('--size', `${screen01Width * 0.055}px`); // 0.0309

  //Setze Objekte auf den Screen
  objects.forEach((element) => {
    let pos = element.place == 'screen01' ? screen01Pos : element.place == 'screen02' ? screen02Pos : element.place == 'screen03' ? screen03Pos : screen04Pos;
    let width = element.place == 'screen01' ? screen01Width : element.place == 'screen02' ? screen02Width : element.place == 'screen03' ? screen03Width : screen04Width;
    let height = element.place == 'screen01' ? screen01Height : element.place == 'screen02' ? screen02Height : element.place == 'screen03' ? screen03Height : screen04Height;
    r.style.setProperty(`--${element.name}X`, `${pos.left + width * element.x}px`);
    r.style.setProperty(`--${element.name}Y`, `${pos.top + height * element.y}px`);
  });
  // Geheime Eingänge
  secrets.forEach((element) => {
    let pos = element.place == 'screen01' ? screen01Pos : element.place == 'screen02' ? screen02Pos : element.place == 'screen03' ? screen03Pos : screen04Pos;
    let width = element.place == 'screen01' ? screen01Width : element.place == 'screen02' ? screen02Width : element.place == 'screen03' ? screen03Width : screen04Width;
    let height = element.place == 'screen01' ? screen01Height : element.place == 'screen02' ? screen02Height : element.place == 'screen03' ? screen03Height : screen04Height;
    r.style.setProperty(`--${element.name}X`, `${pos.left + width * element.x}px`);
    r.style.setProperty(`--${element.name}Y`, `${pos.top + height * element.y}px`);
  });
}

//Ratios berechnen
window.addEventListener('resize', resetRatios);

let objects = [];
let secrets = [];

class PickObject {
  constructor(name, x, y, place, text, img, invImg, hidden = false) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.place = place;
    this.text = text;
    this.img = img;
    this.wasFound = false;
    this.invImg = invImg;
    this.hidden = hidden

    this.imgProxy = new Image();
    this.imgProxy.src = 'img/' + this.img;
    // this.w = this.imgProxy.width;
    // this.h = this.imgProxy.height;
    this.imgProxy.onload = () => {
      this.w = this.imgProxy.width;
      this.h = this.imgProxy.height;
      console.log('Image "' + this.name + '" loaded...' + ' x: ' + this.imgProxy.width + ' y: ' + this.imgProxy.height);
      setTimeout(() => {
        this.render();
      }, 300);
    };
  }

  render() {
    let div = document.createElement('div');
    div.id = this.name;
    div.className = 'pickObject';
    document.getElementById(this.place).appendChild(div);

    let pos = this.place === 'screen01' ? screen01Pos : this.place == 'screen02' ? screen02Pos : this.place == 'screen03' ? screen03Pos : screen04Pos;
    r.style.setProperty(`--${this.name}X`, `${pos.left + screen01Width * this.x}px`);
    r.style.setProperty(`--${this.name}Y`, `${pos.top + screen01Height * this.y}px`);
    document.getElementById(this.name).style.cssText = `
    position: absolute;
    display: ${this.hidden ? 'none' : 'block'};
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

    let divInventory = document.createElement('div');
    divInventory.id = this.name + 'Inventory';
    divInventory.className = 'inventoryObject';
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
          localStorage.setItem(this.name, 'true');
          console.log(this.name + ' was found');
          let tl = new anime.timeline();
          tl.add({
            begin: () => {
              document.querySelector('#foundInfo').innerHTML = this.name.replace(/_/g, ' ') + ' gefunden!';
            },
            targets: '#options-info',
            opacity: [0, 1],
            duration: 500,
            easing: 'easeInOutSine',
          })
            .add({
              duration: 1000,
            })
            .add({
              targets: '#options-info',
              opacity: [1, 0],
              duration: 500,
              easing: 'easeInOutSine',
            });
        },
        targets: '#' + this.name,
        scale: [1.5, 1, 0.01],
        translate: '-33% -33%',
        transformOrigin: '50% 50%',
        easing: 'linear',
        duration: 500,
        complete: () => {
          sound01.play();
          let index = objects.indexOf(this);
          objectCopy.push(...objects.splice(index, 1));
          console.log(objectCopy);
          document.getElementById(this.name).remove();
          isRunning = false;
          anime({
            targets: `#${this.name + 'Inventory'}`,
            filter: ['brightness(0.1) sepia(1) opacity(0.3)', 'brightness(1) sepia(0) opacity(1)'],
            scale: [0.9, 1.3, 1],
            easing: 'easeInOutExpo',
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
    console.log(' ...was created!');
  }
}

// Objekte checken
let objectCopy = [];

function checkAllObjectsFound() {
  let countedObjects01 = objectCopy.filter((element) => element.wasFound == true && element.place == 'screen01');
  let countedObjects02 = objectCopy.filter((element) => element.wasFound == true && element.place == 'screen02');
  let countedObjects03 = objectCopy.filter((element) => element.wasFound == true && element.place == 'screen03');
  let countedObjects04 = objectCopy.filter((element) => element.wasFound == true && element.place == 'screen04');

  if (countedObjects01.length >= 10) {
    sound04.play();
    objectCopy = objectCopy.filter((element) => element.place != 'screen01');
    animateWin('#inventory-wrapper01');
  }
  if (countedObjects02.length >= 10) {
    sound04.play();
    objectCopy = objectCopy.filter((element) => element.place != 'screen02');
    animateWin('#inventory-wrapper02');
  }
  if (countedObjects03.length >= 10) {
    sound04.play();
    objectCopy = objectCopy.filter((element) => element.place != 'screen03');
    animateWin('#inventory-wrapper03');
  }
  if (countedObjects04.length >= 11) {
    sound04.play();
    objectCopy = objectCopy.filter((element) => element.place != 'screen04');
    animateWin('#inventory-wrapper04');
  }
}

function animateWin(div) {
  anime({
    targets: div + ' ' + '.inventoryObject',
    scale: [
      { value: 0.1, easing: 'easeOutSine', duration: 120 },
      { value: 1, easing: 'easeInOutQuad', duration: 240 },
    ],
    delay: anime.stagger(120),
  });
}

let isRunning = false;
// let object01, object02, object03, object04, object05, object06, object07, object08, object09, object10, object11, object12, object13, object14, object15, object16, ;

window.onload = () => {
  let tl = new anime.timeline();
  tl.add({
    targets: '#start-titel',
    opacity: [0, 1],
    scale: [0.1, 1],
    duration: 500,
    easing: 'easeInOutSine',
  })
    .add({
      duration: 100,
    })
    .add({
      begin: () => {
        startGame();
      },
      targets: '#start-screen',
      translateY: [0, '-100%'],
      duration: 500,
      easing: 'easeInSine',
    });
  // startGame();
};

document.addEventListener('DOMContentLoaded', function () {});

var sound01 = new Pizzicato.Sound('sound/VUMark_complete.mp3');
var sound02 = new Pizzicato.Sound('sound/Button_Normal.mp3');
var sound04 = new Pizzicato.Sound('sound/Sterne.mp3');

class hintCircleObject {
  constructor(name, x, y, place, img) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.place = place;
    this.img = img;
    let div = document.createElement('div');
    div.id = this.name;
    div.className = 'hintCircle';
    document.getElementById(place).appendChild(div);
    let pos = this.place === 'screen01' ? screen01Pos : this.place == 'screen02' ? screen02Pos : this.place == 'screen03' ? screen03Pos : screen04Pos;
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
 /*HIER WEITER PFADE ANPASSEN*/ 
  // lautstaerkesymbol = new PickObject('Lautstärkesymbol', 0.429688, 0.040278, 'screen01', 'Das ist ein Lautstärkesymbol', 'Campus/Bild_001/Szene1_LautstaerkeSymbol.png', 'Campus/Inventar/Bild_001/Szene1_LautstärkeSymbol_01_hz.png');
  // blindenbinde = new PickObject('Blindenbinde', 0.090625, 0.830556, 'screen01', 'Das ist eine Blindenbinde', 'Campus/Bild_001/Szene1_Blindenbinde.png', 'Campus/Inventar/Bild_001/Szene1_Blindenbinde_01_hz.png');
  // c1 = new PickObject('C1', 0.817708, 0.243519, 'screen01', 'Das ist C1', 'Campus/Bild_001/Szene1_C1.png', 'Campus/Inventar/Bild_001/Szene1_C1_01_hz.png');
  // fragezeichen = new PickObject('Fragezeichen', 0.853906, 0.5875, 'screen01', 'Das ist ein Fragezeichen', 'Campus/Bild_001/Szene1_Fragezeichen.png', 'Campus/Inventar/Bild_001/Szene1_Fragezeichen_01_hz.png');
  // globus = new PickObject('Globus', 0.813281, 0.157407, 'screen01', 'Das ist ein Globus', 'Campus/Bild_001/Szene1_Globus.png', 'Campus/Inventar/Bild_001/Szene1_Globus_01_hz.png');
  // kinderwagen = new PickObject('Kinderwagen', 0.206, 0.668056, 'screen01', 'Das ist ein Kinderwagen', 'Campus/Bild_001/Szene1_Kinderwagen.png', 'Campus/Inventar/Bild_001/Szene1_Kinderwagen_01_hz.png');
  // kuscheltier = new PickObject('Kuscheltier', 0.636198, 0.494907, 'screen01', 'Das ist ein Kuscheltier', 'Campus/Bild_001/Szene1_Kuscheltier.png', 'Campus/Inventar/Bild_001/Szene1_Kuscheltier_01_hz.png');
  // rollstuhl = new PickObject('Rollstuhl', 0.417708, 0.649074, 'screen01', 'Das ist ein Rollstuhl', 'Campus/Bild_001/Szene1_Rollstuhl.png', 'Campus/Inventar/Bild_001/Szene1_Rollstuhl_01_hz.png');
  // stoppschild = new PickObject('Stoppschild', 0.340625, 0.686574, 'screen01', 'Das ist ein Stoppschild', 'Campus/Bild_001/Szene1_Stoppschild.png', 'Campus/Inventar/Bild_001/Szene1_Stoppschild_01_hz.png');
  // windel = new PickObject('Windel', 0.723958, 0.668519, 'screen01', 'Das ist eine Windel', 'Campus/Bild_001/Szene1_Windel.png', 'Campus/Inventar/Bild_001/Szene1_Windel_01_hz.png');

  lautstaerkesymbol_PO = new PickObject('Lautstärkesymbol', 0.429688, 0.040278, 'screen01', 'Das ist ein Lautstärkesymbol', 'Campus/Bild_001/Objekte_ImBild/lautstaerkesymbol.png', 'Campus/Bild_001/Objekte_Inventar/lautstaerkesymbol.png');
  blindenbinde_PO = new PickObject('Blindenbinde', 0.090625, 0.830556, 'screen01', 'Das ist eine Blindenbinde', 'Campus/Bild_001/Objekte_ImBild/blindenbinde.png', 'Campus/Bild_001/Objekte_Inventar/blindenbinde.png');
  c1_PO = new PickObject('C1', 0.817708, 0.243519, 'screen01', 'Das ist C1', 'Campus/Bild_001/Objekte_ImBild/c1.png', 'Campus/Bild_001/Objekte_Inventar/c1.png');
  fragezeichen_PO = new PickObject('Fragezeichen', 0.853906, 0.5875, 'screen01', 'Das ist ein Fragezeichen', 'Campus/Bild_001/Objekte_ImBild/fragezeichen.png', 'Campus/Bild_001/Objekte_Inventar/fragezeichen.png');
  globus_PO = new PickObject('Globus', 0.813281, 0.157407, 'screen01', 'Das ist ein Globus', 'Campus/Bild_001/Objekte_ImBild/globus.png', 'Campus/Bild_001/Objekte_Inventar/globus.png');
  kinderwagen_PO = new PickObject('Kinderwagen', 0.206, 0.668056, 'screen01', 'Das ist ein Kinderwagen', 'Campus/Bild_001/Objekte_ImBild/kinderwagen.png', 'Campus/Bild_001/Objekte_Inventar/kinderwagen.png');
  kuscheltier_PO = new PickObject('Kuscheltier', 0.636198, 0.494907, 'screen01', 'Das ist ein Kuscheltier', 'Campus/Bild_001/Objekte_ImBild/kuscheltier.png', 'Campus/Bild_001/Objekte_Inventar/kuscheltier.png');
  rollstuhl_PO = new PickObject('Rollstuhl', 0.417708, 0.649074, 'screen01', 'Das ist ein Rollstuhl', 'Campus/Bild_001/Objekte_ImBild/rollstuhl.png', 'Campus/Bild_001/Objekte_Inventar/rollstuhl.png');
  stoppschild_PO = new PickObject('Stoppschild', 0.340625, 0.686574, 'screen01', 'Das ist ein Stoppschild', 'Campus/Bild_001/Objekte_ImBild/stoppschild.png', 'Campus/Bild_001/Objekte_Inventar/stoppschild.png');
  windel_PO = new PickObject('Windel', 0.723958, 0.668519, 'screen01', 'Das ist eine Windel', 'Campus/Bild_001/Objekte_ImBild/windel.png', 'Campus/Bild_001/Objekte_Inventar/windel.png');

  buecherzelle_PO = new PickObject('Bücherzelle', 0.946354, 0.626389, 'screen02', 'Das ist eine Bücherzelle', 'Campus/Bild_002/Objekte_ImBild/buecherzelle.png', 'Campus/Bild_002/Objekte_Inventar/buecherzelle.png');
  jubelndePerson_PO = new PickObject('Jubelnde_Person', 0.695313, 0.368981, 'screen02', 'Das ist eine jubelnde Person', 'Campus/Bild_002/Objekte_ImBild/jubelndeperson.png', 'Campus/Bild_002/Objekte_Inventar/jubelndeperson.png');
  karteikarten_PO = new PickObject('Karteikarten', 0.916146, 0.868981, 'screen02', 'Das sind Karteikarten', 'Campus/Bild_002/Objekte_ImBild/karteikarten.png', 'Campus/Bild_002/Objekte_Inventar/karteikarten.png');
  lerngruppe_PO = new PickObject('Lerngruppe', 0.449219, 0.742593, 'screen02', 'Das ist eine Lerngruppe', 'Campus/Bild_002/Objekte_ImBild/lerngruppe.png', 'Campus/Bild_002/Objekte_Inventar/lerngruppe.png');
  ordnerstapel_PO = new PickObject('Ordnerstapel', 0.521094, 0.141667, 'screen02', 'Das ist eine Ordnerstapel', 'Campus/Bild_002/Objekte_ImBild/ordnerstapel.png', 'Campus/Bild_002/Objekte_Inventar/ordnerstapel.png');
  personMitSchweiss_PO = new PickObject('Person_mit_Schweiß', 0.013802, 0.685648, 'screen02', 'Das ist eine Person mit Schweiß', 'Campus/Bild_002/Objekte_ImBild/personmitschweiss.png', 'Campus/Bild_002/Objekte_Inventar/personmitschweiss.png');
  stoppuhr_PO = new PickObject('Stoppuhr', 0.11276, 0.067593, 'screen02', 'Das ist eine Stoppuhr', 'Campus/Bild_002/Objekte_ImBild/stoppuhr.png', 'Campus/Bild_002/Objekte_Inventar/stoppuhr.png');
  stundenplan_PO = new PickObject('Stundenplan', 0.95026, 0.118519, 'screen02', 'Das ist ein Stundenplan', 'Campus/Bild_002/Objekte_ImBild/stundenplan.png', 'Campus/Bild_002/Objekte_Inventar/stundenplan.png');
  todoliste_PO = new PickObject('Todoliste', 0.607552, 0.443981, 'screen02', 'Das ist eine To Do Liste', 'Campus/Bild_002/Objekte_ImBild/todoliste.png', 'Campus/Bild_002/Objekte_Inventar/todoliste.png');
  umleitungsschild_PO = new PickObject('Umleitungsschild', 0.455469, 0.706944, 'screen02', 'Das ist ein Umleitungsschild', 'Campus/Bild_002/Objekte_ImBild/umleitungsschild.png', 'Campus/Bild_002/Objekte_Inventar/umleitungsschild.png');
  // buecherzelle = new PickObject('Bücherzelle', 0.946354, 0.626389, 'screen02', 'Das ist eine Bücherzelle', 'Campus/Bild_002/Szene2_Buecherzelle.png', 'Campus/Inventar/Bild_002/Szene2_Buecherzelle_01_hz.png');
  // jubelndePerson = new PickObject('Jubelnde_Person', 0.695313, 0.368981, 'screen02', 'Das ist eine jubelnde Person', 'Campus/Bild_002/Szene2_JubelndePerson.png', 'Campus/Inventar/Bild_002/Szene2_JubelndePerson_01_hz.png');
  // karteikarten = new PickObject('Karteikarten', 0.916146, 0.868981, 'screen02', 'Das sind Karteikarten', 'Campus/Bild_002/Szene2_Karteikarten.png', 'Campus/Inventar/Bild_002/Szene2_Karteikarten_01_hz.png');
  // lerngruppe = new PickObject('Lerngruppe', 0.449219, 0.742593, 'screen02', 'Das ist eine Lerngruppe', 'Campus/Bild_002/Szene2_Lerngruppe.png', 'Campus/Inventar/Bild_002/Szene2_Lerngruppe_01_hz.png');
  // ordnerstapel = new PickObject('Ordnerstapel', 0.521094, 0.141667, 'screen02', 'Das ist eine Ordnerstapel', 'Campus/Bild_002/Szene2_Ordnerstapel.png', 'Campus/Inventar/Bild_002/Szene2_Ordnerstapel_01_hz.png');
  // personMitSchweiss = new PickObject('Person_mit_Schweiß', 0.013802, 0.685648, 'screen02', 'Das ist eine Person mit Schweiß', 'Campus/Bild_002/Szene2_PersonMitSchweiss.png', 'Campus/Inventar/Bild_002/Szene2_PersonMitSchweiss_01_hz.png');
  // stoppuhr = new PickObject('Stoppuhr', 0.11276, 0.067593, 'screen02', 'Das ist eine Stoppuhr', 'Campus/Bild_002/Szene2_Stoppuhr.png', 'Campus/Inventar/Bild_002/Szene2_Stoppuhr_01_hz.png');
  // stundenplan = new PickObject('Stundenplan', 0.95026, 0.118519, 'screen02', 'Das ist ein Sundenplan', 'Campus/Bild_002/Szene2_Stundenplan.png', 'Campus/Inventar/Bild_002/Szene2_Stundenplan_01_hz.png');
  // todoliste = new PickObject('Todoliste', 0.607552, 0.443981, 'screen02', 'Das ist eine To Do Liste', 'Campus/Bild_002/Szene2_ToDoListe.png', 'Campus/Inventar/Bild_002/Szene2_ToDoListe_01_hz.png');
  // umleitungsschild = new PickObject('Umleitungsschild', 0.455469, 0.706944, 'screen02', 'Das ist ein Umleitungsschild', 'Campus/Bild_002/Szene2_Umleitungsschild.png', 'Campus/Inventar/Bild_002/Szene2_Umleitungsschild_01_hz.png');

  fuenfUndZwanzig_PO = new PickObject('Fünfundzwanzig', 0.361719, 0.726852, 'screen03', 'Das ist 25', 'Campus/Bild_003/Objekte_ImBild/25.png', 'Campus/Bild_003/Objekte_Inventar/25.png');
  absolventenhut_PO = new PickObject('Absolventenhut', 0.81849, 0.485648, 'screen03', 'Das ist ein Absolventenhut', 'Campus/Bild_003/Objekte_ImBild/absolventenhut.png', 'Campus/Bild_003/Objekte_Inventar/absolventenhut.png');
  dosensuppe_PO = new PickObject('Dosensuppe', 0.89349, 0.891204, 'screen03', 'Das ist eine Dosensuppe', 'Campus/Bild_003/Objekte_ImBild/dosensuppe.png', 'Campus/Bild_003/Objekte_Inventar/dosensuppe.png');
  bafoeg_PO = new PickObject('Bafög', 0.1125, 0.164352, 'screen03', 'Das ist eine Dosensuppe', 'Campus/Bild_003/Objekte_ImBild/bafoeg.png', 'Campus/Bild_003/Objekte_Inventar/bafoeg.png');
  kleingeldhut_PO = new PickObject('Kleingeldhut', 0.385938, 0.763426, 'screen03', 'Das ist ein Kleingeldhut', 'Campus/Bild_003/Objekte_ImBild/kleingeldhut.png', 'Campus/Bild_003/Objekte_Inventar/kleingeldhut.png');
  mutterMitKind_PO = new PickObject('Mutter_mit_Schirm', 0.520833, 0.702315, 'screen03', 'Das ist ein Mutter mit Schirm', 'Campus/Bild_003/Objekte_ImBild/muttermitkind.png', 'Campus/Bild_003/Objekte_Inventar/muttermitkind.png');
  sparschwein_PO = new PickObject('Sparschwein', 0.490104, 0.149074, 'screen03', 'Das ist ein Sparschwein', 'Campus/Bild_003/Objekte_ImBild/sparschwein.png', 'Campus/Bild_003/Objekte_Inventar/sparschwein.png');
  dieb_PO = new PickObject('Dieb', 0.490104, 0.149074, 'screen03', 'Das ist ein Dieb', 'Campus/Bild_003/Objekte_Inventar/dieb.png', 'Campus/Bild_003/Objekte_Inventar/dieb.png', true);
  koch_PO = new PickObject('Koch', 0.490104, 0.149074, 'screen03', 'Das ist ein Koch', 'Campus/Bild_003/Objekte_Inventar/koch.png', 'Campus/Bild_003/Objekte_Inventar/koch.png', true);
  zauberer_PO = new PickObject('Zauberer', 0.490104, 0.149074, 'screen03', 'Das ist ein Zauberer', 'Campus/Bild_003/Objekte_Inventar/zauberer.png', 'Campus/Bild_003/Objekte_Inventar/zauberer.png', true);

  bus_PO = new PickObject('Bus', 0.909375, 0.202315, 'screen04', 'Das ist ein Bus', 'Campus/Bild_004/Objekte_ImBild/bus.png', 'Campus/Bild_004/Objekte_Inventar/bus.png');
  fahrrad_PO = new PickObject('Fahrrad', 0.753125, 0.465741, 'screen04', 'Das ist ein Fahrrad', 'Campus/Bild_004/Objekte_ImBild/fahrrad.png', 'Campus/Bild_004/Objekte_Inventar/fahrrad.png');
  fahrschein_PO = new PickObject('Fahrschein', 0.148698, 0.138889, 'screen04', 'Das ist ein Fahrschein', 'Campus/Bild_004/Objekte_ImBild/fahrschein.png', 'Campus/Bild_004/Objekte_Inventar/fahrschein.png');
  flugzeug_PO = new PickObject('Flugzeug', 0.088979, 0.082407, 'screen04', 'Das ist ein Flugzeug', 'Campus/Bild_004/Objekte_ImBild/flugzeug.png', 'Campus/Bild_004/Objekte_Inventar/flugzeug.png');
  schluesselbund_PO = new PickObject('Schluesselbund', 0.354688, 0.539815, 'screen04', 'Das ist ein Schluesselbund', 'Campus/Bild_004/Objekte_ImBild/schluesselbund.png', 'Campus/Bild_004/Objekte_Inventar/schluesselbund.png');
  straßenbahn_PO = new PickObject('Straßenbahn', 0.239844, 0.416667, 'screen04', 'Das ist eine Straßenbahn', 'Campus/Bild_004/Objekte_ImBild/strassenbahn.png', 'Campus/Bild_004/Objekte_Inventar/strassenbahn.png');
  tuerklingel_PO = new PickObject('Tuerklingel', 0.067708, 0.209259, 'screen04', 'Das ist eine Tuerklingel', 'Campus/Bild_004/Objekte_ImBild/tuerklingel.png', 'Campus/Bild_004/Objekte_Inventar/tuerklingel.png');
  terminkalender_PO = new PickObject('Terminkalender', 0.835677, 0.807407, 'screen04', 'Das ist ein Terminkalender', 'Campus/Bild_004/Objekte_ImBild/terminkalender.png', 'Campus/Bild_004/Objekte_Inventar/terminkalender.png');
  umzugskisten_PO = new PickObject('Umzugskisten', 0.334896, 0.693519, 'screen04', 'Das sind Umzugskisten', 'Campus/Bild_004/Objekte_ImBild/umzugskisten.png', 'Campus/Bild_004/Objekte_Inventar/umzugskisten.png');
  umzugswagen_PO = new PickObject('Umzugswagen', 0.651563, 0.113889, 'screen04', 'Das ist ein Umzugswagen', 'Campus/Bild_004/Objekte_ImBild/umzugswagen.png', 'Campus/Bild_004/Objekte_Inventar/umzugswagen.png');
  zebrastreifen_PO = new PickObject('Zebrastreifen', 0, 0.874537, 'screen04', 'Das ist eine Zebrastreifen', 'Campus/Bild_004/Objekte_ImBild/zebrastreifen.png', 'Campus/Bild_004/Objekte_Inventar/zebrastreifen.png');

  resetRatios();

  // Hint System
  let hints = document.querySelectorAll('.hint');

  let hintCoolDown = false;
  let allInventorys = document.querySelectorAll('.inventory');

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
        let side = rnd > 0.5 ? 'left' : 'right';
        if (side === 'left') {
          target = document.querySelector('#hintCircleLeft');
        } else {
          target = document.querySelector('#hintCircleRight');
        }
        anime({
          begin: () => {
            hintCoolDown = true;
            target.style.display = 'block';
          },
          targets: target,
          opacity: [0, 1, 1, 1, 1, 0],
          easing: 'easeInOutQuad',
          duration: 2000,
          complete: () => {
            target.style.display = 'none';
            hintCoolDown = false;
          },
        });
      } else {
        hintCoolDown = true;
        allInventorys.forEach((inv) => {
          let div = document.createElement('div');
          div.className = 'hint-bar';
          inv.appendChild(div);
        });
        // sonst such Dir eine Objekt aus und gehe da drauf
        let rand = Math.random() * filteredObjects.length;
        let randObject = filteredObjects[Math.floor(rand)];
        let offset = () => Math.random() * 0.033 - 0.0167;
        console.log('Rand:' + randObject.x);
        hintCircle01 = new hintCircleObject('hintCircle01', randObject.x + offset(), randObject.y + offset(), screen, 'BIB001_Stadt_Hinweiskreis_01_hz.png');
        let randRot = Math.floor(Math.random() * 360);
        let leftRight = Math.random() > 0.5 ? -360 : 360;
        anime({
          targets: '.hintCircle',
          scale: [2, 4, 3],
          opacity: [1, 1, 1, 1, 1, 0],
          rotate: [randRot, randRot + leftRight],
          translateY: [0, -10, 0, 10],
          translateX: [10, 0, -10, 0],
          easing: 'easeInOutQuad',
          duration: 5000,
        });
        setTimeout(() => {
          let index = objects.indexOf(hintCircle01);
          objects.splice(index, 1);
          document.getElementById('hintCircle01').remove();
        }, 5000);
        setTimeout(() => {
          hintCoolDown = false;
          removeElementsByClass('hint-bar');
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
