let myUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
let nomeArtista = "metallica";

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
          //   const album = data.album;
          console.log("OGGETTO ARTISTA DA URL CON ID", dataIdUrl);
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
