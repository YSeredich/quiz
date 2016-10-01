/**
 * Created by yulia on 10.09.2016.
 */
'use strict';

var container = document.querySelector('#container');

var finalScreen = container.querySelector('#finalScreen');
var finalScoreContainer = finalScreen.querySelector('#finalScore');
var restartBtn = finalScreen.querySelector('[data-action=restart-btn]');
var resultBtn = finalScreen.querySelector('[data-action=result-btn]');

var ansContainer = container.querySelector('#ansContainer');
var questContainer = ansContainer.querySelector('#quest');
var answer = ansContainer.querySelectorAll('input[name=answer]');
var answerLabel = ansContainer.querySelectorAll('.answer-lbl');
var counterContainer = ansContainer.querySelector('#counter');
var answerBtn = ansContainer.querySelector('[data-action=answer-btn]');

var questions = [];
var rightScore = 0;
answer[0].checked = true;

getQuestions();
var j = 0;
var randQuestions = getRandQuestions(10);
setQuiz(randQuestions[j], 1);

answerBtn.onclick = function(e) {
    e.preventDefault();
    var right = ansContainer.querySelector('input[data-right=true]');
    if (right.checked) {
        rightScore += 1;
    }
    for (var i = 0; i < 4; i++) {
        if (answer[i].checked) {
            randQuestions[j].checked = answer[i].value;
        }
    }
    j++;
    if (j < randQuestions.length) {
        setQuiz(randQuestions[j], j+1);
    } else {
        ansContainer.classList.add('invisible');
        finalScreen.classList.remove('invisible');
        finalScoreContainer.innerHTML = rightScore + ' из ' + randQuestions.length;
    }
};

restartBtn.onclick = function(e) {
    e.preventDefault();
    j = 0;
    randQuestions = getRandQuestions(10);
    rightScore = 0;
    setQuiz(randQuestions[j], 1);
    ansContainer.classList.remove('invisible');
    finalScreen.classList.add('invisible');
};

resultBtn.onclick = function(e) {
    e.preventDefault();
    var fragment = document.createDocumentFragment();
    randQuestions.forEach(function(quest) {
        var quizElem = renderQuestion(quest);
        fragment.appendChild(quizElem);
    });
    var resultContainer = container.querySelector('#resultScreen');
    finalScreen.classList.add('invisible');
    resultContainer.classList.remove('invisible');
    resultContainer.appendChild(fragment);
};

function setQuiz(data, counter) {
    questContainer.innerHTML = data.question;
    var answerText = data.answers;
    for (var i = 0; i < answer.length; i++){
        answerLabel[i].innerHTML = answerText[i];
        answer[i].setAttribute('data-right', 'false');
        if (answer[i].id == 'ans' + data.right) {
            answer[i].setAttribute('data-right', 'true');
        }
    }
    answer[0].checked = true;
    counterContainer.innerHTML = counter;
}

function getQuestions() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'questions.json', false);
    //xhr.timeout = 10000;
    container.classList.add('questions-loading');
    xhr.onload = function() {
        var response = xhr.responseText;
        questions = JSON.parse(response);
        container.classList.remove('questions-loading');
    };
    xhr.ontimeout = function() {
        container.classList.add('questions-loading-failure');
    };
    xhr.onerror = function() {
        container.classList.add('questions-loading-failure');
    };
    xhr.send();
}

function getRandQuestions(num) {
    var indexes = [];
    var randQuestions = [];
    var total = questions.length;
    while ( indexes.length < num) {
        var randNum =  randomInteger(total);
        if (indexes.indexOf(randNum) === -1) {
            indexes.push(randNum);
            randQuestions.push(questions[randNum]);
        }
    }
    return randQuestions;
}

function randomInteger(max) {
    var rand = Math.random() * max;
    rand = Math.floor(rand);
    return rand;
}

function renderQuestion(data) {
    var template = document.querySelector('#questionTemplate');
    var item = template.children[0].cloneNode(true);
    item.querySelector('[data-content=questionText').innerHTML = data.question;
    var answersWrap = item.querySelectorAll('input[name=answer]');
    for (var i = 0; i < answersWrap.length; i++){
        var parent = answersWrap[i].parentElement;
        parent.innerHTML += data.answers[i];
        if ( i + 1 == data.right) {
            parent.classList.add('right-answer');
        }
        if ( i + 1 == data.checked) {
            parent.classList.add('right-answer');
        }
    }
    return item;
}
