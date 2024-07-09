import React, { useEffect, useRef, useState } from 'react';
import { RecentLostPet } from '../../../Api/AdminApi';

const LostPetTable = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);

  const getData = async (page) => {
    setLoading(true);
    try {
      const res = await RecentLostPet(page);
      if (res.data.pets.length > 0) {
        setData((prevData) => [...prevData, ...res.data.pets]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
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
    getData(page);
  }, [page]);

  return (
    <div className="w-full bg-containerWhite px-3 scroll-none rounded-lg overflow-x-auto h-[32rem]">
      <table className="w-full text-center mt-4 scroll-none overflow-x-auto text-nowrap">
        <thead
          className="rounded-lg"
          style={{
            backgroundColor: 'rgba(242, 242, 242, 1)',
            height: '50px',
          }}
        >
          <tr className="rounded-md">
            <td>
              <div className="flex justify-center">
                <span className="mt-1.5 mr-1">
                  <svg
                    width="14"
                    height="12"
                    viewBox="0 0 14 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.9964 10.2059C11.345 11.806 9.60757 12.1532 8.84227 11.9448C8.07698 11.7365 6.51601 11.7018 6.51601 11.7018C6.51601 11.7018 4.95072 11.7365 4.18542 11.9448C3.42013 12.1546 1.68124 11.806 2.02844 10.2059C2.37564 8.60593 3.90623 8.67535 4.32577 6.51837C4.74386 4.36138 6.51748 4.50026 6.51748 4.50026C6.51748 4.50026 8.28675 4.36138 8.70486 6.51837C9.12149 8.67535 10.6492 8.6059 10.9964 10.2059ZM8.12184 4.35994C9.06362 4.6319 10.1038 3.88833 10.4467 2.69915C10.7895 1.51143 10.3049 0.328043 9.3631 0.0560825C8.4213 -0.215902 7.38116 0.527694 7.03828 1.71687C6.69543 2.90459 7.18006 4.08798 8.12184 4.35994ZM12.025 3.9274C11.1179 3.55703 10.004 4.18492 9.53668 5.33065C9.06939 6.47643 9.42529 7.70466 10.3323 8.07354C11.2394 8.44244 12.3533 7.81602 12.8206 6.67027C13.2879 5.52451 12.932 4.29775 12.025 3.9274ZM4.90299 4.35994C5.84477 4.08795 6.32941 2.90459 5.98656 1.71687C5.6437 0.529159 4.6021 -0.214436 3.66174 0.0575481C2.7214 0.329509 2.23532 1.51287 2.57817 2.70061C2.92105 3.88833 3.96121 4.6319 4.90299 4.35994ZM2.69391 8.07354C3.60099 7.7032 3.95686 6.47497 3.48958 5.33065C3.02229 4.18634 1.90835 3.55703 1.0013 3.9274C0.094243 4.29775 -0.261634 5.52598 0.205651 6.67027C0.672913 7.81602 1.78685 8.44389 2.69391 8.07354Z"
                      fill="#F5895A"
                    />
                  </svg>
                </span>
                <span> Pet</span>
              </div>
            </td>
            <td>
              <div className="flex justify-center">
                <span className="mt-1.5 mr-1">
                  <svg
                    width="15"
                    height="18"
                    viewBox="0 0 15 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.000120716 7.00409C0.000120716 3.13924 3.15074 0 7.04354 0C10.9363 0 14.087 3.13904 14.087 7.00409C14.087 7.87286 13.7662 8.86035 13.3213 9.83073C12.8693 10.8159 12.2569 11.8512 11.6076 12.8354C10.3082 14.8057 8.82325 16.6268 8.06618 17.5236C7.53006 18.1588 6.55688 18.1588 6.02077 17.5236C5.26377 16.6267 3.77875 14.8056 2.47934 12.8354C1.83002 11.851 1.21767 10.8157 0.76566 9.83073C0.320737 8.86039 0.000120716 7.87288 0.000120716 7.00409ZM4.99893 6.97597C4.99893 5.85799 5.91396 4.95094 7.04354 4.95094C8.17312 4.95094 9.08814 5.85799 9.08814 6.97597C9.08814 8.09474 8.17312 9.00179 7.04354 9.00179C5.91396 9.00179 4.99893 8.09474 4.99893 6.97597Z"
                      fill="#6E81FF"
                    />
                  </svg>
                </span>
                <span> Location</span>
              </div>
            </td>
            <td>
              <div className="flex justify-center">
                <span className="mt-1.5 mr-1">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9 0C4.03579 0 0 4.03579 0 9C0 13.9642 4.03579 18 9 18C13.9642 18 18 13.9642 18 9C18 4.03579 13.9642 0 9 0ZM14.04 9.85263H12.6758L11.3495 12.5053C11.1789 12.7895 10.8947 12.9789 10.5726 12.9789C10.2505 12.9789 9.94737 12.7895 9.81474 12.5053L7.42737 7.78737L6.63158 9.37895C6.48 9.66316 6.19579 9.85263 5.87368 9.85263H3.97895C3.50526 9.85263 3.12632 9.47368 3.12632 9C3.12632 8.52632 3.50526 8.14737 3.97895 8.14737H5.34316L6.66947 5.49474C6.95368 4.92632 7.90105 4.92632 8.18526 5.49474L10.5537 10.2126L11.3684 8.60211C11.52 8.31789 11.8042 8.12842 12.1263 8.12842H14.0211C14.4947 8.12842 14.8737 8.50737 14.8737 8.98105C14.8737 9.45474 14.5137 9.85263 14.04 9.85263Z"
                      fill="#851B69"
                    />
                  </svg>
                </span>
                <span> Status</span>
              </div>
            </td>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((pet, i) => (
              <tr key={i} className="rounded-md border-b border-b-gray-300 m-4">
                <td className="p-4">
                  <div className="flex">
                    <img
                      src={pet.image}
                      alt=""
                      className="md:w-16 w-10 h-10 md:h-16 mr-2 rounded-full"
                    />
                    <h1 className="text-lg mt-1 md:mt-4 font-semibold">{pet.name}</h1>
                  </div>
                </td>
                <td className="md:p-4 p-7 text-gray-400">{pet.location}</td>
                <td className="p-4">
                  <div
                    className="text-white p-1 mx-5 rounded-full min-w-16"
                    style={{ backgroundColor: 'rgba(100, 219, 159, 1)' }}
                  >
                    {pet.status}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="my-auto mt-16 text-center">
                Recently there is no pet lost
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {loading && (
        <div className="text-center my-4">
          <span>Loading...</span>
        </div>
      )}
      <div ref={loader} className="h-10" />
    </div>
  );
};

export default LostPetTable;
