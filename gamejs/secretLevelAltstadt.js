let lupe = document.querySelectorAll(".lupe");
let lupeAus = true;
let secretLevelAltstadtDone = false;
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
      document.body.style.cursor = "url(../img/inventar/LupeCursor.svg), auto";
    } else {
      console.log("LUPE AUS");
      document.body.style.cursor = "auto";
    }
  };
});

class secretEntry {
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
      }, 250);
    };
  }
  render() {
    let div = document.createElement("div");
    div.id = this.name;
    div.className = "secretEntry";
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
      background-size: contain;
      outline: 3px solid green;
      `;

    // Inventory

    secrets.push(this);

    div.onclick = () => {
      if (lupeAus) return;
      if (secretLevelAltstadtDone) return;
      //   fadeIn("#backgroundDark");
      fadeIn("#secretAltstadt");
      document.body.style.cursor = "auto";
      lupeAus = !lupeAus;
      sound06.play();
    };
  }
  // Suchbild
}
let sound06 = new Pizzicato.Sound("sound/Secret.mp3");

Waage = new secretEntry("Waage", 0.832813, 0.200463, "screen02", "Das ist eine Waage", "Altstadt/Bild_002/Objekte_imBild/Waage.png");

// Secret Altstadt Logik

let secretAltstadt = document.querySelector("#secretAltstadt");

function fadeIn(selector) {
  anime({
    begin: () => {
      document.querySelector(selector).style.display = "block";
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
