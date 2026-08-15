async function loadCategory() {

    const params =
        new URLSearchParams(window.location.search);

    const category =
        params.get("category");

    const title =
        document.getElementById("categoryTitle");

    const description =
        document.getElementById("categoryDescription");

    const canonical =
        document.getElementById("categoryCanonical");

    // Exit if not on category page
    if (!title) return;

    // No category selected
    if (!category) {

        title.textContent =
            "AI Tools";

        if (description) {

            description.setAttribute(
                "content",
                "Browse AI tools by category on ToolNova Pro."
            );

        }

        if (canonical) {

            canonical.setAttribute(
                "href",
                "https://toolnova.bond/category.html"
            );

        }

        document.title =
            "AI Tools Categories | ToolNova Pro";

        return;
    }

    // Decode category name
    const decodedCategory =
        decodeURIComponent(category);

    // Update H1
    title.textContent =
        decodedCategory;

    // SEO title
    document.title =
        `Best ${decodedCategory} Tools in 2026 | ToolNova Pro`;

    // SEO description
    if (description) {

        description.setAttribute(
            "content",
            `Discover the best ${decodedCategory} tools in 2026. Compare features, ratings and useful AI tools on ToolNova Pro.`
        );

    }

    // Canonical URL
    if (canonical) {

        canonical.setAttribute(
            "href",
            `https://toolnova.bond/category.html?category=${encodeURIComponent(decodedCategory)}`
        );

    }

    try {

        const response =
            await fetch("assets/data/tools.json");

        if (!response.ok) {

            throw new Error(
                "Unable to load tools.json"
            );

        }

        const tools =
            await response.json();

        const filtered =
            tools.filter(
                tool =>
                    tool.category === decodedCategory
            );

        let html = "";

        if (filtered.length === 0) {

            html = `
                <div class="tool-section">

                    <h2>No Tools Found</h2>

                    <p>
                        We couldn't find tools in this category yet.
                    </p>

                </div>
            `;

        } else {

            filtered.forEach(tool => {

                html += `

                <article class="tool-card">

                    <img
                        src="${tool.image}"
                        alt="${tool.name}"
                        loading="lazy"
                    >

                    <h2>${tool.name}</h2>

                    <p>
                        ${tool.description}
                    </p>

                    <div class="tool-info">

                        <span>
                            ${tool.category}
                        </span>

                        <span>
                            ⭐ ${tool.rating}
                        </span>

                    </div>

                    <div class="tool-buttons">

                        <a
                            href="${tool.website}"
                            class="btn"
                        >
                            Explore Tool
                        </a>

                    </div>

                </article>

                `;

            });

        }

        document.getElementById(
            "toolGrid"
        ).innerHTML = html;

    }

    catch (error) {

        console.error(error);

        document.getElementById(
            "toolGrid"
        ).innerHTML = `

            <div class="tool-section">

                <h2>Unable to Load Tools</h2>

                <p>
                    Please try again later.
                </p>

            </div>

        `;

    }

}

loadCategory();
