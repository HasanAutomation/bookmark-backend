require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// routes
const bookmarks = require('./routes/bookmark');
const errorHandler = require('./middleware/error');

// database
connectDB();

// middlewares
app.use(morgan('dev'));
app.use(express.json());

// mount routes
app.use('/api/v1/bookmarks', bookmarks);

// error
app.use(errorHandler);

// entry endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to bookmark api' });
});

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
