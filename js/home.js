// -----configuration-------
import { searchAPI } from "./search-api-music.js";
import { getAlbum } from "./get-api-music.js";
import { getArtistAPI } from "./get-artist.js";

//Utils
import { searchAction } from "./utils/search-manager.js";

//Components
import { createCardHero } from "./components/cards/hero-card.js";
import { createListCard } from "./components/cards/list-card.js";
import { createLargeCard } from "./components/cards/large-card.js";
import { createIconTextButton } from "./components/buttons/icon-text-button.js";

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
  new ButtonConfig("search", "Cerca", "#", "bi bi-search"),
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

//CARDS

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

const createSearchBar = (historySearch) => {
  const navBar = document.getElementById("nav-bar");
  const searchBar = document.createElement("div");
  navBar.appendChild(searchBar);
  if (historySearch) {
    document.getElementById("searchInput").value = historySearch;
  }
  searchBar.innerHTML = `
  <div id="search-bar" class="container-fluid d-none ">
    <form class="d-flex" role="search">
      <input id="searchInput" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
    </form>
  </div>
`;
searchAction(searchBar)
  // searchBar.addEventListener("submit", async () => {
  //   const artist = [];
  //   const album = [];

  //   let searchTerm = document.getElementById("searchInput").value;
  //   const resp = await searchAPI(searchTerm);

  //   resp.data.forEach((element) => {
  //     if (!artist.some((item) => item.id === element.artist.id)) {
  //       artist.push(element.artist);
  //     }
  //     if (!album.some((item) => item.id === element.album.id)) {
  //       album.push(element.album);
  //     }
  //   });

  //   createGridAlbum(null, album);
  //   createGridArtist(null, artist);
  // });
};

//Left Sidenav
const addNavigationButtons = () => {
  const menu = document.getElementById("menu");
  menu.classList.add("pt-2", "ps-2");
  for (let i = 0; i < arrayButtonsConfig.length; i++) {
    //if i ===  2 add padding bottom on 3th button
    menu.appendChild(
      createIconTextButton(arrayButtonsConfig[i], i === 2 ? "pb-4" : null)
    );
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

  <h5 class="p-1 m-0 h5">${userconfig.name}</h5>
  <small><p class="p-1 m-0 h6 text-info">${userconfig.artist}</p></small>
  <small><p class="p-0 h6 text-info ${userconfig.icon}">${userconfig.album}</p></small>
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
export const createGridAlbum = (listIdAlbums, listAlbums) => {
  const grid = document.getElementById("grid");
  grid.classList.add("row", "g-3", "p-0");

  grid.innerHTML = "";
  if (!listAlbums) {
    listIdAlbums.forEach(async (element) => {
      const col = document.createElement("div");
      col.classList.add(
        "col-12",
        "col-sm-12",
        "col-md-6",
        "col-lg-4",
        "p-1",
        "m-0"
      );
      grid.appendChild(col);

      let album = await getAlbum(element);
      col.appendChild(createListCard(album));

      const sendParam = document.getElementById(album.id);
      sendParam.addEventListener("click", (e) => {
        const url = `./album.html?albumId=${album.id}`;
        window.location.href = url;
      });
    });
  } else {
    listAlbums.forEach(async (album) => {
      const col = document.createElement("div");
      col.classList.add(
        "col-12",
        "col-sm-12",
        "col-md-6",
        "col-lg-4",
        "p-1",
        "m-0"
      );
      grid.appendChild(col);

      col.appendChild(createListCard(album));

      const sendParam = document.getElementById(album.id);
      sendParam.addEventListener("click", () => {
        const url = `./album.html?albumId=${album.id}`;
        window.location.href = url;
      });
    });
  }
};

//Grid Artist
export const createGridArtist = (listIdArtists, listArtists) => {
  const row = document.getElementById("preference");
  row.classList.add("justify-content-evenly");

  row.innerHTML = "";

  if (!listArtists) {
    listIdArtists.forEach(async (element) => {
      const col = document.createElement("div");
      col.classList.add(
        "col",
        "col-sm-6",
        "col-md-4",
        "col-lg-2",
        "p-1",
        "flex-fill"
      );
      row.appendChild(col);

      let artist = await getArtistAPI(element);
      col.appendChild(createLargeCard(artist));

      const sendParam = document.getElementById(artist.id);
      sendParam.addEventListener("click", (e) => {
        const url = `./paginaArtista.html?artistId=${artist.id}`;
        window.location.href = url;
      });
    });
  } else {
    listArtists.forEach(async (artist) => {
      const col = document.createElement("div");
      col.classList.add(
        "col",
        "col-sm-6",
        "col-md-4",
        "col-lg-2",
        "p-1",
        "flex-fill"
      );
      row.appendChild(col);

      col.appendChild(createLargeCard(artist));

      const sendParam = document.getElementById(artist.id);
      sendParam.addEventListener("click", (e) => {
        const url = `./paginaArtista.html?artistId=${artist.id}`;
        window.location.href = url;
      });
    });
  }
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
  createDisplayTrackCard();
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
};

const createIconAnchor = (icon, href) => {
  const iconAnchor = document.createElement("a");
  iconAnchor.classList.add("link-secondary", "link-underline-secondary");
  iconAnchor.setAttribute("href", href);
  const iconElement = document.createElement("i");
  iconElement.classList.add("bi", icon, "mx-1");
  iconAnchor.appendChild(iconElement);
  return iconAnchor;
};

const createProgressBar = () => {
  const progressBar = document.createElement("a");
  progressBar.classList.add("progress-bar");
  progressBar.setAttribute("style", "height:5px; width:80px");

  const body = document.createElement("div");
  body.classList.add("progress", "bg-body-secondary");
  // body.setAttribute("style", "height:2px; width:25px; display: inline")
  progressBar.appendChild(body);
  return progressBar;
};

// --footer--
const responsiveFooter = () => {
  const footerMobile = document.getElementById("footer-mobile");
  const container = document.createElement("div");
  container.classList.add("container");
  footerMobile.appendChild(container);
  const row = document.createElement("div");
  row.classList.add(
    "row",
    "justify-content-center",
    "text-center",
    "align-items-center"
  );
  footerMobile.appendChild(row);

  const iconText = [
    new ButtonConfig(null, "Home", "#", "bi-house-door-fill"),
    new ButtonConfig(null, "Search", "#", "bi-search"),
    new ButtonConfig(null, "Library", "#", "bi-collection"),
  ];

  for (let i = 0; i < 3; i++) {
    const col = document.createElement("div");
    col.classList.add("col-4");
    row.appendChild(col);
    col.appendChild(navButton(iconText[i]));
  }
};

const navButton = (btnConfig) => {
  const a = document.createElement("a");
  a.setAttribute("href", btnConfig.link);
  a.classList.add("text-decoration-none", "text-white");
  const iconHome = document.createElement("i");
  iconHome.classList.add("bi", btnConfig.icon);
  a.appendChild(iconHome);
  const text = document.createElement("p");
  text.textContent = btnConfig.text;
  a.appendChild(text);

  return a;
};

responsiveFooter();

//Methods
const saveDataLocalStorage = () => {
  const inputSearch = document.getElementById("search-bar");

  inputSearch.addEventListener("submit", () => {
    let inputValue = document.getElementById("searchInput").value;

    let localStorageSearch = JSON.parse(localStorage.getItem("search"));

    if (!localStorageSearch) {
      localStorageSearch = [];
    }
    if (!localStorageSearch.includes(inputValue)) {
      localStorageSearch.push(inputValue);
      localStorage.setItem("search", JSON.stringify(localStorageSearch));
    }
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
        "text-info",
        "d-flex",
        "ps-2"
      );
      researchElement.innerHTML = element;
      research.appendChild(researchElement);

      researchElement.addEventListener("click", () => {
        searchAction(element);
      });
    });
  } else {
    console.log("nessun valore in uscita");
  }
};

// ------main------
addNavigationButtons();
addUsers();
createCardHero(await getAlbum(97505));
createTitleUsers();

createGridAlbum(idAlbums);
createGridArtist(idArtist);

createNavBar();
saveDataLocalStorage();
createResearchfromLocalStorage();
createNowPlayingBar();
