import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { CustomerDashboard } from './CustomerDashboard';
import { EmployeeDashboard } from './EmployeeDashboard';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return user.type === 'customer' ? <CustomerDashboard /> : <EmployeeDashboard />;
};