const express = require('express');
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');

const router = express.Router();

// Create appointment
router.post('/', auth, async (req, res) => {
  try {
    const { petName, petType, service, appointmentDate, appointmentTime, specialInstructions } = req.body;

    // Service prices
    const servicePrices = {
      'Basic Grooming': 50,
      'Full Grooming': 80,
      'Nail Trimming': 25,
      'Teeth Cleaning': 40,
      'Flea Treatment': 60,
      'Special Care': 100
    };

    const appointment = new Appointment({
      user: req.user._id,
      petName,
      petType,
      service,
      appointmentDate,
      appointmentTime,
      specialInstructions,
      totalPrice: servicePrices[service] || 50
    });

    await appointment.save();
    await appointment.populate('user', 'name email phone');

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user appointments
router.get('/', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id })
      .populate('user', 'name email phone')
      .sort({ appointmentDate: -1 });

    res.json({ appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get appointment by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('user', 'name email phone');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update appointment
router.put('/:id', auth, async (req, res) => {
  try {
    const { petName, petType, service, appointmentDate, appointmentTime, specialInstructions } = req.body;

    const servicePrices = {
      'Basic Grooming': 50,
      'Full Grooming': 80,
      'Nail Trimming': 25,
      'Teeth Cleaning': 40,
      'Flea Treatment': 60,
      'Special Care': 100
    };

    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      {
        petName,
        petType,
        service,
        appointmentDate,
        appointmentTime,
        specialInstructions,
        totalPrice: servicePrices[service] || 50
      },
      { new: true }
    ).populate('user', 'name email phone');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({
      message: 'Appointment updated successfully',
      appointment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel appointment
router.delete('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { status: 'Cancelled' },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
