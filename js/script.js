(function(){
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
            <div class="answers col"> ${answers.join('')} </div>`
          );
        }
      );
      //Turn the output variable into a string of html and put it on the page. 
      document.getElementById("quiz").innerHTML = output.join('');
    }//End of the buildQuiz function

    function showResults(){
      
      // look at all html tags and find class answers, then store
      let answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of correct answers for score calculation later
      let numCorrect = 0;
  
      myQuestions.forEach( (currentQuestion, questionAnswer) => {
        let answerContainer = answerContainers[questionAnswer];
        let selector = `input[name=question${questionAnswer}]:checked`;
        let userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
          // color the answers green
          answerContainers[questionAnswer].style.color = 'green';
        }
        // if answer is wrong or blank
        else{
            // color the answers red and build wrongAnswersArray for display later. 
            answerContainers[questionAnswer].style.color = "red"
            wrongAnswersArray.push(currentQuestion.question + " Correct Answer is... ", currentQuestion.correctAnswer + ":", 
            currentQuestion.answers[currentQuestion.correctAnswer],"<br>");
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
    let quizContainer = document.getElementById('quiz');
    let resultsContainer = document.getElementById('results');
    let submitButton = document.getElementById('submit');
    

    //create an object for the questions, answers and correct answers
    let myQuestions = [
      {
        question: "A password salt is best described as?",
        answers: {
            a: "Random data added to a password before hashing",
            b: "Non-random data added to a password before hashing",
            c: "A method of password cracking",
            d: "Password metadata"
        },
        correctAnswer: "a"
      },
      {
        question: "A caeser cypher involves what?",
        answers: {
          a: "Using a keyword to encrypt a message",
          b: "Shifting all characters up or down the alphabet",
          c: "Using an enigma machine",
        },
        correctAnswer: "b"
      },
      {
        question: "Asymmetric key means that the same key is used for encrypting and decrypting a file. True or false?",
        answers: {
            a: "True",
            b: "False",
        },
        correctAnswer: "b"
    }
    ];



  
    // Kick things off
    buildQuiz();
  
    // Event listeners
    submitButton.addEventListener("click", showResults);
    
 


  })();
