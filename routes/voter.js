const express = require('express');
const router = express.Router();
const Vote = require('../models/vote');  // Modèle de Vote
const User = require('../models/user');  // Modèle de User
const Candidate = require('../models/candidate');  // Modèle de Candidate

// Route POST pour enregistrer un vote
router.post('/', async (req, res) => {
  const { user_id, candidate_id } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier si le candidat existe
    const candidate = await Candidate.findById(candidate_id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidat non trouvé' });
    }

    // Créer un nouveau vote
    const newVote = new Vote({
      user_id,
      candidate_id,
    });

    await newVote.save();  // Sauvegarder le vote dans la base de données
    res.status(201).json({ message: 'Vote enregistré avec succès', vote: newVote });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement du vote', error });
  }
});

module.exports = router;
