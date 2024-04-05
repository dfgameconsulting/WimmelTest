// Kategorien und Info Anzeige
let unterKat = document.querySelector("#unter-kat");
let infoKat = document.querySelector("#info-kat");

let studiumDiv = document.querySelector("#studium");
let ausbildungDiv = document.querySelector("#ausbildung");
let herausforderungenDiv = document.querySelector("#herausforderungen");
let erwachsenDiv = document.querySelector("#erwachsen");
let sortDiv = document.querySelector("#sort");

let glossarButton = document.querySelector("#options-glossar");
glossarButton.onclick = () => {
  addGlossarToHTML();
};

// Kategorien Logik
sortDiv.onclick = () => {
  sortDiv.innerHTML = "A-Z";
  sortDiv.style.background = "white";
  unterKat.innerHTML = `
<div class="unterKat" id="erwachsen-auszug-click"><p>auszug</p></div>
<div class="unterKat" id="erwachsen-emotionen-click"><p>emotionen</p></div>
<div class="unterKat" id="ausbildung-finanzierung-click"><p>finanzierung</p></div>
<div class="unterKat" id="studium-finanzierung-click"><p>finanzierung</p></div>
<div class="unterKat" id="ausbildung-gesundheit-click"><p>gesundheit</p></div>
<div class="unterKat" id="herausforderungen-gesundheit-click"><p>gesundheit</p></div>
<div class="unterKat" id="ausbildung-herausforderung-click"><p>herausforderung</p></div>
<div class="unterKat" id="studium-herausforderung-click"><p>herausforderung</p></div>
<div class="unterKat" id="erwachsen-kompetenzen-click"><p>kompetenzen</p></div>
<div class="unterKat" id="studium-lernen-click"><p>lernen</p></div>
<div class="unterKat" id="herausforderungen-schulden-click"><p>schulden</p></div>
<div class="unterKat" id="erwachsen-selbstfindung-click"><p>selbstfindung</p></div>
<div class="unterKat" id="herausforderungen-sucht-click"><p>sucht</p></div>
<div class="unterKat" id="herausforderungen-verlust-click"><p>verlust</p></div>
<div class="unterKat" id="ausbildung-vorbereitung-click"><p>vorbereitung</p></div>
<div class="unterKat" id="studium-vorbereitung-click"><p>vorbereitung</p></div>`;
  document.querySelector("#studium-vorbereitung-click").onclick = () => {
    document.querySelector("#studium-vorbereitung").scrollIntoView({ behavior: "smooth" });
  };
  document.querySelector("#studium-finanzierung-click").onclick = () => {
    document.querySelector("#studium-finanzierung").scrollIntoView({ behavior: "smooth" });
  };
  document.querySelector("#studium-lernen-click").onclick = () => {
    document.querySelector("#studium-lernen").scrollIntoView({ behavior: "smooth" });
  };
  document.querySelector("#studium-herausforderung-click").onclick = () => {
    document.querySelector("#studium-herausforderung").scrollIntoView({ behavior: "smooth" });
  };
  document.querySelector("#ausbildung-vorbereitung-click").onclick = () => {
    document.querySelector("#ausbildung-vorbereitung").scrollIntoView({ behavior: "smooth" });
  };
  document.querySelector("#ausbildung-finanzierung-click").onclick = () => {
    document.querySelector("#ausbildung-finanzierung").scrollIntoView({ behavior: "smooth" });
  };
  document.querySelector("#ausbildung-gesundheit-click").onclick = () => {
    document.querySelector("#ausbildung-gesundheit").scrollIntoView({ behavior: "smooth" });
  };
  document.querySelector("#ausbildung-herausforderung-click").onclick = () => {
    document.querySelector("#ausbildung-herausforderung").scrollIntoView({ behavior: "smooth" });
  };
  document.querySelector("#herausforderungen-sucht-click").onclick = () => {
    document.querySelector("#herausforderungen-sucht").scrollIntoView({ behavior: "smooth" });
  };
  document.querySelector("#herausforderungen-schulden-click").onclick = () => {
    document.querySelector("#herausforderungen-schulden").scrollIntoView({ behavior: "smooth" });
  };
  document.querySelector("#herausforderungen-verlust-click").onclick = () => {
    document.querySelector("#herausforderungen-verlust").scrollIntoView({ behavior: "smooth" });
  };
  document.querySelector("#herausforderungen-gesundheit-click").onclick = () => {
    document.querySelector("#herausforderungen-gesundheit").scrollIntoView({ behavior: "smooth" });
  };
  document.querySelector("#erwachsen-auszug-click").onclick = () => {
    document.querySelector("#erwachsen-auszug").scrollIntoView({ behavior: "smooth" });
  };
  document.querySelector("#erwachsen-emotionen-click").onclick = () => {
    document.querySelector("#erwachsen-emotionen").scrollIntoView({ behavior: "smooth" });
  };
  document.querySelector("#erwachsen-selbstfindung-click").onclick = () => {
    document.querySelector("#erwachsen-selbstfindung").scrollIntoView({ behavior: "smooth" });
  };
  document.querySelector("#erwachsen-kompetenzen-click").onclick = () => {
    document.querySelector("#erwachsen-kompetenzen").scrollIntoView({ behavior: "smooth" });
  };
};

studiumDiv.onclick = () => {
  sortDiv.innerHTML = "Studium";
  sortDiv.style.background = "red";
  unterKat.innerHTML = `
<div class="unterKat" id="studium-vorbereitung-click"><p>vorbereitung</p></div>
<div class="unterKat" id="studium-finanzierung-click"><p>finanzierung</p></div>
<div class="unterKat" id="studium-lernen-click"><p>lernen</p></div>
<div class="unterKat" id="studium-herausforderung-click"><p>herausforderung</p></div>`;
  document.querySelector("#studium-vorbereitung-click").onclick = () => {
    document.querySelector("#studium-vorbereitung").scrollIntoView({ behavior: "smooth" });
  };
  document.querySelector("#studium-finanzierung-click").onclick = () => {
    document.querySelector("#studium-finanzierung").scrollIntoView({ behavior: "smooth" });
  };
  document.querySelector("#studium-lernen-click").onclick = () => {
    document.querySelector("#studium-lernen").scrollIntoView({ behavior: "smooth" });
  };
  document.querySelector("#studium-herausforderung-click").onclick = () => {
    document.querySelector("#studium-herausforderung").scrollIntoView({ behavior: "smooth" });
  };
};

ausbildungDiv.onclick = () => {
  sortDiv.innerHTML = "Ausbildung";
  sortDiv.style.background = "yellow";
  unterKat.innerHTML = `
<div class="unterKat" id="ausbildung-vorbereitung-click"><p>vorbereitung</p></div>
<div class="unterKat" id="ausbildung-finanzierung-click"><p>finanzierung</p></div>
<div class="unterKat" id="ausbildung-gesundheit-click"><p>gesundheit</p></div>
<div class="unterKat" id="ausbildung-herausforderung-click"><p>herausforderung</p></div>`;
  document.querySelector("#ausbildung-vorbereitung-click").onclick = () => {
    document.querySelector("#ausbildung-vorbereitung").scrollIntoView({ behavior: "smooth" });
  };
  document.querySelector("#ausbildung-finanzierung-click").onclick = () => {
    document.querySelector("#ausbildung-finanzierung").scrollIntoView({ behavior: "smooth" });
  };
  document.querySelector("#ausbildung-gesundheit-click").onclick = () => {
    document.querySelector("#ausbildung-gesundheit").scrollIntoView({ behavior: "smooth" });
  };
  document.querySelector("#ausbildung-herausforderung-click").onclick = () => {
    document.querySelector("#ausbildung-herausforderung").scrollIntoView({ behavior: "smooth" });
  };
};

herausforderungenDiv.onclick = () => {
  sortDiv.innerHTML = "Herausforderungen";
  sortDiv.style.background = "blue";
  unterKat.innerHTML = `
<div class="unterKat" id="herausforderungen-sucht-click"><p>sucht</p></div>
<div class="unterKat" id="herausforderungen-schulden-click"><p>schulden</p></div>
<div class="unterKat" id="herausforderungen-verlust-click"><p>verlust</p></div>
<div class="unterKat" id="herausforderungen-gesundheit-click"><p>gesundheit</p></div>`;
  document.querySelector("#herausforderungen-sucht-click").onclick = () => {
    document.querySelector("#herausforderungen-sucht").scrollIntoView({ behavior: "smooth" });
  };
  document.querySelector("#herausforderungen-schulden-click").onclick = () => {
    document.querySelector("#herausforderungen-schulden").scrollIntoView({ behavior: "smooth" });
  };
  document.querySelector("#herausforderungen-verlust-click").onclick = () => {
    document.querySelector("#herausforderungen-verlust").scrollIntoView({ behavior: "smooth" });
  };
  document.querySelector("#herausforderungen-gesundheit-click").onclick = () => {
    document.querySelector("#herausforderungen-gesundheit").scrollIntoView({ behavior: "smooth" });
  };
};

erwachsenDiv.onclick = () => {
  sortDiv.innerHTML = "Erwachsen werden";
  sortDiv.style.background = "green";
  unterKat.innerHTML = `
<div class="unterKat" id="erwachsen-auszug-click"><p>auszug</p></div>
<div class="unterKat" id="erwachsen-kompetenzen-click"><p>kompetenzen</p></div>
<div class="unterKat" id="erwachsen-emotionen-click"><p>emotionen</p></div>
<div class="unterKat" id="erwachsen-selbstfindung-click"><p>selbstfindung</p></div>`;
  document.querySelector("#erwachsen-auszug-click").onclick = () => {
    document.querySelector("#erwachsen-auszug").scrollIntoView({ behavior: "smooth" });
  };
  document.querySelector("#erwachsen-emotionen-click").onclick = () => {
    document.querySelector("#erwachsen-emotionen").scrollIntoView({ behavior: "smooth" });
  };
  document.querySelector("#erwachsen-selbstfindung-click").onclick = () => {
    document.querySelector("#erwachsen-selbstfindung").scrollIntoView({ behavior: "smooth" });
  };
  document.querySelector("#erwachsen-kompetenzen-click").onclick = () => {
    document.querySelector("#erwachsen-kompetenzen").scrollIntoView({ behavior: "smooth" });
  };
};

let addGlossarToHTML = function () {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          //addGlossarToHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
};
