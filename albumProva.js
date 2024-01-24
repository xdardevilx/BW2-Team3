// CERCANDO UN GENERE LA PAGINA LI CARICHERà
let myUrl = ' https://striveschool-api.herokuapp.com/api/deezer/album/';
const albumId = '212350';

const searchGenere = function () {
  fetch(myUrl + albumId)
    .then((response) => {
      console.log('MYURL + ALBUMID', myUrl + albumId);
      if (response.ok) {
        return response.json();
      } else {
        throw new error('ERRORE');
      }
    })
    .then((data) => {
      console.log('OGGETTO RICEVUTO', data);
      const creaContenutoAlbum = function () {
        const img = document.getElementById('imgAlbum');
        const h1 = document.getElementById('h1');
        const artista = document.getElementById('artista');
        const release = document.getElementById('release');
        const nBrani = document.getElementById('nBrani');
        const durataTotale = document.getElementById('durataTotale');

        h1.textContent = data.title;
        h1.classList.add('col');
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
        release.innerText = ' • ' + annoCompleto.split('-')[0] + ' • ';

        const arrayTracks = data.tracks.data;
        console.log(arrayTracks);

        nBrani.textContent = arrayTracks.length + ' brani';

        arrayTracks.forEach((element, i) => {
          console.log('UNA TRACK', element);
          const divTracklist = document.getElementById('divTracklist');
          const divTrack = document.createElement('div');

          const secondsIntoMinutes = function (secondi) {
            let minutes = secondi / 60;
            return minutes.toFixed(2);
          };
          const numeroCanzoneInAlbum = i + 1;
          // const titolo = document.getElementById("titolo");
          // const imgPreview = document.getElementById("preview");

          // titolo.textContent = element.title;
          // console.log("TITOLO TRACK", titoloTrack);
          divTrack.classList.add('row');
          divTrack.innerHTML = `
          <div class="col col-md-4 col-lg-7 d-flex align-items-center   ">
              <h5 class="me-4 text-secondary ">${numeroCanzoneInAlbum}</h5>
              <img src="${element.md5_image}" alt="preview brano">
              <div class="">
                <h4 class="pt-3 text-white " id="titolo">${element.title}</h4>
                <h5 class="text-white-50    ">${element.artist.name}</h5>
              </div>
          </div>
          <p class="col col-md-4 col-lg-4 text-white-50 ">1,5Mln</p>
          <p class="col col-md-1 col-lg-1 text-white-50" id="durata">${secondsIntoMinutes(
            element.duration
          )}</p>
          `;

          divTracklist.appendChild(divTrack);
        });
      };
      creaContenutoAlbum();
    })
    .catch((err) => {
      console.log('ERRORE', err);
    });
};

searchGenere();
