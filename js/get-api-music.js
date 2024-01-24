const url = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
let idArtist = "412";

const getArtistAPI = async () => {
  const response = await fetch(`${url}/${idAlbum}`);
  return response.json();
};

const getArtist = async () => {
  const album = await getAlbum();
  console.log(album)
  return album;
};

getArtist()