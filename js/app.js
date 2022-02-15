/*-------------------------------- Constants --------------------------------*/
// prettier-ignore
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
const suits = ["spades", "hearts", "clubs", "diamonds"];

// prettier-ignore
// (28 items long)
const chart1 = [
	"AA", "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "AKo", "KK", "KQs",
	"KJs", "KTs", "AQo", "KQo", "QQ", "QJs", "QTs", "AJo", "JJ", "JTs",
	"ATo", "TT", "99", "88", "77", "66", "55", "44"
]

// prettier-ignore
//(42 items long total)
const chart2 = chart1.concat([
	"A7s", "A6s", "A5s", "A4s", "A3s", "A2s", "K9s", "Q9s", "KJo", "J9s",
	"T9s", "A9o", "33", "22"
]);

// prettier-ignore
// (56 items long total)
const chart3 = chart2.concat([
	"K8s", "K7s", "QJo", "J8s", "KTo", "QTo", "JTo", "T8s", "98s", "A8o", 
	"A7o", "A6o", "A5o", "A4o" 
]);

// prettier-ignore
// (79 items long total)
const chart4 = chart3.concat([
	"K6s", "K5s", "K4s", "K3s", "K2s", "Q8s", "Q7s", "Q6s", "J7s", "T7s",
	"K9o", "Q9o", "T9o", "97s", "K8o", "87s", "86s", "K7o", "76s", "K6o",
	"65s", "A3o", "A2o"
]);

// prettier-ignore
const chart5 = [
	"AA", "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s", 
	"AKo", "KK", "KQs", "KJs", "KTs", "K9s", "K8s", "K7s",  "K6s", "K5s", "K4s", "K3s", "K2s", 
	"AQo", "KQo", "QQ", "QJs", "QTs", "Q9s", "Q8s", "Q7s", "Q6s", "Q5s", "Q4s", "Q3s", "Q2s", 
	"AJo", "KJo", "QJo", "JJ", "JTs", "J9s", "J8s", "J7s", "J6s", "J5s", "J4s", "J3s", "J2s",
	"ATo", "KTo", "QTo", "JTo", "TT", "T9s", "T8s", "T7s", "T6s", "T5s", "T4s", "T3s", 
	"A9o", "K9o", "Q9o", "J9o", "T9o", "99", "98s", "97s", "96s", "95s",
	"A8o", "K8o", "Q8o", "J8o", "T8o", "98o", "88", "87s", "86s", "85s", "84s",
	"A7o", "K7o", "Q7o", "J7o", "T7o", "97o", "87o", "77", "76s", "75s", "74s",
	"A6o", "K6o", "Q6o", "J6o", "86o", "76o", "66", "65s", "64s", 
	"A5o", "K5o", "Q5o", "Q5o", "55", "54s", "53s",
	"A4o", "K4o", "Q4o", "44", "43s",
	"A3o", "K3o", "Q3o", "33",
	"A2o", "K2o", "Q2o", "22"
]

/*---------------------------- Variables (state) ----------------------------*/
let deck, hand, handValue, score, chartValue;

/*------------------------ Cached Element References ------------------------*/
// Buttons and Interactive elements
const dropdown = document.querySelector(".dropdown");
const dropdownLabel = document.querySelector("#dropdown-label");
const dropdownEl1 = document.querySelector("#dropdown-item1");
const dropdownEl2 = document.querySelector("#dropdown-item2");
const dropdownEl3 = document.querySelector("#dropdown-item3");
const dropdownEl4 = document.querySelector("#dropdown-item4");
const dropdownEl5 = document.querySelector("#dropdown-item5");
const pushButton = document.querySelector("#pushButton");
const foldButton = document.querySelector("#foldButton");
const resetButton = document.querySelector("#resetButton");
const infoIcon = document.querySelector("#info");
const infoMessageButton = document.querySelector("#infoMessageButton");

// Divs
const buttonDiv = document.querySelector("#button-div");
const resetButtonDiv = document.querySelector("#reset-button-div");

// Images
const leftCard = document.querySelector(".leftCard");
const rightCard = document.querySelector(".rightCard");

// Text elements
const resultsMessage = document.querySelector("#resultsMessage");
const scoreDisplay = document.querySelector("#score");
const infoMessage = document.querySelector("#infoMessage");

// Audio
const dealCardSound = new Audio("../audio/doubleCardSlide.mp3");
const correctChime = new Audio("../audio/correctChime.mp3");
const loseBuzzer = new Audio("../audio/loseBuzzer.mp3");
const winningFanfare = new Audio("../audio/winningFanfare.mp3");
/*----------------------------- Event Listeners -----------------------------*/
dropdown.addEventListener("click", function (event) {
	// event.stopPropagation();
	dropdown.classList.toggle("is-active"); // tried adding "is-focused"
});

// dropdown.addEventListener("focusout", function (event) {
// 	event.stopPropagation();
// 	dropdown.classList.toggle("is-active");
// });

dropdownEl1.addEventListener("click", function () {
	chartValue = chart1;
	dropdownLabel.innerText = dropdownEl1.innerText;
	score = 0;
	scoreDisplay.innerText = `Score : ${score}`;
	deal();
});

dropdownEl2.addEventListener("click", function () {
	chartValue = chart2;
	dropdownLabel.innerText = dropdownEl2.innerText;
	score = 0;
	scoreDisplay.innerText = `Score : ${score}`;
	deal();
});

dropdownEl3.addEventListener("click", function () {
	chartValue = chart3;
	dropdownLabel.innerText = dropdownEl3.innerText;
	score = 0;
	scoreDisplay.innerText = `Score : ${score}`;
	deal();
});

dropdownEl4.addEventListener("click", function () {
	chartValue = chart4;
	dropdownLabel.innerText = dropdownEl4.innerText;
	score = 0;
	scoreDisplay.innerText = `Score : ${score}`;
	deal();
});

dropdownEl5.addEventListener("click", function () {
	chartValue = chart5;
	dropdownLabel.innerText = dropdownEl5.innerText;
	score = 0;
	scoreDisplay.innerText = `Score : ${score}`;
	deal();
});

infoIcon.addEventListener("click", () => {
	infoMessage.classList.toggle("is-hidden");
});

infoMessageButton.addEventListener("click", () => {
	infoMessage.classList.toggle("is-hidden");
});

pushButton.addEventListener("click", () => isInChart(true));
foldButton.addEventListener("click", () => isInChart(false));
resetButton.addEventListener("click", init);

/*-------------------------------- Functions --------------------------------*/
function init() {
	score = 0;
	updateScore();
	buttonDiv.classList.toggle("is-hidden");
	resetButtonDiv.classList.toggle("is-hidden");
	resetButton.classList.remove("is-warning", "is-success");
	makeDeck();
	deal();
}

class Card {
	constructor(value, suit) {
		this.value = value;
		this.suit = suit;
		this.source = `../images/${this.value}_of_${this.suit}.png`;
	}
}

function makeDeck() {
	deck = [];
	suits.forEach(suit => {
		values.forEach(value => {
			deck.push(new Card(value, suit));
		});
	});
}

function deal() {
	resultsMessage.classList = "";
	hand = [];
	handValue = "";
	resultsMessage.innerText = "Choose a button below.";
	let card1 = getRandomCard();
	let card2 = getRandomCard();
	while (card1 === card2) {
		card2 = getRandomCard();
	}
	hand.push(card1, card2);
	playAudio(dealCardSound);
	leftCard.src = hand[0].source;
	rightCard.src = hand[1].source;
	getHandValue();
}

function getHandValue() {
	handValue = "";
	if (hand[0].value === hand[1].value) {
		handValue += hand[0].value + hand[1].value;
	} else if (values.indexOf(hand[0].value) > values.indexOf(hand[1].value)) {
		handValue += hand[0].value + hand[1].value;
		hand[0].suit === hand[1].suit ? (handValue += "s") : (handValue += "o");
	} else {
		handValue += hand[1].value + hand[0].value;
		hand[0].suit === hand[1].suit ? (handValue += "s") : (handValue += "o");
	}
}

function isInChart(bool) {
	if (!chartValue) {
		chartValue = chart1;
		dropdownLabel.innerText = "UTG and UTG+1";
	}
	if (chartValue.includes(handValue) === bool) {
		score += 1;
		score < 10 ? renderCorrectGuess() : renderWinMessage();
	} else {
		renderLoseMessage();
	}
}

function renderCorrectGuess() {
	playAudio(correctChime);
	resultsMessage.classList.add("animate__animated", "animate__pulse");
	resultsMessage.innerText = "You got it! Keep it up!";
	setTimeout(deal, 1600);
	updateScore();
}

function renderLoseMessage() {
	buttonDiv.classList.toggle("is-hidden");
	resetButton.innerText = "Try Again";
	resetButton.classList.add("is-warning");
	resetButtonDiv.classList.toggle("is-hidden");
	playAudio(loseBuzzer);
	resultsMessage.classList.add("animate__animated", "animate__headShake");
	if (chartValue.includes(handValue)) {
		resultsMessage.innerText = `Oh no! ${handValue} is in the selected range!`;
	} else {
		resultsMessage.innerText = `Oh no! ${handValue} is not in the selected range!`;
	}
	scoreDisplay.innerText = `Score : ${score}`;
}

function renderWinMessage() {
	playAudio(correctChime);
	setTimeout(() => playAudio(winningFanfare), 700);
	setTimeout(() => confetti(), 2850);
	resetButton.innerText = "Play Again";
	buttonDiv.classList.toggle("is-hidden");
	resetButton.classList.add("is-success");
	resetButtonDiv.classList.toggle("is-hidden");
	resultsMessage.classList.add("animate__animated", "animate__tada");
	resultsMessage.innerText = "You won the tournament! You're a poker pro!";
	updateScore();
}

// Helper functions
function playAudio(sound) {
	sound.volume = 0.5;
	sound.play();
}

function getRandomCard() {
	return deck[Math.floor(Math.random() * 52)];
}

function updateScore() {
	scoreDisplay.innerText = `Score : ${score}`;
}

// Starts the game when page loads
init();
