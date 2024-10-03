import { NextFunction, Request, Response } from "express"
import bcrypt from 'bcrypt'
import userUsecase from "../usecases/userUsecase"
import { getAccessToken } from '../utils/jwt'
import { Document } from "mongoose"

interface SignupRequestBody{
    name: string,
    email: string,
    password: string
}

interface LoginRequestBody{
    email: string,
    password: string
}

interface User extends Document {
    _id: string;
    name: string;
    email: string;
    password: string; // Consider removing this from the interface for security
    subscribers: string[];
    subscriptions: string[];
    likedVideos: string[];
    dislikedVideos: string[];
    createdAt: Date; // Change to Date type if applicable
    updatedAt: Date; // Change to Date type if applicable
    __v?: number; // Optional if it might not be present
  }
  

class UserController{
    async signup(req: Request, res: Response){
        try{
            const {name, email, password} = req.body as SignupRequestBody

            if(!name || !email || !password){
                res.status(400).json('Missing credentials')
                return
            }

            const isUser = await userUsecase.findUserByEmail(email)

            if(isUser){
                res.status(400).json('User already exists')
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            const user = await userUsecase.createUser({name, email, password: hashedPassword})
        
            res.status(201).json(user)
        }
        catch(error){
            res.status(500).json(error)
        }
    }

    async login(req: Request, res: Response){
        try{
            const { email, password } = req.body as LoginRequestBody
            if(!email || !password){
                res.status(400).json('Missing credentials')
                return
            }

            const user = await userUsecase.findUserByEmail(email)
            if(!user){
                res.status(400).json('User does not exist')
                return
            }

            const matchPassword = await bcrypt.compare(password, user.password)
            if(!matchPassword){
                res.status(400).json('Wrong password')
                return
            }

            res.status(201).json(user)
        }
        catch(error){
            res.status(500).json(error)
        }
    }
}

export default new UserController