import { useEffect, useRef, useState } from "react"
import { motion, useInView, animate } from "framer-motion"

const CountUp = ({ end, suffix = "", prefix = "", duration = 2.5, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const [value, setValue] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return

    let controls
    let timeoutId

    const run = () => {
      hasAnimated.current = true
      setValue(0)
      controls = animate(0, end, {
        duration,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (latest) => setValue(Math.round(latest)),
      })
    }

    if (delay > 0) {
      timeoutId = setTimeout(run, delay * 1000)
    } else {
      run()
    }

    return () => {
      clearTimeout(timeoutId)
      controls?.stop()
    }
  }, [isInView, end, duration, delay])

  return (
    <motion.span
      ref={ref}
      className="tabular-nums inline-block"
      initial={{ opacity: 0, y: 8 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
    >
      {prefix}
      {value}
      {suffix}
    </motion.span>
  )
}

export default CountUp
