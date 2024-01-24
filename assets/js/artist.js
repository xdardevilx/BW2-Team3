let myUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
let idArtista = "1155242";
let tracklist = "/top?limit=10";

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
          //MI SA CHE DOMANI FACCIO PARTIRE UN ALTRA FETCH DENTRO QUESTO THEN CHE PUNTA A QUES'URL MA CON LA PARTE FINALE
          ///// PARAMETRIZZATA DAL NUMERO MASSIMO DI TRACKLIST DI OGNI ARTISTA
          console.log("OGGETTO TRACKLIST RICEVUTO DA FETCH", data);
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
                                }" class="col-2 rounded-0 mx-1 my-2 ms-2" alt="..." style="width: 40px; height: 40px;"><span id="titoloPreview" class=" text-white col-6 h4 ms-2 mb-0">${titoloToUpperCaseSenzaParentesi(
                element.title
              )}</span><span class="col-2 ms-4 h5 text-info">${formattaNumeroConPunti(
                element.rank
              )}</span><span class="col-2 ms-4 h6 text-info">${secondsIntoMinutes(
                element.duration
              )}</span></li>
            `;
            });

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
              titoloPreviewElement.addEventListener("click", function () {
                const isPlaying =
                  titoloPreviewElement.classList.toggle("active");

                if (isPlaying) {
                  titoloPreviewElement.classList.remove("text-white");
                  titoloPreviewElement.classList.add("text-success");
                  playAudio(i);
                } else {
                  titoloPreviewElement.classList.remove("text-success");
                  titoloPreviewElement.classList.add("text-white");
                  stopAudio(i);
                }

                audioElements.forEach((audio, index) => {
                  if (index !== i && !audio.paused) {
                    // SE AUDIO NON è UGUALE AD INDICE DI ARRAY TRACK E AUDIO NON è IN PAUSA STOPPA QUELLA CANZONE
                    stopAudio(index);
                    // arrayTrack[index].classList.remove("active");
                    titoloPreviewElements[index].classList.add("text-white");
                    titoloPreviewElements[index].classList.remove(
                      "text-success"
                    );
                  }
                });
              });
            });
          };
          creaTracklist();

          const liElements = document.querySelectorAll("li");
          liElements.forEach((element, index) => {
            element.addEventListener("click", function () {
              playAudio(index);
            });
          });
          
          const playAudio = function (index) {
            new Audio(arrayTrackList[index].preview).play();
          };
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

// search.addEventListener(("click") => {getArtist()})

// URLSearchParams.append() ///////  Aggiunge una coppia chiave/valore specificata come nuovo parametro di ricerca.
// URLSearchParams.forEach()
