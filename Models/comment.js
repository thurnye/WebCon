import mongoose from 'mongoose';
const {Schema} = mongoose


const commentsSchema = new Schema({
    comment: {
        type: String,
        require: true
    },
    user: { 
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    post: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    },
    likes: {
        type: Schema.Types.Number
    },
    replies: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
},
{
    timestamps: true
  }
)
const Comment = mongoose.model('Comment', commentsSchema);

export default Comment;