const express = require('express');
const router = express.Router();
const Vote = require('../models/vote');  // Assure-toi que le modèle 'Vote' est bien importé

// Ajouter un vote
router.post('/', async (req, res) => {
  const { candidate_id, user_id } = req.body;

  try {
    const newVote = new Vote({ candidate_id, user_id });
    await newVote.save();
    res.status(201).json({ message: 'Vote ajouté avec succès', vote: newVote });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du vote:', error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout du vote', error });
  }
});

// Récupérer tous les votes
router.get('/', async (req, res) => {
  try {
    const votes = await Vote.find().populate('candidate_id').populate('user_id');
    res.status(200).json(votes);
  } catch (error) {
    console.error('Erreur lors de la récupération des votes:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des votes', error });
  }
});

module.exports = router;
