class Dialog {
    constructor() {
        // this.init()
        this.dialogsJSON = null
        this.loaded = false
        this.dialogWrapper = document.querySelector('#dialogWrapper')
        this.content = document.querySelector('#dialogWrapper .content .text')
        this.nextButton = document.querySelector('#dialogWrapper .content .next')
        this.avatar = document.querySelector('#dialogWrapper .avatar')
        this.choiseWrapper = document.querySelector('#dialogWrapper .choise')
        this.stayButton = document.querySelector('#dialogWrapper .choise #stayButton')
        this.leaveButton = document.querySelector('#dialogWrapper .choise #leaveButton')
        this.zyndrellaImg = document.querySelector('#dialogWrapper #zyndrella')
        this.contentIndex = 0
        this.zyndrellaImages = [
            'Zyn-3-rella_Normal_.png',
            'Zyn-3-rella_Talking.png',
            'Zyn-3-rella_Nachdenklich.png'
        ]
    }

    init = async () => {
        this.dialogsJSON = await this.loadJSON()
        console.log(this.dialogsJSON)
        this.loaded = true
    }


    setDialog = async (id) => {
        if (this.dialogsJSON == null) await this.init()

        const [key, dialog] = Object.entries(this.dialogsJSON.dialogs).find(([key, dialog]) => dialog.id === id);
        this.content.innerHTML = dialog.contents[this.contentIndex].text
        this.dialogWrapper.classList.add('active')
        this.dialogWrapper.style.opacity = 1

        if (dialog.contents.length <= 1) {
            this.nextButton.style.display = 'none'
        } else {
            this.nextButton.onclick = () => {
                if (this.contentIndex < dialog.contents.length - 1) {
                    this.contentIndex++

                    this.content.innerHTML = dialog.contents[this.contentIndex].text
                    switch (dialog.contents[this.contentIndex].emotion) {
                        case "normal":
                            this.zyndrellaImg.src = `img/Zyn/${this.zyndrellaImages[0]}`
                            break;
                        case "thoughtfull":
                            this.zyndrellaImg.src = `img/Zyn/${this.zyndrellaImages[2]}`
                            break;
                        case "good-job":
                            this.zyndrellaImg.src = `img/Zyn/${this.zyndrellaImages[1]}`
                            break;
                    }
                }
                else if (this.contentIndex == dialog.contents.length - 1) {
                    this.dialogWrapper.classList.remove('active')
                }
            }
        }

        if (dialog.choice) {
            this.choiseWrapper.classList.add('active')

            this.stayButton.onclick = () => {
                this.dialogWrapper.classList.remove('active')
            }
            this.leaveButton.onclick = () => {
                window.open('index.html', "_self")
            }
        }

        console.log(dialog)
        return dialog;
    }

    loadJSON = async () => {
        const response = await fetch('./gamejs/json/dialog.json');
        return await response.json();
    }
}