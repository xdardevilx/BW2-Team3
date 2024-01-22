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

const createNavigationButton = (btnConfig) => {
  const menu = document.getElementById("menu");
  const button = document.createElement("div");
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
    createNavigationButton(arrayButtonsConfig[i]);
  }
};
addNavigationButtons();
