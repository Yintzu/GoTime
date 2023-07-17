import React from "react"
import style from "./FocusTime.module.css"
import "./TimePickerStyles.css"
import Wheel from "./Wheel"

type FocusTimeProps = {
  time: { minutes: number; seconds: number }
  setTime: React.Dispatch<
    React.SetStateAction<{ minutes: number; seconds: number }>
  >
  timerActive: boolean
}
const FocusTime = ({ time, setTime, timerActive }: FocusTimeProps) => {
  return (
    <div className={style.focusTime}>
      <span className={style.title}>Focus Time</span>
      <div className={style.timePicker}>
        <div style={{ width: 70, height: 180 }}>
          <Wheel
            initIdx={1}
            length={60}
            width={23}
            loop={true}
            showColon
            time={time}
            unit="minutes"
            setTime={setTime}
            timerActive={timerActive}
          />
        </div>
        <div style={{ width: 70, height: 180 }}>
          <Wheel
            initIdx={35}
            length={60}
            width={23}
            loop={true}
            time={time}
            unit="seconds"
            setTime={setTime}
            timerActive={timerActive}
          />
        </div>
      </div>
    </div>
  )
}

export default React.memo(FocusTime)
