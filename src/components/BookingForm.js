import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
// Removed unused import submitTutorialBooking
import { debugBookingSubmission, testFirestoreConnection } from '../services/debug';
import { toast } from 'react-toastify';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Box
} from '@mui/material';

const BookingForm = ({ open, onClose, tutorId = null, tutorName = "Dr. Joseph Anjili" }) => {
  const { currentUser, userData } = useAuth();
  const [formData, setFormData] = useState({
    studentName: userData?.displayName || '',
    email: currentUser?.email || '',
    phone: '',
    subject: 'Chemistry',
    level: '',
    sessionType: '',
    preferredDate: '',
    preferredTime: '',
    duration: '60',
    notes: '',
    urgency: 'normal',
    groupName: '',
    groupSize: '',
    participantEmails: '' // comma-separated
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subjects = [
    'General Chemistry',
    'Organic Chemistry', 
    'Inorganic Chemistry',
    'Physical Chemistry',
    'Analytical Chemistry',
    'Biochemistry',
    'AP Chemistry',
    'IB Chemistry',
    'GCSE Chemistry',
    'A-Level Chemistry'
  ];

  const levels = [
    'Beginner',
    'Intermediate', 
    'Advanced',
    'GCSE/O-Level',
    'A-Level/AS-Level',
    'IB Diploma',
    'AP Level',
    'University/College',
    'Graduate Level'
  ];

  const sessionTypes = [
    'One-on-One Tutoring',
    'Group Session (2-4 students)',
    'Exam Preparation',
    'Assignment Help',
    'Lab Report Assistance',
    'Concept Review',
    'Problem Solving Session'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check if user is signed in
    if (!currentUser || !currentUser.uid) {
      toast.error('You must be logged in to book a session. Please log in and try again.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Validate required fields
      const requiredFields = ['studentName', 'email', 'phone', 'level', 'sessionType', 'preferredDate', 'preferredTime'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        toast.error('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error('Please enter a valid email address');
        setIsSubmitting(false);
        return;
      }

      // Check if date is in the future (basic validation for date string)
      if (formData.preferredDate) {
        const selectedDate = new Date(formData.preferredDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
          toast.error('Please select a future date');
          setIsSubmitting(false);
          return;
        }
      }

      // Prepare booking data
      const bookingData = {
        ...formData,
        tutorId: tutorId,
        tutorName: tutorName,
        studentId: currentUser?.uid || null,
        estimatedCost: calculateCost(formData.duration, formData.sessionType),
        sessionDetails: {
          subject: formData.subject,
          level: formData.level,
          type: formData.sessionType,
          duration: parseInt(formData.duration),
          urgency: formData.urgency,
          groupName: formData.groupName,
          groupSize: formData.groupSize,
          participantEmails: formData.participantEmails
        }
      };

      // Submit using the debug function first to identify issues
      console.log('🚀 Starting booking submission with debug mode');
      const debugResult = await debugBookingSubmission(bookingData, currentUser);
      
      if (debugResult.success) {
        toast.success('Booking request submitted successfully! You will receive a confirmation email soon.');
        
        // Reset form
        setFormData({
          studentName: userData?.displayName || '',
          email: currentUser?.email || '',
          phone: '',
          subject: 'Chemistry',
          level: '',
          sessionType: '',
          preferredDate: '',
          preferredTime: '',
          duration: '60',
          notes: '',
          urgency: 'normal',
          groupName: '',
          groupSize: '',
          participantEmails: ''
        });

        onClose();
      } else {
        throw new Error(debugResult.error || 'Failed to submit booking');
      }

    } catch (error) {
      console.error('Error submitting booking:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        stack: error.stack
      });
      
      // Provide more specific error messages
      let errorMessage = 'Failed to submit booking. Please try again.';
      
      if (error.message?.includes('permission')) {
        errorMessage = 'Permission denied. Please make sure you are logged in.';
      } else if (error.message?.includes('network')) {
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (error.message?.includes('auth')) {
        errorMessage = 'Authentication error. Please log in again.';
      }
      
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const testConnection = async () => {
    const result = await testFirestoreConnection();
    if (result.success) {
      toast.success('✅ Firebase connection is working!');
    } else {
      toast.error(`❌ Firebase connection failed: ${result.error}`);
    }
  };

  const calculateCost = (duration, sessionType) => {
    const baseCost = 50; // Base cost per hour
    const durationMultiplier = parseInt(duration) / 60;
    const typeMultiplier = sessionType.includes('Group') ? 0.7 : 1;
    return Math.round(baseCost * durationMultiplier * typeMultiplier);
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
        <DialogTitle>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            Book a Tutorial Session
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Schedule a personalized chemistry session with {tutorName}
          </Typography>
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={3}>
              {/* Personal Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom color="primary">
                  Personal Information
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Student Name"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  placeholder="+254 XXX XXX XXX"
                />
              </Grid>

              {/* Academic Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom color="primary" sx={{ mt: 2 }}>
                  Academic Details
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Subject Area</InputLabel>
                  <Select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    label="Subject Area"
                  >
                    {subjects.map((subject) => (
                      <MenuItem key={subject} value={subject}>
                        {subject}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Academic Level</InputLabel>
                  <Select
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    label="Academic Level"
                  >
                    {levels.map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Session Type</InputLabel>
                  <Select
                    name="sessionType"
                    value={formData.sessionType}
                    onChange={handleInputChange}
                    label="Session Type"
                  >
                    {sessionTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {/* Group Lesson Fields - show only if Group Session selected */}
              {formData.sessionType.includes('Group') && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Group Name"
                      name="groupName"
                      value={formData.groupName}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                      placeholder="e.g. Chemistry Study Buddies"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Group Size"
                      name="groupSize"
                      type="number"
                      value={formData.groupSize}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                      inputProps={{ min: 2, max: 10 }}
                      placeholder="Number of students (2-10)"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Participant Emails"
                      name="participantEmails"
                      value={formData.participantEmails}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                      placeholder="Comma-separated emails of group members"
                      helperText="Enter emails of all group members, separated by commas."
                    />
                  </Grid>
                </>
              )}

              {/* Session Scheduling */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom color="primary" sx={{ mt: 2 }}>
                  Session Scheduling
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Preferred Date"
                  name="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Preferred Time"
                  name="preferredTime"
                  type="time"
                  value={formData.preferredTime}
                  onChange={handleInputChange}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Session Duration</InputLabel>
                  <Select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    label="Session Duration"
                  >
                    <MenuItem value="30">30 minutes</MenuItem>
                    <MenuItem value="60">1 hour</MenuItem>
                    <MenuItem value="90">1.5 hours</MenuItem>
                    <MenuItem value="120">2 hours</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Urgency</InputLabel>
                  <Select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    label="Urgency"
                  >
                    <MenuItem value="normal">Normal</MenuItem>
                    <MenuItem value="urgent">Urgent (within 24 hours)</MenuItem>
                    <MenuItem value="flexible">Flexible timing</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Additional Notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  multiline
                  rows={3}
                  placeholder="Any specific topics, difficulties, or requirements you'd like to discuss..."
                  variant="outlined"
                />
              </Grid>

              {/* Cost Estimate */}
              <Grid item xs={12}>
                <Box sx={{ mt: 2, p: 2, backgroundColor: 'primary.50', borderRadius: 1 }}>
                  <Typography variant="h6" color="primary">
                    Estimated Cost: ${calculateCost(formData.duration, formData.sessionType)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Final cost will be confirmed upon booking approval
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ p: 3 }}>
            <Button onClick={testConnection} color="info" variant="outlined" disabled={isSubmitting}>
              Test Connection
            </Button>
            <Button onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={isSubmitting}
              sx={{ minWidth: 120 }}
            >
              {isSubmitting ? 'Booking...' : 'Book Session'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };

export default BookingForm;
