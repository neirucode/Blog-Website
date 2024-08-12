document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '8093ceccff3b468a95d7d1fc85a5928e'; // Replace with your actual API key
    const blogPostsUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`;

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
        fetch(blogPostsUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Blog posts fetched:', data); // Log the fetched data for debugging

                if (data.status === "ok" && data.articles.length > 0) {
                    // Limit the number of displayed articles to 4
                    const limitedArticles = data.articles.slice(0, 4);

                    limitedArticles.forEach(article => {
                        const postElement = document.createElement('div');
                        postElement.classList.add('blog-post');
                        postElement.innerHTML =
                            `<div class="card">
                                ${article.urlToImage ? `<img loading="lazy" src="${article.urlToImage}" alt="${article.title}">` : ''}
                                <div class="card-content">
                                    <h2>${article.title}</h2>
                                    <p>${article.description || "No description available."}</p>
                                    <a href="${article.url}" target="_blank">Read more</a>
                                </div>
                            </div>`;
                        blogPostsContainer.appendChild(postElement);
                    });

                    // Load featured blogs (images only) from the same data
                    loadFeaturedBlogs(data.articles);
                } else {
                    blogPostsContainer.innerHTML = '<p>No articles found.</p>';
                }
            })
            .catch(error => console.error('Error fetching blog posts:', error));
    }

    function loadFeaturedBlogs(articles) {
        const numImages = 5;
        const shuffledArticles = articles.sort(() => 0.5 - Math.random()).slice(0, numImages);

        const featuredBlogsContainer = document.querySelector('.scroller__inner');
        featuredBlogsContainer.innerHTML = ''; // Clear previous content

        shuffledArticles.forEach(article => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <img loading="lazy" src="${article.urlToImage}" alt="${article.title}">
                <div class="overlays">
                    <p>Featured Blog</p>
                    <h3>${article.title}</h3>
                </div>`;
            featuredBlogsContainer.appendChild(listItem);
        });

        // Duplicate the items for seamless scrolling
        shuffledArticles.forEach(article => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <img loading="lazy" src="${article.urlToImage}" alt="${article.title}">
                <div class="overlays">
                    <p>Featured Blog</p>
                    <h3>${article.title}</h3>
                </div>`;
            featuredBlogsContainer.appendChild(listItem);
        });
    }

    loadBlogPosts();

    document.getElementById('hamburger').addEventListener('click', function () {
        const navLinks = document.querySelector('.nav__links');
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}); // This closing parenthesis and semicolon were missing
