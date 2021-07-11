// created an array and passing the number, questions, options, and answers
var questions = [{
    questionAsked: "Which tag is an extension to HTML that can enclose any number of JavaScript",
      choices: ["<SCRIPT>", "<BODY>", "<HEAD>", "<TITLE>"],
      correctAnswer: 0
    },
    {
      questionAsked: "Which method of an Array object adds and/or removes elements from an array.",
      choices: ["Reverse", "Shift", "Slice", "Splice"],
      correctAnswer: 3
    },
    {
      questionAsked: "Which of these is not used to loop?",
      choices: ["for", "while", "foreach", "sequence"],
      correctAnswer: 3
    },
    {
      questionAsked: "Which of the following cannot be done with client-side JavaScript?",
      choices: ["Validating a form", "Sending a form's contents by email", "Storing the form's contents to a database file on the server", "Responding to user events such as mouse clicks"],
      correctAnswer: 2
    },
    {
      questionAsked: "Which of the following are capabilities of functions in JavaScript?",
      choices: ["Return a value", "Accept parameters and Return a value", "Accept parameters", "None of the above"],
      correctAnswer: 2
  }];
  
  var highScore = []; //Array containing user scores
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
