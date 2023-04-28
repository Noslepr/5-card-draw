import { useEffect, useState } from 'react';
import './App.css';
import * as game from './utils/game'
import { Hand } from './components/hands.js'
import { SelectDiscard } from './components/selectDiscard';
function App() {
    const [gameState, setGameState] = useState(game.initGame)
    const [currentPlayer, setCurrentPlayer] = useState(1)
    console.log(gameState)

    return <>
        <button onClick={() => {
            setGameState({ ...game.dealHands(gameState) })
        }}>Deal game</button>
        {<ul>{gameState.playerHands.map((hand, idx) => <ul className='hand'>Player {idx + 1}<Hand hand={hand}></Hand></ul>)}</ul>}

        { currentPlayer ? <div className='currentHand'>
            Current Player
            <SelectDiscard
            hand={gameState.playerHands[currentPlayer - 1]}
            gameState={gameState}
            setGameState={setGameState}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}/>
        </div> : <button>Draw</button>}
    </>
}

export default App;
