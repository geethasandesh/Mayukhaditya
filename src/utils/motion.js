export const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
}

export const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
}

export const viewport = { once: true, margin: "-60px" }

export const transition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
