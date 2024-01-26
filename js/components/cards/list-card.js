export const createListCard = (album) => {
  const card = document.createElement("div");
  card.classList.add("card", "border-0", "custom-card");
  card.setAttribute("style", "max-height:48px");
  card.setAttribute("id", `${album.id}`);

  card.innerHTML = `
  
    <div class="row g-0">
      <div class="col-2 col-sm-2 col-md-3">
        <img src="${
          album.cover_small
        }" class="img-fluid rounded-start" alt="..." style="height:48px">
      </div>
      <div class="col-10 col-sm-10 col-md-9">
        <div class="card-body d-flex align-items-center " style="height:48px">
          <p class="card-text">${album.title.substring(0, 12)}...</p>
        </div>
      </div>
    </div>
  
    `;

  return card;
};
