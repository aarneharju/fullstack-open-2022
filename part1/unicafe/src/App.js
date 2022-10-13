import './App.css';
import { useState } from 'react';

// Create components
const Statistics = (props) => {
  return (
    <ul>
      <li>Good: {props.good}</li>
      <li>Neutral: {props.neutral}</li>
      <li>Bad: {props.bad}</li>
      <li>All: {props.all}</li>
      <li>Average: {props.average}</li>
      <li>Positive: {props.positive}%</li>
    </ul>
  )
}

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
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App;