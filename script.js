// Helper function - gets a random integer up to (but not including) the maximum
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

// Select the spans & divs where we'll display outputs.
const pointsSpan = document.querySelector("#points");
const scoreSpan = document.querySelector("#score");
const questionDiv = document.querySelector("#question");

// Select the buttons and input fields where users can provide inputs.
const randomButton = document.querySelector("#random");
const hardButton = document.querySelector("#hard");
const catPunsButton = document.querySelector("#catPuns");
const submitButton = document.querySelector("#submit");
const answerInputBox = document.querySelector("#userAnswer");
const categoryInput=document.querySelector("#category");
const categoryButton=document.querySelector("#submitCategory");

// Starting variables - we'll fill these with the API
let currentQuestion =
  "The Japanese name for this grass-type pokemon, Fushigidane, is a pun on the phrase 'strange seed.'";
let currentAnswer = "bulbasaur";
let currentPoints = 300;
let currentScore = 0;
let correctQuestionLive=true;
let frontCard=document.getElementById("front");
let backCard=document.getElementById("back");

// Function to update the text on the board to match our variables.
function updateBoard() {
  pointsSpan.innerHTML = currentPoints;
  scoreSpan.innerHTML = currentScore;
  // TODO: Update the question too.
  questionDiv.innerHTML=currentQuestion;
};

// TODO: Call the function!
updateBoard();

// TODO: Finish this function that checks the user's answer.
function checkAnswer() {
  console.log("You guessed:", answerInputBox.value);
  console.log("Correct answer:", currentAnswer);
  let userAnswer=answerInputBox.value.toLowerCase();
  let correctAns=currentAnswer.toLowerCase();
  if(correctQuestionLive===true){
  if(userAnswer===correctAns){
    currentScore+=currentPoints;
  }
  else{
    currentScore-=currentPoints;
  }
  updateBoard();
  }
  correctQuestionLive=false;
  backCard.innerHTML="";
  
};

// TODO: Attach that function to the submit button via an event listener.
submitButton.addEventListener('click', checkAnswer);
// TODO: Write out an API call for each of the three question buttons // on screen.
async function getRandomQuestion(){
  console.log("Getting random question");
  const response = await fetch("https://jeopardy.wang-lu.com/api/random?count=1");
  console.log(response);
  const data=response.json();
  console.log(data);
  currentQuestion = data[0].question;
  currentPoints = data[0].value;
  currentAnswer = data[0].answer;
  updateBoard();
}
randomButton.addEventListener('click', getRandomQuestion);

//let i=0;
async function getHardQuestion(){
  const response = await fetch("https://jeopardy.wang-lu.com/api/clues?value=1000");
  const data = await response.json();
  const i = getRandomInt(data.length);
  console.log(data[i]);
  currentQuestion = data[i].question;
  currentPoints = data[i].value;
  currentAnswer = data[i].answer;
  //i++;
  updateBoard();
};
hardButton.addEventListener('click', getHardQuestion);
async function getCatQuestion(){
  const response= await fetch("https://jeopardy.wang-lu.com/api/clues?category=69");
  console.log(response);
  const data = await response.json();
  const i = getRandomInt(data.length);
  console.log(data[i]);
  currentQuestion = data[i].question;
  currentPoints = data[i].value;
  currentAnswer = data[i].answer;
  updateBoard();
}
catPunsButton.addEventListener("click", getCatQuestion);

async function getNewCategory(){
  let inputNum=categoryInput.value;
  const response=await fetch(`https://jeopardy.wang-lu.com/api/clues?category=${inputNum}`);
  console.log(response);
  const data = await response.json();
  const i = getRandomInt(data.length);
  console.log(data[i]);
  currentQuestion = data[i].question;
  currentPoints = data[i].value;
  currentAnswer = data[i].answer;
  updateBoard();
}
categoryButton.addEventListener("click", getNewCategory)

frontCard.addEventListener("click", (e)=> {
 frontCard.classList.add("hidden");
 backCard.classList.remove("hidden");
})
backCard.addEventListener("click", (e)=> {
  backCard.classList.add("hidden");
  frontCard.classList.remove("hidden");
})



