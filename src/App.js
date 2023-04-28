import { useEffect, useState } from 'react';
import './App.css';
import { initGame, dealHands, determineWinner } from './utils/game'
import { Hand } from './components/hands.js'
import { SelectDiscard } from './components/selectDiscard';
function App() {
    const [gameState, setGameState] = useState(initGame)
    const [currentPlayer, setCurrentPlayer] = useState(0)
    const [winner, setWinner] = useState('')
    console.log(gameState)

    return <>
        <button onClick={() => {
            setGameState({ ...dealHands(gameState) })
        }}>Deal game</button>
        {<ul>{gameState.playerHands.map((hand, idx) => <ul className='hand'>Player {idx}<Hand hand={hand}></Hand></ul>)}</ul>}

        {currentPlayer !== null ? <div className='currentHand'>
            Current Player
            <SelectDiscard
                hand={gameState.playerHands[currentPlayer]}
                gameState={gameState}
                setGameState={setGameState}
                currentPlayer={currentPlayer}
                setCurrentPlayer={setCurrentPlayer} />
        </div> : <button onClick={() => setWinner(determineWinner(gameState))}>Determine Winner</button>}

        {winner && <div>{winner}</div>}
    </>
}

export default App;
