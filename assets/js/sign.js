



import { 
    auth, 
    createUserWithEmailAndPassword, 
    sendEmailVerification,
    db, doc, setDoc, 
    serverTimestamp 
  } from "../../config.js";
  
  let signIn = async (e) => {
    e.preventDefault();
    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let age = document.getElementById("age").value;
    let contact = document.getElementById("user-contact").value;
    let name = document.getElementById("username").value;
    let bio = document.getElementById("userBio").value;
    
  //getting img from html
    const fileInput = document.getElementById("pro-image");
    const selectedImage = fileInput.files[0];
  
  
    //default image
    let profileImg = `https://i.pinimg.com/736x/44/95/12/4495124f97de536535464aa6558b4452.jpg`; 
  
  //uploading image in cloudinary
    if (selectedImage) {
        const cloudName = "diryrdyol";
        const presetName = "blog-website";
  
        const formData = new FormData();
        formData.append("file", selectedImage);
        formData.append("upload_preset", presetName);
        formData.append("cloud_name", cloudName);
  
  
        //creating reference fetching
        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: "POST",
                body: formData
            });
  
            //converting it to json
            const data = await response.json();

            console.log(data.secure_url)
            if (data.secure_url) {
                profileImg = data.secure_url; 
            }
        } catch (error) {
            console.error("Error uploading image: ", error);
        }
    }
  
    try {
        let userCredential = await createUserWithEmailAndPassword(auth, email, password);
        let user = userCredential?.user;
        let userId = user.uid
         // send verification email
       // await sendEmailVerification(auth.currentUser);
  
        await setDoc(doc(db, "users", user.uid), {
            name,
            age,
            contact,
            email,
            bio,
            profileImg,  
            userId,
            isActive: true,
            timestamp: serverTimestamp()
        });

        alert("signed In")
  
        if (userCredential?.user) window.location.pathname = "/index.html";
        
    } catch (error) {
        console.log("Error in signIn:", error);
    }
  };
  
  document.getElementById("sign-in")?.addEventListener("submit", signIn);
