
let sound06 = new Pizzicato.Sound("sound/Secret.mp3");

let loadJSON = async () => {
  const response = await fetch('./gamejs/json/innenstadt.json');
  return await response.json();
}

let initSpecialSecret = async () => {
  let cityItems = await loadJSON()
  let cards = [
    {
      id: 1,
      uri: "img/Altstadt/Bild_002/ZoomPuzzle/puzzle_altstadt_sliced_002_01.png",
      current_pos: null,
    },
    {
      id: 2,
      uri: "img/Altstadt/Bild_002/ZoomPuzzle/puzzle_altstadt_sliced_002_02.png",
      current_pos: null,
    },
    {
      id: 3,
      uri: "img/Altstadt/Bild_002/ZoomPuzzle/puzzle_altstadt_sliced_002_03.png",
      current_pos: null,
    },
    {
      id: 4,
      uri: "img/Altstadt/Bild_002/ZoomPuzzle/puzzle_altstadt_sliced_002_04.png",
      current_pos: null,
    },
    {
      id: 5,
      uri: "img/Altstadt/Bild_002/ZoomPuzzle/puzzle_altstadt_sliced_002_05.png",
      current_pos: null,
    },
    {
      id: 6,
      uri: "img/Altstadt/Bild_002/ZoomPuzzle/puzzle_altstadt_sliced_002_06.png",
      current_pos: null,
    },
    {
      id: 7,
      uri: "img/Altstadt/Bild_002/ZoomPuzzle/puzzle_altstadt_sliced_002_07.png",
      current_pos: null,
    },
    {
      id: 8,
      uri: "img/Altstadt/Bild_002/ZoomPuzzle/puzzle_altstadt_sliced_002_08.png",
      current_pos: null,
    },
    {
      id: 9,
      uri: "img/Altstadt/Bild_002/ZoomPuzzle/puzzle_altstadt_sliced_002_09.png",
      current_pos: null,
    },
  
  ]
  let p = new Puzzle(cards, 640 / 3, 480 / 3, cityItems.itemsCount)
  p.init()
}

let initSecretLevel = async () => {
  let Waage = new SecretEntry("Waage", 0.832813, 0.200463, 0, 0, "screen02", "Das ist eine Waage", "Altstadt/Bild_002/Objekte_ImBild/waage.png", "Altstadt");
  let secretAltstadt = document.querySelector("#secretAltstadt");

  document.querySelector('.close').onclick = () => {
    fadeOut('#secretAltstadt')
    secretIsRunning = false
  }
}

initSecretLevel()


// Secret Altstadt Logik


