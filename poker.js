let deck = []
const suits = ['\u2660', '\u2661', '\u2662', '\u2663']
const faceCards = { 11: 'J', 12: 'Q', 13: 'K', 14: 'A' }
const handRanks = {
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

let card = { rank:10, suit: '\u2661' }
card.toString = function(){return this.rank + this.suit}
console.log(card.toString())

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

// resolves hand and outputs array where array[0] is the made hand
// and array[1] is a list of tie break ranks
// example 1: ['2♠', '2♡', '2♢', '2♣', '14♣'] would return [ 'Four of a Kind', [ 2 ] ]
// example 2:
function resolveHand(hand) {
    let ranks = {}
    let suits = {}
    for (let card of hand) {
        const suit = card.split('').pop()
        const rank = card.slice(0, card.length - 1)
        ranks[rank] ? ranks[rank] += 1 : ranks[rank] = 1
        suits[suit] ? suits[suit] += 1 : suits[suit] = 1
    }
    console.log(ranks, suits)

    let isFlush, isStraight

    const cardRanks = Object.keys(ranks).map((num) => Number(num))
    const cardSuits = Object.keys(suits)
    const numberOfEachRank = Object.values(ranks)

    // check if quads or full house
    if (cardRanks.length === 2) {
        if (Math.max(...numberOfEachRank) === 4) {
            // if quads, rank by quad value
            const quadRank = ranks[cardRanks[0]] === 4 ? cardRanks[0] : cardRanks[1]
            return ['Four of a Kind', [quadRank]]
        }
        else {
            // is full house, rank by trips value
            const tripRank = ranks[cardRanks[0]] === 3 ? cardRanks[0] : cardRanks[1]
            return ['Full House', [tripRank]]
        }
    }

    // check if Flush
    if (cardSuits.length === 1) {
        isFlush = true
    }

    // check if Straight
    if (cardRanks.length === 5 && (Math.max(...cardRanks) - Math.min(...cardRanks) === 4)) {
        isStraight = true
    }

    // check if Staight Flush or Royal Flush
    if (isFlush && isStraight) {
        if (Math.max(...cardRanks) === 14) {
            return ['Royal Flush']
        }
        else {
            const straightFlushRank = Math.max(...cardRanks)
            return ['Straight Flush', [straightFlushRank]]
        }
    }

    if (isFlush) {
        const flushRanks = cardRanks.sort((a, b) => b - a)
        return ['Flush', flushRanks]
    }
    if (isStraight) {
        const straightRank = Math.max(...cardRanks)
        return ['Straight', straightRank]
    }

    // check if trips or two pair
    if (cardRanks.length === 3) {
        if (Math.max(...numberOfEachRank) === 3) {
            let tripRank
            for (let cardRank of cardRanks) {
                if (ranks[cardRank] === 3) tripRank = cardRank
            }
            return ['Three of a Kind', [tripRank]]
        }
        else {
            let pairRanks = []
            let kicker
            for (let cardRank of cardRanks) {
                if (ranks[cardRank] === 2) {
                    if (cardRank > pairRanks[0]) pairRanks.unshift(cardRank)
                    else pairRanks.push(cardRank)
                } else kicker = cardRank
            }
            pairRanks.push(kicker)
            return ['Two Pair', pairRanks]
        }
    }

    // check if pair
    if (cardRanks.length === 4) {
        let pairRank
        let kickers = []
        for (let cardRank of cardRanks) {
            if (ranks[cardRank] === 2) pairRank = cardRank
            else kickers.push(cardRank)
        }
        kickers.sort((a, b) => b - a)
        kickers.unshift(pairRank)
        return ['One Pair', kickers]
    }

    if (cardRanks.length === 5) {
        return ['High Card', cardRanks.sort((a, b) => b - a)]
    }
}

// test cases:
const royalFlush = ['10♣', '11♣', '12♣', '13♣', '14♣']
const straightFlush = ['2♠', '3♠', '4♠', '5♠', '6♠']
const fourOfKind = ['2♠', '2♡', '2♢', '2♣', '14♣']
const fullHouse = ['2♠', '2♡', '2♢', '9♣', '9♢'] // ['2♠', '2♡', '9♠', '9♣', '9♢']
const flush = ['2♠', '3♠', '4♠', '5♠', '11♠']
const straight = ['3♠', '4♠', '5♠', '6♠', '7♢']
const threeOfKind = [ '9♣', '9♢', '9♠', '11♡', '12♡']
const twoPair = ['9♣', '9♢', '10♢', '10♠', '13♢']
const onePair = ['10♢', '10♠', '4♠', '5♠', '11♢']
const highCard = [ '4♢', '10♢', '2♣', '5♠', '8♡' ]


// console.log('full deck:', deck, deck.length)
// let hands = dealHands()
// console.log('starting hands:', hands)
// console.log('deck after hands delt:', deck, deck.length)
// for (let i = 0; i < hands.length; i++) {
//     hands[i] = discard(hands[i], [1, 3])
// }
// console.log('hands after discard:', hands)
// console.log(deck)
// for (let hand of hands) {
//     draw(hand)
// }
// console.log('hands after draw:', hands)
// console.log('deck after draw', deck, deck.length)
// // for (let hand of hands) {
// //     resolveHand(hand)
// // }
// for (let hand of hands) {
//     resolveHand(hand)
// }
// resolveHand(fullHouse)
console.log(resolveHand(threeOfKind))
