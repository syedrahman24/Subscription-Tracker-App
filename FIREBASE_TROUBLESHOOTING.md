# 🔧 Firebase Troubleshooting Guide

## 🚨 Issue: Subscriptions Not Persisting After Login/Logout

If your subscriptions are disappearing after logging out and back in, follow these steps to fix the issue.

## 🔍 Step 1: Check Browser Console

1. Open your browser's Developer Tools (F12)
2. Go to the Console tab
3. Try to add a subscription and check for any error messages
4. Look for messages like:
   - "Permission denied"
   - "Missing or insufficient permissions"
   - "Error getting subscriptions"

## 🔧 Step 2: Fix Firestore Security Rules

The most common cause is incorrect security rules. Follow these steps:

### 2.1 Go to Firebase Console
1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `subscription-tracker-app-c4586`

### 2.2 Update Security Rules
1. Go to "Firestore Database" in the left sidebar
2. Click on the "Rules" tab
3. **Replace** the existing rules with this:

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

### 2.3 Alternative: Test Mode Rules (Temporary)
If the above doesn't work, temporarily use test mode rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ WARNING: Only use test mode for development. Never use in production!**

## 🔧 Step 3: Verify Authentication Setup

1. In Firebase Console, go to "Authentication"
2. Click "Sign-in method" tab
3. Make sure "Email/Password" is enabled
4. Check that you have users in the "Users" tab

## 🔧 Step 4: Check Database Structure

1. Go to "Firestore Database" → "Data" tab
2. Look for a `subscriptions` collection
3. Check if documents are being created when you add subscriptions
4. Verify that each document has:
   - `userId` field matching your user ID
   - `serviceName`, `cost`, `category`, etc.

## 🔧 Step 5: Debug with Console Logs

The app now includes console logging. Check your browser console for:

- "Adding subscription for user: [user-id]"
- "Subscription added successfully with ID: [doc-id]"
- "Fetching subscriptions for user: [user-id]"
- "Fetched subscriptions: [array]"

## 🚨 Common Issues and Solutions

### Issue 1: "Permission denied" errors
**Solution:** Update security rules (Step 2)

### Issue 2: "Missing or insufficient permissions"
**Solution:** Make sure user is authenticated before accessing data

### Issue 3: Data not showing up in Firestore
**Solution:** Check if the database is created and rules are published

### Issue 4: User ID mismatch
**Solution:** Verify the user ID in the document matches the authenticated user

## 🔧 Step 6: Test the Fix

1. Clear your browser cache and cookies
2. Restart the development server: `npm start`
3. Sign up with a new account or sign in
4. Add a subscription
5. Check the browser console for success messages
6. Sign out and sign back in
7. Verify your subscriptions are still there

## 🔧 Step 7: Verify in Firebase Console

1. Go to Firestore Database → Data
2. Look for the `subscriptions` collection
3. Check that documents are created with your user ID
4. Verify the data structure is correct

## 📞 Still Having Issues?

If you're still experiencing problems:

1. **Check the browser console** for specific error messages
2. **Verify your Firebase project ID** matches the one in `src/firebase.js`
3. **Ensure you're using the correct Firebase project**
4. **Try creating a new Firebase project** and updating the config

## 🔒 Security Rules Explanation

The security rules ensure:
- Only authenticated users can access data
- Users can only access their own subscriptions
- Data is protected from unauthorized access

```javascript
// This rule allows users to read/write their own subscriptions
allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;

// This rule allows users to create new subscriptions
allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
```

---

**🎯 After following these steps, your subscriptions should persist between login sessions!** 