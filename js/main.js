/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h']

const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'Q', 'K', 'A', 'J']

const masterDeck = buildOriginalDeck();

/*----- state variables -----*/

let winner, shuffledDeck, playerHand, dealerHand, dealerScore, playerScore

/*----- cached elements  -----*/
const shuffledContainer = document.getElementById('shuffled-deck-container');
const playBtn = document.getElementById('playBtn');
const pResultEl = document.getElementById('p-result');
const dResultEl = document.getElementById('d-result');
const playerHandEl = document.getElementById('pcards');
const dealerHandEl = document.getElementById('dcards');
const playerScoreEl = document.getElementById('p-score');
const dealerScoreEl = document.getElementById('d-score');
const hitBtn = document.getElementById('hit');
const holdBtn = document.getElementById('hold');
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


function render() {
    renderDeck(playerHand, playerHandEl);
    renderDeck(dealerHand, dealerHandEl);
    renderScore(playerScore, playerScoreEl);
    renderScore(dealerScore, dealerScoreEl);
    renderMessage();
}

function play() {
    if(playerHand.length) return;
    playerHand.push(shuffledDeck.pop());
    dealerHand.push(shuffledDeck.pop());
    playerHand.push(shuffledDeck.pop());
    dealerHand.push(shuffledDeck.pop());
    render();
}


function hit() {
    if(!playerHand.length) return
    if (calculateScore(playerHand) > 21) {
        return;
    }
    else {
        playerHand.push(shuffledDeck.pop());
        if (calculateScore(playerHand) >= 21) {
            hold();
        }
    }
    winner = checkWinner();
    render();
}

function hold() {

    if(!playerHand.length) return
    dealerScore = calculateScore(dealerHand);

    
    while (dealerScore < 17) {
        dealerHand.push(shuffledDeck.pop());
        dealerScore = calculateScore(dealerHand);
    }
    winner = checkWinner()
    renderMessage();
    dealerScoreEl.innerHTML = `${dealerScore}`;
    renderDeck(dealerHand, dealerHandEl);
}

function renderScore(handScore, handScoreEl) {
    
    playerScoreEl.innerHTML = `${calculateScore(playerHand)}`;
    
    dealerScore = calculateScore(dealerHand);
    dealerScoreEl.innerHTML = ""
}

function renderDeck(hand, handEl) {
    handEl.innerHTML = "";
    console.log(hand);
    hand.forEach(card => {
        const cardEl = document.createElement("div");
        cardEl.classList.add("card", card.face);
        handEl.append(cardEl);
    })
    if (dealerHand.length === 2 && handEl === dealerHandEl) {
        dealerHandEl.children[0].className = "card back";
    }
}

function buildOriginalDeck() {
    const deck = [];
    suits.forEach(function(suit) {
        ranks.forEach(function(rank) {
            deck.push({
                face: `${suit}${rank}`,
                value: Number(rank) || (rank === 'A' ? 11 : 10)
            });
        });
    });
    return deck;
}

function getShuffledDeck() {
    const tempDeck = [...masterDeck];
    const shuffledDeck = [];
    while (tempDeck.length) {
        const rndIdx = Math.floor(Math.random() * tempDeck.length);
        shuffledDeck.push(tempDeck.splice(rndIdx, 1)[0])
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
    
    if (playerScore === 21) {
        return 'pBJ'
    }
    
    else if (playerScore > 21) {
        return 'pbust'
    }
    
    else if(playerScore > dealerScore) {
        return 'p'
    }
    
    else if(dealerScore === 21){
        return 'dBJ'
    }

    else if (dealerScore > 21) {
        return 'dbust'
    }
    
    else if(dealerScore > playerScore) {
        return 'd'
    }
    
    else if(dealerScore > 21) {
        return 'p'
    }
    
    else if(playerScore === dealerScore) {
        return 'push'
    }

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
    if (winner = null) {
        resetBtn.style.visibility = 'hidden';
    }
}