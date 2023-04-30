import * as game from './game.js'
import * as resolve from './resolve.js'

const createCard = (rank, suit) => {
    let hex = game.rankToHex(rank)
    return {suit: refactor.suits[suit], rank, display: String.fromCodePoint(parseInt(`1F0${suit}` + hex, 16))}

}

function evaluate() {
    // let allCases = Object.values(testCases)
    const expectations = [[ 'Royal Flush', [ 10 ] ],
    [ 'Straight Flush', [ 9, 9 ] ],
    [ 'Four of a Kind', [ 8, 6, 14 ] ],
    [ 'Full House', [ 7, 6, 2 ] ],
    [ 'Flush', [ 6, 13 ] ],
    [ 'Straight', [ 5, 8 ] ],
    [ 'Three of a Kind', [ 4, 6, 8, 2 ] ],
    [ 'Two Pair', [ 3, 10, 8, 4 ] ],
    [ 'One Pair', [ 2, 8, 11, 10, 7 ] ],
    [ 'High Card', [ 1, 14, 12, 11, 10, 4 ] ]]
    let allCases = Object.values(testCases)
    for (let i = 0; i < allCases.length; i++) {
        let result = resolve.getMadeHandAndRank(allCases[i])
        console.log(result)
        console.log(JSON.stringify(result) === JSON.stringify(expectations[i]))
    }
}
const testCases = {
    royalFlush: [{ suit: '♠', rank: 10, display: '🂪' }, { suit: '♠', rank: 11, display: '🂫' }, { suit: '♠', rank: 14, display: '🂡' }, { suit: '♠', rank: 12, display: '🂭' }, { suit: '♠', rank: 13, display: '🂮' }],
    straightFlush: [{ suit: '♡', rank: 6, display: '🂶' }, { suit: '♡', rank: 7, display: '🂷' }, { suit: '♡', rank: 5, display: '🂵' }, { suit: '♡', rank: 9, display: '🂹' }, { suit: '♡', rank: 8, display: '🂸' }],
    fourOfKind: [{ suit: '♠', rank: 6, display: '🂦' }, { suit: '♡', rank: 14, display: '🂱' }, { suit: '♡', rank: 6, display: '🂶' }, { suit: '♢', rank: 6, display: '🃆' }, { suit: '♣', rank: 6, display: '🃖' }],
    fullHouse: [{ suit: '♠', rank: 2, display: '🂢' }, { suit: '♠', rank: 6, display: '🂦' }, { suit: '♡', rank: 2, display: '🂲' }, { suit: '♡', rank: 6, display: '🂶' }, { suit: '♢', rank: 6, display: '🃆' }],
    flush: [{ suit: '♠', rank: 2, display: '🂢' }, { suit: '♠', rank: 11, display: '🂫' }, { suit: '♠', rank: 13, display: '🂮' }, { suit: '♠', rank: 3, display: '🂣' }, { suit: '♠', rank: 4, display: '🂤' }],
    straight: [{ suit: '♠', rank: 6, display: '🂦' }, { suit: '♢', rank: 7, display: '🃇' }, { suit: '♠', rank: 4, display: '🂤' }, { suit: '♣', rank: 8, display: '🃘' }, { suit: '♡', rank: 5, display: '🂵' }],
    threeOfKind: [{ suit: '♠', rank: 2, display: '🂢' }, { suit: '♠', rank: 6, display: '🂦' }, { suit: '♢', rank: 8, display: '🃈' }, { suit: '♡', rank: 6, display: '🂶' }, { suit: '♢', rank: 6, display: '🃆' }],
    twoPair: [{ suit: '♢', rank: 8, display: '🃈' }, { suit: '♢', rank: 4, display: '🃄' }, { suit: '♣', rank: 10, display: '🃚' }, { suit: '♠', rank: 8, display: '🂨' }, { suit: '♠', rank: 10, display: '🂪' }],
    onePair: [ { suit: '♡', rank: 11, display: '🂻' }, { suit: '♠', rank: 8, display: '🂨' }, { suit: '♢', rank: 7, display: '🃄' }, { suit: '♢', rank: 8, display: '🃈' }, { suit: '♡', rank: 10, display: '🂺' }],
    highCard: [{ suit: '♡', rank: 10, display: '🂺' }, { suit: '♡', rank: 11, display: '🂻' }, { suit: '♢', rank: 4, display: '🃄' }, { suit: '♣', rank: 14, display: '🃑' }, { suit: '♠', rank: 12, display: '🂭' }]
}
const determineWinnerTestCases = [
    [testCases.fullHouse, testCases.straight, testCases.fourOfKind, testCases.onePair],
    [testCases.twoPair, testCases.twoPair.map((card, idx) => idx === 1 ? createCard(14, 'A') : card), testCases.onePair, testCases.highCard],
    [testCases.highCard, testCases.twoPair, testCases.onePair, testCases.twoPair],
    [testCases.highCard, testCases.highCard, testCases.highCard, testCases.highCard]
]

const expectedResultsWinnerTestCases = [
    [[2], [0], [1], [3]],
    [[1], [0], [2], [3]],
    [[1, 3], [2], [0]],
    [[0, 1, 2, 3]]
]
const evaluateWinners = (tests, expectedResults) => {
    for (let i = 0; i < tests.length; i++) {
        let results = game.resolveRankBuckets({playerHands: tests[i]})
        console.log(results, JSON.stringify(results) === JSON.stringify(expectedResults[i]))
        console.log(game.determineWinner(results))
    }
}
evaluateWinners(determineWinnerTestCases, expectedResultsWinnerTestCases)
