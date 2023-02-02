//Versio 1.11 unicafe
import { useState } from 'react'

const Title = ({ text }) => (<h1>{text}</h1>)

const StatisticLine = ({ text, value }) => (<tr><td>{text} {value}</td></tr>)

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const calculateAVG = ( g, b, all) => {
    let result = 0
    result = (g - b) / all
    return result
}

const calculatePOS = (g, all) => {
    let result = 0
    result = (g / all) * 100
    return result + '%'
}

const Statistics = ({g, n, b, all, avg, pos }) => {
    if (all === 0) {
        return (
            <div>
                No Feedback given!
            </div>
        )
    }
    return ( 
        <div>
            <table>
                <tbody>
                    <StatisticLine text="Good: " value={g} />
                    <StatisticLine text="Neutral: " value={n} />
                    <StatisticLine text="Bad: " value={b} />
                    <StatisticLine text="All: " value={all} />
                    <StatisticLine text="Average: " value={avg} />
                    <StatisticLine text="Positive: " value={pos} />
                </tbody>
            </table>
        </div>
    )
}


const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [allClicks, setAll] = useState(0)

    const increaseGood = () => {
        console.log('increase Good', good)
        setGood(good + 1)
        setAll(allClicks + 1)
    }

    const increaseNeutral = () => {
        console.log('increase Neutral', neutral)
        setNeutral(neutral + 1)
        setAll(allClicks + 1)
    }

    const increaseBad = () => {
        console.log('increase Bad', bad)
        setBad(bad + 1)
        setAll(allClicks + 1)
    }

    const avg = calculateAVG(good, bad, allClicks)
    const pos = calculatePOS(good, allClicks)

    

    return (
        <div>
            <Title text='Unicafe - Give feedback' />
            <Button handleClick={increaseGood} text='Good' />
            <Button handleClick={increaseNeutral} text='Neutral' />
            <Button handleClick={increaseBad} text='Bad' />
            <Title text='Statistics'/>
            <Statistics g={good} n={neutral} b={bad} all={allClicks} avg={avg} pos={pos}/>
        </div> 
    )
}

export default App
