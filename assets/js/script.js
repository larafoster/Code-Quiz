document.addEventListener ('DOMContentLoaded', event => {
  //https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
  // console.log('DOM fully loaded and parsed');
  //Global variables
  var startTime = 75; //starts clock with 75 seconds
  var time = 75; // duration of clock is 75 seconds
  var score = 0; // initial score is 0
  var questCount = 0; //start at index 0 first question
  var timeset;
  var answers = document.querySelectorAll ('#quizMain button'); //sets the variable 'answers' to query the buttons in the id section quizmain to be referenced and compared (as specified further down)

  //Create an array to store high scores.
  var highScoreArray = [];
  // Retrieve data if it exists or present empty array.
  //https://betterprogramming.pub/5-alternatives-to-if-statements-for-conditional-branching-6e8e6e97430b
  //instead of if/else use ?/:
  localStorage.getItem ('highScoreArray')
    ? (highScoreArray = JSON.parse (localStorage.getItem ('highScoreArray')))
    : (highScoreArray = []);
  //console.log(highScoreArray);

  // Set querySelector() to return the first Element within the document that matches the specified selector, or group of selectors.

  var queryElement = element => {
    return document.querySelector (element);
  };

  // Hide sections until they are called
  var onlyDisplaySection = element => {
    var sections = document.querySelectorAll ('section');
    Array.from (sections).forEach (userItem => {
      //userItems is just referring to the css selectors within the html element :section, I could have called UserItem 'e' or 'steve'
      userItem.classList.add ('hide'); //until the id or class of the section is called, then hide it
    });
    queryElement (element).classList.remove ('hide'); //if that section is called, remove the 'hide' class
  };
  // Set the parameters for obtaining highscores
  //use arrow function https://hacks.mozilla.org/2015/06/es6-in-depth-arrow-functions/
  var highScoreStorage = () => {
    queryElement ('#highScores div').innerHTML = '';
    var i = 1; //setting the iteration of 1 to be used below
    highScoreArray.sort ((a, b) => b.score - a.score);
    //https://forum.freecodecamp.org/t/arr-sort-a-b-a-b-explanation/167677
    //
    Array.from (highScoreArray).forEach (check => {
      var scoreTotal = document.createElement ('div'); //for each highscore added by user (by inputting initials), create a new div
      scoreTotal.innerHTML = //display each highscore by adding an index followed by a period then the user intials (record) followed by hyphen and their score
        i + '. ' + check.initialRecord + ' - ' + check.score;
      //take those values and append it to the list and iterate by 1
      queryElement ('#highScores div').appendChild (scoreTotal);
      i = i + 1;
    });
    i = 0;
    Array.from (answers).forEach (answer => {
      answer.classList.remove ('disable');
    });
  };

  // Displaying the quiz question with item number
  //the questions are in the questions.js folder
  //the content is displayed in the quizmain section.
  //each question is a p element with id questTitle
  var displayQuestion = () => {
    //this arrow function initiates the questions in quizmain
    queryElement ('#quizMain p').innerHTML = questions[questCount].questTitle;
    //each possible answer is created as a button (which when clicked is compared to the correct answer) and triggers a response of correct or wrong
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
      answerCheck () //the div that says wrong or correct is hidden until checked/called by either the correct response click or wrong response click
    );
    Array.from (answers).forEach (answer => {
      answer.classList.add ('disable'); //after the answer is checked, hide this question
    });

    // If all the questions have been answered exit the quiz section
    //when time is up
    setTimeout (() => {
      // setTimeout : https://www.w3schools.com/js/js_timing.asp
      if (questCount === questions.length) {
        //if all questions answered, stop quiz and reset time to 0
        onlyDisplaySection ('#quizOver'); //and display the quiz over section
        time = 0; //and time is reset to 0
        queryElement ('#time').innerHTML = time;
      } else {
        // Updates copy in questions with the net array's question text.
        displayQuestion (); //next question
        // Removed disabled status.
        Array.from (answers).forEach (answer => {
          answer.classList.remove ('disable');
        });
      }
    }, 1000);
  };

  // Start button proceeds to first question and starts the clock
  var clock;
  queryElement ('#start button').addEventListener ('click', e => {
    //listen for click then proceed with quiz/timer
    displayQuestion (); //displays first question as defined in var displayQuestion
    onlyDisplaySection ('#quizMain'); ////calls the section quizMain and hides others
    clock = setInterval (clock, 1000); //countdown 1 second at a time
  });

  // FUNCTION handles time related events for the quiz
  var clock = () => {
    if (time > 0) {
      //if clock has started then
      time = time - 1; //countdown by 1 - from var time which is initally set at 75
      queryElement ('#time').innerHTML = time; //displays as number 0 - 75
    } else {
      clearInterval (clock); //if the clock shows 0 then display the score and display the section quizover
      queryElement ('#score').innerHTML = score;
      onlyDisplaySection ('#quizOver'); //calls the section quizOver and hides others
    }
  };

  var answerCheck = () => {
    clearTimeout (timeset);
    timeset = setTimeout (() => {
      queryElement ('#answerCheck').classList.add ('invisible');
    }, 1000); //sets an interval to display the correct or wrong response before moving on to next question and hiding answerCheck
  };

  // Create an array of selected divs to check against the answer property for the questions.
  Array.from (answers).forEach (check => {
    check.addEventListener ('click', function (event) {
      // Handles events if a question is answered correctly
      //each time an answer button is click, it looks to the questions.js which is an array with objects and the answer is the 3rd item in the substring
      if (
        this.innerHTML.substring (3, this.length) === //3rd item in substring and returns the entirety of the substring
        questions[questCount].answer
      ) {
        score = score + 1; //if the answer button matches the correct answer then add 1 to the score
        questCount = questCount + 1; //move onto next question
        quizUpdate ('Correct'); // and let user know they are correct
      } else {
        // Handles events if a question is answered incorrectly.
        time = time - 10; // 10 seconds is taken off clock
        questCount = questCount + 1; // move onto next question
        quizUpdate ('Wrong'); // and let user know their answer was wrong
      }
    });
  });

  queryElement ('#highScoreBtn button').addEventListener ('click', () => {
    var initialsRecord = queryElement ('#userInitials').value; //the input is the user initials and the includes the value of that user which is the score
    {
      //Sends value to current array for use now.
      //takes the input from the users intials and assigns a value which is the current score
      highScoreArray.push ({
        initialRecord: initialsRecord,
        score: score,
      });
      //Sends value to local storage for later use.
      //creates a div in the html <div>1. initials - score</div>
      localStorage.setItem ('highScoreArray', JSON.stringify (highScoreArray));
      queryElement ('#highScores div').innerHTML = '';
      onlyDisplaySection ('#highScores'); //calls the section highScores and hides others
      highScoreStorage (); //calls the function
      queryElement ('#userInitials').value = ''; //sets input as empty
    }
  });

  // Clears highscores from localstorage
  queryElement ('#clearScores').addEventListener ('click', () => {
    highScoreArray = []; //when clear scores button is click it clears out the highscores array
    queryElement ('#highScores div').innerHTML = ''; // displays nothing to the user
    localStorage.removeItem ('highScoreArray'); // removes any previously stored arrays
  });

  // play Again resets all quiz settings to the default to replay the quiz
  //my initial playagain code did not restart the clock so I replaced it with a function to reload the page while not emptying the stored highscores and it worked
  queryElement ('#playAgain').addEventListener ('click', () => {
    location.reload ();
  });

  // If a player pushes the view high scores button, the view changes to display high scores.
  queryElement ('#scoreTotal').addEventListener ('click', event => {
    event.preventDefault (); //prevent default action
    clearInterval (clock); //clear out the time and display as 0
    queryElement ('#time').innerHTML = 0; //displays time as 0
    time = startTime; //sets back to 75
    score = 0; //clears out score for this session
    onlyDisplaySection ('#highScores'); // //calls the section highScores and hides others
    highScoreStorage (); // calls the function
  });
});
