import { useState, useRef, useCallback, useEffect, memo } from 'react'
import { DollarSign } from 'lucide-react'

/* ──────────────────────────────────────────────────────────────────
   PriceRangeFilter — Componente premium de rango de precios
   
   Decisiones UX:
   1. Formato numérico completo (sin "K") → elimina ambigüedad
   2. Dual-thumb slider + inputs editables → máximo control
   3. Sub-label dinámico (dólares/pesos) → contexto inmediato
   4. Validación silenciosa (clamp, swap) → previene errores
   5. Track con gradiente → feedback visual del rango seleccionado
   
   Performance:
   - El slider usa estado local y solo propaga al padre via
     requestAnimationFrame para evitar re-renders bloqueantes.
   - Los handlers de input no bloquean el hilo principal.
────────────────────────────────────────────────────────────────── */

/** Formatea un número con separador de miles estilo argentino (.) */
function formatNumber(value) {
    return Math.round(value).toLocaleString('es-AR')
}

/** Parsea un string con separadores a número */
function parseFormattedNumber(str) {
    if (!str) return 0
    const cleaned = str.replace(/[^\d]/g, '')
    return parseInt(cleaned, 10) || 0
}

/** Formatea el valor con el prefijo de moneda */
function formatWithCurrency(value, currency) {
    if (currency === 'USD') return `USD ${formatNumber(value)}`
    return `$${formatNumber(value)}`
}

function PriceRangeFilter({
    currency = 'USD',
    min: absMin,
    max: absMax,
    valueMin,
    valueMax,
    onChangeMin,
    onChangeMax,
    step = null,
}) {
    const isUSD = currency === 'USD'
    const prefix = isUSD ? 'USD' : '$'
    const sublabel = isUSD ? 'En dólares estadounidenses' : 'En pesos argentinos'
    const computedStep = step || Math.max(1, Math.round((absMax - absMin) / 100))

    /* ── Local state for slider thumbs (decoupled from parent) ── */
    const [localMin, setLocalMin] = useState(valueMin)
    const [localMax, setLocalMax] = useState(valueMax)
    const rafRef = useRef(null)

    /* Sync local state when parent values change externally (e.g. clear filters) */
    useEffect(() => {
        setLocalMin(valueMin)
    }, [valueMin])
    useEffect(() => {
        setLocalMax(valueMax)
    }, [valueMax])

    /* ── Local state para inputs editables ── */
    const [minInput, setMinInput] = useState(formatNumber(valueMin))
    const [maxInput, setMaxInput] = useState(formatNumber(valueMax))
    const [minFocused, setMinFocused] = useState(false)
    const [maxFocused, setMaxFocused] = useState(false)

    /* Sincronizar inputs cuando cambian los valores desde el slider */
    useEffect(() => {
        if (!minFocused) setMinInput(formatNumber(localMin))
    }, [localMin, minFocused])

    useEffect(() => {
        if (!maxFocused) setMaxInput(formatNumber(localMax))
    }, [localMax, maxFocused])

    /* ── Track visual: calcula posición de los thumbs ── */
    const minPercent = ((localMin - absMin) / (absMax - absMin)) * 100
    const maxPercent = ((localMax - absMin) / (absMax - absMin)) * 100

    /* ── Propagate to parent with RAF debounce ── */
    const propagateMin = useCallback((val) => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(() => {
            onChangeMin(val)
        })
    }, [onChangeMin])

    const propagateMax = useCallback((val) => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(() => {
            onChangeMax(val)
        })
    }, [onChangeMax])

    /* Cleanup RAF on unmount */
    useEffect(() => {
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [])

    /* ── Handlers del slider ── */
    const handleMinSlider = useCallback((e) => {
        const val = Number(e.target.value)
        const clamped = Math.min(val, localMax)
        setLocalMin(clamped)
        propagateMin(clamped)
    }, [localMax, propagateMin])

    const handleMaxSlider = useCallback((e) => {
        const val = Number(e.target.value)
        const clamped = Math.max(val, localMin)
        setLocalMax(clamped)
        propagateMax(clamped)
    }, [localMin, propagateMax])

    /* ── Handlers de inputs ── */
    const commitMinInput = useCallback(() => {
        let val = parseFormattedNumber(minInput)
        val = Math.max(absMin, Math.min(val, absMax))
        if (val > localMax) val = localMax
        setLocalMin(val)
        onChangeMin(val)
        setMinInput(formatNumber(val))
        setMinFocused(false)
    }, [minInput, absMin, absMax, localMax, onChangeMin])

    const commitMaxInput = useCallback(() => {
        let val = parseFormattedNumber(maxInput)
        val = Math.max(absMin, Math.min(val, absMax))
        if (val < localMin) val = localMin
        setLocalMax(val)
        onChangeMax(val)
        setMaxInput(formatNumber(val))
        setMaxFocused(false)
    }, [maxInput, absMin, absMax, localMin, onChangeMax])

    const handleKeyDown = (e, commitFn) => {
        if (e.key === 'Enter') {
            e.target.blur()
            commitFn()
        }
    }

    return (
        <div className="price-range-filter">
            {/* ── Header: Label + Sub-label ── */}
            <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                        <DollarSign size={13} className="text-primary" />
                    </div>
                    <span className="text-[0.72rem] font-body font-black tracking-[0.18em] uppercase text-textPrimary">
                        {isUSD ? 'Precio de compra' : 'Precio de alquiler'}
                    </span>
                </div>
                <span className="text-[0.68rem] font-body font-medium text-textSecondary ml-8 block">
                    {sublabel}
                </span>
            </div>

            {/* ── Inputs Min / Max ── */}
            <div className="flex items-center gap-1.5 mb-5">
                {/* Min input */}
                <div className="flex-1 relative">
                    <label className="text-[0.58rem] font-body font-bold tracking-[0.15em] uppercase text-textSecondary/70 mb-1 block">
                        Mínimo
                    </label>
                    <div className={`
                        flex items-center rounded-xl border-2 transition-all duration-250 overflow-hidden
                        ${minFocused
                            ? 'border-primary bg-white shadow-[0_0_0_3px_rgba(18,100,95,0.08)]'
                            : 'border-gray-200 bg-secondaryLight hover:border-gray-300'}
                    `}>
                        <span className="text-[0.62rem] font-body font-bold text-textSecondary pl-2.5 pr-0.5 shrink-0 select-none">
                            {prefix}
                        </span>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={minInput}
                            onChange={e => setMinInput(e.target.value)}
                            onFocus={() => setMinFocused(true)}
                            onBlur={commitMinInput}
                            onKeyDown={e => handleKeyDown(e, commitMinInput)}
                            className="w-full py-2 pr-2 bg-transparent text-[0.74rem] font-body font-bold text-textPrimary outline-none tabular-nums"
                            aria-label={`Precio mínimo en ${isUSD ? 'dólares' : 'pesos'}`}
                        />
                    </div>
                </div>

                {/* Separator */}
                <div className="flex items-end pb-2.5">
                    <span className="text-textSecondary/40 font-body font-bold text-[0.85rem] select-none mt-4">—</span>
                </div>

                {/* Max input */}
                <div className="flex-1 relative">
                    <label className="text-[0.58rem] font-body font-bold tracking-[0.15em] uppercase text-textSecondary/70 mb-1 block">
                        Máximo
                    </label>
                    <div className={`
                        flex items-center rounded-xl border-2 transition-all duration-250 overflow-hidden
                        ${maxFocused
                            ? 'border-primary bg-white shadow-[0_0_0_3px_rgba(18,100,95,0.08)]'
                            : 'border-gray-200 bg-secondaryLight hover:border-gray-300'}
                    `}>
                        <span className="text-[0.72rem] font-body font-bold text-textSecondary pl-3 pr-1 shrink-0 select-none">
                            {prefix}
                        </span>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={maxInput}
                            onChange={e => setMaxInput(e.target.value)}
                            onFocus={() => setMaxFocused(true)}
                            onBlur={commitMaxInput}
                            onKeyDown={e => handleKeyDown(e, commitMaxInput)}
                            className="w-full py-2.5 pr-3 bg-transparent text-[0.82rem] font-body font-bold text-textPrimary outline-none"
                            aria-label={`Precio máximo en ${isUSD ? 'dólares' : 'pesos'}`}
                        />
                    </div>
                </div>
            </div>

            {/* ── Dual-thumb Slider ── */}
            <div className="price-slider-container relative h-6 mb-3">
                {/* Track background */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[5px] rounded-full bg-gray-200" />

                {/* Active track  */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 h-[5px] rounded-full"
                    style={{
                        left: `${minPercent}%`,
                        right: `${100 - maxPercent}%`,
                        background: 'linear-gradient(90deg, #12645F, #0A4441)',
                    }}
                />

                {/* Min thumb (range input) */}
                <input
                    type="range"
                    min={absMin}
                    max={absMax}
                    step={computedStep}
                    value={localMin}
                    onChange={handleMinSlider}
                    className="price-slider-thumb"
                    aria-label="Precio mínimo slider"
                />

                {/* Max thumb (range input) */}
                <input
                    type="range"
                    min={absMin}
                    max={absMax}
                    step={computedStep}
                    value={localMax}
                    onChange={handleMaxSlider}
                    className="price-slider-thumb"
                    aria-label="Precio máximo slider"
                />
            </div>

            {/* ── Range labels ── */}
            <div className="flex items-center justify-between">
                <span className="text-[0.6rem] font-body font-medium text-textSecondary/60">
                    {formatWithCurrency(absMin, currency)}
                </span>
                <span className="text-[0.6rem] font-body font-medium text-textSecondary/60">
                    {formatWithCurrency(absMax, currency)}
                </span>
            </div>

            {/* ── Selected range summary ── */}
            <div className="mt-3 text-center">
                <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-body font-bold text-primary bg-primary/8 px-3 py-1.5 rounded-full">
                    {formatWithCurrency(localMin, currency)} – {formatWithCurrency(localMax, currency)}
                </span>
            </div>
        </div>
    )
}

export default memo(PriceRangeFilter)
