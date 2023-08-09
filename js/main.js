/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h']

const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'Q', 'K', 'A', 'J']

const masterDeck = buildOriginalDeck();

// const messages = {
//     "pBJ": "You got Blackjack!"
// }
/*----- state variables -----*/

let winner, shuffledDeck, playerHand, dealerHand, dealerScore, playerScore

/*----- cached elements  -----*/
const shuffledContainer = document.getElementById('shuffled-deck-container');
const playBtn = document.getElementById('playBtn');
const pResultEl = document.getElementById('p-result');
const dResultEl = document.getElementById('d-result');
const playerHandEl = document.getElementById("pcards");
const dealerHandEl = document.getElementById("dcards");
const playerScoreEl = document.getElementById('p-score');
const dealerScoreEl = document.getElementById('d-score');
const hitBtn = document.getElementById("hit");
const holdBtn = document.getElementById("hold");
const resetBtn = document.getElementById('reset');
const messageEl = document.getElementById('msg');

/*----- event listeners -----*/

playBtn.addEventListener("click", play);
hitBtn.addEventListener("click", hit);
holdBtn.addEventListener("click", hold);
resetBtn.addEventListener("click", init);

/*----- functions -----*/

init();

function init() {
    shuffledDeck = getShuffledDeck();
    playerHand = [];
    dealerHand = [];
    dealerScore = 0;
    playerScore = 0;
    winner = null;
    render();
}

// function hideButton(btn) {
    // playBtn.style.display = "none";
// }

function render() {
    renderDeck(playerHand, playerHandEl);
    renderDeck(dealerHand, dealerHandEl);
    renderScore(playerScore, playerScoreEl);
    renderScore(dealerScore, dealerScoreEl);
    // renderControls(); hide the buttons if you haven't start in this function
    renderMessage();
}

function play() {
    // Two cards from the shuffledDeck(splice) or pop() and those two cards should be placed in the playerHand
    if(playerHand.length) return;
    playerHand.push(shuffledDeck.pop());
    dealerHand.push(shuffledDeck.pop());
    playerHand.push(shuffledDeck.pop());
    dealerHand.push(shuffledDeck.pop());
    render();
}


function hit() {
    if(!playerHand.length) return
    if (playerScore > 21) {
        return;
    } else if (playerScore === 21) {
        hold();
    }
    else {
        playerHand.push(shuffledDeck.pop());
    }
    checkWinner();
    render();
}

function hold() {
    // while dealerScore < 17 then keep drawing a card for that dealer
    if(!playerHand.length) return
    dealerScore = calculateScore(dealerHand);

    while (dealerScore < 17) {
        dealerHand.push(shuffledDeck.pop());
        dealerScore = calculateScore(dealerHand);
    }
    winner = checkWinner()
    dealerScoreEl.innerHTML = `${dealerScore}`;
    // every time dealer draws, update dealerScore
    
    // once dealer is done drawing, check for winner
}
// transfer all state to the DOM so users can visualize it

function renderScore(handScore, handScoreEl) {
    
    playerScoreEl.innerHTML = `${calculateScore(playerHand)}`;
    
    dealerScore = calculateScore(dealerHand);
    dealerScoreEl.innerHTML = ""
}

function renderDeck(hand, handEl) {
    handEl.innerHTML = "";
    hand.forEach(card => {
        const cardEl = document.createElement("div");
        cardEl.classList.add("card", card.face);
        handEl.append(cardEl);
    })
    if (dealerHand.length === 2 && handEl === dealerHandEl) {
        console.log(dealerHandEl)
        dealerHandEl.children[0].className = "card back";
    }
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
    playerScore = calculateScore(playerHand);
    dealerScore = calculateScore(dealerHand);
    console.log("hi")
    // dealerHandEl.children[0].classList.add("card", card.face);
    if (!winner) {
        winner = null
    }
    
    else if (playerScore === 21) {
        winner = 'pBJ'
    }
    
    else if (playerScore > 21) {
        winner = 'pbust'
    }
    
    else if(playerScore > dealerScore) {
        winner = 'p'
    }
    
    else if(dealerScore === 21){
        winner = 'dBJ'
    }

    else if (dealerScore > 21) {
        winner = 'dbust'
    }
    
    else if(dealerScore > playerScore) {
        winner = 'd'
    }
    
    else if(dealerScore > 21) {
        winner = 'p'
    }
    
    else if(playerScore === dealerScore) {
        winner = 'push'
    }
    renderMessage();
}

function renderMessage() {
    if (winner === null) {
        messageEl.innerText = "Let's Play!"
    }

    if (winner === 'p') {
        messageEl.innerText = "You won! Nice job!"
    }
    
    if (winner === 'd') {
        messageEl.innerText = "Dealer wins..."
    }

    if (winner === 'pBJ') {
        messageEl.innerText = "Blackjack! You win!"
    }

    if (winner === 'dBJ') {
        messageEl.innerText = "Dealer got Blackjack... tough"
    }

    if (winner === 'push') {
        messageEl.innerText = "Push... let's go again?"
    }

    if (winner === 'pbust') {
        messageEl.innerText = "You busted... ouch"
    }

    if (winner === 'dbust') {
        messageEl.innerText = "Dealer busted! You win!"
    }
}

function renderControls() {
    // resetBtn.style.visibility = winner ? 'visible' : 'hidden'
    if (winner === null) {
        resetBtn.style.visibility = 'hidden';
    }
}