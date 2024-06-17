class PickObject {
  constructor(name, label, x, y, place, text, img, invImg, secretId, itemsCounts, secret = false) {
    this.name = name;
    this.label = label;
    this.x = x;
    this.y = y;
    this.place = place;
    this.text = text;
    this.img = img;
    this.wasFound = false;
    this.invImg = invImg;
    this.secret = secret;
    this.secretId = secretId
    this.itemsCounts = itemsCounts

    this.imgProxy = new Image();
    this.imgProxy.src = "img/" + this.img;
    this.imgProxy.onload = () => {
      this.w = this.imgProxy.width;
      this.h = this.imgProxy.height;
      setTimeout(() => {
        this.render();
      }, 300);
    };
  }

  render() {
    let div = null
    if (!this.secret) {
      div = document.createElement('div');
      div.id = this.name;
      div.className = 'pickObject';
      document.getElementById(this.place).appendChild(div);
    } else {
      div = document.querySelector(`#${this.name}`)
    }
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
      ${!this.secret ? `transform: translate(0%, 0%) var(--scaleFactorObjects)` : ''};
      ${!this.secret ? `background-image: url(img/${this.img})` : ''};
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;`;

    let divInventory = document.createElement("div");
    divInventory.id = this.name + "Inventory";
    divInventory.className = "inventoryObject";
    let inventoryWrapper = document.getElementById(`inventory-wrapper${this.place.slice(-2)}`);
    inventoryWrapper.appendChild(divInventory);
    divInventory.style.cssText = `
        height: var(--inventorySize);
        width: var(--inventorySize);
        background-image: url(img/${this.invImg});
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        filter: brightness(0.1) sepia(1) opacity(0.3);`;

    div.onclick = () => {
      if (isRunning) return;
      anime({
        begin: () => {
          /**
           * isRunning is a global variabel
           * This is more or less a ugly hack. Please spent more time to OOP
           */
          isRunning = true;
          this.wasFound = true;
          // GameManager!
          localStorage.setItem(this.name, "true");
          let tl = new anime.timeline();
          tl.add({
            begin: () => {
              document.querySelector('#foundInfo').innerHTML = this.label.replace(/_/g, ' ') + " gefunden!";
              if (this.secret) {
                /**
                 * secretItemsFound is a global variabel
                 * This is more or less a ugly hack. Please spent more time to OOP
                 */
                secretItemsFound++
                foundAllSecrets(this.secretId)
              }
            },
            targets: "#options-info",
            opacity: [0, 1],
            duration: 500,
            easing: "easeInOutSine",
          }).add({
            duration: 1000,
          }).add({
            targets: "#options-info",
            opacity: [1, 0],
            duration: 500,
            easing: "easeInOutSine",
          })

        },
        targets: "#" + this.name,
        scale: [1.5, 1, 0.01],
        translate: "-33% -33%",
        transformOrigin: "50% 50%",
        easing: "linear",
        duration: 500,
        complete: () => {
          sound01.play();
          let index = objects.indexOf(this);

          objectCopy.push(...objects.splice(index, 1));

          document.getElementById(this.name).remove();
          /**
           * isRunning is a global variabel
           * This is more or less a ugly hack. Please spent more time to OOP
           */
          isRunning = false;
          anime({
            targets: `#${this.name + "Inventory"}`,
            filter: ["brightness(0.1) sepia(1) opacity(0.3)", "brightness(1) sepia(0) opacity(1)"],
            scale: [0.9, 1.3, 1],
            easing: "easeInOutExpo",
            duration: 300,
            complete: () => {

              checkAllObjectsFound(this.itemsCounts);
            },
          });
        },
      });
    };

    objects.push(this);
  }
}