require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

const logMiddleware = require('./middleware/log')
const userRoutes = require('./routes/user')
const jobsRoutes = require('./routes/jobs')

app.use(logMiddleware);
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server berhasil running di port ${PORT}`);
});

app.use('/user', userRoutes);
app.use('/jobs', jobsRoutes);