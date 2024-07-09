import React from 'react'
import ServiceTable from './ServiceTable'

const Services = () => {
  return (
    <div>
      <div className="flex justify-between p-5">
        <p className="font-bold text-2xl">Pet Grooming</p>
        
      </div>
      <div>
        <ServiceTable/>
      </div>
    </div>
  )
}

export default Services
