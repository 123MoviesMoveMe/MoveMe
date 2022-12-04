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
        'X-RapidAPI-Key': 'a62fb629a0mshed9a237e731b6a2p180e5ejsn0a637e076779',
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
      }
	};






//query 2 should be a tt id
// this will take the id from details and hold it in list2 as a list
export function searchDetails(query2) {
    
    const url2 = `https://online-movie-database.p.rapidapi.com/title/get-synopses?tconst=${query2}`;
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





export function AddDocument(Name, TTid) {
    auth.onAuthStateChanged(user => {
        if(user) {
        const colUser = collection(fsinfo, 'User');
        // goes to database colelction "user"
        const colUser2 = doc(colUser, user.uid);
        // goes to the document in colUser named "one"
        const colUser3 = collection(colUser2, 'MoviesLiked');
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        setDoc(doc(colUser3, Name), {
            movieliked: TTid,
        })
    }
    else {
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        //userDetails.innerHTML = '';
        console.log( "while logged out" );
        console.log("notloggedin");
    }
    })

}; 




// query can either be a title or a tt id

const buttonsContainer = document.getElementById("buttonsContainer");

export function searchMovie(query) {
    const url = `https://online-movie-database.p.rapidapi.com/auto-complete?q=${query}`;
    fetch(url, options)
	.then(response => response.json())
	.then(data => {

        const movieList = document.querySelector('.movielist');
        movieList.addEventListener('click', handleClick);
        const list = data.d;
        //array of list with data from the movie search
        //data.d is the specific datas that is outputted from the api
        //list is an array that holds that data
        console.log(list)
        // ^ will output what list holds

        const html = list.map(obj => {
            const button = document.createElement("button");
            if (obj.i == undefined)
            {
                return -1;
            }
            const name = obj.l; // holds the name of movie 
            
            button.innerText = name;
            button.addEventListener("click",function(){
                console.log(name);
                AddDocument(name, detail);
            })
            buttonsContainer.appendChild(button);
            if (obj.i == undefined)
            {
                return -1;
            }
            const poster = obj.i.imageUrl; // holds the poster, i is the image, given by the data 
            // from item.i.imigeUrl
            const detail = obj.id 
            return `
              <section class="movie">
              <img src="${poster}"
              width = "500"
              height = "800"/>
              <h2>${name}</h2> 
              <section class = "details">${detail}</section>
              <button type="button">Movie Details</button> 
              </section>
            `;
          }).join('');
          
          // Insert that HTML on to the movie list element


          function handleClick(e) {
            if (e.target.matches('button')) {
            const details = e.target.previousElementSibling;
            details.classList.toggle('show');
            }
        } 

          movieList.insertAdjacentHTML('beforeend', html);


            //const data=[{name:"movie1",poster:"img1",details:"Details for movie1."},{name:"movie2",poster:"img2",details:"Details for movie2."},{name:"movie3",poster:"img3",details:"Details for movie3."}];
            // Demo data
            // `map` over the data to produce your HTML using a
            // template string as you've done in your code (no body element)
            // Make sure you `join` up the array that `map` returns into a
            // whole string once the iteration is complete.
            // This is the handler for the listener attached to the
            // movie list. When that element detects an event from a button
            // it finds button's previous element sibling (the section 
            // with the `.details` class), and, in this case, toggles a show
            // class on/off

/*
        list.map((item) => { //makes a list of each individual movie from the data
            console.log(item)
            //^ will output the individual data in list

            const name = item.l; // holds the name of movie 
            // from item.l
            console.log(name)
            const poster = item.i.imageUrl; // holds the poster, i is the image, given by the data 
            // from item.i.imigeUrl

            const detail = item.id 
            console.log(detail)
*/




            
            // holds the movie id
            // this will give a tt id, we can use this to
            // make a api call to get-synopses
            
            /*
            auth.onAuthStateChanged(user => {
                if(user) {
                const colUser = collection(fsinfo, 'User');
                // goes to database colelction "user"
                const colUser2 = doc(colUser, user.uid);
                // goes to the document in colUser named "one"
                const colUser3 = collection(colUser2, 'MoviesLiked');
                whenSignedIn.hidden = false;
                whenSignedOut.hidden = true;
                setDoc(doc(colUser3, name), {
                    movieliked: detail,
                })
            }

            else {
                whenSignedIn.hidden = true;
                whenSignedOut.hidden = false;
                //userDetails.innerHTML = '';
                console.log( "while logged out" );
                console.log("notloggedin");
            }
            })
        */
            
            //AddDocument(name, detail);

            //searchDetails(detail); 
            
            // below is what shows the poster, movie name, etc
/*
            const movie = 

            `
                <section class="colmd3">
                    <section class = "well text-center">
                        <li><img src="${poster}">
                        <h2>${name}</h2>
                        </li> 
                

                        <button onclick="movielike('${detail}')" class="btn btn-primary" href="#"> like </button>



                        <button onclick = " movielike('${detail}')" id = "likebtn" class="btn btn-primary" href="#"> unlike </button>

                    
                        <button type = "button" id = "MovieDetails" class="btn btn-primary" href="#">Movie Details</button> 



                    </section>
                </section>
               `;



            document.querySelector('.movies').innerHTML += movie; // returns the first element movies and poster to movie div
            //console.log()
*/
//        });
    
        document.getElementById("errorMessage").innerHTML = "";
    })
	.catch((error) => {
        document.getElementById("errorMessage").innerHTML = error;
    });

    // we should make a condition here for when a new item is placed here there will be a page refresh
   // setTimeout(() => {
   //     location.reload();  }, 2000);
}




// Cache the movie list element, and attach a listener to it


// Demo data


// `map` over the data to produce your HTML using a
// template string as you've done in your code (no body element)
// Make sure you `join` up the array that `map` returns into a
// whole string once the iteration is complete.


/// this is what is used to seach for movies

//document.getElementById('MovieDetails').addEventListener("click",myFunction);
//function myFunction(){
//    console.log(detail)
//}


const auth = firebase.auth();
//const hold = "tt110010";
var fsinfo = getFirestore();
//const name = "spiderman";
//const colUser = collection(fsinfo, 'User');
// goes to database colelction "user"
//const colUser2 = doc(colUser, 'one');
// goes to the document in colUser named "one"
//const colUser3 = collection(colUser2, 'LikedMovies');
// goes to the collection in the doc named "one"


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



          getDocs(colUser3)
          .then((snapshot) => {
          let User = []
            snapshot.docs.forEach((doc) => {
                User.push({...doc.data(), id :doc.id })
            })

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

export const whenRefresh = document.getElementById('refresh');

refresh.addEventListener('click', (e) => {
       setTimeout(() => {
      location.reload();  }, 100);
});



function seperate(list){
    const x = list.split(':');

    console.log(x)
    return x[1];
}

/*
const querySnapshot = await getDocs(collection(db, "cities"));
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    });

*/


async function getlist()
{
    const forAI = []; 
    const user = firebase.auth().currentUser;
    if(user) {
            
        const colUser =  collection(fsinfo, 'User');
        const colUser2 = doc(colUser, user.uid/*'X6osFLnyQsNGMh7bAsOgET7G6c82'*/);
        const colUser3 = collection(colUser2, 'MoviesLiked');

        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;

        var snapshot = await getDocs(colUser3);
        snapshot.docs.forEach((doc) =>
        {
            forAI.push(doc.data()['movieliked']);
        });
        return(forAI)    
    }

    else {
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        userDetails.innerHTML = '';
        console.log( "while logged out" );
        console.log("notloggedin");
    }
return(forAI)
}



async function getRecommendation()
{
    auth.onAuthStateChanged(async user => {
        if(user) {    
        const url = 'https://get-recommendation-654aiu3pva-uk.a.run.app'
        const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjE4MzkyM2M4Y2ZlYzEwZjkyY2IwMTNkMDZlMWU3Y2RkNzg3NGFlYTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTExNjU1NDk0NzI3MzQxNjU2Nzk0IiwiZW1haWwiOiJrYWlydWkwNjE5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiNVNhUk5DemhLeXFzSUFSRTVHb24tZyIsImlhdCI6MTY2OTc1NjM4MCwiZXhwIjoxNjY5NzU5OTgwLCJqdGkiOiJmYzI4MmEwNzE4NjJiOTAxMGUzYWU4Yzc5ZmI0OGY0NjU2ZGU4MmVjIn0.PWge7pzCCG3IIPNu-Xrt6f8IHw_102K6xOqzwoDyAUsZdccRBv3gcyLiOC_m8ll_HYPAKiiri9XcF561U3llLuN_y6wpO-Og-VEpcZ9I-zzykBdYaumgSh3V8fbJrUc5qI-hJaUW3J7SGvuTbGT7udIMv31t2wMuHzwRESS9mZwCVYSjeNfQ8sMf7p3mPJ30GYlqPWH-iml0JSznwG49JW77cYDmB_hsk1wclxjqCGE5q-K8WU361kOzXNdQVnaqmnv_wpXEWCfdMsQqEJKtMRrKWPjVBf-t-eYSVeJTzLCwaB4T7UcHHxvTJpneaoCEdTmdqYRDL8nMsfyWanz5tw'
        //get the recommendations for the ai to base decisions on
        const forai = await getlist();
        if(forai.length != 0)
        {
            //fetch to url using CORS protocol
            fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + token,
                    //'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'
                },
                body: JSON.stringify({"movies":forai})})
            .then(res => res.json()).then(data => 
            {
                //console.log(JSON.stringify(JSON.stringify({"movies":forai})))
                console.log(data)

                //UNCOMMENT THE FOR LOOP FOR MULTIPLE MOVIES and comment the 1 line
                searchMovie(data.movies[0]);
                /*
                for (var i = 0; i != 4; i++)
                {
                    searchMovie(data.movies[i]);
                }*/
            }).catch(err => {
                console.log("inside catch")
                //console.log(forAI)
                //console.log(forAI[1])
                console.log(JSON.stringify(JSON.stringify({"movies":["tt0114709","tt0113228","tt0000324"]})))
                console.log(JSON.stringify(JSON.stringify({"movies":forai})))
                console.log(err)
            })
        }
        }else{
            console.log("There is no user logged in at the moment!")
        }
    })    
}
//UNCOMMENT THIS TO get recommendations!
//getRecommendation();