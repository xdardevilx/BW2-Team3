// -----configuration-------

class ButtonConfig {
  constructor(text, link, icon) {
    this.text = text;
    this.link = link;
    this.icon = icon;
  }
}

class UsersConfig {
  constructor(name, artist, album, icon) {
    this.name = name;
    this.artist = artist;
    this.album = album;
    this.icon = icon;
  }
}
const arrayUsersConfig = [
  new UsersConfig(
    "Charlie Hookham",
    "In camera yumi zouma",
    "EPIII",
    "bi bi-disc"
  ),
  new UsersConfig(
    "lightdark02",
    "Animed to Kill Jade LeMac",
    "Animed to Kill",
    "bi bi-disc"
  ),
  new UsersConfig(
    "Valeria Traverso",
    "New King Sleeping Wolf",
    "Twint Badass mood",
    "bi bi-music-note-beamed"
  ),
];

const arrayButtonsConfig = [
  new ButtonConfig("Home", "#", "bi bi-house-door-fill"),
  new ButtonConfig("cerca", "#", "bi bi-search"),
  new ButtonConfig("La mia libreria", "#", "bi bi-collection"),
  new ButtonConfig("Crea Playlis", "#", "bi bi-collection"),
  new ButtonConfig("Brani che ti piacciono", "#", "bi bi-collection"),
  new ButtonConfig("I tuoi episodi", "#", "bi bi-collection"),
];

// -----DOM MANIPULATION-----

const createNavigationButton = (btnConfig, classSpace) => {
  const menu = document.getElementById("menu");
  const button = document.createElement("div");
  if (classSpace) {
    button.classList.add(classSpace);
  }
  menu.appendChild(button);
  button.innerHTML = `
    <a class="text-decoration-none text-white" href="${btnConfig.link}">
    <i class="${btnConfig.icon}"></i>
    <span>${btnConfig.text}</span>
  </a>
    `;
};

const createTitleUsers = () => {
  const title = document.getElementById("title");
  const text = document.createElement("p");
  title.appendChild(text);
  text.innerText = "Attività amici";
};

const createUsers = (userconfig) => {
  const user = document.getElementById("user");
  const text = document.createElement("div");
  user.appendChild(text);
  text.innerHTML = `
  <div class="d-flex">
  <div class="pe-1">
  <img class="rounded rounded-circle " src="./assets/imgs/main/image-1.jpg" alt="" width="35" height="35">
  </div>
  <div>

  <h5 class="p-0 m-0">${userconfig.name}</h5>
  <p class="p-0 m-0">${userconfig.artist}</p>
  <p class="p-0  ${userconfig.icon}">${userconfig.album}</p>
  </div>
  </div>
  
  `;
};

const addUsers = () => {
  for (let i = 0; i < arrayUsersConfig.length; i++) {
    createUsers(arrayUsersConfig[i]);
  }
};

const addNavigationButtons = () => {
  for (let i = 0; i < arrayButtonsConfig.length; i++) {
    //if i ===  2 add padding bottom on 3th button
    createNavigationButton(arrayButtonsConfig[i], i === 2 ? "pb-4" : null);
  }
};

const createCardHero = () => {
  const heroPage = document.getElementById("hero-page");
  const card = document.createElement("div");
  card.classList.add("card", "p-0", "mt-3", "text-bg-dark");
  heroPage.appendChild(card);
  card.innerHTML = `
  <div class="row align-items-center  g-0">
  <div class="col-md-2 ps-2">
    <img src="http://placekitten.com/300/300
    " class="img-fluid rounded-start" alt="...">
  </div>
  <div class="col-md-10">
    <div class="card-body">
    <p class="m-0">ALBUM</p>
      <h2 class="card-title m-0 ">titolo della canzone molto molto </h2>
      <p class="card-text m-0">Fedez, Salmo</p>
      <p class="card-text m-0"><small class="text-body-secondary">Ascolta il nuovo singolo di Fedez e Salmo</small></p>
      <button id="play-button" class="btn btn-primary rounded-5 ps-4 pe-4 mt-2">Play</button>
      <button id="play-button" class="btn btn-outline-primary rounded-5 ps-4 pe-4 mt-2 ms-3">Salva</button>


    </div>
  </div>
</div>
</div>
  `;
};

const createCardGridCell = () => {
  const grid = document.getElementById("grid");
  const col = document.createElement("div");
  col.classList.add("col-4", "p-0");
  grid.appendChild(col);
  col.innerHTML = `
  <div class="card mb-3">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="http://placekitten.com/100/100" class="img-fluid rounded-start" alt="..." width="50">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text"></p>
        <p class="card-text"><small class="text-body-secondary"></small></p>
      </div>
    </div>
  </div>
</div>

  `;
};

const creatGrid = () => {
  for (let i = 0; i < 6; i++) {
    createCardGridCell();
  }
};

// ------main------
addNavigationButtons();
addUsers();
createCardHero();
createTitleUsers();
creatGrid()
