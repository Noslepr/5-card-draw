import { useEffect, useState } from "react"
import {discard, players} from '../utils/game.js'
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

        let newState = {deck: gameState.deck, playerHands: gameState.playerHands.map((hand, idx) => currentPlayer - 1 === idx ? remainingHand : hand)}

        setGameState(newState)
        if (currentPlayer < players) setCurrentPlayer(currentPlayer + 1)
        else setCurrentPlayer(0)
        setDiscardsIndexes([])
    }
    useEffect(() => {
        console.log(discardsIndexes)
    }, [discardsIndexes])

    return <>
        {hand.map((card, idx) => <li onClick={e => toggleDiscard(idx)} className={discardsIndexes.includes(idx) ? 'card highlight' : 'card'}>{card.display}</li>)}
        <button onClick={submitDiscard}>Discard</button>
    </>
}
