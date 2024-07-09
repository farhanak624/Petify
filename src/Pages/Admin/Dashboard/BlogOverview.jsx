import React, { useEffect, useState } from 'react'
import { deleteBlog, getBlogDetails } from '../../../Api/AdminApi';
import { toast } from 'react-toastify';

const BlogOverview = ({closeModal, selectedBlog, setChange}) => {
    const [blog, setBlog] = useState();
    useEffect(()=>{
        (async()=>{
            try {
                const res = await getBlogDetails(selectedBlog);
                setBlog(res.data?.blog);
            } catch (error) {
                console.log(error.response?.data?.message);
                toast.error(error.response?.data?.message)
            }
        })()
    },[])
    const formatDateFromISO = (isoString) => {
        const date = new Date(isoString);
    
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
    
        const formattedDate = `${day}-${month}-${year}`;
    
        return formattedDate;
    }

    const handleDelete = async (id) => {
        console.log(id);
        try {
          const res = await deleteBlog(id);
          setChange(true);
          toast.success(res.data?.message);
        } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.message)
        }
      };

  return (
    <>
        <div onClick={closeModal} className="fixed top-0 left-0 w-full overflow-x-auto scroll-none h-full flex items-center justify-center bg-gray-700 bg-opacity-80">
            <div className="relative bg-white top-24 rounded-2xl overflow-y-auto w-3/5">
                <div className='relative p-4'>
                <img src={blog?.blogImage} alt="" />
                <svg onClick={closeModal} className=" absolute top-4 right-4 m-3 mx-1 cursor-pointer"  width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="30" height="30" rx="5" fill="#F5895A" fill-opacity="0.2"/>
            <path d="M21.1752 8L15 14.1752L8.82483 8L8 8.82483L14.1752 15L8 21.1752L8.82483 22L15 15.8248L21.1752 22L22 21.1752L15.8248 15L22 8.82483L21.1752 8Z" fill="#F5895A" stroke="#F5895A"/>
            </svg>
            
        </div>  
                <div className='p-4 flex justify-between'>
                    <h1 className=' font-semibold text-xl'>{blog?.title}</h1>
                    <button style={{color:'rgba(238, 81, 88, 1)',backgroundColor:'rgba(255, 222, 223, 1)'}} className='text-lg p-2 -mt-2 rounded-lg' onClick={()=>handleDelete(blog._id)}>Remove</button>
                </div>
                <div className='flex items-center px-4'>
                    <img src="" className='w-16 h-16 rounded-full' alt="" />
                    <h2 className=' font-semibold text-lg mx-3'>{blog?.userId?.name}</h2>
                    <div className='flex ml-auto'>
                    <h4 className='text-gray-700 mx-2 -mt-0.5'>{formatDateFromISO(blog?.createdAt)}</h4>
                    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.4997 2.02734H14.0079V2.84093C14.3618 3.05467 14.6032 3.44307 14.6032 3.88894C14.6032 4.55773 14.0585 5.10702 13.3897 5.10702C12.7163 5.10702 12.1716 4.55773 12.1716 3.88894C12.1716 3.44307 12.4106 3.05467 12.7692 2.84093V2.02734H10.4042V2.84093C10.7628 3.05237 11.0018 3.44307 11.0018 3.88894C11.0018 4.55773 10.4571 5.10702 9.78371 5.10702C9.11491 5.10702 8.57022 4.55773 8.57022 3.88894C8.57022 3.44307 8.80924 3.05467 9.16547 2.84093V2.02734H6.80516V2.84093C7.16369 3.05467 7.40271 3.44307 7.40271 3.88894C7.40271 4.55773 6.85342 5.10702 6.18463 5.10702C5.51124 5.10702 4.96655 4.55773 4.96655 3.88894C4.96655 3.44307 5.20557 3.05007 5.5641 2.84093V2.02734H3.20838V2.84093C3.56231 3.05467 3.80363 3.44307 3.80363 3.88894C3.80363 4.55773 3.25894 5.10702 2.59014 5.10702C1.91675 5.10702 1.37206 4.55773 1.37206 3.88894C1.37206 3.44307 1.61108 3.05007 1.96961 2.84093V2.02734H1.47549C1.07099 2.02734 0.698672 2.19282 0.434372 2.46172C0.165475 2.72602 0 3.09833 0 3.50283V5.75283H15.9706V3.50283C15.9706 3.09833 15.8052 2.72602 15.5363 2.46172C15.2743 2.19282 14.9042 2.02734 14.4997 2.02734Z" fill="black" fill-opacity="0.4"/>
                    <path d="M0 16.5264C0 17.34 0.659602 17.9996 1.47319 17.9996H14.4974C15.311 17.9996 15.9706 17.34 15.9706 16.5264V6.16357H0V16.5264Z" fill="black" fill-opacity="0.4"/>
                    <path d="M2.58556 4.43565C2.88663 4.43565 3.13255 4.18973 3.13255 3.88866C3.13255 3.65883 2.99235 3.46578 2.7924 3.38304V0.206844C2.7924 0.0919304 2.70047 0 2.58556 0C2.47065 0 2.37872 0.0919304 2.37872 0.206844V3.38304C2.17877 3.46348 2.03857 3.65883 2.03857 3.88866C2.03857 4.19203 2.28449 4.43565 2.58556 4.43565Z" fill="black" fill-opacity="0.4"/>
                    <path d="M6.18712 4.43565C6.4882 4.43565 6.73411 4.18973 6.73411 3.88866C6.73411 3.65883 6.59392 3.46578 6.39397 3.38304V0.206844C6.39397 0.0919304 6.30204 0 6.18712 0C6.07221 0 5.98028 0.0919304 5.98028 0.206844V3.38304C5.78033 3.46348 5.64014 3.65883 5.64014 3.88866C5.64014 4.19203 5.88375 4.43565 6.18712 4.43565Z" fill="black" fill-opacity="0.4"/>
                    <path d="M9.78576 4.43565C10.0868 4.43565 10.3327 4.18973 10.3327 3.88866C10.3327 3.65883 10.1925 3.46578 9.9926 3.38304V0.206844C9.9926 0.0919304 9.90067 0 9.78576 0C9.67084 0 9.57891 0.0919304 9.57891 0.206844V3.38304C9.37896 3.46348 9.23877 3.65883 9.23877 3.88866C9.23877 4.19203 9.48468 4.43565 9.78576 4.43565Z" fill="black" fill-opacity="0.4"/>
                    <path d="M13.3873 4.43565C13.6884 4.43565 13.9343 4.18973 13.9343 3.88866C13.9343 3.65883 13.7941 3.46578 13.5942 3.38304V0.206844C13.5942 0.0919304 13.5022 0 13.3873 0C13.2724 0 13.1805 0.0919304 13.1805 0.206844V3.38304C12.9805 3.46348 12.8403 3.65883 12.8403 3.88866C12.8403 4.19203 13.0839 4.43565 13.3873 4.43565Z" fill="black" fill-opacity="0.4"/>
                    </svg>

                    </div>
                </div>
                <p className='p-5 h-60 scroll-none overflow-y-auto'>{blog?.blog}</p>
            </div>
        </div>
    </>
  )
}

export default BlogOverview
