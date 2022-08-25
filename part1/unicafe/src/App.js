import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => {
  if (text === "positive") {
    return (<tr>
      <td>{text}</td>
      <td>{value} %</td>
    </tr>)
  }
  return (<tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>)
}
const Statistics = ({ good, bad, neutral }) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all

  if (all === 0) return (
    <>
      <p>No feedback given</p>
    </>
  )
  return (
    <table>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setCount = (stateCount, stateSetter) => () => {
    stateSetter(stateCount + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={setCount(good, setGood)} text='good' />
      <Button onClick={setCount(neutral, setNeutral)} text='neutral' />
      <Button onClick={setCount(bad, setBad)} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;
