document.addEventListener('DOMContentLoaded', function () {






    // Replace with your Unsplash Access Key
    const accessKey = 'GfG6ZQW8sZ5nVBikAHEVYgvVSkcyzvc3Io8RxWMfvKA';
    const query = 'architecture'; // You can change this to any keyword you like
    const unsplashUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&per_page=10`;

    // Container elements
    const blogPostsContainer = document.getElementById('blog-posts');
    const featuredBlogsContainer = document.querySelector('#featured-blogs .scroller__inner');

    // Check if elements exist
    if (!blogPostsContainer) {
        console.error('Element with id "blog-posts" not found.');
        return;
    }
    if (!featuredBlogsContainer) {
        console.error('Element with class "scroller__inner" inside id "featured-blogs" not found.');
        return;
    }

    function loadBlogPosts() {
        fetch(unsplashUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Photos fetched:', data); // Log the fetched data for debugging

                if (data.results.length > 0) {
                    // Limit the number of displayed photos to 4
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

                    // Load featured blogs (images only) from the same data
                    loadFeaturedBlogs(data.results);
                } else {
                    blogPostsContainer.innerHTML = '<p>No photos found.</p>';
                }
            })
            .catch(error => console.error('Error fetching photos:', error));
    }

    function loadFeaturedBlogs(photos) {
        const numImages = 5;
        const shuffledPhotos = photos.sort(() => 0.5 - Math.random()).slice(0, numImages);

        featuredBlogsContainer.innerHTML = ''; // Clear previous content

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

    // Load the blog posts when the page loads
    loadBlogPosts();


    document.getElementById('hamburger').addEventListener('click', function () {
        const navLinks = document.querySelector('.nav__links');
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}); // This closing parenthesis and semicolon were missing
