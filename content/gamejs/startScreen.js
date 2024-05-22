//Levelstart Logik

let activeElement = null
let levelInfo = document.querySelector("#level-info");

let body = document.querySelector("body")
let startLevel1 = document.querySelector("#startLevel1");
let startLevel2 = document.querySelector("#startLevel2");
let startLevel3 = document.querySelector("#startLevel3");
let startLevel4 = document.querySelector("#startLevel4");

startLevel1.onclick = (e) => {
  e.stopPropagation()
  console.log(e)
  setActiveElement(e.target)

  levelInfo.getElementsByTagName("h2")[0].innerHTML = "Stadtzentrum";
  levelInfo.getElementsByTagName("p")[0].innerHTML = "Es geht um sehr unterschiedliche Problemlagen und Schwierigkeiten. Aber vielmehr um Angebote der Hilfe und Unterstützung. Bitte geh in diesen Stadtteil nur, wenn über 16 Jahre alt bist und es dir gerade gut geht oder du in guter Gesellschaft bist!";
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
  levelInfo.style.display = 'block'
  rMs.style.setProperty(`--infoX`, `${mainScreenPos.left + mainScreenWidth * 0.7}px`);
  rMs.style.setProperty(`--infoY`, `${mainScreenPos.top + mainScreenHeight * 0.3}px`);
};
startLevel2.onclick = (e) => {

  setActiveElement(e.target)

  levelInfo.getElementsByTagName("h2")[0].innerHTML = "Campus";
  levelInfo.getElementsByTagName("p")[0].innerHTML = "Es geht ums Studieren: Finanzierung, Wohnen, Schwierigkeiten und das Studieren unter besonders herausfordernden Bedingungen.";
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
  levelInfo.style.display = 'block'
  rMs.style.setProperty(`--infoX`, `${mainScreenPos.left + mainScreenWidth * 0.325}px`);
  rMs.style.setProperty(`--infoY`, `${mainScreenPos.top + mainScreenHeight * 0.3}px`);
};
startLevel3.onclick = (e) => {

  setActiveElement(e.target)

  levelInfo.getElementsByTagName("h2")[0].innerHTML = "Altstadt";
  levelInfo.getElementsByTagName("p")[0].innerHTML = "Es geht um Ausbildungen: Welche Rechte und Pflichten habe ich? Welche finanzielle Unterstützung gibt es trotz Gehalt? Wer hilft bei Schwierigkeiten mit den Inhalten oder im Betrieb? Und vieles mehr.";
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
  levelInfo.style.display = 'block'
  rMs.style.setProperty(`--infoX`, `${mainScreenPos.left + mainScreenWidth * 0.65}px`);
  rMs.style.setProperty(`--infoY`, `${mainScreenPos.top + mainScreenHeight * 0.6}px`);
};
startLevel4.onclick = (e) => {

  setActiveElement(e.target)

  levelInfo.getElementsByTagName("h2")[0].innerHTML = "Wohnviertel";
  levelInfo.getElementsByTagName("p")[0].innerHTML = "Es geht ums Erwachsenwerden: Selbstständigkeit, die erste eigene Wohnung, Versicherungen, Gefühle, Skills und und und...";
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
  levelInfo.style.display = 'block'
  rMs.style.setProperty(`--infoX`, `${mainScreenPos.left + mainScreenWidth * 0.175}px`);
  rMs.style.setProperty(`--infoY`, `${mainScreenPos.top + mainScreenHeight * 0.5}px`);
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
let level2Ready = document.querySelector("#level2Ready");
level2Ready.onclick = (e) => {
  e.preventDefault();
  console.log("startLevel1");

  anime({
    targets: "#start-screen",
    translateY: ["-100%", 0],
    duration: 500,
    easing: "easeInSine",
    complete: () => {
      window.location.href = "level02.html";
    },
  });
};
let level3Ready = document.querySelector("#level3Ready");
level3Ready.onclick = (e) => {
  e.preventDefault();
  console.log("startLevel1");

  anime({
    targets: "#start-screen",
    translateY: ["-100%", 0],
    duration: 500,
    easing: "easeInSine",
    complete: () => {
      window.location.href = "level03.html";
    },
  });
};
let level4Ready = document.querySelector("#level4Ready");
level4Ready.onclick = (e) => {
  e.preventDefault();
  console.log("startLevel1");

  anime({
    targets: "#start-screen",
    translateY: ["-100%", 0],
    duration: 500,
    easing: "easeInSine",
    complete: () => {
      window.location.href = "level04.html";
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

  scaleFactor = Math.floor((mainScreenPos.width + mainScreenPos.height) / 2) / 2500;

  rMs.style.setProperty("--scaleFactor", `scale(${scaleFactor})`);
  rMs.style.setProperty("--rainWidth", mainScreenPos.width);

  rMs.style.setProperty(`--${"level1"}X`, `${mainScreenPos.left + mainScreenWidth * 0.7}px`);
  rMs.style.setProperty(`--${"level1"}Y`, `${mainScreenPos.top + mainScreenHeight * 0.35}px`);
  rMs.style.setProperty(`--${"level2"}X`, `${mainScreenPos.left + mainScreenWidth * 0.35}px`);
  rMs.style.setProperty(`--${"level2"}Y`, `${mainScreenPos.top + mainScreenHeight * 0.3}px`);
  rMs.style.setProperty(`--${"level3"}X`, `${mainScreenPos.left + mainScreenWidth * 0.67}px`);
  rMs.style.setProperty(`--${"level3"}Y`, `${mainScreenPos.top + mainScreenHeight * 0.6}px`);
  rMs.style.setProperty(`--${"level4"}X`, `${mainScreenPos.left + mainScreenWidth * 0.2}px`);
  rMs.style.setProperty(`--${"level4"}Y`, `${mainScreenPos.top + mainScreenHeight * 0.5}px`);
  rMs.style.setProperty(`--infoX`, `${mainScreenPos.left + mainScreenWidth * 0.15}px`);
  rMs.style.setProperty(`--infoY`, `${mainScreenPos.top + mainScreenHeight * 0.3}px`);
};

let setActiveElement = (target) => {
  if(activeElement !== null){
    activeElement.style.display = 'flex'
  }
  if(target.localName == "p"){
    activeElement = target.parentElement
  }else{
    activeElement = target
  }
  activeElement.style.display = 'none'
}

window.addEventListener("resize", resetRatiosStartScreen);
window.onload = resetRatiosStartScreen;
