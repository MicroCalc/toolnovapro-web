// ===============================
// Apps
// ===============================

window.allApps = [];

async function loadAllApps() {

    const container = document.getElementById("appGrid");

    if (!container) return;

    try {

        const response = await fetch("assets/data/apps.json");

        if (!response.ok) {
            throw new Error("Unable to load apps.json");
        }

        const apps = await response.json();

        window.allApps = apps;

        displayApps(apps);

        if (typeof initSearch === "function") {
            initSearch();
        }

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="tool-section">
                <h2>Error</h2>
                <p>Unable to load apps.</p>
            </div>
        `;

    }

}

function displayApps(apps) {

    const container = document.getElementById("appGrid");

    if (!container) return;

    let html = "";

    apps.forEach(app => {

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

    loadAllApps();

});