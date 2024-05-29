let select = document.getElementById("groups-select");
let classes = JSON.parse(localStorage.getItem("classes"));
classes.forEach((classitem, index) => {
    let option = document.createElement("option");
    option.value = classitem.students;
    option.text = classitem.name;
    select.appendChild(option);
});

function getSelectedClass() {
    var selectElement = document.getElementById("groups-select");
    //Eleverna t.ex. Ruben, Jens, Kalle, Olle etc.
    return selectElement.value;
}

document.getElementById("groups-amount").addEventListener("blur", function () {
    if (this.value < 1) {
        this.value = 1;
    }
    if (this.value > 40) {
        this.value = 30;
    }
});

/*
    Tagen från ett gammalt projekt jag gjort där jag stal det from wikipedia:
    https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
*/
function fisherYatesShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function randomizeGroups() {
    let students = getSelectedClass().split(",");
    students = fisherYatesShuffle(students);
    let groupCount = parseInt(document.getElementById("groups-amount").value);
    if (groupCount > students.length) {
        groupCount = students.length;
    }
    let groups = Array.from({ length: groupCount }, () => []);

    for (let i = 0; i < students.length; i++) {
        let groupIndex = i % groupCount;
        groups[groupIndex].push(students[i]);
    }

    return groups;
}

document.getElementById("generate-groups").addEventListener("click", () => {
    let groups = randomizeGroups();
    let groupList = document.getElementById("groups-list");
    groupList.innerHTML = "";

    groups.forEach((group, index) => {
        let groupElement = document.createElement("li");

        let groupTitle = document.createElement("h2");
        groupTitle.textContent = "Grupp " + (index + 1);
        groupElement.appendChild(groupTitle);

        let studentList = document.createElement("ul");
        group.forEach(student => {
            let studentElement = document.createElement("li");
            studentElement.textContent = student;
            studentList.appendChild(studentElement);
        });

        groupElement.appendChild(studentList);
        groupList.appendChild(groupElement);
    });
});