const mongoose = require('mongoose');
const {Schema} = mongoose;


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
        type: Number
    },
    images: [{
        type: String
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comments',
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

module.exports = mongoose.model('Posts', postsSchema);