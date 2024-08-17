document.addEventListener('DOMContentLoaded', function () {
    const accessKey = 'GfG6ZQW8sZ5nVBikAHEVYgvVSkcyzvc3Io8RxWMfvKA';

    // Categories mapping
    const categories = {
        All: 'All',
        Science: 'science',
        Technology: 'technology',
        Architecture: 'architecture',
        Arts: 'arts'
    };

    const blogPostsContainer = document.getElementById('blog-posts');
    const allBlogPostsContainer = document.getElementById('all-blog-posts');
    const featuredBlogsContainer = document.querySelector('#featured-blogs .scroller__inner');

    // Function for loading blog posts for a specific category
    function loadBlogPosts(category) {
        const unsplashUrl = `https://api.unsplash.com/search/photos?query=${category}&client_id=${accessKey}&per_page=10`;

        fetch(unsplashUrl)
            .then(response => response.json())
            .then(data => {
                blogPostsContainer.innerHTML = ''; // Clear previous content
                if (data.results.length > 0) {
                    const limitedPhotos = data.results.slice(0, 4);

                    limitedPhotos.forEach(photo => {
                        const postElement = document.createElement('div');
                        postElement.classList.add('blog-post');
                        postElement.innerHTML =
                            `<div class="card">
                                <img src="${photo.urls.regular}" alt="${photo.alt_description}">
                                <div class="card-content">
                                    <h2>${photo.alt_description || "No title available"}</h2>
                                    <p>Photo by ${photo.user.name}</p>
                                    <a href="${photo.links.html}" target="_blank">View on Unsplash</a>
                                </div>
                            </div>`;
                        blogPostsContainer.appendChild(postElement);
                    });

                    loadFeaturedBlogs(data.results);
                } else {
                    blogPostsContainer.innerHTML = '<p>No photos found.</p>';
                }
            })
            .catch(error => console.error('Error fetching photos:', error));
    }

    // Function for loading all blog posts for a specific category
    function loadAllBlogPosts(category) {
        const unsplashUrl = `https://api.unsplash.com/search/photos?query=${category}&client_id=${accessKey}&per_page=10`;

        fetch(unsplashUrl)
            .then(response => response.json())
            .then(data => {
                allBlogPostsContainer.innerHTML = ''; // Clear previous content
                if (data.results.length > 0) {
                    data.results.forEach(photo => {
                        const postElement = document.createElement('div');
                        postElement.classList.add('all-blog-post');
                        postElement.innerHTML =
                            `<div class="all-card">
                                <img src="${photo.urls.regular}" alt="${photo.alt_description}">
                                <div class="all-card-content">
                                    <h3>Photo by${photo.user.name}</h3>
                                    <p> ${photo.alt_description || "No title available"}</p>
                                    <a href="${photo.links.html}" target="_blank">View on Unsplash</a>
                                </div>
                            </div>`;
                        allBlogPostsContainer.appendChild(postElement);
                    });
                } else {
                    allBlogPostsContainer.innerHTML = '<p>No photos found.</p>';
                }
            })
            .catch(error => console.error('Error fetching photos:', error));
    }


    // Function to fetch category data
    function fetchCategoryData(categories, selector) {
        const apiUrl = `https://api.unsplash.com/search/photos?query=${categories}&client_id=${accessKey}&per_page=10`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const article = data.results[0]; // Get the first image in the category
                if (article) {
                    const categoryItem = document.querySelector(selector);
                    categoryItem.querySelector('img').src = article.urls.small || 'default-image.jpg';
                    categoryItem.querySelector('h3').innerText = categories.charAt(0).toUpperCase() + categories.slice(1);
                    categoryItem.querySelector('p').innerText = article.alt_description || 'No description available.';
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Fetch data for each category and update the DOM
    fetchCategoryData('hollywood', '.item1');
    fetchCategoryData('gaming', '.item2');
    fetchCategoryData('wildlife', '.item3');
    fetchCategoryData('music', '.item4');

    // Function to fetch category data
    function fetchFooterCard(categories, selector) {
        const apiUrl = `https://api.unsplash.com/search/photos?query=${categories}&client_id=${accessKey}&per_page=10`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const article = data.results[0]; // Get the first image in the category
                if (article) {
                    const footerCard = document.querySelector(selector);
                    footerCard.querySelector('img').src = article.urls.small || 'default-image.jpg';
                    footerCard.querySelector('h3').innerText = categories.charAt(0).toUpperCase() + categories.slice(1);
                    footerCard.querySelector('p').innerText = article.alt_description || 'No description available.';
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Fetch data for each category and update the DOM
    fetchFooterCard('hollywood', '.minicard1');
    fetchFooterCard('gaming', '.minicard2');
    fetchFooterCard('wildlife', '.minicard');




    // Function for loading featured blogs
    function loadFeaturedBlogs(photos) {
        const numImages = 5;
        const shuffledPhotos = photos.sort(() => 0.5 - Math.random()).slice(0, numImages);

        featuredBlogsContainer.innerHTML = ''; // Clear previous content

        shuffledPhotos.forEach(photo => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
            <img src="${photo.urls.small}" alt="${photo.alt_description}">
            <div class="overlays">
                <p>Features</p>
                <h3>${photo.alt_description || "No title available"}</h3>
            </div>`;
            featuredBlogsContainer.appendChild(listItem);
        });

        // Duplicate the items for seamless scrolling
        shuffledPhotos.forEach(photo => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
            <img src="${photo.urls.small}" alt="${photo.alt_description}">
            <div class="overlays">
                <p>Featured Blog</p>
                <h3>${photo.alt_description || "No title available"}</h3>
            </div>`;
            featuredBlogsContainer.appendChild(listItem);
        });
    }

    // Load both types of blog posts for a category
    function loadCategory(category) {
        loadBlogPosts(category);
        loadAllBlogPosts(category);
    }

    // Function to handle category change
    function handleCategoryChange(category) {
        // Remove active class from all buttons
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));

        // Add active class to the corresponding category button
        const activeButton = document.querySelector(`.category-btn[data-category="${category}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }

        // Load blog posts based on the selected category
        loadCategory(category);
    }

    // Event listeners for category buttons/links
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', function () {
            const category = this.dataset.category;
            handleCategoryChange(category);
        });
    });

    // Event listeners for dropdown menu items
    document.querySelectorAll('.dropdown-menu a').forEach(menuItem => {
        menuItem.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior

            const category = this.dataset.category;
            handleCategoryChange(category);
        });
    });

    // Load default category when the page loads
    handleCategoryChange('All');

    // Toggle navigation for mobile view
    document.getElementById('hamburger').addEventListener('click', function () {
        const navLinks = document.querySelector('.nav__links');
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
});
