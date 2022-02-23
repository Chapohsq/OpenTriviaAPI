const triviaArray = [];

function loadTrivia() {
    fetch('https://opentdb.com/api.php?amount=15')
        .then(resp => resp.json())
        .then(createTrivias)
        .catch(err => console.log(err));
}

function createTrivias(data) {
    const results = data.results;
    // const triviaArray = [];

    for (const res of results) {
        const trivia = new Trivia(res.category, res.type, res.difficulty, res.question, res.correct_answer, res.incorrect_answers);
        triviaArray.push(trivia);
    }

    console.log(triviaArray);
    displayTrivia(triviaArray);
}


function displayTrivia() {
    const list = document.getElementById('question-container');
    let questionCounter = 1;
    for (const [i, trivia] of triviaArray.entries()) {
        let liElement = createTriviaListElement(trivia, i);
        list.appendChild(liElement);
    }

    // const title = document.getElementsByClassName('main-title')[0];
    // const body = document.getElementsByTagName('body')[0];
    // const list2 = document.querySelector('#trivia-list');
    // const title2 = document.querySelector('.main-title');
    // const li = document.querySelector('li');
}


function createTriviaListElement(trivia, questionId) {
    let liElement = document.createElement('div');
    let span = document.createElement('span');

    liElement.className += "question-div";
    span.className += "question-text";
    span.style.fontWeight = 'bold';

    let textNode = document.createTextNode(formattedTextFromTextArea(trivia.question));

    span.appendChild(textNode);
    liElement.appendChild(span)

    let answersList = createAnswersList(trivia.getAllAnswers(), questionId)

    liElement.appendChild(answersList);

    return liElement;
}

function createAnswersList(answers, questionId) {
    let answerList = document.createElement('ul');
    
    for (const answ of answers) {
        let liElement = createAnswerListElement(formattedTextFromTextArea(answ), questionId)
        //let breakLine = document.createElement('br');
        
        answerList.appendChild(liElement);
        //answerList.appendChild(breakLine);
    }

    return answerList;
}

function createAnswerListElement(answ, questionId) {
    let liElement = document.createElement('button');
    liElement.addEventListener('click', (event) => checkIfRight(event, questionId));
    
    let span = document.createElement('span');
    let textNode = document.createTextNode(answ);

    //liElement.text(textNode);
    span.appendChild(textNode);
    liElement.appendChild(span);
    //liElement.appendChild(breakLine);
    return liElement;
}

function formattedTextFromTextArea(text){
        var txt = document.createElement("textarea");
        txt.innerHTML = text;
        return txt.value;
}

let points = 0;

function checkIfRight(event, questionId) {
    let answerText = event.target.firstChild.textContent;
    console.log(event);
    let triviaCurrent = triviaArray[questionId];
    let correctAnswerTriviaCurrent = triviaCurrent.correctAnswer;
    if (answerText === correctAnswerTriviaCurrent) {
        points++;
        //console.log(points);
        event.target.style.backgroundColor = 'green';
    } else {
        event.target.style.backgroundColor = 'red';
    }
    event.target.removeEventListener('click', checkIfRight);
    event.target.disabled = true;

}