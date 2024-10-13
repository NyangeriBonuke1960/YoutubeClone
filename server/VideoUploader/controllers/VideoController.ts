import { Request, Response } from "express";
import mongoose from "mongoose";
import videoUsecase from "../usecases/videoUsecase";

interface VideoDataI{
    title: string,
    author: mongoose.Types.ObjectId
}

class VideoController{
    async postVideo(req: Request, res: Response): Promise<void>{
        try{
            const {title, author} = req.body as VideoDataI
            if(!req.file){
                res.status(400).json({message: 'No video uploaded'})
                return
            }
            const videoUrl = `/uploads/videos/${req.file.filename}`

            const savedVideo = await videoUsecase.upLoad({title, videoUrl, author})

            res.status(201).json(savedVideo)
        }
        catch(error){
            res.status(500).json(error)
        }
    }
}

export default new VideoController