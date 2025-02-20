const searchForm = document.querySelector('form');
const moviecontainer = document.querySelector('.movie-container');
const inputbox = document.querySelector('.inputbox');

const getMovieInfo = async (movie) => {
    try {
    const myAPIKey = "ebf99333";
    const url = `https://www.omdbapi.com/?apikey=${myAPIKey}&t=${movie}`;

    const response = await fetch(url);

    if(!response.ok){
        throw new Error("Unable to fetch movie data.");
    }

    const data = await response.json();

    showMoveData(data);
    // console.log(data);
} catch (error) {
        showErrorMessage("No Movie Found!!");
}
}

// Function to show movie data on sceeen
const showMoveData = (data) => {
    moviecontainer.innerHTML = "";
    moviecontainer.classList.remove('noBackground');
    // use destructuring assignment to extract properties from data object
    const {Title, imdbRating, Genre, Released, Runtime, Actors, Director, Writer, BoxOffice, Country, Plot, Poster} = data;

    const movieElement = document.createElement(`div`);
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = `<h2>${Title}</h2>
                              <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;

    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');

    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerHTML = element;
        movieGenreElement.appendChild(p);
    });

    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p>
     <p><strong>Director: </strong>${Director}</p>
     <p><strong>Writer: </strong>${Writer}</p>
     <p><strong>Cast: </strong>${Actors}</p>
     <p><strong>Plot: </strong>${Plot}</p>
     <p><strong>Duration: </strong>${Runtime}</p>
     <p><strong>Country: </strong>${Country}</p>
     <p><strong>BoxOffice: </strong>${BoxOffice}</p>
     `;

    // Creating a div for Movie Poster
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src = "${Poster}"/>`;

    moviecontainer.appendChild(moviePosterElement);
    moviecontainer.appendChild(movieElement);
}

// Function to display error message
const showErrorMessage = (message)=>{
        moviecontainer.innerHTML = `<h2>${message}</h2>`;
        moviecontainer.classList.add('noBackground');
}


// Adding event listener to search form
searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const movieName = inputbox.value.trim();
    if(movieName !== ''){
        showErrorMessage("Fetching Movie Information... ");
        getMovieInfo(movieName);
    }
    else{
        showErrorMessage("Enter movie name to get movie information");
    }
    
})

