import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"

import Main from "~features/main"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  return <Main />
}

export default PlasmoOverlay
