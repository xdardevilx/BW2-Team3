export const createLargeCard = (artist) => {
  const card = document.createElement("div");
  card.classList.add("card", "custom-card");
  card.setAttribute("id", artist.id);

  let subtitle = "";
  if (artist.nb_album) {
    subtitle = `n album: ${artist.nb_album}`;
  }

  card.innerHTML = `
    
    <img class="p-2" src="${artist.picture_medium}" class="card-img-top" alt="...">
    <div class="card-body p-0 text-center ">
      <h5 class="card-title">${artist.name}</h5>
      <p id="genitore" class="card-text"><small>${subtitle}</small> </p>
    </div>
 
    `;
  hideLoadingAnimation();
  return card;
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
