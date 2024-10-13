import mongoose, {Schema, Document} from "mongoose";

interface VideoI extends Document{
    title: string,
    videoUrl: string,
    author: mongoose.Types.ObjectId
}

const VideoSchema: Schema<VideoI> = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        reqired: true
    }
},
{
    timestamps: true
})

export default mongoose.model<VideoI>('Video', VideoSchema)