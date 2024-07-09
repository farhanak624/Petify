import React, { useEffect, useRef, useState } from "react";
import { deleteBlog, getblogs } from "../../../Api/AdminApi";
import BlogOverview from "./BlogOverview";

const BlogTable = ({ selected }) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState("");
  const loader = useRef(null);
  const [change, setChange] = useState(false);

  const getData = async (page) => {
    setLoading(true);
    try {
      const res = await getblogs(selected, page); // Assuming you have this API function
      setCount(res.data.totalCount); // Assuming the API returns the total count of blogs
      if (res.data.blogs.length > 0) {
        setBlogs((prevBlogs) => [...prevBlogs, ...res.data.blogs]);
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
    getData(page);
  }, [page, change]);

  const openModal = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const formatDateFromISO = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };
  return (
    <div className="w-full bg-containerWhite px-3 rounded-lg overflow-x-auto scroll-none h-[40rem]">
      {/* buttondiv */}

      {/* table */}
      <table className="w-full text-center mt-4 text-nowrap">
        <thead
          className=" rounded-lg"
          style={{
            backgroundColor: "rgba(242, 242, 242, 1)",
            height: "50px",
          }}
        >
          <tr className="rounded-md">
            <td>
              <div className="flex justify-center">
                <span className="mt-0.5 mr-1">
                  <svg
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.2514 12.9852L13.8463 12.2845L13.109 12.0614L13.2514 12.9852ZM14.082 11.8737L16.4544 1.93768L15.4728 1.63871L13.1 11.5766L14.082 11.8737ZM15.9788 0.113232C15.8592 0.189992 15.7959 0.304023 15.7595 0.437683L15.5797 1.19079L16.5613 1.48976L16.7349 0.764766C16.7723 0.622413 16.7529 0.472272 16.6863 0.341707C16.5683 0.110369 16.2134 -0.0374002 15.9788 0.113232ZM10.6642 6.63099C10.3618 6.63218 10.36 6.17244 10.6623 6.17128L13.4316 6.15805C13.734 6.15687 13.7357 6.6166 13.4334 6.61776L10.6642 6.63099ZM10.6642 5.38557C10.3618 5.38674 10.36 4.92702 10.6623 4.92584L13.4316 4.91261C13.734 4.91145 13.7357 5.37116 13.4334 5.37234L10.6642 5.38557ZM10.6642 4.18243C10.3618 4.18362 10.36 3.72388 10.6623 3.72272L13.4316 3.70949C13.734 3.7083 13.7357 4.16804 13.4334 4.1692L10.6642 4.18243ZM9.33816 3.81934H5.7051V7.98199H9.33816V3.81934ZM5.47433 3.3578H9.56893C9.69635 3.3578 9.7997 3.46115 9.7997 3.58857V8.21276C9.7997 8.34017 9.69635 8.44353 9.56893 8.44353H5.47433C5.34691 8.44353 5.24356 8.34017 5.24356 8.21276V3.58857C5.24356 3.46115 5.34691 3.3578 5.47433 3.3578ZM5.80451 12.1058C5.50213 12.1058 5.50213 11.6461 5.80451 11.6461L11.8557 11.6371C12.1581 11.6371 12.1581 12.0969 11.8557 12.0969L5.80451 12.1058ZM5.80451 10.4922C5.50213 10.4922 5.50213 10.0325 5.80451 10.0325L11.9579 10.0235C12.2603 10.0235 12.2603 10.4832 11.9579 10.4832L5.80451 10.4922ZM7.60546 18L16.1033 18C17.1241 18 17.6981 16.9008 17.925 16.0426H8.6157V16.0481C8.6157 16.8092 8.20958 17.547 7.60546 18ZM0 2.03283L3.99961 2.13273C3.86819 1.09634 3.13386 0 1.99236 0C0.88865 0 0.160356 1.0302 0 2.03283ZM15.0428 15.5811H8.37007C8.0834 15.5811 8.15415 15.8726 8.15415 16.0481C8.15415 17.0451 7.28328 18 6.26979 18C5.25416 18 4.46579 17.0522 4.46579 16.0702C4.46579 11.5056 4.48163 6.93535 4.48163 2.36899C4.48163 1.51204 4.01508 0.524683 3.32403 0H13.0281C14.0296 0 14.7378 0.864894 14.9668 1.77134L12.6023 11.6744C12.5928 11.7094 12.5935 11.7354 12.5973 11.7708L12.8314 13.2895L5.72566 13.2982C5.42328 13.2982 5.42328 13.7579 5.72566 13.7579L13.0867 13.7489C13.1565 13.753 13.2274 13.7253 13.276 13.6678L14.4153 12.3259C14.4401 12.3003 14.4593 12.2686 14.4703 12.2322L15.0489 9.81069L15.0428 15.5811ZM17.206 0.750553L18.0536 1.55667C18.1151 1.61514 18.1371 1.69948 18.1189 1.77655L17.5583 4.14157C17.5289 4.26551 17.4045 4.34219 17.2806 4.31284C17.1567 4.28349 17.08 4.15911 17.1094 4.03518L17.64 1.79866L17.0898 1.27534C17.129 1.11124 17.1861 0.919498 17.206 0.750553Z"
                      fill="#F5895A"
                    />
                  </svg>
                </span>
                <span> Blog Creator</span>
              </div>
            </td>
            <td>
              <div className="flex justify-center">
                <span className="mt-0.5 mr-1">
                  <svg
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.40492 10.0475H4.59523C4.70833 10.0475 4.79989 9.95589 4.79989 9.84279V8.7198C4.79989 8.6067 4.70833 8.51514 4.59523 8.51514H3.40492C3.29181 8.51514 3.20025 8.6067 3.20025 8.7198V9.84279C3.19756 9.95589 3.29181 10.0475 3.40492 10.0475Z"
                      fill="#6E81FF"
                    />
                    <path
                      d="M9.02015 15.3272H10.2105C10.3236 15.3272 10.4151 15.2357 10.4151 15.1226V13.9996C10.4151 13.8865 10.3236 13.7949 10.2105 13.7949H9.02015C8.90705 13.7949 8.81549 13.8865 8.81549 13.9996V15.1226C8.81279 15.233 8.90705 15.3272 9.02015 15.3272Z"
                      fill="#6E81FF"
                    />
                    <path
                      d="M14.6349 15.3272H15.8252C15.9383 15.3272 16.0299 15.2357 16.0299 15.1226V13.9996C16.0299 13.8865 15.9383 13.7949 15.8252 13.7949H14.6349C14.5218 13.7949 14.4302 13.8865 14.4302 13.9996V15.1226C14.4275 15.233 14.5218 15.3272 14.6349 15.3272Z"
                      fill="#6E81FF"
                    />
                    <path
                      d="M14.6349 10.0475H15.8252C15.9383 10.0475 16.0299 9.95589 16.0299 9.84279V8.7198C16.0299 8.6067 15.9383 8.51514 15.8252 8.51514H14.6349C14.5218 8.51514 14.4302 8.6067 14.4302 8.7198V9.84279C14.4275 9.95589 14.5218 10.0475 14.6349 10.0475Z"
                      fill="#6E81FF"
                    />
                    <path
                      d="M9.02015 10.0475H10.2105C10.3236 10.0475 10.4151 9.95589 10.4151 9.84279V8.7198C10.4151 8.6067 10.3236 8.51514 10.2105 8.51514H9.02015C8.90705 8.51514 8.81549 8.6067 8.81549 8.7198V9.84279C8.81279 9.95589 8.90705 10.0475 9.02015 10.0475Z"
                      fill="#6E81FF"
                    />
                    <path
                      d="M3.40492 15.3272H4.59523C4.70833 15.3272 4.79989 15.2357 4.79989 15.1226V13.9996C4.79989 13.8865 4.70833 13.7949 4.59523 13.7949H3.40492C3.29181 13.7949 3.20025 13.8865 3.20025 13.9996V15.1226C3.19756 15.233 3.29181 15.3272 3.40492 15.3272Z"
                      fill="#6E81FF"
                    />
                    <path
                      d="M0.125 16.0233C0.125 17.1139 1.011 17.9999 2.10166 17.9999H17.1286C18.2193 17.9999 19.1053 17.1139 19.1053 16.0233V5.67676H0.125V16.0233ZM13.2157 8.71985C13.2157 7.93618 13.8512 7.30064 14.6349 7.30064H15.8252C16.6088 7.30064 17.2444 7.93618 17.2444 8.71985V9.84283C17.2444 10.6265 16.6088 11.262 15.8252 11.262H14.6349C13.8512 11.262 13.2157 10.6265 13.2157 9.84283V8.71985ZM13.2157 13.9981C13.2157 13.2145 13.8512 12.5789 14.6349 12.5789H15.8252C16.6088 12.5789 17.2444 13.2145 17.2444 13.9981V15.1211C17.2444 15.9048 16.6088 16.5403 15.8252 16.5403H14.6349C13.8512 16.5403 13.2157 15.9048 13.2157 15.1211V13.9981ZM7.60076 8.71985C7.60076 7.93618 8.23631 7.30064 9.01997 7.30064H10.2103C10.9939 7.30064 11.6295 7.93618 11.6295 8.71985V9.84283C11.6295 10.6265 10.9939 11.262 10.2103 11.262H9.01997C8.23631 11.262 7.60076 10.6265 7.60076 9.84283V8.71985ZM7.60076 13.9981C7.60076 13.2145 8.23631 12.5789 9.01997 12.5789H10.2103C10.9939 12.5789 11.6295 13.2145 11.6295 13.9981V15.1211C11.6295 15.9048 10.9939 16.5403 10.2103 16.5403H9.01997C8.23631 16.5403 7.60076 15.9048 7.60076 15.1211V13.9981ZM1.98586 8.71985C1.98586 7.93618 2.62141 7.30064 3.40507 7.30064H4.59538C5.37904 7.30064 6.01459 7.93618 6.01459 8.71985V9.84283C6.01459 10.6265 5.37904 11.262 4.59538 11.262H3.40507C2.62141 11.262 1.98586 10.6265 1.98586 9.84283V8.71985ZM1.98586 13.9981C1.98586 13.2145 2.62141 12.5789 3.40507 12.5789H4.59538C5.37904 12.5789 6.01459 13.2145 6.01459 13.9981V15.1211C6.01459 15.9048 5.37904 16.5403 4.59538 16.5403H3.40507C2.62141 16.5403 1.98586 15.9048 1.98586 15.1211V13.9981Z"
                      fill="#6E81FF"
                    />
                    <path
                      d="M17.1286 0H15.4966V0.667864C15.4966 1.0018 15.2246 1.27379 14.8907 1.27379C14.5568 1.27379 14.2848 1.0018 14.2848 0.667864V0H4.94547V0.667864C4.94547 1.0018 4.67347 1.27379 4.33954 1.27379C4.00561 1.27379 3.73362 1.0018 3.73362 0.667864V0H2.10166C1.011 0 0.125 0.885997 0.125 1.97666V4.4623H19.1079V1.97666C19.1053 0.885997 18.2193 0 17.1286 0Z"
                      fill="#6E81FF"
                    />
                  </svg>
                </span>
                <span> Date</span>
              </div>
            </td>

            <td></td>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((blog, index) => (
            <tr
              key={index}
              className="rounded-md border-b border-b-gray-300 m-4"
            >
              <td className="p-2">
                <div className=" flex">
                  <img src="" alt="" className="w-10 h-10 mr-2  rounded-full" />
                  <div>
                    <h1 className="text-lg font-normal mt-1">
                      {blog.creator?.name}
                    </h1>
                  </div>
                </div>
              </td>

              <td className="p-3 md:px-0 px-10">
                {formatDateFromISO(blog.date)}
              </td>

              <td className="p-3">
                <button
                  onClick={() => openModal(blog.id)}
                  className="p-2 px-4 rounded-full min-w-24"
                  style={{ backgroundColor: "rgba(254, 244, 236, 1)" }}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
          <div ref={loader} className="h-10" />
        </tbody>
      </table>
      {showModal && (
        <BlogOverview closeModal={closeModal} selectedBlog={selectedBlog} setChange={setChange}/>
      )}
    </div>
  );
};

export default BlogTable;
