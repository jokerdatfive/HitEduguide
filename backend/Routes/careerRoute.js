import express from 'express';
import {getCareers,findProgram} from '../controllers/careerController.js';
//import {protect} from '../middleware/authMiddleware.js';
const router = express.Router();


router.post('/getCareer',getCareers);
router.post('/findProgram',findProgram);

export default router;