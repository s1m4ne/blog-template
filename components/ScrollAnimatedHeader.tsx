'use client'

import { useEffect, useState, useRef } from 'react'
import Header from './Header'

export default function ScrollAnimatedHeader() {
  const [notTop, setNotTop] = useState(false)
  const [hidden, setHidden] = useState(false)
  const prevY = useRef(0)
  const sentinel1 = useRef<HTMLDivElement>(null)
  const sentinel2 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const s1 = sentinel1.current!
    const s2 = sentinel2.current!
    const obs1 = new IntersectionObserver(([entry]) => setNotTop(!entry.isIntersecting), {
      root: null,
      threshold: 0,
    })
    const obs2 = new IntersectionObserver(
      ([entry]) => {
        const y = entry.boundingClientRect.y
        const down = y < prevY.current
        if (!entry.isIntersecting && down) setHidden(true)
        else if (entry.isIntersecting) setHidden(false)
        prevY.current = y
      },
      { root: null, threshold: 0 }
    )
    obs1.observe(s1)
    obs2.observe(s2)
    return () => {
      obs1.disconnect()
      obs2.disconnect()
    }
  }, [])

  let cls = 'sticky top-3 z-50 mx-auto transition-all duration-300 ease-in-out'

  if (!notTop) {
    cls += ' w-full bg-transparent border-none shadow-none px-0'
  } else {
    cls +=
      ' w-full px-4' +
      ' md:container md:px-6' +
      ' xl:w-[700px] xl:px-6' +
      ' rounded-full border-2 border-gray-300 dark:border-gray-700 bg-white/80 backdrop-blur dark:bg-gray-950 shadow-md'
  }

  if (hidden) {
    cls += ' -translate-y-10 opacity-0'
  }

  return (
    <>
      <div
        ref={sentinel1}
        style={{ position: 'absolute', top: 20, left: 0, width: 1, height: 1 }}
      />
      <div
        ref={sentinel2}
        style={{ position: 'absolute', top: 500, left: 0, width: 1, height: 1 }}
      />
      <div className={cls}>
        <Header />
      </div>
    </>
  )
}
