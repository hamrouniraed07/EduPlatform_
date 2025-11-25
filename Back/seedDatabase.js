// backend/seedDatabase.js
// Script pour peupler la base de données avec des données de test
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('./models/User');
const Course = require('./models/Course');
const Review = require('./models/Review');

const seedDatabase = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connecté');

    // Supprimer les données existantes
    await User.deleteMany({});
    await Course.deleteMany({});
    await Review.deleteMany({});
    console.log('🗑️  Base de données nettoyée');

    // Créer des utilisateurs
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const users = await User.create([
      {
        username: 'alice',
        email: 'alice@example.com',
        password: hashedPassword,
        bio: 'Passionnée de développement web',
        website: 'https://alice.dev'
      },
      {
        username: 'bob',
        email: 'bob@example.com',
        password: hashedPassword,
        bio: 'Étudiant en informatique',
        website: ''
      },
      {
        username: 'charlie',
        email: 'charlie@example.com',
        password: hashedPassword
      }
    ]);
    console.log('👥 Utilisateurs créés');

    // Créer des cours
    const courses = await Course.create([
      {
        title: 'Introduction au JavaScript',
        description: 'Apprenez les bases du JavaScript moderne avec ES6+. Ce cours couvre les fondamentaux : variables, fonctions, objets, tableaux, et bien plus encore.',
        instructor: 'Dr. Sarah Martin',
        duration: 25,
        level: 'Débutant',
        students: [users[0]._id, users[1]._id]
      },
      {
        title: 'React pour Débutants',
        description: 'Maîtrisez React.js et créez des applications web modernes. Composants, hooks, state management et plus encore.',
        instructor: 'Prof. Jean Dupont',
        duration: 40,
        level: 'Intermédiaire',
        students: [users[0]._id]
      },
      {
        title: 'Node.js et Express',
        description: 'Développez des API REST avec Node.js et Express. Apprenez à créer des serveurs backend robustes et scalables.',
        instructor: 'Dr. Marie Lambert',
        duration: 35,
        level: 'Intermédiaire',
        students: [users[1]._id, users[2]._id]
      },
      {
        title: 'MongoDB et Bases de Données NoSQL',
        description: 'Découvrez MongoDB et les bases de données NoSQL. Modélisation de données, requêtes, agrégations et optimisation.',
        instructor: 'Prof. Ahmed Khalil',
        duration: 20,
        level: 'Débutant',
        students: []
      },
      {
        title: 'Full Stack MERN',
        description: 'Stack complet : MongoDB, Express, React et Node.js. Créez une application web complète de A à Z.',
        instructor: 'Dr. Sophie Chen',
        duration: 60,
        level: 'Avancé',
        students: [users[0]._id, users[1]._id, users[2]._id]
      },
      {
        title: 'TypeScript Avancé',
        description: 'Maîtrisez TypeScript et ses fonctionnalités avancées. Types, interfaces, generics et patterns avancés.',
        instructor: 'Prof. Marc Dubois',
        duration: 30,
        level: 'Avancé',
        students: []
      }
    ]);
    console.log('📚 Cours créés');

    // Mettre à jour les cours des utilisateurs
    users[0].courses = [courses[0]._id, courses[1]._id, courses[4]._id];
    users[1].courses = [courses[0]._id, courses[2]._id, courses[4]._id];
    users[2].courses = [courses[2]._id, courses[4]._id];

    await users[0].save();
    await users[1].save();
    await users[2].save();

    // Créer des reviews
    await Review.create([
      {
        course: courses[0]._id,
        user: users[0]._id,
        rating: 5,
        comment: 'Excellent cours pour débuter ! Les explications sont claires et les exemples très pratiques.'
      },
      {
        course: courses[0]._id,
        user: users[1]._id,
        rating: 4,
        comment: 'Très bon contenu, j\'ai beaucoup appris. Peut-être un peu rapide sur certains concepts.'
      },
      {
        course: courses[1]._id,
        user: users[0]._id,
        rating: 5,
        comment: 'Le meilleur cours React que j\'ai suivi ! Instructeur très pédagogue.'
      },
      {
        course: courses[2]._id,
        user: users[1]._id,
        rating: 4,
        comment: 'Bonne introduction à Node.js et Express. Les projets pratiques sont très utiles.'
      },
      {
        course: courses[4]._id,
        user: users[2]._id,
        rating: 5,
        comment: 'Formation complète et détaillée. Parfait pour devenir full stack developer !'
      }
    ]);
    console.log('⭐ Reviews créées');

    console.log('\n✅ Base de données peuplée avec succès !');
    console.log('\n📋 Utilisateurs de test :');
    console.log('   - alice@example.com / password123');
    console.log('   - bob@example.com / password123');
    console.log('   - charlie@example.com / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
};

seedDatabase();