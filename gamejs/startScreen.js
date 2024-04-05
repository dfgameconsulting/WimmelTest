//Levelstart Logik

let levelInfo = document.querySelector("#level-info");

let startLevel1 = document.querySelector("#startLevel1");
let startLevel2 = document.querySelector("#startLevel2");
let startLevel3 = document.querySelector("#startLevel3");
let startLevel4 = document.querySelector("#startLevel4");

startLevel1.onclick = (e) => {
  levelInfo.getElementsByTagName("h2")[0].innerHTML = "Innenstadt";
  levelInfo.getElementsByTagName("p")[0].innerHTML = "Das Stadtzentrum glänzt mit einer modernen und futuristischen Ausstrahlung. Hier können Themen wie die Arbeitsagentur, Jobagenturen oder ähnliches platziert werden.";
  document.querySelector("#level2Ready").style.display = "none";
  document.querySelector("#level3Ready").style.display = "none";
  document.querySelector("#level4Ready").style.display = "none";
  document.querySelector("#level1Ready").style.display = "block";
  document.querySelectorAll(".menu-levelcontainer").forEach((e, index) => {
    setTimeout(() => {
      e.classList.remove("highlight");
    }, 300 * (index + 1));
  });
  jumpLevelInfo('#level1Ready');
};
startLevel2.onclick = (e) => {
  levelInfo.getElementsByTagName("h2")[0].innerHTML = "Campus";
  levelInfo.getElementsByTagName("p")[0].innerHTML = "Das Campus-Gebiet muss sich nicht ausschließlich um Studium, Studiumgänge und -arten drehen, sondern kann alles der schulischen Weiterbildung thematisieren: Schulabschlüsse (Quali vs. Mittlere Reife vs. (Fach-)Abitur), Ausbildungen, Praktikumsstellen, usw.";
  document.querySelector("#level2Ready").style.display = "block";
  document.querySelector("#level3Ready").style.display = "none";
  document.querySelector("#level4Ready").style.display = "none";
  document.querySelector("#level1Ready").style.display = "none";
  document.querySelectorAll(".menu-levelcontainer").forEach((e, index) => {
    setTimeout(() => {
      e.classList.remove("highlight");
    }, 300 * (index + 1));
  });
  jumpLevelInfo('#level2Ready');
};
startLevel3.onclick = (e) => {
  levelInfo.getElementsByTagName("h2")[0].innerHTML = "Altstadt";
  levelInfo.getElementsByTagName("p")[0].innerHTML = "Die Altstadt könnte Themen wie handwerkliche Berufe und das Berufsleben in kleinen Geschäften (Verkauf, Bistro, etc.) thematisieren, aber auch freiwilliges Engagement (Feuerwehr, Sozial, und mehr) .Ein gutes Äquivalent zur Inspiration wäre beispielsweise Altperlach (München).";
  document.querySelector("#level2Ready").style.display = "none";
  document.querySelector("#level3Ready").style.display = "block";
  document.querySelector("#level4Ready").style.display = "none";
  document.querySelector("#level1Ready").style.display = "none";
  document.querySelectorAll(".menu-levelcontainer").forEach((e, index) => {
    setTimeout(() => {
      e.classList.remove("highlight");
    }, 300 * (index + 1));
  });
  jumpLevelInfo('#level3Ready');
};
startLevel4.onclick = (e) => {
  levelInfo.getElementsByTagName("h2")[0].innerHTML = "Wohnviertel";
  levelInfo.getElementsByTagName("p")[0].innerHTML = "Im Wohnviertel wird das 'Zuhause' des Spielers dargestellt - oder zumindest von einem Teenager, der genau so gut der Spieler sein könnte. An diesem Ort können Themen wie (das Schreiben von) Bewerbungen, Portfolio-Erstellung Internet-Präsenz und ähnliches aufgenommen werden.";
  document.querySelector("#level2Ready").style.display = "none";
  document.querySelector("#level3Ready").style.display = "none";
  document.querySelector("#level4Ready").style.display = "block";
  document.querySelector("#level1Ready").style.display = "none";
  document.querySelectorAll(".menu-levelcontainer").forEach((e, index) => {
    setTimeout(() => {
      e.classList.remove("highlight");
    }, 300 * (index + 1));
  });
  jumpLevelInfo('#level4Ready');
};

let jumpLevelInfo = (target) => {
  anime({
    targets: target,
    scale: [1,1.2,1],
    rotate: ["-10deg", "10deg", "0deg"],
    duration: 300,
    delay: 800,
    // loop: true,
    easing: "easeInSine",
  });
};
// localStorage.clear();

let level1Ready = document.querySelector("#level1Ready");
level1Ready.onclick = (e) => {
  e.preventDefault();
  console.log("startLevel1");

  anime({
    targets: "#start-screen",
    translateY: ["-100%", 0],
    duration: 500,
    easing: "easeInSine",
    complete: () => {
      window.location.href = "level01.html";
    },
  });
};



// Avatar Bewegung
let avatar = document.querySelector("#avatar");

window.onload = () => {
  anime({
    targets: "#avatar",
    scale: [0.1, 1],
    duration: 1500,
    easing: "easeInOutSine",
    complete: () => {
      // Text etc.
    },
  });
};
setInterval(() => {
  let chooseMove = Math.floor(Math.random() * 2);
  switch (chooseMove) {
    case 0:
      anime({
        targets: "#avatar",
        rotate: [
          { value: "0deg", easing: "easeOutSine", duration: 2000 },
          { value: "-20deg", easing: "easeOutSine", duration: 500 },
          { value: "25deg", easing: "easeInOutQuad", duration: 1200 },
          { value: "0deg", easing: "easeInOutQuad", duration: 500 },
        ],
        easing: "easeInOutSine",
      });
      break;
    case 1:
      anime({
        targets: "#avatar",
        rotateX: [
          { value: "0deg", easing: "easeOutSine", duration: 300 },
          { value: "-30deg", easing: "easeOutSine", duration: 500 },
          { value: "35deg", easing: "easeInOutQuad", duration: 800 },
          { value: "0deg", easing: "easeInOutQuad", duration: 500 },
        ],
        easing: "easeInOutSine",
      });
      break;
    case 2:
      console.log("up");
      break;
    case 3:
      console.log("down");
      break;
  }
}, 5000);

// Berechne Größe für Glossar und Optionen
let mainScreen = document.querySelector("#screen01-image");

let mainScreenPos = mainScreen.getBoundingClientRect();
let mainScreenHeight = mainScreen.bottom - mainScreen.top;
let mainScreenWidth = mainScreen.right - mainScreen.left;
const rMs = document.querySelector(":root");

let resetRatiosStartScreen = () => {
  mainScreenPos = mainScreen.getBoundingClientRect();
  mainScreenHeight = mainScreenPos.bottom - mainScreenPos.top;
  mainScreenWidth = mainScreenPos.right - mainScreenPos.left;

  scaleFactor = Math.floor((mainScreenPos.width + mainScreenPos.height) / 2) / 2000;
  rMs.style.setProperty("--scaleFactor", `scale(${scaleFactor})`);
  rMs.style.setProperty("--rainWidth", mainScreenPos.width);

  rMs.style.setProperty(`--${"level1"}X`, `${mainScreenPos.left + mainScreenWidth * 0.3}px`);
  rMs.style.setProperty(`--${"level1"}Y`, `${mainScreenPos.top + mainScreenHeight * 0.6}px`);
  rMs.style.setProperty(`--${"level2"}X`, `${mainScreenPos.left + mainScreenWidth * 0.6}px`);
  rMs.style.setProperty(`--${"level2"}Y`, `${mainScreenPos.top + mainScreenHeight * 0.4}px`);
  rMs.style.setProperty(`--${"level3"}X`, `${mainScreenPos.left + mainScreenWidth * 0.67}px`);
  rMs.style.setProperty(`--${"level3"}Y`, `${mainScreenPos.top + mainScreenHeight * 0.6}px`);
  rMs.style.setProperty(`--${"level4"}X`, `${mainScreenPos.left + mainScreenWidth * 0.4}px`);
  rMs.style.setProperty(`--${"level4"}Y`, `${mainScreenPos.top + mainScreenHeight * 0.2}px`);
  rMs.style.setProperty(`--infoX`, `${mainScreenPos.left + mainScreenWidth * 0.15}px`);
  rMs.style.setProperty(`--infoY`, `${mainScreenPos.top + mainScreenHeight * 0.2}px`);
};
window.addEventListener("resize", resetRatiosStartScreen);
window.onload = resetRatiosStartScreen;
