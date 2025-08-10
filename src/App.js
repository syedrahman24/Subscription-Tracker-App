import React, { useState, useEffect } from 'react';
import { format, differenceInDays, isAfter, addDays } from 'date-fns';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { 
  getSubscriptions, 
  addSubscription as addSubscriptionToDB, 
  updateSubscription as updateSubscriptionInDB, 
  deleteSubscription as deleteSubscriptionFromDB 
} from './services/subscriptionService';
import AddSubscriptionForm from './components/AddSubscriptionForm';
import SubscriptionCard from './components/SubscriptionCard';
import Summary from './components/Summary';
import RenewalCountdown from './components/RenewalCountdown';
import PieChartBreakdown from './components/PieChartBreakdown';
import DarkModeToggle from './components/DarkModeToggle';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import { Download, Search, Filter, Sparkles } from 'lucide-react';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showForm, setShowForm] = useState(false);

  // Authentication state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user ? `User: ${user.email}` : 'No user');
      setUser(user);
      setLoading(false);
      
      if (user) {
        // Load user's subscriptions from Firebase
        try {
          console.log('Loading subscriptions for user:', user.uid);
          const userSubscriptions = await getSubscriptions(user.uid);
          console.log('Loaded subscriptions:', userSubscriptions);
          setSubscriptions(userSubscriptions);
        } catch (error) {
          console.error('Error loading subscriptions:', error);
          // Show user-friendly error message
          alert('Failed to load your subscriptions. Please refresh the page and try again.');
        }
      } else {
        console.log('No user, clearing subscriptions');
        setSubscriptions([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addSubscription = async (subscription) => {
    if (!user) return;
    
    try {
      const newSubscription = await addSubscriptionToDB(user.uid, subscription);
      setSubscriptions([...subscriptions, newSubscription]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding subscription:', error);
      alert('Failed to add subscription. Please try again.');
    }
  };

  const deleteSubscription = async (id) => {
    try {
      await deleteSubscriptionFromDB(id);
      setSubscriptions(subscriptions.filter(sub => sub.id !== id));
    } catch (error) {
      console.error('Error deleting subscription:', error);
      alert('Failed to delete subscription. Please try again.');
    }
  };

  const editSubscription = async (id, updatedSubscription) => {
    try {
      await updateSubscriptionInDB(id, updatedSubscription);
      setSubscriptions(subscriptions.map(sub => 
        sub.id === id ? { ...updatedSubscription, id } : sub
      ));
    } catch (error) {
      console.error('Error updating subscription:', error);
      alert('Failed to update subscription. Please try again.');
    }
  };

  const handleLogin = () => {
    // User is now logged in, subscriptions will be loaded automatically
  };

  const handleSignOut = () => {
    setUser(null);
    setSubscriptions([]);
  };

  const exportToCSV = () => {
    const headers = ['Service Name', 'Cost', 'Billing Frequency', 'Category', 'Next Renewal'];
    const csvContent = [
      headers.join(','),
      ...subscriptions.map(sub => [
        sub.serviceName,
        sub.cost,
        sub.billingFrequency,
        sub.category,
        format(new Date(sub.nextRenewal), 'MM/dd/yyyy')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subscriptions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Filter subscriptions based on search and category
  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || sub.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter dropdown
  const categories = ['all', ...new Set(subscriptions.map(sub => sub.category))];

  // Calculate total monthly spend
  const totalMonthlySpend = subscriptions.reduce((total, sub) => {
    const monthlyCost = sub.billingFrequency === 'yearly' ? sub.cost / 12 : sub.cost;
    return total + monthlyCost;
  }, 0);

  // Get next renewal
  const nextRenewal = subscriptions.length > 0 ? 
    subscriptions.reduce((next, sub) => {
      const renewalDate = new Date(sub.nextRenewal);
      if (!next || renewalDate < new Date(next.nextRenewal)) {
        return sub;
      }
      return next;
    }) : null;

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 transition-all duration-300 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
            <Sparkles className="text-white" size={28} />
          </div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Loading...
          </div>
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  // Show login screen if user is not authenticated
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 transition-all duration-300">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
          <div className="mb-8 lg:mb-0">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                <Sparkles className="text-white" size={28} />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold gradient-text">
                Subscription Tracker
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              Master your digital subscriptions with smart insights, beautiful analytics, and never miss a renewal again ✨
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            <button
              onClick={exportToCSV}
              className="btn-secondary flex items-center space-x-2"
            >
              <Download size={18} />
              <span>Export CSV</span>
            </button>
            <UserProfile user={user} onSignOut={handleSignOut} />
          </div>
        </div>

        {/* Summary Section */}
        <Summary 
          totalMonthlySpend={totalMonthlySpend}
          subscriptionCount={subscriptions.length}
        />

        {/* Next Renewal Countdown */}
        {nextRenewal && (
          <RenewalCountdown subscription={nextRenewal} />
        )}

        {/* Charts Section */}
        {subscriptions.length > 0 && (
          <div className="mb-12">
            <PieChartBreakdown subscriptions={subscriptions} />
          </div>
        )}

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search your subscriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12 text-lg"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field pl-12 pr-8 text-lg"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Add Subscription Button */}
        <div className="mb-8 text-center">
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary text-lg px-8 py-4"
          >
            {showForm ? 'Cancel' : (
              <>
                <Sparkles size={20} className="mr-2" />
                Add New Subscription
              </>
            )}
          </button>
        </div>

        {/* Add Subscription Form */}
        {showForm && (
          <div className="mb-12">
            <AddSubscriptionForm onAdd={addSubscription} />
          </div>
        )}

        {/* Subscriptions Grid */}
        {filteredSubscriptions.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-3xl border border-blue-200/50 dark:border-gray-600/50">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {subscriptions.length === 0 ? 'Start Your Journey' : 'No Results Found'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {subscriptions.length === 0 ? 
                    'Add your first subscription to begin tracking your digital spending!' : 
                    'Try adjusting your search or filter criteria.'
                  }
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredSubscriptions.map((subscription, index) => (
              <div 
                key={subscription.id}
                className="floating-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <SubscriptionCard
                  subscription={subscription}
                  onDelete={deleteSubscription}
                  onEdit={editSubscription}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App; 