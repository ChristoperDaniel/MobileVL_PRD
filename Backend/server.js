const express = require('express');
const path = require('path');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const cors = require('cors');

// Constants
const SALT_ROUNDS = 10;
const PORT = process.env.PORT || 3001;

// Database configuration
const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'localedulab'
  }
});

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Your routes go here...

// Test database connection
db.raw('SELECT 1')
  .then(() => {
    console.log('Database connected successfully.');
    
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit the process with failure
  });

app.post('/api/auth/register', async (req, res) => {
    const { email, name, password } = req.body;
    console.log('tes');
    
    // Start a transaction to ensure both operations succeed or fail together
    const trx = await db.transaction();
  
    try {
      // Input validation
      if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      // Check if user already exists
      const existingUser = await trx('users').where({ email }).first();
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  
      // Insert new user
      await trx('users').insert({
        email,
        name,
        password: hashedPassword
      });
  
      // Create quiz status entries
      const quizStatusEntries = Array.from({ length: 5 }, (_, index) => ({
        email,
        quiz_id: index + 1,
        status: 'not completed'
      }));
  
      await trx('quiz_status').insert(quizStatusEntries);
  
      // Commit the transaction
      await trx.commit();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      // Rollback the transaction in case of error
      await trx.rollback();
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

// API to Input Name
app.put('/api/update-name', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.json('Name and email fields are required');
  }

  try {
    // Update name for the user
    await db('users').where({ email }).update({ name });

    res.json({ success: true, message: 'Name updated successfully' });
  } catch (error) {
    res.json('Error updating name');
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Input validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await db('users').where({ email }).first();
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({
      user: {
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Quiz Status Routes
app.post('/api/quiz/status', async (req, res) => {
  const { quiz_id, status, user_email } = req.body;

  try {
    // Check if status already exists
    const existingStatus = await db('quiz_status')
      .where({ quiz_id, user_email })
      .first();

    if (existingStatus) {
      // Update existing status
      await db('quiz_status')
        .where({ quiz_id, user_email })
        .update({ status });
    } else {
      // Create new status
      await db('quiz_status').insert({
        quiz_id,
        user_email,
        status
      });
    }

    res.json({ message: 'Quiz status updated successfully' });
  } catch (error) {
    console.error('Quiz status update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/quiz/status/:quizId/:userEmail', async (req, res) => {
  const { quizId, userEmail } = req.params;

  try {
    const status = await db('quiz_status')
      .where({ quiz_id: quizId, user_email: userEmail })
      .first();

    res.json({ status: status ? status.status : 'not_started' });
  } catch (error) {
    console.error('Quiz status fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});