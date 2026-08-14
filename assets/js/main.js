document.addEventListener("DOMContentLoaded", () => {

    if (typeof loadTrendingTools === "function")
        loadTrendingTools();

    if (typeof loadEditorPicks === "function")
        loadEditorPicks();

    if (typeof loadCategories === "function")
        loadCategories();

    if (typeof loadNews === "function")
        loadNews();

    if (typeof loadAllTools === "function")
        loadAllTools();

    if (typeof initSearch === "function")
        initSearch();

});

window.addEventListener("scroll", () => {

    const header = document.querySelector(".header");

    if (!header) return;

    if (window.scrollY > 20) {

        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.15)";

    } else {

        header.style.boxShadow = "none";

    }

});

// ==========================================
// HERO SEARCH BUTTON
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const heroSearch = document.getElementById("heroSearch");
    const heroSearchButton = document.getElementById("heroSearchButton");

    if (!heroSearch || !heroSearchButton) return;

    function performHeroSearch() {

        const query = heroSearch.value.trim();

        if (!query) {
            heroSearch.focus();
            return;
        }

        window.location.href =
            "ai-tools.html?search=" + encodeURIComponent(query);
    }

    heroSearchButton.addEventListener("click", performHeroSearch);

    heroSearch.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {
            event.preventDefault();
            performHeroSearch();
        }

    });

});
