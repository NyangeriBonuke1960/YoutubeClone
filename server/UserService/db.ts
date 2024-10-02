import mongoose from 'mongoose'


mongoose.connect('mongodb://localhost:27017/ytuserservice')
.then(() => {
    console.log('connected to mongodb')
})
.catch((error) => {
    console.log(error)
})