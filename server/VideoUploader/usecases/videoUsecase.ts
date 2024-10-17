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

   async updateVid(id: string, updateFields: object){
        try{
            const video = await Video.findByIdAndUpdate(id, {$set: updateFields}, {new: true})
            if(!video){
                throw new Error('Video not found')
            }
            return video
        }
        catch(error){
            throw error
        }
   }

   async deleteVid(id: string){
        try{
            const video = await Video.findByIdAndDelete(id)
            if(!video){
                throw new Error('Video does not exist')
            }
            return video
        }
        catch(error){
            throw error
        }
   }

   async findVid(id: string){
        try{
            const video = await Video.findById(id)
            if(!video){
                throw new Error('Video does not exist')
            }
            return video
        }
        catch(error){
            throw error
        }
   }
}

export default new VideoUseCase