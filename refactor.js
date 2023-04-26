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
            deck.push({ suit: suits[suit], rank, card: String.fromCodePoint(parseInt(`1F0${suit}` + hex, 16)) })
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


let state = initGame()
dealHands(state)
for (let hand of state.playerHands) {
    console.log(hand)
    hand = discard(hand, [1, 3])
    draw(hand, state.deck)
}
console.log(state, state.playerHands[0], state.deck.length)
