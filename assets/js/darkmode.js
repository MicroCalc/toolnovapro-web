const themeButton = document.getElementById("themeToggle");

function applyTheme(theme){

    if(theme === "light"){

        document.body.classList.add("light");

    }else{

        document.body.classList.remove("light");

    }

}

const savedTheme = localStorage.getItem("theme") || "dark";

applyTheme(savedTheme);

if(themeButton){

    themeButton.addEventListener("click",()=>{

        const isLight = document.body.classList.toggle("light");

        const theme = isLight ? "light" : "dark";

        localStorage.setItem("theme",theme);

        themeButton.textContent = isLight ? "🌙" : "☀️";

    });

    themeButton.textContent =
        savedTheme === "light" ? "🌙" : "☀️";

}