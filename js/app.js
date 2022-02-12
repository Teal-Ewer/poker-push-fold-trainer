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
// const chart1 = [
//   [true, true, true, true, true, true, true, false, false, false, false, false],
//   [true, true, true, true, true, false, false, false, false, false, false, false],
//   [true, true, true, true, true, false, false, false, false, false, false, false],
//   [true, false, false, true, true, false, false, false, false, false, false, false],
//   [true, false, false, false, true, false, false, false, false, false, false, false],
//   [false, false, false, false, false, true, false, false, false, false, false, false],
// ]

// prettier-ignore
const chart1 = ["AA", "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s", "AKo", "KK", "KQs", "KJs", "KTs", "K9s", "AQo", "KQo", "QQ", "QJs", "QTs", "Q9s", "AJo", "KJo", "JJ", "JTs", "J9s", "ATo", "TT", "T9s", "A9o", "99", "88", "77", "66", "55", "44", "33", "22"];

/*---------------------------- Variables (state) ----------------------------*/
let deck, hand, handValue;

/*------------------------ Cached Element References ------------------------*/
const dropdown = document.querySelector(".dropdown");
const pushButton = document.querySelector("#pushButton");
const foldButton = document.querySelector("#foldButton");
const leftCard = document.querySelector(".leftCard");
const rightCard = document.querySelector(".rightCard");

/*----------------------------- Event Listeners -----------------------------*/
dropdown.addEventListener("click", function (event) {
	event.stopPropagation();
	dropdown.classList.toggle("is-active");
});

dropdown.addEventListener("focusout", function (event) {
	event.stopPropagation();
	dropdown.classList.toggle("is-active");
});

pushButton.addEventListener("click", deal);

foldButton.addEventListener("click", () => console.log(handValue));

/*-------------------------------- Functions --------------------------------*/
class Card {
	constructor(value, suit) {
		this.value = value;
		this.suit = suit;
		this.source = `../images/${this.value}_of_${this.suit}.png`;
	}
}

function init() {
	makeDeck();
	deal();
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
	hand = [];
	handValue = "";
	let card1 = deck[Math.floor(Math.random() * 52)];
	let card2 = deck[Math.floor(Math.random() * 52)];
	while (card1 === card2) {
		card2 = deck[Math.floor(Math.random() * 52)];
	}
	hand.push(card1, card2);
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

init();
