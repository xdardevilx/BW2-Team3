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

            arrayTrackList.forEach((element) => {
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
                                }" class="col-2 rounded-0 mx-1 my-2 ms-2" alt="..." style="width: 40px; height: 40px;"><span class=" col-6 text-white h4 ms-2 mb-0">${titoloToUpperCaseSenzaParentesi(
                element.title
              )}</span><span class="col-2 ms-4 h5 text-info">${formattaNumeroConPunti(
                element.rank
              )}</span><span class="col-2 ms-4 h6 text-info">${secondsIntoMinutes(
                element.duration
              )}</span></li>
            `;
            });
            divTracklist.innerHTML = track;
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

// search.addEventListener(("click") => {getArtist()})

// URLSearchParams.append() ///////  Aggiunge una coppia chiave/valore specificata come nuovo parametro di ricerca.
// URLSearchParams.forEach()

// const tracklist = function () {
//   const arrayTrackList = [data];
//   const divTracklist = document.getElementById("tracklist");
//   arrayTrackList.forEach(element => {
//     element.createElement("div")
//     divTracklist.appendChild(element)
//     console.log("TRACKLIST, BRANI PIù ASCOLTATI", element)
// };
// tracklist()
