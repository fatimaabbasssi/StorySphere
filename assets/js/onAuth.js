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
    getDoc,
    updateDoc
} from "../../config.js";

let profile = document.getElementById("adduser");
let add = document.getElementById("add");
let log = document.getElementById("log");
let sign = document.getElementById("sign");
let homeWrite = document.getElementById("homewrite");
let blogContainer = document.getElementById("user-blogs");
let contact = document.getElementById("contact");


 
// user state
onAuthStateChanged(auth, async (user) => {
    if (user) {
        profile.style.display = "block";
        add.style.display = "block";
        log.style.display = "none";
        sign.style.display = "none";
        contact.style.display = "block";
        homeWrite.style.display = "block";

        console.log("User Logged In:");
       console.log(window.location.pathname);
       

        // user
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

    //fetching blogs of user
        fetchUserBlogs(userId);

    } else {
        if (window?.location?.pathname === "/assets/html/profile.html") {
            window.location.replace("/index.html");
        }
    }

});

// current user blogs
let fetchUserBlogs = async (userId) => {
    try {
        let q = query(collection(db, "blogs"), where("authorId", "==", userId));
        let blogsSnapshot = await getDocs(q);

        if (blogsSnapshot.empty) {
            blogContainer.innerHTML = "<h3>No Blogs Found</h3>";
            return;
        }

        blogContainer.innerHTML = ""; 

        blogsSnapshot.forEach((doc) => {
            let blogData = doc.data();
            let blogId = doc.id; // 

            blogContainer.innerHTML += `
                <div class="blog-card">
                    <img src="${blogData.image}" alt="Blog Image">
                    <h3>${blogData.topic}</h3>
                    <p>${blogData.blogcontent}</p>
                    <p><strong>Category:</strong> ${blogData.category}</p>
                    <p><strong>Time:</strong> ${blogData.time}</p>  
                    <button type="button" onclick="deleteBlog('${blogId}', '${userId}')"  class="btn text-light bg-danger "><i class="fa-solid fa-trash"></i></button>    
                    <button type="button" onclick="openModal('${blogId}')"  class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModalBlog" data-bs-whatever="@mdo"> <i class="fa-solid fa-pencil"></i></button>

                </div>
            `;
        });

    } catch (error) {
        console.log("Error fetching blogs:", error);
    }
};


//deleting blog


window.deleteBlog = async (id, userId)=>{
    try {
   
      let userDel = doc(db, "blogs", id);
      await deleteDoc(userDel);

      alert("Deleted")
      //removing blog realtime
     document.getElementById(id)?.remove();
     //refreshing blogs
     fetchUserBlogs(userId);
     
    } catch (error) {
      console.log(error);
    }
}



//opening modal with old values

window.openModal = async (id) => {
    try {
        let blogRef = doc(db, "blogs", id);
        let blogSnap = await getDoc(blogRef);

        if (!blogSnap.exists()) {
            alert("No blog found!");
            return;
        }

        let blogData = blogSnap.data();

        //old value in modal
        document.getElementById("newauthor").value = blogData.author || "";
        document.getElementById("topic").value = blogData.topic || "";
        document.getElementById("blogContent").value = blogData.blogcontent || "";
        document.getElementById("option").value = blogData.category || "";

        // getting id of blog
        document.getElementById("updateblog").setAttribute("data-id", id);

    } catch (error) {
        console.log("Error fetching blog:", error);
    }
};


//updating blog


document.getElementById("updateblog")?.addEventListener("click", async (e) => {
    e.preventDefault();

    let id = document.getElementById("updateblog").getAttribute("data-id");

    try {
        let blogRef = doc(db, "blogs", id);
        let blogSnap = await getDoc(blogRef);
        if (!blogSnap.exists()) {
            alert("Blog not found!");
            return;
        }

        //new values
        let newTopic = document.getElementById("topic").value.trim();
        let newContent = document.getElementById("blogContent").value.trim();
        let newCategory = document.getElementById("option").value.trim();
        let imageInput = document.getElementById("newImage"); 
        const newImageFile = imageInput?.files[0] || null; 


        let newImageURL = blogSnap.data()?.image; 

        if (newImageFile) {
            console.log("Uploading new image...");
           
            const cloudName = "diryrdyol";
            const presetName = "blog-website";
        
            const formData = new FormData();
            formData.append("file", newImageFile);
            formData.append("upload_preset", presetName);
            formData.append("cloud_name", cloudName);
        

            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: formData,
        })

            let data = await response.json();
            if (data.secure_url) {
               newImageURL = data.secure_url;
            } else {
                alert("Image upload failed");
                return;
            }
        }

        console.log(" Firestore Updating");
        await updateDoc(blogRef, {
            topic: newTopic,
            blogcontent: newContent,
            category: newCategory,
            image: newImageURL
        });

        alert("Blog Updated");
        fetchUserBlogs(auth.currentUser.uid);

    } catch (error) {
        console.log("Error updating blog : ", error);
    }
});

//deleting user


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