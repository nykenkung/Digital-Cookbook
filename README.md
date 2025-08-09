# Digital Cookbook - MongoDB & Mongoose CRUD

### Project Overview  
- This will involve defining a data structure (schema), connecting to a database, implementing CRUD operations with Mongoose.

## Part 1: Project Setup & Database Connection
### Initialize Project:
- Navigate into the directory and run ```npm init -y``` to create a ***package.json*** file.
### Install Dependencies:
- Install ***Mongoose*** and ***dotenv*** (for managing environment variables).
```npm install dotenv mongoose nodemon eslint```
### Set Up Environment Variables:
- Create a file named ***.env*** in the root of project.
- Inside ***.env***, add MongoDB connection string.
- For Local MongoDB: ```MONGO_URI=mongodb://127.0.0.1:27017/digitalCookbookDB```
- For MongoDB Atlas: Get the connection string from Atlas cluster dashboard and replace <password> with database user's password.
```MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/digitalCookbookDB```
### Create the Connection Script (***db.js***)
- Create a file named ***db.js***.
- In this file, use Mongoose to connect to database using the URI from ***.env*** file. Handle both successful connections and connection errors.

## Part 2: Defining the Schema and Model (***models/recipe.js***)
- Create a new directory named ***models***.
- Inside models, create a file named ***recipe.js***.
### Create the Schema
- A recipe has a title, a description, ingredients, cooking instructions, and a cooking time.
### Define a Mongoose Schema for a recipe with the following fields and validation rules
- ***title***: String, required.
- ***description***: String, optional.
- ***ingredients***: An array of Strings, required.
- ***instructions***: String, required.
- ***prepTimeInMinutes***: Number, must be a positive number.
- ***createdAt***: Date, with a default value of the current date/time.
### Create the Model
- In the same ***recipe.js*** file, create and export a Mongoose Model from schema. Name the model "***Recipe***".

## Part 3: Implementing CRUD Operations
- Create a main application file ***index.js*** to run database operations. This file will import database connection and ***Recipe*** model.
### Add a New Recipe
- Write a function ***createRecipe()*** that creates a new recipe document and saves it to the database.
### Use sample data like the following
- **Title:** ***"Classic Tomato Soup"***
- **Description:** ***"A simple and delicious homemade tomato soup."***
- **Ingredients:** ***["Tomatoes", "Onion", "Garlic", "Vegetable Broth", "Olive Oil"]***
- **Instructions:** ***"1. Sauté onions and garlic. 2. Add tomatoes and broth. 3. Simmer and blend."***
- **Prep Time:** ***30 minutes***
### Find Recipes
- Write a function ***findAllRecipes()*** that retrieves and logs all recipes in the database.
- Write a function ***findRecipeByTitle(title)*** that finds and logs a single recipe that matches the given title. Use Mongoose's query methods like ***find()*** and ***findOne()***.
### Modify a Recipe
- Write a function ***updateRecipeDescription(title, newDescription)*** that finds a recipe by its title and updates its description field.
### Remove a Recipe
- Write a function ***deleteRecipe(title)*** that finds a recipe by its title and removes it from the database.
- Log a confirmation message upon successful deletion.

# Installation & Start
1) **Git clone** this repository and locate the server directory:
```
git clone https://github.com/nykenkung/Digital-Cookbook.git
(Windows CMD) cd /d Digital-Cookbook
```
2) Install Dependencies (***Dotenv, Mongoose, Nodemon, ESLint***)
- ***Dotenv*** (Manage environment variables)
- ***Mongoose*** (Interact with MongoDB database)
- ***Nodemon*** (Monitor and automatic restart, usage: ```npm run dev``` or ```nodemon index.js```)
- ***ESLint*** (Analyze static code, usage: ```npm run lint``` or ```npx eslint .```)
```
npm install dotenv mongoose nodemon eslint
```
3) Run MongoDB server if run locally (using Windows Powershell to display in formatting JSON)
```
powershell -Command "<MongoDB server installed directory>\bin\mongod.exe -dbpath=<MongoDB data directory>\data\db | ForEach-Object { try { ($_ | ConvertFrom-Json) | ConvertTo-Json } catch { $_ } }"
```
4) Modify the ***.env*** and add MongoDB connection string
```
(For Local MongoDB) MONGO_URI=mongodb://127.0.0.1:27017/digitalCookbookDB
(For MongoDB Atlas) MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/digitalCookbookDB
```
### 5) Run the backend server, it allows to use commands and parameters after ```npm start``` or ```node index.js (create, list, find, update, delete, sample)```
- **(CREATE)** To add the recipe, use command and 5 parameters after ```npm start create``` or ```node index.js create <title> <description> <ingredient1,ingredient2,...> <instructions> <prepTimeInMinutes>```
```
For Example:
node index.js create "Classic Tomato Soup" "A simple and delicious homemade tomato soup." "Tomatoes,Onion,Garlic,Vegetable Broth,Olive Oil" "1. Sauté onions and garlic. 2. Add tomatoes and broth. 3. Simmer and blend." 30

Added Recipe:
Title: "Classic Tomato Soup"
Description: "A simple and delicious homemade tomato soup."
Ingredients: ["Tomatoes", "Onion", "Garlic", "Vegetable Broth", "Olive Oil"]
Instructions: "1. Sauté onions and garlic. 2. Add tomatoes and broth. 3. Simmer and blend."
Prep Time: 30 minutes
```
- **(LIST)** To see all recipes, use command ```npm start list``` or ```node index.js list```
- **(FIND)** To find the recipe, use command and parameter after ```npm start find``` or ```node index.js find <title>```
```
For Example:
node index.js find "Classic Tomato Soup"
```
- **(UPDATE)** To update recipe description, use command and 2 parameters after ```npm start update``` or ```node index.js update <title> <newDescription>```
```
For Example:
node index.js update "Classic Tomato Soup" "A cozy and comforting tomato soup perfect for chilly days."

Updated Recipe:
Title: "Classic Tomato Soup"
New Description: "A cozy and comforting tomato soup perfect for chilly days."
```
- **(DELETE)** To remove the recipe, use command and parameter after ```npm start delete``` or ```node index.js delete <title>```
```
For Example:
node index.js delete "Classic Tomato Soup"
```
- **(SAMPLE)** To create a sample recipe, use command ```npm start sample``` or ```node index.js sample```
```
For Example:
node index.js sample

Added Sample Recipe:
Title: "Garlic Bread"
Description: "Crispy garlic bread perfect with pasta or soup."
Ingredients: ["Bread", "Garlic", "Butter", "Parsley"]
Instructions: "Spread garlic butter on bread and bake at 375°F for 10 mins."
Prep Time: 15 minutes
```

### Also, it can directly operate database data by MongoDB Shell:
```
mongosh.exe mongodb://localhost:27017/digitalCookbookDB)
```
- **(recipes.insertOne)** Adding the recipe:
```
db.recipes.insertOne({ title: "Classic Tomato Soup", description: "A simple and delicious homemade tomato soup.", ingredients: ["Tomatoes", "Onion", "Garlic", "Vegetable Broth", "Olive Oil"], instructions: "1. Sauté onions and garlic. 2. Add tomatoes and broth. 3. Simmer and blend.", prepTimeInMinutes: 30 })
```
- **(recipes.find)** Listing all recipes in readable format:
```
db.recipes.find().pretty()
```
- **(recipes.updateOne)** Updating the recipe with specific title and new description:
```
db.recipes.updateOne({ title: "Classic Tomato Soup" }, { $set: { description: "A cozy and comforting tomato soup perfect for chilly days." }})
```
- **(recipes.deleteOne)** Deleting the recipe with specific title:
```
db.recipes.deleteOne({ title: "Classic Tomato Soup" })
```
- **(recipes.countDocuments)** Finally, to count the recipe with specific title
```
db.recipes.countDocuments({ title: "Classic Tomato Soup" })
```
- **Bonus 1**: MongoDB Shell executable command to display all documents included in all collections from **current database** in colored formatting JSON (empty output if no record)
```
db.getCollectionNames().forEach(c => {
	db.getCollection(c).find().forEach(doc => {
		print("\n\x1b[36m" + db.getName() + "\x1b[0m => \x1b[33m" + c + "\x1b[0m");
		printjson(doc)
	})
})

// Trimmed To One Line:
db.getCollectionNames().forEach(c=>{db.getCollection(c).find().forEach(doc=>{print("\n\x1b[36m"+db.getName()+"\x1b[0m=>\x1b[33m"+c+"\x1b[0m");printjson(doc)})})
```
Or it can be also ran in **mongosh.exe** by "***--eval***" command
```
mongosh.exe mongodb://127.0.0.1:27017/digitalCookbookDB --eval "db.getCollectionNames().forEach(c=>{db.getCollection(c).find().forEach(doc=>{print('\n\x1b[36m'+db.getName()+'\x1b[0m => \x1b[33m'+c+'\x1b[0m');printjson(doc)})})"
```
- **Bonus 2**: MongoDB Shell executable command to display all documents included in all collections from **all database** in colored formatting JSON
```
db.adminCommand({listDatabases:1}).databases.forEach(d => {
	const c = db.getMongo().getDB(d.name).getCollectionNames();
	c.forEach(c => {
		db.getMongo().getDB(d.name).getCollection(c).find().forEach(doc => {
			print("\n\x1b[36m" + d.name + "\x1b[0m => \x1b[33m" + c + "\x1b[0m");
			printjson(doc)
		})
	})
})

// Trimmed To One Line:
db.adminCommand({listDatabases:1}).databases.forEach(d=>{const c=db.getMongo().getDB(d.name).getCollectionNames();c.forEach(c=>{db.getMongo().getDB(d.name).getCollection(c).find().forEach(doc=>{print("\n\x1b[36m"+d.name+"\x1b[0m => \x1b[33m"+c+"\x1b[0m");printjson(doc)})})})
```
Or it can be also ran in **mongosh.exe** by "***--eval***" command
```
mongosh.exe mongodb://127.0.0.1:27017/digitalCookbookDB --eval "db.adminCommand({listDatabases:1}).databases.forEach(d=>{const c=db.getMongo().getDB(d.name).getCollectionNames();c.forEach(c=>{db.getMongo().getDB(d.name).getCollection(c).find().forEach(doc=>{print('\n\x1b[36m'+d.name+'\x1b[0m => \x1b[33m'+c+'\x1b[0m');printjson(doc)})})})"
```
