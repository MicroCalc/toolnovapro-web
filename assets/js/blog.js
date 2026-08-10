window.allPosts = [];

async function loadBlog() {

    const container = document.getElementById("blogGrid");

    if (!container) return;

    try {

        const response = await fetch("assets/data/blog.json");

        if (!response.ok) {
            throw new Error("Unable to load blog.json");
        }

        const posts = await response.json();

        window.allPosts = posts;

        displayPosts(posts);

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="tool-section">
                <h2>Error</h2>
                <p>Unable to load blog posts.</p>
            </div>
        `;

    }

}

function displayPosts(posts) {

    const container = document.getElementById("blogGrid");

    let html = "";

    posts.forEach(post => {

        html += `

        <div class="news-card">

            <img src="${post.image}" alt="${post.title}">

            <div class="news-content">

                <span class="news-date">

                    ${post.date}

                </span>

                <h3>${post.title}</h3>

                <p>${post.excerpt}</p>

                <a
                    href="post.html?slug=${post.slug}"
                    class="btn">

                    Read More

                </a>

            </div>

        </div>

        `;

    });

    container.innerHTML = html;

}

document.addEventListener("DOMContentLoaded", loadBlog);