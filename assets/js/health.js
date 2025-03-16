import { db,
    collection, 
    query, 
    where, 
    getDocs } from "../../config.js";
    
    const blogContainer = document.getElementById("blog-container");
    
    const fetchFashionBlogs = async () => {
        try {
            const blogsRef = collection(db, "blogs");
            const q = query(blogsRef, where("category", "==", "health"));
            const querySnapshot = await getDocs(q);
            
            blogContainer.innerHTML = ""; // Purane blogs remove karo
            if (querySnapshot.empty) {
                blogContainer.innerHTML = "<p>No blogs found in Fashion category.</p>";
                return;
            }
    
            querySnapshot.forEach((doc) => {
                let blog = doc.data();
                blogContainer.innerHTML += `
                    <div class="info-container">
                    <img src="${blog.image}" alt="${blog.topic}">
                    <div class="info-text">
                        <h3>${blog.topic}</h3>
                         <button class="author">${blog.author}</button>
                        <button class="cate">${blog.category}</button>
                        <p>${blog.blogcontent}</p>
                        <p>${blog.time}</p>
                    </div>
                </div>
                `;
            });
        } catch (error) {
            console.log("Error fetching blogs:", error);
        }
    };
    
    fetchFashionBlogs();