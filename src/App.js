import { useState } from 'react';
import { initGame, dealHands, determineWinner } from './utils/game'
import { getMadeHandAndRank, handRanks } from './utils/resolve.js'
import { Hand } from './components/hands.js'
import './App.css';

function App() {
    const [gameState, setGameState] = useState(dealHands(initGame()))
    const [currentPlayer, setCurrentPlayer] = useState(0)
    const [winner, setWinner] = useState(null)

    function getHandName(hand) {
        const name = getMadeHandAndRank(hand)
        return name[name.length - 1]
    }

    return <>
        <div id='header'>
            <button onClick={() => {
                setGameState(dealHands(initGame()))
                setCurrentPlayer(0)
                setWinner(null)
            }}>Deal New Game</button>

            {winner && <div id='winner'>{winner.length === 1 ?
                `Winner is player ${winner[0]} with ${handRanks[getMadeHandAndRank(gameState.playerHands[winner[0]])[0]]}` :
                `Tie between players ${winner.join(', ')} with ${handRanks[getMadeHandAndRank(gameState.playerHands[winner[0]])[0]]}`}
            </div>}
        </div>
        {<ul>{gameState.playerHands.map(
            (hand, idx) => <ul key={idx}className='hand'>Player {idx}
                <Hand
                    idx={idx}
                    hand={hand}
                    gameState={gameState}
                    setGameState={setGameState}
                    currentPlayer={currentPlayer}
                    setCurrentPlayer={setCurrentPlayer}
                    winner={winner}
                    >
                </Hand>
                {winner && <div>{getHandName(hand)}</div>}</ul>)}</ul>}

        {currentPlayer === null && <button id='determineWinner' onClick={() => setWinner(determineWinner(gameState))}>Determine Winner</button>}

    </>
}

export default App;
