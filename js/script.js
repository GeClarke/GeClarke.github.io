(function(){
    let wrongAnswersArray = [];



    function buildQuiz(){
      // variable to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionAnswer) => {
          
          // variable to store the list of possible answers
          const answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
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
  
      document.getElementById("quiz").innerHTML = output.join('');
      // finally combine our output list into one string of HTML and put it on the page
   //   quizContainer.innerHTML = output.join('');
    }

  
  
    function showResults(){
      
      // gather answer containers from our quiz query selector all looks at all html document tags and finds class name answers
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach( (currentQuestion, questionAnswer) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionAnswer];
        const selector = `input[name=question${questionAnswer}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
          // color the answers green
          answerContainers[questionAnswer].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
            // color the answers red
            let wrongAnswers = answerContainers[questionAnswer];
            wrongAnswersArray.push(currentQuestion.question + " Correct Answer is... ", currentQuestion.correctAnswer + ":", currentQuestion.answers[currentQuestion.correctAnswer],"<br>");
            //Debugging wrong answer array
            console.log(wrongAnswersArray);
            wrongAnswers.style.color = 'red';
          }
          
        
      });
      
      percentage = parseInt((100 * numCorrect) / myQuestions.length);
      
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
      // show the percentage of correct answers
      resultsContainer.innerHTML += `<br>Percentage correct: ${percentage}%`;
      // show correct answers
      //resultsContainer.innerHTML += `<br>Questions correct: ${correctAnswerArray}`;
       // show wrong answers
       wrongAnswersArray = wrongAnswersArray.join(" ");
       resultsContainer.innerHTML += `<br> <b>Incorrect Questions:</b> <br> ${wrongAnswersArray}`;
    }
  
    // get the divs for the quiz and results section, and grab the submit and remove button
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    

    //create an object for the questions, answers and correct answers
    const myQuestions = [
      {
        question: "Who invented JavaScript?",
        answers: {
          a: "Douglas Crockford",
          b: "Sheryl Sandberg",
          c: "Brendan Eich"
        },
        correctAnswer: "c"
      },
      {
        question: "Which one of these is a JavaScript package manager?",
        answers: {
          a: "Node.js",
          b: "TypeScript",
          c: "npm"
        },
        correctAnswer: "c"
      },
      {
        question: "Which tool can you use to ensure code quality?",
        answers: {
          a: "Angular",
          b: "jQuery",
          c: "RequireJS",
          d: "ESLint"
        },
        correctAnswer: "d"
      }
    ];



  
    // Kick things off
    buildQuiz();
  
    // Event listeners
    submitButton.addEventListener("click", showResults);
    
 


  })();
