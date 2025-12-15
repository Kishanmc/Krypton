const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const {
  getSimulations,
  addSimulation,
  updateSimulation,
  deleteSimulation
} = require('../controllers/simulationController');

router.get('/', getSimulations);

// Admin routes
router.post('/', protect, authorize('admin'), addSimulation);
router.put('/:id', protect, authorize('admin'), updateSimulation);
router.delete('/:id', protect, authorize('admin'), deleteSimulation);

module.exports = router;
