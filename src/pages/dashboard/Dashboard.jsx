import React, { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard'
import NewDashboard from './NewDashboard'
import ResDashboard from './ResDashboard'

const Dashboard = () => {
  const userType = parseInt(localStorage.getItem('userType'))
  // typeof(userType)
  const getDashboardComponent = (type) => {
    switch (type) {
      case 0:
        return <AdminDashboard />
      case 1:
        return <NewDashboard />
      case 2:
        return <ResDashboard />
      default:
        return <NewDashboard />
    }
  }
  return getDashboardComponent(userType)
}
export default Dashboard
