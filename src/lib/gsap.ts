import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// No auto-refresh on load — we initialize after all resources are ready
ScrollTrigger.config({ autoRefreshEvents: 'visibilitychange,DOMContentLoaded,resize' })

export { gsap, ScrollTrigger }
