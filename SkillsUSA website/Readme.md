# SkillsUSA Eastern Washington Regional Computer Programming Challenge

This repository contains the source code and resources that we used to construct a website that would function as a platform for the 2021 SkillsUSA programming competition.

## How to demo our website in its current state

In order to get our website up and running within the current front end/back end framework, start a new terminal within VSCode, initiate a Node.js server by running the command "npm init" and install each of the dependencies listed in our package.json file, run the command "node skillsUSA.js" in the terminal, check your console output to make sure that the node server is up and listening, and then in your browser navigate to http://localhost:3500.  3500 is the port that we used for our Express server.

## Client overview

Our group was responsible for building a website that will be used to conduct this year's SkillsUSA regional computer programming event.  The client requested a simple website design that will be easy for the high school students participating in the even to navigate.  She didn't want any unnecessary bells and whistles, just an intuitive, functionally effective design.  The format of the computer competition is as follows: 
   * A 3 hour virtual experience 
   * Students begin by signing in with an userId that we will provide for them
   * The competition has two components: a multiple choice/short answer quiz and a coding element
   * The competition will be proctored/monitored through Zoom; students will have to remain logged into Zoom with their cameras on for the duration of the competition
   * The website will provide 3 or 4 coding problems for the students to choose from.
   * Each student will need to complete the quiz and submit it, and complete as many of the provided programming prompts as they can within the 3 hour window.
   * Students will write their coding solutions from their own IDE
  
  SkillsUSA is requesting that members from our group write the quiz problems and the coding prompts because the competition administrators have students that will be competing in the competition and want to avoid any possibility of providing an unfair advantage to those students.  They also request that members of our group assist with the facilitation of the competition by joining the Zoom link for the duration of the competition and remaining available to offer students nonspecific advice if they get stuck on a problem as well as grading quizzes and coding submissions the week after the competition finishes.

  ## Website design

  Our home page features the SkillsUSA logo and an option bar where kids can click on a link to take the quiz, click on a link to navigate to the coding problems, or upon finishing the competition they can click on a link to logout.  The quiz link takes students directly to a Google Quiz HTML form that features the quiz questions.  Upon concluding the quiz, they will hit a submission button.  And there is a link from the quiz page back to the home page.  The prompts link takes the students to a webpage that features an option bar.  Each of the provided prompts is one of the options that they can choose.  When they click on a chosen prompt (prompt 1, prompt 2, etc.) an HTML element unfolds providing a textual descrition of the coding prompt for that problem.  Under each prompt is a link to find coding files on their local devices as well as link to submit solutions. And there is also a link near the top of the prompts page to navigate back to the home page.

  ## Authors

  This website was designed and implemented exclusively by Matthew Lochridge, Ryan Grady and Shane Snediker.

  ## Citations

  We referenced the Zybooks material frequently for guidance in web design.

  For the appearance of our website, we used a w3Schools framework as a base and built off of that.  That framework can be found [here](https://www.w3schools.com/w3css/).

  For connecting all of our pre-constructed source code to node's server, [this YouTube tutorial](https://youtu.be/A01KtJTv1oc) was huge for us.

  For help navigating the construction of our middleware code that generated effective node database form interaction, we utilized node's formidable package.  [This tutorial](https://shiya.io/simple-file-upload-with-express-js-and-formidable-in-node-js/) and [this tutorial](https://www.npmjs.com/package/formidable) and [this tutorial](https://www.geeksforgeeks.org/file-uploading-in-node-js/) were instrumental towards that end for us.




