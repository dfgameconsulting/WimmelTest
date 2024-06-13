class SecretEntry {
    constructor(name, x, y, w, h, place, text, img, location) {
      this.name = name;
      this.x = x;
      this.y = y;
      this.place = place;
      this.text = text;
      this.img = img;
      this.wasFound = false;
      this.location = location
      if(this.img != null){
        this.imgProxy = new Image();
        this.imgProxy.src = "img/" + this.img;
        this.imgProxy.onload = () => {
          this.w = this.imgProxy.width;
          this.h = this.imgProxy.height;
          setTimeout(() => {
            this.render();
          }, 500);
        };
      }else{
        this.w = w
        this.h = h
        setTimeout(() => {
          this.render();
        }, 500);
      }
      
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
      ${this.img != null ? `background-image: url(img/${this.img});` : ""}
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      `;
      
  
      secrets.push(this);
  
  
      div.onmouseleave = () => {
        if (secretLevelDone || secretIsRunning) return
        anime({
          begin: () => {
  
            document.querySelector('#hintCircleSecret').style.display = 'block'
            let tl = new anime.timeline();
            tl.add({
              targets: "#hintCircleSecret",
              opacity: [0, 1],
              duration: 1000,
              easing: "easeInOutSine",
            })
          }
        });
      }
      div.onclick = () => {
        if (lupeAus) return;
        if (secretLevelDone) return;
        initSpecialSecret()
        fadeIn(`#secret${this.location}`);
        secretIsRunning = true;
        document.body.style.cursor = "auto";
        lupeAus = !lupeAus;
        sound06.play();
      };
    }
  }