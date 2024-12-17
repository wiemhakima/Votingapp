const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); 
const app = express();

// Modules de sécurité
const cors = require('cors');

// Modules de logging
const httpLogger = require('morgan');

// Endpoints
const viewsRouter = require('./routes/views');
const candidatesRouter = require('./routes/candidates');
const voterRouter = require('./routes/voter');
const voteRouter = require('./routes/vote');
const userRouter = require('./routes/users'); // Ajouter le router des utilisateurs

// Middleware
app.use(httpLogger('dev')); // Log des requêtes HTTP
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Connexion à MongoDB
mongoose.connect(process.env.DB)
  .then(() => console.log('✅ MongoDB connecté avec succès'))
  .catch((err) => {
    console.error('❌ Erreur de connexion à MongoDB:', err.message);
    process.exit(1); // Terminer le processus en cas d'échec
  });


// Définir les routes
app.use('/', viewsRouter);
app.use('/candidates', candidatesRouter);
app.use('/voter', voterRouter);
app.use('/vote', voteRouter);
app.use('/users', userRouter); // Ajouter la route des utilisateurs

// Définir le port
const PORT = process.env.PORT || 3000;

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
