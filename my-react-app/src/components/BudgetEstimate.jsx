import { useState } from 'react'
import { motion } from 'framer-motion'
import '../App.css'
const ADMISSION = 500
const CAFE_COST = 200

const SliderRow = ({ min, max, step, value, onChange, minLabel, maxLabel }) => (
  <div className="budget-slider-wrap">
    <div className="budget-slider-row">
      <span className="slider-bound">{minLabel ?? `₱${min}`}</span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} />
      <span className="slider-bound">{maxLabel ?? `₱${max}`}</span>
    </div>
  </div>
)

export default function BudgetEstimate() {
  const [lunch, setLunch] = useState(300)
  const [dinner, setDinner] = useState(200)
  const [arcade, setArcade] = useState(250)
  const [includeArcade, setIncludeArcade] = useState(true)
  const [includeCafe, setIncludeCafe] = useState(false)

  const perPerson = ADMISSION + lunch + dinner +
    (includeArcade ? arcade : 0) +
    (includeCafe ? CAFE_COST : 0)
  const groupTotal = perPerson * 6
  const fmt = n => `₱${n.toLocaleString()}`

  return (
    <motion.section className="budget-section"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <div className="section-header">
        <h2>Budget Estimate</h2>
        <p className="subtitle">Weekend · 6 players</p>
      </div>

      <div className="budget-summary-grid">
        <div className="budget-stat highlight">
          <span>Per person</span>
          <strong>{fmt(perPerson)}</strong>
        </div>
      </div>

      {/* Admission — fixed */}
      <div className="budget-card">
        <div className="budget-card-header">
          <span className="budget-card-title">🎟 Backrooms admission</span>
          <div className="budget-card-right">
            <span className="badge-fixed">fixed</span>
            <strong>{fmt(ADMISSION)}</strong>
          </div>
        </div>
        <p className="budget-card-sub">Weekend rate, 5–6 players per person</p>
      </div>

      {/* Lunch */}
      <div className="budget-card">
        <div className="budget-card-header">
          <span className="budget-card-title">🍱 Lunch</span>
          <strong>{fmt(lunch)}</strong>
        </div>
        <SliderRow min={150} max={500} step={50} value={lunch} onChange={setLunch} />
      </div>

      {/* Dinner */}
      <div className="budget-card">
        <div className="budget-card-header">
          <span className="budget-card-title">🌙 Dinner</span>
          <strong>{fmt(dinner)}</strong>
        </div>
        <SliderRow min={100} max={300} step={50} value={dinner} onChange={setDinner} />
      </div>

      {/* Arcade */}
      <div className="budget-card">
        <div className="budget-card-header">
          <span className="budget-card-title">🕹 Arcade</span>
          <div className="budget-card-right">
            <strong style={{ opacity: includeArcade ? 1 : 0.4 }}>{fmt(arcade)}</strong>
            <label className="toggle">
              <input type="checkbox" checked={includeArcade} onChange={e => setIncludeArcade(e.target.checked)} />
              <span className="toggle-track" />
            </label>
          </div>
        </div>
        {includeArcade && <SliderRow min={200} max={300} step={50} value={arcade} onChange={setArcade} />}
      </div>

      {/* Cafe */}
      <div className="budget-card">
        <div className="budget-card-header">
          <span className="budget-card-title">☕ Cafe <span className="badge-optional">optional</span></span>
          <div className="budget-card-right">
            <strong style={{ opacity: includeCafe ? 1 : 0.4 }}>{fmt(CAFE_COST)}</strong>
            <label className="toggle">
              <input type="checkbox" checked={includeCafe} onChange={e => setIncludeCafe(e.target.checked)} />
              <span className="toggle-track" />
            </label>
          </div>
        </div>
        <p className="budget-card-sub">Coffee / drinks before heading home</p>
      </div>

      {/* Totals */}
      <div className="budget-card budget-totals">
        {[
          ['Backrooms admission', fmt(ADMISSION)],
          ['Lunch', fmt(lunch)],
          ['Dinner', fmt(dinner)],
          ...(includeArcade ? [['Arcade', fmt(arcade)]] : []),
          ...(includeCafe ? [['Cafe', fmt(CAFE_COST)]] : []),
        ].map(([label, val]) => (
          <div key={label} className="budget-breakdown-row">
            <span>{label}</span><span>{val}</span>
          </div>
        ))}
        <div className="budget-total-line">
          <span>Per person</span><strong className="total-highlight">{fmt(perPerson)}</strong>
        </div>
      </div>
    </motion.section>
  )
}