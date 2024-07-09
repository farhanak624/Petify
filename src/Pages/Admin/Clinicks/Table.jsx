import React,{useEffect,useState,useRef} from 'react'
import { getAllClinics } from '../../../Api/AdminApi'
import { useNavigate } from 'react-router-dom'

const  Table = () => {
  const [ page, setPage ] = useState(1)
  const [count , setCount ] = useState(0)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loading && hasMore) {
        setPage((prev) => prev + 1);
      }
    };

    const observer = new IntersectionObserver(observerCallback, options);

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loading, hasMore]);
    useEffect(()=>{
      getData(page)
    },[page])

    const getData = async(page)=>{
      setLoading(true)  
      try {
       const res = await getAllClinics(page)
       setCount(res.data?.count)
        if(res.data?.data.length > 0){
          setData((prev) => {
            return [...prev, ...res.data.data];
          });
        }else{
          setHasMore(false)
        }
       setData(res.data?.data)
      } catch (error) {
       console.log(error)
      }finally{
        setLoading(false)
      }
     }
     console.log({data})
  return (
    <div className='px-7 pt-8 col-span-2 text-nowrap overflow-x-auto shadow-lg rounded-3xl' >
      <div className=''>
        <h1 className='font-semibold text-base md:text-xl'>clinics</h1>           
      </div>
      <div className='table overflow-x-auto pr-6'>

      {
        data.map((clinic, index) => {
          return (
            <div key={index} className='grid grid-cols-12 align-middle border-b-gray-300 border-b'>
              <div className='w-16 col-span-3 h-16 rounded-full border m-3'>
              <img className='w-16 h-16 rounded-full' src={clinic.image} alt="" />
              </div>
              <div className='m-5 col-span-6  md:mr-auto'>
                  <h1 className='text-xl font-semibold text-wrap'>{clinic.clinicName}</h1>
                  { clinic.city && <p className='text-md text-gray-400'>{clinic.city}</p>}
              </div>
              <div className='my-5 md:mx-0 mx-2 col-span-3'> 
                  <button style={{backgroundColor : 'rgba(243, 243, 255, 1)'}}  className='p-3 rounded-full ' onClick={() => {navigate(`/clinicOverview/${clinic._id}`)}} >View Details</button>
              </div>
            </div>
          )
        })
      }
      <div ref={loader} className="h-10" />
      
    </div>
    </div>
  )
}

export default Table
