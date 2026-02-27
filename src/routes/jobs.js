import express from 'express';
import JobsController from '../controller/jobs.js';
const router = express.Router();

router.get('/api/fetch-jobs', JobsController.getAdzunaJobs);

export default router;