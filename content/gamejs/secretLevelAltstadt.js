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
      document.body.style.cursor = "url(img/inventar/LupeCursor.svg), auto";
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



    // Inventory

    secrets.push(this);

    div.onclick = () => {
      if (lupeAus) return;
      if (secretLevelAltstadtDone) return;
      //   fadeIn("#backgroundDark");
      let p = new Puzzle(cards, 640/3, 480/3)
      p.init()
      fadeIn("#secretAltstadt");
      document.body.style.cursor = "auto";
      lupeAus = !lupeAus;
      sound06.play();
    };
  }
  // Suchbild
}
let sound06 = new Pizzicato.Sound("sound/Secret.mp3");

Waage = new secretEntry("Waage", 0.832813, 0.200463, "screen02", "Das ist eine Waage", "Altstadt/Bild_002/Objekte_ImBild/waage.png");

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

class Puzzle {
    constructor(cards, sizeX, sizeY) {
        this.cards = this.shuffle(cards)
        this.cardPositions = [
            {
                top: 0,
                left: 0
            },
            {
                top: 0,
                left: 100/3
            },
            {
                top: 0,
                left: 100/3*2
            },
            {
                top: 100/3,
                left: 0
            },
            {
                top: 100/3,
                left: 100/3
            },
            {
                top: 100/3,
                left: 100/3*2
            },
            {
                top: 100/3*2,
                left: 0
            },
            {
                top: 100/3*2,
                left: 100/3
            },
            {
                top: 100/3*2,
                left: 100/3*2
            },

        ]
        this.sizeX = sizeX
        this.sizeY = sizeY
        this.activeCard = null
        this.startingIndex = null
        this.active = true
        this.moveCount = 0
    }

    init = () => {
        console.log("Init puzzle")
        
        this.cards.forEach((card, index) => {
            let div = document.createElement('div')
            div.id = "f" + card.id;
            div.setAttribute("data-id", card.id)
            div.className = "card"
            div.style.width = 100/3+'%';
            div.style.height = 100/3+'%';
            div.style.backgroundImage = "url("+card.uri+")"
            div.style.top = this.cardPositions[index].top+'%'
            div.style.left = this.cardPositions[index].left+'%'
            // div.textContent = card.id
            div.style.textAlign = "center"
            div.style.fontSize = 20
            div.style.color = "#fff"
            div.style.verticalAlign = "middle"


            div.onclick = (e) => {
                if(!this.active) return

                if (this.activeCard !== null) {

                    let a = this.findIndex(this.cards, e.target)

                    if (e.target == this.activeCard) {
                        this.activeCard.classList.remove("active")
                        this.activeCard = null
                        this.startingIndex = null
                    }
                    else if (
                        this.startingIndex == (a + 1) ||
                        this.startingIndex == (a - 1) ||
                        this.startingIndex == (a + 3) ||
                        this.startingIndex == (a - 3)
                    ) {
                        let pos = {
                            top: e.target.style.top,
                            left: e.target.style.left
                        }
                        e.target.style.top = this.activeCard.style.top
                        e.target.style.left = this.activeCard.style.left

                        this.activeCard.style.top = pos.top
                        this.activeCard.style.left = pos.left

                        e.target.classList.remove("active")
                        this.activeCard.classList.remove("active")

                        this.switchIndexes(this.cards, this.startingIndex, a)
                        this.activeCard = null
                        this.startingIndex = null
                        this.moveCount++
                        if(this.checkIfFinished(this.cards)){
                            this.active = false
                           console.log("YOU WIN!!!")
                        }
                    }

                } else {
                    e.target.classList.add("active")
                    this.activeCard = e.target
                    this.startingIndex = this.findIndex(this.cards, e.target)
                }
            }

            document.getElementById("puzzle_wrapper").appendChild(div)
        });
        

    }

    findIndex = (arr, target) => {
        return arr.findIndex((element) => {
            return "f" + element.id == target.id
        })
    }

    shuffle = (array) => {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array
    }

    switchIndexes = (arr, i, j) => {
        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
    }

    checkIfFinished = (arr) => {
        let done = true
        arr.forEach((element, index) => {
            if(element.id !== (index+1)){
                done = false
            }
        })
        return done
    }
}






// //it's a best practice to set the lesson status to incomplete when
// //first launching the course (if the course is not already completed)
// var completionStatus = ScormProcessGetValue("cmi.core.lesson_status");
// if (completionStatus == "not attempted"){
//     ScormProcessSetValue("cmi.core.lesson_status", "incomplete");
// }

