import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'
dotenv.config()

const accessToken: string | undefined = process.env.ACCESS_TOKEN
const refreshToken: string | undefined = process.env.REFRESH_TOKEN

const getAccessToken = (id: string): string => {
    if(!accessToken){
        throw new Error('Access token secret is unidentified')
    }
    return jwt.sign({id: id}, accessToken, {expiresIn: '30m'})
}

const verifyAccessToken = (req: Request, res: Response, next: NextFunction): void =>  {
    const authHeader = req.headers['authorization']

    if(!authHeader){
        res.status(400).json({error: 'No authorization header provided'})
        return
    }

    const token = authHeader.split(' ')[1]
    if(!token){
        res.status(400).json({error: 'No token provided'})
        return
    }

    if(!accessToken){
        res.status(500).json({error: 'Invalid accessToken'})
        return
    }

    jwt.verify(token, accessToken, (err, decoded) => {
        if(err){
            res.status(400).json({error: 'Invalid or expired token'})
            return
        }
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