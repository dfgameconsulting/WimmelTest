class HintCircleObject {
    constructor(name, x, y, place, img, secret = false, scale = 7, containerClass = 'hintCircle') {
      this.name = name;
      this.x = x;
      this.y = y;
      this.place = place;
      this.img = img;
      this.scale = scale
      let div = document.createElement("div");
      this.containerClass = containerClass
  
      div.id = this.name;
      div.onmouseover = () => {
        anime({
          begin: () => {
  
  
            let tl = new anime.timeline();
            tl.add({
              targets: "#hintCircleSecret",
              opacity: [1, 0],
              duration: 1000,
              easing: "easeInOutSine",
            })
          },
          complete: () => {
            document.querySelector('#hintCircleSecret').style.display = 'none'
          }
  
        });
      }
  
      div.className = this.containerClass;
      document.getElementById(place).appendChild(div);
      let pos = this.place === "screen01" ? screen01Pos : this.place == "screen02" ? screen02Pos : this.place == "screen03" ? screen03Pos : screen04Pos;
      r.style.setProperty(`--${this.name}X`, `${pos.left + screen01Width * this.x}px`);
      r.style.setProperty(`--${this.name}Y`, `${pos.top + screen01Height * this.y}px`);
      document.getElementById(this.name).style.cssText = `
      position: absolute;
      width: var(--size);
      height: var(--size);
      left: var(--${this.name}X);
      top: var(--${this.name}Y); 
      background-image: url(img/objects/${this.img});
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      transform: scale(${this.scale});
      ${!secret ? 'opacity: 0' : ''};
      `;
      objects.push(this);
    }
  }