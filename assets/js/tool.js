/* ============================
   Tool Page
============================ */

const params =
    new URLSearchParams(
        window.location.search
    );

const slug =
    params.get("slug");


/* ============================
   Load Tool
============================ */

async function loadTool() {

    try {

        const response =
            await fetch(
                "./assets/data/tools.json"
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load tools.json"
            );

        }


        const tools =
            await response.json();


        /* ============================
           Find Tool
        ============================= */

        const tool =
            tools.find(
                item =>
                    item.slug === slug
            );


        /* ============================
           Page Elements
        ============================= */

        const container =
            document.getElementById(
                "toolContent"
            );


        const breadcrumb =
            document.getElementById(
                "breadcrumb"
            );


        const toolDescription =
            document.getElementById(
                "toolDescription"
            );


        /* ============================
           Container Validation
        ============================= */

        if (!container) {

            return;

        }


        /* ============================
           Tool Not Found
        ============================= */

        if (!tool) {

            document.title =
                "Tool Not Found | ToolNova Pro";


            if (toolDescription) {

                toolDescription.setAttribute(
                    "content",
                    "The requested AI tool could not be found on ToolNova Pro."
                );

            }


            /*
             * Remove any existing canonical.
             */

            document
                .querySelectorAll(
                    'link[rel="canonical"]'
                )
                .forEach(
                    link =>
                        link.remove()
                );


            /*
             * Create canonical for
             * the current URL.
             */

            const notFoundCanonical =
                document.createElement(
                    "link"
                );


            notFoundCanonical.rel =
                "canonical";


            notFoundCanonical.href =
                "https://toolnova.bond/tool.html";


            document.head.appendChild(
                notFoundCanonical
            );


            container.innerHTML = `

                <div class="tool-section">

                    <h2>
                        Tool Not Found
                    </h2>

                    <p>
                        The requested tool could not
                        be found.
                    </p>

                    <a
                        href="ai-tools.html"
                        class="btn"
                    >
                        Back to AI Tools
                    </a>

                </div>

            `;


            return;

        }


        /* ============================
           Dynamic SEO Metadata
        ============================= */

        document.title =
            `${tool.name} Review, Features & Alternatives | ToolNova Pro`;


        if (toolDescription) {

            toolDescription.setAttribute(
                "content",
                `Explore ${tool.name} features, capabilities, pricing, use cases and alternatives. Learn what ${tool.name} can do and whether it is right for you.`
            );

        }


        /* ============================
           Dynamic Canonical
        ============================= */

        const canonicalUrl =
            `https://toolnova.bond/tool.html?slug=${encodeURIComponent(tool.slug)}`;


        /*
         * Remove ALL canonical tags.
         *
         * This prevents Google from seeing
         * multiple conflicting canonical URLs.
         */

        document
            .querySelectorAll(
                'link[rel="canonical"]'
            )
            .forEach(
                link =>
                    link.remove()
            );


        /*
         * Create ONE canonical tag.
         */

        const canonical =
            document.createElement(
                "link"
            );


        canonical.rel =
            "canonical";


        canonical.href =
            canonicalUrl;


        document.head.appendChild(
            canonical
        );


        /* ============================
           Remove Existing Structured Data
        ============================= */

        const oldSoftwareSchema =
            document.getElementById(
                "toolStructuredData"
            );


        if (oldSoftwareSchema) {

            oldSoftwareSchema.remove();

        }


        const oldBreadcrumbSchema =
            document.getElementById(
                "toolBreadcrumbStructuredData"
            );


        if (oldBreadcrumbSchema) {

            oldBreadcrumbSchema.remove();

        }


        /* ============================
           SoftwareApplication Schema
        ============================= */

        const toolSchema = {

            "@context":
                "https://schema.org",

            "@type":
                "SoftwareApplication",

            "name":
                tool.name,

            "description":
                tool.longDescription ||
                tool.description ||
                "",

            "applicationCategory":
                "SoftwareApplication",

            "operatingSystem":
                (tool.platforms || [])
                    .join(", "),

            "url":
                canonicalUrl,

            "publisher": {

                "@type":
                    "Organization",

                "name":
                    "ToolNova Pro",

                "url":
                    "https://toolnova.bond/"

            }

        };


        const schemaScript =
            document.createElement(
                "script"
            );


        schemaScript.type =
            "application/ld+json";


        schemaScript.id =
            "toolStructuredData";


        schemaScript.textContent =
            JSON.stringify(
                toolSchema
            );


        document.head.appendChild(
            schemaScript
        );


        /* ============================
           Breadcrumb Schema
        ============================= */

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
                        "AI Tools",

                    "item":
                        "https://toolnova.bond/ai-tools.html"

                },

                {

                    "@type":
                        "ListItem",

                    "position":
                        3,

                    "name":
                        tool.name,

                    "item":
                        canonicalUrl

                }

            ]

        };


        const breadcrumbSchemaScript =
            document.createElement(
                "script"
            );


        breadcrumbSchemaScript.type =
            "application/ld+json";


        breadcrumbSchemaScript.id =
            "toolBreadcrumbStructuredData";


        breadcrumbSchemaScript.textContent =
            JSON.stringify(
                breadcrumbSchema
            );


        document.head.appendChild(
            breadcrumbSchemaScript
        );


        /* ============================
           Visible Breadcrumb
        ============================= */

        if (breadcrumb) {

            breadcrumb.innerHTML = `

                <a href="index.html">
                    Home
                </a>

                <span>
                    /
                </span>

                <a href="ai-tools.html">
                    AI Tools
                </a>

                <span>
                    /
                </span>

                <span>
                    ${tool.name}
                </span>

            `;

        }


        /* ============================
           Features
        ============================= */

        const features =
            (tool.features || [])
                .map(
                    item =>
                        `<li>✔ ${item}</li>`
                )
                .join("");


        /* ============================
           Pros
        ============================= */

        const pros =
            (tool.pros || [])
                .map(
                    item =>
                        `<li>✅ ${item}</li>`
                )
                .join("");


        /* ============================
           Cons
        ============================= */

        const cons =
            (tool.cons || [])
                .map(
                    item =>
                        `<li>❌ ${item}</li>`
                )
                .join("");


        /* ============================
           Platforms
        ============================= */

        const platforms =
            (tool.platforms || [])
                .map(
                    item => `
                        <span class="platform">
                            ${item}
                        </span>
                    `
                )
                .join("");


        /* ============================
           Screenshots
        ============================= */

        const screenshots =
            (tool.screenshots || [])
                .map(
                    img => `
                        <img
                            src="${img}"
                            alt="${tool.name} screenshot"
                            class="screenshot"
                            loading="lazy"
                            onclick="openLightbox('${img}')"
                        >
                    `
                )
                .join("");


        /* ============================
           Render Tool Page
        ============================= */

        container.innerHTML = `

            <div class="tool-header">

                <img
                    src="${tool.image}"
                    alt="${tool.name} logo"
                    class="tool-logo"
                >


                <div class="tool-header-info">

                    <h1>
                        ${tool.name}
                    </h1>


                    <button
                        class="favorite-btn"
                        data-slug="${tool.slug}"
                        onclick="toggleFavorite('${tool.slug}')"
                    >
                        🤍 Save
                    </button>


                    <div class="tool-rating">
                        ⭐ ${tool.rating}
                    </div>


                    <div class="tool-meta">

                        <span>
                            👨‍💻
                            ${tool.developer || "Unknown"}
                        </span>


                        <span>
                            📂
                            ${tool.category}
                        </span>


                        <span>
                            💰
                            ${tool.pricing}
                        </span>


                        <span>
                            📅
                            ${tool.releaseYear || "-"}
                        </span>

                    </div>


                    <a
                        href="${tool.website}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn"
                    >
                        🚀 Get Pro Access
                    </a>

                </div>

            </div>


            <!-- Description -->

            <div class="tool-section">

                <h2>
                    Description
                </h2>

                <p>
                    ${tool.longDescription || tool.description}
                </p>

            </div>


            <!-- Key Features -->

            <div class="tool-section">

                <h2>
                    Key Features
                </h2>

                <ul class="feature-list">

                    ${features}

                </ul>

            </div>


            <!-- Pros -->

            <div class="tool-section">

                <h2>
                    Pros
                </h2>

                <ul class="pros-list">

                    ${pros}

                </ul>

            </div>


            <!-- Cons -->

            <div class="tool-section">

                <h2>
                    Cons
                </h2>

                <ul class="cons-list">

                    ${cons}

                </ul>

            </div>


            <!-- Platforms -->

            <div class="tool-section">

                <h2>
                    Platforms
                </h2>

                <div class="platforms">

                    ${platforms}

                </div>

            </div>


            <!-- Screenshots -->

            <div class="tool-section">

                <h2>
                    Screenshots
                </h2>

                <div class="screenshot-grid">

                    ${screenshots}

                </div>

            </div>

        `;


        /* ============================
           Related Tools
        ============================= */

        loadRelatedTools(
            tool,
            tools
        );

    }


    catch (error) {

        console.error(
            "Tool loading error:",
            error
        );


        const container =
            document.getElementById(
                "toolContent"
            );


        if (container) {

            container.innerHTML = `

                <div class="tool-section">

                    <h2>
                        Error
                    </h2>

                    <p>
                        Unable to load tool information.
                    </p>

                </div>

            `;

        }

    }

}


loadTool();


/* ============================
   Screenshot Lightbox
============================ */

function openLightbox(image) {

    const lightbox =
        document.getElementById(
            "lightbox"
        );


    const lightboxImg =
        document.getElementById(
            "lightboxImg"
        );


    if (
        !lightbox ||
        !lightboxImg
    ) {

        return;

    }


    lightbox.style.display =
        "flex";


    lightboxImg.src =
        image;

}


const lightbox =
    document.getElementById(
        "lightbox"
    );


const closeBtn =
    document.querySelector(
        ".close-lightbox"
    );


if (
    lightbox &&
    closeBtn
) {

    closeBtn.onclick =
        function () {

            lightbox.style.display =
                "none";

        };


    lightbox.onclick =
        function (event) {

            if (
                event.target ===
                lightbox
            ) {

                lightbox.style.display =
                    "none";

            }

        };

}


/* ============================
   Related AI Tools
============================ */

function loadRelatedTools(
    currentTool,
    tools
) {

    const container =
        document.getElementById(
            "relatedTools"
        );


    if (!container) {

        return;

    }


    const related =
        tools
            .filter(
                tool =>
                    tool.category ===
                        currentTool.category &&
                    tool.slug !==
                        currentTool.slug
            )
            .slice(0, 3);


    if (
        related.length === 0
    ) {

        container.innerHTML = `

            <p>
                No related tools available.
            </p>

        `;

        return;

    }


    container.innerHTML =
        related
            .map(
                tool => `

                    <div class="tool-card">

                        <img
                            src="${tool.image}"
                            alt="${tool.name} logo"
                            loading="lazy"
                        >


                        <h3>
                            ${tool.name}
                        </h3>


                        <p>
                            ${tool.description}
                        </p>


                        <div class="tool-info">

                            ⭐ ${tool.rating}

                        </div>


                        <a
                            href="tool.html?slug=${encodeURIComponent(tool.slug)}"
                            class="btn"
                        >
                            Learn More
                        </a>

                    </div>

                `
            )
            .join("");

}
