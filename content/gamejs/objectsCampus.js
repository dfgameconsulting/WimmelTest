let objects = [];
let secrets = [];
let isRunning = false;
let locationId = null;

document.addEventListener("DOMContentLoaded", function () {

});

var sound01 = new Pizzicato.Sound("sound/VUMark_complete.mp3");
var sound02 = new Pizzicato.Sound("sound/Button_Normal.mp3");
var sound04 = new Pizzicato.Sound("sound/Sterne.mp3");
let soundGroup = new Pizzicato.Group([sound01, sound02, sound04])

let startGame = async () => {
  blurAll();

  let loadJSON = async () => {
    const response = await fetch('./gamejs/json/campus.json');
    return await response.json();
  }


  let cityItems = await loadJSON()

  locationId = cityItems.id
  
  cityItems.screens.forEach(screen => {
    checkAllObjectsFound(cityItems.itemsCount)

    screen.items.forEach(item => {
      let a = new PickObject(item.id, item.label, item.x, item.y, screen.id, item.description, (screen.pathImages + item.image), (screen.pathInventory + item.image), cityItems.secretId, cityItems.itemsCount, item.secret ? item.secret : false)
    });
  });

  closeLevel(cityItems.itemsCount)

  let secretHint = new HintCircleObject("hintCircleSecret", 0.660938, 0.70, "screen03", "BIB001_Stadt_Hinweiskreis_04_ll.png", true, 1, '')
  secretHintAnimation()

  resetRatios()

  hints()
};