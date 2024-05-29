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
    //Om värdet är mindre än 1 sätt det till 1 för att man kan inte ha mindre än 1 grupp
    if (this.value < 1) {
        this.value = 1;
    }
    //det känns inte rimligt att kunna försöka skapa 1273861238971203 grupper så jag sätter en maxgräns på 100
    if (this.value > 100) {
        this.value = 100;
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

//slumpar grupperna ser till att alla grupper har lika många elever om inte så fördelas de så jämnt det går
//om vi har 30 elever och försöker skapa 100 grupper så kommer vi få 30 grupper med 1 elev
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

//Gör så at tman faktiskt kan generera grupperna utifrån sidans UI samt lägger till grupperna så att det blir synligt för användaren
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