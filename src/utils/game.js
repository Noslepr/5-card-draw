import * as resolve from './resolve.js'
export const suits = { 'A': '\u2660', 'B': '\u2661', 'C': '\u2662', 'D': '\u2663' }
export const players = 4
const handSize = 5

// initialize game with a full deck and number of players
export const initGame = () => {
    const deck = []
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
export const rankToHex = rank => {
    const hex = rank === 14 ? 1 : rank >= 12 ? (rank + 1).toString(16) : rank.toString(16)
    return hex
}

const deckSplice = (deck) => {
    const idx = Math.floor(Math.random() * deck.length)
    return deck.splice(idx, 1)[0]
}

// takes in a hand and draws up to max hand size
export const draw = (hand, deck) => {
    if (hand.length === handSize) {
        return hand.map(card =>  card ? card : deckSplice(deck))
    }
    let cardsToDraw = handSize - hand.length

    while (cardsToDraw > 0) {
        // draw card from deck with randomized index and remove from deck
        const newCardIdx = Math.floor(Math.random() * deck.length)

        hand.push(deck.splice(newCardIdx, 1)[0])

        cardsToDraw--
    }
    return hand
}

// AI discard
export const aiDiscard = (hand, deck) => {
    const discardedHand = hand.map(card => card.rank > 8 ? card : null)
    return draw(discardedHand, deck)
}

// deal 5 card hands into state
export const dealHands = (stateOfGame) => {
    for (let hand of stateOfGame.playerHands) {
        draw(hand, stateOfGame.deck)
    }
    return stateOfGame
}

// takes in a hand and array of indexes of cards to discard, returns remaining hand
export const discard = (hand, discardIndexes) => {
    // const remainingHand = hand.filter((card, idx) => !discardIndexes.includes(idx))
    return hand.map((card, idx) => discardIndexes.includes(idx) ? null : card)
    // return remainingHand
}

//  checks hand ranks and places player indexes into rank buckets
export const resolveRankBuckets = (stateOfGame) => {
    // madeHands resolves player hands into hand rank and kicker ranks and sorts them
    const madeHands = stateOfGame.playerHands.map((hand, idx) => [resolve.getMadeHandAndRank(hand), idx])
        .sort(sortHandRanks)

    // finalRankBuckets pushes player indexes into buckets where finalRankBuckets[0] is the winner or players that tie for the win
    const finalRankBuckets = [[]]
    const last = finalRankBuckets.length - 1
    madeHands.forEach((hand, idx) => idx === 0 ? finalRankBuckets[last].push(hand[1]) : isRankSame(hand[0], madeHands[idx - 1][0]) ? finalRankBuckets[last].push(hand[1]) : finalRankBuckets.push([hand[1]]))

    return finalRankBuckets
}

// returns winner or winners
export const determineWinner = (stateOfGame) => {
    const finalRankBuckets = resolveRankBuckets(stateOfGame)

    return finalRankBuckets[0]
}

// checks if hand rank is the same, including kickers
const isRankSame = (rank1, rank2) => {
    return rank1.every((ele, idx) => ele === rank2[idx])
}

// sorts hand ranks
const sortHandRanks = ((hand1, hand2) => {
    let i = 0
    while (hand1[0][i] === hand2[0][i] && i < hand1[0].length) {
        i++
    }
    return hand2[0][i] - hand1[0][i]
})
