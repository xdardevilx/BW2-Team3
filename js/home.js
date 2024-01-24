// -----configuration-------
import { searchAPI } from "./search-api-music.js";
import { getAlbum } from "./get-api-music.js";
import { getArtistAPI } from "./get-artist.js";
const idAlbums = [
  "382624",
  "1121182",
  "12207660",
  "121532",
  "1401302",
  "708674",
];

const idArtist = ["412", "7357", "115", "4611", "13"];

class ButtonConfig {
  constructor(id, text, link, icon) {
    this.id = id;
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
  new ButtonConfig("home", "Home", "#", "bi bi-house-door-fill"),
  new ButtonConfig("search", "cerca", "#", "bi bi-search"),
  new ButtonConfig("my-library", "La mia libreria", "#", "bi bi-collection"),
  new ButtonConfig("create-playlist", "Crea Playlist", "#", "bi bi-plus"),
  new ButtonConfig(
    "my-track",
    "Brani che ti piacciono",
    "#",
    "bi bi-suit-heart-fill"
  ),
  new ButtonConfig("my-podcast", "I tuoi episodi", "#", "bi bi-bookmark-fill"),
];

// -----DOM MANIPULATION-----

const createNavBar = () => {
  const navBar = document.getElementById("nav-bar");
  const iconLeft = document.createElement("i");
  const iconRight = document.createElement("i");
  iconLeft.classList.add("bi", "bi-arrow-left-circle-fill", "fs-2", "pe-4");
  iconRight.classList.add("bi", "bi-arrow-right-circle-fill", "fs-2");
  navBar.appendChild(iconLeft);
  navBar.appendChild(iconRight);
  createSearchBar();
};
const createSearchBar = () => {
  const navBar = document.getElementById("nav-bar");
  const searchBar = document.createElement("div");
  navBar.appendChild(searchBar);
  searchBar.innerHTML = `
  <div id="search-bar" class="container-fluid d-none ">
    <form class="d-flex" role="search">
      <input id="searchInput" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
    </form>
  </div>
`;
  searchBar.addEventListener("submit", (e) => {
    let searchTerm = document.getElementById("searchInput").value;
    searchAPI(searchTerm);
  });
};

const createNavigationButton = (btnConfig, classSpace) => {
  const menu = document.getElementById("menu");
  const button = document.createElement("div");
  if (classSpace) {
    button.classList.add(classSpace);
  }
  menu.appendChild(button);
  button.innerHTML = `
    <a id="${btnConfig.id}" class="text-decoration-none text-white" href="${btnConfig.link}">
    <i class="${btnConfig.icon}"></i>
    <span>${btnConfig.text}</span>
  </a>
    `;
  const search = document.getElementById("search");
  if (btnConfig.id === "search") {
    search.addEventListener("click", () => {
      const searchBar = document.getElementById("search-bar");
      searchBar.classList.toggle("d-none");
    });
  }
};

const createTitleUsers = () => {
  const title = document.getElementById("title");
  title.classList.add("d-flex", "justify-content-around", "mt-2");
  const text = document.createElement("p");
  const divIcon = document.createElement("div");
  const icon = document.createElement("i");
  const iconClosed = document.createElement("i");
  iconClosed.classList.add("bi", "bi-x");
  icon.classList.add("bi", "bi-person-add");
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
      <button id="save-button" class="btn rounded-5 ps-3 pe-3 mt-2 ms-3">Salva</button>


    </div>
  </div>
</div>
</div>
  `;
};

const createCardGridCell = (album) => {
  const grid = document.getElementById("grid");
  const col = document.createElement("div");
  col.classList.add("col-4", "p-1", "m-0");
  grid.appendChild(col);
  col.innerHTML = `
  <div id="${album.id}" class="card custom-card">
  <div class="row g-0 justify-content-center align-items-center">
    <div class="col-md-3">
      <img src="${album.cover_small}" 
      class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-9 ">
      <div class="card-body">
        <p class="card-text ps-3">${album.title}</p>
      </div>
    </div>
  </div>
</div>
  `;
  const sendParam = document.getElementById(album.id);
  sendParam.addEventListener("click", (e) => {
    const url = `./album.html?albumId=${album.id}`;
    window.location.href = url;
  });
};

const createGrid = (listIdAlbums) => {
  const grid = document.getElementById("grid");
  grid.classList.add("row", "g-3", "p-0");
  listIdAlbums.forEach(async (element) => {
    let album = await getAlbum(element);

    createCardGridCell(album);
  });
};

const createCardPreference = (artist) => {
  const row = document.getElementById("preference");
  row.classList.add("justify-content-evenly");
  const col = document.createElement("div");
  col.classList.add("col-2", "p-1", "m-0");
  row.appendChild(col);
  col.innerHTML = `
  <div id="${artist.id}" class="card custom-card ">
  <img class="p-2" src="${artist.picture_medium}" class="card-img-top" alt="...">
  <div class="card-body p-0 text-center ">
    <h5 class="card-title">${artist.name}</h5>
    <pclass="card-text"><small>n album: ${artist.nb_album}</small> </p>
  </div>
</div>  
  `;
  const sendParam = document.getElementById(artist.id);
  sendParam.addEventListener("click", (e) => {
    const url = `./paginaArtista.html?artistId=${artist.id}`;
    window.location.href = url;
  });
};
const createPreference = (listIdAlbums) => {
  if (!listIdAlbums) {
    console.log("no id albums");
    listIdAlbums = ["382624", "382624", "382624", "382624", "382624"];
  }
  const preference = document.getElementById("preference");
  listIdAlbums.forEach(async (element) => {
    let album = await getArtistAPI(element);
    createCardPreference(album);
  });
};

// ------main------
addNavigationButtons();
addUsers();
createCardHero();
createTitleUsers();
createGrid(idAlbums);
createPreference(idArtist);
createNavBar();
