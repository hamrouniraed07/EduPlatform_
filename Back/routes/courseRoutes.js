const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Review = require('../models/Review');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');


router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('students', 'username email');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('students', 'username email');
    
    if (!course) {
      return res.status(404).json({ message: 'Cours non trouvé' });
    }
    
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.post('/:id/enroll', protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Cours non trouvé' });
    }


    if (course.students.includes(req.userId)) {
      return res.status(400).json({ message: 'Déjà inscrit à ce cours' });
    }

    course.students.push(req.userId);
    await course.save();

    const user = await User.findById(req.userId);
    user.courses.push(course._id);
    await user.save();

    res.json({ message: 'Inscription réussie', course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/:id/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({ course: req.params.id })
      .populate('user', 'username')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/:id/reviews', protect, async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Cours non trouvé' });
    }

    const existingReview = await Review.findOne({
      course: req.params.id,
      user: req.userId
    });

    if (existingReview) {
      return res.status(400).json({ message: 'Vous avez déjà laissé un avis pour ce cours' });
    }

    const review = await Review.create({
      course: req.params.id,
      user: req.userId,
      rating,
      comment
    });

    const populatedReview = await Review.findById(review._id).populate('user', 'username');

    res.status(201).json(populatedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;