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
            "ToolNova: #article container not found."
        );

        return;

    }


    /*
     * ==================================================
     * GET SLUG
     * ==================================================
     */

    const params =
        new URLSearchParams(
            window.location.search
        );

    const slug =
        params.get("slug");


    console.log(
        "ToolNova: Article slug:",
        slug
    );


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
         * BLOG JSON URL
         * ==================================================
         */

        const blogUrl =
            "assets/data/blog.json";


        console.log(
            "ToolNova: Loading:",
            blogUrl
        );


        /*
         * ==================================================
         * FETCH BLOG JSON
         * ==================================================
         */

        const response =
            await fetch(
                blogUrl,
                {
                    cache: "no-store"
                }
            );


        console.log(
            "ToolNova: blog.json status:",
            response.status
        );


        if (!response.ok) {

            throw new Error(
                "blog.json could not be loaded. HTTP status: " +
                response.status
            );

        }


        /*
         * ==================================================
         * PARSE JSON
         * ==================================================
         */

        const posts =
            await response.json();


        console.log(
            "ToolNova: Blog posts loaded:",
            posts.length
        );


        /*
         * ==================================================
         * CHECK JSON FORMAT
         * ==================================================
         */

        if (!Array.isArray(posts)) {

            throw new Error(
                "blog.json must contain an array of articles."
            );

        }


        /*
         * ==================================================
         * FIND ARTICLE
         * ==================================================
         */

        const post =
            posts.find(
                function (item) {

                    return item.slug === slug;

                }
            );


        console.log(
            "ToolNova: Article found:",
            post
        );


        /*
         * ==================================================
         * ARTICLE NOT FOUND
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
                        The article
                        <strong>${slug}</strong>
                        does not exist.
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
         * AUTHOR
         *
         * Use the article author when available.
         * Fall back to Daniel.
         * ==================================================
         */

        const authorName =
            post.author ||
            "Daniel";


        const authorUrl =
            "https://toolnova.bond/about.html";


        /*
         * ==================================================
         * SEO TITLE
         *
         * Use metaTitle when available.
         * Fall back to normal article title.
         * ==================================================
         */

        const seoTitle =
            post.metaTitle ||
            post.title ||
            "ToolNova Pro";


        /*
         * ==================================================
         * SEO DESCRIPTION
         *
         * Use metaDescription when available.
         * Fall back to excerpt.
         * ==================================================
         */

        const seoDescription =
            post.metaDescription ||
            post.excerpt ||
            post.title ||
            "Explore AI tools, reviews, comparisons and guides from ToolNova Pro.";


        console.log(
            "ToolNova: SEO title:",
            seoTitle
        );


        console.log(
            "ToolNova: SEO description:",
            seoDescription
        );


        console.log(
            "ToolNova: Author:",
            authorName
        );


        /*
         * ==================================================
         * SET PAGE TITLE
         * ==================================================
         */

        document.title =
            seoTitle;


        /*
         * ==================================================
         * SET META DESCRIPTION
         * ==================================================
         */

        if (metaDescription) {

            metaDescription.setAttribute(
                "content",
                seoDescription
            );

        }


        /*
         * ==================================================
         * CANONICAL URL
         * ==================================================
         */

        const postUrl =
            "https://toolnova.bond/post.html?slug=" +
            encodeURIComponent(slug);


        if (canonicalUrl) {

            canonicalUrl.setAttribute(
                "href",
                postUrl
            );

        }


        /*
         * ==================================================
         * ARTICLE SCHEMA
         * ==================================================
         */

        const oldArticleSchema =
            document.getElementById(
                "articleStructuredData"
            );


        if (oldArticleSchema) {

            oldArticleSchema.remove();

        }


        /*
         * ==================================================
         * ARTICLE IMAGE
         * ==================================================
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

                console.warn(
                    "ToolNova: Could not convert image URL.",
                    error
                );

                articleImage =
                    post.image;

            }

        }


        /*
         * ==================================================
         * ARTICLE STRUCTURED DATA
         * ==================================================
         */

        const articleSchema = {

            "@context":
                "https://schema.org",

            "@type":
                "Article",

            "headline":
                post.title,

            "description":
                seoDescription,

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

                "@id":
                    "https://toolnova.bond/about.html#daniel",

                "name":
                    authorName,

                "url":
                    authorUrl,

                "jobTitle":
                    "Creator & Editor",

                "worksFor": {

                    "@type":
                        "Organization",

                    "name":
                        "ToolNova Pro",

                    "url":
                        "https://toolnova.bond/"

                }

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
         * ==================================================
         * ADD IMAGE
         * ==================================================
         */

        if (articleImage) {

            articleSchema.image =
                articleImage;

        }


        /*
         * ==================================================
         * ADD PUBLISHED DATE
         * ==================================================
         */

        if (post.date) {

            articleSchema.datePublished =
                post.date;

        }


        /*
         * ==================================================
         * ADD MODIFIED DATE
         * ==================================================
         */

        if (post.dateModified) {

            articleSchema.dateModified =
                post.dateModified;

        }


        /*
         * ==================================================
         * INSERT ARTICLE JSON-LD
         * ==================================================
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
         * BREADCRUMB SCHEMA
         * ==================================================
         */

        const oldBreadcrumbSchema =
            document.getElementById(
                "postBreadcrumbStructuredData"
            );


        if (oldBreadcrumbSchema) {

            oldBreadcrumbSchema.remove();

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
         * ==================================================
         * INSERT BREADCRUMB JSON-LD
         * ==================================================
         */

        const breadcrumbScript =
            document.createElement(
                "script"
            );


        breadcrumbScript.type =
            "application/ld+json";


        breadcrumbScript.id =
            "postBreadcrumbStructuredData";


        breadcrumbScript.textContent =
            JSON.stringify(
                breadcrumbSchema
            );


        document.head.appendChild(
            breadcrumbScript
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
                ${post.title || "Untitled Article"}
            </h1>


            <div class="article-meta">

                By

                <strong>

                    <a
                        href="about.html"
                        rel="author"
                    >
                        ${authorName}
                    </a>

                </strong>


                <span class="author-role">

                    · Creator &amp; Editor, ToolNova Pro

                </span>


                &nbsp;•&nbsp;


                ${post.date || ""}

            </div>


            ${
                post.image
                    ? `
                        <img
                            src="${post.image}"
                            alt="${post.title || "ToolNova article"}"
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
         * ARTICLE CONTENT
         * ==================================================
         */

        const articleContent =
            articleContainer.querySelector(
                ".article-content"
            );


        /*
         * ==================================================
         * FIX TABLES
         * ==================================================
         */

        if (articleContent) {

            const tables =
                articleContent.querySelectorAll(
                    "table"
                );


            tables.forEach(
                function (table) {

                    /*
                     * Add class
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
                     * Wrap table
                     */

                    table.parentNode.insertBefore(
                        wrapper,
                        table
                    );


                    wrapper.appendChild(
                        table
                    );


                    /*
                     * Vertical alignment
                     */

                    const cells =
                        table.querySelectorAll(
                            "th, td"
                        );


                    cells.forEach(
                        function (cell) {

                            cell.style.verticalAlign =
                                "top";

                        }
                    );

                }
            );

        }


        /*
         * ==================================================
         * FIX TABLE HEADERS
         * ==================================================
         */

        if (articleContent) {

            const tables =
                articleContent.querySelectorAll(
                    "table"
                );


            tables.forEach(
                function (table) {

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


                        if (
                            cells.length >= 2
                        ) {

                            Array.from(
                                cells
                            ).forEach(
                                function (cell) {

                                    const header =
                                        document.createElement(
                                            "th"
                                        );


                                    header.innerHTML =
                                        cell.innerHTML;


                                    Array.from(
                                        cell.attributes
                                    ).forEach(
                                        function (
                                            attribute
                                        ) {

                                            header.setAttribute(
                                                attribute.name,
                                                attribute.value
                                            );

                                        }
                                    );


                                    cell.replaceWith(
                                        header
                                    );

                                }
                            );

                        }

                    }

                }
            );

        }


        /*
         * ==================================================
         * SUCCESS
         * ==================================================
         */

        console.log(
            "ToolNova: Article loaded successfully:",
            post.title
        );

    }


    catch (error) {

        /*
         * ==================================================
         * ERROR
         * ==================================================
         */

        console.error(
            "ToolNova: Article loading error:",
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
                    There was a problem loading this article.
                </p>

                <p
                    style="
                        color:#dc2626;
                        font-size:14px;
                        word-break:break-word;
                    "
                >
                    ${error.message}
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
