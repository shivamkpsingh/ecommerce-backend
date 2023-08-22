import express from 'express';
import {registerController, loginController, testController} from '../controllers/authController.js';
import {requireSignin, isAdmin} from '../middleware/authMiddleware.js';

const router = express.Router();

//Routing
// REGISER || POST
router.post('/register',registerController);
// LOGIN || POST
router.post('/login',loginController);
router.get('/test',requireSignin, isAdmin, testController)

export default router;