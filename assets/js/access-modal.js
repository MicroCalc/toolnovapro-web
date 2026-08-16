/* =========================================================
   ToolNova Pro - Get Pro Access Modal
   Works on all tool detail pages
   ========================================================= */

(function () {
    "use strict";

    const OGADS_URL = "https://saveapp.store/cl/i/1xj5nx";

    /* ---------------------------------------------------------
       Create modal HTML
       --------------------------------------------------------- */

    function createAccessModal() {

        // Don't create it twice
        if (document.getElementById("accessModal")) {
            return;
        }

        const modal = document.createElement("div");

        modal.id = "accessModal";
        modal.className = "access-modal";

        modal.innerHTML = `
            <div class="access-modal-overlay"></div>

            <div class="access-modal-box" role="dialog" aria-modal="true" aria-labelledby="accessModalTitle">

                <button
                    type="button"
                    class="access-modal-close"
                    id="accessModalClose"
                    aria-label="Close"
                >
                    ×
                </button>

                <div class="access-modal-icon">
                    🚀
                </div>

                <h2 id="accessModalTitle">
                    Get Pro Access
                </h2>

                <p>
                    To continue, please complete the required
                    step provided by our partner.
                </p>

                <div class="access-modal-buttons">

                    <button
                        type="button"
                        id="completeAccessBtn"
                        class="complete-access-btn"
                    >
                        Complete Now
                    </button>

                    <button
                        type="button"
                        id="cancelAccessBtn"
                        class="cancel-access-btn"
                    >
                        Cancel
                    </button>

                </div>

            </div>
        `;

        document.body.appendChild(modal);

        addModalEvents();
    }


    /* ---------------------------------------------------------
       Open modal
       --------------------------------------------------------- */

    function openAccessModal() {

        createAccessModal();

        const modal = document.getElementById("accessModal");

        if (!modal) {
            return;
        }

        modal.classList.add("active");

        document.body.classList.add("modal-open");
    }


    /* ---------------------------------------------------------
       Close modal
       --------------------------------------------------------- */

    function closeAccessModal() {

        const modal = document.getElementById("accessModal");

        if (!modal) {
            return;
        }

        modal.classList.remove("active");

        document.body.classList.remove("modal-open");
    }


    /* ---------------------------------------------------------
       Modal button events
       --------------------------------------------------------- */

    function addModalEvents() {

        const closeButton =
            document.getElementById("accessModalClose");

        const cancelButton =
            document.getElementById("cancelAccessBtn");

        const completeButton =
            document.getElementById("completeAccessBtn");

        const overlay =
            document.querySelector(".access-modal-overlay");


        if (closeButton) {
            closeButton.addEventListener("click", closeAccessModal);
        }


        if (cancelButton) {
            cancelButton.addEventListener("click", closeAccessModal);
        }


        if (overlay) {
            overlay.addEventListener("click", closeAccessModal);
        }


        if (completeButton) {

            completeButton.addEventListener("click", function () {

                window.location.href = OGADS_URL;

            });

        }


        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                closeAccessModal();
            }

        });

    }


    /* ---------------------------------------------------------
       Detect ALL Get Pro Access buttons
       --------------------------------------------------------- */

    document.addEventListener("click", function (event) {

        const button = event.target.closest(
            ".get-pro-access, #getProAccess, [data-action='get-pro-access']"
        );

        if (!button) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        openAccessModal();

    });


    /* ---------------------------------------------------------
       Also detect buttons by their text
       This makes it work even if your existing HTML
       doesn't have the expected class/id.
       --------------------------------------------------------- */

    document.addEventListener("click", function (event) {

        let element = event.target.closest("button, a");

        if (!element) {
            return;
        }

        const text = element.textContent
            .trim()
            .replace(/\s+/g, " ")
            .toLowerCase();

        if (
            text.includes("get pro access") &&
            !element.classList.contains("complete-access-btn")
        ) {

            event.preventDefault();
            event.stopPropagation();

            openAccessModal();
        }

    });


    /* ---------------------------------------------------------
       Initialize
       --------------------------------------------------------- */

    if (document.readyState === "loading") {

        document.addEventListener("DOMContentLoaded", function () {
            createAccessModal();
        });

    } else {

        createAccessModal();

    }

})();
