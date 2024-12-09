const fs = require('fs');
const path = require('path');
const recipesFilePath = path.join(__dirname, '../data/recipes.json');
const recipes = require(recipesFilePath);

// Get all recipes
const getAllRecipes = (req, res) => {
  console.log('Recipes:', recipes); // Tambahkan log untuk memeriksa data
  res.json(recipes);
};

// Get recipe by ID
const getRecipeById = (req, res) => {
  const { id } = req.params;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const recipe = recipes.find((r) => r.id === parsedId);
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ message: "Recipe not found" });
  }
};

// Add new recipe
const addRecipe = (req, res) => {
  const { title, ingredients, steps, image, category, serving, prep_time } = req.body;

  // Validasi input data
  if (!title || !ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ message: "Invalid recipe data. Title, ingredients are required." });
  }

  const newRecipe = {
    id: Math.max(...recipes.map(recipe => recipe.id), 0) + 1, // Menentukan ID baru
    title,  // Menambahkan judul
    ingredients,  // Menambahkan bahan
    steps,  // Menambahkan langkah
    image,  // Menambahkan gambar
    category,  // Menambahkan kategori
    serving,  // Menambahkan jumlah porsi
    prep_time  // Menambahkan waktu persiapan
  };

  recipes.push(newRecipe);

  // Menulis kembali data ke file JSON
  fs.writeFile(recipesFilePath, JSON.stringify(recipes, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to save recipe' });
    }
    res.status(201).json({ message: "Recipe added successfully", recipe: newRecipe });
  });
};


module.exports = {
  getAllRecipes,
  getRecipeById,
  addRecipe
};
