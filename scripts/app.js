//Detta skript hanterar det som ska finnas på varje sida, te.ex. header burgermenyn osv

document.getElementById("burger").addEventListener("click", () => {
    const menu = document.getElementById("menu");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
    const main = document.querySelector("main");

    main.style.display = main.style.display === "none" ? "block" : "none";
});

//eventuellt lägg till en eventlysnare för att clicka på tjänster och att den då gert en en slumpmässigt utvald sida