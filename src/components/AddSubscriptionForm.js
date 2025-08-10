import React, { useState } from 'react';
import { Plus, Sparkles, DollarSign, Calendar, Tag, Settings } from 'lucide-react';

const AddSubscriptionForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    serviceName: '',
    cost: '',
    billingFrequency: 'monthly',
    category: '',
    nextRenewal: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.serviceName || !formData.cost || !formData.category || !formData.nextRenewal) {
      alert('Please fill in all fields');
      return;
    }

    onAdd({
      ...formData,
      cost: parseFloat(formData.cost)
    });

    // Reset form
    setFormData({
      serviceName: '',
      cost: '',
      billingFrequency: 'monthly',
      category: '',
      nextRenewal: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="card p-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-blue-600/10 rounded-full -translate-y-16 translate-x-16"></div>
      
      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl shadow-lg">
            <Plus className="text-white" size={24} />
          </div>
          <h2 className="text-2xl font-bold gradient-text">
            Add New Subscription
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Service Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Service Name *
              </label>
              <div className="relative">
                <Sparkles className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="serviceName"
                  value={formData.serviceName}
                  onChange={handleChange}
                  placeholder="e.g., Netflix, Spotify, Adobe Creative Cloud"
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            {/* Cost */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Cost *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="number"
                  name="cost"
                  value={formData.cost}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            {/* Billing Frequency */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Billing Frequency *
              </label>
              <div className="relative">
                <Settings className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  name="billingFrequency"
                  value={formData.billingFrequency}
                  onChange={handleChange}
                  className="input-field pl-12"
                  required
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Category *
              </label>
              <div className="relative">
                <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g., Entertainment, Productivity, Software"
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            {/* Next Renewal Date */}
            <div className="lg:col-span-2 space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Next Renewal Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="date"
                  name="nextRenewal"
                  value={formData.nextRenewal}
                  onChange={handleChange}
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="submit"
              className="btn-primary flex items-center space-x-2 text-lg px-8 py-4"
            >
              <Plus size={20} />
              <span>Add Subscription</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubscriptionForm; 