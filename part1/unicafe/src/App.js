import './App.css';
import { useState } from 'react';

// Create components
const Statistics = (props) => {
  if (props.all !== 0) {
    return (
      <table>
        <tbody>
          <StatisticsLine text='Good' value={props.good} />
          <StatisticsLine text='Neutral' value={props.neutral} />
          <StatisticsLine text='Bad' value={props.bad} />
          <StatisticsLine text='All' value={props.all} />
          <StatisticsLine text='Average' value={props.average} />
          <StatisticsLine text='Positive' value={props.positive} />
        </tbody>
      </table>
    );
  } else {
    return <p>No feedback given.</p>
  }

}

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
}

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  let all = good + neutral + bad;

  // divider can't be zero
  let average = all !== 0 ? (good - bad) / all : 0;
  let positive = all !== 0 ? good / all : 0;

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
      <Button onClick={handleGoodClick} text='Good' />
      <Button onClick={handleNeutralClick} text='Neutral' />
      <Button onClick={handleBadClick} text='Bad' />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  );
}

export default App;