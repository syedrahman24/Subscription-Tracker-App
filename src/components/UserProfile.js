import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { User, LogOut, Settings, Shield, Mail } from 'lucide-react';

const UserProfile = ({ user, onSignOut }) => {
  const [showProfile, setShowProfile] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      onSignOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setShowProfile(!showProfile)}
        className="flex items-center space-x-3 p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
          <User className="text-white" size={16} />
        </div>
        <div className="text-left">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {user.email?.split('@')[0] || 'User'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {user.email}
          </p>
        </div>
      </button>

      {/* Profile Dropdown */}
      {showProfile && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setShowProfile(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-2 w-80 card p-6 z-20">
            <div className="space-y-6">
              {/* User Info */}
              <div className="text-center pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {user.email?.split('@')[0] || 'User'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center">
                  <Mail size={14} className="mr-1" />
                  {user.email}
                </p>
              </div>

              {/* Account Status */}
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-2">
                  <Shield className="text-green-600 dark:text-green-400" size={16} />
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    Account Verified
                  </span>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>

              {/* Account Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Member since:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {user.metadata?.creationTime ? 
                      new Date(user.metadata.creationTime).toLocaleDateString() : 
                      'N/A'
                    }
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Last sign in:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {user.metadata?.lastSignInTime ? 
                      new Date(user.metadata.lastSignInTime).toLocaleDateString() : 
                      'N/A'
                    }
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center space-x-2 p-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors duration-200"
                >
                  <LogOut size={16} />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile; 