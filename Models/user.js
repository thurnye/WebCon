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
        picturePath: {
            type: String,
            default: "",
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        Posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        ],
        likedPost: [
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
        location: String,
        Occupation: String,
        viewedProfile: Number,
        impressions: Number,
    },
    {timestamps: true}
);

const User = mongoose.model("User", UserSchema);

export default User;