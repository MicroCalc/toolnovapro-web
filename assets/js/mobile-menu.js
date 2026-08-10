/* ==========================================
   MOBILE MENU
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    if (!menuToggle || !navbar) return;

    // Open / Close menu
    menuToggle.addEventListener("click", (e) => {

        e.stopPropagation();

        navbar.classList.toggle("active");

    });

    // Close after clicking a menu link
    navbar.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("active");

        });

    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {

        if (
            !navbar.contains(e.target) &&
            !menuToggle.contains(e.target)
        ) {

            navbar.classList.remove("active");

        }

    });

    // Close on window resize
    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {

            navbar.classList.remove("active");

        }

    });

});