window.onload = fetchAPI;
var NUMBER_OF_QUESTIONS;
var theme = 'light';

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

function createOption(data, isCorrect, i, j) {
    let option = document.createElement('button');
    if (isCorrect === true) {
        option.innerText = data[i].correctAnswer;

        option.setAttribute('id', `${i}-0`);
    } else {
        option.innerText = data[i].incorrectAnswers[j];
        option.setAttribute('id', `${i}-${j + 1}`);
    }
    option.classList.add('option');
    option.setAttribute('onclick', 'handleClick(this.id)');
    return option;
}

function handleData(data) {
    let question_list = document.getElementById('question-list');

    for (var i = 0; i < data.length; i++) {
        let question_text = data[i].question;
        let li = document.createElement('div');
        let div = document.createElement('div');
        div.classList.add('question-card');
        let answers = document.createElement('div');
        answers.classList.add('answers');

        let option_list = [];
        option_list.push(createOption(data, true, i, 0));
        for (var j = 0; j < 3; j++) {
            option_list.push(createOption(data, false, i, j));
        }
        shuffle(option_list);
        for (let i = 0; i < option_list.length; i++) {
            answers.appendChild(option_list[i]);
        }
        div.innerText = `Question : ${question_text}`;
        div.appendChild(answers);
        li.appendChild(div);
        question_list.appendChild(li);
    }

    let stats_card = document.getElementById('score-board');
    let num_questions = document.createElement('p');
    num_questions.innerText = `Total Questions: ${data.length}`;
    stats_card.appendChild(num_questions);
}
let curr_score = 0;

function handleClick(id) {
    const regex = /[0-1]-0/g;
    let score_board = document.getElementById('curr-score');
    let element = document.getElementById(id);
    score_board.innerHTML = `${curr_score} / ${NUMBER_OF_QUESTIONS * 5}`;
    let parent_element = element.parentElement;

    if (id.match(regex) !== null) {
        curr_score += 5;
        parent_element.innerText = 'Correct Answer!';
        parent_element.style.color = 'var(--green)';
    } else {
        curr_score -= 1;
        parent_element.innerText = 'Wrong Answer!';
        parent_element.style.color = 'crimson';
    }
    return;
}

function ChangeTheme() {
    let root = document.querySelector(':root');
    let root_prop = getComputedStyle(root);
    if (theme === 'light') {
        root.style.setProperty('--dark-purple', '#000000');
        root.style.setProperty('--grey-purple', '#3E065F');
        root.style.setProperty('--light-purple', '#700B97');
        root.style.setProperty('--white', 'white');
        root.style.setProperty('--green', '#42855B');
        root.style.setProperty('--red', 'red');
        theme = 'dark';
        document.getElementById('light-svg').style.display = 'inline';
        document.getElementById('dark-svg').style.display = 'none';
    } else {
        root.style.setProperty('--dark-purple', 'rgb(65, 63, 63)');
        root.style.setProperty('--grey-purple', 'rgb(16, 15, 15)');
        root.style.setProperty('--light-purple', 'rgb(157, 133, 178)');
        root.style.setProperty('--white', 'rgb(141, 154, 155)');
        root.style.setProperty('--green', 'green');
        root.style.setProperty('--red', 'crimson');
        theme = 'light';
        document.getElementById('dark-svg').style.display = 'inline';
        document.getElementById('light-svg').style.display = 'none';
    }
}
