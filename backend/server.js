import "dotenv/config";
import connectDB from './db.js';
import validateEnv from './utils/validateEnv.js';
import app from './app.js';

validateEnv();
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));