import './hand.css'
// import { groupMatches } from '../utils/resolve.mjs'

export function Hand({hand}) {
    // console.log('in hands:', gameState)
    return <>
    {hand.map(card => <li className='card'>{card.display}</li>)}
    </>
}
