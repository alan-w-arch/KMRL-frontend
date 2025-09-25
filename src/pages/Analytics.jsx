import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import {
  Users, FileText, TrendingUp, AlertTriangle, CheckCircle, Clock,
  Upload, Download, Eye, Search, Mail, MessageSquare, Building2,
  Shield, DollarSign, Wrench, UserCheck, Scale
} from 'lucide-react';

// Mock data - replace with actual API calls
const generateMockData = (userRole, userDepartment) => {
  const departments = ['Engineering', 'Procurement', 'HR', 'Finance', 'Legal & Compliance'];
  
  const documentActivity = [
    { month: 'Jan', uploads: 45, views: 234, downloads: 89 },
    { month: 'Feb', uploads: 52, views: 298, downloads: 103 },
    { month: 'Mar', uploads: 61, views: 356, downloads: 127 },
    { month: 'Apr', uploads: 48, views: 289, downloads: 98 },
    { month: 'May', uploads: 67, views: 412, downloads: 156 },
    { month: 'Jun', uploads: 71, views: 445, downloads: 178 }
  ];

  const complianceData = [
    { name: 'Compliant', value: 78, color: 'var(--color-success)' },
    { name: 'Pending', value: 15, color: 'var(--color-warning)' },
    { name: 'Non-Compliant', value: 7, color: 'var(--color-danger)' }
  ];

  const departmentStats = departments.map(dept => ({
    name: dept,
    documents: Math.floor(Math.random() * 200) + 50,
    users: Math.floor(Math.random() * 25) + 5,
    compliance: Math.floor(Math.random() * 30) + 70,
    color: `var(--color-${dept.toLowerCase().replace(' & ', '-').replace(/\s/g, '-')})`
  }));

  const priorityDistribution = [
    { name: 'Urgent', value: 12, color: 'var(--color-urgent)' },
    { name: 'High', value: 28, color: 'var(--color-high)' },
    { name: 'Medium', value: 45, color: 'var(--color-medium)' },
    { name: 'Low', value: 67, color: 'var(--color-low)' }
  ];

  return {
    documentActivity,
    complianceData,
    departmentStats: userRole === 'admin' ? departmentStats : departmentStats.filter(d => d.name === userDepartment),
    priorityDistribution,
    totalUsers: userRole === 'admin' ? 127 : departmentStats.find(d => d.name === userDepartment)?.users || 15,
    totalDocuments: userRole === 'admin' ? 1453 : Math.floor(Math.random() * 300) + 100,
    totalViews: userRole === 'admin' ? 12847 : Math.floor(Math.random() * 2000) + 500,
    complianceRate: userRole === 'admin' ? 85 : Math.floor(Math.random() * 20) + 75
  };
};

const Analytics = ({ userRole = 'admin', userDepartment = 'Engineering' }) => {
  const [data, setData] = useState(null);
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      // Replace with actual API calls using your functions
      setTimeout(() => {
        setData(generateMockData(userRole, userDepartment));
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, [userRole, userDepartment, timeRange]);

  const StatCard = ({ title, value, change, icon: Icon, color = 'primary' }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-neutral-900">{value}</p>
          {change && (
            <p className={`text-sm mt-2 flex items-center ${
              change > 0 ? 'text-success' : 'text-danger'
            }`}>
              <TrendingUp className={`h-4 w-4 mr-1 ${change < 0 ? 'rotate-180' : ''}`} />
              {Math.abs(change)}% vs last period
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color} bg-opacity-10`}>
          <Icon className={`h-6 w-6 text-${color}`} />
        </div>
      </div>
    </div>
  );

  const ChartCard = ({ title, children, className = "" }) => (
    <div className={`bg-white rounded-xl p-6 shadow-sm border border-neutral-200 ${className}`}>
      <h3 className="text-lg font-semibold text-neutral-900 mb-4">{title}</h3>
      {children}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const getDepartmentIcon = (dept) => {
    const iconMap = {
      'Engineering': Wrench,
      'Procurement': Building2,
      'HR': UserCheck,
      'Finance': DollarSign,
      'Legal & Compliance': Scale
    };
    return iconMap[dept] || FileText;
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                {userRole === 'admin' ? 'System Analytics' : `${userDepartment} Analytics`}
              </h1>
              <p className="text-neutral-600">
                {userRole === 'admin' 
                  ? 'Complete overview of document management system' 
                  : `Department insights and performance metrics`
                }
              </p>
            </div>
            
            <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="1month">Last Month</option>
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
              </select>
              
              {userRole === 'admin' && (
                <select 
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                >
                  <option value="all">All Departments</option>
                  <option value="engineering">Engineering</option>
                  <option value="procurement">Procurement</option>
                  <option value="hr">HR</option>
                  <option value="finance">Finance</option>
                  <option value="legal">Legal & Compliance</option>
                </select>
              )}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={data.totalUsers.toLocaleString()}
            change={8.2}
            icon={Users}
            color="engineering"
          />
          <StatCard
            title="Documents"
            value={data.totalDocuments.toLocaleString()}
            change={12.5}
            icon={FileText}
            color="procurement"
          />
          <StatCard
            title="Total Views"
            value={data.totalViews.toLocaleString()}
            change={-2.1}
            icon={Eye}
            color="hr"
          />
          <StatCard
            title="Compliance Rate"
            value={`${data.complianceRate}%`}
            change={4.3}
            icon={Shield}
            color="success"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Document Activity Chart */}
          <ChartCard title="Document Activity Trends" className="lg:col-span-2">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.documentActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="uploads" 
                  stackId="1" 
                  stroke="var(--color-accent)" 
                  fill="var(--color-accent)" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="views" 
                  stackId="2" 
                  stroke="var(--color-engineering)" 
                  fill="var(--color-engineering)" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="downloads" 
                  stackId="3" 
                  stroke="var(--color-success)" 
                  fill="var(--color-success)" 
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Compliance Distribution */}
          <ChartCard title="Compliance Overview">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.complianceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {data.complianceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Department Performance */}
          <ChartCard title={userRole === 'admin' ? "Department Performance" : "Department Metrics"}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.departmentStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="documents" fill="var(--color-accent)" name="Documents" />
                <Bar dataKey="users" fill="var(--color-engineering)" name="Users" />
                <Bar dataKey="compliance" fill="var(--color-success)" name="Compliance %" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Priority Distribution */}
          <ChartCard title="Task Priority Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.priorityDistribution} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="value" fill={(entry) => entry.color}>
                  {data.priorityDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Department Cards (Admin Only) */}
        {userRole === 'admin' && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">Department Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {data.departmentStats.map((dept) => {
                const IconComponent = getDepartmentIcon(dept.name);
                return (
                  <div key={dept.name} className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 hover:shadow-md transition-all duration-300 cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <IconComponent className="h-8 w-8" style={{ color: dept.color }} />
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-neutral-100 text-neutral-600">
                        {dept.compliance}% compliant
                      </span>
                    </div>
                    <h3 className="font-semibold text-neutral-900 mb-2">{dept.name}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Documents</span>
                        <span className="font-medium">{dept.documents}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Users</span>
                        <span className="font-medium">{dept.users}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <ChartCard title="Recent System Activity" className="mb-8">
          <div className="space-y-4">
            {[
              { icon: Upload, text: "New document uploaded to Engineering", time: "5 minutes ago", type: "info" },
              { icon: CheckCircle, text: "Compliance check completed for HR documents", time: "12 minutes ago", type: "success" },
              { icon: AlertTriangle, text: "Document review overdue in Finance", time: "1 hour ago", type: "warning" },
              { icon: Eye, text: "Safety manual viewed 23 times today", time: "2 hours ago", type: "info" },
              { icon: Mail, text: "Notification sent to Procurement team", time: "3 hours ago", type: "info" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                <div className={`p-2 rounded-full ${
                  activity.type === 'success' ? 'bg-success bg-opacity-10' :
                  activity.type === 'warning' ? 'bg-warning bg-opacity-10' :
                  'bg-engineering bg-opacity-10'
                }`}>
                  <activity.icon className={`h-4 w-4 ${
                    activity.type === 'success' ? 'text-success' :
                    activity.type === 'warning' ? 'text-warning' :
                    'text-engineering'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-900">{activity.text}</p>
                  <p className="text-xs text-neutral-600">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

export default Analytics;