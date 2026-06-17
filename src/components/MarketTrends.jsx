import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', price: 400 },
  { month: 'Feb', price: 300 },
  { month: 'Mar', price: 600 },
  { month: 'Apr', price: 800 },
  { month: 'May', price: 700 },
  { month: 'Jun', price: 900 },
];

export default function MarketTrends() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold mb-6 text-slate-800">Feed Market Trends (KES/Unit)</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="var(--accent-primary)" 
              strokeWidth={3} 
              dot={{ r: 6 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}