import express from 'express'
import VideoController from '../controllers/VideoController'
import upload from '../utils/multer'

const router = express.Router()

router.post('/video', upload.single('video'), VideoController.postVideo)

export default router