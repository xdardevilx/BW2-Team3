// -----configuration-------
import { searchAPI } from "./search-api-music.js";
import { getAlbum } from "./get-api-music.js";
import { getArtistAPI } from "./get-artist.js";

//Class
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

//Variable
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

const idAlbums = [
  "382624",
  "1121182",
  "12207660",
  "121532",
  "1401302",
  "708674",
];

const idArtist = ["412", "7357", "115", "4611", "13"];

// -----DOM MANIPULATION-----

//Navbar
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
    createSearchBar();
  });
};

//Button
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

//Left Sidenav
const addNavigationButtons = () => {
  for (let i = 0; i < arrayButtonsConfig.length; i++) {
    //if i ===  2 add padding bottom on 3th button
    createNavigationButton(arrayButtonsConfig[i], i === 2 ? "pb-4" : null);
  }
};

//Right Sidenav
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

//Grid Album
const createCardGridCell = (album) => {
  const grid = document.getElementById("grid");
  const col = document.createElement("div");
  col.classList.add("col-4", "p-1", "m-0");
  grid.appendChild(col);
  col.innerHTML = `
  <div id="${album.id}" class="card custom-card h-100 ">
  <div class="row g-0 justify-content-center align-items-center">
    <div class="col-md-3">
      <img src="${album.cover_small}" 
      class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-9 ">
      <div class="card-body">
        <p class="card-text ps-3">${album.title.substring(0, 12)}...</p>
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

//Grid Artist
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

//Hero-album
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

//Now-playng-bar
const createNowPlayingBar = () => {
  const nowPlayingBar = document.getElementById("now-playing-bar");
  const containerFluid = document.createElement("div");
  containerFluid.classList.add("container-fluid");
  nowPlayingBar.appendChild(containerFluid);

  const row = document.createElement("div");
  row.classList.add("row", "align-items-center", "justify-content-between");
  row.setAttribute("id", "now-playing-bar-row");
  containerFluid.appendChild(row);

  const colTrack = document.createElement("div");
  colTrack.classList.add("col", "col-md-3");
  colTrack.setAttribute("id", "track-card-now-playing-bar");

  const colMixer = document.createElement("div");
  colMixer.classList.add("col", "col-md-6");
  colMixer.setAttribute("id", "display-track-card");

  const colAction = document.createElement("div");
  colAction.classList.add("col", "col-md-3");
  colAction.setAttribute("id", "action-now-playing-bar");

  row.appendChild(colTrack);
  row.appendChild(colMixer);
  row.appendChild(colAction);

  createTrackCardNowPlayingBar(
    "./assets/imgs/main/image-1.jpg",
    "Nome traccia",
    "Artista"
  );
  // createDisplayTrackCard();
  createActionNowPlayingBar();
};

const createTrackCardNowPlayingBar = (srcImg, titleTxt, subtitleTxt) => {
  let _srcImg = srcImg ? srcImg : "./assets/imgs/main/image-1.jpg";
  let _titleTxt = titleTxt ? titleTxt : "Rise";
  let _subtitleTxt = subtitleTxt ? subtitleTxt : "Eminem";

  const trackCardNowPlayingBar = document.getElementById(
    "track-card-now-playing-bar"
  );
  const row = document.createElement("div");
  row.classList.add("row", "align-items-center");
  trackCardNowPlayingBar.appendChild(row);

  const colImg = document.createElement("div");
  colImg.classList.add("col", "col-md-3");
  row.appendChild(colImg);

  const img = document.createElement("img");
  img.setAttribute("src", _srcImg);
  img.setAttribute("height", "56");
  img.setAttribute("width", "56");
  colImg.appendChild(img);

  const colText = document.createElement("div");
  colText.classList.add("col", "col-md-7");
  row.appendChild(colText);

  const pTitle = document.createElement("p");
  pTitle.classList.add("m-0");
  const title = document.createTextNode(_titleTxt);
  pTitle.appendChild(title);
  colText.appendChild(pTitle);

  const pSubtitle = document.createElement("p");
  pSubtitle.classList.add("m-0");
  const subtitle = document.createTextNode(_subtitleTxt);
  pSubtitle.appendChild(subtitle);
  colText.appendChild(subtitle);

  const colPreference = document.createElement("div");
  colPreference.classList.add("col", "col-md-2");
  row.appendChild(colPreference);

  const icon = document.createElement("i");
  icon.classList.add("bi", "bi-heart");
  colPreference.appendChild(icon);
};

const createDisplayTrackCard = () => {
  const displayTrackCard = document.getElementById("display-track-card");
  displayTrackCard.innerHTML = `
  <div class="row justify-content-center">
        <div class="col col-md-4">
          <div
            class="coontrol-buttons d-flex align-items-center justify-content-center mt-4">
            <a
              class="link-success link-underline-success link-underline-opacity-25"
              href="#"
              ><i class="bi bi-shuffle fs-2 me-4"></i
            ></a>
            <a
              class="link-secondary link-underline-secondary link-underline-opacity-25"
              href="#"
              ><i class="bi bi-skip-backward-fill fs-2 me-4 text-info"></i
            ></a>
            <div class="me-3">
              <a
                class="link-dark link-underline-dark link-underline-opacity-25"
                href="#">
                <i
                  class="bi bi-play-fill fs-1 bg-white text-center rounded rounded-circle ps-2 pe-1 icon-link-hover"></i>
              </a>
            </div>
            <a
              class="link-secondary link-underline-secondary link-underline-opacity-25"
              href="#"
              ><i class="bi bi-skip-forward-fill fs-2 me-4 text-info"></i
            ></a>
            <a
              class="link-success link-underline-success link-underline-opacity-25"
              href="#"
              ><i class="bi bi-repeat fs-2 me-4"></i
            ></a>
          </div>
        </div>
        <div class="row justify-content-center">
          <div
            class="progress-container d-flex align-items-center justify-content-center col col-md-12">
            <span class="me-2 text-white-50">0:49</span>
            <div
              class="progress-bar border mt-1 rounded-3 bg-secondary"
              style="width: 50%">
              <div
                class="progess position-relative rounded-5 bg-light"
                style="width: 30%; height: 4px"></div>
            </div>
            <span class="ms-2 text-white-50">3:15</span>
          </div>
        </div>
      </div>
  `;
};

const createActionNowPlayingBar = () => {
  const actionNowPlayingBar = document.getElementById("action-now-playing-bar");
  const row = document.createElement("div");
  row.classList.add("row");
  const col = document.createElement("div");
  col.classList.add("col", "col-12");
  row.appendChild(col);

  const a = [
    {
      href: "#",
      icon: "bi-mic-fill",
    },
    {
      href: "#",
      icon: "bi-menu-button-wide",
    },
    {
      href: "#",
      icon: "bi-pc-display",
    },
    {
      href: "#",
      icon: "bi-volume-up",
    },
    {
      href: "#",
      icon: "progress-bar",
    },
    {
      href: "#",
      icon: "bi-arrows-angle-expand",
    },
  ];

  a.forEach((a) => {
    if (a.icon === "progress-bar") {
      col.appendChild(createProgressBar());
    } else {
      col.appendChild(createIconAnchor(a.icon, a.href));
    }
  });

  actionNowPlayingBar.appendChild(row);

  //   actionNowPlayingBar.innerHTML = `<a
  //   class="link-secondary link-underline-secondary link-underline-opacity-25"
  //   href="#"
  //   ><i class="bi bi-mic-fill fs-5 me-2 text-info"></i
  // ></a>
  // <a
  //   class="link-secondary link-underline-secondary link-underline-opacity-25"
  //   href="#"
  //   ><i class="bi bi-menu-button-wide fs-5 me-2 text-info"></i
  // ></a>
  // <a
  //   class="link-secondary link-underline-secondary link-underline-opacity-25"
  //   href="#"
  //   ><i class="bi bi-pc-display fs-5 me-2 text-info"></i
  // ></a>
  // <a
  //   class="link-secondary link-underline-secondary link-underline-opacity-25"
  //   href="#"
  //   ><i class="bi bi-volume-up fs-5 me-1 text-info"></i
  // ></a>

  // <div class="progress-bar" style="width: 8em">
  //   <div class="progress bg-body-secondary" style="height: 1em"></div>
  //   <div>
  //     <a
  //       class="link-secondary link-underline-secondary link-underline-opacity-25"
  //       href="#"
  //       ><i class="bi bi-arrows-angle-expand text-info"></i
  //     ></a>
  //   </div>
  // </div>
  // </div>`;
};

const createIconAnchor = (icon, href) => {
  const iconAnchor = document.createElement("a");
  // iconAnchor.classList.add("link-secondary", "link-underline-secondary");
  iconAnchor.setAttribute("href", href);
  const iconElement = document.createElement("i");
  iconElement.classList.add("bi", icon, "mx-1");
  iconAnchor.appendChild(iconElement);
  return iconAnchor;
};

const createProgressBar = () => {
  const progressBar = document.createElement("a");
  progressBar.classList.add("progress-bar");
  progressBar.setAttribute("style", "height:5px; width:80px")

  const body = document.createElement("div");
  body.classList.add("progress", "bg-body-secondary")
  // body.setAttribute("style", "height:2px; width:25px; display: inline")
  progressBar.appendChild(body)
  return progressBar;
};

//Methods
const saveDataLocalStorage = () => {
  const inputSearch = document.getElementById("search-bar");

  inputSearch.addEventListener("submit", () => {
    let inputValue = document.getElementById("searchInput").value;

    let localStorageSearch = JSON.parse(localStorage.getItem("search"));

    if (!localStorageSearch) {
      localStorageSearch = [];
    }

    localStorageSearch.push(inputValue);

    localStorage.setItem("search", JSON.stringify(localStorageSearch));
  });
};

const createResearchfromLocalStorage = () => {
  const searchvalues = JSON.parse(localStorage.getItem("search"));

  if (searchvalues && searchvalues.length > 0) {
    const research = document.getElementById("params-search");
    research.innerHTML = "";
    searchvalues.forEach((element) => {
      const researchElement = document.createElement("a");
      researchElement.classList.add(
        "text-decoration-none",
        "text-white",
        "d-flex"
      );
      researchElement.innerHTML = element;
      research.appendChild(researchElement);
    });
  } else {
    console.log("nessun valore in uscita");
  }
};

// ------main------
addNavigationButtons();
addUsers();
createCardHero();
createTitleUsers();
createGrid(idAlbums);
createPreference(idArtist);
createNavBar();
saveDataLocalStorage();
createResearchfromLocalStorage();
createNowPlayingBar();
