const app = new PIXI.Application({ backgroundAlpha: 0, resizeTo: window , autoResize: true});

let rain = document.querySelector("#rain");

rain.appendChild(app.view);

let rainDrops = [];

var sound05 = new Pizzicato.Sound("sound/rain_loop.mp3");

sound05.on("stop", function () {
  sound05.play();
});

function createRainDrops() {
  rainDrops = [];
  for (i = 0; i < 2000; i++) {
    rainDrops[i] = new PIXI.Sprite.from("img/rain-drop.png");
    rainDrops[i].anchor.set(0.5);
    rainDrops[i].width = random() * 2 + 1;
    rainDrops[i].height = random() * 10 + 10;
    rainDrops[i].rotation = 0.1;
    rainDrops[i].alpha = 0.5;
    rainDrops[i].x = Math.random() * app.screen.width;
    rainDrops[i].y = Math.random() * app.screen.height;
    app.stage.addChild(rainDrops[i]);
  }
  sound05.pause();
  sound05.play();
}

createRainDrops();

window.addEventListener("resize", () => {
  for (j = 0; j < rainDrops.length; j++) {
    rainDrops[j].destroy();
  }
  createRainDrops();
});

app.ticker.add(() => {
  animateRain();
});

function animateRain() {
  for (j = 0; j < rainDrops.length; j++) {
    rainDrops[j].y += 12;
    rainDrops[j].x -= 0.2;
    if (rainDrops[j].y >= app.screen.height) {
      rainDrops[j].y = 0 - Math.random() * app.screen.height;
      rainDrops[j].x = Math.random() * app.screen.width;
    }
    if (rainDrops[j].x <= 0) {
      rainDrops[j].x = app.screen.width;
    }
  }
}
