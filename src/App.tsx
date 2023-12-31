import { useRef, useState } from "react"
import CountdownButton from "./components/CountdownButton/CountdownButton"
import TimePicker from "./components/TimePicker/TimePicker"
import "./App.css"
import background from "./assets/background.png"

function App() {
  const [time, setTime] = useState({ minutes: 0, seconds: 59 })
  const [timerActive, setTimerActive] = useState(false)
  const timerInterval = useRef<NodeJS.Timer>()
  console.log("time", time)
  const startTimer = () => {
    setTimerActive(true)
    timerInterval.current = setInterval(() => {
      setTime((timeLeft) => {
        const newTime = { ...timeLeft }
        if (timeLeft.seconds === 0 && timeLeft.minutes === 0) {
          setTimerActive(false)
          clearInterval(timerInterval.current)
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

  const stopTimer = () => {
    setTimerActive(false)
    clearInterval(timerInterval.current)
  }

  return (
    <div className="app" style={{ backgroundImage: `url(${background})` }}>
      <h1 className="title">Go time</h1>
      <TimePicker time={time} setTime={setTime} timerActive={timerActive} />
      <CountdownButton
        startTimer={startTimer}
        stopTimer={stopTimer}
        timerActive={timerActive}
      />
    </div>
  )
}

export default App
