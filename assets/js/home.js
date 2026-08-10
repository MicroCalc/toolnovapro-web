// ===========================================
// HOME PAGE
// ===========================================


// ===========================================
// Load Tools Data
// ===========================================

async function getTools() {

    const response = await fetch("assets/data/tools.json");

    if (!response.ok) {
        throw new Error("Unable to load tools.json");
    }

    return await response.json();

}


// ===========================================
// Create Tool Card
// ===========================================

function createToolCard(tool) {

    return `
        <div class="tool-card">

            <img
                src="${tool.image}"
                alt="${tool.name}"
                loading="lazy"
            >

            <h3>${tool.name}</h3>

            <p>${tool.description}</p>

            <div class="tool-info">

                <span>${tool.category}</span>

                <span>⭐ ${tool.rating}</span>

            </div>

            <div class="tool-card-buttons">

                <a
                    href="#"
                    class="btn pro-access-btn"
                    data-link="${tool.ogads}"
                >
                    🚀 Get Pro Access
                </a>

                <a
                    href="${tool.website}"
                    class="btn btn-secondary"
                >
                    🔓 Learn More
                </a>

            </div>

        </div>
    `;
}


// ===========================================
// Trending Tools
// ===========================================

async function loadTrendingTools() {

    const container = document.getElementById("trendingTools");

    if (!container) return;

    try {

        const tools = await getTools();

        const trendingTools = tools.filter(
            tool => tool.trending === true
        );

        let html = "";

        trendingTools.forEach(tool => {

            html += createToolCard(tool);

        });

        container.innerHTML = html;

    } catch (error) {

        console.error("Error loading trending tools:", error);

        container.innerHTML = `
            <p>Unable to load tools.</p>
        `;

    }

}


// ===========================================
// Editor Picks
// ===========================================

async function loadEditorPicks() {

    const container = document.getElementById("editorPicks");

    if (!container) return;

    try {

        const tools = await getTools();

        const editorTools = tools.filter(
            tool => tool.editorPick === true
        );

        let html = "";

        editorTools.forEach(tool => {

            html += createToolCard(tool);

        });

        container.innerHTML = html;

    } catch (error) {

        console.error("Error loading editor picks:", error);

        container.innerHTML = `
            <p>Unable to load tools.</p>
        `;

    }

}


// ===========================================
// Browse Categories
// ===========================================

async function loadCategories() {

    const container = document.getElementById("categoryGrid");

    if (!container) return;

    try {

        const tools = await getTools();

        const categories = {};

        tools.forEach(tool => {

            if (!categories[tool.category]) {

                categories[tool.category] = 0;

            }

            categories[tool.category]++;

        });

        let html = "";

        Object.keys(categories).forEach(category => {

            html += `
                <a
                    href="category.html?category=${encodeURIComponent(category)}"
                    class="category-card"
                >

                    <h3>${category}</h3>

                    <p>${categories[category]} Tools</p>

                </a>
            `;

        });

        container.innerHTML = html;

    } catch (error) {

        console.error("Error loading categories:", error);

        container.innerHTML = `
            <p>Unable to load categories.</p>
        `;

    }

}


// ===========================================
// Initialize Homepage
// ===========================================

loadTrendingTools();

loadEditorPicks();

loadCategories();