import './App.css';
import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ];

  // Set states
  const [anecdoteVotes, setAnecdoteVotes] = useState(new Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0);

  // Find the index of the most voted anedote
  let anecdoteIndexWithTheMostVotes = anecdoteVotes.reduce((mostVotedIndexSoFar, currentlyTestedValue, currentlyTestedIndex, array) => currentlyTestedValue > array[mostVotedIndexSoFar] ? currentlyTestedIndex : mostVotedIndexSoFar, 0);

  // Event handlers
  const handleClick = () => {
    const randomlySelectedAnecdote = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomlySelectedAnecdote);
  };

  const handleVotes = () => {
    const anecdoteVotesDuplicate = [...anecdoteVotes];
    anecdoteVotesDuplicate[selected] += 1;
    setAnecdoteVotes(anecdoteVotesDuplicate);
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Votes: {anecdoteVotes[selected]}</p>
      <button onClick={handleVotes}>Vote</button>
      <button onClick={handleClick}>Next anecdote</button>
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[anecdoteIndexWithTheMostVotes]} ({anecdoteVotes[anecdoteIndexWithTheMostVotes]} vote{anecdoteVotes[anecdoteIndexWithTheMostVotes] !== 1 ? 's' : ''})</p>
    </div>
  )
}

export default App