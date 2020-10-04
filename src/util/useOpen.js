import { useRef, useState, useEffect } from "react"

/**
 * Intercept 'open' state with click outside logic
 */
export default function useCloseOnClickOutside(initOpen = false) {
    const container = useRef('container')
    const [open, setOpen] = useState(initOpen)
    useEffect(() => {
        if (open || open===0) {
            const listener = (e) => {
                if (!container.current.contains(e.target)) {
                    setOpen(false)
                }
            }
            window.addEventListener('mouseup', listener)
            return () => {
                window.removeEventListener('mouseup', listener)
            }
        }
    }, [open])
    return [open, setOpen, container]
}

