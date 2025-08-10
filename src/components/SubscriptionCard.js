import React, { useState } from 'react';
import { format, differenceInDays, isAfter, addDays } from 'date-fns';
import { Edit, Trash2, Calendar, DollarSign, Tag, AlertTriangle, Clock } from 'lucide-react';

const SubscriptionCard = ({ subscription, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(subscription);

  const handleEdit = () => {
    onEdit(subscription.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(subscription);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Calculate if renewal is coming soon (within 7 days)
  const renewalDate = new Date(subscription.nextRenewal);
  const daysUntilRenewal = differenceInDays(renewalDate, new Date());
  const isRenewingSoon = daysUntilRenewal <= 7 && daysUntilRenewal >= 0;
  const isOverdue = daysUntilRenewal < 0;

  // Calculate monthly cost
  const monthlyCost = subscription.billingFrequency === 'yearly' 
    ? subscription.cost / 12 
    : subscription.cost;

  if (isEditing) {
    return (
      <div className="card p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Service Name
            </label>
            <input
              type="text"
              name="serviceName"
              value={editData.serviceName}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Cost
              </label>
              <input
                type="number"
                name="cost"
                value={editData.cost}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Frequency
              </label>
              <select
                name="billingFrequency"
                value={editData.billingFrequency}
                onChange={handleChange}
                className="input-field"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={editData.category}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Next Renewal
            </label>
            <input
              type="date"
              name="nextRenewal"
              value={editData.nextRenewal}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={handleCancel}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleEdit}
              className="btn-primary"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`card p-8 relative overflow-hidden transition-all duration-300 ${
      isRenewingSoon ? 'ring-2 ring-orange-500/50 pulse-glow' : 
      isOverdue ? 'ring-2 ring-red-500/50' : ''
    }`}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full -translate-y-12 translate-x-12"></div>
      
      {/* Renewing Soon Badge */}
      {isRenewingSoon && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg z-10">
          🔥 Renewing Soon
        </div>
      )}

      {/* Overdue Badge */}
      {isOverdue && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg z-10">
          ⚠️ Overdue
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {subscription.serviceName}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(subscription.id)}
            className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Cost Information */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
            <DollarSign className="text-white" size={20} />
          </div>
          <div>
            <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              ${monthlyCost.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
              /month
            </span>
          </div>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
          {subscription.billingFrequency === 'yearly' 
            ? `$${subscription.cost.toFixed(2)} yearly` 
            : `$${subscription.cost.toFixed(2)} monthly`
          }
        </div>

        {/* Category */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
            <Tag className="text-white" size={16} />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {subscription.category}
          </span>
        </div>

        {/* Renewal Date */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <Calendar className="text-white" size={16} />
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Renews {format(renewalDate, 'MMM dd, yyyy')}
          </span>
        </div>

        {/* Days Until Renewal */}
        <div className={`flex items-center space-x-3 p-3 rounded-lg ${
          isOverdue 
            ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' 
            : isRenewingSoon 
            ? 'bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800' 
            : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
        }`}>
          <div className={`p-2 rounded-lg ${
            isOverdue 
              ? 'bg-red-500' 
              : isRenewingSoon 
              ? 'bg-orange-500' 
              : 'bg-blue-500'
          }`}>
            {isOverdue ? (
              <AlertTriangle className="text-white" size={16} />
            ) : (
              <Clock className="text-white" size={16} />
            )}
          </div>
          <span className={`text-sm font-semibold ${
            isOverdue 
              ? 'text-red-700 dark:text-red-400' 
              : isRenewingSoon 
              ? 'text-orange-700 dark:text-orange-400' 
              : 'text-blue-700 dark:text-blue-400'
          }`}>
            {isOverdue 
              ? `${Math.abs(daysUntilRenewal)} days overdue` 
              : `${daysUntilRenewal} days until renewal`
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard; 