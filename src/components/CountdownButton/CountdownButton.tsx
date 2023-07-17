import React, { useRef, useState } from "react"
import style from "./CountdownButton.module.css"
import countdownAudio from "../../assets/countdown.wav"

type CountdownButtonProps = {
  startTimer: () => void
}

const CountdownButton = ({ startTimer }: CountdownButtonProps) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [buttonText, setButtonText] = useState("Go time")
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
        setIsCounting(false)
        setPlayBounce(true)
        clearInterval(interval)
      }
    }, 550)
  }

  const handleClick = () => {
    if (isCounting) return
    startTimer()
    setIsCounting(true)
    countdownButtonText()
    audioRef.current!.play()
  }

  return (
    <div
      className={`${style.countdownButton} ${playBounce ? style.bounce : ""}`}
      onClick={handleClick}
      onAnimationEnd={() => setPlayBounce(false)}
    >
      <span className={style.buttonText}>{buttonText}</span>
      <audio ref={audioRef} src={countdownAudio} />
    </div>
  )
}

export default React.memo(CountdownButton)
