import {
    auth,
    onAuthStateChanged,
    db,
    collection,
    addDoc,
} from "../../config.js";

// 🔥 Function to Add Blog
let addingBlog = async (e) => {
    e.preventDefault();

    let author = document.getElementById("author").value;
    let topic = document.getElementById("topic").value;
    let blogContent = document.getElementById("blogContent").value;
    let option = document.getElementById("option").value;

    const file = document.getElementById("image");
    const blogImage = file.files[0];

    const cloudName = "diryrdyol";
    const presetName = "blog-website";

    const formData = new FormData();
    formData.append("file", blogImage);
    formData.append("upload_preset", presetName);
    formData.append("cloud_name", cloudName);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        let secureImg = data.secure_url;

        let date = new Date();
        let timeStamp = `${date.getMonth()}, ${date.getDate()}, ${date.getFullYear()}`;

        // 🔥 *Get Current User ID Before Adding Blog*
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                let reference = await addDoc(collection(db, "blogs"), {
                    author: author,
                    topic: topic,
                    category: option,
                    blogcontent: blogContent,
                    image: secureImg,
                    time: timeStamp,
                    authorId: user.uid, 
                });

                console.log("Blog added with id:", reference.id);
                alert("Blog Added")
                window.location.pathname = "/index.html";
            } else {
                console.log("User not logged in");
            }
        });

    } catch (error) {
        console.log("Error adding blog:", error);
    }
};

document.getElementById("add-blog").addEventListener("submit", addingBlog);