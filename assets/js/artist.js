let myUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
let idArtista = "143";
let tracklist = "/top?limit=100";

const getArtist = function () {
  fetch(myUrl + idArtista)
    .then((response) => {
      console.log(response.url);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("ERRORE");
      }
    })

    .then((data) => {
      console.log("OGGETTO ARTISTA", data);

      function formattaNumeroConPunti(numero) {
        return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }

      const generaContenutoAlto = () => {
        const divAlto = document.getElementById("sezioneAlta");
        const img = document.getElementById("imgArtista");
        const nome = document.getElementById("artist-name");
        const miniImgArtista = document.getElementById("artist-mini-photo");
        const nome2 = document.getElementById("artist-name2");

        miniImgArtista.src = data.picture;
        nome2.textContent = data.name;

        const ascoltatoriMensili = document.getElementById("artist-listeners");

        ascoltatoriMensili.classList.add("col", "fs-5");
        img.src = data.picture_big;
        nome.innerText = data.name;

        /// MODIFICO IL NUMERO DEGLI ASCOLTATORI MENSILI CON UN PUNTINO OGNI 3 CIFRE INTERE
        ascoltatoriMensili.innerText = `${formattaNumeroConPunti(
          data.nb_fan
        )} ascoltatori mensili`;
      };
      generaContenutoAlto();

      fetch(myUrl + idArtista + tracklist)
        .then((response) => {
          console.log(response.url);
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("ERRORE");
          }
        })
        .then((data) => {
          console.log("OGGETTO TRACKLIST, RICEVUTO DA SECONDA FETCH", data);
          const arrayTrackList = data.data;

          console.log("ARRAY TRACKLIST", arrayTrackList);

          const creaTracklist = function () {
            const divTracklist = document.getElementById("divTracklist");
            let track = "";

            const secondsIntoMinutes = function (secondi) {
              let minutes = secondi / 60;
              return minutes.toFixed(2);
            };

            function formattaNumeroConPunti(numero) {
              return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }

            const audioElements = []; // ARRAY PER TRACCIARE GLI ELEMENTI AUDIO
            let currentlyPlayingIndex = -1; //INDICE TRACCIA IN PLAY

            arrayTrackList.forEach((element, i) => {
              ///// TITOLO TRACK IN MAIUSCOLO, MA NON PARTE TRA PARENTESI
              const titoloToUpperCaseSenzaParentesi = function (titolo) {
                const parentesi = titolo.indexOf("(");
                if (parentesi !== -1) {
                  return (
                    titolo.substr(0, parentesi).toUpperCase() +
                    titolo.substr(parentesi)
                  );
                } else {
                  return titolo.toUpperCase();
                }
              };

              track += `
                                <li class="d-flex align-items-center justify-content-between list-group-item h5"><img src="${
                                  element.album.cover
                                }" id="genitore" class="col-2 rounded-0 mx-1 my-2 ms-2" alt="..." style="width: 40px; height: 40px;"><span id="titoloPreview" class=" text-white col-6 h4 ms-2 mb-0">${titoloToUpperCaseSenzaParentesi(
                element.title
              )}</span><span class="col-2 ms-4 h5 text-info">${formattaNumeroConPunti(
                element.rank
              )}</span><span class="col-1 ms-4 h6 text-info">${secondsIntoMinutes(
                element.duration
              )}</span></li>
            `;
            });

            hideLoadingAnimation();

            divTracklist.innerHTML = track;

            const titoloPreviewElements = divTracklist.querySelectorAll(".h4");

            const playAudio = function (index) {
              const audio = new Audio(arrayTrackList[index].preview);
              audio.play();
              audioElements[index] = audio;
              currentlyPlayingIndex = index;
              console.log("TRACK IN PLAY", currentlyPlayingIndex);
            };

            const stopAudio = function (index) {
              if (audioElements[index]) {
                audioElements[index].pause();
                audioElements[index].currentTime = 0;
                currentlyPlayingIndex = -1;
              }
            };

            titoloPreviewElements.forEach((titoloPreviewElement, i) => {
              const playIcon = document.createElement("i");
              const pauseIcon = document.createElement("i");

              playIcon.classList.add("d-none", "row", "bi", "bi-play", "ms-2"); ///SE VOLETE FAR APPARIRE ICONA SOTTO I BRANI PIù LUNGHI QUA VA COL-1 ANZI CHE ROW///
              pauseIcon.classList.add(
                "d-none",
                "row", ///SE VOLETE FAR APPARIRE ICONA SOTTO I BRANI PIù LUNGHI QUA VA COL-1 ANZI CHE ROW///
                "bi",
                "bi-pause-circle",
                "ms-2"
              );

              ///// ASSEGNO GLI ID ALLE ICONE BASANDOMI SUGLI INDICI
              playIcon.id = `icona-play-${i}`;
              pauseIcon.id = `icona-pause-${i}`;

              titoloPreviewElement.addEventListener("click", function () {
                const isPlaying =
                  titoloPreviewElement.classList.toggle("active");

                if (isPlaying) {
                  titoloPreviewElement.classList.remove("text-white");
                  titoloPreviewElement.classList.add("text-success");
                  playIcon.classList.remove("d-none");
                  playIcon.classList.add("d-inline");
                  pauseIcon.classList.remove("d-inline");
                  pauseIcon.classList.add("d-none");
                  playAudio(i);
                } else {
                  titoloPreviewElement.classList.remove("text-success");
                  titoloPreviewElement.classList.add("text-white");
                  pauseIcon.classList.remove("d-none");
                  pauseIcon.classList.add("d-inline");
                  playIcon.classList.remove("d-inline");
                  playIcon.classList.add("d-none");
                  stopAudio(i);
                }

                audioElements.forEach((audio, index) => {
                  if (index !== i && !audio.paused) {
                    // SE AUDIO NON è UGUALE AD INDICE DI ARRAY TRACK E AUDIO NON è IN PAUSA STOPPA QUELLA CANZONE
                    stopAudio(index);
                    const otherPlayIcon = document.getElementById(
                      `icona-play-${index}`
                    );
                    const otherPauseIcon = document.getElementById(
                      `icona-pause-${index}`
                    );
                    otherPlayIcon.classList.remove("d-inline");
                    otherPlayIcon.classList.add("d-none");
                    otherPauseIcon.classList.remove("d-inline");
                    otherPauseIcon.classList.add("d-none");
                    titoloPreviewElements[index].classList.add("text-white");
                    titoloPreviewElements[index].classList.remove(
                      "text-success"
                    );
                  }
                });
              });
              titoloPreviewElement.appendChild(playIcon);
              titoloPreviewElement.appendChild(pauseIcon);
            });
          };
          creaTracklist();
        })
        .catch((err) => {
          console.log("errore", err);
        });
    })

    .catch((err) => {
      console.log("errore", err);
    });
};
getArtist();

// let searchArtista = nomeArtista;

// search.addEventListener(("click") => {getArtist(ID)})

// URLSearchParams.append() ///////  Aggiunge una coppia chiave/valore specificata come nuovo parametro di ricerca.
// URLSearchParams.forEach()
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
