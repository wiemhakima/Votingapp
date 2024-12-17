const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  house: { type: String, required: true },
  img: { type: String, required: true } 
});

module.exports = mongoose.model('Candidate', candidateSchema);
