import 'dotenv/config'
import express from "express";
const app = express();
const PORT = process.env.PORT || 4000;

import logMiddleware from './middleware/log.js'; 
import userRoutes from './routes/user.js';
import jobsRoutes from './routes/jobs.js';
import savedJobsRoutes from './routes/savedJobs.js';

app.use(logMiddleware);
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server berhasil running di port ${PORT}`);
});

app.use('/user', userRoutes);
app.use('/jobs', jobsRoutes);
app.use('/saved-jobs', savedJobsRoutes);