let lupe = document.querySelectorAll(".lupe");
let lupeAus = true;
let secretLevelWohnviertelDone = false;
lupe.forEach((lupe) => {
  lupe.onclick = () => {
    anime({
      targets: ".lupe",
      scale: [1.33, 1],
      duration: 500,
      easing: "easeOutSine",
    });
    lupeAus = !lupeAus;
    if (!lupeAus) {
      console.log("LUPE AN");
      document.body.style.cursor = "url(img/inventar/LupeCursor.svg), auto";
    } else {
      console.log("LUPE AUS");
      document.body.style.cursor = "auto";
    }
  };
});

class secretEntry {
  constructor(name, x, y, place, text, img = null) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.place = place;
    this.text = text;
    // this.img = img;
    // this.wasFound = false;
    // this.imgProxy = new Image();
    // this.imgProxy.src = "img/" + this.img;

    // this.w = this.imgProxy.width;
    // this.h = this.imgProxy.height;

    // Suchbild
    let div = document.createElement("div");
    div.id = this.name;
    div.className = "secretEntry";
    document.getElementById(place).appendChild(div);

    let pos = this.place === "screen01" ? screen01Pos : this.place == "screen02" ? screen02Pos : this.place == "screen03" ? screen03Pos : screen04Pos;
    r.style.setProperty(`--${this.name}X`, `${pos.left + screen01Width * this.x}px`);
    r.style.setProperty(`--${this.name}Y`, `${pos.top + screen01Height * this.y}px`);
    document.getElementById(this.name).style.cssText = `
     position: absolute;
      width: 500px;
      height: 200px;
      left: var(--${this.name}X);
      top: var(--${this.name}Y); 
      transform-origin: 0% 0%;
      transform: translate(0%, 0%) var(--scaleFactorObjects);

      outline: 3px solid green;
      `;

    // Inventory

    secrets.push(this);

    div.onclick = () => {
      if (lupeAus) return;
      if (secretLevelWohnviertelDone) return;
      //   fadeIn("#backgroundDark");
      fadeIn("#secretWohnviertel");
      document.body.style.cursor = "auto";
      lupeAus = !lupeAus;
      sound06.play();
    };
  }
}
let sound06 = new Pizzicato.Sound("sound/Secret.mp3");

hecke = new secretEntry("Hecke", 0.832813, 0.650463, "screen04", "Das ist eine Hecke");

// Secret Wohnviertel Logik

let secretWohnviertel = document.querySelector("#secretWohnviertel");

document.querySelector('.close').onclick = () => {
  fadeOut('#secretWohnviertel')
}

let wlan = document.querySelector('#wlan')
let stromkasten = document.querySelector('#stromkasten')
let rathaus = document.querySelector('#rathaus')
let secretItemsFound = 0

let foundAll = (amount) => {
  if (amount < 3) return;
  sound06.play();
  secretLevelWohnviertelDone = true;
  setTimeout(() => {
    fadeOut('#secretWohnviertel');
  }, 3000);
}

wlan.onclick = () => {
  console.log(wlan)
  secretItemsFound++
  wlan.style.display = "none"
  foundAll(secretItemsFound)
}

stromkasten.onclick = () => {
  secretItemsFound++
  stromkasten.style.display = "none"
  foundAll(secretItemsFound)
}

rathaus.onclick = () => {
  secretItemsFound++
  rathaus.style.display = "none"
  foundAll(secretItemsFound)
}


function fadeIn(selector) {
  
  anime({
    begin: () => {
      let a = document.querySelector(selector).style.display = "block";
    },
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
    complete: () => {
      document.querySelector(selector).style.display = "none";
    },
  });
}
