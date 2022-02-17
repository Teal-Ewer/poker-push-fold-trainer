/*-------------------------------- Constants --------------------------------*/

// prettier-ignore
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
const suits = ["spades", "hearts", "clubs", "diamonds"];

// prettier-ignore
const chart1 = [
	"AA", "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "AKo", "KK", "KQs",
	"KJs", "KTs", "AQo", "KQo", "QQ", "QJs", "QTs", "AJo", "JJ", "JTs",
	"ATo", "TT", "99", "88", "77", "66", "55", "44",
]

// prettier-ignore
const chart2 = chart1.concat([
	"A7s", "A6s", "A5s", "A4s", "A3s", "A2s", "K9s", "Q9s", "KJo", "J9s",
	"T9s", "A9o", "33", "22",
]);

// prettier-ignore
const chart3 = chart2.concat([
	"K8s", "K7s", "QJo", "J8s", "KTo", "QTo", "JTo", "T8s", "98s", "A8o", 
	"A7o", "A6o", "A5o", "A4o" ,
]);

// prettier-ignore
const chart4 = chart3.concat([
	"K6s", "K5s", "K4s", "K3s", "K2s", "Q8s", "Q7s", "Q6s", "J7s", "T7s",
	"K9o", "Q9o", "T9o", "97s", "K8o", "87s", "86s", "K7o", "76s", "K6o",
	"65s", "A3o", "A2o",
]);

// prettier-ignore
const chart5 = chart4.concat([ 
	"Q5s", "Q4s", "Q3s", "Q2s", "J6s", "J5s", "J4s", "J3s", "J2s", "T6s",
	"T5s", "T4s", "T3s", "J9o", "96s", "95s", "Q8o", "J8o", "T8o", "98o",
	"85s", "84s", "Q7o", "J7o", "T7o", "97o", "87o", "75s", "74s", "Q6o",
	"J6o", "86o", "76o", "64s", "K5o", "Q5o", "54s", "53s", "K4o", "Q4o",
	"43s", "K3o", "Q3o", "K2o", "Q2o",
])

/*---------------------------- Variables (state) ----------------------------*/

let deck, hand, handValue, score, chartValue, isActive, handsPlayed;

/*------------------------ Cached Element References ------------------------*/

// Buttons and Interactive elements
const dropdown = document.querySelector(".dropdown");
const dropdownLabel = document.querySelector("#dropdown-label");
const dropdownItems = document.querySelectorAll(".dropdown-item");
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

dropdown.addEventListener("click", e => {
	e.stopPropagation();
	dropdown.classList.toggle("is-active");
});

document.addEventListener("click", () => {
	dropdown.classList.remove("is-active");
});

dropdownItems.forEach(item => {
	item.addEventListener("click", function (e) {
		if (e.target.id === "dropdown-item1") {
			chartValue = chart1;
		}
		if (e.target.id === "dropdown-item2") {
			chartValue = chart2;
		}
		if (e.target.id === "dropdown-item3") {
			chartValue = chart3;
		}
		if (e.target.id === "dropdown-item4") {
			chartValue = chart4;
		}
		if (e.target.id === "dropdown-item5") {
			chartValue = chart5;
		}
		if (buttonDiv.classList.contains("is-hidden")) {
			dropdownLabel.innerText = e.target.innerText;
			init();
		} else {
			score = 0;
			dropdownLabel.innerText = e.target.innerText;
			renderScore();
			deal();
		}
	});
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
	renderScore();
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
	if (score < 3) {
		resultsMessage.innerText = "You got it! Keep it up!";
	} else if (score < 5) {
		resultsMessage.innerText = "Keep up the good work!";
	} else if (score === 5) {
		resultsMessage.innerText = "Halfway there!";
	} else if (score < 8) {
		resultsMessage.innerText = "You got it! Keep it up!";
	} else if (score === 8) {
		resultsMessage.innerText = "So close! You can do it!";
	} else resultsMessage.innerText = "Last one!";
	setTimeout(deal, 1600);
	renderScore();
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
	renderScore();
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
	renderScore();
}

// Helper functions
function getRandomCard() {
	return deck[Math.floor(Math.random() * 52)];
}

function playAudio(sound) {
	// This line checks if the user has interacted with the page before playing audio
	if (chartValue) {
		sound.volume = 0.5;
		sound.play();
	} else return;
}

function renderScore() {
	scoreDisplay.innerText = `Score : ${score}`;
}

// Starts the game when page loads
init();
