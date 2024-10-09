import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import userUsecase from "../usecases/userUsecase"
import { getAccessToken, getRefreshToken } from '../utils/jwt'
import { ObjectId } from "mongoose"

interface SignupRequestBody{
    name: string,
    email: string,
    password: string
}

interface LoginRequestBody{
    email: string,
    password: string
}
  

class UserController{
    async signup(req: Request, res: Response): Promise<void>{
        try{
            const {name, email, password} = req.body as SignupRequestBody

            if(!name || !email || !password){
                res.status(400).json('Missing credentials')
                return
            }

            const isUser = await userUsecase.findUserByEmail(email)

            if(isUser){
                res.status(400).json('User already exists')
                return
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            const user = await userUsecase.createUser({name, email, password: hashedPassword})
            const accessToken: string = getAccessToken((user._id as ObjectId).toString())
            const refreshToken: string = getRefreshToken((user._id as ObjectId).toString())
            res.status(201).json({user, accessToken, refreshToken})
        }
        catch(error){
            res.status(500).json(error)
        }
    }

    async login(req: Request, res: Response): Promise<void>{
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

            const accessToken: string = getAccessToken((user._id as ObjectId).toString())
            const refreshToken: string = getRefreshToken((user._id as ObjectId).toString())
            res.status(201).json({user, accessToken, refreshToken})
        }
        catch(error){
            res.status(500).json(error)
        }
    }

    async deleteAccount(req: Request, res: Response){
        const { id } = req.params
        try{
            await userUsecase.deleteUserById(id)
            res.status(200).json('User deleted')
        }
        catch(error){
            res.status(500).json(error)
        }
    }
}

export default new UserController