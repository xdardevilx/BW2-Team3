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
  new ButtonConfig("Crea Playlist", "#", "bi bi-plus"),
  new ButtonConfig("Brani che ti piacciono", "#", "bi bi-suit-heart-fill"),
  new ButtonConfig("I tuoi episodi", "#", "bi bi-bookmark-fill"),
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
  title.classList.add("d-flex", "justify-content-around", "mt-2");
  const text = document.createElement("p");
  const divIcon=document.createElement("div");
  const icon = document.createElement("i");
  const iconClosed = document.createElement("i");
  iconClosed.classList.add("bi", "bi-x");
  icon.classList.add("bi","bi-person-add");
  title.appendChild(text);
  title.appendChild(divIcon);
  divIcon.appendChild(icon);
  divIcon.appendChild(iconClosed);

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
  card.classList.add(
    "card",
    "p-0",
    "mt-3",
    "text-white",
    "bg-black",
    "bg-gradient"
  );
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
      <p class="card-text m-0"><small">Ascolta il nuovo singolo di Fedez e Salmo</small></p>
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
  col.classList.add("col-4", "p-1", "m-0");
  grid.appendChild(col);
  col.innerHTML = `
  <div class="card custom-card">
  <div class="row g-0 justify-content-center align-items-center">
    <div class="col-md-3">
      <img src="http://placekitten.com/200/200" 
      class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-9 ">
      <div class="card-body">
        <p class="card-text ps-3">titolo canzone prova</p>
      </div>
    </div>
  </div>
</div>

  `;
};

const creatGrid = () => {
  const grid = document.getElementById("grid");
  grid.classList.add("row", "g-3", "p-0");

  for (let i = 0; i < 6; i++) {
    createCardGridCell();
  }
};

const createCardPreference = () => {
  const row = document.getElementById("preference");
  row.classList.add("justify-content-evenly");
  const col = document.createElement("div");
  col.classList.add("col-2", "p-1", "m-0");
  row.appendChild(col);
  col.innerHTML = `
  <div class="card custom-card ">
  <img class="p-2" src="http://placekitten.com/300" class="card-img-top" alt="...">
  <div class="card-body p-0 text-center ">
    <h5 class="card-title">Card title</h5>
    <pclass="card-text"><small>sottotitolo</small> </p>
  </div>
</div>  
  `;
};

const createPreference = () => {
  const preference = document.getElementById("preference");
  for (let i = 0; i < 5; i++) {
    createCardPreference();
  }
};

// ------main------
addNavigationButtons();
addUsers();
createCardHero();
createTitleUsers();
creatGrid();
createPreference();
