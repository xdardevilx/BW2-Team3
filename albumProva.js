// CERCANDO UN GENERE LA PAGINA LI CARICHERà
let myUrl = " https://striveschool-api.herokuapp.com/api/deezer/album/";
const albumId = "508204251";

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

          console.log(element.preview, "lepreview");

          const secondsIntoMinutes = function (secondi) {
            let minutes = secondi / 60;
            return minutes.toFixed(2);
          };
          const numeroCanzoneInAlbum = i + 1;

          divTrack.classList.add("row");
          divTrack.innerHTML = `
          <div class="col col-md-7 col-lg-7 d-flex align-items-center   ">
              <h5 class="me-4 text-secondary">${numeroCanzoneInAlbum}</h5>
              <div class="">
                <h4 class="text-white pt-3" id="titolo">${element.title}</h4>
                <h5 class="text-white-50    ">${element.artist.name}</h5>
              </div>
          </div>
          <p class="col col-md-4 col-lg-4 text-white-50 ">1,5Mln</p>
          <p class="col col-md-1 col-lg-1 text-white-50" id="durata">${secondsIntoMinutes(
            element.duration
          )}</p>
          `;

          divTracklist.appendChild(divTrack);

          const playAudio = function (index) {
            const audio = new Audio(arrayTracks[index].preview);
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

          const h4Element = divTrack.querySelector("h4");
          h4Element.classList.add("text-white");

          h4Element.addEventListener("click", function () {
            const isPlaying = divTrack.classList.toggle("active");

            if (isPlaying) {
              h4Element.classList.remove("text-white");
              h4Element.classList.add("text-success");
              playAudio(i);
            } else {
              h4Element.classList.remove("text-success");
              h4Element.classList.add("text-white");
              stopAudio(i);
            }

            audioElements.forEach((audio, index) => {
              if (index !== i && !audio.paused) {
                //SE AUDIO NON è UGUALE AD INDICE DI ARRAY TRACK E AUDIO NON è IN PAUSA STOPPA QUELLA CANZONE
                stopAudio(index);
                // arrayTrack[index].classList.remove("active");
                h4Element[index].classList.add("text-white");
                h4Element[index].classList.remove("text-success");
              }
            });
          });
        });
      };

      creaContenutoAlbum();
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

searchGenere();
