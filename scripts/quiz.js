//https://api.skolverket.se/skolenhetsregistret/v1/skolenhet as-chringe skitföretag
//https://opentdb.com/api.php?amount=10

let questions = [];
let currentQuestion = 0;
let correctAnswers = 0;
let questionElement = document.getElementById("question");
let answerElements = [
    document.getElementById("answer1"),
    document.getElementById("answer2"),
    document.getElementById("answer3"),
    document.getElementById("answer4")
];

async function getQuestions() {
    //requestar 10 frågor från opentdb.com, någon api jag hittade efter att skolverket api:et inte fungerade för att de inte kunde hantera CORS och jag ville inte använda en proxy 
    //och med inte vela menar jag att jag inte visste hur ajg skulle göra det
    try {
        let response = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
        let data = await response.json();
        questions = data.results;
    } catch (error) {
        console.log(error);
    }
}

//När man startar tar jag bort allt oviktigt, för att göra det lättare att fokusera på frågorna samt blir det bättre för mobil-enheter
document.getElementById("start-button").addEventListener("click", (e) => {
    getQuestions().then(() => {
        document.getElementById("questionnaire").classList.add("visible")
        e.target.style.display = "none";
        document.getElementById("qna-header").style.display = "none";
        document.querySelector("header").style.display = "none";
        document.querySelector("footer").style.display = "none";
        showQuestion();
    }).catch(error => {
        console.log(error);
    });
});

document.getElementById("next-button").addEventListener("click", (e) => {
    currentQuestion++;
    showQuestion();
    e.target.classList.remove("visible");
});

//Se fisherYatesShuffle funktionen i randomize.js för mer info
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

//lägger till klasser som sedan använder css för en liten "cool" effekt
function showAnswers() {
    answerElements.forEach(answerElement => {
        if (answerElement.innerHTML === questions[currentQuestion].correct_answer) {
            answerElement.classList.add("right-answer");
        }
        else {
            answerElement.classList.add("wrong-answer");
        }
    });
}

//Visar frågan och svaralternativen slumpar ordningen på svaren och kollar om man klickat rätt osv, inte super komplicerat
function showQuestion() {
    answerElements.forEach(answerElement => {
        answerElement.classList.remove("right-answer", "wrong-answer");
    });
    let question = questions[currentQuestion];
    questionElement.innerHTML = `${question.question}`;
    let answers = question.incorrect_answers;
    answers.push(question.correct_answer);
    answers = shuffle(answers);

    answerElements.forEach((answerElement, index) => {
        answerElement.innerHTML = answers[index];

        let newAnswerElement = answerElement.cloneNode(true);
        answerElement.parentNode.replaceChild(newAnswerElement, answerElement);
        answerElements[index] = newAnswerElement;

        newAnswerElement.addEventListener('click', function () {
            if (currentQuestion === questions.length - 1) {
                alert(`You have completed the quiz!\nYou got ${correctAnswers}/${questions.length} correct!`);
                location.reload();
            }
            console.log(this.innerHTML + " " + questions[currentQuestion].correct_answer);
            if (this.innerHTML === questions[currentQuestion].correct_answer && this.classList.contains("right-answer") === false){
                correctAnswers++;
            }
            showAnswers();
            document.getElementById("next-button").classList.add("visible");
        });
    });
}