import './App.css';
import { useState } from 'react';

const Person = (props) => {
  return <li>{props.person.name} {props.person.number}</li>;
};

const App = () => {
  // Setup states
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [newSearch, setNewSearch] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const personsArray = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase())).map(person => <Person key={person.id} person={person} />);

  // Handler functions
  const handleSearch = (event) => {
    setNewSearch(event.target.value);
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.every(person => person.name !== newName)) {
      setPersons(persons.concat({ id: persons.length + 1, name: newName, number: newNumber }));
      setNewName('');
      setNewNumber('');
    } else {
      alert(`${newName} is already in the phone book`);
    }
  };

  // Render
  return (
    <div>
      <h1>Phonebook</h1>
      <form>
        <label for='search'>Search name:</label>
        <input type='text' value={newSearch} id='search' onChange={handleSearch} />
      </form>
      <form>
        <div>
          Name: <input type='text' value={newName} onChange={handleNewName} />
        </div>
        <div>
          Number: <input type='text' value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsArray}
      </ul>
      <div>debug: {persons[0].name}</div>
      <div>debug: {newName}</div>
      <div>debug: {newSearch}</div>
    </div>
  )
}

export default App