import User from '../models/UserModel'

interface UserData{
    name: string,
    email: string,
    password: string
}

class UserUseCase{
    async createUser(userData: UserData){
        try{
            const user = await User.create(userData)
            return user
        }
        catch(error){
            throw error
        }
    }

    async findUserByEmail(email: string){
        try{
            const user = await User.findOne({email})
            return user
        }
        catch(error){
            throw error
        }
    }

    async findUserById(id: string){
        try{
            const user = await User.findById(id)
            return user
        }
        catch(error){
            throw error
        }
    }
}

export default new UserUseCase