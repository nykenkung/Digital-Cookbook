const mongoose = require('mongoose');
require('dotenv').config();	// Loads environment variables from .env file
require('./db');

const Recipe = require('./models/recipe');

async function main() {
	const command = process.argv[2];	// Get parameter (create, list, find, update, delete, sample)
	const args = process.argv.slice(3);
	switch (command) {
	default:
		console.log(`\nUser no input. Please use one of the command (node index.js create, list, find, update, delete, sample):\n
- To add the recipe
	node index.js create <title> <description> <ingredient1,ingredient2,...> <instructions> <prepTimeInMinutes>
	Example: node index.js create "Classic Tomato Soup" "A simple and delicious homemade tomato soup." "Tomatoes,Onion,Garlic,Vegetable Broth,Olive Oil" "1. Sauté onions and garlic. 2. Add tomatoes and broth. 3. Simmer and blend." 30\n
- To see all recipes
	node index.js list\n
- To find the recipe
	node index.js find <title>
	Example: node index.js find "Classic Tomato Soup"\n
- To update recipe description
	node index.js update <title> <newDescription>
	Example: node index.js update "Classic Tomato Soup" "A cozy and comforting tomato soup perfect for chilly days."\n
- To remove the recipe
	node index.js delete <title>
	Example: node index.js delete "Classic Tomato Soup"\n
- To create a sample Garlic Bread recipe
	node index.js sample\n`);
		break;

	case 'create':
		if (args.length != 5) {
			console.log('Invalid input! For usage example:\nnode index.js create "Classic Tomato Soup" "A simple and delicious homemade tomato soup." "Tomatoes,Onion,Garlic,Vegetable Broth,Olive Oil" "1. Sauté onions and garlic. 2. Add tomatoes and broth. 3. Simmer and blend." 30');
			break;
		}
		await createRecipe({
			title: args[0],
			description: args[1],
			ingredients: args[2].split(',').map(i => i.trim()),
			instructions: args[3],
			prepTimeInMinutes: Number(args[4])
		});
		break;

	case 'list':
		await findAllRecipes();
		break;

	case 'find':
		if (args.length != 1) {
			console.log('Invalid input! Try usage example:\nnode index.js find "Classic Tomato Soup"');
			break;
		}
		await findRecipeByTitle(args[0]);
		break;

	case 'update':
		if (args.length != 2) {
			console.log('Invalid input! Try usage example:\nnode index.js update "Classic Tomato Soup" "A cozy and comforting tomato soup perfect for chilly days."');
			break;
		}
		await updateRecipeDescription(args[0], args[1]);
		break;

	case 'delete':
		if (args.length != 1) {
			console.log('Invalid input! Try usage example:\nnode index.js delete "Classic Tomato Soup"');
			break;
		}
		await deleteRecipe(args[0]);
		break;

	case 'sample':
		await createRecipe({
			title: "Garlic Bread",
			description: "Crispy garlic bread perfect with pasta or soup.",
			ingredients: ["Bread", "Garlic", "Butter", "Parsley"],
			instructions: "Spread garlic butter on bread and bake at 375°F for 10 mins.",
			prepTimeInMinutes: 15
		});
		break;
	}
	await mongoose.connection.close();
	console.log(`Application exit. MongoDB server ${process.env.MONGO_URI} connection closed.`);
}

main();

// Create parameter
async function createRecipe({ title, description, ingredients, instructions, prepTimeInMinutes }) {
	console.log(`\n	Creating the new recipe...
		Title: ${title}
		Description: ${description}
		Ingredients: ${ingredients.join(', ')}
		Instructions: ${instructions}
		Preparation Time: ${prepTimeInMinutes} minutes.\n`);
	try {
		const foundRecipe = await Recipe.findOne({ title });
		if (foundRecipe) {
			console.log(`\n	Recipe "${title}" already exists!\n`);
			return;
		}
		const newRecipe = new Recipe({
			title,
			description,
			ingredients,
			instructions,
			prepTimeInMinutes
		});
		const savedRecipe = await newRecipe.save();
		console.log(`\n	Recipe "${title}" created successfully:\n${savedRecipe}\n`);
	} catch (e) {
		console.error(`\n	Error creating recipe "${title}":\n	${e}\n`);
	}
}

// List parameter
async function findAllRecipes() {
	console.log('\n	Listing all recipes...\n');
	try {
		const allRecipes = await Recipe.find({});
		if (allRecipes.length === 0) {
			console.log('\n	No recipe found!\n');
			return;
		}
		console.log('');
		allRecipes.forEach((r, i) => {
			console.log(`	[${i + 1}] Recipe #${i + 1}:
		Title: ${r.title}
		Description: ${r.description}
		Ingredients: ${r.ingredients.join(', ')}
		Instructions: ${r.instructions}
		Preparation Time: ${r.prepTimeInMinutes} minutes.
		Created Time: ${r.createdAt}\n`);
		});
	} catch (e) {
		console.error(`\n	Error listing all recipes:\n	${e}\n`);
	}
}

// Find parameter
async function findRecipeByTitle(title) {
	console.log(`\n	Searching for recipe "${title}"...\n"`);
	try {
		const foundRecipe = await Recipe.findOne({ title });
		if (foundRecipe) console.log(`\n	Recipe Found:\n${foundRecipe}\n`);
		else console.log(`\n	Recipe "${title}" not found!\n`);
	} catch (e) {
		console.error(`\n	Error finding recipe "${title}":\n	${e}\n`);
	}
}

// Update parameter
async function updateRecipeDescription(title, newDescription) {
	console.log(`\n	Updating description for "${title}", new description "${newDescription}"...\n`);
	try {
		const updatedRecipe = await Recipe.findOneAndUpdate(
			{ title },
			{ description: newDescription },
			{ new: true }
		);

		if (updatedRecipe) console.log(`\n	Recipe updated successfully:\n${updatedRecipe}\n`);
		else console.log(`\n	Recipe "${title}" not updated!\n`);
	} catch (e) {
		console.error(`\n	Error updating recipe "${title}":\n	${e}\n`);
	}
}

// Delete parameter
async function deleteRecipe(title) {
	console.log(`\n	Deleting recipe "${title}"...\n`);
	try {
		const deletedRecipe = await Recipe.findOneAndDelete({ title });
		if (deletedRecipe) console.log(`\n	Successfully deleted recipe "${title}"\n`);
		else console.log(`\n	Recipe "${title}" not found or already deleted!\n`);
	} catch (e) {
		console.error(`\n	Error deleting recipe "${title}":\n	${e}\n`);
	}
}