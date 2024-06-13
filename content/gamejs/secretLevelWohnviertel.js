let sound06 = new Pizzicato.Sound("sound/Secret.mp3");
let secretItemsFound = 0;
let loadJSON = async () => {
  const response = await fetch('./gamejs/json/campus.json');
  return await response.json();
}

let initSpecialSecret = () => { }


let initSecretLevel = async () => {
  
  let cityItems = await loadJSON()
  let RotesAuto = new SecretEntry("Auto", 0.902813, 0.600463, 300, 200, "screen04", "Das ist ein Secret", null, "Wohnviertel");
  let secretCampus = document.querySelector("#secretWohnviertel");

  document.querySelector('.close').onclick = () => {
    fadeOut('#secretWohnviertel')
    secretIsRunning = false
  }
}
initSecretLevel()