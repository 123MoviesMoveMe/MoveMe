const options = {
  method: 'GET',
  url: 'https://imdb8.p.rapidapi.com/auto-complete',
  params: {q: 'game of throne'},
  headers: {
    'X-RapidAPI-Key': 'e5211403d0msh294e51f5227f293p153424jsnc09534c8a754',
    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
  }
};

axios?.request(options)
	.then(function (response) {console.log(response.data);})
	.then(data => {
		const list = data.d;
		list?.map((item) => {
			const name = item.l;
			const poster = item.i.imageUrl;
			const movie = `<li><img ssrc ="${poster}> <h2>${name}</h2></li>`
			document.querySelector('.movies').innerHTML += movie;
		})
	.catch(function (error) {console.error(error);});
});
//////////////////////////////////////// will fetch from url q=...// allspaces need to be changed to%20

/*
fetch('https://imdb8.p.rapidapi.com/title/find?q=game%20of%20thr', options)
	.then(response => response.json())
	.then(data => {
		const list = data.d;

		list?.map((item) => {
			const name = item.l;
			const poster = item.i.imageUrl;
			const movie = `<li><img ssrc ="${poster}> <h2>${name}</h2></li>`
			document.querySelector('.movies').innerHTML += movie;
		})
	})
	.catch(err => {
		console.error(err);
	});


*/