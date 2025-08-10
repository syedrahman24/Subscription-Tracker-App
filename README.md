# 💳 Subscription Tracker

A modern, feature-rich React application for managing and tracking your digital subscriptions with real-time analytics, renewal alerts, and beautiful dark/light themes.

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Firebase](https://img.shields.io/badge/Firebase-10.7.0-orange?logo=firebase)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.0-blue?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🔐 **Authentication & Security**
- Secure Firebase Authentication with email/password
- User-specific data isolation and privacy
- Persistent login sessions

### 📊 **Smart Analytics**
- Interactive pie charts for spending breakdown
- Monthly and yearly cost calculations
- Category-wise expense analysis
- Real-time financial summaries

### ⏰ **Renewal Management**
- Smart countdown timers for upcoming renewals
- Visual alerts for subscriptions due soon
- Automatic renewal date calculations

### 🎨 **Modern UI/UX**
- Professional dark/light theme toggle
- Responsive design for all devices
- Glassmorphism effects and smooth animations
- Intuitive search and filtering system

### 📈 **Data Management**
- Real-time Firebase Firestore synchronization
- CSV export functionality for data backup
- CRUD operations with error handling
- Offline-ready architecture

### 🔍 **Advanced Features**
- Global search across all subscriptions
- Category-based filtering
- Sorting by cost, renewal date, and name
- Bulk operations and management

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Firebase account and project setup

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd subscription-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Copy your Firebase config to `src/firebase.js`

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠️ Tech Stack

### **Frontend**
- **React 18.2.0** - Modern UI library with hooks
- **TailwindCSS 3.3.0** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **Date-fns** - Modern JavaScript date utility library

### **Backend & Database**
- **Firebase 10.7.0** - Authentication and real-time database
- **Firestore** - NoSQL document database
- **Firebase Auth** - Secure user authentication

### **Data Visualization**
- **Recharts 2.8.0** - Composable charting library
- **Interactive pie charts** - Spending breakdown visualization

### **Routing & Navigation**
- **React Router DOM 6.20.0** - Declarative routing

## 📁 Project Structure

```
subscription-tracker/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── AddSubscriptionForm.js    # Form for adding new subscriptions
│   │   ├── DarkModeToggle.js         # Theme switcher component
│   │   ├── Login.js                  # Authentication component
│   │   ├── PieChartBreakdown.js      # Data visualization charts
│   │   ├── RenewalCountdown.js       # Countdown timer for renewals
│   │   ├── SubscriptionCard.js       # Individual subscription display
│   │   ├── Summary.js                # Financial summary component
│   │   └── UserProfile.js            # User account management
│   ├── services/
│   │   └── subscriptionService.js    # Firebase CRUD operations
│   ├── App.js                        # Main application component
│   ├── firebase.js                   # Firebase configuration
│   ├── index.css                     # Global styles and Tailwind
│   └── index.js                      # Application entry point
├── package.json
├── tailwind.config.js                # Tailwind CSS configuration
└── README.md
```

## 🔧 Configuration

### Firebase Setup
1. Replace the Firebase config in `src/firebase.js` with your project credentials:
```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /subscriptions/{document} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
  }
}
```

## 📱 Features in Detail

### **Subscription Management**
- Add subscriptions with name, cost, billing cycle, and category
- Edit existing subscriptions with real-time updates
- Delete subscriptions with confirmation
- Categorize by Entertainment, Productivity, Health, etc.

### **Financial Insights**
- Total monthly and yearly spending calculations
- Category-wise expense breakdown
- Visual pie charts for spending patterns
- Export data to CSV for external analysis

### **Smart Notifications**
- Visual countdown for next renewal
- Color-coded alerts for upcoming payments
- Days remaining until next billing cycle

### **User Experience**
- Responsive design for mobile, tablet, and desktop
- Dark/light theme with system preference detection
- Smooth animations and micro-interactions
- Intuitive search and filtering

## 🎯 Usage Examples

### Adding a Subscription
1. Click "Add New Subscription"
2. Fill in subscription details (name, cost, billing cycle)
3. Select appropriate category
4. Save to automatically sync with Firebase

### Viewing Analytics
- Dashboard shows total monthly/yearly costs
- Pie chart breaks down spending by category
- Individual cards show days until renewal

### Exporting Data
- Click the export button to download CSV
- Includes all subscription data with calculations
- Perfect for external budgeting tools

## 🚀 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run test suite
- `npm eject` - Eject from Create React App

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Firebase** for backend infrastructure
- **TailwindCSS** for beautiful styling
- **Recharts** for data visualization
- **Lucide** for icon library
- **React** community for excellent documentation

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Firebase Setup Guide](FIREBASE_SETUP.md)
2. Review [Troubleshooting Guide](FIREBASE_TROUBLESHOOTING.md)
3. Open an issue on GitHub

---

**Built with ❤️ using React and Firebase**

*Track smarter, spend wiser, live better.*
