async function loadFavoriteTools() {

    const grid = document.getElementById("favoriteGrid");

    if (!grid) return;

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.length === 0) {

        grid.innerHTML = `
            <div class="tool-section">

                <h2>No favorites yet ❤️</h2>

                <p>
                    Save some AI tools to see them here.
                </p>

                <a href="ai-tools.html" class="btn">
                    Browse AI Tools
                </a>

            </div>
        `;

        return;

    }

    const response = await fetch("assets/data/tools.json");

    const tools = await response.json();

    const favoriteTools = tools.filter(tool =>
        favorites.includes(tool.slug)
    );

    let html = "";

    favoriteTools.forEach(tool => {

        html += `
            <div class="tool-card">

                <button
                    class="favorite-btn"
                    data-slug="${tool.slug}"
                    onclick="toggleFavorite('${tool.slug}');
                    loadFavoriteTools();">

                    ❤️

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

                    💰 ${tool.pricing}

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

    grid.innerHTML = html;

}

document.addEventListener("DOMContentLoaded", loadFavoriteTools);