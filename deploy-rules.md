# Deploy Firebase Rules

## Important: You need to deploy the updated Firestore rules to fix the permission errors.

### Option 1: Using Firebase Console (Recommended)
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `richreact-tutorial-hub`
3. Go to **Firestore Database** → **Rules**
4. Replace the existing rules with the content from `firestore.rules` file
5. Click **Publish**

### Option 2: Using Firebase CLI
If you have Firebase CLI installed:
```bash
firebase deploy --only firestore:rules
firebase deploy --only storage
```

### Option 3: Manual Copy-Paste
Copy this content and paste it in Firebase Console → Firestore → Rules:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read and write access to all authenticated users for now
    // This is for development/testing purposes
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Specific rules for lessons collection
    match /lessons/{lessonId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
      allow delete: if request.auth != null;
    }
    
    // User profiles
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null;
    }
    
    // Contact submissions
    match /contact_submissions/{docId} {
      allow create: if request.auth != null;
      allow read, update: if request.auth != null;
    }
    
    // Tutorial bookings
    match /tutorial_bookings/{docId} {
      allow create: if request.auth != null;
      allow read, update: if request.auth != null;
    }
    
    // Booking notifications
    match /booking_notifications/{docId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null;
    }
  }
}
```

### For Storage Rules:
Go to Firebase Console → Storage → Rules and paste:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow authenticated users to upload and download files
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## After deploying rules:
1. Refresh your application
2. Try uploading a lesson again
3. The permission errors should be resolved