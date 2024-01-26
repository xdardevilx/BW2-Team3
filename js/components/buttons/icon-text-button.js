export const createIconTextButton = (btnConfig, classSpace) => {
  const button = document.createElement("div");
  if (classSpace) {
    button.classList.add(classSpace);
  }
  menu.appendChild(button);
  button.innerHTML = `
      <a id="${btnConfig.id}" class="text-decoration-none text-white" href="${btnConfig.link}">
      <i class="${btnConfig.icon}"></i>
      <span class="h5 ms-2 text-info">${btnConfig.text}</span>
    </a>
      `;
  const search = document.getElementById("search");
  if (btnConfig.id === "search") {
    search.addEventListener("click", () => {
      const searchBar = document.getElementById("search-bar");
      searchBar.classList.toggle("d-none");
    });
  }
  return button;
};
