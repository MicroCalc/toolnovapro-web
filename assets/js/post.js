document.addEventListener("DOMContentLoaded", async function () {

    const articleContainer =
        document.getElementById("article");

    const metaDescription =
        document.getElementById("metaDescription");

    const canonicalUrl =
        document.getElementById("canonicalUrl");


    /*
     * Basic validation
     */

    if (!articleContainer) {

        console.error(
            "Article container not found."
        );

        return;

    }


    /*
     * Get slug from URL
     *
     * Example:
     *
     * post.html?slug=best-ai-tools-for-students-2026
     */

    const params =
        new URLSearchParams(
            window.location.search
        );

    const slug =
        params.get("slug");


    /*
     * No slug
     */

    if (!slug) {

        document.title =
            "Article Not Found | ToolNova Pro";


        if (metaDescription) {

            metaDescription.setAttribute(
                "content",
                "The requested article could not be found on ToolNova Pro."
            );

        }


        if (canonicalUrl) {

            canonicalUrl.setAttribute(
                "href",
                "https://toolnova.bond/post.html"
            );

        }


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
            await fetch(
                "assets/data/blog.json"
            );


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
                item =>
                    item.slug === slug
            );


        /*
         * Article doesn't exist
         */

        if (!post) {

            document.title =
                "Article Not Found | ToolNova Pro";


            if (metaDescription) {

                metaDescription.setAttribute(
                    "content",
                    "The requested article could not be found on ToolNova Pro."
                );

            }


            if (canonicalUrl) {

                canonicalUrl.setAttribute(
                    "href",
                    "https://toolnova.bond/post.html"
                );

            }


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
         * ============================
         * Dynamic SEO Metadata
         * ============================
         */


        /*
         * Page title
         */

        document.title =
            `${post.title} | ToolNova Pro`;


        /*
         * Meta description
         */

        if (metaDescription) {

            metaDescription.setAttribute(
                "content",
                post.excerpt || post.title
            );

        }


        /*
         * Canonical URL
         */

        const postUrl =
            `https://toolnova.bond/post.html?slug=${encodeURIComponent(slug)}`;


        if (canonicalUrl) {

            canonicalUrl.setAttribute(
                "href",
                postUrl
            );

        }


        /*
         * ============================
         * Article Structured Data
         * ============================
         */


        /*
         * Remove existing Article schema
         */

        const existingArticleSchema =
            document.getElementById(
                "articleStructuredData"
            );

        if (existingArticleSchema) {

            existingArticleSchema.remove();

        }


        /*
         * Convert article image
         * into an absolute URL
         */

        let articleImage = "";

        if (post.image) {

            try {

                articleImage =
                    new URL(
                        post.image,
                        window.location.origin + "/"
                    ).href;

            }

            catch (error) {

                articleImage =
                    post.image;

            }

        }


        /*
         * Build Article schema
         */

        const articleSchema = {

            "@context":
                "https://schema.org",

            "@type":
                "Article",

            "headline":
                post.title,

            "description":
                post.excerpt || post.title,

            "url":
                postUrl,

            "mainEntityOfPage": {

                "@type":
                    "WebPage",

                "@id":
                    postUrl

            },

            "author": {

                "@type":
                    "Person",

                "name":
                    post.author || "ToolNova Pro"

            },

            "publisher": {

                "@type":
                    "Organization",

                "name":
                    "ToolNova Pro",

                "url":
                    "https://toolnova.bond/"

            }

        };


        /*
         * Add image only when available
         */

        if (articleImage) {

            articleSchema.image =
                articleImage;

        }


        /*
         * Add published date only
         * when it exists in blog.json
         */

        if (post.date) {

            articleSchema.datePublished =
                post.date;

        }


        /*
         * Add modified date only if
         * blog.json actually contains it
         */

        if (post.dateModified) {

            articleSchema.dateModified =
                post.dateModified;

        }


        /*
         * Create Article JSON-LD script
         */

        const articleSchemaScript =
            document.createElement(
                "script"
            );

        articleSchemaScript.type =
            "application/ld+json";

        articleSchemaScript.id =
            "articleStructuredData";

        articleSchemaScript.textContent =
            JSON.stringify(
                articleSchema
            );

        document.head.appendChild(
            articleSchemaScript
        );


        /*
         * ============================
         * Breadcrumb Structured Data
         * ============================
         */


        /*
         * Remove existing breadcrumb schema
         */

        const existingBreadcrumbSchema =
            document.getElementById(
                "postBreadcrumbStructuredData"
            );

        if (existingBreadcrumbSchema) {

            existingBreadcrumbSchema.remove();

        }


        /*
         * Build breadcrumb schema
         */

        const breadcrumbSchema = {

            "@context":
                "https://schema.org",

            "@type":
                "BreadcrumbList",

            "itemListElement": [

                {

                    "@type":
                        "ListItem",

                    "position":
                        1,

                    "name":
                        "Home",

                    "item":
                        "https://toolnova.bond/"

                },

                {

                    "@type":
                        "ListItem",

                    "position":
                        2,

                    "name":
                        "Blog",

                    "item":
                        "https://toolnova.bond/blog.html"

                },

                {

                    "@type":
                        "ListItem",

                    "position":
                        3,

                    "name":
                        post.title,

                    "item":
                        postUrl

                }

            ]

        };


        /*
         * Create Breadcrumb JSON-LD
         */

        const breadcrumbSchemaScript =
            document.createElement(
                "script"
            );

        breadcrumbSchemaScript.type =
            "application/ld+json";

        breadcrumbSchemaScript.id =
            "postBreadcrumbStructuredData";

        breadcrumbSchemaScript.textContent =
            JSON.stringify(
                breadcrumbSchema
            );

        document.head.appendChild(
            breadcrumbSchemaScript
        );


        /*
         * ============================
         * Display Article
         * ============================
         */

        articleContainer.innerHTML = `

            <span class="article-category">
                ${post.category || "AI Tools"}
            </span>


            <h1 class="article-title">
                ${post.title}
            </h1>


            <div class="article-meta">

                By
                <strong>
                    ${post.author || "ToolNova Pro"}
                </strong>

                &nbsp;•&nbsp;

                ${post.date || ""}

            </div>


            ${
                post.image
                    ? `
                        <img
                            src="${post.image}"
                            alt="${post.title}"
                            class="article-image"
                            loading="eager"
                        >
                    `
                    : ""
            }


            <div class="article-content">

                ${post.content || ""}

            </div>


            <div class="article-back">

                <a href="blog.html">
                    ← Back to all articles
                </a>

            </div>

        `;

    }


    catch (error) {

        console.error(
            "Article loading error:",
            error
        );


        document.title =
            "Article Error | ToolNova Pro";


        if (metaDescription) {

            metaDescription.setAttribute(
                "content",
                "Unable to load this ToolNova Pro article."
            );

        }


        articleContainer.innerHTML = `

            <div class="article-error">

                <h2>
                    Unable to Load Article
                </h2>

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
