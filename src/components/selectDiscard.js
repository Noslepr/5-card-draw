import { useEffect, useState } from "react"
import {discard, players, draw} from '../utils/game.js'
import './hand.css'

export function SelectDiscard({ hand, gameState, setGameState, currentPlayer, setCurrentPlayer}) {
    const [discardsIndexes, setDiscardsIndexes] = useState([])

    function toggleDiscard(idx) {
        console.log(idx)
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

        let newState = {deck: gameState.deck, playerHands: gameState.playerHands.map((hand, idx) => currentPlayer === idx ? newHand : hand)}

        setGameState(newState)
        if (currentPlayer < players - 1) setCurrentPlayer(currentPlayer + 1)
        else setCurrentPlayer(null)
        setDiscardsIndexes([])
    }
    useEffect(() => {
        console.log(gameState.deck)
    }, [discardsIndexes])

    return <>
        {hand.map((card, idx) => <li onClick={e => toggleDiscard(idx)} className={discardsIndexes.includes(idx) ? 'card highlight' : 'card'}>{card.display}</li>)}
        <button onClick={submitDiscard}>Discard and Draw</button>
    </>
}
