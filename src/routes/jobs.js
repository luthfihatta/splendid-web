import express from 'express';
import { fetchJoobleJobs, fetchAdzunaJobs, getPublicJobs } from '../controller/jobs.js';
const router = express.Router();

router.get('/api/jobs', getPublicJobs);
router.post('/api/fetch-jooble', fetchJoobleJobs);
router.post('/api/fetch-adzuna', fetchAdzunaJobs);

export default router;