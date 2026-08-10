// =========================
// FAVORITES
// =========================

function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

function saveFavorites(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

function isFavorite(slug) {
    return getFavorites().includes(slug);
}

function toggleFavorite(slug) {

    let favorites = getFavorites();

    if (favorites.includes(slug)) {

        favorites = favorites.filter(item => item !== slug);

    } else {

        favorites.push(slug);

    }

    saveFavorites(favorites);

    updateFavoriteButtons();
}

function updateFavoriteButtons() {

    const favorites = getFavorites();

    document.querySelectorAll(".favorite-btn").forEach(btn => {

        const slug = btn.dataset.slug;

        if (!slug) return;

        if (favorites.includes(slug)) {

            btn.innerHTML = "❤️";

        } else {

            btn.innerHTML = "🤍";

        }

    });

}

document.addEventListener("DOMContentLoaded", updateFavoriteButtons);