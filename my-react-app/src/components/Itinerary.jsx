import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const defaultItinerary = [
  {
    id: 1,
    time: '11:00 PM',
    event: 'Meet Up',
    description: 'Kitakits sa Shangrila Lobby?'
  },
  {
    id: 2,
    time: '11:30 PM',
    event: 'Kainan',
    description: 'Shangrila Food Court'
  },
  {
    id: 3,
    time: '1:00 PM',
    event: 'Gala na',
    description: 'Onting libot sa shang'
  },
  {
    id: 4,
    time: '2:30 PM',
    event: 'Backrooms',
    description: 'Explore the first level of the Backrooms. Navigate through dimly lit corridors and uncover mysteries.'
  },
  {
    id: 5,
    time: '5:00 PM',
    event: 'Megamall Sports Center or sa lowerground na mga arcade',
    description: 'Pt 2'
  },
  {
    id: 6,
    time: '6:30 PM',
    event: 'Gala Pt 2',
    description: 'Greenfields or Megamall or podium o san ba basta mura lang HAHAHAHA'
  },
  {
    id: 7,
    time: '7:00 PM',
    event: 'Closing Remarks o kape',
    description: 'Kape Bago Umuwi'
  }
]

export default function Itinerary({ editMode }) {
  const [itinerary, setItinerary] = useState(defaultItinerary)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ time: '', event: '', description: '' })

  const handleEdit = (item) => {
    setEditingId(item.id)
    setEditForm({ time: item.time, event: item.event, description: item.description })
  }

  const handleSave = (id) => {
    setItinerary(itinerary.map(item =>
      item.id === id ? { ...item, ...editForm } : item
    ))
    setEditingId(null)
  }

  const handleCancel = () => {
    setEditingId(null)
  }

  const handleAddItem = () => {
    const newId = Math.max(...itinerary.map(i => i.id)) + 1
    setItinerary([...itinerary, { id: newId, time: '', event: '', description: '' }])
    handleEdit({ id: newId, time: '', event: '', description: '' })
  }

  const handleDelete = (id) => {
    setItinerary(itinerary.filter(item => item.id !== id))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
  }

  return (
    <section className="itinerary-section">
      <div className="section-header">
        <h2>Event Itinerary</h2>
        <p className="subtitle">Follow the flow of an unforgettable experience</p>
      </div>

      <motion.div
        className="itinerary-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {itinerary.map((item, index) => (
            <motion.div
              key={item.id}
              className="itinerary-item"
              variants={itemVariants}
              layout
            >
              <div className="timeline-marker">
                <div className="timeline-dot"></div>
                {index !== itinerary.length - 1 && <div className="timeline-line"></div>}
              </div>

              <div className="item-content">
                {editMode && editingId === item.id ? (
                  <motion.div
                    className="edit-form"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <input
                      type="text"
                      placeholder="Time"
                      value={editForm.time}
                      onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                      className="edit-input"
                    />
                    <input
                      type="text"
                      placeholder="Event Name"
                      value={editForm.event}
                      onChange={(e) => setEditForm({ ...editForm, event: e.target.value })}
                      className="edit-input"
                    />
                    <textarea
                      placeholder="Description"
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="edit-textarea"
                    />
                    <div className="edit-buttons">
                      <button onClick={() => handleSave(item.id)} className="save-btn">Save</button>
                      <button onClick={handleCancel} className="cancel-btn">Cancel</button>
                      <button onClick={() => handleDelete(item.id)} className="delete-btn">Delete</button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="item-display">
                    <div className="time-event">
                      <span className="time">{item.time}</span>
                      <h3 className="event-title">{item.event}</h3>
                    </div>
                    <p className="description">{item.description}</p>
                    {editMode && (
                      <motion.button
                        className="edit-item-btn"
                        onClick={() => handleEdit(item)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        ✎ Edit
                      </motion.button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {editMode && (
        <motion.button
          className="add-item-btn"
          onClick={handleAddItem}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          + Add Item
        </motion.button>
      )}
    </section>
  )
}
