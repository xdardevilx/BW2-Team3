const url = "https://striveschool-api.herokuapp.com/api/deezer/album";


 

const getAlbumAPI = async (idAlbum) => {
  try {
    const response = await fetch(`${url}/${idAlbum}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching artist:", error.message);
  }
};

export const getAlbum = async (idAlbum) => {
  try {
    const artist = await getAlbumAPI(idAlbum);
    return artist;
  } catch (error) {
    console.error("Error getting artist:", error);
  }
};


