export const createLargeCard = (artist) => {
  const row = document.getElementById("preference");
  row.classList.add("justify-content-evenly");
  const col = document.createElement("div");
  col.classList.add(
    "col",
    "col-sm-6",
    "col-md-4",
    "col-lg-2",
    "p-1",
    "flex-fill"
  );
  row.appendChild(col);
  col.innerHTML = `
    <div id="${artist.id}" class="card custom-card ">
    <img class="p-2" src="${artist.picture_medium}" class="card-img-top" alt="...">
    <div class="card-body p-0 text-center ">
      <h5 class="card-title">${artist.name}</h5>
      <p class="card-text"><small>n album: ${artist.nb_album}</small> </p>
    </div>
  </div>  
    `;
  const sendParam = document.getElementById(artist.id);
  sendParam.addEventListener("click", (e) => {
    const url = `./paginaArtista.html?artistId=${artist.id}`;
    window.location.href = url;
  });
};
