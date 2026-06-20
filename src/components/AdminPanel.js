import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  getContactSubmissions, 
  getTutorialBookings, 
  updateContactSubmissionStatus, 
  updateBookingStatus,
  getBookingStats 
} from '../services/booking';
import { getQuestions } from '../services/questions';
import { sendContactResponse } from '../services/email';
// Removed test-admin-response import (module not found)
import { toast } from 'react-toastify';
import {
  Container,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import QuestionIcon from '@mui/icons-material/HelpOutline';
import CheckIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ViewIcon from '@mui/icons-material/Visibility';

const AdminPanel = () => {
  const { userRole, currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sendingEmail, setSendingEmail] = useState(false);

  // Load data when component mounts or when activeTab/statusFilter changes
  useEffect(() => {
    if (currentUser && (userRole === 'admin' || userRole === 'teacher')) {
      loadData();
    }
  }, [activeTab, statusFilter, currentUser, userRole]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 0) {
        // Load contact submissions
        const contactData = statusFilter === 'all' 
          ? await getContactSubmissions() 
          : await getContactSubmissions(statusFilter);
        setContacts(contactData);
      } else if (activeTab === 1) {
        // Load bookings
        const bookingFilters = statusFilter === 'all' ? {} : { status: statusFilter };
        const bookingData = await getTutorialBookings(bookingFilters);
        setBookings(bookingData);
      } else if (activeTab === 2) {
        // Load questions
        const questionsData = await getQuestions();
        setQuestions(questionsData);
      } else if (activeTab === 3) {
        // Load statistics
        const statsData = await getBookingStats();
        setStats(statsData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // Check if user has admin access
  if (!currentUser) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="warning">Please log in to access the admin panel.</Alert>
      </Container>
    );
  }

  if (userRole !== 'admin' && userRole !== 'teacher') {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">Access denied. Admin or teacher role required.</Alert>
      </Container>
    );
  }

  const handleContactAction = async (contactId, action) => {
    try {
      if (action === 'mark_read') {
        await updateContactSubmissionStatus(contactId, 'read');
        toast.success('Marked as read');
      } else if (action === 'respond') {
        const contact = contacts.find(c => c.id === contactId);
        setSelectedItem(contact);
        setDialogOpen(true);
      }
      loadData();
    } catch (error) {
      toast.error('Failed to update contact');
    }
  };

  const handleBookingAction = async (bookingId, action) => {
    try {
      if (action === 'confirm') {
        await updateBookingStatus(bookingId, 'confirmed');
        toast.success('Booking confirmed');
      } else if (action === 'cancel') {
        await updateBookingStatus(bookingId, 'cancelled');
        toast.success('Booking cancelled');
      } else if (action === 'complete') {
        await updateBookingStatus(bookingId, 'completed');
        toast.success('Booking marked as completed');
      } else if (action === 'view') {
        const booking = bookings.find(b => b.id === bookingId);
        setSelectedItem(booking);
        setDialogOpen(true);
      }
      loadData();
    } catch (error) {
      toast.error('Failed to update booking');
    }
  };

  const handleSendResponse = async () => {
    if (!selectedItem || !responseMessage.trim()) {
      toast.error('Please enter a response message');
      return;
    }

    setSendingEmail(true);
    try {
      // First, update the database status
      await updateContactSubmissionStatus(
        selectedItem.id, 
        'replied', 
        responseMessage
      );

      // Then open email client with pre-filled message
      try {
        await sendContactResponse(selectedItem, responseMessage);
        
        // Clear instruction for manual mailto system
        toast.success(`📧 Email client opened with message to ${selectedItem.email}`, {
          autoClose: 3000
        });
        
        toast.info('� IMPORTANT: Click "Send" in your email app to complete the response!', {
          autoClose: 10000,
          style: {
            backgroundColor: '#fff3cd',
            color: '#856404',
            border: '1px solid #ffeaa7'
          }
        });
        
      } catch (emailError) {
        console.warn('Email client failed:', emailError);
        toast.error(`Failed to open email client. Please manually email: ${selectedItem.email}`);
      }

      setDialogOpen(false);
      setResponseMessage('');
      setSelectedItem(null);
      loadData();
      
    } catch (error) {
      console.error('Failed to save response:', error);
      toast.error('Failed to save response to database');
    } finally {
      setSendingEmail(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'error';
      case 'pending': return 'warning';
      case 'confirmed': return 'info';
      case 'completed': return 'success';
      case 'cancelled': return 'default';
      case 'read': return 'primary';
      case 'replied': return 'success';
      default: return 'default';
    }
  };

  const renderContactsTab = () => (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Contact Submissions</Typography>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Status"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="new">New</MenuItem>
            <MenuItem value="read">Read</MenuItem>
            <MenuItem value="replied">Replied</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Submitted</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>{contact.fullName}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.subject}</TableCell>
                  <TableCell>
                    <Chip 
                      label={contact.status} 
                      color={getStatusColor(contact.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{formatDate(contact.submittedAt)}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      startIcon={<ViewIcon />}
                      onClick={() => handleContactAction(contact.id, 'respond')}
                      sx={{ mr: 1 }}
                    >
                      View
                    </Button>
                    {contact.status === 'new' && (
                      <Button
                        size="small"
                        startIcon={<CheckIcon />}
                        onClick={() => handleContactAction(contact.id, 'mark_read')}
                      >
                        Mark Read
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );

  const renderBookingsTab = () => (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Tutorial Bookings</Typography>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Status"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="confirmed">Confirmed</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Date & Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Cost</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.studentName}</TableCell>
                  <TableCell>{booking.subject}</TableCell>
                  <TableCell>{booking.level}</TableCell>
                  <TableCell>
                    {booking.preferredDate && formatDate(booking.preferredDate)}
                    {booking.preferredTime ? ` ${booking.preferredTime}` : ''}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={booking.status} 
                      color={getStatusColor(booking.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>${booking.estimatedCost}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      startIcon={<ViewIcon />}
                      onClick={() => handleBookingAction(booking.id, 'view')}
                      sx={{ mr: 1 }}
                    >
                      View
                    </Button>
                    {booking.status === 'pending' && (
                      <>
                        <Button
                          size="small"
                          startIcon={<CheckIcon />}
                          onClick={() => handleBookingAction(booking.id, 'confirm')}
                          sx={{ mr: 1 }}
                        >
                          Confirm
                        </Button>
                        <Button
                          size="small"
                          startIcon={<CancelIcon />}
                          onClick={() => handleBookingAction(booking.id, 'cancel')}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                    {booking.status === 'confirmed' && (
                      <Button
                        size="small"
                        onClick={() => handleBookingAction(booking.id, 'complete')}
                      >
                        Complete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );

  const renderStatsTab = () => (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>Analytics & Statistics</Typography>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Bookings
                </Typography>
                <Typography variant="h4" component="div">
                  {stats.total || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Pending Requests
                </Typography>
                <Typography variant="h4" component="div" color="warning.main">
                  {stats.pending || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Completed Sessions
                </Typography>
                <Typography variant="h4" component="div" color="success.main">
                  {stats.completed || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Revenue
                </Typography>
                <Typography variant="h4" component="div" color="primary.main">
                  ${stats.revenue || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Average Rating
                </Typography>
                <Typography variant="h4" component="div">
                  {stats.averageRating || 'N/A'} ⭐
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Cancellation Rate
                </Typography>
                <Typography variant="h4" component="div">
                  {stats.total > 0 ? ((stats.cancelled || 0) / stats.total * 100).toFixed(1) : 0}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );

  // Render Questions Tab
  const renderQuestionsTab = () => {
    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 3 }}>Submitted Questions</Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Question</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell>{q.fullName || q.authorName || '-'}</TableCell>
                    <TableCell>{q.email || '-'}</TableCell>
                    <TableCell>{q.subject || q.title || '-'}</TableCell>
                    <TableCell>{q.question || q.content || '-'}</TableCell>
                    <TableCell>{q.createdAt && q.createdAt.toDate ? q.createdAt.toDate().toLocaleString() : '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Panel
      </Typography>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => {
            setActiveTab(newValue);
            setStatusFilter('all');
          }}
          aria-label="admin panel tabs"
        >
          <Tab icon={<EmailIcon />} label="Contacts" />
          <Tab icon={<ScheduleIcon />} label="Bookings" />
          <Tab icon={<QuestionIcon />} label="Questions" />
          <Tab icon={<AnalyticsIcon />} label="Statistics" />
        </Tabs>
        <Box sx={{ p: 3 }}>
          {activeTab === 0 && renderContactsTab()}
          {activeTab === 1 && renderBookingsTab()}
          {activeTab === 2 && renderQuestionsTab()}
          {activeTab === 3 && renderStatsTab()}
        </Box>
      </Paper>
      {/* Detail Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          {selectedItem?.fullName ? 'Contact Details' : 'Booking Details'}
        </DialogTitle>
        <DialogContent>
          {selectedItem && (
            <Box sx={{ mt: 2 }}>
              {selectedItem.fullName ? (
                // Contact details
                <>
                  <Typography><strong>Name:</strong> {selectedItem.fullName}</Typography>
                  <Typography><strong>Email:</strong> {selectedItem.email}</Typography>
                  <Typography><strong>Subject:</strong> {selectedItem.subject}</Typography>
                  <Typography><strong>Message:</strong></Typography>
                  <Box sx={{ p: 2, backgroundColor: 'grey.100', borderRadius: 1, mt: 1, mb: 2 }}>
                    {selectedItem.message}
                  </Box>
                  <Typography><strong>Submitted:</strong> {formatDate(selectedItem.submittedAt)}</Typography>
                  {selectedItem.status !== 'replied' && (
                    <Box sx={{ mt: 3 }}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Response Message"
                        value={responseMessage}
                        onChange={(e) => setResponseMessage(e.target.value)}
                        placeholder="Type your response here..."
                      />
                    </Box>
                  )}
                </>
              ) : (
                // Booking details
                <>
                  <Typography><strong>Student:</strong> {selectedItem.studentName}</Typography>
                  <Typography><strong>Email:</strong> {selectedItem.email}</Typography>
                  <Typography><strong>Phone:</strong> {selectedItem.phone}</Typography>
                  <Typography><strong>Subject:</strong> {selectedItem.subject}</Typography>
                  <Typography><strong>Level:</strong> {selectedItem.level}</Typography>
                  <Typography><strong>Session Type:</strong> {selectedItem.sessionType}</Typography>
                  <Typography><strong>Duration:</strong> {selectedItem.duration} minutes</Typography>
                  <Typography><strong>Preferred Date:</strong> {formatDate(selectedItem.preferredDate)}</Typography>
                  <Typography><strong>Preferred Time:</strong> {selectedItem.preferredTime || 'N/A'}</Typography>
                  {/* Group Lesson Details */}
                  {selectedItem.sessionDetails?.groupName && (
                    <>
                      <Typography sx={{ mt: 2 }} color="secondary"><strong>Group Name:</strong> {selectedItem.sessionDetails.groupName}</Typography>
                      <Typography><strong>Group Size:</strong> {selectedItem.sessionDetails.groupSize}</Typography>
                      <Typography><strong>Participant Emails:</strong> {selectedItem.sessionDetails.participantEmails}</Typography>
                    </>
                  )}
                  <Typography><strong>Estimated Cost:</strong> ${selectedItem.estimatedCost}</Typography>
                  <Typography><strong>Status:</strong> 
                    <Chip 
                      label={selectedItem.status} 
                      color={getStatusColor(selectedItem.status)}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Typography>
                  {selectedItem.notes && (
                    <>
                      <Typography sx={{ mt: 2 }}><strong>Notes:</strong></Typography>
                      <Box sx={{ p: 2, backgroundColor: 'grey.100', borderRadius: 1, mt: 1 }}>
                        {selectedItem.notes}
                      </Box>
                    </>
                  )}
                </>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
          {selectedItem?.fullName && selectedItem.status !== 'replied' && (
            <Button 
              onClick={handleSendResponse} 
              variant="contained"
              disabled={!responseMessage.trim() || sendingEmail}
              startIcon={sendingEmail ? <CircularProgress size={20} /> : null}
            >
              {sendingEmail ? 'Opening Email...' : 'Open Email Client'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdminPanel;
