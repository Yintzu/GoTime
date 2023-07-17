import React, { useEffect, useRef, useState } from "react"
import {
  KeenSliderOptions,
  TrackDetails,
  useKeenSlider,
} from "keen-slider/react"

export default function Wheel(props: {
  initIdx?: number
  label?: string
  length: number
  loop?: boolean
  perspective?: "left" | "right" | "center"
  setValue?: (relative: number, absolute: number) => string
  width: number
  showColon?: boolean
  time: { minutes: number; seconds: number }
  unit: "minutes" | "seconds"
  setTime: React.Dispatch<
    React.SetStateAction<{ minutes: number; seconds: number }>
  >
  timerActive?: boolean
}) {
  const perspective = props.perspective || "center"
  const wheelSize = 10
  const slides = props.length
  const slideDegree = 360 / wheelSize
  const slidesPerView = props.loop ? 9 : 1
  const [sliderState, setSliderState] = React.useState<TrackDetails | null>(
    null
  )
  const size = useRef(0)
  const options: KeenSliderOptions = {
    slides: {
      number: slides,
      origin: props.loop ? "center" : "auto",
      perView: slidesPerView,
    },

    vertical: true,

    initial: props.initIdx || 0,
    loop: props.loop,
    dragSpeed: (val) => {
      const height = size.current
      return (
        val *
        (height /
          ((height / 2) * Math.tan(slideDegree * (Math.PI / 180))) /
          slidesPerView)
      )
    },
    created: (s) => {
      size.current = s.size
    },
    updated: (s) => {
      size.current = s.size
    },
    detailsChanged: (s) => {
      setSliderState(s.track.details)
    },
    rubberband: !props.loop,
    mode: "free-snap",
    disabled: props.timerActive,
  }
  console.log("render")
  console.log('options', options)
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(options)

  const [radius, setRadius] = useState(0)

  useEffect(() => {
    if (props.timerActive) {
      const moveToIdx = props.time[props.unit]
      slider.current?.moveToIdx(Number(moveToIdx))
    }
  }, [props.time, props.timerActive])

  useEffect(() => {
    console.log("sliderState", sliderState)
    if (!props.timerActive) {
      props.setTime((prev) => {
        const newTime = { ...prev, [props.unit]: sliderState?.abs }
        return newTime
      })
    }
  }, [sliderState])

  useEffect(() => {
    if (slider.current) setRadius(slider.current.size / 2)
  }, [slider])

  function slideValues() {
    if (!sliderState) return []
    const offset = props.loop ? 1 / 2 - 1 / slidesPerView / 2 : 0

    const values = []
    for (let i = 0; i < slides; i++) {
      const distance = sliderState
        ? (sliderState.slides[i].distance - offset) * slidesPerView
        : 0
      const rotate =
        Math.abs(distance) > wheelSize / 2
          ? 180
          : distance * (360 / wheelSize) * -1
      const style = {
        transform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
        WebkitTransform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
      }
      const value = props.setValue
        ? props.setValue(i, sliderState.abs + Math.round(distance))
        : i
      values.push({ style, value })
    }
    return values
  }

  return (
    <div
      className={"wheel keen-slider wheel--perspective-" + perspective}
      ref={sliderRef}
    >
      <div
        className="wheel__shadow-top"
        style={{
          transform: `translateZ(${radius}px)`,
          WebkitTransform: `translateZ(${radius}px)`,
        }}
      />
      <div className="wheel__inner">
        <div className="wheel__slides" style={{ width: props.width + "px" }}>
          {slideValues().map(({ style, value }, idx) => (
            <div className="wheel__slide" style={style} key={idx}>
              <span>{value}</span>
            </div>
          ))}
        </div>
        {props.label && (
          <div
            className="wheel__label"
            style={{
              transform: `translateZ(${radius}px)`,
              WebkitTransform: `translateZ(${radius}px)`,
            }}
          >
            {props.label}
          </div>
        )}
        {props.showColon && <span className="wheel__colon">:</span>}
      </div>
      <div
        className="wheel__shadow-bottom"
        style={{
          transform: `translateZ(${radius}px)`,
          WebkitTransform: `translateZ(${radius}px)`,
        }}
      />
    </div>
  )
}
