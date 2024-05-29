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
    try {
        let response = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
        let data = await response.json();
        questions = data.results;
    } catch (error) {
        console.log(error);
    }
}

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
            if (this.innerHTML === questions[currentQuestion].correct_answer) {
                correctAnswers++;
            }
            showAnswers();
            document.getElementById("next-button").classList.add("visible");
        });
    });
}