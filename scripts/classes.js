let selectedClass;

let classes = localStorage.getItem("classes") ? JSON.parse(localStorage.getItem("classes")) : [];
classlist = document.getElementById("class-list");


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

// name:{name "Te22A", students: ["John", "Jane", "Doe"]}
console.log(classes);

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

window.addEventListener("beforeunload", saveClasses);

document.getElementById("student-list").addEventListener("input", (e) => {
    selectedClass.students = e.target.value.split(/,\s|\n/).filter(student => student.trim() !== '');
});

function saveClasses() {
    localStorage.setItem("classes", JSON.stringify(classes));
}

function addClass() {
    let list = document.getElementById("class-list");
    let listItem = document.createElement("li");
    let button = document.createElement("Button");
    let cross = document.createElement("img");
    cross.src = "../images/cross.svg";

    let newClass = { name: `New Class ${classes.length}`, students: [] };
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