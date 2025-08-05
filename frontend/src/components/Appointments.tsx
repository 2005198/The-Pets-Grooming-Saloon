import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Appointments.css';

interface Appointment {
  _id: string;
  petName: string;
  serviceType: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  notes?: string;
  price: number;
  createdAt: string;
}

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    petName: '',
    serviceType: 'Hair Grooming',
    appointmentDate: '',
    appointmentTime: '09:00',
    notes: ''
  });
  const [formLoading, setFormLoading] = useState(false);

  const { user } = useAuth();

  const services = [
    { name: 'Hair Grooming', price: 50 },
    { name: 'Nail Trimming', price: 15 },
    { name: 'Bath & Dry', price: 30 },
    { name: 'Full Grooming', price: 80 },
    { name: 'Dental Care', price: 40 },
    { name: 'Flea Treatment', price: 35 }
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/api/appointments/my-appointments');
      setAppointments(response.data.appointments);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch appointments');
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');

    try {
      await axios.post('/api/appointments/schedule', formData);
      setShowBookingForm(false);
      setFormData({
        petName: user?.petName || '',
        serviceType: 'Hair Grooming',
        appointmentDate: '',
        appointmentTime: '09:00',
        notes: ''
      });
      fetchAppointments();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to book appointment');
    } finally {
      setFormLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      await axios.patch(`/api/appointments/${appointmentId}/cancel`);
      fetchAppointments();
    } catch (err) {
      setError('Failed to cancel appointment');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return '#2196F3';
      case 'In Progress': return '#FF9800';
      case 'Completed': return '#4CAF50';
      case 'Cancelled': return '#F44336';
      default: return '#666';
    }
  };

  if (loading) {
    return (
      <div className="appointments-container">
        <div className="loading">Loading appointments...</div>
      </div>
    );
  }

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <h1>My Appointments</h1>
        <button
          className="book-appointment-btn"
          onClick={() => setShowBookingForm(!showBookingForm)}
        >
          {showBookingForm ? 'Cancel' : 'Book New Appointment'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showBookingForm && (
        <div className="booking-form-container">
          <div className="booking-form">
            <h2>Book New Appointment</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="petName">Pet Name</label>
                  <input
                    type="text"
                    id="petName"
                    name="petName"
                    value={formData.petName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter pet name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="serviceType">Service</label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    required
                  >
                    {services.map(service => (
                      <option key={service.name} value={service.name}>
                        {service.name} - ${service.price}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="appointmentDate">Date</label>
                  <input
                    type="date"
                    id="appointmentDate"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="appointmentTime">Time</label>
                  <select
                    id="appointmentTime"
                    name="appointmentTime"
                    value={formData.appointmentTime}
                    onChange={handleInputChange}
                    required
                  >
                    {timeSlots.map(time => (
                      <option key={time} value={time}>
                        {formatTime(time)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="notes">Notes (Optional)</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Any special instructions or requests..."
                  rows={3}
                />
              </div>

              <button type="submit" className="submit-btn" disabled={formLoading}>
                {formLoading ? 'Booking...' : 'Book Appointment'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="appointments-list">
        {appointments.length === 0 ? (
          <div className="no-appointments">
            <h3>No appointments found</h3>
            <p>Book your first appointment to get started!</p>
          </div>
        ) : (
          <div className="appointments-grid">
            {appointments.map(appointment => (
              <div key={appointment._id} className="appointment-card">
                <div className="appointment-header">
                  <h3>{appointment.petName}</h3>
                  <span 
                    className="status"
                    style={{ backgroundColor: getStatusColor(appointment.status) }}
                  >
                    {appointment.status}
                  </span>
                </div>

                <div className="appointment-details">
                  <div className="detail-item">
                    <strong>Service:</strong> {appointment.serviceType}
                  </div>
                  <div className="detail-item">
                    <strong>Date:</strong> {formatDate(appointment.appointmentDate)}
                  </div>
                  <div className="detail-item">
                    <strong>Time:</strong> {formatTime(appointment.appointmentTime)}
                  </div>
                  <div className="detail-item">
                    <strong>Price:</strong> ${appointment.price}
                  </div>
                  {appointment.notes && (
                    <div className="detail-item">
                      <strong>Notes:</strong> {appointment.notes}
                    </div>
                  )}
                </div>

                {appointment.status === 'Scheduled' && (
                  <div className="appointment-actions">
                    <button
                      className="cancel-btn"
                      onClick={() => handleCancelAppointment(appointment._id)}
                    >
                      Cancel Appointment
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
