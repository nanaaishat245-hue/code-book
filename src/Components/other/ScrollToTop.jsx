
import React,{ useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const ScrollToTop = () => {

  const {pathame} = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathame])
  return (
    <div>
      
    </div>
  )
}
