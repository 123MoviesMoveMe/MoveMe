
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0d95dad010msh4cae9bde49252a9p18ee25jsn6278aa0f0acc',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
};
    fetch('https://imdb8.p.rapidapi.com/title/get-most-popular-movies?homeCountry=US&purchaseCountry=US&currentCountry=US', options)
	.then(response => response.json())
	.then(data => {
        const PopularMovies = data.d;

        console.log(PopularMovies)

        PopularMovies.map((Item) => {
            const name = Item.l; // name of movie
            const poster = Item.i.imageUrl; // poster, i is the image, given by the data
            const detail = Item.id
            const movie = `
                <div class="colmd3">
                    <div class = "well text-center">
                        <li><img src="${poster}">
                        <h2>${name}</h2></li> 
                        <a onclick="movieSelected('${detail}')" class="btn btn-primary" href="#">Movie Details</a> 
                    </div>
                </div>`;
            document.querySelector('.movies').innerHTML += movie; // Add lsit of movies and poster to movie div
        });
    
        document.getElementById("errorMessage").innerHTML = "";
    })
	.catch((error) => {
        document.getElementById("errorMessage").innerHTML = error;
    });
