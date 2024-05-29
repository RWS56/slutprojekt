/*
Detta script hanterar klasser och elever. 
Det är en separat fil för att hålla koden ren och lättläslig.
*/
//initierar variabler
let selectedClass;

//hämtar klasser från localstorage om det finns några annars skapas en tom array
let classes = localStorage.getItem("classes") ? JSON.parse(localStorage.getItem("classes")) : [];
classlist = document.getElementById("class-list");

//För varje klass skapas en lista som jag "sätter ihop" här
classes.forEach((classItem, index) => {
    let list = document.getElementById("class-list");
    let listItem = document.createElement("li");
    let button = document.createElement("Button");
    let cross = document.createElement("img");
    cross.src = "../images/cross.svg";

    button.innerHTML = classItem.name;
    button.dataset.index = index;

    button.addEventListener("click", () => {
        document.getElementById("class-name").value = classItem.name;
        document.getElementById("student-list").value = classItem.students;
        selectedClass = classItem;
    });

    cross.addEventListener("click", () => {
        let index = button.dataset.index;
        let confirmation = confirm(`Are you sure you want to delete "${classes[index].name}"?`);

        if (confirmation) {
            list.removeChild(listItem);
            classes.splice(index, 1);

            let remainingButtons = list.querySelectorAll("Button");
            remainingButtons.forEach((button, index) => {
                button.dataset.index = index;
            });
        }
    });

    listItem.appendChild(button);
    button.prepend(document.createElement("span"));
    listItem.appendChild(cross);
    list.appendChild(listItem);
});

document.getElementById("create-class").addEventListener("click", () => {
    addClass();
});

document.getElementById("class-name").addEventListener("input", (e) => {
    selectedClass.name = e.target.value;
    let button = document.querySelector(`button[data-index="${classes.indexOf(selectedClass)}"]`);
    if (button) {
        button.innerHTML = e.target.value;
    }
});

//bästa sättet jag kom på för att spara klasser så att det inte drar ner prestandan genom att spara allt för mycket, jag tror att det är en bra lösning
window.addEventListener("beforeunload", saveClasses);

document.getElementById("student-list").addEventListener("input", (e) => {
    selectedClass.students = e.target.value.split(/,\s|\n/).filter(student => student.trim() !== '');
});

function saveClasses() {
    localStorage.setItem("classes", JSON.stringify(classes));
}
//Denna kod är i princip samma som den i början där jag skapar list-objekt för alla klasser från localstorage
//skillnaden är att jag här inte har någon klass eller namn att utgå från så det blir lite annorlunda.
function addClass() {
    let list = document.getElementById("class-list");
    let listItem = document.createElement("li");
    let button = document.createElement("Button");
    let cross = document.createElement("img");
    cross.src = "../images/cross.svg";

    let newClass = { name: `Klass ${classes.length}`, students: [] };
    classes.push(newClass);

    button.innerHTML = newClass.name;
    button.dataset.index = classes.length - 1;

    button.addEventListener("click", () => {
        document.getElementById("class-name").value = newClass.name;
        document.getElementById("student-list").value = newClass.students;
        selectedClass = newClass;
    });

    cross.addEventListener("click", () => {
        let index = button.dataset.index;
        let confirmation = confirm(`Are you sure you want to delete "${classes[index].name}"?`);

        if (confirmation) {
            list.removeChild(listItem);
            classes.splice(index, 1);

            let remainingButtons = list.querySelectorAll("Button");
            remainingButtons.forEach((button, index) => {
                button.dataset.index = index;
            });
        }
    });

    listItem.appendChild(button);
    button.prepend(document.createElement("span"));
    listItem.appendChild(cross);
    list.appendChild(listItem);
}