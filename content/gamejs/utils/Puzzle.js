class Puzzle {
    constructor(cards, sizeX, sizeY, cityItemsCount) {
        this.cards = this.shuffle(cards)
        this.sizeX = sizeX
        this.sizeY = sizeY
        this.cityItemsCount = cityItemsCount
        this.activeCard = null
        this.startingIndex = null
        this.active = true
        this.moveCount = 0

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
    }

    init = () => {
        
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
                           secretItemToInventory("Waage", this.cityItemsCount)
                           setTimeout(() => {
                            fadeOut('#secretAltstadt')
                            secretLevelDone = true
                            document.querySelector('#hintCircleSecret').style.display = 'none'
                          }, 1000);
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