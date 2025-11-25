const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');




router.get('/', async (req, res) => {
  
});

// Route protégée
router.get('/profile', protect, async (req, res) => {
  // req.userId contient l'ID de l'utilisateur connecté
  const user = await User.findById(req.userId).select('-password');
  res.json(user);
});


router.get('/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/:id/courses', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('courses');
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    res.json(user.courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put('/:id', protect, async (req, res) => {
  try {
    if (req.params.id !== req.userId.toString()) {
      return res.status(403).json({ message: 'Non autorisé' });
    }

    const { bio, website } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { bio, website },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;