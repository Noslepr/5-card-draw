import { useState } from 'react';
import { initGame, dealHands, determineWinner } from './utils/game'
import { getMadeHandAndRank, handRanks } from './utils/resolve.mjs'
import { Hand } from './components/hands.js'
import './App.css';

function App() {
    const [gameState, setGameState] = useState(dealHands(initGame()))
    const [currentPlayer, setCurrentPlayer] = useState(0)
    const [winner, setWinner] = useState(null)
    console.log(gameState)

    return <>
        <button onClick={() => {
            setGameState({ ...dealHands(initGame()) })
            setCurrentPlayer(0)
            setWinner(null)
        }}>Deal New Game</button>
        {<ul>{gameState.playerHands.map(
            (hand, idx) => <ul className='hand'>Player {idx}
                <Hand
                    idx={idx}
                    hand={hand}
                    gameState={gameState}
                    setGameState={setGameState}
                    currentPlayer={currentPlayer}
                    setCurrentPlayer={setCurrentPlayer}>
                </Hand></ul>)}</ul>}

        {!currentPlayer && <button onClick={() => setWinner(determineWinner(gameState))}>Determine Winner</button>}

        {winner && <div>{winner.length === 1 ?
            `Winner is player ${winner[0]} with ${handRanks[getMadeHandAndRank(gameState.playerHands[winner[0]])[0]]}` :
            `Tie between players ${winner.join(', ')} with ${handRanks[getMadeHandAndRank(gameState.playerHands[winner[0]])[0]]}`}
        </div>}
    </>
}

export default App;
