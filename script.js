let myUrl = "https://striveschool-api.herokuapp.com/api/deezer/";
let nomeArtista = "salmo";
let searchArtista = "search?q=" + nomeArtista;

const getDataDatas = function () {
  fetch(myUrl + searchArtista)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore");
      }
    })
    .then((data) => {
      console.log(data, "data");
      const oggettoConArray = data;
      const arrayDiOggetti = oggettoConArray.data;
      console.log(arrayDiOggetti);

      const artistiStampati = new Set(); // TRACCIO GLI ARTISTI GIà STAMPATI
      arrayDiOggetti.forEach((element) => {
        const artista = element.artist.id;
        if (!artistiStampati.has(artista)) {
          // VERIFICO SE L'ARTISTA è GIA STATO TRACCIATO
          console.log(artista);
          artistiStampati.add(artista); //E LO AGGIUNGO AL SET
        }
      });
    })
    .catch((err) => {
      console.log(err, "errore");
    });
};
getDataDatas();
