const url = "http://localhost:3000/films";
const filmsDiv = () => document.querySelector("#films");

const showingDiv = () => document.querySelector("#showing");

document.addEventListener("DOMContentLoaded", () => {
  getMovieInfo();
});

function getMovieInfo() {
  fetch(`${url}/1`)
    .then((resp) => resp.json())
    .then(renderMovie);
}

function renderMovie(movie) {
  const posterDiv = document.querySelector("#poster");
  posterDiv.src = movie.poster;
  posterDiv.id = movie.id;

  let showTime = document.getElementById("showtime");
  showTime.innerText = movie.showtime;

  let title = document.getElementById("title");
  title.innerText = movie.title;

  let runtime = document.getElementById("runtime");
  runtime.innerText = `${movie.runtime} minutes`;

  let description = document.getElementById("film-info");
  description.innerText = movie.description;

  let tickets = document.getElementById("ticket-num");
  
  tickets.innerText = movie.capacity - movie.tickets_sold;

  let button = document.getElementById("buy-button");
  if (tickets.innerText === 0) {
      button.innerText = "Sold Out"
  } else {

  button.addEventListener("click", () => {
    buyTicket(movie, button)});
  }
    
}

function buyTicket(movie, button ) {
  if (movie.capacity > movie.tickets_sold) {
movie.tickets_sold = movie.tickets_sold + 1
  } else {
      window.alert("All Sold Out")
  }

  let id = movie.id;
  console.log(id)

  fetch(`${url}/${id}`,{
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({tickets_sold: movie.tickets_sold})
  })

}  
