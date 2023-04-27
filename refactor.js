// const suits = ['\u2660', '\u2661', '\u2662', '\u2663']
const suits = { 'A': '\u2660', 'B': '\u2661', 'C': '\u2662', 'D': '\u2663' }
const handSize = 5
const players = 4

// initialize game with a full deck and number of players
const initGame = () => {
    let deck = []
    for (let suit in suits) {
        for (let rank = 2; rank <= 14; rank++) {
            let hex = rankToHex(rank)
            deck.push({ suit: suits[suit], rank, display: String.fromCodePoint(parseInt(`1F0${suit}` + hex, 16)) })
        }
    }

    const stateOfGame = {
        deck,
        playerHands: new Array(players).fill(null).map(() => [])
    }
    return stateOfGame
}

// rankToHex() used to determine the hex value of each card rank for unicode conversion,
// but had to account for the French deck Knight card aswell as changing 14 rank Ace to unicode 1
const rankToHex = rank => {
    let hex = rank === 14 ? 1 : rank >= 12 ? (rank + 1).toString(16) : rank.toString(16)
    return hex
}


// takes in a hand and draws up to max hand size
const draw = (hand, deck) => {
    let cardsToDraw = handSize - hand.length

    while (cardsToDraw > 0) {
        // draw card from deck with randomized index and remove from deck
        let newCardIdx = Math.floor(Math.random() * deck.length)
        // console.log(deck.splice(newCardIdx, 1))
        hand.push(deck.splice(newCardIdx, 1)[0])

        cardsToDraw--
    }
    return hand
}

const dealHands = (stateOfGame) => {
    for (let hand of stateOfGame.playerHands) {
        draw(hand, stateOfGame.deck)
    }
    return stateOfGame
}

const discard = (hand, discardIndexes) => {
    let remainingHand = hand.filter((card, idx) => !discardIndexes.includes(idx))
    return remainingHand
}

const determineWinner = (stateOfGame) => {
    let hands = stateOfGame.playerHands

    
}

// other file
const handRanks = [
    'High Card',
    'One Pair',
    'Two Pair',
    'Three of a Kind',
    'Straight',
    'Flush',
    'Full House',
    'Four of a Kind',
    'Straight Flush',
    'Royal Flush',
]

const isFlush = (hand) => {
    let suit = hand[0].suit
    return hand.every(card => card.suit === suit)
}

const isStraight = (hand) => {
    hand.sort((a, b) => b.rank - a.rank)

    return hand[0].rank - hand[hand.length - 1].rank === 4
}

const getHighRankOfStraight = (straight) => {
    straight.sort((a, b) => b - a)
    return straight[0].rank
}

const groupMatches = (hand) => {
    let matches = {}
    for (let card of hand) {
        matches[card.rank] ? matches[card.rank].push(card) : matches[card.rank] = [card]
    }
    return matches
}

const getMatchesPattern = (hand, pattern) => {
    let matches = groupMatches(hand)
    let handPattern = []
    for (let val in matches) {
        handPattern.push(matches[val].length)
    }
    handPattern.sort((a, b) => b - a)

    return handPattern.every((num, idx) => num === pattern[idx])
}

const evalFunctions = {
    'Royal Flush': (hand) => isStraight(hand) && isFlush(hand) && getHighRankOfStraight(hand) === 14,
    'Straight Flush': (hand) => isStraight(hand) && isFlush(hand),
    'Four of a Kind': (hand) => getMatchesPattern(hand, [4, 1]),
    'Full House': (hand) => getMatchesPattern(hand, [3, 2]),
    'Flush': (hand) => isFlush(hand),
    'Straight': (hand) => isStraight(hand),
    'Three of a Kind': (hand) => getMatchesPattern(hand, [3, 1, 1]),
    'Two Pair': (hand) => getMatchesPattern(hand, [2, 2, 1]),
    'One Pair': (hand) => getMatchesPattern(hand, [2, 1, 1, 1]),
    'High Card': (hand) => getMatchesPattern(hand, [1, 1, 1, 1, 1]),
}

const getMadeHandAndRank = (hand) => {
    for (let i = handRanks.length - 1; i >= 0; i--) {
        let handName = handRanks[i]
        if (evalFunctions[handName](hand)) {
            return [handName, i + 1]
        }
    }
}
let state = initGame()
console.log(state.deck)
dealHands(state)
for (let hand of state.playerHands) {
    // console.log(hand)
    hand = discard(hand, [1, 3])
    draw(hand, state.deck)
}
// console.log(state, state.playerHands[0], state.deck.length)
