// const suits = ['\u2660', '\u2661', '\u2662', '\u2663']
import * as resolve from './resolve.mjs'
export const suits = { 'A': '\u2660', 'B': '\u2661', 'C': '\u2662', 'D': '\u2663' }
export const players = 4
const handSize = 5

// initialize game with a full deck and number of players
export const initGame = () => {
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
export const rankToHex = rank => {
    let hex = rank === 14 ? 1 : rank >= 12 ? (rank + 1).toString(16) : rank.toString(16)
    return hex
}


// takes in a hand and draws up to max hand size
export const draw = (hand, deck) => {
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

export const dealHands = (stateOfGame) => {
    for (let hand of stateOfGame.playerHands) {
        draw(hand, stateOfGame.deck)
    }
    return stateOfGame
}

export const discard = (hand, discardIndexes) => {
    let remainingHand = hand.filter((card, idx) => !discardIndexes.includes(idx))
    return remainingHand
}

export const resolveRankBuckets = (stateOfGame) => {
    let madeHands = stateOfGame.playerHands.map((hand, idx) => [resolve.getMadeHandAndRank(hand), idx])
        .sort(sortHandRanks)

    let finalRankBuckets = [[]]
    let last = finalRankBuckets.length - 1
    madeHands.forEach((hand, idx) => idx === 0 ? finalRankBuckets[last].push(hand[1]) : isRankSame(hand[0], madeHands[idx - 1][0]) ? finalRankBuckets[last].push(hand[1]) : finalRankBuckets.push([hand[1]]))

    return finalRankBuckets
}

export const determineWinner = (stateOfGame) => {
    let finalRankBuckets = resolveRankBuckets(stateOfGame)

    return finalRankBuckets[0].length === 1 ? `Winner Player ${finalRankBuckets[0][0]}` : `Tie between Players ${finalRankBuckets[0].join(', ')}`
}
const isRankSame = (rank1, rank2) => {
    return rank1.every((ele, idx) => ele === rank2[idx])
}

const sortHandRanks = ((hand1, hand2) => {
    let i = 0
    while (hand1[0][i] === hand2[0][i] && i < hand1[0].length) {
        i++
    }
    return hand2[0][i] - hand1[0][i]
})
// let state = initGame()
// console.log(state.deck)
// dealHands(state)
// for (let hand of state.playerHands) {
//     // console.log(hand)
//     hand = discard(hand, [1, 3])
//     draw(hand, state.deck)
// }
// determineWinner(state)
// // console.log(state, state.playerHands[0], state.deck.length)
