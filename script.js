/**
 * Created by yulia on 10.09.2016.
 */
'use strict';

var container = document.querySelector('#container');

var finalScreen = container.querySelector('#finalScreen');
var finalScoreContainer = finalScreen.querySelector('#finalScore');
var restartBtn = finalScreen.querySelector('[data-action=restart-btn]');

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
setQuiz(questions[j], 1);

answerBtn.onclick = function(e) {
    e.preventDefault();
    var right = container.querySelector('input[data-right=true]');
    if (right.checked) {
        rightScore += 1;
    }
    j++;
    if (j < questions.length) {
        setQuiz(questions[j], j+1);
    } else {
        ansContainer.classList.add('invisible');
        finalScreen.classList.remove('invisible');
        finalScoreContainer.innerHTML = rightScore + ' из ' + questions.length;
    }
};

restartBtn.onclick = function(e) {
    e.preventDefault();
    j = 0;
    rightScore = 0;
    setQuiz(questions[j], 1);
    ansContainer.classList.remove('invisible');
    finalScreen.classList.add('invisible');
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



