import { useEffect, useRef, useState } from 'react'

function useCountUp(target, duration = 1600, startCounting) {
    const [count, setCount] = useState(0)
    useEffect(() => {
        if (!startCounting) return
        const num = parseFloat(target.replace(/[^0-9.]/g, ''))
        if (isNaN(num)) return
        let start = null
        const step = (timestamp) => {
            if (!start) start = timestamp
            const progress = Math.min((timestamp - start) / duration, 1)
            const ease = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(ease * num))
            if (progress < 1) requestAnimationFrame(step)
            else setCount(num)
        }
        requestAnimationFrame(step)
    }, [startCounting, target, duration])
    return count
}

function StatItem({ value, label, delay, startCounting, mobile }) {
    const hasPlus = value.includes('+')
    const hasPercent = value.includes('%')
    const count = useCountUp(value, 1600, startCounting)
    const display = hasPlus ? `+${count.toLocaleString('es-AR')}` : hasPercent ? `${count}%` : count.toLocaleString('es-AR')

    return (
        <div
            style={{ transitionDelay: `${delay}ms` }}
            className={`transition-all duration-700 ${startCounting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
            <div className={`font-display font-black text-[1.7rem] leading-none tracking-tight ${mobile ? 'text-white lg:text-primary' : 'text-textPrimary'}`}>
                {display}
            </div>
            <div className={`font-display text-[0.58rem] font-semibold tracking-[0.16em] uppercase mt-2.5 ${mobile ? 'text-white/60 lg:text-textSecondary' : 'text-textSecondary'}`}>
                {label}
            </div>
        </div>
    )
}

export default function CountUpStats({ stats, mobile = false }) {
    const ref = useRef(null)
    const [started, setStarted] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect() } },
            { threshold: 0.4 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return (
        <div ref={ref} className={`flex gap-12 lg:gap-14 pt-10 ${mobile ? 'border-t border-white/20 lg:border-secondaryLight' : 'border-t border-secondaryLight'}`}>
            {stats.map(({ value, label }, i) => (
                <StatItem key={label} value={value} label={label} delay={i * 120} startCounting={started} mobile={mobile} />
            ))}
        </div>
    )
}