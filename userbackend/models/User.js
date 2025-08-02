import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    petName: {
        type: String,
        required: true,
        trim: true
    },
    petType: {
        type: String,
        required: true,
        enum: ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other']
    },
    petBreed: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);
