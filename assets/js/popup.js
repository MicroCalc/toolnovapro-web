// ===========================================
// PRO ACCESS POPUP
// ===========================================

document.addEventListener("DOMContentLoaded", () => {

    const popup = document.getElementById("popup");
    const completeBtn = document.getElementById("completeNow");
    const closeBtn = document.getElementById("closePopup");

    let targetLink = "";

    // Stop if popup does not exist on this page
    if (!popup || !completeBtn || !closeBtn) {
        console.warn("Pro Access popup elements not found.");
        return;
    }


    // ===========================================
    // OPEN POPUP
    // ===========================================
    // Event delegation is used because homepage
    // cards are created dynamically by home.js.
    // ===========================================

    document.addEventListener("click", (e) => {

        const button = e.target.closest(".pro-access-btn");

        if (!button) return;

        e.preventDefault();

        targetLink = button.dataset.link || "";

        if (!targetLink) {

            console.error("No OGAds link found for this button.");

            return;
        }

        popup.classList.add("active");

    });


    // ===========================================
    // COMPLETE NOW
    // ===========================================

    completeBtn.addEventListener("click", () => {

        if (!targetLink) {

            console.error("No target OGAds link.");

            return;
        }

        window.open(targetLink, "_blank", "noopener,noreferrer");

    });


    // ===========================================
    // CLOSE POPUP
    // ===========================================

    closeBtn.addEventListener("click", () => {

        popup.classList.remove("active");

        targetLink = "";

    });


    // ===========================================
    // CLOSE WHEN CLICKING OUTSIDE POPUP
    // ===========================================

    popup.addEventListener("click", (e) => {

        if (e.target === popup) {

            popup.classList.remove("active");

            targetLink = "";

        }

    });


    // ===========================================
    // CLOSE WITH ESC KEY
    // ===========================================

    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {

            popup.classList.remove("active");

            targetLink = "";

        }

    });

});