//Versio 1.5 (valmis)
const Header = (props) => {
    console.log(props)
    return (<h1>{props.courses}</h1>)
}

const Part = (props) => {
    return (
        <p>{props.part.name } {props.part.exercises}</p>
        )
}

const Content = (props) => {
    console.log('Content', props)
    return (
        <div>
            <Part part={props.parts[0]} />
            <Part part={props.parts[1]} />
            <Part part={props.parts[2]} />
        </div>
        )
}

const Total = (props) => {
    console.log('Total', props)
    let x = 0;
    return (
        <div>
            <p>
                Number of exercises { }
                {props.parts.reduce((x, part) => {
                    console.log(part.exercises)
                    return part.exercises + x
                }, x)}
            </p>
        </div>
        )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header courses={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default App