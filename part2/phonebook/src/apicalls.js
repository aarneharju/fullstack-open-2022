import axios from 'axios';

const databaseUrl = 'http://localhost:3001/persons';
const serverConnectionErrorMessage = 'Connection to server failed: ';

const getAllPersons = () =>
    axios.get(databaseUrl)
        .then(response => response.data)
        .catch(error => alert(`Unable to fetch notes, ${serverConnectionErrorMessage}: ${error}`));

const addPerson = note =>
    axios.post(databaseUrl, note)
        .then(response => response.data)
        .catch(error => alert(`Unable to add note, ${serverConnectionErrorMessage}: ${error}`));

const deletePerson = personID =>
    axios.delete(databaseUrl, personID)
        .then(response => response.data)
        .catch(error => alert(`Unable to delete person, ${serverConnectionErrorMessage}: ${error}`));

export default { getAllPersons, addPerson, deletePerson };