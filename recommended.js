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
const auth = firebase.auth();
//const hold = "tt110010";
var fsinfo = getFirestore();


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
                //searchMovie(data.movies[0]);
                for (var i = 0; i != 5; i++)
                {
                    searchMovie(data.movies[i]);
                }
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
getRecommendation();