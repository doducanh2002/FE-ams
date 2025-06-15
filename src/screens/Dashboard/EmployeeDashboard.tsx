import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../components/ui/toast';
import { 
  UsersIcon, 
  PlaneIcon, 
  TicketIcon, 
  BarChart3Icon,
  LogOutIcon,
  UserIcon,
  PlusIcon,
  SearchIcon
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

export const EmployeeDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const [stats, setStats] = useState({
    totalCustomers: 1250,
    totalFlights: 45,
    totalBookings: 890,
    revenue: 125000
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img className="w-8 h-8" alt="AMS Logo" src="/layer-1.svg" />
                <span className="font-['Bayon'] text-2xl text-orange-600 tracking-wider">AMS</span>
              </div>
              <span className="text-gray-600">|</span>
              <span className="text-lg font-medium text-gray-800">Employee Portal</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  {user?.firstName || user?.username}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="flex items-center gap-2"
              >
                <LogOutIcon className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Employee Dashboard
          </h1>
          <p className="text-gray-600">Manage airline operations and customer services</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Customers"
            value={stats.totalCustomers.toLocaleString()}
            icon={UsersIcon}
            color="bg-blue-500"
          />
          <StatCard
            title="Active Flights"
            value={stats.totalFlights}
            icon={PlaneIcon}
            color="bg-green-500"
          />
          <StatCard
            title="Total Bookings"
            value={stats.totalBookings.toLocaleString()}
            icon={TicketIcon}
            color="bg-purple-500"
          />
          <StatCard
            title="Revenue"
            value={formatCurrency(stats.revenue)}
            icon={BarChart3Icon}
            color="bg-orange-500"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <PlusIcon className="w-4 h-4 mr-2" />
                Add New Flight
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <UsersIcon className="w-4 h-4 mr-2" />
                Manage Customers
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TicketIcon className="w-4 h-4 mr-2" />
                View Bookings
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BarChart3Icon className="w-4 h-4 mr-2" />
                Generate Reports
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Search Customer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, email, or confirmation code"
                    className="pl-10"
                  />
                </div>
                <Button className="w-full">
                  Search Customer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'New booking created', customer: 'John Doe', time: '2 minutes ago' },
                { action: 'Flight AA101 updated', customer: 'System', time: '15 minutes ago' },
                { action: 'Customer profile updated', customer: 'Jane Smith', time: '1 hour ago' },
                { action: 'Payment processed', customer: 'Mike Johnson', time: '2 hours ago' },
              ].map((activity, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.customer}</p>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};