// CERCANDO UN GENERE LA PAGINA LI CARICHERà
let myUrl = " https://striveschool-api.herokuapp.com/api/deezer/album/";
const albumId = "212357";

const searchGenere = function () {
  fetch(myUrl + albumId)
    .then((response) => {
      console.log(myUrl + albumId);
      if (response.ok) {
        return response.json();
      } else {
        throw new error("ERRORE");
      }
    })
    .then((data) => {
      console.log(data);
      const creaContenutoAlbum = function () {
        const imgDiv = document.getElementById("imgAlbum");
        const img = document.createElement("img");
        const divNomeAlbum = document.getElementById("nomeEartista");
        const divNome = document.createElement("h1");
        const divArtista = document.createElement("h5");

        divNome.textContent = data.title;
        divNome.classList.add("col");
        console.log("prova", data.title);
        img.src = data.cover_big;
        console.log("prova", data.cover_big);
        divArtista.textContent = data.artist.name;

        imgDiv.appendChild(img);
        divNomeAlbum.appendChild(divNome);
        divNomeAlbum.appendChild(divArtista);
      };
      creaContenutoAlbum();
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

searchGenere();
