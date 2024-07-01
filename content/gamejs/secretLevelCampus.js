let sound06 = new Pizzicato.Sound("sound/Secret.mp3");
soundGroup.addSound(sound06)

let secretItemsFound = 0;
let loadJSON = async () => {
  const response = await fetch('./gamejs/json/campus.json');
  return await response.json();
}

let initSpecialSecret = () => { }


let initSecretLevel = async () => {
  
  let cityItems = await loadJSON()
  let RotesAuto = new SecretEntry("Auto", 0.660938, 0.70, 400, 200, "screen03", "Das ist ein Secret", null, "Campus");
  let secretCampus = document.querySelector("#secretCampus");

  document.querySelector('.close').onclick = () => {
    fadeOut('#secretCampus')
    secretIsRunning = false
  }
}
initSecretLevel()