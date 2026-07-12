import express from 'express'
import protectRoute from '../Middleware/middleware.js'
import { createLogin, createSignup,getsingleidData } from '../controllers/authController.js';

const router = express.Router();

router.post('/login',createLogin)

router.post('/signup',createSignup)

router.get('/getprofile',protectRoute,getsingleidData)


export default router


