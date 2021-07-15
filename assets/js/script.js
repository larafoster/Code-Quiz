 document.addEventListener ('DOMContentLoaded', event => {
  //Global variables
  var startTime = 75;
  var time = 75;
  var score = 0;
  var questCount = 0;
  var timeset;
  var answers = document.querySelectorAll ('#quizMain button');
 
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