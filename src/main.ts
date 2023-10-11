import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "SpaceDoddyssey's Spooktacular Clicker";

document.title = gameName;

const priceMultiplier = 1.15;

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

interface shopItem {
  name: string;
  ID: number;
  symbol: string;
  cost: number;
  rate: number;
  count: number;
}

const availableItems: shopItem[] = [
  {
    name: "skeleton",
    ID: 0,
    symbol: "💀",
    cost: 10,
    rate: 0.1,
    count: 0,
  },
  {
    name: "vampire",
    ID: 1,
    symbol: "🧛",
    cost: 100,
    rate: 2.0,
    count: 0,
  },
  {
    name: "devil",
    ID: 2,
    symbol: "😈",
    cost: 1000,
    rate: 50.0,
    count: 0,
  },
];
const buttons: HTMLButtonElement[] = [];
const countLabels: HTMLDivElement[] = [];
const descLabels: HTMLDivElement[] = [];

availableItems.forEach((item) => {
  const button = document.createElement("button");
  buttons.push(button);
  button.type = "button";
  button.textContent = item.symbol;
  button.disabled = true;
  button.addEventListener("click", buttonClick.bind(globalThis, item.name));

  const countLabel = document.createElement("div");
  countLabels.push(countLabel);
  const descLabel = document.createElement("div");
  descLabels.push(descLabel);

  countLabel.textContent = `0 ${item.name}s!`;
  descLabel.textContent = `(${item.cost} ghosts, +${item.rate} ghosts/sec)`;

  app.append(button);
  app.append(countLabel);
  app.append(descLabel);
});

updateButtonText("ghost");
updateButtonText("skeleton");
updateButtonText("vampire");
updateButtonText("devil");

//Function called when you click one of the buttons
function buttonClick(buttonName: string) {
  let ID = -1;
  switch (buttonName) {
    case "ghost":
      ghostCount += 1;
      updateButtonText(buttonName);
      checkAndEnableButtons();
      return;
    case "skeleton":
      ID = 0;
      break;
    case "vampire":
      ID = 1;
      break;
    case "devil":
      ID = 2;
      break;
    default:
      console.error("Clicked a button that doesn't exist? Spooky");
      return;
  }
  const item = availableItems[ID];
  item.count += 1;
  ghostCount -= item.cost;
  item.cost *= priceMultiplier;
  item.cost = numberRounder(item.cost, 3);
  descLabels[
    item.ID
  ].textContent = `(${item.cost} ghosts, +${item.rate} ghosts/sec)`;

  ghostIncreasePerSec += item.rate;
  ghostIncreasePerSec = numberRounder(ghostIncreasePerSec, 3);
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
      count = availableItems[0].count;
      label = countLabels[0];
      break;
    }
    case "vampire": {
      count = availableItems[1].count;
      label = countLabels[1];
      break;
    }
    case "devil": {
      count = availableItems[2].count;
      label = countLabels[2];
      break;
    }
    default: {
      console.error("updateButtonText called on nonexistent button!");
      return;
    }
  }

  count = availableItems[0].count;
  label = countLabels[0];
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
  for (let i = 0; i < availableItems.length; i++) {
    buttons[i].disabled = ghostCount < availableItems[i].cost;
  }
}

function numberRounder(val: number, numPlaces: number): number {
  const mul = 10 ** numPlaces;
  return Math.round(val * mul) / mul;
}
