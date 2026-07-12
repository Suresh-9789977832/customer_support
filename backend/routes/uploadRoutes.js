import express from 'express'
import { askquestion,uploadfile } from '../controllers/uploadController.js';

const router = express.Router()

router.post('/upload',uploadfile)



export default router