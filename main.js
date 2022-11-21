import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import {getAuth,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut
      } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { 
  getFirestore, collection, getDocs, addDoc, setDoc, doc
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { getDatabase,set,ref, update } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use;
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
apiKey: "AIzaSyCFU6jSceooLrksmulCGGajPXXpMAZxJR0",
authDomain: "software-engineering-7af33.firebaseapp.com",
projectId: "software-engineering-7af33",
storageBucket: "software-engineering-7af33.appspot.com",
messagingSenderId: "15705666687",
appId: "1:15705666687:web:f9cff180f0d81e29cd7b4a",
measurementId: "G-KWT004WCW9"
};
const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);






const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '769b117f9amsh69c3c967faaafc5p1e16f7jsn193862156d07',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
};

//query 2 should be a tt id
// this will take the id from details and hold it in list2 as a list
function searchDetails(query2) {
    const url2 = `https://imdb8.p.rapidapi.com/title/get-synopses?tconst=${query2}`;
    fetch(url2, options)
	.then(response2 => response2.json())
	.then(data2 => {
        console.log(data2)
        // data2 should be an array holding the movie synopsus

        document.getElementById("errorMessage").innerHTML = "";

    })
	.catch((error) => {
        document.getElementById("errorMessage").innerHTML = error;
    });
}

// query can either be a title or a tt id
function searchMovie(query) {
    const url = `https://imdb8.p.rapidapi.com/auto-complete?q=${query}`;
    fetch(url, options)
	.then(response => response.json())
	.then(data => {



        const list = data.d;
        //array of list with data from the movie search
        //data.d is the specific datas that is outputted from the api
        //list is an array that holds that data
        console.log(list)
        // ^ will output what list holds

        list.map((item) => { //makes a list of each individual movie from the data
            console.log(item)
            //^ will output the individual data in list

            const name = item.l; // holds the name of movie 
            // from item.l

            const poster = item.i.imageUrl; // holds the poster, i is the image, given by the data 
            // from item.i.imigeUrl

            const detail = item.id // holds the movie id
            // this will give a tt id, we can use this to
            // make a api call to get-synopses
            
            
            
            //searchDetails(detail); 
            // will seach for the details ^ code works but will burn out the api responce
            // very fast we should use it somewhere else or place a timer on this
            // as we can only have 5 requests per sec
            // also some movies dont have any details
            // 
            


            // below is what shows the poster, movie name, etc
            const movie = 

            `<div class="colmd3">
                    <div class = "well text-center">
                        <li><img src="${poster}">
                        <h2>${name}</h2></li> 


                        <section id = "whenunliked">
                        <button onclick="movielike('${detail}')" class="btn btn-primary" href="#"> like </button>
                        </section>
                        <section id ="whenliked" hidden = "true">


                        <button id = "likebnt" onclick="movielike('${detail}')" class="btn btn-primary" href="#"> unlike </button>
                        </section>

                        <button id = "unlikebnt" onclick="movieSelected('${detail}')" class="btn btn-primary" href="#">Movie Details</button> 


                    </div>
                </div>`;



            document.querySelector('.movies').innerHTML += movie; // Add lsit of movies and poster to movie div

        });
    
        document.getElementById("errorMessage").innerHTML = "";
    })
	.catch((error) => {
        document.getElementById("errorMessage").innerHTML = error;
    });

    // we should make a condition here for when a new item is placed here there will be a page refresh
   // setTimeout(() => {
   //     location.reload();  }, 2000);
}

/// this is what is used to seach for movies

//function movieSelected(id){
//    console.log('hello')
//    console.log(id)
//}

//"tt123424,tt123213213,tt123123"
//change into  
//["tt123424" , "t123213213", "tt123123"]
//forloop
//searchMovie(A[i])
//

const auth = firebase.auth();
const hold = "tt110010";
var fsinfo = getFirestore();
const name = "spiderman";
//const colUser = collection(fsinfo, 'User');
// goes to database colelction "user"
//const colUser2 = doc(colUser, 'one');
// goes to the document in colUser named "one"
//const colUser3 = collection(colUser2, 'LikedMovies');
// goes to the collection in the doc named "one"





function movielike(id){
    console.log('hello')
    console.log(id)
        // sets a document of email, pass, and uid to 
        // the collection 'User' and saves it as user.uid
        setDoc(doc(colUser,user.uid), {
            movieliked: id,
          })
}

auth.onAuthStateChanged(user => {
    if(user) {
        const colUser = collection(fsinfo, 'User');
        // goes to database colelction "user"
        const colUser2 = doc(colUser, user.uid);
        // goes to the document in colUser named "one"
        
        const colUser3 = collection(colUser2, 'MoviesLiked');
        //setDoc(collection(colUser2, "Movetitle"));
        // goes to the collection in the doc named "one"
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;

        setDoc(doc(colUser3, name), {
            movieliked: hold,
          })
          console.log("while logged in")


          getDocs(colUser3)
          .then((snapshot) => {
          let User = []
            snapshot.docs.forEach((doc) => {
                User.push({...doc.data(), id :doc.id })
            })
            console.log(User)
            })
            .catch(err => {
            console.log(err.message)
            })
    }
    else {
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        userDetails.innerHTML = '';
        console.log( "while logged out" );
        console.log("notloggedin");
    }
})

//movielike(hold);




//// i dont think this does anything also

/*function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
    const url = `https://imdb8.p.rapidapi.com/auto-complete?i=${movieId}`;
    fetch(url, options)
	.then(response => response.json())
	.then(data => {
        console.log(data);//array of list with data from the movie search
        const page = response.data;
        page.map((item) => {
            const poster = item.i.imageUrl; // poster, i is the image, given by the data
            const detail = item.id

            const moviePicked = `
                <div class = "row">
                    <div class="col-md-4">
                        <img src="${poster}" class="thumbnail">
                    </div>
                    <div class="col-md-8">
                        <h2>${detail}</h2>
                    </div>
                </div>
            `;
            document.querySelector('.movied').innerHTML += moviePicked; // Add lsit of movies and poster to movie div
        })
        document.getElementById("errorMessage").innerHTML = "";
    })
	.catch((error) => {
        document.getElementById("errorMessage").innerHTML = error;
    });
}*/
// above does not do anything i dont think




///// this code is for setting how much time  
///// the seach bar can be left alone before being used
let searchTimeoutToken = 0;

window.onload = () => {
    const movieSearchBoxElement = document.getElementById("movie-search-box")
    movieSearchBoxElement.onkeyup = (event) => {
        clearTimeout(searchTimeoutToken);
        
        searchTimeoutToken=setTimeout(() => {
            searchMovie(movieSearchBoxElement.value);
        }, 2000);
        
    };
}

const whenRefresh = document.getElementById('refresh');

refresh.addEventListener('click', (e) => {
       setTimeout(() => {
      location.reload();  }, 100);
});
