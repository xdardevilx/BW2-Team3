// -----configuration-------

class ButtonConfig {
  constructor(text, link, icon) {
    this.text = text;
    this.link = link;
    this.icon = icon;
  }
}

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
    <a class="text-decoration-none" href="${btnConfig.link}">
    <i class="${btnConfig.icon}"></i>
    <span>${btnConfig.text}</span>
  </a>
    `;
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
  card.classList.add("card", "p-0", "mt-3");
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
      <p class="card-text m-0"><small class="text-body-secondary">Ascolta il nuovo singolo di Fedez e Salmo kudaksjdsòkdnlasjdalsjòskjdòaksjd</small></p>

    </div>
  </div>
</div>
</div>
  `;
};

// ------main------
addNavigationButtons();
createCardHero();
