import express from 'express';
import  {signupUser, loginUser}  from '../controller/user-controller.js';
import { uploadImage } from '../controller/image-controller.js';
import upload from '../utils/upload.js'
const router = express.Router();
// post(endpoint, callback function) have to mention the api will used in this call back funcion
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/file/upload',upload.single('file'), uploadImage)

export default router;