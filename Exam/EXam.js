let questions = [];
let options = [];
let correctAnswer = [];
let studentAnswer = [];
let selectedAnswers = [];
const questionArea = document.querySelector('.question');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const answersArea = document.querySelector('.answers');
const countQuestionAppear = document.querySelector('.count');
let time = document.getElementById('timer');
console.log(time);
let timeUpDiv = document.getElementById('timeup');
let minutes = 5;
let seconds = 0;
let count = 0;
let submit = document.getElementById('submit');
const submitLink = document.querySelector('.submitLink');
const list = document.querySelector('.list');
const marksp = document.querySelectorAll('.list p');
const allContent = document.querySelector('.row');

async function get() {
  try {
    let exam = await fetch('Exam.json');

    if (!exam.ok) {
      throw new Error(`${exam.status}`);
    }

    let data = await exam.json();
    if (!data || data.quiz.length === 0) {
      allContent.classList.add('hidden');
      allContent.innerHTML = `<img src="Loading.svg" class="iconLoading" style="width: 150px ;">
       <div>No questions available </div>`;

      return;
    }

    let quizContent = await data.quiz;
    quizContent.sort(() => Math.random() - 0.5);
    quizContent.forEach((element, number) => {
      questions.push(element.question);
      options.push(element.options);
      correctAnswer.push(element.correctAnswer);
    });

    questions.forEach(function (element, index) {
      const questionMark = document.createElement('div');
      questionMark.classList.add('questioncircle');
      questionMark.innerHTML += `<span id="${index}">${index + 1}</span>`;
      list.append(questionMark);

      questionMark.addEventListener('click', function (event) {
        count = index;
        displayQuestions(index);
      });
    });
    displayQuestions(0);
    const interval = setInterval(function () {
      time.textContent = ' ';
      if (
        localStorage.getItem('timerMinutes') &&
        localStorage.getItem('timerSeconds')
      ) {
        minutes = parseInt(localStorage.getItem('timerMinutes'));
        seconds = parseInt(localStorage.getItem('timerSeconds'));
      } else {
        minutes = 2;
        seconds = 0;
      }

      let displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
      let displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
      time.innerHTML += `00:${displayMinutes}:${displaySeconds}`;

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
          time.innerText = ' ';
          localStorage.removeItem('timerMinutes');
          localStorage.removeItem('timerSeconds');
          window.location.href = 'timeup.html';
          return;
        }

        if (seconds === 0 && minutes === 0) {
          clear();
          window.location.href = 'timeup.html';
        }

        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }
      if (minutes < 1) {
        time.style.color = 'red';
      }
      localStorage.setItem('timerMinutes', minutes);
      localStorage.setItem('timerSeconds', seconds);
    }, 1000);
  } catch (error) {
    console.log(error.message);
    allContent.innerHTML = ' ';
    allContent.classList.add('hidden');
    allContent.innerHTML = `<img src="Loading.svg" class="iconLoading" style="width: 150px ;">
        <div>Error loading users. Please try again later.</div>`;
  }
}

let questionElement = document.createElement('h3');

function displayQuestions(index) {
  countQuestionAppear.textContent = '';
  questionElement.textContent = '';
  answersArea.innerHTML = '';
  questionElement.textContent = questions[index];
  countQuestionAppear.textContent = `Q${+index + 1}/Q${questions.length}`;
  questionArea.prepend(questionElement);

  for (let i = 0; i < options[index].length; i++) {
    let answerElement = document.createElement('p');
    answerElement.innerHTML = `
        <input type="radio" class="radio ${index + 1}" name="choose" value="${
      options[index][i]
    }" id="answer-${i}" ${
      selectedAnswers[index] === options[index][i] ? 'checked' : ''
    }>
        <label for="answer-${i}">${options[index][i]}</label>
    `;
    answersArea.append(answerElement);
  }
  let radio = document.querySelectorAll('.radio');
  radio.forEach(function (ele) {
    ele.addEventListener('change', function () {
      selectedAnswers[index] = ele.value;

      let marks = document.querySelectorAll('.list span');
      marks[index].style.color = '#537F71';
      marks[
        index
      ].innerHTML = `<i class="fa-regular fa-circle-check iconMark"></i>`;
    });
  });

  if (index === questions.length - 1) {
    next.disabled = true;
  } else {
    next.disabled = false;
  }
  if (index === 0) {
    prev.disabled = true;
  } else {
    prev.disabled = false;
  }
}

next.addEventListener('click', function () {
  if (count < questions.length - 1) {
    displayQuestions(++count);
  }
});

prev.addEventListener('click', function () {
  if (count > 0) {
    displayQuestions(--count);
  }
});

get();

console.log(selectedAnswers);

submit.addEventListener('click', function () {
  time.innerText = ' ';
  localStorage.removeItem('timerMinutes');
  localStorage.removeItem('timerSeconds');

  let total = questions.length;
  let correctAnswersSum = 0;

  for (let i = 0; i < total; i++) {
    if (correctAnswer[i] === selectedAnswers[i]) {
      correctAnswersSum++;
    }
  }
  let percent = (correctAnswersSum / total) * 100;
  if (percent < 50) {
    submitLink.setAttribute('href', 'fail.html');
    localStorage.setItem('degree', percent);
  } else {
    submitLink.setAttribute('href', 'passed.html');
    localStorage.setItem('degree', percent);
  }
});
