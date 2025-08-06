const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
	title: { type: String, required: true },		// Recipe name
	description: String,					// Short text describing the dish
	ingredients: { type: [String], required: true },	// Array of strings
	instructions: { type: String, required: true },		// Full preparation instructions
	prepTimeInMinutes: { type: Number, min: 1 },		// Total prep time as a number
	createdAt: { type: Date, default: Date.now }		// Auto-set to the current date
});

module.exports = mongoose.model('Recipe', recipeSchema);