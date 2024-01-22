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
      console.log(data, "data");
      let dataArray = data;
      const arrayAlbumId = Array.from(dataArray);
      console.log(arrayAlbumId);
    })
    .catch((err) => {
      console.log(err, "errore");
    });
};
getDataDatas();
