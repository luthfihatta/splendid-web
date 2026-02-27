import express from 'express';
import { register, login } from '../controller/user.js';
const router = express.Router();

router.get('/', register);

router.post('/', login);


export default router;