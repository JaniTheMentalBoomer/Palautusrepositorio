const Header = ({ Cname }) => <h1>{Cname}</h1>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>


const Content = ({ parts }) => {
    console.log('Content', parts)
    return (
        <div>
            {parts.map(part => (<Part key={part.id} part={part} />))}
        </div>
    )
}

const Total = ({ parts }) => {
    console.log('Total', parts)
    const total = parts.reduce((sum, nextItem) => sum + nextItem.exercises, 0);
    return (
        <div>
            <p>total of {total} exercises</p>
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header Cname={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Courses = ({ courses }) => (
    <>
        <Header Cname="Web development curriculum" />
        <div>
            {courses.map(course => (<Course key={course.id} course={course} />))}
        </div>
    </>
)

export default Courses