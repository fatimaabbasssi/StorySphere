import { 
auth,
updatePassword ,
signOut,} from "../../config.js";

let _signOut = () =>{
    alert("Signed Out");
    signOut(auth)  
     window.location.pathname = '/index.html'
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





 //Uploading Image through CLOUDINARY
const ulpoadImage = async () =>{

    //Getting image  from html
    const file = document.getElementById("image")
    const selectedImage = file.files[0]
    console.log(selectedImage);

    //cloudinary cloudName and presetName
    const cloudName = 'diryrdyol'
    const presetName = "blog-app"

    //Crecting Object
    const formData = new FormData()
    formData.append("file" , selectedImage);
    formData.append("upload_preset" , presetName);
    formData.append("cloud_name" , cloudName);


    //fetching  url
    try {
        //creating url response
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,{
        method : 'POST',
        body : formData  
        });
        //converting that url in json()
        const data = await response.json();
        console.log("Uploaded Image" , data);
        document.getElementById("pro-img").src = data.secure_url
        
    } catch (error) {
        console.log(error);
        
    }
    
}
document.getElementById("uploadImage").addEventListener("click" , ulpoadImage)
