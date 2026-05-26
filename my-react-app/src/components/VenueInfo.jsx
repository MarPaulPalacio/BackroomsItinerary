import { motion } from 'framer-motion'

const venueData = [
  {
    id: 1,
    type: 'Event Venue',
    name: 'Shangri-La at The Fort',
    address: 'The Fort, Mandaluyong City, Metro Manila',
    phone: '+63 2 7318 8888',
    description: 'State-of-the-art facilities hosting the main Backrooms immersive experience.',
    details: ['Sem Starter']
  },
  {
    id: 2,
    type: 'Saan Pwede Tumambay',
    name: 'Shangri-La or Mega Mall or GreenFields Picnic? HAHAHAHA',
    address: 'Same location as event venue',
    phone: 'N/A',
    description: 'Ideal since malapit lang, walking distance.',
    details: ['Malapit', 'Mura']
  },
  {
    id: 3,
    type: 'Dining Options',
    name: 'Shangrila Food Court',
    address: 'The Fort, Mandaluyong',
    phone: 'N/A',
    description: 'Para Mura or baka may suggest kayo',
    details: ['25+ restaurants nearby', 'Fast casual options', 'Fine dining establishments', 'Food courts']
  }
]

export default function VenueInfo() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'Event Venue':
        return '#FFD700' // Yellow
      case 'Where to Stay':
        return '#E8E8E8' // Light grey
      case 'Dining Options':
        return '#E8E8E8' // Light grey
      case 'Lunch Recommendation':
        return '#FFD700' // Yellow
      default:
        return '#E8E8E8'
    }
  }

  return (
    <section className="venue-section">
      <div className="section-header">
        <h2>Venue & Logistics</h2>
        <p className="subtitle">Everything you need to know</p>
      </div>

      <motion.div
        className="venue-cards-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {venueData.map((venue) => (
          <motion.div
            key={venue.id}
            className="venue-card"
            variants={cardVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <div className="venue-type-badge" style={{ backgroundColor: getTypeColor(venue.type) }}>
              {venue.type}
            </div>

            <div className="venue-content">
              <h3 className="venue-name">{venue.name}</h3>
              <p className="venue-address">
                <span className="icon">📍</span> {venue.address}
              </p>
              <p className="venue-phone">
                <span className="icon">📞</span> {venue.phone}
              </p>
              <p className="venue-description">{venue.description}</p>

              <div className="venue-details">
                {venue.details.map((detail, idx) => (
                  <motion.div
                    key={idx}
                    className="detail-item"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <span className="detail-dot"></span>
                    <span>{detail}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="helpful-tips"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3>💡 Things to Bring</h3>
        <ul>
          <li>Money</li>
          <li>Social Battery</li>
          <li>Badminton Racket? HAHAHA</li>
          <li>Money</li>
          <li>Money</li>
        </ul>
      </motion.div>
    </section>
  )
}
