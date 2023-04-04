//Versio 1.14
import { useState } from 'react'

const Title = ({ text }) => (<h1>{text}</h1>)

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const randomNum = (size) => {
    let x = -1
    x = Math.floor(Math.random() * (size.length -1));
    return x
}


const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
        'The only way to go fast, is to go well.'
    ]

    let [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(new Uint8Array(anecdotes.length))
    const copy = [...points]

    const selectNum = () => {
        setSelected(selected = 0)
        setSelected(selected + randomNum(anecdotes))
        
    }

    const increaseVote = () => {
        copy[selected] += 1  
        setPoints(copy)
    }

    //Haetaan taulukon indeksi, jolla on eniten ääniä
    const winnerNumber = copy.indexOf(Math.max(...points))

    console.log('value of selected is:', selected)
    return (
        <div>
            <Title text={anecdotes[selected]} />
            <h3>has {copy[selected]} votes</h3>
            <Button handleClick={selectNum} text="Next anecdote" />
            <Button handleClick={increaseVote} text="Vote" />
            <Title text={'Anecdote with most votes: '} />
            <h3>{anecdotes[winnerNumber]}</h3>
        </div>
    )
}

export default App
