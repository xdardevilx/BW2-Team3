const url = "https://striveschool-api.herokuapp.com/api/deezer/album";
let idAlbum = "212357";

const getAlbum = async () => {
  const response = await fetch(`${url}/${idAlbum}`);
  return response.json();
};

getAlbum();
