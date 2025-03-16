import {
    auth,
    onAuthStateChanged,
    db,
    collection,
    getDocs,
    deleteDoc,
    query,
    where,
    doc,
    getDoc
} from "../../config.js";

let profile = document.getElementById("adduser");
let add = document.getElementById("add");
let log = document.getElementById("log");
let blogContainer = document.getElementById("user-blogs");
let contact = document.getElementById("contact");


 
// 🔥 Check If User Is Signed In
onAuthStateChanged(auth, async (user) => {
    if (user) {
        profile.style.display = "block";
        add.style.display = "block";
        log.style.display = "none";
        contact.style.display = "block";

        console.log("User Logged In:", user.uid);

        // 🔥 *Fetch User Data*
        let userId = user.uid;
        let currentUserRef = doc(db, "users", userId);
        let currentUser = await getDoc(currentUserRef);


        if (currentUser.exists()) {
            let signedInUser = currentUser.data();
            console.log("User Data:", signedInUser);

            let email = document.getElementById("user-email");
            let username = document.getElementById("user-name");
            let userage = document.getElementById("user-age");
            let contact = document.getElementById("user-contact");
            let bio = document.getElementById("get-bio");
            let profileImg = document.getElementById("pro-img");

            if (email) email.innerHTML = signedInUser.email;
            if (username) username.value = signedInUser.name;
            if (userage) userage.innerHTML = signedInUser.age;
            if (contact) contact.innerHTML = signedInUser.contact;
            if (bio) bio.innerHTML = signedInUser.bio;
            if (profileImg) profileImg.src = signedInUser.profileImg;


        }

    //fetching blogs for user
        fetchUserBlogs(userId);

    } else {
        console.log("User Signed Out");
        if (window?.location?.pathname === "/assets/html/profile.html") {
            window.location.replace("/");
        }
    }

});

// 
let fetchUserBlogs = async (userId) => {
    try {
        let q = query(collection(db, "blogs"), where("authorId", "==", userId));
        let blogsSnapshot = await getDocs(q);

        if (blogsSnapshot.empty) {
            blogContainer.innerHTML = "<h3>No Blogs Found!</h3>";
            return;
        }

        blogContainer.innerHTML = ""; 

        blogsSnapshot.forEach((doc) => {
            let blogData = doc.data();
            let blogId = doc.id; // 

            let blogCard = `
                <div class="blog-card">
                    <img src="${blogData.image}" alt="Blog Image">
                    <h3>${blogData.topic}</h3>
                    <p>${blogData.blogcontent}...</p>
                    <p><strong>Category:</strong> ${blogData.category}</p>
                    <p><strong>Time:</strong> ${blogData.time}</p>
                  
                <button type="button" onclick="deleteUser('${blogId}')"  class="btn text-light bg-danger "><i class="fa-solid fa-trash"></i></button>
                </div>
            `;

            blogContainer.innerHTML += blogCard;
        });

        //<p><strong>Blog ID:</strong> ${blogId}</p> 
    } catch (error) {
        console.log("Error fetching blogs:", error);
    }
};


//deleting blog


window.deleteUser = async (id)=>{
    try {
   
      let userDel = doc(db, "blogs", id);
      await deleteDoc(userDel);

      alert("Deleted")
     
    } catch (error) {
      console.log(error);
    }
}



    
    
    
    
    
    
    // deleteAcc.addEventListener("click" , async () =>{
        //     try {
        //         let userDel = doc(db, "users", userId);
        //         await deleteDoc(userDel);
        //         alert("Deleted")
        
        //         blogContainer.innerHTML = ""

               
        //         if (window?.location?.pathname === "/assets/html/profile.html") {
        //             window.location.replace("/");
        //              profile.style.display = "none";
        //         add.style.display = "none";
        //         log.style.display = "block";
        //         }
        //       } catch (error) {
        //         console.log(error);
        //       }
        // });