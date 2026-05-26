import { useState } from 'react'
import { motion } from 'framer-motion'
import './App.css'
import Itinerary from './components/Itinerary'
import VenueInfo from './components/VenueInfo'
import HeroImage from './components/HeroImage'
import BudgetEstimate from './components/BudgetEstimate'

function App() {
  const [editMode, setEditMode] = useState(false)

  const eventData = {
    name: "Sem Ender Pt. 2",
    tagline: "Sem Ender na Walang Inuman",
    location: "Shangri-La at The Fort, Mandaluyong City",
    date: "2026 | May 30 - June 1",
    rsvpNames: [
      "Ariel Aguadera",
      "Bennjhoe Cuevas",
      "Juan Carlos Pascual",
      "Mar Paul Palacio",
      "Noah de Villa",
      "Patricia Fatima Angulo",
      "Rein Ezekiel",
      "Sofia Louise Abon",
      "Valerie Cabacungan T",
      "Yvonne Aguila"
    ]
  }

  return (
    <div className="app">
      <motion.header 
        className="header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="header-content">
          <h1 className="title">{eventData.name}</h1>
          <p className="tagline">{eventData.tagline}</p>
          <p className="location-info">📍 {eventData.location}</p>
          <p className="date-info">📅 {eventData.date}</p>
        </div>
        <motion.button
          className={`edit-toggle ${editMode ? 'active' : ''}`}
          onClick={() => setEditMode(!editMode)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {editMode ? '✓ Done' : '✎ Edit'}
        </motion.button>
      </motion.header>

      <HeroImage imageUrl="https://www.bing.com/images/search?view=detailV2&ccid=A03C3%2bIV&id=D40EC62C4F3007158AB07D18A6FD9E7FC4B5D301&thid=OIF.DGflBWMtRvK1jghCBzVjCQ&mediaurl=https%3a%2f%2fcinemabravo.com%2fwp-content%2fuploads%2f2026%2f05%2fe28098backrooms-breakout-opens-at-shangri-la-plaza-ahead-of-ph-release-of-a24-horror-film.jpg%3fw%3d1024&exph=576&expw=1024&q=Backrooms+SHangrila+PLazA&FORM=IRPRST&ck=0C67E505632D46F2B58E084207356309&selectedIndex=0&itb=0" />


      <main className="main-content">
        <div className="content-grid">
          <Itinerary editMode={editMode} />
          <VenueInfo />
          
        </div>
        <BudgetEstimate />
        
        
      </main>

      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <p>Looking forward to an unforgettable experience.</p>
      </motion.footer>
    </div>
  )
}

export default App
