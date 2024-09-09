import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

//* USE LIKE THIS:
//* node seeder -i
//* node seeder -d

//! Load env vars
dotenv.config({ path: '.env' });

//! Load models
import Cat from './models/CatModel.js';  // Use `import` instead of `require`

//! Connect to DB
mongoose.connect(process.env.MONGO_URI);

//! Handle __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//! Read JSON files
const cats = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/cats.json`, 'utf-8')
);

//! Import into DB
const importData = async () => {
    try {
        await Cat.create(cats);
        console.info('SEEDER: Data Imported...');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);  // Exit with failure
    }
};

//! Delete data
const deleteData = async () => {
    try {
        await Cat.deleteMany();
        console.log('SEEDER: Data Destroyed...');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);  // Exit with failure
    }
};

//! Check command-line arguments
if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}
