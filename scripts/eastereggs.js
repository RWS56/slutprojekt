//Lite roliga grejer jag lagt till på sidan.
let logoClicks = 0;

document.getElementById("logo").addEventListener("click", (e) => {
    e.preventDefault();
    const logo = document.getElementById("logo");
    for (let i = 0; i < 50 * window.innerWidth / 1920; i++) { //budget performance improve mindre skärmar antas vara långsammare xD
        createParticle(e);
    }
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

function createParticle(e) { //baserad på partiklar från js spel jag gjort tidigare
    const particle = document.createElement('div');
    document.body.appendChild(particle);

    particle.style.position = 'absolute';
    particle.style.backgroundColor = `rgba(168, 168, 168, ${1 - Math.random()})`;
    particle.style.filter = `blur(${Math.random() * 2}px)`;
    particle.style.pointerEvents = 'none';

    let size = Math.floor(Math.random() * 8);
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.borderRadius = `${size}px`;

    particle.style.left = `${e.pageX}px`;
    particle.style.top = `${e.pageY}px`;

    let destinationX = (Math.random() - 0.5) * 2 * 200;
    let destinationY = (Math.random() - 0.5) * 2 * 200;

    let animation = particle.animate([
        {
            transform: `translate(0, 0)`,
            opacity: 1
        },
        {
            transform: `translate(${destinationX}px, ${destinationY}px)`,
            opacity: 0
        }
    ], {
        duration: Math.random() * 1000 + 5000,
        easing: 'cubic-bezier(0, .9, .57, 1)',
        delay: Math.random() * 200
    });

    animation.onfinish = () => {
        particle.remove();
    };
}