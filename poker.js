let deck = []
let suits = ['\u2660', '\u2661', '\u2662', '\u2663'] // 4 suits
let faceCards = { 11: 'J', 12: 'Q', 13: 'K', 14: 'A' }
let handRanks = {
    'High Card': 1,
    'One Pair': 2,
    'Two Pair': 3,
    'Three of a Kind': 4,
    'Straight': 5,
    'Flush': 6,
    'Full House': 7,
    'Four of a Kind': 8,
    'Straight Flush': 9,
    'Royal Flush': 10
}

// creating deck of cards
for (let suit of suits) {
    for (let i = 2; i <= 14; i++) {
        deck.push(i + suit)
    }
}
// draw 5 card hands for 4 players
function dealHands() {
    let hands = []
    // 4 players
    for (let player = 1; player <= 4; player++) {
        let hand = []
        draw(hand)
        hands.push(hand)
    }
    return hands
}

// discard function takes in a hand and the indexes of the cards to discard
function discard(hand, discardIndexes) {
    let remainingHand = []
    for (let i = 0; i < hand.length; i++) {
        if (!discardIndexes.includes(i)) {
            remainingHand.push(hand[i])
        }
    }
    return remainingHand
}

// draw function draws cards until player had a full hand of 5 cards again
function draw(hand) {
    let cardsToDraw = 5 - hand.length
    while (cardsToDraw > 0) {
        // draw card from deck with randomized index
        let newCardIdx = Math.floor(Math.random() * deck.length)
        hand.push(deck[newCardIdx])

        // remove card from deck
        deck = deck.slice(0, newCardIdx).concat(deck.slice(newCardIdx + 1))

        cardsToDraw--
    }
}


function resolveHand(hand) {
    let values = {}
    let suits = {}
    for (let card of hand) {
        let suit = card.split('').pop()
        let value = card.slice(0, card.length - 1)

        values[value] ? values[value] += 1 : values[value] = 1
        suits[suit] ? suits[suit] += 1 : suits[suit] = 1
    }
    console.log(values, suits)
}

console.log('full deck:', deck, deck.length)
let hands = dealHands()
console.log('starting hands:', hands)
console.log('deck after hands delt:', deck, deck.length)
for (let i = 0; i < hands.length; i++) {
    hands[i] = discard(hands[i], [1, 3])
}
console.log('hands after discard:', hands)
// console.log(deck)
for (let hand of hands) {
    draw(hand)
}
console.log('hands after draw:', hands)
console.log('deck after draw', deck, deck.length)
// for (let hand of hands) {
//     resolveHand(hand)
// }
for (let hand of hands) {
    resolveHand(hand)
}
