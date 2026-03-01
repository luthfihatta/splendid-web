import express from 'express';
import { fetchJoobleJobs, fetchAdzunaJobs } from '../controller/jobs.js';
const router = express.Router();

router.post('/api/fetch-jooble', fetchJoobleJobs);
router.post('/api/fetch-adzuna', fetchAdzunaJobs);

export default router;