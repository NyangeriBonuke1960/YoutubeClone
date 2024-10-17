import express from 'express'
import VideoController from '../controllers/VideoController'
import upload from '../utils/multer'

const router = express.Router()

router.post('/video', upload.single('video'), VideoController.postVideo)
router.put('/video/:id', VideoController.updateVideo)
router.delete('/video/:id', VideoController.deleteVideo)

export default router