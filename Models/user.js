import mongoose from 'mongoose';
const {Schema} = mongoose

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 30
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 30
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        picture:{
            avatar: {
                type: String,
    
            },
            name: {
                type: String,
    
            }
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        ],
        likedPosts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        ],
        savedPosts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        ],
        likedComments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],
        mediaPlatforms:[
            {
              name: {
                type: String
              },
              link:{
                type: String
              }
            }
            
          ],
        location: String,
        occupation: String,
        viewedProfile: Number,
        impressions: Number,
    },
    {timestamps: true}
);

const User = mongoose.model("User", UserSchema);

export default User;