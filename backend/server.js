import cookieParser from 'cookie-parser';
import "dotenv/config";
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import connectDB from './db.js';
import errorHandler from './middleware/errorHandler.js';
import routes from './routes/index.js';
import validateEnv from './utils/validateEnv.js';

validateEnv();
const app = express();

connectDB();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', process.env.R2_PUBLIC_URL || '', 'https://images.unsplash.com'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        connectSrc: ["'self'"],
        frameSrc: ["'self'", 'https://www.google.com'], // contact page map embeds
        scriptSrc: ["'self'"],
      },
    },
    crossOriginResourcePolicy: { policy: 'cross-origin' }, // needed for R2-hosted images to render
  })
);
app.use(compression());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/api', routes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));