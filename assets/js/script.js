document.addEventListener ('DOMContentLoaded', event => {
  //Global variables
  var startTime = 75;
  var time = 75;
  var score = 0;
  var questCount = 0;
  var timeset;
  var answers = document.querySelectorAll ('#quizMain button');

  //Create an array to store high scores.
  var highScoreArray = [];
  // Retrieve data if it exists or present empty array.
  localStorage.getItem ('highScoreArray')
    ? (highScoreArray = JSON.parse (localStorage.getItem ('highScoreArray')))
    : (highScoreArray = []);

  // Set querySelector() to return the first Element within the document that matches the specified selector, or group of selectors.

  var queryElement = element => {
    return document.querySelector (element);
  };

  // Hide sections until they are called
  var onlyDisplaySection = element => {
    var sections = document.querySelectorAll ('section');
    Array.from (sections).forEach (userItem => {
      userItem.classList.add ('hide');
    });
    queryElement (element).classList.remove ('hide');
  };

  // Set the parameters for obtaining highscores
  var highScoreStorage = () => {
    queryElement ('#highScores div').innerHTML = '';
    var i = 1;
    highScoreArray.sort ((a, b) => b.score - a.score);
    Array.from (highScoreArray).forEach (check => {
      var scoreTotal = document.createElement ('div');
      scoreTotal.innerHTML =
        i + '. ' + check.initialRecord + ' - ' + check.score;
      queryElement ('#highScores div').appendChild (scoreTotal);
      i = i + 1;
    });
    i = 0;
    Array.from (answers).forEach (answer => {
      answer.classList.remove ('disable');
    });
  };

  // Displaying the quiz question with item number
  var displayQuestion = () => {
    queryElement ('#quizMain p').innerHTML = questions[questCount].questTitle;
    queryElement (
      '#quizMain button:nth-of-type(1)'
    ).innerHTML = `1. ${questions[questCount].choices[0]}`;
    queryElement (
      '#quizMain button:nth-of-type(2)'
    ).innerHTML = `2. ${questions[questCount].choices[1]}`;
    queryElement (
      '#quizMain button:nth-of-type(3)'
    ).innerHTML = `3. ${questions[questCount].choices[2]}`;
    queryElement (
      '#quizMain button:nth-of-type(4)'
    ).innerHTML = `4. ${questions[questCount].choices[3]}`;
  };

  // changes the question and has a parameter to control the text indicating whether the answer is correct or wrong
  var quizUpdate = answerCopy => {
    queryElement ('#answerCheck p').innerHTML = answerCopy;
    queryElement ('#answerCheck').classList.remove (
      'invisible',
      answerCheck ()
    );
    Array.from (answers).forEach (answer => {
      answer.classList.add ('disable');
    });

    // If all the questions have been answered exit the quiz section
    setTimeout (() => {
      if (questCount === questions.length) {
        onlyDisplaySection ('#quizOver');
        time = 0;
        queryElement ('#time').innerHTML = time;
      } else {
        // Updates copy in questions with the net array's question text.
        displayQuestion ();
        // Removed disabled status.
        Array.from (answers).forEach (answer => {
          answer.classList.remove ('disable');
        });
      }
    }, 1000);
  };

  // FUNCTION handles time related events for the quiz
  var clock = () => {
    if (time > 0) {
      time = time - 1;
      queryElement ('#time').innerHTML = time;
    } else {
      clearInterval (clock);
      queryElement ('#score').innerHTML = score;
      onlyDisplaySection ('#quizOver');
    }
  };

  // Start button proceeds to first question and starts the clock
  var clock;
  queryElement ('#start button').addEventListener ('click', e => {
    //listen for click then proceed with quiz/timer
    displayQuestion ();
    onlyDisplaySection ('#quizMain');
    clock = setInterval (clock, 1000);
  });

  var answerCheck = () => {
    clearTimeout (timeset);
    timeset = setTimeout (() => {
      queryElement ('#answerCheck').classList.add ('invisible');
    }, 1000);
  };

  // Create an array of selected divs to check against the answer property for the questions.
  Array.from (answers).forEach (check => {
    check.addEventListener ('click', function (event) {
      // Handles events if a question is answered correctly
      if (
        this.innerHTML.substring (3, this.length) ===
        questions[questCount].answer
      ) {
        score = score + 1;
        questCount = questCount + 1;
        quizUpdate ('Correct');
      } else {
        // Handles events if a question is answered incorrectly.
        time = time - 10;
        questCount = questCount + 1;
        quizUpdate ('Wrong');
      }
    });
  });

  //
  var postScore = () => {
    clearTimeout (timeset);
    timeset = setTimeout (() => {
      queryElement ('#postScore').classList.add ('invisible');
    }, 3000);
  };

  queryElement ('#highScoreBtn button').addEventListener ('click', () => {
    var initialsRecord = queryElement ('#userInitials').value;
    {
      //Sends value to current array for use now.
      highScoreArray.push ({
        initialRecord: initialsRecord,
        score: score,
      });
      //Sends value to local storage for later use.
      localStorage.setItem ('highScoreArray', JSON.stringify (highScoreArray));
      queryElement ('#highScores div').innerHTML = '';
      onlyDisplaySection ('#highScores');
      highScoreStorage ();
      queryElement ('#userInitials').value = '';
    }
  });

  // Clears highscores from localstorage
  queryElement ('#clearScores').addEventListener ('click', () => {
    highScoreArray = [];
    queryElement ('#highScores div').innerHTML = '';
    localStorage.removeItem ('highScoreArray');
  });

  // play Again resets all quiz settings to the default to replay the quiz
  queryElement ('#playAgain').addEventListener ('click', () => {
    time = startTime;
    score = 0;
    questCount = 0;
    onlyDisplaySection ('#start');
  });

  // If a player pushes the view high scores button, the view changes to display high scores.
  queryElement ('#scoreTotal').addEventListener ('click', event => {
    event.preventDefault ();
    clearInterval (clock);
    queryElement ('#time').innerHTML = 0;
    time = startTime;
    score = 0;
    questCount = 0;
    onlyDisplaySection ('#highScores');
    highScoreStorage ();
  });
});
