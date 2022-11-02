// NOTE: run json-server before starting: npx json-server --port 3001 --watch db.json

import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Components
const Search = (props) => {
  return (
    <form>
      <label htmlFor='search'>Search name:</label>
      <input type='text' value={props.newSearch} id='search' onChange={props.onChange} />
    </form>
  );
};

const AddPersonForm = (props) => {
  const { newName, handleNewName, newNumber, handleNewNumber, handleSubmit } = props;
  return (
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
  );
};

const Numbers = (props) => {
  return (
    <ul>
      {props.personsArray}
    </ul>
  );
};

const Person = (props) => {
  return <li>{props.person.name} {props.person.number}</li>;
};

const App = () => {
  // Setup states
  const [persons, setPersons] = useState([]);

  const [newSearch, setNewSearch] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const databaseUrl = 'http://localhost:3001/persons';
  const serverConnectionErrorMessage = 'Connection to server failed: ';
  const personsArray = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase())).map(person => <Person key={person.id} person={person} />);

  // Effect hooks

  // Get data from json-server
  useEffect(() => {
    const promise = axios.get(databaseUrl);

    promise
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => alert(serverConnectionErrorMessage + error));

  }, [])

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

      const newNumberObject = { name: newName, number: newNumber };
      axios.post(databaseUrl, newNumberObject)
        .then(response => {
          console.log(response.data);
          setPersons(persons.concat({ id: persons.length + 1, name: newName, number: newNumber }));
          setNewName('');
          setNewNumber('');
          return
        })
        .catch(error => alert(`Unable to add new number, ${serverConnectionErrorMessage}: ${error}`));

    } else {
      alert(`${newName} is already in the phone book`);
    }
  };

  // Render
  return (
    <div>
      <h1>Phonebook</h1>
      <Search newSearch={newSearch} onChange={handleSearch} />
      <h2>Add new number</h2>
      <AddPersonForm newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} handleSubmit={handleSubmit} />

      <h2>Numbers</h2>
      <Numbers personsArray={personsArray} />
      {/* <div>debug: {persons[0].name}</div>
      <div>debug: {newName}</div>
      <div>debug: {newSearch}</div> */}
    </div>
  )
}

export default App