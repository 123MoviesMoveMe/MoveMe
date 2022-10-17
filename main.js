const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1b9045ab5dmsh178dd0dccefee7ap1db6e3jsna21cc9383b5c',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
};

fetch('https://imdb8.p.rapidapi.com/title/get-genres?tconst=tt0944947', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));