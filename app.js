//console.log(firebase)
const auth = firebase.auth();


const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');

const signInBtn = document.getElementById('signInBtn')
const signOutBtn = document.getElementById('signOutBtn')

const userDetails = document.getElementById('userDetails')


const provider = new firebase.auth.GoogleAuthProvider();

//test

signInBtn.onclick = () => auth.signInWithPopup(provider);

signOutBtn.onclick = () => auth.signOut();

 //function to store user info as a document in firestore.
/*
async function storeUserUid() {
    const newUser = doc(colletion(db, 'User', user.uid));
    await setDoc(newUser, data);
}
//////   function to get user info from firestore though uid.
    async function getUser() {
    const red = doc(db, "User", FirebaseAuth.instance.currentUser.uid)
    const userDoc = await getDoc(ref);
    return userDoc.data();
}
*/




auth.onAuthStateChanged(user =>  {
    if (user) {
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        const uid = user.uid;
        userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`;

        const data = {
            id: uid,
            email,
        };
       // storeUserUid(user);
       /// getUser();
    } else {
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        userDetails.innerHTML = '';
    }
});


const whenLiked = document.getElementById('whenLiked');
const whenDisliked = document.getElementById('whenDisliked');
const whenUnliked = document.getElementById('whenUnliked');







