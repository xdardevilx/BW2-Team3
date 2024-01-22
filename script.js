let myUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=salmo";

const getDataDatas = function () {
  fetch(myUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore");
      }
    })
    .then((data) => {
      generateAlbum(data.data);
    })
    .catch((err) => {
      console.log(err, "errore");
    });
};
getDataDatas();

const generateAlbum = function (response) {
  response.forEach((element) => {
    let albumId = element.album.id;
    console.log(albumId);
  });
};

// const newCol = document.createElement("div");
// newCol.classList.add("col");
// newCol.innerHTML = `  <h3>${element.}</h3>
// <h2></h2>
// <p></p>
// <p></p>`;
