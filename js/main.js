/*----- constants -----*/
const PLAYERS {
    "1": ""
    "-1": ""
    "0": null
}

const suits = ['s', 'c', 'd', 'h']
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'Q', 'K', 'A']
// Should I make separate ranks for 10 and face cards?

const originalDeck = buildOriginalDeck();
renderDeckInContainer(originalDeck, document.getElementById('original-deck-container'));

	/*----- state variables -----*/
let table
let points
let winner
let shuffleDeck

	/*----- cached elements  -----*/
const shuffledContainer = document.getElementById('shuffled-deck-container');

	/*----- event listeners -----*/
document.querySelector('button').addEventListener('click', renderNewShuffledDeck);

	/*----- functions -----*/

function buildOriginalDeck() {
    const deck = [];
    suits.forEach(function(suit) {
        ranks.forEach(function(rank) {
            deck.push({
                // maps to the face property in the CSS library classes for cards
                face: '${suit}${rank}',
                // need to assign value to each card because this is the function that's going to pull the value FOR EACH card
                value: Number(rank) || (rank === 'A' 11 || 1) || (rank === 'K', 'Q' ? 10)
                // will this set up values correctly or should I make if statements?
            });
        });
    });

    function renderShuffledDeck() {
        const tempDeck = [...originalDeck];
        // This is making a shallow copy of the original array. It's not copying over the actual thing, it's point to the references so we're grabbing the same copy. All we need are references because we can shuffle the references and then we can get that Shuffled Deck
        const shuffledDeck = [];
        while (tempDeck.length) {
            const rndIdx = Math.floor(Math.random() * tempDeck.length);
        shuffledDeck.push(tempDeck.splice(rndIdx, 1)[0])
        // ^ splice is going to return an array of the removed element so that's why we're following that with 0 so that we ONLY get the object, not the array
        return shuffledDeck;
        };
    }:

    render () {
        renderShuffledDeck();
        
    }