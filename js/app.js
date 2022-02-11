/*-------------------------------- Constants --------------------------------*/
const values = [2, 3, 4, 5, 6, 7, 8, 9, "T", "J", "Q", "K", "A"];
const suits = ["spades", "hearts", "clubs", "diamonds"];

/*---------------------------- Variables (state) ----------------------------*/
let deck = [];
/*------------------------ Cached Element References ------------------------*/

/*----------------------------- Event Listeners -----------------------------*/

/*------------------------------- Functions --------------------------------*/
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
