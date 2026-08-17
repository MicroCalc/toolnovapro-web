document.addEventListener("DOMContentLoaded", async function () {

    const articleContainer =
        document.getElementById("article");

    const metaDescription =
        document.getElementById("metaDescription");

    const canonicalUrl =
        document.getElementById("canonicalUrl");


    /*
     * ==================================================
     * BASIC VALIDATION
     * ==================================================
     */

    if (!articleContainer) {

        console.error(
            "Article container not found."
        );

        return;

    }


    /*
     * ==================================================
     * GET SLUG FROM URL
     *
     * Example:
     * post.html?slug=best-ai-tools-for-students-2026
     * ==================================================
     */

    const params =
        new URLSearchParams(
            window.location.search
        );

    const slug =
        params.get("slug");


    /*
     * ==================================================
     * NO SLUG
     * ==================================================
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

                <h2>
                    Article Not Found
                </h2>

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
         * ==================================================
         * LOAD BLOG DATABASE
         * ==================================================
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
         * ==================================================
         * FIND ARTICLE
         * ==================================================
         */

        const post =
            posts.find(
                item =>
                    item.slug === slug
            );


        /*
         * ==================================================
         * ARTICLE DOES NOT EXIST
         * ==================================================
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

                    <h2>
                        Article Not Found
                    </h2>

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
         * ==================================================
         * DYNAMIC SEO METADATA
         * ==================================================
         */

        document.title =
            `${post.title} | ToolNova Pro`;


        if (metaDescription) {

            metaDescription.setAttribute(
                "content",
                post.excerpt || post.title
            );

        }


        /*
         * ==================================================
         * CANONICAL URL
         * ==================================================
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
         * ==================================================
         * ARTICLE STRUCTURED DATA
         * ==================================================
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
         * into absolute URL
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
         * Add image when available
         */

        if (articleImage) {

            articleSchema.image =
                articleImage;

        }


        /*
         * Add published date
         */

        if (post.date) {

            articleSchema.datePublished =
                post.date;

        }


        /*
         * Add modified date
         */

        if (post.dateModified) {

            articleSchema.dateModified =
                post.dateModified;

        }


        /*
         * Create Article JSON-LD
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
         * ==================================================
         * BREADCRUMB STRUCTURED DATA
         * ==================================================
         */

        const existingBreadcrumbSchema =
            document.getElementById(
                "postBreadcrumbStructuredData"
            );

        if (existingBreadcrumbSchema) {

            existingBreadcrumbSchema.remove();

        }


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
         * ==================================================
         * DISPLAY ARTICLE
         * ==================================================
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


        /*
         * ==================================================
         * FIX ARTICLE TABLES
         *
         * Automatically finds every table inside
         * the article and gives it the correct classes.
         * ==================================================
         */

        const articleContent =
            articleContainer.querySelector(
                ".article-content"
            );


        if (articleContent) {

            const tables =
                articleContent.querySelectorAll(
                    "table"
                );


            tables.forEach(function (table) {

                /*
                 * Add our table class
                 */

                table.classList.add(
                    "comparison-table"
                );


                /*
                 * Create wrapper
                 */

                const wrapper =
                    document.createElement(
                        "div"
                    );


                wrapper.className =
                    "comparison-table-wrapper";


                /*
                 * Put table inside wrapper
                 */

                table.parentNode.insertBefore(
                    wrapper,
                    table
                );


                wrapper.appendChild(
                    table
                );


                /*
                 * Improve table cells
                 */

                const cells =
                    table.querySelectorAll(
                        "th, td"
                    );


                cells.forEach(function (cell) {

                    cell.style.verticalAlign =
                        "top";

                });

            });

        }


        /*
         * ==================================================
         * FIX TABLE HEADER
         *
         * If a table doesn't have <thead>,
         * automatically treat its first row as header.
         * ==================================================
         */

        if (articleContent) {

            const tables =
                articleContent.querySelectorAll(
                    "table"
                );


            tables.forEach(function (table) {

                const firstRow =
                    table.querySelector(
                        "tr"
                    );


                if (
                    firstRow &&
                    !table.querySelector("thead")
                ) {

                    const cells =
                        firstRow.children;


                    /*
                     * Only convert first row
                     * when it looks like a header.
                     */

                    if (
                        cells.length >= 2
                    ) {

                        Array.from(
                            cells
                        ).forEach(function (cell) {

                            const header =
                                document.createElement(
                                    "th"
                                );


                            header.innerHTML =
                                cell.innerHTML;


                            Array.from(
                                cell.attributes
                            ).forEach(
                                function (attribute) {

                                    header.setAttribute(
                                        attribute.name,
                                        attribute.value
                                    );

                                }
                            );


                            cell.replaceWith(
                                header
                            );

                        });

                    }

                }

            });

        }


        /*
         * ==================================================
         * FINISHED
         * ==================================================
         */

        console.log(
            "Article loaded successfully:",
            post.title
        );

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
