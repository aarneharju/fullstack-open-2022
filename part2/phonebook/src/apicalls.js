import axios from 'axios';

const databaseUrl = 'http://localhost:3001/persons';
const serverConnectionErrorMessage = 'Connection to server failed: ';

const getAllPersons = () =>
    axios.get(databaseUrl)
        .then(response => response.data)
        .catch(error => alert(`Unable to fetch notes, ${serverConnectionErrorMessage}: ${error}`));

const addPerson = person =>
    axios.post(databaseUrl, person)
        .then(response => response.data)
        .catch(error => alert(`Unable to add person, ${serverConnectionErrorMessage}: ${error}`));

const deletePerson = personID => {
    console.log(personID);
    console.log(`${databaseUrl}/${personID}`);
    return axios.delete(`${databaseUrl}/${personID}`)
        .then(response => response.data)
        .catch(error => alert(`Unable to delete person, ${serverConnectionErrorMessage}: ${error}`));
}
export default { getAllPersons, addPerson, deletePerson };