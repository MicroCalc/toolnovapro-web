// ===========================================
// Search & Filters
// ===========================================

function initSearch() {

    const search = document.getElementById("toolSearch");
    const category = document.getElementById("categoryFilter");
    const pricing = document.getElementById("pricingFilter");
    const sort = document.getElementById("sortTools");

    if (!search) return;

    function filterTools() {

        let filtered = [...window.allTools];

        // Search
        filtered = filtered.filter(tool =>
            tool.name.toLowerCase().includes(search.value.toLowerCase())
        );

        // Category
        if (category.value !== "") {

            filtered = filtered.filter(tool =>
                tool.category === category.value
            );

        }

        // Pricing
        if (pricing.value !== "") {

            filtered = filtered.filter(tool =>
                tool.pricing === pricing.value
            );

        }

        // Sort
        if (sort.value === "rating") {

            filtered.sort((a, b) => b.rating - a.rating);

        }

        if (sort.value === "name") {

            filtered.sort((a, b) =>
                a.name.localeCompare(b.name)
            );

        }

        displayTools(filtered);

    }

    search.addEventListener("input", filterTools);
    category.addEventListener("change", filterTools);
    pricing.addEventListener("change", filterTools);
    sort.addEventListener("change", filterTools);

}