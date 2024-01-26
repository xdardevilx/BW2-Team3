// CERCANDO UN GENERE LA PAGINA LI CARICHERà
let myUrl = " https://striveschool-api.herokuapp.com/api/deezer/album/";
const albumId = "433511";

const searchGenere = function () {
  fetch(myUrl + albumId)
    .then((response) => {
      console.log("MYURL + ALBUMID", myUrl + albumId);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("ERRORE");
      }
    })
    .then((data) => {
      console.log("OGGETTO RICEVUTO", data);
      const creaContenutoAlbum = function () {
        const img = document.getElementById("imgAlbum");
        const h1 = document.getElementById("h1");
        const artista = document.getElementById("artista");
        const release = document.getElementById("release");
        const nBrani = document.getElementById("nBrani");
        const durataTotale = document.getElementById("durataTotale");
        const giveAudio = function (index) {
          return new Audio(previewSongArray[index].preview);
        };
        const artistImg = document.getElementById("top-artist-image");
        artistImg.src = data.artist.picture;
        const albumImg = document.getElementById("bottom-artist-image");
        albumImg.src = data.cover;
        const footerSong = document.getElementById("footer-song");
        footerSong.textContent = data.artist.name;

        h1.textContent = data.title;
        h1.classList.add("col");
        img.src = data.cover_big;
        artista.textContent = data.artist.name;

        const secondsToTime = function (seconds) {
          const minuti = Math.floor(seconds / 60);
          const secondi = seconds % 60;

          const tempoFormattato = ` ${minuti} min. ${secondi} sec.`;
          return tempoFormattato;
        };
        durataTotale.innerText = secondsToTime(data.duration);

        const annoCompleto = data.release_date;
        release.innerText = " • " + annoCompleto.split("-")[0] + " • ";

        const arrayTracks = data.tracks.data;
        console.log(arrayTracks);

        nBrani.textContent = arrayTracks.length + " brani";

        const audioElements = []; // ARRAY PER TRACCIARE GLI ELEMENTI AUDIO
        let currentlyPlayingIndex = -1; //INDICE TRACCIA IN PLAY

        arrayTracks.forEach((element, i) => {
          console.log("UNA TRACK", element);
          const divTracklist = document.getElementById("divTracklist");
          const divTrack = document.createElement("div");

          let numeroRandom = Math.floor(1000000 + Math.random() * 52671512);

          console.log(element.preview, "lepreview");

          const secondsIntoMinutes = function (secondi) {
            let minutes = secondi / 60;
            return minutes.toFixed(2);
          };
          const numeroCanzoneInAlbum = i + 1;

          divTrack.classList.add("row");
          divTrack.innerHTML = `
          <div class="col col-md-6 col-lg-6 d-flex align-items-center   ">
              <h5 class="me-4 text-secondary">${numeroCanzoneInAlbum}</h5>
              <div class="">
                <h4 class="text-white pt-3" id="titolo">${element.title}</h4>
                <h5 class="text-white-50    ">${element.artist.name}</h5>
              </div>
          </div>
          <p class="col col-md-4 col-lg-4 text-white-50 ">${numeroRandom}</p>
          <p class="col col-md-1 col-lg-1 text-white-50" id="durata">${secondsIntoMinutes(
            element.duration
          )}</p>
          `;
          hideLoadingAnimation();
          divTracklist.appendChild(divTrack);
        });

        // newImageArtistBottom.innerHTML = `<img class="img-thumbnail bg-black ms-4  " style="width: 7em;"
        // src="${data.cover}"  alt="">`;
        // divWithArtistImage.appendChild(newImageArtistBottom);

        const previewSongArray = data.tracks.data;
        console.log(previewSongArray);

        let isPlaying = false;
        let currentAudio = null;

        const h4Elements = document.querySelectorAll("h4");
        h4Elements.forEach((element, index) => {
          const canzone = giveAudio(index);
          console.log(element);
          console.log(canzone);
          element.addEventListener("click", function () {
            if (currentAudio !== null && currentAudio !== canzone) {
              currentAudio.pause();
            }

            if (isPlaying === false) {
              canzone.play();
              const footerTitle = document.getElementById("footer-artist");
              footerTitle.textContent = element.textContent;
            } else {
              canzone.pause();
            }
            isPlaying = !isPlaying;
            currentAudio = canzone;
          });
        });
      };

      creaContenutoAlbum();
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
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
};

searchGenere();

const cercaCanzone = function () {
  fetch(myUrl + albumId)
    .then((response) => {
      console.log("MYURL + ALBUMID", myUrl + albumId);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("ERRORE");
      }
    })
    .then((data) => {
      const myPreviewArray = data.tracks.data;
      console.log(myPreviewArray);

      const giveAudio = function (index) {
        return new Audio(myPreviewArray[index].preview);
      };
      const roundedPlayButton = document.getElementById("rounded-play-button");
      const bottoneCanzonePrecedente = document.getElementById(
        "canzone-precendente"
      );
      const bottoneCanzoneDopo = document.getElementById("canzone-dopo");

      let canzonePre = giveAudio(0);

      let isPlaying = false;
      let currentAudio = null;

      bottoneCanzonePrecedente.addEventListener("click", function () {
        if (currentAudio !== null && currentAudio !== canzonePre) {
          currentAudio.pause();
        }

        if (isPlaying === false) {
          canzonePre.play();
        } else {
          canzonePre.pause();
        }
        isPlaying = !isPlaying;
        currentAudio = canzonePre;
      });

      let canzone2 = giveAudio(1);

      roundedPlayButton.addEventListener("click", function () {
        if (currentAudio !== null && currentAudio !== canzone2) {
          currentAudio.pause();
        }

        if (isPlaying === false) {
          canzone2.play();
        } else {
          canzone2.pause();
        }
        isPlaying = !isPlaying;
        currentAudio = canzone2;
      });

      let canzoneDopo = giveAudio(2);

      bottoneCanzoneDopo.addEventListener("click", function () {
        if (currentAudio !== null && currentAudio !== canzoneDopo) {
          currentAudio.pause();
        }

        if (isPlaying === false) {
          canzoneDopo.play();
        } else {
          canzoneDopo.pause();
        }
        isPlaying = !isPlaying;
        currentAudio = canzoneDopo;
      });
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

cercaCanzone();
