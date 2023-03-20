//Versio 2.10 (2.9 skipped)
import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const Filter = ({}) => {
    return (
        <form>
            <div>filter shown with <input /></div>
        </form>)
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    //const [search, setSearch] = useState('') 

    //useEffect-hookin avulla haetaan JSON-serveriltä persons data
    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, [])
    console.log('render', persons.length, 'persons')

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }

        if (persons.find(person => person.name === newName)) {
            alert(`${newName} is already added to phonebook`)
        }
        else {
            setPersons(persons.concat(personObject))
            setNewName('')
            setNewNumber('')
        }
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <Filter />
            <PersonForm addP={addPerson} newName={newName} hNameC={handleNameChange}
            newNum={newNumber} hNumC={handleNumberChange}/>
            <h2>Numbers</h2>
            <ul>
                <Persons persons={persons} /> 
            </ul>
        </div>
    )

}

export default App