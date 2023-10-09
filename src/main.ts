import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Cameron's Halloween Clicker";

document.title = gameName;

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

app.append(ghostButton);
app.append(ghostCountLabel);

//Skeleton button and label
const skelButton = document.createElement("button");
skelButton.type = "button";
skelButton.textContent = "💀";
skelButton.disabled = true;
skelButton.onclick = buttonClick.bind(this, "skeleton");
const skelPrice = 10;

let skelCount: number = 0;
const skelCountLabel = document.createElement("div");
updateButtonText("skeleton");

app.append(skelButton);
app.append(skelCountLabel);

updateButtonText("ghost");

//Function called when you click one of the buttons
const ghostClickAmount = 1;
const skelClickAmount = 1;
function buttonClick(button: string) {
  switch (button) {
    case "ghost":
      ghostCount += ghostClickAmount;
      updateButtonText("ghost");
      break;
    case "skeleton":
      skelCount += skelClickAmount;
      ghostIncreasePerSec++;
      ghostCount -= skelPrice;
      updateButtonText("skeleton");
      break;
    default:
      console.log("Clicked a button that doesn't exist? Spooky");
  }
  checkAndEnableButtons();
}

function updateButtonText(button: string) {
  checkAndEnableButtons();
  switch (button) {
    case "ghost": {
      const ghostString = `${ghostCount.toFixed(3)} ghosts`;
      ghostCountLabel.textContent = ghostString;
      break;
    }
    case "skeleton": {
      let skelString = `${skelCount} skeleton`;
      if (skelCount != 1) {
        skelString += `s`;
      }
      skelString += `!`;
      skelCountLabel.textContent = skelString;
      break;
    }
    default:
  }
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

//This function checks variables (currently only ghostCount)
//and enables or disables buttons that you can/can't afford to press
function checkAndEnableButtons() {
  if (ghostCount < skelPrice) {
    skelButton.disabled = true;
  } else {
    skelButton.disabled = false;
  }
}
