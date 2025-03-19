import { db, collection, onSnapshot, query } from "../../config.js";

let blogs = []; 
let currentPage = 1;
let blogsPerPage = 2; 


//get All blogs 
const getAllBlogs = async () => {
    let cardRef = query(collection(db, "blogs"));

    onSnapshot(cardRef, (querySnapshot) => {
        blogs = []; 
        querySnapshot.forEach((blogData) => {
            let blog = blogData.data();
            blog.id = blogData.id;
            blogs.push(blog);
        });
        showBlogs();
    });
};

//pagiantion function
let showBlogs = () => {
    let blogContainer = document.getElementById("blog-container");
    blogContainer.innerHTML = ""; 

    let start = (currentPage - 1) * blogsPerPage;
    let end = start + blogsPerPage;
    let paginatedBlogs = blogs.slice(start, end);

    paginatedBlogs.forEach((blog) => {
    
        
        blogContainer.innerHTML += `
            <div class="info-container">
                <img src="${blog.image}" alt="${blog.topic}">
                <div class="info-text">
                    <h3>${blog.topic}</h3>
                    <button class="author"> <span class="author-span">Author : </span> ${blog.author}</button>
                    <button class="cate">${blog.category}</button>
                    <p>${blog.blogcontent}</p>
                    <p>${blog.time}</p>
                </div>
            </div>
        `;
    });

    PaginationButtons();
};

// pagination buttons
let PaginationButtons = () => {
    let totalPages = Math.ceil(blogs.length / blogsPerPage);
    document.getElementById("prevBtn").disabled = currentPage === 1;
    document.getElementById("nextBtn").disabled = currentPage === totalPages;
};

// Pagination previous Button
document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        showBlogs();
    }
});


// Pagination next Button
document.getElementById("nextBtn").addEventListener("click", () => {
    let totalPages = Math.ceil(blogs.length / blogsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        showBlogs();
    }
});

// calling main blogs function
getAllBlogs();
