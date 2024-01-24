const url = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
let idArtist = "412";

const getArtistAPI = async () => {
  const response = await fetch(`${url}/${idArtist}`);
  return response.json();
};

const getArtist = async () => {
  const album = await getArtistAPI();
  console.log(album)
  return album;
};

getArtist()