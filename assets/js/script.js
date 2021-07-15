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