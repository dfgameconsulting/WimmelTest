let lupe = document.querySelectorAll(".lupe");
let lupeAus = true;
let secretLevelInnenstadtDone = false;
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
      }, 500);
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

      secrets.push(this);

    div.onclick = () => {
      if (lupeAus) return;
      if (secretLevelInnenstadtDone) return;
      //   fadeIn("#backgroundDark");
      fadeIn("#secretInnenstadt");
      document.body.style.cursor = "auto";
      lupeAus = !lupeAus;
      sound06.play();
    };
  }
}
let sound06 = new Pizzicato.Sound("sound/Secret.mp3");
let auszugSound = new Pizzicato.Sound("sound/kontoauszug.mp3");
object24 = new secretEntry("Geldautomat", 0.360938, 0.546759, "screen03", "Das ist ein ", "CityCenter/Bild_002/Objekte_ImBild/geldautomat.png");

// Secret Innenstadt Logik

let secretInnenstadt = document.querySelector("#secretInnenstadt");
let geldBeutel = document.querySelector("#geldbeutel");
let bankkarte = document.querySelector("#bankkarte");
let bankschlitz = document.querySelector("#bankschlitz");
let optionen01 = document.querySelector("#optionen01");
let optionen02 = document.querySelector("#optionen02");
let kontoauszug = document.querySelector("#kontoauszug");
let loadedSecret = [];
let lodedGlitchImages = [];
let glitch01Images = [
  "img/CityCenter/Zoom/glitch/bsod.png",
  "img/CityCenter/Zoom/glitch/glitch-bsod01.png",
  "img/CityCenter/Zoom/glitch/glitch-bsod02.png",
  "img/CityCenter/Zoom/glitch/glitch-bsod03.png",
  "img/CityCenter/Zoom/glitch/glitch-bsod04.png",
  "img/CityCenter/Zoom/glitch/glitch-bsod05.png",
  "img/CityCenter/Zoom/glitch/glitch-bsod06.png",
  "img/CityCenter/Zoom/glitch/glitch-bsod07.png",
  "img/CityCenter/Zoom/glitch/glitch-bsod08.png",
  "img/CityCenter/Zoom/glitch/glitch-dos01.png",
  "img/CityCenter/Zoom/glitch/glitch-dos02.png",
  "img/CityCenter/Zoom/glitch/dos.png",
];
let kontoSecretImages = [
  "img/CityCenter/Zoom/CityCenter_Zoom_002_rl.png", 
  "img/CityCenter/Zoom/CityCenter_Zoom_003_rl.png",
  "img/CityCenter/Zoom/CityCenter_Zoom_004_rl.png",
  "img/CityCenter/Zoom/CityCenter_Zoom_005_rl.png",
  "img/CityCenter/Zoom/CityCenter_Zoom_006_rl.png",
];
kontoSecretImages.forEach((e) => {
  let img = new Image();
  img.src = e;
  loadedSecret.push(img);
});

glitch01Images.forEach((e) => {
  let img = new Image();
  img.src = e;
  lodedGlitchImages.push(img);
});


geldBeutel.onclick = () => {
  // secretInnenstadt.style.backgroundImage = "url(img/Bild002/Zoom/CityCenter_Zoom_002_rl.png)";
  secretInnenstadt.style.backgroundImage = `url(${loadedSecret[0].src})`; 
  geldBeutel.style.display = "none";
  bankkarte.style.display = "block";
};
bankkarte.onclick = () => {
  secretInnenstadt.style.backgroundImage = `url(${loadedSecret[1].src})`;
  bankkarte.style.display = "none";
  bankschlitz.style.display = "block";
};
bankschlitz.onclick = () => {
  secretInnenstadt.style.backgroundImage = `url(${loadedSecret[2].src})`;
  bankschlitz.style.display = "none";
  optionen01.style.display = "block";
  optionen02.style.display = "block";
};
optionen01.onclick = () => {
  secretInnenstadt.style.backgroundImage = `url(${loadedSecret[3].src})`
  optionen01.style.display = "none";
  optionen02.style.display = "none";
  kontoauszug.style.display = "block";
  auszugSound.play();
};
let glitchSound = new Pizzicato.Sound("sound/glitch01.mp3");
console.log(glitchSound);
let glitch01 = document.querySelector('#glitch01')
optionen02.onclick = () => {
  console.log("Gerade nicht verfügbar");
  let glitchIndex = 20;
  let glitchInterval = setInterval(() => {
    // console.log(`url(${loadedSecret[Math.floor(Math.random() * lodedGlitchImages.length)].src})`);
    glitchIndex += Math.random() * 100 + 20;
    glitch01.style.backgroundImage = `url(${lodedGlitchImages[Math.floor(Math.random() * lodedGlitchImages.length)].src})`;
    if (Math.random() > 0.95) {
      glitch01.style.backgroundSize = `${Math.floor(Math.random() * 20 + 110)}%`
    };
  }, glitchIndex);
  glitchSound.play(0, Math.floor(Math.random() * 9));
  
  setTimeout(() => {
    clearInterval(glitchInterval);
    glitch01.style.backgroundImage = "none";
    glitchSound.stop();
  }, Math.random() * 1000 + 1000)
};
kontoauszug.onclick = () => {
  secretInnenstadt.style.backgroundImage = `url(${loadedSecret[4].src})`;
  kontoauszug.style.display = "none";
  secretLevelInnenstadtDone = true;
  setTimeout(() => {
    secretInnenstadt.style.display = "none";
  }, 5000);
};

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
