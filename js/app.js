/*-------------------------------- Constants --------------------------------*/
const values = [2, 3, 4, 5, 6, 7, 8, 9, "T", "J", "Q", "K", "A"];
const suits = ["spades", "hearts", "clubs", "diamonds"];

// prettier-ignore
const mainChart = [
  ["AA", "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s"],
  ["AKo", "KK", "KQs", "KJs", "KTs", "K9s", "K8s", "K7s", "K6s", "K5s", "K4s", "K3s", "K2s"],
  ["AQo", "KQo", "QQ", "QJs", "QTs", "Q9s", "Q8s", "Q7s", "Q6s", "Q5s", "Q4s", "Q3s", "Q2s"],
  ["AJo", "KJo", "QJo", "JJ", "JTs", "J9s", "J8s", "J7s", "J6s", "J5s", "J4s", "J3s", "J2s"],
  ["ATo", "KTo", "QTo", "JTo", "TT", "T9s", "T8s", "T7s", "T6s", "T5s", "T4s", "T3s", "T2s"],
  ["A9o", "K9o", "Q9o", "J9o", "T9o", "99", "98s", "97s", "96s", "95s", "94s", "93s", "92s"],
  ["A8o", "K9o", "Q8o", "J8o", "T8o", "98o", "88", "87s", "86s", "85s", "84s", "83s", "82s"]
]

/*---------------------------- Variables (state) ----------------------------*/
let deck = [];

/* ------------------------Cached Element References------------------------* /


/*----------------------------- Event Listeners -----------------------------*/

/*-------------------------------- Functions --------------------------------*/
class Card {
	constructor(value, suit) {
		this.value = value;
		this.suit = suit;
	}
}

function makeDeck() {
	suits.forEach(suit => {
		values.forEach(value => {
			deck.push(new Card(value, suit));
		});
	});
}

makeDeck();
