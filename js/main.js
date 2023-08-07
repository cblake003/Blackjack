/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h']
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'Q', 'K', 'A']
const originalDeck = buildOriginalDeck();

/*----- state variables -----*/

let SCORES {
// player, dealer, and tie/push variables need to be established. Put in object so we can access via key and value and it'll be easier to read
    p: 0,
    d: 0,
    t: 0
}

// We now need to go with what the player ended up with and what the dealer ended up with
// Calling this variable Results

let results = {
// Need to set up a wireframe with what they're starting with. Need to figure out how to calculate results here.
// I want to have the player results be 2 cards with each suit and value, same for computer
    //Can I just create a result of card1 + card2 for the results? Maybe I can make a randomCardPull const that combines the suits and ranks? 
    p: suit['h'],rank[Q] + suit['d'], rank[A]
    d: suit['c'],rank['10'] + suit['s'], rank[09]
// Should I make separate ranks for 10 and face cards? 
}

// This will be our winner variable, but let's call it Outcomes since there can be 5 outcomes in BJ
// player wins, player wins w/ blackjack, dealer wins, dealer wins w/ BJ, or tie
let outcome = 'p', 'pBJ', 'd', 'dBJ', 't'

renderDeckInContainer(originalDeck, document.getElementById('original-deck-container'));

let table
let points
let winner
let shuffleDeck

	/*----- cached elements  -----*/
const shuffledContainer = document.getElementById('shuffled-deck-container');

	/*----- event listeners -----*/
document.querySelector('button').addEventListener('click', renderNewShuffledDeck);

	/*----- functions -----*/

    init();
    
    function init() {
        render();
        
    }
    
    render () {
        renderOriginalDeck();
        renderShuffledDeck();
        renderResults();
        handleChoice();
        getwinner();
    }


function renderOriginalDeck() {
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

    renderResults () {

    }

    handleChoice() {

    }

    getWinner() {

    }