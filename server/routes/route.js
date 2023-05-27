import express from 'express';
import  {signupUser}  from '../controller/user-controller.js';
const router = express.Router();
// post(endpoint, callback function) have to mention the api will used in this call back funcion
router.post('/signup', signupUser)

export default router;