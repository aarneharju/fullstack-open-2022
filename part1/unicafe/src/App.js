import './App.css';
import { useState } from 'react';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  let all = good + neutral + bad;

  // divider can't be zero
  let average = all != 0 ? (good - bad) / all : 0;
  let positive = all != 0 ? good / all : 0;

  const handleGoodClick = () => {
    setGood(good + 1);
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  }
  const handleBadClick = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={handleGoodClick} >Good</button>
      <button onClick={handleNeutralClick} >Neutral</button>
      <button onClick={handleBadClick} >Bad</button>
      <h1>Statistics</h1>
      <ul>
        <li>Good: {good}</li>
        <li>Neutral: {neutral}</li>
        <li>Bad: {bad}</li>
        <li>All: {all}</li>
        <li>Average: {average}</li>
        <li>Positive: {positive}%</li>
      </ul>
    </div>
  )
}

export default App;