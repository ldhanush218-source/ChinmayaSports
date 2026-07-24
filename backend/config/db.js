const mongoose = require('mongoose');

/**
 * Connect to MongoDB via Mongoose.
 * Reads MONGO_URI from environment variables.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000 // 5 seconds timeout for connection attempt
    });

    console.log(`✅  MongoDB connected: ${conn.connection.host}`);
    console.log(`📦  Database: ${conn.connection.name}`);
    return true;
  } catch (err) {
    console.error(`❌  MongoDB connection error: ${err.message}`);
    console.error(`💡  Tip: If using MongoDB Atlas, make sure your current IP address is whitelisted (0.0.0.0/0 in Atlas Network Access).`);
    console.error(`⚠️  Server will stay running in degraded mode.`);
    return false;
  }
};

// Emit helpful messages on connection events
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected.');
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄  MongoDB reconnected.');
});

module.exports = connectDB;

