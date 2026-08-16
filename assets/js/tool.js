const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

async function loadTool() {

    try {

        const response = await fetch("./assets/data/tools.json");

        if (!response.ok) {
            throw new Error("Unable to load tools.json");
        }

        const tools = await response.json();

        const tool = tools.find(t => t.slug === slug);

        const container = document.getElementById("toolContent");
const breadcrumb = document.getElementById("breadcrumb");

const toolDescription =
    document.getElementById("toolDescription");

const toolCanonical =
    document.getElementById("toolCanonical");


// ============================
// Dynamic SEO Metadata
// ============================

document.title =
    `${tool.name} Review, Features & Alternatives | ToolNova Pro`;

if (toolDescription) {

    toolDescription.setAttribute(
        "content",
        `Explore ${tool.name} features, capabilities, pricing, use cases and alternatives. Learn what ${tool.name} can do and whether it is right for you.`
    );

}

if (toolCanonical) {

    toolCanonical.setAttribute(
        "href",
        `https://toolnova.bond/tool.html?slug=${encodeURIComponent(tool.slug)}`
    );

}

// ============================
// Structured Data - Software
// ============================

const existingSchema =
    document.getElementById("toolStructuredData");

if (existingSchema) {
    existingSchema.remove();
}

const toolSchema = {

    "@context": "https://schema.org",

    "@type": "SoftwareApplication",

    "name": tool.name,

    "description":
        tool.longDescription || tool.description,

    "applicationCategory":
        tool.category,

    "operatingSystem":
        (tool.platforms || []).join(", "),

    "url":
        `https://toolnova.bond/tool.html?slug=${encodeURIComponent(tool.slug)}`,

    "publisher": {
        "@type": "Organization",
        "name": "ToolNova Pro",
        "url": "https://toolnova.bond/"
    }

};

const schemaScript =
    document.createElement("script");

schemaScript.type =
    "application/ld+json";

schemaScript.id =
    "toolStructuredData";

schemaScript.textContent =
    JSON.stringify(toolSchema);

document.head.appendChild(schemaScript);


if (!container) return;

        if (!tool) {

            container.innerHTML = `
                <div class="tool-section">
                    <h2>Tool not found</h2>
                    <p>The requested tool could not be found.</p>

                    <a href="ai-tools.html" class="btn">
                        Back to AI Tools
                    </a>
                </div>
            `;
            if (typeof updateFavoriteButtons === "function") {
            updateFavoriteButtons();
}

            return;

        }

        const features = (tool.features || [])
            .map(item => `<li>✔ ${item}</li>`)
            .join("");

        const pros = (tool.pros || [])
            .map(item => `<li>✅ ${item}</li>`)
            .join("");

        const cons = (tool.cons || [])
            .map(item => `<li>❌ ${item}</li>`)
            .join("");

        const platforms = (tool.platforms || [])
            .map(item => `
                <span class="platform">${item}</span>
            `)
            .join("");

        const screenshots = (tool.screenshots || [])
            .map(img => `
                <img
                    src="${img}"
                    alt="${tool.name}"
                    class="screenshot"
                    onclick="openLightbox('${img}')"
                >
            `)
            .join("");

        container.innerHTML = `

            <div class="tool-header">

                <img src="${tool.image}" class="tool-logo">

                <div class="tool-header-info">

                    <h1>${tool.name}</h1>
                    <button
                        class="favorite-btn"
                        data-slug="${tool.slug}"
                        onclick="toggleFavorite('${tool.slug}')">

                        🤍 Save

                      </button>

                    <div class="tool-rating">
                        ⭐ ${tool.rating}
                    </div>

                    <div class="tool-meta">

                        <span>👨‍💻 ${tool.developer || "Unknown"}</span>

                        <span>📂 ${tool.category}</span>

                        <span>💰 ${tool.pricing}</span>

                        <span>📅 ${tool.releaseYear || "-"}</span>

                    </div>

                    <a
                        href="${tool.website}"
                        target="_blank"
                        class="btn">

                        🚀 Get Pro Access

                    </a>

                </div>

            </div>

            <div class="tool-section">

                <h2>Description</h2>

                <p>${tool.longDescription || tool.description}</p>

            </div>

            <div class="tool-section">

                <h2>Key Features</h2>

                <ul class="feature-list">

                    ${features}

                </ul>

            </div>

            <div class="tool-section">

                <h2>Pros</h2>

                <ul class="pros-list">

                    ${pros}

                </ul>

            </div>

            <div class="tool-section">

                <h2>Cons</h2>

                <ul class="cons-list">

                    ${cons}

                </ul>

            </div>

            <div class="tool-section">

                <h2>Platforms</h2>

                <div class="platforms">

                    ${platforms}

                </div>

            </div>

            <div class="tool-section">

                <h2>Screenshots</h2>

                <div class="screenshot-grid">

                    ${screenshots}

                </div>

            </div>

        `;

        loadRelatedTools(tool, tools);

    }

    catch(error){

        console.error(error);

        const container = document.getElementById("toolContent");

        if(container){

            container.innerHTML = `
                <div class="tool-section">

                    <h2>Error</h2>

                    <p>Unable to load tool information.</p>

                </div>
            `;

        }

    }

}

loadTool();



/* ============================
   Screenshot Lightbox
============================ */

function openLightbox(image){

    const lightbox = document.getElementById("lightbox");

    const lightboxImg = document.getElementById("lightboxImg");

    if(!lightbox || !lightboxImg) return;

    lightbox.style.display="flex";

    lightboxImg.src=image;

}

const lightbox=document.getElementById("lightbox");

const closeBtn=document.querySelector(".close-lightbox");

if(lightbox && closeBtn){

    closeBtn.onclick=function(){

        lightbox.style.display="none";

    };

    lightbox.onclick=function(e){

        if(e.target===lightbox){

            lightbox.style.display="none";

        }

    };

}



/* ============================
   Related AI Tools
============================ */

function loadRelatedTools(currentTool, tools){

    const container=document.getElementById("relatedTools");

    if(!container) return;

    const related=tools.filter(tool=>

        tool.category===currentTool.category &&
        tool.slug!==currentTool.slug

    ).slice(0,3);

    if(related.length===0){

        container.innerHTML=`
            <p>No related tools available.</p>
        `;

        return;

    }

    container.innerHTML=related.map(tool=>`

        <div class="tool-card">

            <img src="${tool.image}" alt="${tool.name}">

            <h3>${tool.name}</h3>

            <p>${tool.description}</p>

            <div class="tool-info">

                ⭐ ${tool.rating}

            </div>

            <a
                href="tool.html?slug=${tool.slug}"
                class="btn">

                Learn More

            </a>

        </div>

    `).join("");

}
