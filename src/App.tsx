import { useState } from "react"
import CountdownButton from "./components/CountdownButton/CountdownButton"
import FocusTime from "./components/FocusTime/FocusTime"
import "./App.css"

function App() {
  const [time, setTime] = useState({ minutes: 0, seconds: 59 })
  const [timerActive, setTimerActive] = useState(false)
  console.log("time", time)
  const startTimer = () => {
    setTimerActive(true)
    const interval = setInterval(() => {
      setTime((timeLeft) => {
        const newTime = { ...timeLeft }
        if (timeLeft.seconds === 0 && timeLeft.minutes === 0) {
          setTimerActive(false)
          clearInterval(interval)
          return timeLeft
        }
        if (timeLeft.seconds === 0) {
          newTime.seconds = 59
          newTime.minutes--
          return newTime
        }
        newTime.seconds--
        return newTime
      })
    }, 1000)
  }

  return (
    <>
      <FocusTime time={time} setTime={setTime} timerActive={timerActive}/>
      <CountdownButton startTimer={startTimer} />
    </>
  )
}

export default App
