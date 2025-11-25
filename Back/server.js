const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());


const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'EduPlatform API is running' });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(' MongoDB connecté');
    app.listen(process.env.PORT, () => {
      console.log(` Serveur démarré sur le port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error(' Erreur de connexion MongoDB:', error.message);
  });