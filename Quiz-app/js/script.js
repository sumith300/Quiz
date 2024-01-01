$(document).ready(function () {
  var hamburger = $(".hamburger");
  var navLink = $(".nav-list");
  var startBtn = $(".start-btn");
  var popUp = $(".pop-up");
  var exitBtn = $(".exit-btn");
  var continueBtn = $(".continue-btn");
  var main = $(".main");
  var quizSection = $(".quiz-section");
  var nextBtn = $(".next-btn");
  var optionList = $(".option-list");
  var resultBox = $(".result-box");
  var tryAgain = $(".tryAgain-btn");

  $(hamburger).click(function () {
    $(navLink).toggleClass("hide");
  });

  $(hamburger).click(function () {
    $(hamburger).toggleClass("active-hamburger");
  });

  $(startBtn).click(function () {
    $(popUp).addClass("active");
    $(main).addClass("active");
  });
  $(exitBtn).click(function () {
    $(popUp).removeClass("active");
    $(main).removeClass("active");
  });

  $(tryAgain).click(function () {
    $(resultBox).removeClass("active");
    $(quizSection).removeClass("hide");
    $(nextBtn).removeClass("active")

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount)
    questionCounter(questionNumb)
    headerScore()

  });
  var questionCount = 0;
  var questionNumb = 1;
  var userScore = 0;
  showQuestions(0);
  questionCounter(1);
  headerScore();
  

  $(nextBtn).click(function () {
    if (questionCount < questions.length - 1) {
      questionCount++;
      showQuestions(questionCount);

      questionNumb++;
      questionCounter(questionNumb);
      $(nextBtn).removeClass("active");
    } else {
      $(resultBox).addClass("active");
      $(quizSection).addClass("hide");
      showResult();
    }
  });

  function showQuestions(index) {
    var note = $(".question-text");
    $(note).text(`${questions[index].number}. ${questions[index].question}`);

    var optionTag = `<div class="option">
            <span>${questions[index].options[0]}</span>
          </div>
          <div class="option">
            <span>${questions[index].options[1]}</span>
          </div>
          <div class="option">
            <span>${questions[index].options[2]}</span>
          </div>
          <div class="option">
            <span>${questions[index].options[3]}</span>
          </div>
          `;

    $(optionList).html(optionTag);

    var option = $(".option");
    for (var i = 0; i < option.length; i++) {
      $(option[i]).click(function () {
        optionSelected(this);
      });
    }
  }

  function optionSelected(answer) {
    var userAnswer = $(answer).text().trim();
    var correctAnswer = `${questions[questionCount].answer}`;
    var allOptions = $(optionList).children().length;
    if (userAnswer == correctAnswer) {
      $(answer).addClass("correct");
      userScore += 1;
      headerScore();
    } else {
      $(answer).addClass("incorrect");

      var allOptionsList = $(optionList).children();
      for (var i = 0; i < allOptions; i++) {
        if ($(allOptionsList[i]).text().trim() == correctAnswer) {
          $(allOptionsList[i]).addClass("correct");
        }
      }
    }

    for (var i = 0; i < allOptions; i++) {
      $(optionList).children().addClass("disabled");
    }

    $(nextBtn).addClass("active");
  }

  function questionCounter(index) {
    var questionTotal = $(".question-total");
    $(questionTotal).text(`${index} of ${questions.length} Questions`);
  }

  function headerScore() {
    var hearderScoreText = $(".score");
    $(hearderScoreText).text(`${userScore} / ${questions.length}`);
    var scoreResult = $(".score-text");
    $(scoreResult).text(`Your score ${userScore} out of ${questions.length}`);
  }

  function showResult() {
    var circularProgress = $(".circular-progress");
    var progressValue = $(".progress-value");
    var progressStartValue = -1;
    var progressEndValue = (userScore / questions.length) * 100;
    var speed = 20;

    var progress = setInterval(function () {
      progressStartValue++;
      $(progressValue).text(`${progressStartValue}%`);
      $(circularProgress).css({
        background: `conic-gradient(#bd325e ${
          progressStartValue * 3.6
        }deg,rgb(255, 255, 255,.1) 0deg)`,
      });
      if (progressStartValue == progressEndValue) {
        clearInterval(progress);
      }
    }, speed);
  }
});
