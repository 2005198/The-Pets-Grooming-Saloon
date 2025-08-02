import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    petName: {
        type: String,
        required: true,
        trim: true
    },
    serviceType: {
        type: String,
        required: true,
        enum: ['Hair Grooming', 'Nail Trimming', 'Bath & Dry', 'Full Grooming', 'Dental Care', 'Flea Treatment']
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true,
        enum: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
    },
    status: {
        type: String,
        enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'],
        default: 'Scheduled'
    },
    notes: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

// Ensure no overlapping appointments for hair grooming
appointmentSchema.index({ appointmentDate: 1, appointmentTime: 1, serviceType: 1 }, { 
    unique: true,
    partialFilterExpression: { serviceType: 'Hair Grooming' }
});

export default mongoose.model('Appointment', appointmentSchema);
