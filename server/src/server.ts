import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';

import connectDB from './config/db';
import { errorHandler } from './middleware/errorMiddleware';

// Routes
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import bandRoutes from './routes/bandRoutes';
import rehearsalRoutes from './routes/rehearsalRoutes';
import availabilityRoutes from './routes/availabilityRoutes';

// Connect to MongoDB
connectDB();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bands', bandRoutes);
app.use('/api/rehearsals', rehearsalRoutes);
app.use('/api/availability', availabilityRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../../client/dist');
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// Error handling middleware
app.use(errorHandler);

// Socket.io setup
io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  socket.on('join-band', (bandId) => {
    socket.join(`band-${bandId}`);
    console.log(`User joined band room: band-${bandId}`);
  });

  socket.on('leave-band', (bandId) => {
    socket.leave(`band-${bandId}`);
    console.log(`User left band room: band-${bandId}`);
  });

  socket.on('rehearsal-updated', ({ bandId, rehearsalId }) => {
    socket.to(`band-${bandId}`).emit('rehearsal-changed', { rehearsalId });
  });

  socket.on('availability-updated', ({ bandId, userId }) => {
    socket.to(`band-${bandId}`).emit('availability-changed', { userId });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;