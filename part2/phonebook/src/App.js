// NOTE: run json-server before starting: npx json-server --port 3001 --watch db.json

import './App.css';
import { useState, useEffect } from 'react';
import apiCalls from './apiCalls';
import axios from 'axios';
import Notification from './Notification';

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
  const [notificationMessageObject, setNotificationMessageObject] = useState(null);

  const [newSearch, setNewSearch] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const serverConnectionErrorMessage = 'Connection to server failed: ';

  // Functions
  const deletePerson = (id) => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      apiCalls.deletePerson(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
        .catch(error => alert(`Unable to delete person, ${serverConnectionErrorMessage}: ${error}`));
      return 'Person deleted.'
    } else return;
  }

  const personsArray = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase())).map(person => <Person key={person.id} person={person} deletePerson={deletePerson} />); // deletePerson -function needs to be defined before this

  // Effect hooks

  // Get data from json-server
  useEffect(() => {
    apiCalls.getAllPersons()
      .then(data => setPersons(data))
      .catch(error => alert(`Unable to fetch notes, ${serverConnectionErrorMessage}: ${error}`));
  }, [])

  // Event handler functions
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
          const message = `${data.name} added to phonebook.`;
          const type = 'success';

          setPersons(persons.concat({ id: data.id, name: data.name, number: data.number }));
          setNewName('');
          setNewNumber('');

          setNotificationMessageObject({ message, type });
          setTimeout(() => {
            setNotificationMessageObject(null);
          }, 5000);
          return 'Person added.';
        })
        .catch(error => alert(`Unable to add person, ${serverConnectionErrorMessage}: ${error}`));

    } else {
      if (window.confirm(`${newName} is already in the phonebook, would you like to replace the old number with the new one?`)) {
        const personToUpdate = persons.find(person => person.name === newName)
        apiCalls.updatePerson(personToUpdate.id, { name: newName, number: newNumber, id: personToUpdate.id })
          .then(data => {
            const message = `${data.name}'s number was updated.`;
            const type = 'success';

            setPersons(persons.map(person => person.id !== personToUpdate.id ? person : data));
            // setNewName('');
            // setNewNumber('');

            setNotificationMessageObject({ message, type });
            setTimeout(() => {
              setNotificationMessageObject(null);
            }, 5000);
          })
          .catch(error => alert(`Unable to update person, ${serverConnectionErrorMessage}: ${error}`));
      } else return;
    }
  };



  // Render
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification messageObject={notificationMessageObject} />
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