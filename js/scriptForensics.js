/*Code contains elements taken from https://www.sitepoint.com/simple-javascript-quiz/. I wanted to learn how to 
create the quiz dynamically using Javascript and this was the best resource. It required some changes to get running 
such as moving the script tag to the bottom instead of running it in the head and I implemented extra features into it.
*/
(function main(){
    //Declare global variables
    let wrongAnswersArray = [];

    function buildQuiz(){
      // variable to store the HTML output
      let output = [];
      // iterates over question array
      myQuestions.forEach((currentQuestion, questionAnswer) => {
          
          // store the list of multiple choice answers here
          let answers = [];
  
          // and for each available answer
          for(letter in currentQuestion.answers){
            // beginning of dynamic html building!
            answers.push(
              `<label>
                <input type="radio" name="question${questionAnswer}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
          // add this question and its answers to the output
          output.push(
            `<div class="question col "> <h4>${currentQuestion.question}</h4></div>
            <div class="answers col"> ${answers.join("")} </div>`
          );
        }
      );
      //Turn the output variable into a string of html and put it on the page. 
      document.getElementById("quiz").innerHTML = output.join("");
    }//End of the buildQuiz function

    function showResults(){
      
      // look at all html tags and find class answers, then store
      let answerContainers = quizContainer.querySelectorAll(".answers");
  
      // keep track of correct answers for score calculation later
      let numCorrect = 0;
  
      myQuestions.forEach((currentQuestion, questionAnswer) => {
        let answerContainer = answerContainers[questionAnswer];
        let selector = `input[name=question${questionAnswer}]:checked`;
        let userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
          // color the answers green
          answerContainers[questionAnswer].style.color = "green";
        }
        // if answer is wrong or blank
        else{
            // color the answers red and build wrongAnswersArray for display later. 
            answerContainers[questionAnswer].style.color = "red"
            wrongAnswersArray.push(`${currentQuestion.question} Correct Answer is... ${currentQuestion.correctAnswer}: 
            ${currentQuestion.answers[currentQuestion.correctAnswer]}"<br>`);
          }
      });
      //Calculate percentage score 
      percentage = parseInt((100 * numCorrect) / myQuestions.length);
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
      // show the percentage of correct answers
      resultsContainer.innerHTML += `<br>Percentage correct: ${percentage}%`;
       // show wrong answers
       wrongAnswersArray = wrongAnswersArray.join(" ");
       resultsContainer.innerHTML += `<br> <b>Incorrect Questions:</b> <br> ${wrongAnswersArray}`;
    }//End of show results function
  
    // get the divs for the quiz and results section, and grab the submit and remove button
    let quizContainer = document.getElementById("quiz");
    let resultsContainer = document.getElementById("results");
    let submitButton = document.getElementById("submit");
    let newQuizButton = document.getElementById("newQuiz");
    
    //create an object for the questions, answers and correct answers
    let questionArray = [
      {
        question: "When a file is deleted, the file is...",
        answers: {
          a: "Permitted to be overwritten",
          b: "Removed straight away",
          c: "Moved out of main memory",
          d: "Irrecoverable"
        },
        correctAnswer: "a"
      },
      {
        question: "What is the purpose of a write-blocker?",
        answers: {
          a: "To prevent forensics from being carried out",
          b: "To prevent changes being made to memory",
          c: "To prevent changes from being read",
          d: "To prevent shutdown of a device"
        },
        correctAnswer: "b"
      },
      {
        question: "If the chain of custody is broken, the evidence is inadmissable",
        answers: {
          a: "True",
          b: "False",
        },
        correctAnswer: "a"
      },
      {
        question: "Incognito mode does what?",
        answers: {
          a: "Hides all browser activity from everyone",
          b: "Doesn't record activity in the user's browser history",
          c: "Make your web activity invisible to the ISP",
          d: "Makes packets unseen on the local network"
        },
        correctAnswer: "b"
      }
    ];
    
    let myQuestions = [];
    while (myQuestions.length < 3) {
      myQuestions.push(questionArray[Math.floor(Math.random() * 4)]);
      myQuestions = Array.from(new Set(myQuestions));
    }
    
    // intialise
    buildQuiz();
  
    // Event listeners
    submitButton.addEventListener("click", showResults);
    newQuizButton.addEventListener("click", main);
 


  })();
