
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
    if (hand.every(card => card.suit === suit)) {
        hand.sort((a, b) => b.rank - a.rank)
        return [hand[0].rank]
    }
}

const isStraight = (hand) => {
    hand.sort((a, b) => b.rank - a.rank)

    return hand.every((card, idx) => idx === 0 || (card.rank + 1 === hand[idx - 1].rank))
}

const getHighCard = (straight) => {
    straight.sort((a, b) => b - a)
    return straight[0].rank
}

const groupMatches = (hand) => {
    let matches = {}
    for (let card of hand) {
        matches[card.rank] ? matches[card.rank].push(card) : matches[card.rank] = [card]
    }
    return Object.values(matches)
}

const getMatchesPattern = (hand, pattern) => {
    let matches = groupMatches(hand)
    matches.sort((a, b) => {
        if (b.length === a.length) return b[0].rank - a[0].rank
        else return b.length - a.length
    })
    if (!(matches.every((match, idx) => match.length === pattern[idx]))) {
        return false
    }
    return matches.map((match) => match[0].rank)
}

const evalFunctions = {
    'Royal Flush': (hand) => isStraight(hand) && isFlush(hand) && getHighCard(hand) === 14 ? [] : false,
    'Straight Flush': (hand) => isStraight(hand) && isFlush(hand) ? [getHighCard(hand)] : false,
    'Four of a Kind': (hand) => getMatchesPattern(hand, [4, 1]),
    'Full House': (hand) => getMatchesPattern(hand, [3, 2]),
    'Flush': (hand) => isFlush(hand),
    'Straight': (hand) => isStraight(hand) ? [getHighCard(hand)] : false,
    'Three of a Kind': (hand) => getMatchesPattern(hand, [3, 1, 1]),
    'Two Pair': (hand) => getMatchesPattern(hand, [2, 2, 1]),
    'One Pair': (hand) => getMatchesPattern(hand, [2, 1, 1, 1]),
    'High Card': (hand) => getMatchesPattern(hand, [1, 1, 1, 1, 1]),
}

export const getMadeHandAndRank = (hand) => {
    for (let i = handRanks.length - 1; i >= 0; i--) {
        let handName = handRanks[i]
        let result = evalFunctions[handName](hand)
        if (result) {
            return [handName, [i + 1].concat(result)]
        }
    }
}
