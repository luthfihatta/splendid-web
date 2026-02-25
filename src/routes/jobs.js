const express = require('express');
const JobsController = require('../controller/jobs');
const router = express.Router();

router.get('/api/fetch-jobs', JobsController.getAdzunaJobs);

module.exports = router;