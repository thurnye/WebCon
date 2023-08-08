import mongoose from 'mongoose';
const {Schema} = mongoose


const postsSchema = new Schema({
    post: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    likes: {
        type: Number,
        default: 0
    },
    images: [{
        image: {
            type: String,
        },
        name: {
            type: String,

        }
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        }],
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},
{
    timestamps: true
  }
)

// module.exports = mongoose.model('Posts', postsSchema);

const Post = mongoose.model("Post", postsSchema);

export default Post;