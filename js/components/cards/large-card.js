export const createLargeCard = (artist) => {
  const card = document.createElement("div")
  card.classList.add("card", "custom-card")
  card.setAttribute("id", artist.id)

  let subtitle = ""
  if(artist.nb_album){
    subtitle = `n album: ${artist.nb_album}`
  }

  card.innerHTML = `
    
    <img class="p-2" src="${artist.picture_medium}" class="card-img-top" alt="...">
    <div class="card-body p-0 text-center ">
      <h5 class="card-title">${artist.name}</h5>
      <p class="card-text"><small>${subtitle}</small> </p>
    </div>
 
    `;

    return card
};
