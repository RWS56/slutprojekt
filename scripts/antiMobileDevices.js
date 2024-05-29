/*
    liten förklaring:
    Jag har visat på index.html, about us, contact och frågesporten att jag kan anpassa
    sidan för olika enheter. Sedan vill jag fokusera på att göra klart alla hemsidans funktioner
    samt satsar jag mer på mvg i js men ville även visa min förhoppningsvis breda kunskap.
    Hur som helst, jag använder endast detta på ett fåtal sidor
*/

window.onload = function () {
    if (window.innerWidth < 600) {
        document.querySelector("main").innerHTML = '<h3>Sidan är inte anpassad för denna enhet</h3>';
    }
}
