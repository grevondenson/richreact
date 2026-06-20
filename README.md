# Richmond Tutorial Hub - Chemistry Education Platform

A comprehensive React-based educational platform for chemistry learning and tutoring, built with Firebase backend integration.

## 🚀 Features

### 🔐 Authentication System
- **Email/Password Authentication** - Secure signup and login
- **Google OAuth Integration** - One-click Google sign-in
- **Role-Based Access Control** - Student and Teacher roles
- **Protected Routes** - Role-specific content access
- **Profile Management** - User profile and bio updates
- **Login Streak Tracking** - Gamified engagement features

### 📚 Educational Content Management
- **Resource Library** - PDFs, eBooks, notes, exam papers
- **Video Tutorials** - Interactive chemistry lessons
- **Syllabus Management** - Curriculum organization
- **Exam Preparation** - Practice materials and assessments
- **File Upload/Download** - Secure cloud storage via Firebase Storage

### 📝 Contact & Booking System
- **Contact Form** - Firebase-integrated message submissions
- **Tutorial Booking** - Complete booking management system
- **Real-time Notifications** - Instant booking updates
- **Admin Dashboard** - Teacher/admin panel for managing submissions
- **Status Tracking** - Booking progress monitoring

### 👨‍🏫 Teacher Features
- **Content Upload** - Resource and lesson management
- **Student Management** - Track student progress
- **Booking Management** - Approve/decline tutorial requests
- **Analytics Dashboard** - Revenue and performance metrics
- **Communication Tools** - Respond to student inquiries

## 🛠️ Technology Stack

- **Frontend**: React 19.1.0
- **UI Framework**: Material-UI (MUI) 7.2.0
- **Backend**: Firebase 11.10.0
  - Firestore Database
  - Firebase Authentication
  - Firebase Storage
  - Firebase Analytics
- **Routing**: React Router DOM 7.6.3
- **Notifications**: React Toastify 11.0.5
- **Styling**: CSS Modules + Material-UI
- **Date Handling**: MUI X Date Pickers + date-fns

## 📊 Firebase Database Structure

### Collections

#### `users`
```javascript
{
  email: "string",
  displayName: "string",
  role: "student" | "teacher",
  bio: "string",
  loginStreak: "number",
  lastLogin: "timestamp",
  downloads: "array",
  resourceUsage: {
    totalDownloads: "number",
    totalResourcesAccessed: "number"
  },
  createdAt: "timestamp"
}
```

#### `contact_submissions`
```javascript
{
  fullName: "string",
  email: "string",
  subject: "string",
  message: "string",
  submittedAt: "timestamp",
  status: "new" | "read" | "replied",
  source: "contact_form",
  respondedAt: "timestamp", // optional
  responseMessage: "string" // optional
}
```

#### `tutorial_bookings`
```javascript
{
  studentName: "string",
  email: "string",
  phone: "string",
  subject: "string",
  level: "string",
  sessionType: "string",
  preferredDate: "timestamp",
  preferredTime: "timestamp",
  duration: "number", // minutes
  notes: "string",
  urgency: "normal" | "urgent" | "flexible",
  tutorId: "string",
  tutorName: "string",
  studentId: "string",
  status: "pending" | "confirmed" | "cancelled" | "completed",
  paymentStatus: "unpaid" | "paid" | "refunded",
  bookedAt: "timestamp",
  confirmedAt: "timestamp",
  sessionDetails: "object",
  estimatedCost: "number",
  actualCost: "number",
  rating: "number", // 1-5 stars
  feedback: "string"
}
```

#### `resources`
```javascript
{
  title: "string",
  type: "ebook" | "pdf" | "note" | "paper" | "syllabus" | "exam" | "examinerReport",
  fileURL: "string", // Firebase Storage URL
  createdAt: "timestamp",
  accessRole: "both" // students and teachers
}
```

#### `lessons`
```javascript
{
  title: "string",
  type: "lesson" | "video",
  fileURL: "string", // Firebase Storage URL
  teacherId: "string",
  createdAt: "timestamp"
}
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js 16+ and npm
- Firebase project with enabled services:
  - Authentication (Email/Password, Google)
  - Firestore Database
  - Storage
  - Analytics (optional)

### 1. Clone the Repository
```bash
git clone https://github.com/grevondenson/richreact.git
cd richreact
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Firebase Configuration
The Firebase configuration is already set up in `src/firebase.js`. Update the configuration if needed:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

### 4. Firebase Security Rules

#### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Anyone can create contact submissions, teachers can read all
    match /contact_submissions/{submissionId} {
      allow create: if request.auth != null;
      allow read, update: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'teacher';
    }
    
    // Students can create bookings, teachers can manage all
    match /tutorial_bookings/{bookingId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null && 
        (resource.data.studentId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'teacher');
      allow update: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'teacher';
    }
    
    // Resources: teachers can write, authenticated users can read
    match /resources/{resourceId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'teacher';
    }
    
    // Lessons: teachers can write, authenticated users can read
    match /lessons/{lessonId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'teacher';
    }
  }
}
```

#### Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        request.auth.token.role == 'teacher';
    }
  }
}
```

### 5. Run the Application
```bash
npm start
```

The application will be available at `http://localhost:3000`

## 🎯 Key Features Implementation

### Contact Form Integration
- **File**: `src/components/contact.js`
- **Service**: `src/services/booking.js`
- Real-time form submission to Firestore
- Input validation and error handling
- Success/error notifications via toast
- Admin response management

### Tutorial Booking System
- **File**: `src/components/BookingForm.js`
- **Service**: `src/services/booking.js`
- Comprehensive booking form with date/time pickers
- Cost estimation
- Status tracking and notifications
- Email confirmations

### Admin Dashboard
- **File**: `src/components/AdminPanel.js`
- **Route**: `/admin` (Teacher role required)
- Contact submissions management
- Booking approval/cancellation
- Revenue and performance analytics
- Real-time updates

### Authentication Flow
- **Context**: `src/contexts/AuthContext.js`
- **Routes**: Protected routes in `src/App.js`
- Role-based navigation
- Persistent login state
- Profile management

## 📱 User Roles & Permissions

### Students
- ✅ Browse educational content
- ✅ Download resources
- ✅ Book tutorial sessions
- ✅ Submit contact forms
- ✅ Track booking status
- ✅ Rate completed sessions

### Teachers
- ✅ All student permissions
- ✅ Upload educational content
- ✅ Manage bookings (approve/decline)
- ✅ Access admin dashboard
- ✅ Respond to contact forms
- ✅ View analytics and revenue

## 🔐 Security Features

- **Authentication**: Firebase Auth with email/password and Google OAuth
- **Authorization**: Role-based access control
- **Data Validation**: Client-side and server-side validation
- **Protected Routes**: Authentication and role requirements
- **Secure File Upload**: Firebase Storage with access controls
- **Input Sanitization**: XSS prevention measures

## 📈 Analytics & Monitoring

- **User Engagement**: Login streak tracking
- **Usage Analytics**: Resource download statistics
- **Business Metrics**: Revenue tracking and booking analytics
- **Performance Monitoring**: Firebase Analytics integration

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍🏫 About

Richmond Tutorial Hub is developed by Dr. Joseph Anjili, a professional educator with 32 years of uninterrupted teaching experience in chemistry education. The platform aims to inspire success one reaction at a time.

---

**Contact Information:**
- **Email**: anjiljoseph693@gmail.com
- **WhatsApp**: +254723884067
- **Platform**: [Richmond Tutorial Hub](https://richreact.web.app)

## 🔧 Troubleshooting

### Common Issues

1. **Firebase Connection Issues**
   - Verify Firebase configuration in `src/firebase.js`
   - Check Firebase project permissions
   - Ensure all Firebase services are enabled

2. **Authentication Problems**
   - Verify authorized domains in Firebase Console
   - Check authentication providers are enabled
   - Clear browser cache and cookies

3. **File Upload Issues**
   - Check Firebase Storage rules
   - Verify user permissions
   - Ensure file size limits are met

4. **Booking Form Date Picker Issues**
   - Ensure `@mui/x-date-pickers` and `date-fns` are installed
   - Check LocalizationProvider setup
   - Verify date format compatibility

For additional support, please contact the development team or create an issue in the repository.