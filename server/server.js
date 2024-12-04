const express = require('express');
const connect = require('./config/db')
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

connect()

app.use(express.json());
app.use(cors());


// Routes
app.use('/api/admin',require('./routes/adminRoutes'))
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
