<h1>Blackjack</h1>

As a software engineering fellow with General Assembly, our first project was to create a working game application. I've always enjoyed playing Blackjack, so I knew this game would be the most fun for me to code and customize myself. Blackjack is a card game where the dealer and player each try to score higher than the other. The highest score to reach is 21, but if either the dealer or player surpass 21 points, they will "bust" and automatically. Should the dealer or player reach exactly 21 points, they will have won "Blackjack" and can only be tied at that point.

Javascript, HTML, and CSS were used in the creating of this game.

<h1>Game Play</h1>

User opens Blackjack application

![Imgur](https://i.imgur.com/d58I6sZ.jpg)

User presses "PLAY" to begin game.

![Imgur](https://i.imgur.com/Z24Jv55.jpg)

The deck is shuffled and the player and dealer are dealt two cards.

The player's hand will have 2 cards that are face up, and the dealer's hand will have one card face up and one card face down. The player will be shown their score while the dealer's score is hidden.

![Imgur](https://i.imgur.com/LWordG9.jpg)

The player may either HIT to receive another card, or HOLD to stay with only their two current cards and allow the dealer to take its turn.

If the player chooses Hold, no more cards will be dealt to the player and the dealer's turn will ensue. The dealer will continue to take cards until the dealer score reaches a minimum of 17.

There is an implicit assumption that the dealer will HOLD if Dealer's score is 17 or higher. 

Dealer must keep hitting if score is under 17 regardless if Dealer busts.

![Imgur](https://i.imgur.com/9LBvlxn.jpg)

If player chooses Hit, a random card from the deck will come out of the deck and add to the player's score.

![Imgur](https://i.imgur.com/UQFENQ8.png)
    
If the player's score is under 21, player can choose Hit or Hold again
another if statement.

If the player reaches 21, then the player will have effectively reached the highest scoring possible, aka Blackjack. If in the same game, the dealer flips their second card and does not reach 21 before hitting 17 or surpasses 21, then the dealer loses.

If the dealer hits 21 as well, it results in a "push" (or tie) and no one wins or loses.

![Imgur](https://i.imgur.com/87aYQhn.png)

If the player does not surpass 21 and does not reach 21, and the dealer has a higher score than the player without surpassing 21 points, then the dealer wins.

![Imgur](https://i.imgur.com/QQwYWxq.jpg)

The reset button will be enabled once the round is over to set up a new game, and the new game can be started with the "PLAY" button.

![Imgur](https://i.imgur.com/oK5JyYf.jpg)

Click <a href="https://cblake003.github.io/Blackjack/">here</a> to play Blackjack:  

<h1>Next Steps:</h1>

I plan to update this game with several ideas. I'd like to give players the option to choose the value of their Ace between 1 or 11.  I'll give the cards animation flips and include a shuffle deck animation when the game starts. I will also be adding a bet option so the user can start with a certain amount of money and play until their bet runs out.