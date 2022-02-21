function loadTrivia() {
    fetch('https://opentdb.com/api.php?amount=15')
        .then(resp => resp.json())
        .then(createTrivias)
        .catch(err => console.log(err));
}

function createTrivias(data) {
    const results = data.results;
    const triviaArray = [];

    for (const res of results) {
        const trivia = new Trivia(res.category, res.type, res.difficulty, res.question, res.correct_answer, res.incorrect_answers);
        triviaArray.push(trivia);
    }

    displayTrivia(triviaArray);
}


function displayTrivia(triviaArray) {
    const list = document.getElementById('question-container');
    let questionCounter = 1;
    for (const trivia of triviaArray) {
        let liElement = createTriviaListElement(trivia);
        list.appendChild(liElement);
    }

    // const title = document.getElementsByClassName('main-title')[0];
    // const body = document.getElementsByTagName('body')[0];
    // const list2 = document.querySelector('#trivia-list');
    // const title2 = document.querySelector('.main-title');
    // const li = document.querySelector('li');
}


function createTriviaListElement(trivia) {
    let liElement = document.createElement('div');
    let span = document.createElement('span');

    liElement.className += "question-div";
    span.className += "question-text";
    span.style.fontWeight = 'bold';

    let textNode = document.createTextNode(formattedTextFromTextArea(trivia.question));

    span.appendChild(textNode);
    liElement.appendChild(span)

    let answersList = createAnswersList(trivia.getAllAnswers())

    liElement.appendChild(answersList);

    return liElement;
}

function createAnswersList(answers) {
    let answerList = document.createElement('ul');
    
    for (const answ of answers) {
        let liElement = createAnswerListElement(formattedTextFromTextArea(answ))
        //let breakLine = document.createElement('br');
        
        answerList.appendChild(liElement);
        //answerList.appendChild(breakLine);
    }

    return answerList;
}

function createAnswerListElement(answ) {
    let liElement = document.createElement('button');
    
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

function checkIfRight(){

}