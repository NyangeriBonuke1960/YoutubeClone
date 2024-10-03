import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const accessToken: string | undefined = process.env.ACCESSTOKEN
const refreshToken: string | undefined = process.env.REFRESHTOKEN

const getAccessToken = (id: string) => {
    if(!accessToken){
        throw new Error('Access token secret is unidentified')
    }
    return jwt.sign({id}, accessToken, {expiresIn: '30m'})
}

const getRefreshToken = (id: string) => {
    if(!refreshToken){
        throw new Error('Refresh token secret unidentified')
    }
    return jwt.sign({id}, refreshToken, {expiresIn: '30d'})
}

export { getAccessToken, getRefreshToken}