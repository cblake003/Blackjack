/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h']

const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'Q', 'K', 'A', 'J']

const masterDeck = buildOriginalDeck();

/*----- state variables -----*/

let winner, shuffledDeck, playerHand, dealerHand, playerScore, dealerScore

/*----- cached elements  -----*/
const shuffledContainer = document.getElementById('shuffled-deck-container');
const pResultEl = document.getElementById('p-result');
const dResultEl = document.getElementById('d-result');
const playerHandEl = document.getElementById("pcards");
const dealerHandEl = document.getElementById("dcards");

/*----- event listeners -----*/

document.getElementById('playBtn').addEventListener('click', play);
document.getElementById("hit").addEventListener("click", hit);
document.getElementById("hold").addEventListener("click", hold);

/*----- functions -----*/

init();
    
function init() {
    shuffledDeck = getShuffledDeck();
    playerHand = [];
    dealerHand = [];
    winner = null;
    render();
}
    
function play() {
    // Two cards from the shuffledDeck(splice) or pop() and those two cards should be placed in the playerHand
    playerHand.push(shuffledDeck.pop());
    dealerHand.push(shuffledDeck.pop());
    playerHand.push(shuffledDeck.pop());
    dealerHand.push(shuffledDeck.pop());
    render();
}

function hit() {
    playerHand.push(shuffledDeck.pop());
    render();
}

function hold() {
    // while dealerScore < 17 then keep drawing a card for that dealer
    while (dealerScore < 17) {
        dealerHand.push(shuffleDeck.pop())++;
        calculateScore(dealerHand)
    }
    checkWinner()
    render()
    // every time dealer draws, update dealerScore

    // once dealer is done drawing, check for winner
}

    // transfer all state to the DOM so users can visualize it
function render() {
    renderDeck(playerHand, playerHandEl);
    renderDeck(dealerHand, dealerHandEl);
}

function renderDeck(hand, handEl) {
    handEl.innerHTML = "";
    hand.forEach(card => {
        const cardEl = document.createElement("div");
        cardEl.classList.add("card", card.face);
        handEl.append(cardEl);
    })
}

function buildOriginalDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of blackjack, not war
        value: Number(rank) || (rank === 'A' ? 11 : 10)
      });
    });
  });
  return deck;
}

function getShuffledDeck() {
    const tempDeck = [...masterDeck];
    // This is making a shallow copy of the original array. It's not copying over the actual thing, it's point to the references so we're grabbing the same copy. All we need are references because we can shuffle the references and then we can get that Shuffled Deck
    const shuffledDeck = [];
    while (tempDeck.length) {
        const rndIdx = Math.floor(Math.random() * tempDeck.length);
        shuffledDeck.push(tempDeck.splice(rndIdx, 1)[0])
    // ^ splice is going to return an array of the removed element so that's why we're following that with 0 so that we ONLY get the object, not the array
    };
    return shuffledDeck;
}

function calculateScore(hand) {
    const handTotal = hand.reduce((total, card) => {
        return total + card.value
    }, 0)
    return handTotal;
}

function checkWinner() {
    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);
    return [playerScore, dealerScore];
    // if no winner, keep it null
}