const express = require('express');
const groceriesRoutes = require('./routes/api/groceriesRoutes');
const usersRoutes = require('./routes/api/usersRoutes');
const authRoutes = require('./routes/api/authRoutes');
const connectDB = require('./config/connectDB');
const cors = require('cors');

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use('/api/groceries', groceriesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);

app.listen(5001, () => {
  console.log('Server started');
});
