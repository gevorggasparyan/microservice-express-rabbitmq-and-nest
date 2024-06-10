import express from 'express';
import UserController from "../controllers/UserController";
import { userCreateValidation, userUpdateValidation } from '../validations/userValidation';
import { handleValidationErrors } from '../middlewares/validationHandler';
const router = express.Router();

router.get('/users', UserController.getAllUsers);
router.post('/users', userCreateValidation, handleValidationErrors, UserController.createUser);
router.put('/users/:id', userUpdateValidation, handleValidationErrors, UserController.updateUser);

export default router;
