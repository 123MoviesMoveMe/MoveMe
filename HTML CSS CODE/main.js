const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0d95dad010msh4cae9bde49252a9p18ee25jsn6278aa0f0acc',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
};

function searchMovie(query) {
    const url = `https://imdb8.p.rapidapi.com/auto-complete?q=${query}`;
    fetch(url, options)
	.then(response => response.json())
	.then(data => {
        const list = data.d;//array of list with data from the movie search

        
        list.map((item) => { //makes a list of each individual movie from the data
            const name = item.l; // name of movie
            const poster = item.i.imageUrl; // poster, i is the image, given by the data
            const movie = `<li><img src="${poster}">  <h2>${name}</h2></li>` // actual movie, a list of a combination of both
            document.querySelector('.movies').innerHTML += movie; // Add lsit of movies and poster to movie div
        });
    
        document.getElementById("errorMessage").innerHTML = "";
    })
	.catch((error) => {
        document.getElementById("errorMessage").innerHTML = error;
    });

}

let searchTimeoutToken = 0;

window.onload = () => {
    const movieSearchBoxElement = document.getElementById("movie-search-box")
    movieSearchBoxElement.onkeyup = (event) => {
        clearTimeout(searchTimeoutToken);
        
        searchTimeoutToken=setTimeout(() => {
            searchMovie(movieSearchBoxElement.value);
        }, 500);
        
    };
    }
