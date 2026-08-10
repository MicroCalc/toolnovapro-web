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
