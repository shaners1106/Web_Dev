/*
Matthew Lochridge, Ryan Grady and Shane Snediker
Dr. Jones CS 301
GP6 Final Project
SkillsUSA Programming Competition website
Last updated: January 24, 2021

This file contains the JavaScript for the quiz page of the website.  However,
we ended up not using this file because administering the file in JavaScript leaves
the door open to students who may know about the Javascript DevTools navigator pane
to open it up and see the answers.  So we transitioned this to a Google Quiz Form
We do want to leave the form here in the event that we want to reference this style
in the future.  We did remove the answers from the quiz.

*/ 
// pos is position of where the user in the test or which question they're up to
var pos = 0, test, test_status, question, choice, choices, chA, chB, chC, correct = 0;
// this is a multidimensional array with 4 inner array elements with 5 elements inside them
var questions = [
  {
      question: "What character do you use to end a line of code in c++?",
      a: "none",
      b: ";",
      c: ":",
      d: ""
    },
  {
      question: "What do you call a group of variables in a list?",
      a: "array",
      b: "pile",
      c: "clump",
      d: ""
    },
  {
      question: "What is NOT a primitive data type in Java?",
      a: "int",
      b: "double",
      c: "string",
      d: "bool"
    },
  {
      question: "What is the correct syntax to initialize an array for the following c++ code: <br> int* var = ___;",
      a: "new int[]",
      b: "array[int]",
      c: "var[array]",
      d: ""
    },
    {
        question: "Initialize a for loop to iterate 10 times in java:",
        a: "for(int i = 0; i < 10; i++)",
        b: "for i = 0:10",
        c: "for(int i = 1; i > -10; i--)",
        d: ""
    },
    {
        question: "True or False, object oriented programming involves developing a model of real world objects where each object is defined by specific properties and behaviors:",
        a: "True",
        b: "False",
        c: "",
        d: ""
    },
    {
      question: "From the following list, which non-coding characteristic is not a value that is important for new programmers to develop:",
      a: "Using online code solutions when needed",
      b: "Informative code comments",
      c: "Spending time on pre-coding stages of project development (such as project requirements and design considerations)",
      d: "Being willing to work cooperatively with other people to increase learning and code writing abilities"
    },
    {
      question: "Which of the following is not a career within the computer science industry:",
      a: "Database Administrator",
      b: "Anesthesiologist",
      c: "Data Scientist",
      d: "Artificial Intelligence Engineer"
    },
    {
      question: "Which of the following is not an element of object oriented programming?",
      a: "polymorphism",
      b: "inheritance",
      c: "recursion",
      d: "encapsulation"
    },
    {
      question: "What is the best explanation of the difference between a function argument and a function parameter:",
      a: "Function arguments are variables passed by reference while function parameters are variables passed by value.",
      b: "Function arguments are the names set in the function definition while function parameters are the variables passed into a function when it is called.",
      c: "Function parameters are variables passed by reference while function arguments are variables passed by value.",
      d: "Function parameters are the names set in the function definition while function arguments are the variables passed into a function when it is called."
    },
    {
        question: "What is the difference between '=' and '==' in computer science?",
        a: "'='compares 2 variables without consideration of data types while '==' compares 2 variables including data types",
        b: "'=' compares 2 variables without consideration of data types while '==' compares 2 variables including data types",
        c: "'=' is an assignment operator while '==' is and equal to operator",
        d: ""
      },
    {
      question: "Which of the following is a valid Boolean variable initialization?",
      a: "boolean isVal = 6.08;",
      b: "bool isVal = 'This variable is a string value';",
      c: "isVal = True",
      d: "bool isVal = 2;"
    },
    {
      question: "How many times will the following loop execute? \n int my_val = 10; \n do { my_val--; } \n while { my_val > 8 }",
      a: "1",
      b: "2",
      c: "3",
      d: "4"
    },
    {
      question: "Why must you be careful when writing a while loop?",
      a: "Getting the syntax correct is almost impossible",
      b: "There's almost always a better way to get results without using a while loop",
      c: "The potential for infinite loops can cause a lot of problems",
      d: "It takes awhile to write them"
    },
    {
      question: "True or False, a constructor is a function that is only used when building abstract data types:",
      a: "True",
      b: "False",
      c: "",
      d: ""
    },
    {
      question: "Which everyday activity most closely resembles computer science:",
      a: "Completing puzzles",
      b: "Playing video games",
      c: "Doing chores around the house",
      d: "Horseback riding"
    },
    {
      question: "What is IDE short for?",
      a: "International Developers Enterprise",
      b: "implement, develop, engineer",
      c: "Integrated Development Environment",
      d: ""
    },
    {
      question: "All of the following are an important aspect of software engineering except:",
      a: "Data approximation",
      b: "Documentation",
      c: "Comments",
      d: "Error handling"
    },
    {
      question: "True or False, a file stream is the version control repository that your CS project is linked to:",
      a: "True",
      b: "False",
      c: "",
      d: ""
    },
    {
      question: "Which of the following is not an integral internal component of a computer:",
      a: "CPU",
      b: "Data bus",
      c: "Clock",
      d: "Speed modulator"
    }

  ];
// this get function is short for the getElementById function  
function get(x){
  return document.getElementById(x);
}
// this function renders a question for display on the page
function renderQuestion(){
  test = get("test");
  if(pos >= questions.length){
    test.innerHTML = "";//<h2>You got "+correct+" of "+questions.length+" questions correct</h2>
    get("test_status").innerHTML = "Test completed";
    console.log(id,correct)

    // resets the variable to allow users to restart the test
    //pos = 0;
    correct = 0;
    // stops rest of renderQuestion function running when test is completed
    return false;
  }
  
  if (pos ==0){
    get("test_status").innerHTML = "Enter your ID:";
    test.innerHTML += "<label> <input type='text' name='id' value='' id='idname' required/></label><br><br>";
    test.innerHTML += "<button class = 'w3-button w3-black w3-margin-top' onclick='checkAnswer()'>Submit Answer</button>";
  } else{
      get("test_status").innerHTML = "Question "+(pos+1)+" of "+questions.length;
  question = questions[pos].question;
  chA = questions[pos].a;
  chB = questions[pos].b;
  chC = questions[pos].c;
  chD = questions[pos].d;
  // display the question
  test.innerHTML = "<h3>"+question+"</h3>";
  // display the answer options
  // the += appends to the data we started on the line above
  if(chA != ""){
    test.innerHTML += "<label> <input type='radio' name='choices' value='A'> "+chA+"</label><br>";
  }
  if(chB != ""){
    test.innerHTML += "<label> <input type='radio' name='choices' value='B'> "+chB+"</label><br>";
  }
  if (chC != ""){
    test.innerHTML += "<label> <input type='radio' name='choices' value='C'> "+chC+"</label><br>";
  }
  if (chD !=""){
    test.innerHTML += "<label> <input type='radio' name='choices' value='D'> "+chD+"</label><br><br>";

  }
  test.innerHTML += "<button  class = 'w3-button w3-black w3-margin-top'  onclick='checkAnswer()'>Submit Answer</button>";
}
}
function checkAnswer(){
  // use getElementsByName because we have an array which it will loop through
  choices = document.getElementsByName("choices");
  for(var i=0; i<choices.length; i++){
    if(choices[i].checked){
      choice = choices[i].value;
    }
  }
  // checks if answer matches the correct choice
  if(choice == questions[pos].answer){
    //each time there is a correct answer this value increases
    correct++;
  }
  // changes position of which character user is on
  pos++;
  // then the renderQuestion function runs again to go to next question
  renderQuestion();
}
// Add event listener to call renderQuestion on page load event
window.addEventListener("load", renderQuestion);