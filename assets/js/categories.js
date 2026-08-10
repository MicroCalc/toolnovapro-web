async function loadCategory() {

    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");

    const title = document.getElementById("categoryTitle");

    // Exit if not on category page
    if (!title) return;

    title.textContent = category;

    const response = await fetch("assets/data/tools.json");
    const tools = await response.json();

    const filtered = tools.filter(tool => tool.category === category);

    let html = "";

    filtered.forEach(tool => {

        html += `
        <div class="tool-card">
            <img src="${tool.image}" alt="${tool.name}">
            <h3>${tool.name}</h3>
            <p>${tool.description}</p>

            <div class="tool-info">
                <span>${tool.category}</span>
                <span>⭐ ${tool.rating}</span>
            </div>

            <div class="tool-buttons">
                <a href="${tool.website}" target="_blank" class="btn">
                    🚀 Get Pro Access
                </a>

                <a href="tool.html?slug=${tool.slug}" class="btn btn-secondary">
                    Learn More
                </a>
            </div>
        </div>
        `;
    });

    document.getElementById("toolGrid").innerHTML = html;
}

loadCategory();