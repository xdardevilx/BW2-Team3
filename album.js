let albumId = 212357;

let myUrl = "https://api.deezer.com/album/" + albumId + "/tracks";

// https://striveschool-api.herokuapp.com/api/deezer/album/{id}
// ./album.html?albumId=123

const getDataDatas = function () {
  fetch(myUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore");
      }
    })
    .then((resp) => {
      generateAlbum(resp.data, albumId);
      canzoni = resp.data;
      console.log(canzoni);
    })
    .catch((err) => {
      console.log(err, "errore");
    });
};

const generateAlbum = function (data, albumId) {
  let result = data.filter((element) => {
    return element.album.id === albumId;
  });
  console.log("CD :", result[0].album.title, "  ", "Canzoni :", result);
};
getDataDatas();

//TE LA COPIO ALESSIA!:)
const secondsIntoMinutes = function (secondi) {
  let minutes = secondi / 60;
  return minutes.toFixed(2);
};
console.log(secondsIntoMinutes(756));
