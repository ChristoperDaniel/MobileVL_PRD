import express from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;

// Constants
const SALT_ROUNDS = 10;
const PORT = process.env.PORT || 3000;

// Database configuration using pg Pool
const pool = new Pool({
  host: process.env.DB_HOST || 'autorack.proxy.rlwy.net',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'OgXqdNzosTQyuinjkphLqfVUzvqzTcxp',
  database: process.env.DB_NAME || 'railway',
  port: process.env.DB_PORT || 16662
});

// Test database connection
pool.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1); // Exit the process with failure
  } else {
    console.log('Database connected successfully.');
  }
});

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes

// Register Route
app.post('/api/auth/register', async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const client = await pool.connect();

    try {
      // Check if user already exists
      const userExists = await client.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      if (userExists.rows.length > 0) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      // Insert user
      await client.query(
        'INSERT INTO users (email, name, password) VALUES ($1, $2, $3)',
        [email, name, hashedPassword]
      );

      // Insert quiz status entries
      const quizStatusPromises = Array.from({ length: 5 }, (_, index) => {
        return client.query(
          'INSERT INTO quiz_status (email, quiz_id, status) VALUES ($1, $2, $3)',
          [email, index + 1, 'not completed']
        );
      });
      await Promise.all(quizStatusPromises);

      res.status(201).json({ message: 'User registered successfully' });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update Name Route
app.put('/api/update-name', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    await pool.query('UPDATE users SET name = $1 WHERE email = $2', [name, email]);
    res.json({ success: true, message: 'Name updated successfully' });
  } catch (error) {
    console.error('Error updating name:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({ user: { email: user.email, name: user.name } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update Quiz Status
app.post('/api/quiz/status', async (req, res) => {
  const { quiz_id, status, user_email } = req.body;

  if (!quiz_id || !status || !user_email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingStatus = await pool.query(
      'SELECT * FROM quiz_status WHERE quiz_id = $1 AND email = $2',
      [quiz_id, user_email]
    );

    if (existingStatus.rows.length > 0) {
      await pool.query(
        'UPDATE quiz_status SET status = $1 WHERE quiz_id = $2 AND email = $3',
        [status, quiz_id, user_email]
      );
    } else {
      await pool.query(
        'INSERT INTO quiz_status (quiz_id, email, status) VALUES ($1, $2, $3)',
        [quiz_id, user_email, status]
      );
    }

    res.json({ message: 'Quiz status updated successfully' });
  } catch (error) {
    console.error('Quiz status update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Quiz Status
app.get('/api/quiz/status/:quizId/:userEmail', async (req, res) => {
  const { quizId, userEmail } = req.params;

  try {
    const result = await pool.query(
      'SELECT status FROM quiz_status WHERE quiz_id = $1 AND email = $2',
      [quizId, userEmail]
    );
    const status = result.rows[0]?.status || 'not_started';

    res.json({ status });
  } catch (error) {
    console.error('Quiz status fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello World! The backend is working.');
});