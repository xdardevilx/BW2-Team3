import { playAudio, stopAudio } from "../../utils/music-manager.js";

export const createCardHero = (album) => {
  let _contributors = null;

  album.contributors.forEach((e) => {
    if (_contributors) {
      _contributors = `${_contributors}, ${e.name}`;
    } else {
      _contributors = e.name;
    }
  });

  const heroPage = document.getElementById("hero-page");
  const card = document.createElement("div");
  card.classList.add(
    "card",
    "p-0",
    "mt-3",
    "text-white",
    "bg-black",
    "bg-gradient",
    "d-none",
    "d-md-block",
    "col-12"
  );
  card.id = "genitore";
  heroPage.appendChild(card);
  card.innerHTML = `
    <div>
      <div class="row align-items-center g-0">
        <div class="col-md-2 ps-3">
          <img src="${album.cover_xl}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-10">
          <div class="card-body">
            <p class="m-0">ALBUM</p>
            <h2 class="card-title m-0 ">${album.tracks.data[0].title}</h2>
            <p class="card-text m-0">${_contributors}</p>
            <p class="card-text m-0"><small">${album.title}</small></p>
            <button id="play-button" class="btn btn-primary rounded-5 ps-4 pe-4 mt-2">Play</button>
            <button id="stop-button" class="btn btn-primary rounded-5 ps-4 pe-4 mt-2 d-none">Stop</button>
            <button id="save-button" class="btn rounded-5 ps-3 pe-3 mt-2 ms-3">Salva</button>
          </div>
        </div>
      </div>
    </div>
    `;
  hideLoadingAnimation();

  const audio = new Audio(album.tracks.data[0].preview);

  const play = document.getElementById("play-button");
  play.addEventListener("click", () => {
    play.classList.toggle("d-none");
    stop.classList.toggle("d-none");
    playAudio(audio);
  });
  const stop = document.getElementById("stop-button");
  stop.addEventListener("click", () => {
    play.classList.toggle("d-none");
    stop.classList.toggle("d-none");
    stopAudio(audio);
  });
};

////////////////////////////////////////////
function hideLoadingAnimation() {
  const loadingDiv = document.getElementById("loadingDiv");
  if (loadingDiv) {
    loadingDiv.style.display = "none";
  }
}
// Verifica se il div genitore è stato creato
const parentDiv = document.getElementById("genitore");
// Se il div genitore non è ancora stato creato, creo loading div e mostro l'animazione
if (!parentDiv) {
  const loadingDiv = document.createElement("div");
  loadingDiv.id = "loadingDiv";
  loadingDiv.classList.add("clessidra");
  loadingDiv.style.width = "20px";
  loadingDiv.style.height = "20px";
  document.body.appendChild(loadingDiv);
} else {
  hideLoadingAnimation(); // Nascondi l'animazione se il div genitore è già stato creato
  const loadingDiv = document.getElementById("loadingDiv");
  // Aggiungi un listener per l'evento "animationend" all'elemento di caricamento
  loadingDiv.addEventListener("animationend", () => {
    // Una volta completata l'animazione di opacità, nascondi il div di caricamento
    loadingDiv.style.display = "none";
  });
}
/////////////////////////////////////////7
