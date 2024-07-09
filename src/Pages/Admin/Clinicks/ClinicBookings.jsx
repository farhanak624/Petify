import React, { useEffect, useRef, useState } from 'react'
import { getBookings, getClinicLatestBookings } from '../../../Api/AdminApi';
import { useParams } from 'react-router-dom';

const ClinicBookings = ({selected}) => {
  const clinic = useParams()?.id;
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);
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
    useEffect(() => {
        (async()=> {
          setLoading(true);
            try {
              const res = await getBookings(selected,page);
              setCount(res.data?.totalCount);
              if (res.data?.latestBookings?.length > 0) {
                setBookings((prev) => [...prev, ...res.data?.latestBookings]);   
              } else {
                setHasMore(false);
              }
            } catch (error) {
              console.log(error);
            } finally {
              setLoading(false);
            }
        })()
    }, [selected,page])
    const formatDateFromISO = (isoString) => {
        const date = new Date(isoString);
    
        // Extract the date components
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
    
        // Extract the time components
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'pm' : 'am';
    
        // Convert hours from 24-hour format to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // The hour '0' should be '12'
        const formattedHours = String(hours);
    
        // Format the date and time
        const formattedDate = `${day}-${month}-${year} ${formattedHours}:${minutes} ${ampm}`;
    
        return formattedDate;
    }
    console.log({bookings})
  return (
    <div className="w-full bg-containerWhite px-1 rounded-lg overflow-x-auto scroll-none h-[40rem]">
      
      {/* buttondiv */}

      {/* table */}
      <table className="w-full md:text-center mt-4 scroll-none border overflow-x-auto text-nowrap">
        <thead
          className=" rounded-lg"
          style={{
            backgroundColor: "rgba(242, 242, 242, 1)",
            height: "50px",
          }}
        >
          <tr className="rounded-md text-xs">
            <td>
                <div className='flex justify-center'>
                    <span className='mt-1 mr-1'>
                <svg width="12" height="10" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.9964 10.2059C11.345 11.806 9.60757 12.1532 8.84227 11.9448C8.07698 11.7365 6.51601 11.7018 6.51601 11.7018C6.51601 11.7018 4.95072 11.7365 4.18542 11.9448C3.42013 12.1546 1.68124 11.806 2.02844 10.2059C2.37564 8.60593 3.90623 8.67535 4.32577 6.51837C4.74386 4.36138 6.51748 4.50026 6.51748 4.50026C6.51748 4.50026 8.28675 4.36138 8.70486 6.51837C9.12149 8.67535 10.6492 8.6059 10.9964 10.2059ZM8.12184 4.35994C9.06362 4.6319 10.1038 3.88833 10.4467 2.69915C10.7895 1.51143 10.3049 0.328043 9.3631 0.0560825C8.4213 -0.215902 7.38116 0.527694 7.03828 1.71687C6.69543 2.90459 7.18006 4.08798 8.12184 4.35994ZM12.025 3.9274C11.1179 3.55703 10.004 4.18492 9.53668 5.33065C9.06939 6.47643 9.42529 7.70466 10.3323 8.07354C11.2394 8.44244 12.3533 7.81602 12.8206 6.67027C13.2879 5.52451 12.932 4.29775 12.025 3.9274ZM4.90299 4.35994C5.84477 4.08795 6.32941 2.90459 5.98656 1.71687C5.6437 0.529159 4.6021 -0.214436 3.66174 0.0575481C2.7214 0.329509 2.23532 1.51287 2.57817 2.70061C2.92105 3.88833 3.96121 4.6319 4.90299 4.35994ZM2.69391 8.07354C3.60099 7.7032 3.95686 6.47497 3.48958 5.33065C3.02229 4.18634 1.90835 3.55703 1.0013 3.9274C0.094243 4.29775 -0.261634 5.52598 0.205651 6.67027C0.672913 7.81602 1.78685 8.44389 2.69391 8.07354Z" fill="#F5895A"/>
                </svg>
                    </span>
                    <span> Pet</span>
                
                </div>
            </td>
            <td>
                <div className='flex justify-center'>
                    <span className='mt-0.5 mr-1'>
                    <svg width="13" height="12" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.22541 0.51008H5.11479C4.97055 0.690449 4.85195 0.89166 4.76461 1.10807H1.07396V0.658167C1.07396 0.57668 1.14191 0.51008 1.22541 0.51008ZM0 13.627V13.8521C0 13.9336 0.0679536 14 0.151293 14H13.9549C14.0382 14 14.1061 13.9336 14.1061 13.8521V13.627C14.1061 13.5456 14.0382 13.4791 13.9549 13.4791H0.151293C0.0679536 13.479 0 13.5454 0 13.627ZM13.3494 12.5437H0.756785C0.673446 12.5437 0.605493 12.6102 0.605493 12.6917V12.9167C0.605493 12.9982 0.673446 13.0646 0.756785 13.0646H13.3495C13.4329 13.0646 13.5008 12.9982 13.5008 12.9167V12.6917C13.5008 12.6102 13.4329 12.5437 13.3494 12.5437ZM7.05307 0C5.92895 0 5.01767 0.891033 5.01767 1.99017C5.01767 3.08931 5.92895 3.98034 7.05307 3.98034C8.17719 3.98034 9.08848 3.08931 9.08848 1.99017C9.08848 0.891033 8.17719 0 7.05307 0ZM6.75337 0.850603H7.35278C7.43611 0.850603 7.50407 0.917046 7.50407 0.998534V1.54904H8.06709C8.15043 1.54904 8.21838 1.61549 8.21838 1.69697V2.28306C8.21838 2.36454 8.15043 2.43099 8.06709 2.43099H7.50407V2.9815C7.50407 3.06298 7.43611 3.12943 7.35278 3.12943H6.75337C6.67003 3.12943 6.60208 3.06298 6.60208 2.9815V2.43099H6.03906C5.95572 2.43099 5.88777 2.36454 5.88777 2.28306V1.69697C5.88777 1.61549 5.95572 1.54904 6.03906 1.54904H6.60208V0.998534C6.60208 0.917046 6.67003 0.850603 6.75337 0.850603ZM5.93296 8.37471C5.93296 8.26031 6.02784 8.16754 6.14484 8.16754C6.26183 8.16754 6.35671 8.26031 6.35671 8.37471V9.86358C6.35671 9.97797 6.26183 10.0707 6.14484 10.0707C6.02784 10.0707 5.93296 9.97797 5.93296 9.86358V8.37471ZM7.74928 8.37471C7.74928 8.26031 7.84416 8.16754 7.96115 8.16754C8.07815 8.16754 8.17303 8.26031 8.17303 8.37471V9.86358C8.17303 9.97797 8.07815 10.0707 7.96115 10.0707C7.84416 10.0707 7.74928 9.97797 7.74928 9.86358V8.37471ZM8.99136 0.51008H12.8807C12.9641 0.51008 13.032 0.576523 13.032 0.658011V1.10791H9.34154C9.2542 0.89166 9.1356 0.690605 8.99136 0.51008ZM0.393458 2.45778H4.64056C4.57854 2.14986 4.57854 1.83033 4.64056 1.5224H0.393458C0.310119 1.5224 0.242165 1.58885 0.242165 1.67033V2.3097C0.242165 2.39134 0.310119 2.45778 0.393458 2.45778ZM9.46559 2.45778H13.7127C13.796 2.45778 13.864 2.39134 13.864 2.30985V1.67049C13.864 1.589 13.796 1.52256 13.7127 1.52256H9.46559C9.52777 1.83033 9.52777 2.14986 9.46559 2.45778ZM13.0322 2.87212V12.3364H11.5196V5.90172C11.5196 5.78733 11.4247 5.69456 11.3077 5.69456H2.7986C2.6816 5.69456 2.58673 5.78733 2.58673 5.90172V12.3364H1.07412V2.87212H4.76477C5.12441 3.76378 6.01358 4.39468 7.05323 4.39468C8.09289 4.39468 8.98206 3.76378 9.3417 2.87212H13.0322ZM11.0957 12.3366V6.10905H7.26495V12.3366H11.0957ZM6.8412 12.3366V6.10905H3.01047V12.3366H6.8412Z" fill="#59AA81"/>
                    </svg>

                    </span>
                    <span> Service Provider</span>
                
                </div>
            </td>
            <td>
                <div className='flex justify-center'>
                    <span className=' mr-1'>
                    <svg width="12" height="14" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.83137 3.34029C3.81127 3.30412 3.78314 3.27197 3.75099 3.24786C3.73894 3.2358 3.72286 3.22776 3.70679 3.21973C3.72286 3.22776 3.73492 3.2358 3.75099 3.24786C3.78716 3.27197 3.81127 3.30412 3.83137 3.34029Z" fill="#EE5158"/>
                    <path d="M3.83105 3.33984C3.83909 3.35592 3.84713 3.37199 3.85115 3.38807C3.84713 3.37199 3.84311 3.35592 3.83105 3.33984Z" fill="#EE5158"/>
                    <path d="M8.57326 5.79496C8.56924 5.66234 8.55718 5.53374 8.54513 5.40113C8.53709 5.34085 8.53307 5.28458 8.52503 5.2243C8.50896 5.10776 8.49288 4.99524 8.47279 4.88271C8.46073 4.82243 8.4527 4.76215 8.44064 4.70589C8.38036 4.41253 8.30401 4.13122 8.21158 3.85393C8.19952 3.81374 8.18344 3.77355 8.17139 3.73337C8.14326 3.65299 8.11111 3.57262 8.07896 3.49626C8.03073 3.37972 7.97849 3.26318 7.92625 3.15066C7.89008 3.0743 7.85391 3.00196 7.81372 2.92963C7.75344 2.82112 7.69316 2.71262 7.62886 2.61215C7.60877 2.57598 7.58466 2.54383 7.56456 2.50766C7.49625 2.4072 7.42793 2.30673 7.35559 2.21028C7.30737 2.14598 7.25513 2.08168 7.2069 2.0214C7.11045 1.90888 7.014 1.80037 6.91354 1.69991C6.83718 1.62355 6.76083 1.55121 6.68045 1.4829C6.62821 1.43869 6.57596 1.39449 6.5197 1.35028C6.35896 1.2257 6.19419 1.11318 6.02139 1.02075C5.90886 0.956448 5.79232 0.900186 5.67578 0.851962C5.64765 0.839906 5.6155 0.827849 5.58737 0.815793C5.23372 0.679158 4.864 0.61084 4.49026 0.61084C4.44204 0.61084 4.39381 0.61084 4.34961 0.614858C4.22101 0.622896 4.08839 0.634952 3.96381 0.659064C3.83521 0.683176 3.71063 0.715326 3.58606 0.751494C3.52577 0.771588 3.46148 0.791681 3.4012 0.815793C3.15605 0.912242 2.92297 1.03682 2.69792 1.19355C2.64166 1.23374 2.5854 1.27392 2.53316 1.31813C2.39652 1.42664 2.2639 1.54318 2.13932 1.67579C2.08708 1.72804 2.03886 1.78028 1.99063 1.83654C1.9183 1.92093 1.84596 2.00533 1.77764 2.09776C1.72942 2.15804 1.68521 2.22234 1.64101 2.28664C0.921659 3.34355 0.559977 4.72197 0.628294 6.17272C0.648388 6.58262 0.700631 6.98047 0.785023 7.36627C0.793061 7.41047 0.805117 7.45066 0.813154 7.49487C0.845304 7.62347 0.877454 7.74804 0.913622 7.86861C0.937734 7.94898 0.965865 8.03337 0.993996 8.11375C1.03418 8.23431 1.07839 8.35487 1.12661 8.47141C1.15474 8.53571 1.18287 8.60403 1.21101 8.66833C1.26727 8.79291 1.32755 8.91749 1.39185 9.03805C1.45213 9.14655 1.51241 9.25506 1.57671 9.35552C1.5968 9.39169 1.62091 9.42384 1.64101 9.46001C1.70932 9.56048 1.77764 9.66094 1.84998 9.75739C1.8982 9.82169 1.95045 9.88599 1.99867 9.94627C2.50101 10.5491 3.08372 10.967 3.70662 11.184C4.07634 11.3126 4.46213 11.3689 4.85596 11.3528C4.90419 11.3488 4.95643 11.3488 5.00465 11.3408C5.06895 11.3327 5.13325 11.3247 5.19755 11.3166C5.2297 11.3126 5.26185 11.3046 5.294 11.3006C5.39045 11.2805 5.48288 11.2604 5.57531 11.2323C5.66774 11.2041 5.76017 11.172 5.84858 11.1358C5.89279 11.1157 5.93699 11.0996 5.9812 11.0795C6.36297 10.9027 6.71662 10.6495 7.0341 10.3321C7.25513 10.111 7.45204 9.86188 7.63288 9.58459C7.68513 9.50422 7.73737 9.41982 7.78559 9.33543C7.84587 9.22692 7.90615 9.1144 7.96242 9.00188C7.99055 8.94562 8.01868 8.88534 8.04279 8.82506C8.12718 8.6402 8.19952 8.44328 8.26382 8.24234C8.27185 8.21421 8.27989 8.1901 8.28793 8.16197C8.34017 7.98917 8.3884 7.81234 8.42858 7.6315C8.55316 7.05281 8.60541 6.43393 8.57326 5.79496ZM7.68111 7.79225C7.28727 8.95767 6.50363 9.84982 5.52709 10.1834C5.294 10.2637 5.05288 10.308 4.80372 10.32C4.76353 10.32 4.71933 10.324 4.67914 10.324C3.33288 10.324 2.13932 9.28721 1.58073 7.78019C1.55661 7.7159 1.53652 7.65561 1.51241 7.59132C1.49231 7.52702 1.47222 7.46272 1.45213 7.3944C1.38783 7.16533 1.33558 6.92421 1.29942 6.67907C1.29138 6.60673 1.27932 6.53842 1.27129 6.46608C1.25923 6.35758 1.25119 6.24907 1.24717 6.14057C1.19091 4.99926 1.48026 3.90215 2.05493 3.06224C2.18353 2.87337 2.32418 2.70056 2.4769 2.54383C2.73409 2.2786 3.02344 2.06963 3.32886 1.92093C3.40521 1.88477 3.48559 1.8486 3.56194 1.82047C3.66643 1.78028 3.77493 1.74813 3.88344 1.72C3.9397 1.70794 3.99194 1.69589 4.04821 1.68383C4.10447 1.67579 4.16073 1.66374 4.21699 1.65972C4.27325 1.65168 4.32951 1.64766 4.38578 1.64766C4.40587 1.64766 4.42194 1.64766 4.44204 1.64766C5.10512 1.63159 5.73606 1.87271 6.27456 2.29869C6.34288 2.35094 6.4112 2.41122 6.4755 2.46748C6.49559 2.48757 6.5197 2.50766 6.5398 2.52776C6.55989 2.54785 6.584 2.56795 6.6041 2.59206C6.6483 2.63224 6.68849 2.67645 6.72868 2.72066C6.76886 2.76486 6.80905 2.80907 6.84924 2.85729C6.88942 2.90552 6.92559 2.95374 6.96176 3.00196C6.99793 3.05019 7.0341 3.10243 7.07027 3.15467C7.10643 3.20692 7.13858 3.25916 7.17475 3.3114C7.2069 3.36365 7.24307 3.41991 7.27522 3.47617C7.33952 3.58869 7.3998 3.70122 7.45606 3.82178C7.52438 3.97047 7.58868 4.12318 7.64494 4.28393C7.66905 4.34823 7.68914 4.41253 7.70924 4.47683C7.71728 4.50898 7.72933 4.54113 7.73737 4.57327C7.7655 4.67374 7.78961 4.77421 7.81372 4.87468C7.8298 4.94299 7.84186 5.01131 7.85391 5.07963C7.86597 5.14795 7.87802 5.22028 7.89008 5.2886C7.91017 5.42926 7.92625 5.57393 7.93429 5.7186C7.9383 5.75477 7.9383 5.79094 7.94232 5.82711C7.97849 6.52636 7.88204 7.19346 7.68111 7.79225Z" fill="#EE5158"/>
                    <path d="M14.4001 8.6971H12.8569C12.8047 8.6971 12.7645 8.65691 12.7645 8.60467V8.3314H14.7457C14.9145 8.3314 15.0511 8.19476 15.0511 8.02598C15.0511 7.85719 14.9145 7.72056 14.7457 7.72056H12.7645V7.37093H14.7457C14.9145 7.37093 15.0511 7.2343 15.0511 7.06551C15.0511 6.89673 14.9145 6.76009 14.7457 6.76009H12.7645V6.41046H14.7457C14.9145 6.41046 15.0511 6.27383 15.0511 6.10504C15.0511 5.93626 14.9145 5.79962 14.7457 5.79962H12.7645V5.44999H14.7457C14.9145 5.44999 15.0511 5.31336 15.0511 5.14457C15.0511 4.97579 14.9145 4.83915 14.7457 4.83915H12.7645V4.48952H14.7457C14.9145 4.48952 15.0511 4.35289 15.0511 4.1841C15.0511 4.01532 14.9145 3.87868 14.7457 3.87868H12.7645V3.52906H14.7457C14.9145 3.52906 15.0511 3.39242 15.0511 3.22364C15.0511 3.05485 14.9145 2.91821 14.7457 2.91821H12.7645V2.57261H14.7457C14.9145 2.57261 15.0511 2.43597 15.0511 2.26719C15.0511 2.0984 14.9145 1.96176 14.7457 1.96176H12.7645V1.72466C12.7645 1.67242 12.8047 1.63223 12.8569 1.63223H14.4403C14.6372 1.63223 14.822 1.55588 14.9587 1.41522C15.0953 1.27457 15.1717 1.08971 15.1717 0.892791C15.1717 0.511015 14.8703 0.189519 14.4925 0.165407C13.7531 0.113164 12.8971 0.072977 12.1416 0.0569022C11.2092 0.03279 10.8114 0.358304 10.6466 1.25849C10.4899 2.11849 10.3171 3.11915 10.2689 4.11177C10.1684 6.17738 10.4417 8.19878 10.7069 10.1559C10.8596 11.2731 10.8917 12.3581 10.8033 13.3869C10.7752 13.7124 10.7551 14.042 10.731 14.3675C10.7069 14.697 10.6868 15.0306 10.6546 15.4003C10.6024 15.987 10.5421 16.6541 10.948 17.2167C11.2293 17.6066 11.6633 17.8678 12.1416 17.9321C12.2219 17.9441 12.3023 17.9481 12.3827 17.9481C12.7765 17.9481 13.1543 17.8155 13.4718 17.5623C13.9902 17.1524 14.2273 16.4411 14.0786 15.7499L14.0344 15.5409C13.9339 15.0788 13.8334 14.6166 13.741 14.1505C13.528 13.0895 13.3512 12.1331 13.1985 11.2208C13.1583 10.9797 13.1583 10.9797 13.4758 10.8029C13.5441 10.7667 13.6164 10.7265 13.6968 10.6783C13.9259 10.5417 14.2112 10.4091 14.4925 10.2805L14.7417 10.1639C15.0109 10.0353 15.1877 9.76206 15.1877 9.46467C15.1757 9.04271 14.8261 8.6971 14.4001 8.6971ZM12.3224 16.8952C11.9607 16.8952 11.6714 16.6019 11.6714 16.2442C11.6714 15.8825 11.9647 15.5932 12.3224 15.5932C12.6841 15.5932 12.9734 15.8865 12.9734 16.2442C12.9734 16.6059 12.6841 16.8952 12.3224 16.8952Z" fill="#EE5158"/>
                    <path d="M5.90044 12.5788C5.88035 12.41 5.72362 12.2935 5.55885 12.3176C5.39409 12.3377 5.27352 12.4944 5.29764 12.6592L5.84418 16.7623C5.86427 16.923 5.79194 17.0476 5.73166 17.124C5.59904 17.2807 5.38203 17.3812 5.14493 17.3932C4.91184 17.4053 4.68278 17.3249 4.5381 17.1802C4.46577 17.1079 4.38539 16.9914 4.38941 16.8306L4.54614 12.6954C4.55418 12.5266 4.42156 12.3859 4.25278 12.3779C4.08801 12.3658 3.94334 12.5025 3.9353 12.6713L3.78259 16.8065C3.77053 17.1039 3.88707 17.3892 4.11212 17.6102C4.3653 17.8594 4.72296 18 5.10474 18C5.12885 18 5.15296 18 5.18109 18C5.591 17.98 5.96474 17.8031 6.20586 17.5138C6.4068 17.2727 6.49521 16.9753 6.45904 16.6819L5.90044 12.5788Z" fill="#EE5158"/>
                    <path d="M7.6689 1.63185C6.74862 0.522689 5.55908 -0.0560039 4.31329 0.00427658C3.07151 0.064557 1.93824 0.751754 1.12646 1.94129C0.330757 3.10671 -0.0670941 4.61774 0.00926111 6.20111C0.0856163 7.78447 0.620103 9.2513 1.52431 10.3363C2.4044 11.3933 3.52964 11.9679 4.70712 11.9679C4.76338 11.9679 4.82366 11.9679 4.87992 11.9639C7.40768 11.8434 9.34068 9.06242 9.18395 5.76709C9.11161 4.18372 8.5731 2.7169 7.6689 1.63185ZM8.42441 7.63176C8.38422 7.8126 8.34002 7.98943 8.28376 8.16223C8.27572 8.19036 8.26768 8.21447 8.25965 8.24261C8.19535 8.44354 8.11899 8.63644 8.03862 8.82532C8.01451 8.8856 7.98637 8.94186 7.95824 9.00214C7.90198 9.11868 7.8417 9.2312 7.78142 9.33569C7.7332 9.42008 7.68095 9.50448 7.62871 9.58485C7.44787 9.86214 7.25095 10.1113 7.02992 10.3323C6.71245 10.6498 6.3588 10.903 5.97703 11.0798C5.93282 11.0999 5.88861 11.12 5.84441 11.1361C5.756 11.1722 5.66357 11.2044 5.57114 11.2325C5.47871 11.2606 5.38628 11.2848 5.28983 11.3008C5.25768 11.3089 5.22553 11.3129 5.19338 11.3169C5.12908 11.329 5.06478 11.337 5.00048 11.341C4.95226 11.345 4.90403 11.3491 4.85179 11.3531C4.45796 11.3692 4.07216 11.3129 3.70244 11.1843C3.07553 10.9673 2.49282 10.5453 1.9945 9.94653C1.94225 9.88625 1.89403 9.82195 1.84581 9.75765C1.77347 9.6612 1.70515 9.56476 1.63683 9.46027C1.61674 9.4241 1.59263 9.39195 1.57253 9.35578C1.50823 9.2513 1.44795 9.14681 1.38767 9.03831C1.32337 8.91775 1.26309 8.79317 1.20683 8.66859C1.1787 8.60429 1.15057 8.53999 1.12244 8.47167C1.07422 8.35513 1.03001 8.23457 0.989823 8.11401C0.961692 8.03363 0.93758 7.95326 0.909449 7.86887C0.873281 7.74429 0.837113 7.61971 0.808982 7.49513C0.796926 7.45092 0.788888 7.41074 0.780851 7.36653C0.696458 6.98073 0.644215 6.58288 0.624122 6.17298C0.555804 4.72223 0.913468 3.34381 1.63683 2.2869C1.68104 2.2226 1.72524 2.1583 1.77347 2.09802C1.84179 2.00559 1.91412 1.91718 1.98646 1.8368C2.03468 1.78054 2.08693 1.7283 2.13515 1.67605C2.25973 1.54746 2.39235 1.4269 2.52898 1.31839C2.58123 1.27419 2.63749 1.234 2.69375 1.19381C2.9188 1.03708 3.15188 0.908483 3.39702 0.816053C3.4573 0.791941 3.51758 0.771848 3.58188 0.751754C3.70646 0.711567 3.83104 0.679418 3.95964 0.659324C4.08824 0.635212 4.21684 0.623156 4.34544 0.615119C4.39366 0.6111 4.44188 0.6111 4.48609 0.6111C4.85983 0.6111 5.22955 0.679418 5.58319 0.816053C5.61132 0.828109 5.64347 0.840166 5.6716 0.852222C5.78815 0.900446 5.90469 0.956708 6.01721 1.02101C6.186 1.11746 6.35478 1.22596 6.51553 1.35054C6.56777 1.39073 6.62404 1.43493 6.67628 1.48316C6.75665 1.55148 6.83301 1.62381 6.90936 1.70017C7.00983 1.80063 7.1103 1.90914 7.20273 2.02166C7.25497 2.08194 7.3032 2.14624 7.35142 2.21054C7.42376 2.30699 7.49207 2.40746 7.56039 2.50792C7.5845 2.54007 7.6046 2.57624 7.62469 2.61241C7.68899 2.7169 7.74927 2.82138 7.80955 2.92989C7.84974 3.00222 7.88591 3.07858 7.92207 3.15092C7.97432 3.26344 8.02656 3.37998 8.07479 3.49652C8.10694 3.57288 8.13908 3.65325 8.16722 3.73363C8.17927 3.77381 8.19535 3.814 8.2074 3.85419C8.29983 4.12746 8.37619 4.41279 8.43647 4.70615C8.44852 4.76643 8.46058 4.82671 8.46862 4.88297C8.48871 4.9955 8.50479 5.11204 8.52086 5.22456C8.5289 5.28484 8.53292 5.34111 8.54095 5.40139C8.55301 5.52998 8.56507 5.6626 8.56909 5.79522C8.60525 6.43419 8.55301 7.05307 8.42441 7.63176Z" fill="#EE5158"/>
                    <path d="M7.93815 5.71493C7.93012 5.57026 7.91404 5.42559 7.89395 5.28493C7.88189 5.2126 7.87386 5.14428 7.85778 5.07596C7.84572 5.00764 7.82965 4.93932 7.81759 4.87101C7.79348 4.77054 7.76937 4.67007 7.74124 4.5696C7.7332 4.53745 7.72114 4.50531 7.71311 4.47316C7.69301 4.40886 7.67292 4.34456 7.64881 4.28026C7.59255 4.11951 7.52825 3.9668 7.45993 3.81811C7.40367 3.70157 7.34339 3.58502 7.27909 3.4725C7.24694 3.41624 7.21479 3.364 7.17862 3.30773C7.14647 3.25549 7.1103 3.20325 7.07413 3.151C7.03797 3.09876 7.0018 3.05054 6.96563 2.99829C6.92946 2.95007 6.88927 2.90185 6.85311 2.85362C6.81292 2.8054 6.77273 2.76119 6.73254 2.71699C6.69236 2.67278 6.65217 2.62857 6.60797 2.58839C6.58787 2.56829 6.56778 2.5482 6.54367 2.52409C6.52357 2.50399 6.49946 2.4839 6.47937 2.46381C6.41507 2.40353 6.34675 2.34726 6.27843 2.29502C5.73993 1.86904 5.10899 1.63194 4.44591 1.64399C4.42581 1.64399 4.40974 1.64399 4.38964 1.64399C4.33338 1.64801 4.27712 1.65203 4.22086 1.65605C4.1646 1.66007 4.10834 1.66811 4.05207 1.68016C3.99581 1.6882 3.93955 1.70025 3.88731 1.71633C3.7788 1.74446 3.6703 1.77661 3.56581 1.8168C3.48544 1.84895 3.40908 1.8811 3.33273 1.91726C3.02731 2.06596 2.73796 2.27895 2.48076 2.54016C2.32805 2.69287 2.1874 2.86568 2.0588 3.05857C1.48413 3.9025 1.19478 4.99559 1.25104 6.1369C1.25506 6.2454 1.2631 6.35391 1.27515 6.46241C1.28319 6.53475 1.29123 6.60307 1.30329 6.6754C1.33945 6.92054 1.3917 7.16166 1.456 7.39073C1.47609 7.45503 1.49618 7.52335 1.51628 7.58765C1.53637 7.65195 1.56048 7.71624 1.58459 7.77652C2.14319 9.28354 3.34076 10.3204 4.68301 10.3204C4.7232 10.3204 4.76338 10.3204 4.80759 10.3163C5.05675 10.3043 5.29787 10.2561 5.53095 10.1797C6.5075 9.84615 7.29114 8.954 7.68498 7.78858C7.88591 7.1898 7.98236 6.52269 7.95021 5.81942C7.94217 5.78727 7.94217 5.7511 7.93815 5.71493ZM2.94291 4.30839C2.93488 4.30035 2.92282 4.29231 2.91478 4.28428C2.80628 4.17979 2.7902 4.00297 2.88263 3.88241L3.32067 3.30773C3.32871 3.2997 3.33675 3.28764 3.34478 3.2796C3.3488 3.27558 3.35282 3.27157 3.35684 3.26755C3.43721 3.19521 3.54974 3.1711 3.6502 3.19923C3.65422 3.19923 3.65824 3.20325 3.66226 3.20325C3.67432 3.20727 3.69039 3.21128 3.70245 3.21932C3.71852 3.22736 3.73058 3.2354 3.74665 3.24745C3.78282 3.27157 3.80693 3.30371 3.82703 3.33988C3.83506 3.35596 3.8431 3.37203 3.84712 3.38811C3.86721 3.45241 3.87123 3.52072 3.84712 3.58502C3.83908 3.61717 3.82301 3.6453 3.7989 3.67344L3.36086 4.24811C3.30058 4.32848 3.20815 4.36867 3.11974 4.36867C3.06347 4.37269 2.99918 4.34858 2.94291 4.30839ZM4.77544 3.74577C4.77142 3.77792 4.76338 3.81007 4.75133 3.8382C4.74329 3.85428 4.73927 3.87035 4.72722 3.88241C4.7232 3.89044 4.71918 3.89848 4.71114 3.9025L3.83506 5.05587C3.77478 5.13624 3.68235 5.17643 3.58992 5.17643C3.52562 5.17643 3.46133 5.15633 3.40506 5.11615C3.40105 5.11213 3.39703 5.10811 3.38899 5.10409C3.38095 5.09605 3.37291 5.08802 3.36488 5.07998C3.3046 5.01568 3.28048 4.93129 3.2845 4.85091C3.28852 4.8268 3.29254 4.80269 3.30058 4.77858C3.3046 4.77054 3.3046 4.7625 3.30862 4.75446C3.31665 4.73839 3.32067 4.72232 3.33273 4.71026C3.33675 4.70222 3.34076 4.6982 3.3488 4.69017L4.22488 3.5368C4.32535 3.40418 4.51824 3.37605 4.65086 3.47652C4.65488 3.48054 4.6589 3.48456 4.66693 3.48858C4.67095 3.49259 4.67497 3.49661 4.67899 3.50063C4.68301 3.50465 4.68703 3.50867 4.69105 3.51269C4.75133 3.57699 4.77946 3.66138 4.77544 3.74577Z" fill="#EE5158"/>
                    </svg>

                    </span>
                    <span>Service</span>
                
                </div>
            </td>
            <td>
                <div className='flex justify-center'>
                    <span className='mt-1 mr-1'>
                    <svg width="15" height="12" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.27992 10.0475H4.47023C4.58333 10.0475 4.67489 9.95589 4.67489 9.84279V8.7198C4.67489 8.6067 4.58333 8.51514 4.47023 8.51514H3.27992C3.16681 8.51514 3.07525 8.6067 3.07525 8.7198V9.84279C3.07256 9.95589 3.16681 10.0475 3.27992 10.0475Z" fill="#E8AB62"/>
                    <path d="M8.89515 15.3272H10.0855C10.1986 15.3272 10.2901 15.2357 10.2901 15.1226V13.9996C10.2901 13.8865 10.1986 13.7949 10.0855 13.7949H8.89515C8.78205 13.7949 8.69049 13.8865 8.69049 13.9996V15.1226C8.68779 15.233 8.78205 15.3272 8.89515 15.3272Z" fill="#E8AB62"/>
                    <path d="M14.5099 15.3272H15.7002C15.8133 15.3272 15.9049 15.2357 15.9049 15.1226V13.9996C15.9049 13.8865 15.8133 13.7949 15.7002 13.7949H14.5099C14.3968 13.7949 14.3052 13.8865 14.3052 13.9996V15.1226C14.3025 15.233 14.3968 15.3272 14.5099 15.3272Z" fill="#E8AB62"/>
                    <path d="M14.5099 10.0475H15.7002C15.8133 10.0475 15.9049 9.95589 15.9049 9.84279V8.7198C15.9049 8.6067 15.8133 8.51514 15.7002 8.51514H14.5099C14.3968 8.51514 14.3052 8.6067 14.3052 8.7198V9.84279C14.3025 9.95589 14.3968 10.0475 14.5099 10.0475Z" fill="#E8AB62"/>
                    <path d="M8.89515 10.0475H10.0855C10.1986 10.0475 10.2901 9.95589 10.2901 9.84279V8.7198C10.2901 8.6067 10.1986 8.51514 10.0855 8.51514H8.89515C8.78205 8.51514 8.69049 8.6067 8.69049 8.7198V9.84279C8.68779 9.95589 8.78205 10.0475 8.89515 10.0475Z" fill="#E8AB62"/>
                    <path d="M3.27992 15.3272H4.47023C4.58333 15.3272 4.67489 15.2357 4.67489 15.1226V13.9996C4.67489 13.8865 4.58333 13.7949 4.47023 13.7949H3.27992C3.16681 13.7949 3.07525 13.8865 3.07525 13.9996V15.1226C3.07256 15.233 3.16681 15.3272 3.27992 15.3272Z" fill="#E8AB62"/>
                    <path d="M0 16.0233C0 17.1139 0.885997 17.9999 1.97666 17.9999H17.0036C18.0943 17.9999 18.9803 17.1139 18.9803 16.0233V5.67676H0V16.0233ZM13.0907 8.71985C13.0907 7.93618 13.7262 7.30064 14.5099 7.30064H15.7002C16.4838 7.30064 17.1194 7.93618 17.1194 8.71985V9.84283C17.1194 10.6265 16.4838 11.262 15.7002 11.262H14.5099C13.7262 11.262 13.0907 10.6265 13.0907 9.84283V8.71985ZM13.0907 13.9981C13.0907 13.2145 13.7262 12.5789 14.5099 12.5789H15.7002C16.4838 12.5789 17.1194 13.2145 17.1194 13.9981V15.1211C17.1194 15.9048 16.4838 16.5403 15.7002 16.5403H14.5099C13.7262 16.5403 13.0907 15.9048 13.0907 15.1211V13.9981ZM7.47576 8.71985C7.47576 7.93618 8.11131 7.30064 8.89497 7.30064H10.0853C10.8689 7.30064 11.5045 7.93618 11.5045 8.71985V9.84283C11.5045 10.6265 10.8689 11.262 10.0853 11.262H8.89497C8.11131 11.262 7.47576 10.6265 7.47576 9.84283V8.71985ZM7.47576 13.9981C7.47576 13.2145 8.11131 12.5789 8.89497 12.5789H10.0853C10.8689 12.5789 11.5045 13.2145 11.5045 13.9981V15.1211C11.5045 15.9048 10.8689 16.5403 10.0853 16.5403H8.89497C8.11131 16.5403 7.47576 15.9048 7.47576 15.1211V13.9981ZM1.86086 8.71985C1.86086 7.93618 2.49641 7.30064 3.28007 7.30064H4.47038C5.25404 7.30064 5.88959 7.93618 5.88959 8.71985V9.84283C5.88959 10.6265 5.25404 11.262 4.47038 11.262H3.28007C2.49641 11.262 1.86086 10.6265 1.86086 9.84283V8.71985ZM1.86086 13.9981C1.86086 13.2145 2.49641 12.5789 3.28007 12.5789H4.47038C5.25404 12.5789 5.88959 13.2145 5.88959 13.9981V15.1211C5.88959 15.9048 5.25404 16.5403 4.47038 16.5403H3.28007C2.49641 16.5403 1.86086 15.9048 1.86086 15.1211V13.9981Z" fill="#E8AB62"/>
                    <path d="M17.0036 0H15.3716V0.667864C15.3716 1.0018 15.0996 1.27379 14.7657 1.27379C14.4318 1.27379 14.1598 1.0018 14.1598 0.667864V0H4.82047V0.667864C4.82047 1.0018 4.54847 1.27379 4.21454 1.27379C3.88061 1.27379 3.60862 1.0018 3.60862 0.667864V0H1.97666C0.885997 0 0 0.885997 0 1.97666V4.4623H18.9829V1.97666C18.9803 0.885997 18.0943 0 17.0036 0Z" fill="#E8AB62"/>
                    </svg>


                    </span>
                    <span> Service On</span>
                
                </div>
            </td>
            <td>
                <div className='flex justify-center'>
                    <span className='mt-0.5 mr-1'>
                    <svg width="15" height="15" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 0C4.03579 0 0 4.03579 0 9C0 13.9642 4.03579 18 9 18C13.9642 18 18 13.9642 18 9C18 4.03579 13.9642 0 9 0ZM14.04 9.85263H12.6758L11.3495 12.5053C11.1789 12.7895 10.8947 12.9789 10.5726 12.9789C10.2505 12.9789 9.94737 12.7895 9.81474 12.5053L7.42737 7.78737L6.63158 9.37895C6.48 9.66316 6.19579 9.85263 5.87368 9.85263H3.97895C3.50526 9.85263 3.12632 9.47368 3.12632 9C3.12632 8.52632 3.50526 8.14737 3.97895 8.14737H5.34316L6.66947 5.49474C6.95368 4.92632 7.90105 4.92632 8.18526 5.49474L10.5537 10.2126L11.3684 8.60211C11.52 8.31789 11.8042 8.12842 12.1263 8.12842H14.0211C14.4947 8.12842 14.8737 8.50737 14.8737 8.98105C14.8737 9.45474 14.5137 9.85263 14.04 9.85263Z" fill="#851B69"/>
                    </svg>

                    </span>
                    <span> Status</span>
                
                </div>
            </td>
            
          </tr>
        </thead>
        <tbody>
          {
            bookings.map((booking, index) => (
              <tr key={index} className='rounded-md border-b border-b-gray-300 m-4 text-xs'>
                <td className='p-4'>
                    <div className=' flex'>
                        <img src="/Ellipse 1957.png" alt="" className='w-6 h-6 mr-2 rounded-full'/>
                        <div>
                            <h1 className='md:text-xs  text-xs font-normal'>{booking.petName}</h1>
                            <h3 style={{fontSize:'0.50rem', lineHeight:'0.5rem'}} className='text-gray-400 md:text-sm'>{booking.petId}</h3>
                        </div>
                    </div>
                </td>
                <td className='md:p-4 p-7'>{booking.clinicName}</td>
                <td className='p-4'>{booking.serviceName}</td>
                <td className='p-4 md:p-0  text-wrap'>{formatDateFromISO(booking.date)}</td>
                <td className='p-4'>
                <div className='text-white p-1.5 px-4 rounded-full min-w-24' style={{backgroundColor: booking.bookingStatus === 'rejected' ? 'rgba(238, 81, 88, 1)' : booking.bookingStatus === 'approved' ? 'rgba(100, 219, 159, 1)' : 'rgba(243, 170, 16, 1)'}}>{booking.bookingStatus === 'rejected' ? 'Rejected' : booking.bookingStatus === 'approved' ? 'Booked' : 'Processing'}</div>
                </td>
              </tr>
            ))
          }
        </tbody>
        <div ref={loader} className="h-10" />
      </table>
      
      
    </div>
  )
}

export default ClinicBookings
