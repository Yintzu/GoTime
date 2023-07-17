import React from "react"
import style from "./FocusTime.module.css"

const FocusTime = () => {
  return (
    <div>
      <span className={style.title}>Focus Time</span>
    </div>
  )
}

export default React.memo(FocusTime)
