const mongoose = require('mongoose');
require('dotenv').config();	// Loads environment variables from .env file

// Connect to the MongoDB cluster
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log(`Connect to MongoDB server "${process.env.MONGO_URI}" successfully!`))
.catch(err => console.error(`Failed to connect to MongoDB server "${process.env.MONGO_URI}".\nError: `, err));