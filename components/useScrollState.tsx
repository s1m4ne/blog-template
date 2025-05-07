'use client'

import { useState, useEffect, useRef } from 'react'

export type ScrollState = 'initial' | 'condensed' | 'hidden'

/**
 * スクロール位置に基づいて状態を管理するカスタムフック
 *
 * - initial → condensed: scrollY > threshold1_entry
 * - condensed → initial: scrollY < threshold1_exit
 * - condensed → hidden:  scrollY > threshold2_entry
 * - hidden → condensed:  scrollY < threshold2_exit
 *
 * hysteresis (px) を持たせることで振動（ジャタつき）を防止
 *
 * @param threshold1 基本の閾値① (default: 20px)
 * @param threshold2 基本の閾値② (default: 350px)
 * @param hysteresis ①／②のヒステリシス (default: 10px)
 */
export function useScrollState(
  threshold1: number = 20,
  threshold2: number = 350,
  hysteresis: number = 10
): ScrollState {
  const [state, setState] = useState<ScrollState>('initial')
  const prevState = useRef<ScrollState>('initial')
  const lastScrollY = useRef<number>(typeof window !== 'undefined' ? window.scrollY : 0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      let nextState = prevState.current

      // initial → condensed
      if (prevState.current === 'initial' && scrollY > threshold1) {
        nextState = 'condensed'
      }
      // condensed → initial
      else if (prevState.current === 'condensed' && scrollY < threshold1 - hysteresis) {
        nextState = 'initial'
      }
      // condensed → hidden
      else if (prevState.current === 'condensed' && scrollY > threshold2) {
        nextState = 'hidden'
      }
      // hidden → condensed
      else if (prevState.current === 'hidden' && scrollY < threshold2 - hysteresis) {
        nextState = 'condensed'
      }

      if (nextState !== prevState.current) {
        setState(nextState)
        prevState.current = nextState
      }

      lastScrollY.current = scrollY
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold1, threshold2, hysteresis])

  return state
}
