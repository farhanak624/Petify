import React, { useState } from 'react'
import { blockCommunity } from '../../../Api/AdminApi'

const ToggleButton = ({ id, status, index, community, setCommunity}) => {
    const [bookingStatus, setBookingStatus] = useState(status)
    const handleClick = async () => {
      try {
        await blockCommunity(id);
        setBookingStatus(community[index].status);
        setCommunity((prev)=>{
          const newCommunity = prev?.map((item,i)=>{
            if(item.id === id ){
              item.status = item.status === 'Active' ? 'Inactive' : 'Active';
            }
            return item;
          })
          return newCommunity;
        });
      } catch (error) {
        
      }
    }
  return (
    <button className={`w-10 h-6 rounded-full focus:outline-none`} 
    style={{backgroundColor : community[index].status === "Active"
        ? 'rgba(245, 137, 90, 1)'
        : 'rgba(230, 230, 230, 1)'}}
    onClick={()=>{handleClick()}}
    >
        <div className={`w-4 h-4 rounded-full m-1 shadow-md transform duration-300 ${community[index].status === "Active" ? 'translate-x-4 bg-white' : 'translate-x-0 bg-gray-100'}`}></div>
    </button>
  )
}

export default ToggleButton
