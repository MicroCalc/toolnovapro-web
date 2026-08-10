window.allTools = [];

async function loadAllTools() {

    const container = document.getElementById("toolGrid");

    if (!container) return;

    const response = await fetch("assets/data/tools.json");
    window.allTools = await response.json();

    displayTools(window.allTools);

    if (typeof initSearch === "function") {
        initSearch();
    }

}

function displayTools(tools) {

    const container = document.getElementById("toolGrid");

    let html = "";

    tools.forEach(tool => {

        html += `
<div class="tool-card">

    <div class="tool-badge">

        🔥 Trending

    </div>

    <button
        class="favorite-btn"
        data-slug="${tool.slug}"
        onclick="toggleFavorite('${tool.slug}')">

        🤍

    </button>

    <img src="${tool.image}" alt="${tool.name}">

    <h3>${tool.name}</h3>

    <p>${tool.description}</p>

    <div class="tool-meta">

        <span class="category">
            ${tool.category}
        </span>

        <span class="rating">
            ⭐ ${tool.rating}
        </span>

    </div>

    <div class="tool-price">

        💰 ${tool.pricing || "Free"}

    </div>

    <div class="tool-buttons">

        <a
            href="${tool.website}"
            target="_blank"
            class="btn">

            🚀 Get Pro Access

        </a>

        <a
            href="tool.html?slug=${tool.slug}"
            class="btn btn-secondary">

            Learn More

        </a>

    </div>

</div>
`;

    });

    container.innerHTML = html;

    if (typeof updateFavoriteButtons === "function") {
        updateFavoriteButtons();
    }

} // <-- You were missing this brace

loadAllTools();

window.addEventListener("load", () => {

    if (typeof initSearch === "function") {
        initSearch();
    }

});