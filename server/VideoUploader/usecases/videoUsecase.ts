import mongoose from 'mongoose'
import Video from '../models/VideoModel'

interface VideoDataI{
    title: string,
    videoUrl: string,
    author: mongoose.Types.ObjectId
}

class VideoUseCase{
   async upLoad(videoData: VideoDataI){
        try{
            const video = await Video.create(videoData)
            return video
        }
        catch(error){
            throw error 
        }
   }
}

export default new VideoUseCase