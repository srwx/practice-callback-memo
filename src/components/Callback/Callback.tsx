import React, { useCallback, useEffect, useState } from "react"

export const Callback = () => {
  const [input, setInput] = useState(0)

  const tempFunction = useCallback(() => {
    console.log("function")
  }, [])

  useEffect(() => {
    console.log("useEffect")
  }, [tempFunction])

  return (
    <>
      <input type="number" onChange={(e) => setInput(e.target.valueAsNumber)} />
      <div>{input}</div>
    </>
  )
}
