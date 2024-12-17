const express = require('express');
const router = express.Router();

// Page d'accueil
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Bienvenue sur la plateforme de vote' });
});

module.exports = router;
