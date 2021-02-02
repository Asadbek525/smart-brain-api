const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const { handleImage , handleApiCall } = require('./controllers/image');
const { handleProfile } = require('./controllers/profile');
const { handleRegister } = require('./controllers/register');
const { handleSignin } = require('./controllers/signin');

const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'test',
    database: 'smart-brain',
  },
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
/**
 * Home Page
 */
app.get('/', (req, res) => {
  res.json('Success');
});

/**
 * Sign In Page
 */
app.post('/signin', handleSignin(bcrypt, db));
/**
 * Register page
 */
app.post('/register', handleRegister(bcrypt, db));

/**
 * Profile route
 */

app.get('/profile/:id', handleProfile());

/**
 * Image entries
 */

app.put('/image', handleImage(db));
app.post('/imageurl', handleApiCall());

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is listening on port ${process.env.PORT}`);
});
