import { useState } from "react"
import { discard, players, draw, aiDiscard} from '../utils/game.js'
import './hand.css'

export function Hand({ idx, hand, gameState, setGameState, currentPlayer, setCurrentPlayer, winner }) {
    const [discardsIndexes, setDiscardsIndexes] = useState([])

    function toggleDiscard(idx) {
        if (discardsIndexes.includes(idx)) {
            discardsIndexes.splice(discardsIndexes.indexOf(idx), 1)
            setDiscardsIndexes([...discardsIndexes])
        } else {
            setDiscardsIndexes([...discardsIndexes, idx])
        }
    }

    function submitDiscard() {
        let remainingHand = discard(hand, discardsIndexes)
        let newHand = draw(remainingHand, gameState.deck)

        let newState = { deck: gameState.deck, playerHands: gameState.playerHands.map((hand, idx) => currentPlayer === idx ? newHand : aiDiscard(hand, gameState.deck)) }

        setGameState(newState)
        // if (currentPlayer < players - 1) setCurrentPlayer(currentPlayer + 1)
        // else setCurrentPlayer(null)
        setCurrentPlayer(null)
        setDiscardsIndexes([])
    }


    return <>
        {idx === 0 || winner ? <>
            {hand.map((card, idx) => <li key={card.rank + card.suit}
                onClick={e => toggleDiscard(idx)}
                className={classCombiner('card clickable', isRed(card.suit) && 'red', discardsIndexes.includes(idx) && 'selected')}>
                {card.display}
            </li>)}
            {idx === currentPlayer ? <button onClick={submitDiscard}>Discard and Draw</button> : <></> }
        </>
            : hand.map(card => <>
                <li key={card.rank + card.suit} className={classCombiner('card')}>{String.fromCodePoint(parseInt('1F0A0', 16))}</li>

            </>)}
    </>
}

function isRed(suit) {
    return suit === '\u2661' || suit === '\u2662'
}

function classCombiner(...classes) {
    return classes.filter(str => typeof str === 'string').join(' ')
}
