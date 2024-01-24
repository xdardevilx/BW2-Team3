const url = "https://striveschool-api.herokuapp.com/api/deezer/artist";

export const getArtistAPI = async (idArtist) => {
  try {
    const response = await fetch(`${url}/${idArtist}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    } else {
        const data = await response.json();
        return data;
    }
  } catch (error) {
    console.error("Error fetching artist:", error.message);
  }
};
