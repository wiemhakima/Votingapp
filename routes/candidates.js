const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate');

// Ajouter un candidat
router.post('/', async (req, res) => {
  const { name, house, img } = req.body;

  // Vérification des données reçues
  if (!name || !house || !img) {
    return res.status(400).json({ message: 'Tous les champs (name, house, img) sont requis.' });
  }

  try {
    // Créer un nouveau candidat
    const newCandidate = new Candidate({ name, house, img });

    // Sauvegarder dans la base de données
    await newCandidate.save(); 

    // Réponse de succès
    res.status(201).json({ message: 'Candidat ajouté avec succès', candidate: newCandidate });
  } catch (error) {
    // En cas d'erreur lors de l'ajout
    console.error('Erreur lors de l\'ajout du candidat:', error.message);
    res.status(500).json({ message: 'Erreur lors de l\'ajout du candidat', error: error.message });
  }
});

// Récupérer la liste des candidats
router.get('/', async (req, res) => {
  try {
    // Récupérer tous les candidats depuis la base de données
    const candidates = await Candidate.find();

    // Réponse de succès
    res.status(200).json(candidates);
  } catch (error) {
    // En cas d'erreur lors de la récupération
    console.error('Erreur lors de la récupération des candidats:', error.message);
    res.status(500).json({ message: 'Erreur lors de la récupération des candidats', error: error.message });
  }
});

module.exports = router;
