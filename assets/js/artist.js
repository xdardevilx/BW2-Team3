let myUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
let nomeArtista = "gue";

const getArtist = function () {
  fetch(myUrl + nomeArtista)
    .then((response) => {
      console.log(myUrl + nomeArtista);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore");
      }
    })

    .then((data) => {
      console.log("OGGETTO ARTISTA", data);
      const oggettoArtista = data;
      const idArtista = oggettoArtista.id;
      console.log("ID ARTISTA", idArtista);

      ////////////// CONTANDO CHE NON DOVREBBERO ESSERCI ARTISTI CON LO STESSO NOME FORSE NON SERVE TROVARE L'OGGETTO
      ///////////// ARTIST CON ANCHE L 'ID NELL URL, DOVREBBE BASTARE L URL + NOME ARTISTA .. ? MA INTANTO LASCIO ANCHE QUESTA PARTE
      fetch(myUrl + idArtista)
        .then((response) => {
          console.log(myUrl + idArtista);
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("ERRORE");
          }
        })

        .then((dataIdUrl) => {
          console.log("OGGETTO ARTISTA DA URL CON ID", dataIdUrl);

          function formattaNumeroConPunti(numero) {
            return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          }

          const generaContenuto = () => {
            const divAlto = document.getElementById("sezioneAlta");
            const divImg = document.getElementById("imgArtista");
            const img = document.createElement("img");
            const colName = document.createElement("h1");
            const colAscoltatoriMensili = document.createElement("div");
            //COME CIRCA SEMPRE L'IMMAGINE DI BACKROUND MI DA PROBLEMI,
            ///CHIODO FISSO .. DOMANI MI DITE VOI CHE STO SBAGLIANDO, ITANTO HO ASSEGNATO LA SORGENTE AD UN IMMAGINE PER VEDERE SE FUNZIONAVA

            colName.classList.add("col");
            colAscoltatoriMensili.classList.add("col", "fs-5");
            img.src = dataIdUrl.picture_big;
            // divImg.style.background = "url(${dataIdUrl.picture_big})";
            colName.innerText = dataIdUrl.name;
            /// MODIFICO IL NUMERO DEGLI ASCOLTATORI MENSILI CON UN PUNTINO OGNI 3 CIFRE INTERE
            const numeroFormattato = formattaNumeroConPunti(dataIdUrl.nb_fan);
            colAscoltatoriMensili.innerText = `${numeroFormattato} ascoltatori mensili`;

            divImg.appendChild(img);
            divAlto.appendChild(colName);
            divAlto.appendChild(colAscoltatoriMensili);
          };
          generaContenuto();
        })

        .catch((err) => {
          console.log("errore", err);
        });

      //   const albumStampati = new Set();
      //   const artistiStampati = new Set(); // TRACCIO GLI ARTISTI GIà STAMPATI
      //   arrayDiOggetti.forEach((element) => {
      //     const artista = element.artist.name;
      // const album = element.album.title;

      // if (!albumStampati.has(album)) {
      //   // VERIFICO SE L'ARTISTA è GIA STATO TRACCIATO
      //   console.log(album);
      //   albumStampati.add(album); //E LO AGGIUNGO AL SET
      // } else {
      //   console.log("ALBUM GIà STAMPATO");
      // }
      //   });
    })

    .catch((err) => {
      console.log(err, "errore");
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
