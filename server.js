require('dotenv').config();

const express = require('express');
const { body, validationResult } = require('express-validator');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  host: process.env.PGHOST,
  port: process.env.PGPORT ? Number(process.env.PGPORT) : undefined,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  ssl: process.env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : undefined,
});

pool.on('error', (error) => {
  console.error('Unexpected PostgreSQL error', error);
});

app.get('/', (req, res) => {
  res.render('index', { errors: null, formData: null });
});

app.post(
  '/submit',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('nickname').notEmpty().withMessage('Nickname is required'),
    body('city').notEmpty().withMessage('City is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('index', {
        errors: errors.array(),
        formData: req.body,
      });
    }

    const { email, nickname, city } = req.body;

    try {
      await pool.query(
        'INSERT INTO users (email, nickname, city) VALUES ($1, $2, $3)',
        [email, nickname, city],
      );

      res.redirect(
        `/confirmation?email=${encodeURIComponent(email)}&nickname=${encodeURIComponent(nickname)}&city=${encodeURIComponent(city)}`,
      );
    } catch (error) {
      console.error('Failed to save user info', error);

      res.status(500).render('index', {
        errors: [
          {
            msg: 'Something went wrong while saving your info. Please try again later.',
            param: 'form',
          },
        ],
        formData: req.body,
      });
    }
  },
);

app.get('/confirmation', (req, res) => {
  res.render('confirmation', {
    email: req.query.email,
    nickname: req.query.nickname,
    city: req.query.city,
  });
});

app.get('/users', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT email, nickname, city, created_at FROM users ORDER BY created_at DESC LIMIT 100',
    );

    res.render('users', {
      users: rows,
      error: null,
    });
  } catch (error) {
    console.error('Failed to retrieve users', error);
    res.status(500).render('users', {
      users: [],
      error: 'Unable to load user list at this time. Please try again later.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
