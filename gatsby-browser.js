/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
// gatsby-browser.js
import { globalHistory } from "@reach/router"

const KEY = "__GATSBY_PATH_STACK__"

const readStack = () => {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || "[]")
  } catch {
    return []
  }
}

const writeStack = (stack) => {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(stack.slice(-50)))
  } catch {}
}

export const onClientEntry = () => {
  if (typeof window === "undefined") return

  // Initialize with current path if empty
  const cur = window.location.pathname + window.location.search + window.location.hash
  const stack = readStack()
  if (!stack.length) {
    writeStack([cur])
  }

  // Listen to navigation actions: PUSH / POP / REPLACE
  globalHistory.listen(({ location, action }) => {
    const path = location.pathname + (location.search || "") + (location.hash || "")
    const stackNow = readStack()

    if (action === "PUSH") {
      // normal forward navigation
      if (stackNow[stackNow.length - 1] !== path) {
        stackNow.push(path)
      }
    } else if (action === "POP") {
      // user/back navigation: drop the current top if it matches
      if (stackNow.length && stackNow[stackNow.length - 1] !== path) {
        // find last occurrence and trim to it
        const idx = stackNow.lastIndexOf(path)
        if (idx >= 0) stackNow.length = idx + 1
        else stackNow.push(path)
      }
    } else if (action === "REPLACE") {
      // replace top
      if (stackNow.length) stackNow[stackNow.length - 1] = path
      else stackNow.push(path)
    }

    writeStack(stackNow)
  })
}
