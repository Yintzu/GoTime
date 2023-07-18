import React, { useRef, useState } from "react"
import style from "./CountdownButton.module.css"
import countdownAudio from "../../assets/countdown.wav"

type CountdownButtonProps = {
  startTimer: () => void
  stopTimer: () => void
  timerActive: boolean
}

const CountdownButton = ({
  startTimer,
  stopTimer,
  timerActive,
}: CountdownButtonProps) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [buttonText, setButtonText] = useState("Start")
  const [playBounce, setPlayBounce] = useState(false)
  const [isCounting, setIsCounting] = useState(false)

  const countdownButtonText = () => {
    const strings = ["3", "2", "1", "Go!"]
    setButtonText(strings[0])
    let index = 1
    const interval = setInterval(() => {
      setButtonText(strings[index])
      index++
      if (index === strings.length) {
        startTimer()
        setPlayBounce(true)
        clearInterval(interval)
      }
    }, 550)
  }

  const handleClick = () => {
    if (isCounting) return
    console.log("fire")
    if (timerActive){
      stopTimer()
      setButtonText("Start")
      return
    }
    setIsCounting(true)
    countdownButtonText()
    audioRef.current!.play()
  }

  const onBounceEnd = () => {
    setIsCounting(false)
    setPlayBounce(false)
    setButtonText("Stop")
  }

  return (
    <div
      className={`${style.countdownButton} ${playBounce ? style.bounce : ""}`}
      onClick={handleClick}
      onAnimationEnd={onBounceEnd}
    >
      <span className={style.buttonText}>{buttonText}</span>
      <audio ref={audioRef} src={countdownAudio} />
    </div>
  )
}

export default React.memo(CountdownButton)
