// ===============================
// Software
// ===============================

window.allSoftware = [];

async function loadSoftware() {

    const container = document.getElementById("softwareGrid");

    if (!container) return;

    try {

        const response = await fetch("assets/data/software.json");

        if (!response.ok) {
            throw new Error("Unable to load software.json");
        }

        const software = await response.json();

        window.allSoftware = software;

        displaySoftware(software);

        if (typeof initSearch === "function") {
            initSearch();
        }

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="tool-section">
                <h2>Error</h2>
                <p>Unable to load software.</p>
            </div>
        `;

    }

}

function displaySoftware(software) {

    const container = document.getElementById("softwareGrid");

    if (!container) return;

    let html = "";

    software.forEach(app => {

        html += `

        <div class="tool-card">

            <button
                class="favorite-btn"
                data-slug="${app.slug}"
                onclick="toggleFavorite('${app.slug}')">

                🤍

            </button>

            <img src="${app.image}" alt="${app.name}">

            <h3>${app.name}</h3>

            <p>${app.description}</p>

            <div class="tool-info">

                <span>${app.category}</span>

                <span>⭐ ${app.rating}</span>

            </div>

            <div class="tool-buttons">

                <a
                    href="${app.website}"
                    target="_blank"
                    class="btn">

                    🚀 Get Pro Access

                </a>

            </div>

        </div>

        `;

    });

    container.innerHTML = html;

    if (typeof updateFavoriteButtons === "function") {
        updateFavoriteButtons();
    }

}

document.addEventListener("DOMContentLoaded", () => {

    loadSoftware();

});