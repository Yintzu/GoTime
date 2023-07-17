import React from "react"
import style from "./TimePicker.module.css"
import "./WheelStyles.css"
import Wheel from "./Wheel"

type TimePickerProps = {
  time: { minutes: number; seconds: number }
  setTime: React.Dispatch<
    React.SetStateAction<{ minutes: number; seconds: number }>
  >
  timerActive: boolean
}
const TimePicker = ({ time, setTime, timerActive }: TimePickerProps) => {
  return (
    <div className={style.timePicker}>
      <div style={{ width: 100, height: 180 }}>
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
      <div style={{ width: 100, height: 180 }}>
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
  )
}

export default React.memo(TimePicker)
