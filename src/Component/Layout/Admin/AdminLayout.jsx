import React from 'react'
import { Outlet } from "react-router-dom";
import Nav from './Nav';
import LoadingSpinner from '../../Spinner/LoadingSpinner';

const AdminLayout = () => {
  return (
    <div>
      <Nav/>
      <main>
        <Outlet/>
      </main>
      <LoadingSpinner/>
    </div>
  )
}

export default AdminLayout
