import React from 'react'
import { Outlet } from 'react-router-dom'
import LoadingSpinner from '../../Spinner/LoadingSpinner'
import ClinicNav from './ClinickNav'

const ClinicsLayout = () => {
  return (
    <div>
    <ClinicNav/>
    <main>
      <Outlet/>
    </main>
    <LoadingSpinner/>
  </div>
  )
}

export default ClinicsLayout
