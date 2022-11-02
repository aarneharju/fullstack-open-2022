import axios from 'axios';

const databaseUrl = 'http://localhost:3001/persons';
const serverConnectionErrorMessage = 'Connection to server failed: ';

const getAllNotes = () =>
    axios.get(databaseUrl)
        .then(result => result.data)
        .catch(error => alert(`Unable to fetch notes, ${serverConnectionErrorMessage}: ${error}`));

const addNote = note => axios.post(databaseUrl, note)
    .then(response => response.data)
    .catch(error => alert(`Unable to add note, ${serverConnectionErrorMessage}: ${error}`));

export default { getAllNotes, addNote };