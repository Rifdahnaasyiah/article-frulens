const express = require('express');
const { getAllRecipes, getRecipeById, addRecipe } = require('../handler/handler');  // Mengimpor fungsi dari handler

const router = express.Router();

// Route untuk mendapatkan semua resep
router.get('/recipes', getAllRecipes);

// Route untuk mendapatkan resep berdasarkan ID
router.get('/recipes/:id', getRecipeById);

// Route untuk menambahkan resep baru
router.post('/recipes', addRecipe);

module.exports = router;
