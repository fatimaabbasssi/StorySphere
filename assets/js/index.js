import { db, collection, onSnapshot, query } from "../../config.js";

let blogs = [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []; 
let currentPage = 1;
let blogsPerPage = 2;

// Get All Blogs
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

// Function to display paginated blogs
let showBlogs = () => {
    let blogContainer = document.getElementById("blog-container");
    blogContainer.innerHTML = "";

    let start = (currentPage - 1) * blogsPerPage;
    let end = start + blogsPerPage;
    let paginatedBlogs = blogs.slice(start, end);

    paginatedBlogs.forEach((blog) => {
        let isWishlisted = wishlist.some(item => item.id === blog.id);
        
        blogContainer.innerHTML += `
            <div class="info-container">
                <img src="${blog.image}" alt="${blog.topic}">
                <div class="info-text">
                    <h3>${blog.topic}</h3>
                    <button class="author"> <span class="author-span">Author : </span> ${blog.author}</button>
                    <button class="cate">${blog.category}</button>
                    <p>${blog.blogcontent}</p>
                    <p>${blog.time}</p>
                    <button class="wishlist-btn" 
                        data-blog-id="${blog.id}" 
                        data-title="${blog.topic}" 
                        data-image="${blog.image}" 
                        data-category="${blog.category}">
                        <i class="fa-solid fa-heart" style="color: ${isWishlisted ? 'red' : 'black'};"></i>
                    </button>
                </div>
            </div>
        `;
    });

    addWishlistEventListeners();
    PaginationButtons();
};

// Wishlist button functionality
const addWishlistEventListeners = () => {
    document.querySelectorAll(".wishlist-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
            let blogId = e.currentTarget.getAttribute("data-blog-id");
            let blogTitle = e.currentTarget.getAttribute("data-title");
            let blogImage = e.currentTarget.getAttribute("data-image");
            let blogCategory = e.currentTarget.getAttribute("data-category");

            let blogObj = { id: blogId, title: blogTitle, image: blogImage, category: blogCategory };

            let index = wishlist.findIndex(item => item.id === blogId);
            if (index === -1) {
                wishlist.push(blogObj);
            } else {
                wishlist.splice(index, 1);
            }

            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            showBlogs(); // Update UI after adding/removing
        });
    });
};

// Pagination buttons update
let PaginationButtons = () => {
    let totalPages = Math.ceil(blogs.length / blogsPerPage);
    document.getElementById("prevBtn").disabled = currentPage === 1;
    document.getElementById("nextBtn").disabled = currentPage === totalPages;
};

// Pagination previous button
document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        showBlogs();
        PaginationButtons();
    }
});

// Pagination next button
document.getElementById("nextBtn").addEventListener("click", () => {
    let totalPages = Math.ceil(blogs.length / blogsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        showBlogs();
        PaginationButtons();
    }
});

// Call main blogs function
getAllBlogs();