import './App.css';
import { useState } from 'react';

const Person = (props) => {
  return <li>{props.person.name}</li>;
};

const App = () => {
  // Setup states
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('');
  const [newNameInputText, setNewNameInputText] = useState('');

  const numbersArray = persons.map(person => <Person key={person.name} person={person} />);

  // Handler functions
  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPersons(persons.concat({ name: newName }));
    setNewName('');
  };

  // Render
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input type='text' value={newName} onChange={handleNewName} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {numbersArray}
      </ul>
      {/* <div>debug: {persons[0].name}</div>
      <div>debug: {newName}</div> */}
    </div>
  )
}

export default App