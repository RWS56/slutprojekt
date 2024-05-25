//Lite roliga grejer jag lagt till på sidan.
let logoClicks = 0;

document.getElementById("logo").addEventListener("click", () => {
    const logo = document.getElementById("logo");
    if (logo.style.animation !== "") return;
    logoClicks++;
    logo.style.animation = "shake 0.5s";
    setTimeout(() => {
        document.getElementById("logo").style.animation = "";
        if (logoClicks >= 5) {
            logo.style.animation = "swing 5.5s forwards";
            delete logo;
        }
    }, 500);
});