const royalFlush = [{ suit: '♠', rank: 10, display: '🂪' },{ suit: '♠', rank: 11, display: '🂫' },{ suit: '♠', rank: 12, display: '🂭' },{ suit: '♠', rank: 13, display: '🂮' },{ suit: '♠', rank: 14, display: '🂡' }]
const straightFlush = [{ suit: '♡', rank: 5, display: '🂵' },{ suit: '♡', rank: 6, display: '🂶' },{ suit: '♡', rank: 7, display: '🂷' },{ suit: '♡', rank: 8, display: '🂸' },{ suit: '♡', rank: 9, display: '🂹' }]
const fourOfKind = [{ suit: '♠', rank: 6, display: '🂦' },{ suit: '♡', rank: 6, display: '🂶' },{ suit: '♢', rank: 6, display: '🃆' },{ suit: '♣', rank: 6, display: '🃖' },{ suit: '♡', rank: 14, display: '🂱' }]
const fullHouse = [{ suit: '♠', rank: 6, display: '🂦' },{ suit: '♡', rank: 6, display: '🂶' },{ suit: '♢', rank: 6, display: '🃆' }, { suit: '♠', rank: 2, display: '🂢' }, { suit: '♡', rank: 2, display: '🂲' }]
const flush = [{ suit: '♠', rank: 2, display: '🂢' }, { suit: '♠', rank: 3, display: '🂣' }, { suit: '♠', rank: 4, display: '🂤' }, { suit: '♠', rank: 11, display: '🂫' }, { suit: '♠', rank: 13, display: '🂮' }]
const straight = [{ suit: '♠', rank: 4, display: '🂤' }, { suit: '♡', rank: 5, display: '🂵' }, { suit: '♠', rank: 6, display: '🂦' }, { suit: '♢', rank: 7, display: '🃇' }, { suit: '♣', rank: 8, display: '🃘' }]
const threeOfKind = [{ suit: '♠', rank: 6, display: '🂦' },{ suit: '♡', rank: 6, display: '🂶' },{ suit: '♢', rank: 6, display: '🃆' }, { suit: '♠', rank: 2, display: '🂢' }, { suit: '♢', rank: 8, display: '🃈' }]
const twoPair = [{ suit: '♣', rank: 10, display: '🃚' },{ suit: '♠', rank: 10, display: '🂪' },{ suit: '♠', rank: 8, display: '🂨' },{ suit: '♢', rank: 8, display: '🃈' }, { suit: '♢', rank: 4, display: '🃄' }]
const onePair = [{ suit: '♠', rank: 8, display: '🂨' },{ suit: '♢', rank: 8, display: '🃈' },{ suit: '♡', rank: 10, display: '🂺' },{ suit: '♡', rank: 11, display: '🂻' },{ suit: '♢', rank: 4, display: '🃄' }]
const highCard = [{ suit: '♡', rank: 10, display: '🂺' },{ suit: '♡', rank: 11, display: '🂻' },{ suit: '♢', rank: 4, display: '🃄' },{ suit: '♣', rank: 14, display: '🃑' },{ suit: '♠', rank: 12, display: '🂭' }]

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
    'Royal Flush': (hand) => {
        if (isStraight(hand) && isFlush(hand) && getHighRankOfStraight(hand) === 14) return []
    },
    'Straight Flush': (hand) => {
        if (isStraight(hand) && isFlush(hand)) return [getHighRankOfStraight(hand)]
    },
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
        let eval = evalFunctions[handName](hand)
        console.log(eval)
        if (eval) {
            return [handName, [i + 1].concat(eval)]
        }
    }
}
console.log(getMadeHandAndRank(straightFlush))

// console.log(getMatchesPattern(groupMatches([{ suit: '♠', rank: 10, display: '🂪' }, { suit: '♠', rank: 10, display: '🂢' }, { suit: '♡', rank: 2, display: '🂲' }, { suit: '♠', rank: 3, display: '🂣' },
// { suit: '♡', rank: 3, display: '🂳' }])))
/*
[
  { suit: '♠', rank: 2, display: '🂢' },
  { suit: '♠', rank: 3, display: '🂣' },
  { suit: '♠', rank: 4, display: '🂤' },
  { suit: '♠', rank: 5, display: '🂥' },
  { suit: '♠', rank: 6, display: '🂦' },
  { suit: '♠', rank: 7, display: '🂧' },
  { suit: '♠', rank: 8, display: '🂨' },
  { suit: '♠', rank: 9, display: '🂩' },
  { suit: '♠', rank: 10, display: '🂪' },
  { suit: '♠', rank: 11, display: '🂫' },
  { suit: '♠', rank: 12, display: '🂭' },
  { suit: '♠', rank: 13, display: '🂮' },
  { suit: '♠', rank: 14, display: '🂡' },
  { suit: '♡', rank: 2, display: '🂲' },
  { suit: '♡', rank: 3, display: '🂳' },
  { suit: '♡', rank: 4, display: '🂴' },
  { suit: '♡', rank: 5, display: '🂵' },
  { suit: '♡', rank: 6, display: '🂶' },
  { suit: '♡', rank: 7, display: '🂷' },
  { suit: '♡', rank: 8, display: '🂸' },
  { suit: '♡', rank: 9, display: '🂹' },
  { suit: '♡', rank: 10, display: '🂺' },
  { suit: '♡', rank: 11, display: '🂻' },
  { suit: '♡', rank: 12, display: '🂽' },
  { suit: '♡', rank: 13, display: '🂾' },
  { suit: '♡', rank: 14, display: '🂱' },
  { suit: '♢', rank: 2, display: '🃂' },
  { suit: '♢', rank: 3, display: '🃃' },
  { suit: '♢', rank: 4, display: '🃄' },
  { suit: '♢', rank: 5, display: '🃅' },
  { suit: '♢', rank: 6, display: '🃆' },
  { suit: '♢', rank: 7, display: '🃇' },
  { suit: '♢', rank: 8, display: '🃈' },
  { suit: '♢', rank: 9, display: '🃉' },
  { suit: '♢', rank: 10, display: '🃊' },
  { suit: '♢', rank: 11, display: '🃋' },
  { suit: '♢', rank: 12, display: '🃍' },
  { suit: '♢', rank: 13, display: '🃎' },
  { suit: '♢', rank: 14, display: '🃁' },
  { suit: '♣', rank: 2, display: '🃒' },
  { suit: '♣', rank: 3, display: '🃓' },
  { suit: '♣', rank: 4, display: '🃔' },
  { suit: '♣', rank: 5, display: '🃕' },
  { suit: '♣', rank: 6, display: '🃖' },
  { suit: '♣', rank: 7, display: '🃗' },
  { suit: '♣', rank: 8, display: '🃘' },
  { suit: '♣', rank: 9, display: '🃙' },
  { suit: '♣', rank: 10, display: '🃚' },
  { suit: '♣', rank: 11, display: '🃛' },
  { suit: '♣', rank: 12, display: '🃝' },
  { suit: '♣', rank: 13, display: '🃞' },
  { suit: '♣', rank: 14, display: '🃑' }
]
*/
