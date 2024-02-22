// source -> https://usehooks-ts.com/react-hook/use-local-storage
// this is a modified version of the original useLocalStorage hook
// the modification is that the key are a parameter of the functions instead of parameter of the hook

declare global {
  interface WindowEventMap {
    "local-storage": CustomEvent
  }
}

const IS_SERVER = typeof window === "undefined"

export const customLocalStorage = (): {
  setItem: (key: string, value: string) => void
  getItem: (key: string) => string
} => {
  const serializer = (value: string) => JSON.stringify(value)

  const deserializer = (value: string) => {
    // Support 'undefined' as a value
    if (value === "undefined") {
      return ""
    }

    let parsed = ""
    try {
      parsed = JSON.parse(value)
    } catch (error) {
      console.error("Error parsing JSON:", error)
    }

    return parsed
  }

  // Get from local storage then
  // parse stored json or return initialValue
  const getItem = (key: string): string => {
    // Prevent build error "window is undefined" but keeps working
    if (IS_SERVER) {
      return ""
    }

    try {
      const raw = window.localStorage.getItem(key)
      return raw ? deserializer(raw) : ""
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error)
      return ""
    }
  }

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setItem: (key: string, value: string) => void = (key, value) => {
    // Prevent build error "window is undefined" but keeps working
    if (IS_SERVER) {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`
      )
    }

    try {
      // Save to local storage
      window.localStorage.setItem(key, serializer(value))

      // We dispatch a custom event so every similar useLocalStorage hook is notified
      window.dispatchEvent(new StorageEvent("local-storage", { key }))
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error)
    }
  }

  return { setItem, getItem }
}
