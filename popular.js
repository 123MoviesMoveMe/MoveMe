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
import {searchMovie} from './main.js'
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
		'X-RapidAPI-Key': 'e5211403d0msh294e51f5227f293p153424jsnc09534c8a754',
		'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
	}
};
async function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function seperate(list){
    const x = list.split('/');
    console.log(x)
    return x[2];
}

async function searchTopMovies() {
    
    const url3 = 'https://online-movie-database.p.rapidapi.com/title/get-most-popular-movies'
    fetch(url3, options)
	.then(response2 => response2.json())
	.then(data2 => {
        console.log(data2)

        for(let i = 0; i != 4; i++){
            const newdata = seperate(data2[i]);
            searchMovie(newdata);
        }


        /*
    const limitlist = [];

    for(var i = 0; i != 5; i++)
    {
        limitlist[i] = data2[i];
    }
    console.log(limitlist)


    const html2 = limitlist.map(obj => {
        for(let j = 0; j != limitlist.length; j++)
        {
            const newdata = seperate(limitlist[j]);
            console.log(newdata)
            searchMovie(newdata);
        }

        //searchMovie(newdata);
        //console.log(obj)


    })
*/


        /*
        for(let i = 0; i != 4; i++){
            delay(20000);
            const newdata = seperate(data2[i]);
            searchMovie(newdata);
            
        }
        */

        //working sample
        //const newdata = seperate(data2[0]);
        //console.log(newdata)
        //const list = data2[0];
        //console.log(newdata)
        //searchMovie(newdata);




        //console.log(list) 
        //for (let i = 0; i < data2.length; i++){
        //delay(1000).then(() => console.log('ran after 1 second1 passed'));
        //searchTopMovies(list);
        //};


        
        // data2 should be an array holding the movie synopsus

        document.getElementById("errorMessage").innerHTML = "";

    })
	.catch((error) => {
        document.getElementById("errorMessage").innerHTML = error;
    });
}


console.log(searchTopMovies())
