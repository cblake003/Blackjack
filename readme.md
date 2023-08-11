# Blackjack

As a software engineering fellow with General Assembly, our first project was to create a working game application. I've always enjoyed playing Blackjack, so I knew this game would be the most fun for me to code and customize myself. Blackjack is a card game where the dealer and player each try to score higher than the other. The highest score to reach is 21, but if either the dealer or player surpass 21 points, they will "bust" and automatically. Should the dealer or player reach exactly 21 points, they will have won "Blackjack" and can only be tied at that point.

Javascript, HTML, and CSS were used in the creating of this game.

PseudoCode

User opens Blackjack application

<img src="https://imgur.com/a/u8wqRN2">

Invoke init() function
Make sure init() renders
Use render() function
        Put renderCards()
        Put renderBtn() ??
        Put renderShuffleDeck ??
User is greeted with Home Screen
    renderHomeScreen()

User presses "PLAY" to begin game.

<img src="https://imgur.com/Z24Jv55">

    Create PLAY Button will be in HTML and styled in CSS.
    const playBtn = document.getElementById('playBtn');

Deck is shuffled
    
    function shuffleDeck() {}

Game renders player's hand with 2 cards face up and dealer's hand with one card face up and one card face down. Player will be shown their score while the dealer's score is hidden.

<img src="https://imgur.com/LWordG9">


    Player1 receives two random cards using the shuffleDeck function. 

There is an implicit assumption that the dealer will STAY if Dealer's score is 17 or higher. There an If statement for "If dealer's score > 17, STOP".

Dealer must keep hitting if score is under 17 regardless if Dealer busts.

If the player chooses Hold, no more cards will be dealt to the player and the dealer's turn will ensue. The dealer will continue to take cards until the dealer score reaches a minimum of 17.

<img src="https://imgur.com/V97yJia">

If player chooses Hit, a random card from the deck will come out of the deck and add to the player's score.

<img src="https://imgur.com/fFdVEtV>">
    
If player's score is under 21, player can choose Hit or Hold again
another if statement.

If dealer flips second card and does not reach 21 before hitting 17 or surpasses 21, then the dealer loses.

    
I created a while loop to keep the dealer hitting until it hits 17 or more.

If dealer hits 21 as well, it results in a "push" (or tie) and no one wins or loses.

Reset button will enable once the round is over.
<img src="https://imgur.com/QQwYWxq">

Click here to play Blackjack!

Next Steps:

I plan to update this game with several ideas. I'd like to give players the option to choose the value of their Ace between 1 or 11. I'd like to give the cards animation flips. I'd also like to turn the dealer's facedown card back over so the player can see the face.