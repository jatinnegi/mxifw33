import { useEffect, useState } from "react"

import { AIIcon } from "./ai-icon"
import { Modal } from "./modal"

export default function Main() {
  const [displayIcon, setDisplayIcon] = useState<boolean>(false)
  const [coordinates, setCoordinates] = useState<CoordinateProps>({
    x: 0,
    y: 0
  })

  const [displayPopup, setDisplayPopup] = useState<boolean>(false)
  const [reply, setReply] = useState<string>("")

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const element = e.target as HTMLElement

      if (element.classList.contains("msg-form__contenteditable")) {
        const { bottom, right } = element.getBoundingClientRect()
        setCoordinates({ x: right - 35, y: bottom - 35 })
        setDisplayIcon(true)
      } else {
        setDisplayIcon(false)
      }
    }

    document.addEventListener("click", onClick)

    return () => {
      document.removeEventListener("click", onClick)
    }
  }, [coordinates, displayIcon])

  const handleInsert = () => {
    const pTag = document.querySelector(
      ".msg-form__contenteditable p"
    ) as HTMLParagraphElement
    const placeholder = document.querySelector(
      ".msg-form__placeholder"
    ) as HTMLDivElement

    if (pTag && placeholder) {
      pTag.innerText = reply
      placeholder.style.display = "none"
    }

    setDisplayPopup(false)
  }

  return (
    <>
      <AIIcon
        display={displayIcon}
        coordinates={coordinates}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation()
          setReply("")
          setDisplayPopup(true)
        }}
      />
      <Modal
        display={displayPopup}
        hideModal={() => {
          setDisplayPopup(false)
        }}
        reply={reply}
        handleInsert={handleInsert}
        handleGenerate={() => {
          setReply(
            "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
          )
        }}
      />
    </>
  )
}
