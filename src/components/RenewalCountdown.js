import React from 'react';
import { differenceInDays, format } from 'date-fns';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const RenewalCountdown = ({ subscription }) => {
  const renewalDate = new Date(subscription.nextRenewal);
  const daysUntilRenewal = differenceInDays(renewalDate, new Date());

  const getCountdownText = () => {
    if (daysUntilRenewal < 0) {
      return `${Math.abs(daysUntilRenewal)} days overdue`;
    } else if (daysUntilRenewal === 0) {
      return 'Renews today!';
    } else if (daysUntilRenewal === 1) {
      return 'Renews tomorrow';
    } else {
      return `${daysUntilRenewal} days until renewal`;
    }
  };

  const getCountdownColor = () => {
    if (daysUntilRenewal < 0) {
      return 'text-red-600 dark:text-red-400';
    } else if (daysUntilRenewal <= 7) {
      return 'text-orange-600 dark:text-orange-400';
    } else {
      return 'text-blue-600 dark:text-blue-400';
    }
  };

  const getIcon = () => {
    if (daysUntilRenewal < 0) {
      return <AlertTriangle className="text-red-500" size={24} />;
    } else if (daysUntilRenewal <= 7) {
      return <Clock className="text-orange-500" size={24} />;
    } else {
      return <CheckCircle className="text-blue-500" size={24} />;
    }
  };

  const getBackgroundColor = () => {
    if (daysUntilRenewal < 0) {
      return 'bg-gradient-to-r from-red-500 to-pink-500';
    } else if (daysUntilRenewal <= 7) {
      return 'bg-gradient-to-r from-orange-500 to-red-500';
    } else {
      return 'bg-gradient-to-r from-blue-500 to-indigo-500';
    }
  };

  return (
    <div className="card p-6 mb-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full -translate-y-12 translate-x-12"></div>
      
      <div className="relative z-10">
        <div className="flex items-center space-x-4">
          <div className={`p-3 ${getBackgroundColor()} rounded-2xl shadow-lg`}>
            {getIcon()}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Next Renewal Alert
            </h3>
            <p className={`text-xl font-bold ${getCountdownColor()}`}>
              {getCountdownText()} ({subscription.serviceName})
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {format(renewalDate, 'EEEE, MMMM dd, yyyy')}
            </p>
          </div>
          
          {/* Progress indicator */}
          <div className="hidden lg:block">
            <div className="w-16 h-16 rounded-full border-4 border-gray-200 dark:border-gray-700 flex items-center justify-center">
              <span className={`text-lg font-bold ${getCountdownColor()}`}>
                {Math.abs(daysUntilRenewal)}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
              {daysUntilRenewal < 0 ? 'Days Overdue' : 'Days Left'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenewalCountdown; 