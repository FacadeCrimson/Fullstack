import { useEffect, useRef } from 'react'

export default function useInterval(callback:Function, delay:number) {
  const savedCallback = useRef<Function>()

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    function tick() {
      if(savedCallback.current!==undefined){
        savedCallback.current()
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}