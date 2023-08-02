const mongoose = require('mongoose');
const {Schema} = mongoose;


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
        ref: 'Posts'
    },
    replies: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comments'
        }
    ],
},
{
    timestamps: true
  }
)

module.exports = mongoose.model('Comments', commentsSchema);