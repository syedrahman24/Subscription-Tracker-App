import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';

const PieChartBreakdown = ({ subscriptions }) => {
  // Calculate spending by category
  const categoryData = subscriptions.reduce((acc, sub) => {
    const monthlyCost = sub.billingFrequency === 'yearly' ? sub.cost / 12 : sub.cost;
    const category = sub.category;
    
    if (acc[category]) {
      acc[category] += monthlyCost;
    } else {
      acc[category] = monthlyCost;
    }
    
    return acc;
  }, {});

  // Convert to array format for Recharts
  const chartData = Object.entries(categoryData).map(([category, value]) => ({
    name: category,
    value: parseFloat(value.toFixed(2))
  }));

  // Enhanced color palette for different categories
  const COLORS = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', 
    '#8B5CF6', '#06B6D4', '#F97316', '#EC4899',
    '#84CC16', '#6366F1', '#14B8A6', '#F43F5E',
    '#06B6D4', '#8B5CF6', '#F59E0B', '#10B981'
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const total = chartData.reduce((sum, item) => sum + item.value, 0);
      const percentage = ((data.value / total) * 100).toFixed(1);
      
      return (
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-4 border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-xl">
          <p className="font-semibold text-gray-900 dark:text-white text-lg">
            {data.name}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            ${data.value.toFixed(2)} ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return null;
  }

  return (
    <div className="card p-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full -translate-y-16 translate-x-16"></div>
      
      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg">
            <PieChartIcon className="text-white" size={24} />
          </div>
          <h3 className="text-2xl font-bold gradient-text">
            Monthly Spending by Category
          </h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart */}
          <div className="lg:col-span-2">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="white"
                    strokeWidth={2}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Category Breakdown
            </h4>
            <div className="space-y-3">
              {chartData.map((item, index) => {
                const total = chartData.reduce((sum, i) => sum + i.value, 0);
                const percentage = ((item.value / total) * 100).toFixed(1);
                
                return (
                  <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full shadow-sm"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        ${item.value.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {percentage}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChartBreakdown; 