/**
 * Created by yulia on 10.09.2016.
 */
'use strict';
var container = document.querySelector('#ansContainer');
var questContainer = container.querySelector('#quest');
var answer = container.querySelectorAll('input[name=answer]');
var answerLabel = container.querySelectorAll('.answer-lbl');
var btn = container.querySelector('.btn');
var item = {
    quest: 'Что я делаю по выходным',
    ans1: 'хожу в парк',
    ans2: 'хожу в бар',
    ans3: 'страдаю',
    ans4: 'сплю весь день',
    right: 'ans3'
};
function setQuiz(data) {
    questContainer.innerHTML = data.quest;
    for (var i=1; i <= answer.length; i++){
        answerLabel[i-1].innerHTML = data['ans' + i];
        if (answer[i-1].id == item.right) {
            answer[i-1].setAttribute('data-right', 'true');
        }
    }
}
setQuiz(item);

btn.onclick = function(e) {
    e.preventDefault();
    var right = container.querySelector('input[data-right=true]');
    if (right.checked) {
        alert('yes');
    } else {
        alert('donkey');
    }
};

