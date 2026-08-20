const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const connectDB = require('./config/db');

// Connect to Database
connectDB();

// Register Models
require('./models/User');
require('./models/Admin');
require('./models/Job');
require('./models/Application');
require('./models/Company');
require('./models/Skill');

const app = express();

// CORS — allow Netlify frontend and localhost dev
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://centennial-infotech-hiring-new.netlify.app',
    'https://centennial-infotech-staff-hiring.vercel.app',
    'https://centennial-infotech-hiring.vercel.app',
    'https://career.centennialinfotech.com',
    'https://centennialinfotech.com',
    process.env.FRONTEND_URL // optional: set this in Render env vars for flexibility
].filter(Boolean); // remove undefined

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl, Postman)
        if (!origin) return callback(null, true);
        if (
            allowedOrigins.includes(origin) || 
            origin === 'https://centennialinfotech.com' || 
            origin.endsWith('.centennialinfotech.com')
        ) {
            return callback(null, true);
        }
        return callback(new Error(`CORS policy blocked origin: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// Basic Route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Job Portal API' });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));



// Port configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
