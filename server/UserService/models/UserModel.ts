import mongoose, {Schema, Document} from "mongoose";

interface Iuser extends Document{
    name: string;
    userName?: string;
    email: string;
    password: string;
    subscribers: mongoose.Types.ObjectId[];
    subscriptions: mongoose.Types.ObjectId[];
    likedVideos: mongoose.Types.ObjectId[];
    dislikedVideos: mongoose.Types.ObjectId[];
}

const UserSchema: Schema<Iuser> = new mongoose.Schema({
    name: {
        type: String,
    },
    userName: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    subscribers: [
        {
            ref: 'User',
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    subscriptions: [
        {
            ref: 'User',
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    likedVideos: [
        {
            ref: 'Video',
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    dislikedVideos: [
        {
            ref: 'Video',
            type: mongoose.Schema.Types.ObjectId
        }
    ]
},
{
    timestamps: true
})

export default mongoose.model<Iuser>('User', UserSchema)