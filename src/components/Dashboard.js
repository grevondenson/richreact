import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
// Removed unused import useNavigate
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { toast } from 'react-toastify';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Avatar, 
  Grid, 
  Card, 
  CardContent,
  Tabs,
  Tab,
  Chip,
  Skeleton,
  CircularProgress
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Save as SaveIcon, 
  Cancel as CancelIcon,
  Upload as UploadIcon,
  Person as PersonIcon,
  TrendingUp as TrendingUpIcon,
  Download as DownloadIcon,
  QuestionAnswer as QuestionIcon
} from '@mui/icons-material';
import './Dashboard.css';
import TeacherUploadForm from './TeacherUploadForm';
import { getLessons } from '../services/firestore';
import { testFirebaseConfig } from '../utils/testFirebase';

const Dashboard = () => {
  const { currentUser, userRole, userData, updateUserProfile, updateUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: '',
    bio: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadType, setUploadType] = useState("lesson");
  const [lessons, setLessons] = useState([]);
  const [editingLesson, setEditingLesson] = useState(null);
  const [loadingLessons, setLoadingLessons] = useState(false);

  // Removed unused variable navigate

  useEffect(() => {
    if (userData) {
      setProfileData({
        displayName: userData.displayName || currentUser?.displayName || '',
        bio: userData.bio || ''
      });
      setImagePreview(userData.photoURL);
    } else if (currentUser) {
      // Show basic info even if userData is still loading
      setProfileData({
        displayName: currentUser.displayName || '',
        bio: ''
      });
      setImagePreview(currentUser.photoURL);
    }
  }, [userData, currentUser]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update display name in Firebase Auth
      await updateUserProfile({
      displayName: profileData.displayName
    });

      // Update bio in Firestore
      await updateUserData(currentUser.uid, {
        bio: profileData.bio
      });

      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const handleImageUpload = async () => {
    if (!profileImage) {
      toast.error('Please select an image first');
      return;
    }

    setLoading(true);
    try {
      const imageRef = ref(storage, `profileImages/${currentUser.uid}`);
      await uploadBytes(imageRef, profileImage);
      const photoURL = await getDownloadURL(imageRef);
      
      // Update profile image in Firebase Auth
      await updateUserProfile({ photoURL });
      
      // Update photoURL in Firestore
      await updateUserData(currentUser.uid, { photoURL });
      
      setImagePreview(photoURL);
      setProfileImage(null);
      toast.success('Profile image updated successfully!');
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const cancelEdit = () => {
    setProfileData({
      displayName: userData?.displayName || currentUser?.displayName || '',
      bio: userData?.bio || ''
    });
    setIsEditing(false);
  };

  const fetchLessons = async () => {
    setLoadingLessons(true);
    try {
      const data = await getLessons();
      setLessons(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingLessons(false);
    }
  };

  useEffect(() => {
    if (activeTab === 2 && userRole === 'teacher') {
      fetchLessons();
    }
  }, [activeTab, userRole]);

  // Show loading skeleton instead of blocking
  if (!currentUser) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h5" align="center">Loading...</Typography>
      </Container>
    );
  }

  const displayName = userData?.displayName || currentUser?.displayName || 'User';
  const userRoleDisplay = userRole === 'teacher' ? 'Teacher' : 'Student';

  return (
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar 
              src={imagePreview} 
              sx={{ width: 80, height: 80 }}
            >
              <PersonIcon sx={{ fontSize: 40 }} />
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h4" gutterBottom>
              Welcome, {displayName}!
            </Typography>
            <Chip 
              label={userRoleDisplay} 
              color={userRole === 'teacher' ? 'primary' : 'secondary'}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs */}
      <Paper elevation={3} sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} centered>
          <Tab label="Profile" />
          <Tab label="Activity" />
          {userRole === 'teacher' && <Tab label="Teaching" />}
        </Tabs>
      </Paper>

      {/* Tab Content */}
      <Paper elevation={3} sx={{ p: 3 }}>
        {/* Profile Tab */}
        {activeTab === 0 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5">Profile Settings</Typography>
              {!isEditing ? (
                <Button
                  startIcon={<EditIcon />}
                  variant="outlined"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              ) : (
                <Box>
                  <Button
                    startIcon={<SaveIcon />}
                    variant="contained"
                    onClick={handleProfileUpdate}
                    disabled={loading}
                    sx={{ mr: 1 }}
                  >
                    Save
                  </Button>
                  <Button
                    startIcon={<CancelIcon />}
                    variant="outlined"
                    onClick={cancelEdit}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>Profile Image</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar 
                      src={imagePreview} 
                      sx={{ width: 100, height: 100 }}
                    >
                      <PersonIcon sx={{ fontSize: 50 }} />
                    </Avatar>
                    <Box>
                <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="image-upload"
                        type="file"
                        onChange={handleImageChange}
                        disabled={loading}
                      />
                      <label htmlFor="image-upload">
                        <Button
                          variant="outlined"
                          component="span"
                          startIcon={<UploadIcon />}
                          disabled={loading}
                        >
                          Choose Image
                        </Button>
                      </label>
                      {profileImage && (
                        <Button
                          variant="contained"
                          onClick={handleImageUpload}
                          disabled={loading}
                          sx={{ ml: 1 }}
                        >
                          Upload
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box component="form" onSubmit={handleProfileUpdate}>
                  <TextField
                    fullWidth
                    label="Full Name"
                  name="displayName"
                  value={profileData.displayName}
                  onChange={handleInputChange}
                    margin="normal"
                    disabled={!isEditing}
                  required
                />
                  <TextField
                    fullWidth
                    label="Email"
                    value={currentUser?.email || ''}
                    margin="normal"
                  disabled
                    helperText="Email cannot be changed"
                  />
                  <TextField
                    fullWidth
                    label="Bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    margin="normal"
                    multiline
                    rows={4}
                    disabled={!isEditing}
                    placeholder="Tell us about yourself..."
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Activity Tab */}
        {activeTab === 1 && (
          <Box>
            <Typography variant="h5" gutterBottom>Your Activity</Typography>
            
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6">Login Streak</Typography>
                    </Box>
                    {userData ? (
                      <>
                        <Typography variant="h3" color="primary">
                          {userData.loginStreak || 0}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          consecutive days
                        </Typography>
                      </>
                    ) : (
                      <Skeleton variant="text" width="60%" height={60} />
                    )}
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <DownloadIcon color="secondary" sx={{ mr: 1 }} />
                      <Typography variant="h6">Resources Accessed</Typography>
                    </Box>
                    {userData ? (
                      <>
                        <Typography variant="h3" color="secondary">
                          {userData.resourceUsage?.totalResourcesAccessed || 0}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          total resources
                        </Typography>
                      </>
                    ) : (
                      <Skeleton variant="text" width="60%" height={60} />
                    )}
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <QuestionIcon color="success" sx={{ mr: 1 }} />
                      <Typography variant="h6">Questions Asked</Typography>
                    </Box>
                    {userData ? (
                      <>
                        <Typography variant="h3" color="success.main">
                          {userData.questionsAsked || 0}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          total questions
                        </Typography>
                      </>
                    ) : (
                      <Skeleton variant="text" width="60%" height={60} />
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom>Recent Activity</Typography>
            <Box sx={{ pl: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                • Accessed Chemistry Notes - 2 hours ago
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                • Downloaded Exam Paper - 1 day ago
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                • Asked a question - 2 days ago
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Watched video tutorial - 3 days ago
              </Typography>
            </Box>
          </Box>
        )}

        {/* Teaching Tab (Teachers Only) */}
        {activeTab === 2 && userRole === 'teacher' && (
          <Box>
            <Typography variant="h5" gutterBottom>Teaching Dashboard</Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Students</Typography>
                    <Typography variant="h3" color="primary">12</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Lessons Posted</Typography>
                    <Typography variant="h3" color="secondary">{lessons.filter(l => l.type === 'lesson').length}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Upcoming Sessions</Typography>
                    <Typography variant="h3" color="success.main">{lessons.filter(l => l.type === 'schedule').length}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Typography variant="h6" gutterBottom>Quick Actions</Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
              <Button
                variant="contained"
                onClick={() => { setUploadType("lesson"); setShowUploadForm(true); setEditingLesson(null); }}
                startIcon={<EditIcon />}
              >
                Post New Lesson
              </Button>
              <Button
                variant="outlined"
                onClick={() => { setUploadType("schedule"); setShowUploadForm(true); setEditingLesson(null); }}
                startIcon={<PersonIcon />}
              >
                Schedule Session
              </Button>
              <Button
                variant="contained"
                onClick={() => { setUploadType("video"); setShowUploadForm(true); setEditingLesson(null); }}
                startIcon={<UploadIcon />}
              >
                Add Video
              </Button>
              <Button
                variant="outlined"
                color="info"
                onClick={() => {
                  const config = testFirebaseConfig();
                  console.log('Firebase Config Test:', config);
                  toast.info(`Storage: ${config.storage ? '✅' : '❌'}, Firestore: ${config.firestore ? '✅' : '❌'}`);
                }}
              >
                Test Firebase
              </Button>
            </Box>
            {showUploadForm && (
              <Box sx={{ my: 3 }}>
                <TeacherUploadForm
                  lessonToEdit={editingLesson}
                  onSuccess={() => { fetchLessons(); setShowUploadForm(false); setEditingLesson(null); }}
                  onCancel={() => { setShowUploadForm(false); setEditingLesson(null); }}
                  initialType={uploadType}
                  key={editingLesson?.id || uploadType || "new"}
                />
              </Box>
            )}
            <Typography variant="h6" gutterBottom>All Lessons, Sessions & Videos</Typography>
            {loadingLessons ? (
              <CircularProgress />
            ) : (
              <Grid container spacing={2}>
                {lessons.map((lesson) => (
                  <Grid item xs={12} sm={6} md={4} key={lesson.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">{lesson.title}</Typography>
                        <Typography color="textSecondary">Type: {lesson.type}</Typography>
                        {lesson.fileURL && (
                          <Button
                            variant="contained"
                            href={lesson.fileURL}
                            target="_blank"
                            sx={{ mt: 1 }}
                          >
                            Download/View
                          </Button>
                        )}
                        <Button
                          variant="outlined"
                          onClick={() => { setEditingLesson(lesson); setShowUploadForm(true); setUploadType(lesson.type); }}
                          sx={{ mt: 1, ml: 1 }}
                        >
                          Edit
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Dashboard; 