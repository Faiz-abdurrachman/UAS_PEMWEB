import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import transactionRoutes from './routes/transactionRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ============ Middleware ============

// Enable CORS for frontend communication
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}));

// Parse JSON request bodies
app.use(express.json());

// Request logging middleware (development aid)
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ============ Routes ============

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'Donation Platform API'
  });
});

// Transaction routes
app.use('/api', transactionRoutes);

// ============ Error Handling ============

// Handle 404 for undefined routes
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// ============ Server Initialization ============

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════╗
║   Donation Platform Backend API                ║
║   Running on: http://localhost:${PORT}            ║
║   Health: http://localhost:${PORT}/api/health     ║
╚════════════════════════════════════════════════╝
  `);
});

export default app;
