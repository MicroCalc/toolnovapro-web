// ===========================================
// Load AI News
// ===========================================

async function loadNews() {

    const container = document.getElementById("newsGrid");

    if (!container) return;

    const response = await fetch("assets/data/news.json");
    const news = await response.json();

    let html = "";

    news.forEach(item => {

        html += `
            <div class="news-card">

                <img src="${item.image}" alt="${item.title}">

                <div class="news-content">

                    <span class="news-date">${item.date}</span>

                    <h3>${item.title}</h3>

                    <p>${item.description}</p>

                    <a href="${item.url}" class="btn">
                        Read Article →
                    </a>

                </div>

            </div>
        `;

    });

    container.innerHTML = html;

}

loadNews();