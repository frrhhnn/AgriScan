const Hapi = require('@hapi/hapi');
const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');

// Konfigurasi MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/agri_scan';
const client = new MongoClient(mongoUri);
let db;

// Array sementara (fallback jika tidak ada database)
let users = [];

const init = async () => {
  // Koneksi ke MongoDB
  try {
    await client.connect();
    db = client.db('agri_scan');
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    // Lanjutkan tanpa database (gunakan array)
  }

  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: true, // Aktifkan CORS untuk frontend
    },
  });

  // Route: API Info
  server.route({
    method: 'GET',
    path: '/api',
    handler: (request, h) => {
      return { message: 'Welcome to the AgriScan API!' };
    },
  });

  // Route: Register (RESTful: POST /api/users)
  server.route({
    method: 'POST',
    path: '/api/users',
    handler: async (request, h) => {
      const { username, password, email, full_name } = request.payload;

      // Validasi input
      if (!username || !password || !email || !full_name) {
        return h.response({ error: 'Username, password, email, and full name are required' }).code(400);
      }

      // Validasi format email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return h.response({ error: 'Invalid email format' }).code(400);
      }

      try {
        // Jika terkoneksi ke MongoDB
        if (db) {
          const usersCollection = db.collection('users');

          // Cek apakah username atau email sudah ada
          const existingUser = await usersCollection.findOne({ $or: [{ username }, { email }] });
          if (existingUser) {
            return h.response({ error: 'Username or email already exists' }).code(400);
          }

          // Hash password
          const hashedPassword = await bcrypt.hash(password, 10);

          // Simpan pengguna ke MongoDB
          await usersCollection.insertOne({
            username,
            password: hashedPassword,
            email,
            full_name,
            created_at: new Date(),
          });

          return h.response({ message: 'User registered successfully' }).code(201);
        } else {
          // Fallback ke array
          if (users.find(user => user.username === username || user.email === email)) {
            return h.response({ error: 'Username or email already exists' }).code(400);
          }

          const hashedPassword = await bcrypt.hash(password, 10);
          users.push({ username, password: hashedPassword, email, full_name, created_at: new Date() });
          return h.response({ message: 'User registered successfully' }).code(201);
        }
      } catch (err) {
        console.error(err);
        return h.response({ error: 'Internal server error' }).code(500);
      }
    },
  });

  // Route: Login (RESTful: POST /api/auth/login)
  server.route({
    method: 'POST',
    path: '/api/auth/login',
    handler: async (request, h) => {
      const { username, password } = request.payload;

      // Validasi input
      if (!username || !password) {
        return h.response({ error: 'Username and password are required' }).code(400);
      }

      try {
        // Jika terkoneksi ke MongoDB
        if (db) {
          const usersCollection = db.collection('users');
          const user = await usersCollection.findOne({ username });
          if (!user) {
            return h.response({ error: 'Invalid username or password' }).code(401);
          }

          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            return h.response({ error: 'Invalid username or password' }).code(401);
          }

          return h.response({
            message: 'Login successful',
            user: { username: user.username, email: user.email, full_name: user.full_name },
          }).code(200);
        } else {
          // Fallback ke array
          const user = users.find(u => u.username === username);
          if (!user) {
            return h.response({ error: 'Invalid username or password' }).code(401);
          }

          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            return h.response({ error: 'Invalid username or password' }).code(401);
          }

          return h.response({
            message: 'Login successful',
            user: { username, email: user.email, full_name: user.full_name },
          }).code(200);
        }
      } catch (err) {
        console.error(err);
        return h.response({ error: 'Internal server error' }).code(500);
      }
    },
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

process.on('SIGINT', async () => {
  await client.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});

init()