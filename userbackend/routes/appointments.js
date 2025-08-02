import express from 'express';
import Appointment from '../models/Appointment.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Create a new appointment
router.post('/schedule', authenticateToken, async (req, res) => {
    try {
        const { petName, serviceType, appointmentDate, appointmentTime, notes } = req.body;
        
        // Service pricing
        const servicePrices = {
            'Hair Grooming': 50,
            'Nail Trimming': 15,
            'Bath & Dry': 30,
            'Full Grooming': 80,
            'Dental Care': 40,
            'Flea Treatment': 35
        };

        // Check if hair grooming slot is already booked
        if (serviceType === 'Hair Grooming') {
            const existingAppointment = await Appointment.findOne({
                appointmentDate: new Date(appointmentDate),
                appointmentTime,
                serviceType: 'Hair Grooming'
            });

            if (existingAppointment) {
                return res.status(400).json({ 
                    message: 'Hair grooming slot already booked for this time' 
                });
            }
        }

        const appointment = new Appointment({
            userId: req.user._id,
            petName,
            serviceType,
            appointmentDate: new Date(appointmentDate),
            appointmentTime,
            notes,
            price: servicePrices[serviceType]
        });

        await appointment.save();
        await appointment.populate('userId', 'username email');

        res.status(201).json({
            message: 'Appointment scheduled successfully',
            appointment
        });
    } catch (error) {
        console.error('Appointment scheduling error:', error);
        res.status(500).json({ message: 'Server error during appointment scheduling' });
    }
});

// Get user's appointments
router.get('/my-appointments', authenticateToken, async (req, res) => {
    try {
        const appointments = await Appointment.find({ userId: req.user._id })
            .sort({ appointmentDate: -1 });

        res.json({ appointments });
    } catch (error) {
        console.error('Get appointments error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get available time slots for a specific date and service
router.get('/available-slots', async (req, res) => {
    try {
        const { date, serviceType } = req.query;
        
        const allSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
        
        if (serviceType === 'Hair Grooming') {
            // For hair grooming, check which slots are already booked
            const bookedAppointments = await Appointment.find({
                appointmentDate: new Date(date),
                serviceType: 'Hair Grooming'
            });
            
            const bookedSlots = bookedAppointments.map(apt => apt.appointmentTime);
            const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));
            
            res.json({ availableSlots });
        } else {
            // For other services, all slots are available
            res.json({ availableSlots: allSlots });
        }
    } catch (error) {
        console.error('Get available slots error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update appointment status
router.patch('/:id/status', authenticateToken, async (req, res) => {
    try {
        const { status } = req.body;
        const appointment = await Appointment.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        appointment.status = status;
        await appointment.save();

        res.json({
            message: 'Appointment status updated',
            appointment
        });
    } catch (error) {
        console.error('Update appointment error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
