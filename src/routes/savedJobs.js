import express from "express";
import { saveJob, getMySavedJobs, unsaveJob } from "../controller/savedJobs.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/', verifyToken, saveJob);
router.get('/', verifyToken, getMySavedJobs);
router.delete('/:jobId', verifyToken, unsaveJob);

export default router;