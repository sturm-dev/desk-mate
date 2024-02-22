import dayjs from "dayjs"
import { useEffect, useState } from "react"

export const useGetDateEveryMinute = () => {
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date())
      console.log("interval running...")
    }, 1000 * 60) // every minute
    return () => {
      clearInterval(interval)
    }
  }, [])

  return { currentDate, dayOfTheYear: dayjs(currentDate).format("DD/MM/YYYY") }
}
