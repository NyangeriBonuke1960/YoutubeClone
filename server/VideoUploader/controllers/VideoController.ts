import { Request, Response } from "express";
import mongoose from "mongoose";
import fs from 'fs/promises'
import VideoUseCase from "../usecases/videoUsecase";
import { error } from "console";
import videoUsecase from "../usecases/videoUsecase";
import path from 'path'

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

            const savedVideo = await VideoUseCase.upLoad({title, videoUrl, author})

            res.status(201).json(savedVideo)
        }
        catch(error){
            res.status(500).json(error)
        }
    }

    async updateVideo(req: Request, res: Response): Promise<void>{
        try{
            const id: string = req.params.id
            const title: string = req.body.title
            if(!title){
                res.status(400).json('Enter title')
                return
            }
            const updateVideo = await VideoUseCase.updateVid(id, {title})
            res.status(201).json(updateVideo)
        }
        catch{error}{
            res.status(500).json(error)
        }
    }

    async deleteVideo(req: Request, res: Response): Promise<void>{
        try{
            const id: string = req.params.id
            if(!id){
                res.status(500).json('No video id')
            }
            const video = await videoUsecase.findVid(id)
            const url = path.join(__dirname, '..', video.videoUrl)
            await fs.unlink(url)
            const deletedVid = await VideoUseCase.deleteVid(id)
            
            res.status(201).json(deletedVid)
        }
        catch(error){
            res.status(500).json(error)
        }
    }
}

export default new VideoController