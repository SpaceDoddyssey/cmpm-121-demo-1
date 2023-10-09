import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "SpaceDoddyssey's Spooktacular Clicker";

document.title = gameName;

const skelPrice = 10;
const vampPrice = 100;
const devilPrice = 1000;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//Ghost button and label
const ghostButton = document.createElement("button");
ghostButton.type = "button";
ghostButton.textContent = "👻";
ghostButton.onclick = buttonClick.bind(this, "ghost");

let ghostCount: number = 0;
const ghostCountLabel = document.createElement("div");
const ghostPerSecLabel = document.createElement("div");
ghostPerSecLabel.textContent = "0 ghosts/sec";

app.append(ghostButton);
app.append(ghostCountLabel);
app.append(ghostPerSecLabel);

//Skeleton button and label
const skelButton = document.createElement("button");
skelButton.type = "button";
skelButton.textContent = "💀";
skelButton.disabled = true;
skelButton.onclick = buttonClick.bind(this, "skeleton");

let skelCount: number = 0;
const skelCountLabel = document.createElement("div");
const skelDescLabel = document.createElement("div");
skelDescLabel.textContent = "(10 ghosts, +0.1 ghosts/sec)";

app.append(skelButton);
app.append(skelCountLabel);
app.append(skelDescLabel);

//Vampire button and label
const vampButton = document.createElement("button");
vampButton.type = "button";
vampButton.textContent = "🧛";
vampButton.disabled = true;
vampButton.onclick = buttonClick.bind(this, "vampire");

let vampCount: number = 0;
const vampCountLabel = document.createElement("div");
const vampDescLabel = document.createElement("div");
vampDescLabel.textContent = "(100 ghosts, +2 ghosts/sec)";

app.append(vampButton);
app.append(vampCountLabel);
app.append(vampDescLabel);

//Vampire button and label
const devilButton = document.createElement("button");
devilButton.type = "button";
devilButton.textContent = "😈";
devilButton.disabled = true;
devilButton.onclick = buttonClick.bind(this, "devil");

let devilCount: number = 0;
const devilCountLabel = document.createElement("div");
const devilDescLabel = document.createElement("div");
devilDescLabel.textContent = "(1000 ghosts, +50 ghosts/sec)";

app.append(devilButton);
app.append(devilCountLabel);
app.append(devilDescLabel);

updateButtonText("ghost");
updateButtonText("skeleton");
updateButtonText("vampire");
updateButtonText("devil");

//Function called when you click one of the buttons
function buttonClick(buttonName: string) {
  switch (buttonName) {
    case "ghost":
      ghostCount += 1;
      break;
    case "skeleton":
      skelCount += 1;
      ghostIncreasePerSec += 0.1;
      ghostCount -= skelPrice;
      break;
    case "vampire":
      vampCount += 1;
      ghostIncreasePerSec += 2.0;
      ghostCount -= vampPrice;
      break;
    case "devil":
      devilCount += 1;
      ghostIncreasePerSec += 50.0;
      ghostCount -= devilPrice;
      break;
    default:
      console.error("Clicked a button that doesn't exist? Spooky");
      return;
  }
  ghostPerSecLabel.textContent = `${ghostIncreasePerSec} ghosts/sec`;
  updateButtonText(buttonName);
  checkAndEnableButtons();
}

function updateButtonText(buttonName: string) {
  checkAndEnableButtons();
  let count, label;
  switch (buttonName) {
    case "ghost": {
      const ghostString = `${ghostCount.toFixed(3)} ghosts`;
      ghostCountLabel.textContent = ghostString;
      return;
    }
    case "skeleton": {
      count = skelCount;
      label = skelCountLabel;
      break;
    }
    case "vampire": {
      count = vampCount;
      label = vampCountLabel;
      break;
    }
    case "devil": {
      count = devilCount;
      label = devilCountLabel;
      break;
    }
    default: {
      console.error("updateButtonText called on nonexistent button!");
      return;
    }
  }

  let resultString = `${count} ` + buttonName;
  if (count != 1) {
    resultString += `s`;
  }
  resultString += `!`;
  label.textContent = resultString;
}

//Set ghost amount to increase each frame according to ghostIncreasePerSec
let ghostIncreasePerSec = 0;
let curTime = Date.now();
function perFrameFunction() {
  const prevTime = curTime;
  curTime = Date.now();
  const deltaTimeInMS = curTime - prevTime;

  ghostCount += (ghostIncreasePerSec / 1000) * deltaTimeInMS;
  updateButtonText("ghost");

  requestAnimationFrame(perFrameFunction);
}
requestAnimationFrame(perFrameFunction);

//Checks ghostCount and enables or disables buttons
//that you can/can't afford to press
function checkAndEnableButtons() {
  skelButton.disabled = ghostCount < skelPrice;
  vampButton.disabled = ghostCount < vampPrice;
  devilButton.disabled = ghostCount < devilPrice;
}
