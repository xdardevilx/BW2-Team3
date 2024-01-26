import { searchAPI } from "../search-api-music.js";
import { createGridAlbum, createGridArtist } from "../home.js";

export const searchAction = (domElement) => {
  domElement.addEventListener("submit", async () => {
    const artist = [];
    const album = [];

    let searchTerm = document.getElementById("searchInput").value;
    const resp = await searchAPI(searchTerm);

    resp.data.forEach((element) => {
      if (!artist.some((item) => item.id === element.artist.id)) {
        artist.push(element.artist);
      }
      if (!album.some((item) => item.id === element.album.id)) {
        album.push(element.album);
      }
    });

    createGridAlbum(null, album);
    createGridArtist(null, artist);
  });
};
