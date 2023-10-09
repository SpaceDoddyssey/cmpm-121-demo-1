import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Cameron's Halloween Clicker";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const ghostButton = document.createElement("button");
ghostButton.type = "button";
ghostButton.textContent = "👻";
ghostButton.onclick = ghostButtonClick.bind(this);

let ghostCount: number = 0;
const ghostCountLabel = document.createElement("div");
updateGhostButtonText();

app.append(ghostButton);
app.append(ghostCountLabel);

//Set ghost amount to increment each second
setInterval(function () {
  ghostButtonClick();
}, 1000);

const ghostClickAmount = 1;
function ghostButtonClick() {
  ghostCount += ghostClickAmount;
  updateGhostButtonText();
}

function updateGhostButtonText() {
  let ghostString = `${ghostCount} ghost`;
  if (ghostCount != 1) {
    ghostString += `s`;
  }
  ghostString += `!`;

  ghostCountLabel.textContent = ghostString;
}
