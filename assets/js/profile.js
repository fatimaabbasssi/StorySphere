import { 
auth,
updatePassword ,
signOut,} from "../../config.js";

let _signOut = () =>{
    signOut(auth)
}

document.getElementById("signOut").addEventListener("click" , _signOut);


// Update password
let newPass = async () =>{
    try {
        let user = auth.currentUser
        let newpassword = document.getElementById('newpassword').value
        await updatePassword(user, newpassword)
        alert('password update');
        
    } catch (error) {
        console.log(error);
        
    }
 }
 document.getElementById("updatepass").addEventListener('click' , newPass)
