import express from 'express'
import UserController from '../controllers/userController'
import { verifyAccessToken } from '../utils/jwt'

const router = express.Router()

router.post('/signup', UserController.signup)
router.post('/login', UserController.login)
router.delete('/user/:id', verifyAccessToken, UserController.deleteAccount)


export default router