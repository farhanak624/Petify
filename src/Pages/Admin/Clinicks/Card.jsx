import React from 'react'

const Card = ({img,location,title}) => {
  return (
    <div className='rounded-2xl border-gray-100 shadow-lg border-2 p-2.5 h-[255px]'>
        <img src={img} className='rounded-2xl h-40 object-cover'alt="" />
        <h1 className='py-2 font-semibold'>{title}</h1>
        <div className='flex pr-2'>
        <div className='mt-2 mr-2' >
        <svg width="16" height="20" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.99998 0C2.707 0 0 2.56787 0 6.23075C0 7.53791 0.307898 8.44721 0.879804 9.4543L5.59613 17.762C5.63606 17.8341 5.69457 17.8942 5.76559 17.9361C5.8366 17.9779 5.91754 18 5.99998 18C6.08241 18 6.16335 17.9779 6.23437 17.9361C6.30539 17.8942 6.3639 17.8341 6.40382 17.762L11.1201 9.4543C11.6921 8.44719 12 7.53789 12 6.23075C12 2.56787 9.29296 0 5.99998 0ZM5.99998 3.23076C7.52938 3.23076 8.7692 4.47058 8.7692 5.99998C8.7692 7.52935 7.52938 8.7692 5.99998 8.7692C4.47058 8.7692 3.23076 7.52935 3.23076 5.99998C3.23076 4.47058 4.47058 3.23076 5.99998 3.23076Z" fill="#B6B6B8"/>
        </svg>
        </div>
        <h3 className=' text-xs py-1'>{location}</h3>
        </div>
    </div>
  )
}

export default Card
