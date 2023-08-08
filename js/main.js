/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h']

const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'Q', 'K', 'A', 'J']

let cards = {
    // court: ['J', 'Q', 'K'],
    suit: ['s', 'c', 'd', 'h'],
    pip: ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'Q', 'K', 'J', 'A']
}

let cardValue = {
    "02": 2,
    "03": 3,
    "04": 4,
    "05": 5,
    "06": 6,
    "07": 7,
    "08": 8,
    "09": 9,
    "10": 10,
    "Q": 10,
    "K": 10,
    "J": 10,
    "A": [1, 11]
}

let cardDeck = [
    's02',
    's03',
    's04',
    's05',
    's06',
    's07',
    's08',
    's09',
    's10',
    'sQ',
    'sK',
    'sA',
    'sJ',
    'c02',
    'c03',
    'c04',
    'c05',
    'c06',
    'c07',
    'c08',
    'c09',
    'c10',
    'cQ',
    'cK',
    'cA',
    'cJ',
    'd02',
    'd03',
    'd04',
    'd05',
    'd06',
    'd07',
    'd08',
    'd09',
    'd10',
    'dQ',
    'dK',
    'dA',
    'dJ',
    'h02',
    'h02',
    'h02',
    'h03',
    'h04',
    'h05',
    'h06',
    'h07',
    'h08',
    'h09',
    'h10',
    'hQ',
    'hK',
    'hA',
    'hJ',
]


// const originalDeck = buildOriginalDeck();

// const CARD_LOOKUP = {
//     // Need this to pull up images of cards for renderResults
//     clubs:`imgs/clubs.png`,
//     diamonds: `imgs/diamonds.png`,
//     hearts: `imgs/hearts.png`,
//     jokers: `imgs/jokers.png`,
//     spades: `imgs/spades.png`
// };

/*----- state variables -----*/

// let scores = {
// // player, dealer, and tie/push variables need to be established. Put in object so we can access via key and value and it'll be easier to read
//     p: 0,
//     d: 0,
//     t: 0
// };

// We now need to go with what the player ended up with and what the dealer ended up with
// Calling this variable Results

// let results = {
// // Need to set up a wireframe with what they're starting with. Need to figure out how to calculate results here.
// // I want to have the player results be 2 cards with each suit and value, same for computer
//     //Can I just create a result of card1 + card2 for the results? Maybe I can make a randomCardPull const that combines the suits and ranks? 
//     p: suit[h],rank[Q] + suit[d], rank[A]
//     d: suit[c],rank[10] + suit[s], rank[09]
// // Should I make separate ranks for 10 and face cards? 
// };

// This will be our winner variable, but let's call it Outcomes since there can be 5 outcomes in BJ
// player wins, player wins w/ blackjack, dealer wins, dealer wins w/ BJ, or tie
// let outcome = 'p', 'pBJ', 'd', 'dBJ', 't';

// renderDeckInContainer(originalDeck, document.getElementById('original-deck-container'));

let winner;
let shuffleDeck;

	/*----- cached elements  -----*/
const shuffledContainer = document.getElementById('shuffled-deck-container');
const pResultEl = document.getElementById('p-result');
const dResultEl = document.getElementById('d-result');

	/*----- event listeners -----*/
// Only need this at the start of a new game so commenting out for now until can figure that out
    // document.querySelector('button').addEventListener('click', renderNewShuffledDeck);
    // document.querySelector('button').addEventListener('click', handleChoice)

    document.getElementById('playBtn').addEventListener('click', play);

	/*----- functions -----*/

    init();
    
    function init() {
        scores = {
            playersCurrentHand: 0,
            dealerCurrentHand: 0,
            tie: 0
        };

        results = {
        //     // trying to start player off with Blackjack when home screen loads
        //     p: suit[h], rank[Q] + suit[d], rank[A];
        //     d: suit[c],rank[10] + suit[s], rank[09]
        }
        outcome = 'p';
        // render();
    }
    
    function play() {
        // 0 = false, 1 = true for the faceDown parameter; 
        let playerCard1Value = getCard("playerCard1", 0);
        let dealerCard1Value = getCard("dealerCard1", 1);
        let playerCard2Value = getCard("playerCard2", 0);
        let dealerCard2Value = getCard("dealerCard2", 0);

        scores.playersCurrentHand = playerCard1Value + playerCard2Value;
        scores.dealerCurrentHand = dealerCard1Value + dealerCard2Value;

        deck.
        console.log(scores);

    }

    function getCard(playerCard, faceDown) {
        // giving 2 parameters - the card we need and if it needs to be faceDown
        // the playerCard will give us wither playerCard# or dealerCard#
        // the facedown true or false will tell us which one to go to the back of the card for should it be the dealer's first card
        let suitIdx = Math.floor(Math.random() * cards.suit.length);
        let pipIdx = Math.floor(Math.random() * cards.pip.length);
        let rndSuit = cards.suit[suitIdx];
        let rndPip = cards.pip[pipIdx];

        let cardCSSClass = rndSuit + rndPip + " card";
        console.log(playerCard+"-"+cardCSSClass);
        if (faceDown) {
            cardCSSClass = "back card";
        }
        
        document.getElementById(playerCard).className = cardCSSClass;

        return cardValue[rndPip];
    }

    // transfer all state to the DOM so users can visualize it
    function render() {
        renderOriginalDeck();
        renderShuffledDeck();
        renderScores();
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
                // value: Number(rank) || (rank === 'A' 11 || 1) || (rank === 'K', 'Q' ? 10)
                // will this set up values correctly or should I make if statements?
            });
            console.log(deck);
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
    }

    function renderScores() {
        for (let key in scores) {
            const scoreEl = document.getElementById(`${key}-score`);
            scoreEl.innerText = scores[key];
        }
    }

    function renderResults() {
        // this is just wrong now. need to get both cards and add them together
        // pResultEl.src = CARD_LOOKUP[results.p];
        // dResultEl.src = CARD_LOOKUP[results.d];
    }

    // in response to user interaction, player made a move -
        // update all impacted state
        // must add another card in player's hand if they click Hit
        // call render after so it'll transfer that state to the DOM
    function handleChoice(evt) {
        // guard!
        if (evt.target.tagName !== 'BUTTON') return;
        results.p = getRandomCard() + getRandomCard();
        results.d = getRandomCard() + getRandomCard();
    }

   function getWinner() {

    }

    function getRandomCard() {
      getRandomSuit()
      getRandomRank()
    }

    function getRandomSuit() {
        const rndIdx = Math.floor(Math.random() * suits.length);
        return suits[rndIdx];
    }

    function getRandomRank() {
        const rndIdx = Math.floor(Math.random() * ranks.length);
        return ranks[rndIdx];
    }
}