

let sound06 = new Pizzicato.Sound("sound/Secret.mp3");
let auszugSound = new Pizzicato.Sound("sound/kontoauszug.mp3");
soundGroup.addSound(sound06)
soundGroup.addSound(auszugSound)

let loadJSON = async () => {
  const response = await fetch('./gamejs/json/innenstadt.json');
  return await response.json();
}

let initSpecialSecret = () => {}
let initSecretLevel = async () => {
  let cityItems = await loadJSON()
  
  let Geldautomat = new SecretEntry("Geldautomat", 0.360938, 0.546759, 0,0, "screen03", "Das ist ein ", "CityCenter/Bild_002/Objekte_ImBild/geldautomat.png", "Innenstadt");

  // Secret Innenstadt Logik

  let secretInnenstadt = document.querySelector("#secretInnenstadt");

  document.querySelector('.close').onclick = () => {
    fadeOut('#secretInnenstadt')
    secretIsRunning = false
  }

  let geldBeutel = document.querySelector("#geldbeutel");
  let bankkarte = document.querySelector("#bankkarte");
  let bankschlitz = document.querySelector("#bankschlitz");
  let optionen01 = document.querySelector("#optionen01");
  let optionen02 = document.querySelector("#optionen02");
  let kontoauszug = document.querySelector("#kontoauszug");
  let loadedSecret = [];
  let loadedGlitchImages = [];
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
    loadedGlitchImages.push(img);
  });


  geldBeutel.onclick = () => {
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
  soundGroup.addSound(glitchSound)
  let glitch01 = document.querySelector('#glitch01')
  optionen02.onclick = () => {

    let glitchIndex = 20;
    let glitchInterval = setInterval(() => {
      glitchIndex += Math.random() * 100 + 20;
      glitch01.style.backgroundImage = `url(${loadedGlitchImages[Math.floor(Math.random() * loadedGlitchImages.length)].src})`;
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
    secretLevelDone = true;
    document.querySelector('#hintCircleSecret').style.display = 'none'
    secretItemToInventory("Kontoauszug", cityItems.itemsCount)
    setTimeout(() => {
      secretInnenstadt.style.display = "none";
    }, 5000);
  };
}
initSecretLevel()