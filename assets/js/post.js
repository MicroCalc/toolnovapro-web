document.addEventListener("DOMContentLoaded", async function () {

    const articleContainer =
        document.getElementById("article");

    const metaDescription =
    document.getElementById("metaDescription");

const canonicalUrl =
    document.getElementById("canonicalUrl");


    /*
     * Get slug from URL
     *
     * Example:
     *
     * post.html?slug=best-ai-tools-for-students-2026
     */

    const params =
        new URLSearchParams(window.location.search);

    const slug =
        params.get("slug");


    /*
     * No slug
     */

    if (!slug) {

        articleContainer.innerHTML = `

            <div class="article-error">

                <h2>Article Not Found</h2>

                <p>
                    No article was specified.
                </p>

                <p>
                    <a href="blog.html">
                        ← Back to Blog
                    </a>
                </p>

            </div>

        `;

        return;

    }


    try {

        /*
         * Load blog database
         */

        const response =
            await fetch("assets/data/blog.json");


        if (!response.ok) {

            throw new Error(
                "Unable to load blog.json"
            );

        }


        const posts =
            await response.json();


        /*
         * Find article
         */

        const post =
            posts.find(
                item => item.slug === slug
            );


        /*
         * Article doesn't exist
         */

        if (!post) {

            articleContainer.innerHTML = `

                <div class="article-error">

                    <h2>Article Not Found</h2>

                    <p>
                        The article you're looking for
                        doesn't exist.
                    </p>

                    <p>
                        <a href="blog.html">
                            ← Back to Blog
                        </a>
                    </p>

                </div>

            `;

            return;

        }


        /*
         * Update page title
         */

        document.title =
            post.title + " | ToolNova Pro";


        /*
         * Update meta description
         */

        if (metaDescription) {

    metaDescription.setAttribute(
        "content",
        post.excerpt
    );

}

if (canonicalUrl) {

    canonicalUrl.setAttribute(
        "href",
        window.location.href
    );

}


        /*
         * Display article
         */

        articleContainer.innerHTML = `

            <span class="article-category">
                ${post.category}
            </span>


            <h1 class="article-title">
                ${post.title}
            </h1>


            <div class="article-meta">

                By <strong>${post.author}</strong>

                &nbsp;•&nbsp;

                ${post.date}

            </div>


            <img
                src="${post.image}"
                alt="${post.title}"
                class="article-image"
            >


            <div class="article-content">

                ${post.content}

            </div>


            <div class="article-back">

                <a href="blog.html">
                    ← Back to all articles
                </a>

            </div>

        `;


    }

    catch (error) {

        console.error(error);


        articleContainer.innerHTML = `

            <div class="article-error">

                <h2>Unable to Load Article</h2>

                <p>
                    Something went wrong while loading
                    this article.
                </p>

                <p>
                    Please try again later.
                </p>

                <p>
                    <a href="blog.html">
                        ← Back to Blog
                    </a>
                </p>

            </div>

        `;

    }

});
