import React from 'react';
import { DollarSign, CreditCard, TrendingUp, Zap } from 'lucide-react';

const Summary = ({ totalMonthlySpend, subscriptionCount }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      {/* Total Monthly Spend */}
      <div className="card p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-lg">
              <DollarSign className="text-white" size={28} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Total Monthly Spend
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Smart calculation across all subscriptions
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              ${totalMonthlySpend.toFixed(2)}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 flex items-center">
              <TrendingUp className="text-green-500 mr-2" size={20} />
              Per month impact
            </p>
          </div>
        </div>
      </div>

      {/* Subscription Count */}
      <div className="card p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-lg">
              <CreditCard className="text-white" size={28} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Active Subscriptions
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Services you're currently tracking
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {subscriptionCount}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 flex items-center">
              <Zap className="text-blue-500 mr-2" size={20} />
              {subscriptionCount === 1 ? 'subscription' : 'subscriptions'} tracked
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary; 