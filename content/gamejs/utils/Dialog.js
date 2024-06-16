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
        this.contentIndex = 0
    }

    init = async () => {
        this.dialogsJSON = await this.loadJSON()
        this.loaded = true
    }


    setDialog = (id) => {
        const [key, dialog] = Object.entries(this.dialogsJSON.dialogs).find(([key, dialog]) => dialog.id === id);
        this.content.innerHTML = dialog.contents[this.contentIndex].text
        this.dialogWrapper.classList.add('active')
        this.dialogWrapper.style.opacity = 1

        if (dialog.contents.length <= 1) {
            this.nextButton.style.display = 'none'
        } else {
            this.nextButton.onclick = () => {
                if (this.contentIndex < dialog.contents.length-1) {
                    this.contentIndex++
                    
                    this.content.innerHTML = dialog.contents[this.contentIndex].text
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