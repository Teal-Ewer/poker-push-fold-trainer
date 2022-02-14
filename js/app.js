/*-------------------------------- Constants --------------------------------*/
// prettier-ignore
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
const suits = ["spades", "hearts", "clubs", "diamonds"];

// prettier-ignore
const mainChart = [
  ["AA", "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s"],
  ["AKo", "KK", "KQs", "KJs", "KTs", "K9s", "K8s", "K7s", "K6s", "K5s", "K4s", "K3s", "K2s"],
  ["AQo", "KQo", "QQ", "QJs", "QTs", "Q9s", "Q8s", "Q7s", "Q6s", "Q5s", "Q4s", "Q3s", "Q2s"],
  ["AJo", "KJo", "QJo", "JJ", "JTs", "J9s", "J8s", "J7s", "J6s", "J5s", "J4s", "J3s", "J2s"],
  ["ATo", "KTo", "QTo", "JTo", "TT", "T9s", "T8s", "T7s", "T6s", "T5s", "T4s", "T3s", "T2s"],
  ["A9o", "K9o", "Q9o", "J9o", "T9o", "99", "98s", "97s", "96s", "95s", "94s", "93s", "92s"],
  ["A8o", "K9o", "Q8o", "J8o", "T8o", "98o", "88", "87s", "86s", "85s", "84s", "83s", "82s"],
  ["A7o", "K7o", "Q7o", "J7o", "T7o", "97o", "87o", "77", "76s", "75s", "74s", "73s", "72s"],
  ["A6o", "K6o", "Q6o", "J6o", "T6o", "96o", "86o", "76o", "66", "65s", "64s", "63s", "62s"],
  ["A5o", "K5o", "Q5o", "J5o", "T5o", "95o", "85o", "75o", "65o", "55", "54s", "53s", "52s"],
  ["A4o", "K4o", "Q4o", "J4o", "T4o", "94o", "84o", "74o", "64o", "54o", "44", "43s", "42s"],
  ["A3o", "K3o", "Q3o", "J3o", "T3o", "93o", "83o", "73o", "63o", "53o", "43o", "33", "32s"],
  ["A2o", "K2o", "Q2o", "J2o", "T2o", "92o", "82o", "72o", "62o", "52o", "42o", "32o", "22"],
];

// prettier-ignore
const chart1 = [
	"AA", "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "AKo",
	"KK", "KQs", "KJs", "KTs", "AQo", "KQo", "QQ", "QJs",
	"QTs", "AJo", "JJ", "JTs", "ATo", "TT", "99", "88",
	"77", "66", "55", "44"
]

// prettier-ignore
const chart2 = [
	"AA", "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "A7s",
	"A6s", "A5s", "A4s", "A3s", "A2s", "AKo", "KK", "KQs",
	"KJs", "KTs", "K9s", "AQo", "KQo", "QQ", "QJs", "QTs",
	"Q9s", "AJo", "KJo", "JJ", "JTs", "J9s", "ATo", "TT",
	"T9s", "A9o", "99", "88", "77", "66", "55", "44",
	"33", "22"
];

// prettier-ignore
const chart3 = [
	"AA", "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "A7s",
	"A6s", "A5s", "A4s", "A3s", "A2s", "AKo", "KK", "KQs",
	"KJs", "KTs", "K9s", "K8s", "K7s", "AQo", "KQo", "QQ",
	"QJs", "QTs", "Q9s", "AJo", "KJo", "QJo", "JJ", "JTs",
	"J9s", "J8s", "ATo", "KTo", "QTo", "JTo", "TT", "T9s",
	"T8s", "A9o", "99", "98s", "A8o", "88", "A7o", "77",
	"A6o", "66", "A5o", "55", "A4o", "44", "33", "22"
];

// prettier-ignore
const chart4 = [
	"AA", "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "A7s",
	"A6s", "A5s", "A4s", "A3s", "A2s", "AKo", "KK", "KQs",
	"KJs", "KTs", "K9s", "K8s", "K7s", "K6s", "K5s", "K4s",
	"K3s", "K2s", "AQo", "KQo", "QQ", "QJs", "QTs", "Q9s",
	"Q8s", "Q7s", "Q6s", "AJo", "KJo", "QJo", "JJ", "JTs",
	"J9s", "J8s", "J7s", "ATo", "KTo", "QTo", "JTo", "TT",
	"T9s", "T8s", "T7s", "A9o", "K9o", "Q9o", "T9o", "99",
	"98s", "97s", "A8o", "K8o", "88", "87s", "86s", "A7o",
	"K7o", "77", "76s", "A6o", "K6o", "66", "65s", "A5o",
	"55", "A4o", "44", "A3o", "33", "A2o", "22"
];

// prettier-ignore
const chart5 = [
	""
]

/*---------------------------- Variables (state) ----------------------------*/
let deck, hand, handValue, score;
let chartValue = chart2;

/*------------------------ Cached Element References ------------------------*/
// Buttons and Interactive elements
const dropdown = document.querySelector(".dropdown");
const pushButton = document.querySelector("#pushButton");
const foldButton = document.querySelector("#foldButton");
const infoIcon = document.querySelector("#info");
const infoMessageButton = document.querySelector("#infoMessageButton");

// Images
const leftCard = document.querySelector(".leftCard");
const rightCard = document.querySelector(".rightCard");

// Text elements
const resultsMessage = document.querySelector("#resultsMessage");
const scoreDisplay = document.querySelector("#score");
const infoMessage = document.querySelector("#infoMessage");

// audio
const dealCardSound = new Audio("../audio/doubleCardSlide.mp3");
const correctChime = new Audio("../audio/correctChime.mp3");
const loseBuzzer = new Audio("../audio/loseBuzzer.mp3");
/*----------------------------- Event Listeners -----------------------------*/
dropdown.addEventListener("click", function (event) {
	event.stopPropagation();
	dropdown.classList.toggle("is-active"); // tried adding "is-focused"
});

dropdown.addEventListener("focusout", function (event) {
	event.stopPropagation();
	dropdown.classList.toggle("is-active");
});

infoIcon.addEventListener("click", () => {
	infoMessage.classList.toggle("is-hidden");
});

infoMessageButton.addEventListener("click", () => {
	infoMessage.classList.toggle("is-hidden");
});

pushButton.addEventListener("click", () => isInChart(true));
foldButton.addEventListener("click", () => isInChart(false));

/*-------------------------------- Functions --------------------------------*/
function init() {
	score = 0;
	scoreDisplay.innerText = `Score : ${score}`;
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
	if (chartValue.includes(handValue) === bool) {
		playAudio(correctChime);
		score += 1;
		resultsMessage.classList.add("animate__animated", "animate__pulse");
		resultsMessage.innerText = "You got it! Keep it up!";
		setTimeout(deal, 1500);
	} else {
		playAudio(loseBuzzer);
		score = 0;
		resultsMessage.classList.add("animate__animated", "animate__headShake");
		resultsMessage.innerText = "Oh no!";
	}
	scoreDisplay.innerText = `Score : ${score}`;
}

// Helper functions
function playAudio(sound) {
	sound.volume = 0.6;
	sound.play();
}

function getRandomCard() {
	return deck[Math.floor(Math.random() * 52)];
}

init();
