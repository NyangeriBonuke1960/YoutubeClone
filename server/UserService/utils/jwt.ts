import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'
import { error } from 'console'
dotenv.config()

const accessToken: string | undefined = process.env.ACCESS_TOKEN
const refreshToken: string | undefined = process.env.REFRESH_TOKEN

const getAccessToken = (id: string): string => {
    if(!accessToken){
        throw new Error('Access token secret is unidentified')
    }
    return jwt.sign({id: id}, accessToken, {expiresIn: '30m'})
}

const verifyAccessToken = (req: Request, res: Response, next: NextFunction)=> {
    const authHeader = req.headers['authorization']

    if(!authHeader){
        return res.status(400).json({error: 'No authorization header provided'})
    }

    const token = authHeader.split(' ')[1]
    if(!token){
        return res.status(400).json({error: 'No token provided'})
    }

    if(!accessToken){
        return res.status(500).json({error: 'Invalid accessToken'})
    }

    jwt.verify(token, accessToken, (err, decoded) => {
        if(err){
            return {error: 'Invalid or expired token'}
        }
        req.body = decoded
        next()
    })
}

const getRefreshToken = (id: string): string => {
    if(!refreshToken){
        throw new Error('Refresh token secret unidentified')
    }
    return jwt.sign({id: id}, refreshToken, {expiresIn: '30d'})
}

const verifyRefreshToken = (token: string) => {
    if(!token){
        return {error: 'Invalid token'}
    }

    if(!refreshToken){
        return {error: 'Invalid refresh token'}
    }

    jwt.verify(token, refreshToken, (err, decoded) => {
        if(err){
            return {err}
        }
        return decoded
    })
}

export { getAccessToken, getRefreshToken, verifyAccessToken, verifyRefreshToken }