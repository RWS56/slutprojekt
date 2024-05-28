//Lite roliga grejer jag lagt till på sidan.
/*
    detta skript hanterar lite roliga saker, eastereggs om jag får lov att kalla det så.
    Det är en separat fil för att hålla koden ren och lättläslig.
    Den körs endast på index.html så jag har också slängt i lite saker för att hantera om oss delen av index.html
*/

let readMore = document.getElementById("read-more");
let readLess = document.getElementById("read-less");
let aboutUsShort = document.getElementById("about-us-short");
let aboutUsExtra = document.getElementById("about-us-extra");

readMore.addEventListener("click", (e) => {
    aboutUsShort.classList.remove("visible");
    setTimeout(() => {
        aboutUsExtra.classList.add("visible");
    }, 500);
});

readLess.addEventListener("click", (e) => {
    aboutUsExtra.classList.remove("visible");
    setTimeout(() => {
        aboutUsShort.classList.add("visible");
    }, 500);
});

aboutUsShort.classList.add("visible");
aboutUsExtra.classList.remove("visible");

// Hädanefter börjar koden för index.html eastereggs !!!!


let logoClicks = 0;

document.getElementById("logo").addEventListener("click", (e) => {
    e.preventDefault();

    if (ballList.length > 0) ballList.forEach(ball => ball.ball.remove());

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
            document.getElementById("hiddenBtn").style.display = "block";
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

document.getElementById("hiddenBtn").addEventListener("click", (e) => {
    e.preventDefault();
    const button = document.getElementById("hiddenBtn");
    button.src = "./images/redbuttonpressed.png";
    for (let i = 0; i < 100; i++) {
        let ball = new Bouncyball({ x: e.pageX, y: e.pageY }, { x: Math.random() * 10 - 5, y: Math.random() * 10 - 5 }, 10, "#red", 1);
        document.body.appendChild(ball.ball);
        ballList.push(ball);
    }
});

let mousePos = { x: 0, y: 0 };
window.addEventListener("mousemove", (e) => {
    mousePos.x = e.pageX;
    mousePos.y = e.pageY;
});

ballList = [];

class Bouncyball {
    constructor(position, velocity, radius, color, mass) {
        this.ball = document.createElement('div');
        this.ball.style.width = radius + "px";
        this.ball.style.height = radius + "px";
        this.ball.style.borderRadius = "50%";
        this.ball.style.backgroundColor = color;
        this.ball.style.position = 'absolute';
        this.ball.className = "ball";
        this.position = position;
        this.radius = radius;
        this.mass = mass;
        this.velocity = velocity;
    }

    update() {
        let dx = mousePos.x - this.position.x;
        let dy = mousePos.y - this.position.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 0) {
            dx /= distance;
            dy /= distance;
        }

        if (distance < 200) {
            this.velocity.x += dx * 0.3;
            this.velocity.x = Math.min(10, Math.max(-10, this.velocity.x));
            this.velocity.y += dy * 0.3;
            this.velocity.y = Math.min(10, Math.max(-10, this.velocity.y));
        }

        //set balls color based on distance
        let hue = Math.floor(distance / 10);
        this.ball.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;

        this.velocity.y += 0.1;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.x + this.radius > window.innerWidth) {
            this.position.x = window.innerWidth - this.radius;
            this.velocity.x *= -0.9;
        }
        
        if (this.position.x - this.radius < 0) {
            this.position.x = this.radius;
            this.velocity.x *= -0.9;
        }
        
        if (this.position.y + this.radius > window.innerHeight) {
            this.position.y = window.innerHeight - this.radius;
            this.velocity.y *= -0.9;
            this.velocity.x *= 0.99;
        }
        
        if (this.position.y - this.radius < 0) {
            this.position.y = this.radius;
            this.velocity.y *= -0.9;
            this.velocity.x *= 0.99;
        }

        this.ball.style.left = this.position.x + "px";
        this.ball.style.top = this.position.y + "px";
    }
}

// Game loop
function update() {
    ballList.forEach(ball => ball.update());
    requestAnimationFrame(update);
}

// Start the game loop
update();