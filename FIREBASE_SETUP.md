# 🔥 Firebase Setup Guide

This guide will help you set up Firebase for the Subscription Tracker App to enable user authentication and cloud database functionality.

## 📋 Prerequisites

1. A Google account
2. Node.js and npm installed
3. The Subscription Tracker App code

## 🚀 Step-by-Step Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "subscription-tracker")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Authentication

1. In your Firebase project, click on "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Click on "Email/Password"
5. Enable "Email/Password" authentication
6. Click "Save"

### 3. Set Up Firestore Database

1. In your Firebase project, click on "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location for your database (choose the closest to your users)
5. Click "Done"

### 4. Get Firebase Configuration

1. In your Firebase project, click on the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "subscription-tracker-web")
6. Copy the Firebase configuration object

### 5. Update Firebase Configuration

1. Open `src/firebase.js` in your project
2. Replace the placeholder configuration with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### 6. Set Up Firestore Security Rules

1. In your Firebase project, go to "Firestore Database"
2. Click on the "Rules" tab
3. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read and write only their own subscriptions
    match /subscriptions/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

4. Click "Publish"

### 7. Install Dependencies

Run the following command in your project directory:

```bash
npm install
```

### 8. Start the Application

```bash
npm start
```

## 🔧 Configuration Details

### Authentication Features
- **Email/Password Sign Up**: Users can create new accounts
- **Email/Password Sign In**: Users can sign in with existing accounts
- **Automatic Session Management**: Users stay logged in between sessions
- **Secure Sign Out**: Users can sign out and clear their session

### Database Features
- **User-Specific Data**: Each user only sees their own subscriptions
- **Real-time Updates**: Changes are immediately reflected
- **Secure Access**: Only authenticated users can access their data
- **Automatic Backups**: Data is stored securely in the cloud

### Security Features
- **Firestore Security Rules**: Prevent unauthorized access
- **User Authentication**: Verify user identity
- **Data Isolation**: Users can only access their own data

## 🚨 Important Security Notes

1. **Never commit your Firebase config to public repositories**
2. **Use environment variables for production**
3. **Regularly review your Firestore security rules**
4. **Monitor your Firebase usage and costs**

## 📊 Firebase Pricing

Firebase offers a generous free tier:
- **Authentication**: 10,000 users/month
- **Firestore**: 1GB storage, 50,000 reads/day, 20,000 writes/day
- **Perfect for personal and small business use**

## 🆘 Troubleshooting

### Common Issues:

1. **"Firebase App named '[DEFAULT]' already exists"**
   - Make sure you're not initializing Firebase multiple times

2. **"Permission denied" errors**
   - Check your Firestore security rules
   - Ensure the user is authenticated

3. **Authentication not working**
   - Verify Email/Password is enabled in Firebase Console
   - Check your Firebase configuration

4. **Data not loading**
   - Check your Firestore security rules
   - Verify the user is properly authenticated

## 📞 Support

If you encounter any issues:
1. Check the [Firebase Documentation](https://firebase.google.com/docs)
2. Review the [Firebase Console](https://console.firebase.google.com/) for error messages
3. Check the browser console for JavaScript errors

---

**🎉 Congratulations!** Your Subscription Tracker App now supports multiple users with secure authentication and cloud storage! 