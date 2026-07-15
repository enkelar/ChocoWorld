import "dotenv/config";
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import connectDB from './db.js';
import errorHandler from './middleware/errorHandler.js';
import routes from './routes/index.js';

const app = express();

connectDB();

app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  })
);
app.use(express.json());

app.use('/api', routes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));