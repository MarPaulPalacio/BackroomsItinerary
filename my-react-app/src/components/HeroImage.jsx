import { motion } from 'framer-motion'
import heroImage from '../assets/hero.jpg'
export default function HeroImage({ imageUrl }) {
  return (
    <motion.section
      className="hero-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="hero-image-container">
        <motion.div
          className="hero-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        />
        <img
        src={heroImage}
        alt="The Backrooms Immersive Experience"
        className="hero-image"
        />
        <motion.div
          className="hero-text-overlay"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2>BACKROOMS</h2>
          <p></p>
        </motion.div>
      </div>
    </motion.section>
  )
}
