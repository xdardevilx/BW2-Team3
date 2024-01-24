const url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

export const searchAPI = async (query) => {
  try {
    const response = await fetch(`${url}${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    } else {
      const data = await response.json();
      console.log("DATA", data);
      return data;
    }
  } catch (error) {
    console.error("Error fetching artist:", error.message);
  }
};
