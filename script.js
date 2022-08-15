window.onload = fetchAPI;
var NUMBER_OF_QUESTIONS;

async function fetchAPI() {
    let response = await fetch(
        'https://the-trivia-api.com/api/questions?limit=10'
    );
    let data = await response.json();
    NUMBER_OF_QUESTIONS = data.length;
    handleData(data);
}
function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex]
        ];
    }

    return array;
}

function handleData(data) {
    let list = document.getElementById('question-list');

    for (var i = 0; i < data.length; i++) {
        let q = data[i].question;
        let li = document.createElement('div');
        let div = document.createElement('div');
        div.classList.add('question-card');
        let answers = document.createElement('div');
        answers.classList.add('answers');

        let option_list = [];
        let option = document.createElement('button');
        option.innerText = data[i].correctAnswer;
        option.classList.add('option');
        option.setAttribute('id', `${i}-0`);
        option.setAttribute('onclick', 'handleClick(this.id)');
        option_list.push(option);
        for (var j = 0; j < 3; j++) {
            let option = document.createElement('button');
            option.classList.add('option');
            option.setAttribute('id', `${i}-${j + 1}`);
            option.setAttribute('onclick', 'handleClick(this.id)');
            option.innerText = data[i].incorrectAnswers[j];
            option_list.push(option);
        }
        shuffle(option_list);
        for (let i = 0; i < option_list.length; i++) {
            answers.appendChild(option_list[i]);
        }
        div.innerText = `Question : ${q}`;
        div.appendChild(answers);
        li.appendChild(div);
        list.appendChild(li);
    }

    let stats_card = document.getElementById('score-board');
    let num_questions = document.createElement('p');
    num_questions.innerText = `Total Questions: ${data.length}`;
    stats_card.appendChild(num_questions);
}
let curr_score = 0;

function handleClick(id) {
    for (let i = 0; i < 10; i++) {
        if (id == `${i}-0`) {
            let score_board = document.getElementById('curr-score');
            curr_score += 5;
            score_board.innerHTML = `${curr_score} / ${
                NUMBER_OF_QUESTIONS * 5
            }`;
            let element = document.getElementById(id);
            let parent_element = element.parentElement;
            parent_element.innerText = 'Correct Answer!';
            parent_element.style.color = 'green';
            return;
        }
    }
    let score_board = document.getElementById('curr-score');
    curr_score -= 1;
    score_board.innerHTML = `${curr_score} / ${NUMBER_OF_QUESTIONS * 5}`;
    let element = document.getElementById(id);
    let parent_element = element.parentElement;
    parent_element.innerText = 'Wrong Answer!';
    parent_element.style.color = 'crimson';
    return;
}
