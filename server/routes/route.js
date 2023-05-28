import express from 'express';
import  {signupUser, loginUser}  from '../controller/user-controller.js';
const router = express.Router();
// post(endpoint, callback function) have to mention the api will used in this call back funcion
router.post('/signup', signupUser);
router.post('/login', loginUser)

export default router;