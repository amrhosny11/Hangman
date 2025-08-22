// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach(letter => {
  let span = document.createElement("span");
  let theLetter = document.createTextNode(letter);
  span.appendChild(theLetter);
  span.className = 'letter-box';
  lettersContainer.appendChild(span);
});

// Object Of Words + Categories
const words = {
  names:["abd elrahman","asser",'amr','tamer',"hala","hosny","laila","yehia","younis","mohamed","mariem","ehsan","hana","sara","hayam","nelly"]
}

// Get Random Property
let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];

// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueValue);

// Create Spans Depened On Word
lettersAndSpace.forEach(letter => {
  let emptySpan = document.createElement("span");
  if (letter === ' ') {
    emptySpan.className = 'with-space';
  }
  lettersGuessContainer.appendChild(emptySpan);
});

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking On Letters
document.addEventListener("click", (e) => {
  let theStatus = false;

  if (e.target.className === 'letter-box') {
    e.target.classList.add("clicked");

    let theClickedLetter = e.target.innerHTML.toLowerCase();
    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    theChosenWord.forEach((wordLetter, WordIndex) => {
      if (theClickedLetter == wordLetter) {
        theStatus = true;
        guessSpans.forEach((span, spanIndex) => {
          if (WordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });

    // ✅ Check if the word is fully guessed
    let allFilled = true;
    guessSpans.forEach(span => {
      if (span.innerHTML === "") {
        allFilled = false;
      }
    });

    if (allFilled) {
      winGame(); // call win popup
      setTimeout(() => {
        location.reload();
      }, 1000);
    }

    // If wrong
    if (theStatus !== true) {
      wrongAttempts++;
      theDraw.classList.add(`wrong-${wrongAttempts}`);
      document.getElementById("fail").play();

      if (wrongAttempts === 8) {
        endGame();
        lettersContainer.classList.add("finished");
              setTimeout(() => {
        location.reload();
      }, 4000);
      }
    } else {
      document.getElementById("success").play();
    }
  }
});

// End Game Function
function endGame() {
  let div = document.createElement("div");
  let divText = document.createTextNode(`Game Over, The Word Is ${randomValueValue}`);
  div.appendChild(divText);
  div.className = 'popup';
  document.body.appendChild(div);
}

// ✅ Win Game Function
function winGame() {
  let div = document.createElement("div");
  let divText = document.createTextNode(`🎉 You Win! The Word Is ${randomValueValue}`);
  div.appendChild(divText);
  div.className = 'popup';
  document.body.appendChild(div);
}
