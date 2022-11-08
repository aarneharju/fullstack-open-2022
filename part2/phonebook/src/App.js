// NOTE: run json-server before starting: npx json-server --port 3001 --watch db.json

import './App.css';
import { useState, useEffect } from 'react';
import apiCalls from './apiCalls';
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
  return <li>{props.person.name} {props.person.number} <Button onClick={props.deletePerson} personToDelete={props.person.id} text='Delete' /></li>;
};

const Button = (props) => {
  return (
    <button onClick={() => props.onClick(props.personToDelete)} >{props.text}</button>
  )
}

const App = () => {
  // Setup states
  const [persons, setPersons] = useState([]);

  const [newSearch, setNewSearch] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  // Functions
  const deletePerson = (id) => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      apiCalls.deletePerson(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
        .catch(error => alert('Unable to delete person: ', error));
      return 'Person deleted.'
    } else return;
  }

  const personsArray = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase())).map(person => <Person key={person.id} person={person} deletePerson={deletePerson} />);

  // Effect hooks

  // Get data from json-server
  useEffect(() => {
    apiCalls.getAllPersons()
      .then(data => setPersons(data));
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

      apiCalls.addPerson(newNumberObject)
        .then(data => {
          setPersons(persons.concat({ id: data.id, name: data.name, number: data.number }));
          setNewName('');
          setNewNumber('');
          return 'Person added.';
        });

    } else {
      if (window.confirm(`${newName} is already in the phonebook, would you like to replace the old number with the new one?`)) {
        const personToUpdate = persons.find(person => person.name === newName)
        apiCalls.updatePerson(personToUpdate.id, { name: newName, number: newNumber, id: personToUpdate.id })
          .then(data => setPersons(persons.map(person => person.id !== personToUpdate.id ? person : data)));
      } else return;
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