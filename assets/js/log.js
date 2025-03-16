import { 
auth ,
signInWithEmailAndPassword ,
signOut,
sendPasswordResetEmail,
GoogleAuthProvider,
signInWithPopup
} from "../../config.js";

// logIn

let logIn = async (e) =>{

    e.preventDefault()
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
  
     
    try {
        let usercredential = await  signInWithEmailAndPassword(auth, email, password);
        alert("logged In")
        if(usercredential?.user) window.location.pathname = '/index.html'
        
    } catch (error) {
       console.log(error);       
    }  
}
document.getElementById("log-in").addEventListener("submit" ,logIn);



//forgot password reset password

let forgotpass = () =>{

    try {
         let email = document.getElementById("email").value
         sendPasswordResetEmail(auth, email)
    } catch (error) {
        console.log(error);
    }
   
}
document.getElementById("fpass").addEventListener('click' , forgotpass)





// signIn with google || continue with google

let provider = new GoogleAuthProvider()
provider.setCustomParameters({ prompt: "select_account" });
let signInWithgoogle = async () => {

    try {
        await signOut(auth);  //logout
        console.log("User signed out before sign-in attempt.");

        const result = await signInWithPopup(auth, provider); //again sign In with google 
        console.log("User signed in:", result.user);
    } catch (error) {
        console.error("Google Sign-In Error:", error);
    }
}

document.getElementById("signin-google")?.addEventListener("click" , signInWithgoogle);