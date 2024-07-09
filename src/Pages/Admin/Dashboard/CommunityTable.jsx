import React, { useEffect, useRef, useState } from "react";
import ToggleButton from "./ToggleButton";
import { blockCommunity, getCommunityDetails } from "../../../Api/AdminApi";

const CommunityTable = ({ selected }) => {
  const loader = useRef(null);
  const [community, setCommunity] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getCommunities = async (page, selected) => {
    setLoading(true);
    try {
      const { data } = await getCommunityDetails(page, selected); // Ensure this API supports pagination and filtering
      console.log({ data });
      if (data.communities.length > 0) {
        setCommunity((prev) => (page === 1 ? data.communities : [...prev, ...data.communities]));
        setCount(data.totalCount); // Assuming the API returns total count
      } else {
        setHasMore(false); // No more data to load
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCommunity([]); // Reset community data
    setPage(1);
    setHasMore(true);
    getCommunities(1, selected);
  }, [selected]); // Refetch data when filter changes

  useEffect(() => {
    if (page !== 1) { // Prevent duplicate call for the first page when `selected` changes
      getCommunities(page, selected);
    }
  }, [page]);

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

  return (
    <div className="w-full bg-containerWhite px-3 rounded-lg scroll-none overflow-x-auto h-[40rem]">
      {/* buttondiv */}

      {/* table */}
      <table className="w-full text-center mt-4 text-nowrap ">
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
                <span className="mt-1.5 mr-1">
                  <svg
                    width="16"
                    height="14"
                    viewBox="0 0 16 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.57277 13.0302C5.69549 13.0302 4.00913 12.1711 2.9114 10.8188H1.73413C2.95913 12.7279 5.12277 14.0007 7.57277 14.0007C10.0228 14.0007 12.1864 12.7279 13.4273 10.8188H12.25C11.1364 12.1711 9.45004 13.0302 7.57277 13.0302Z"
                      fill="#F5895A"
                    />
                    <path
                      d="M3.72276 2.35455C4.77276 1.49545 6.10913 0.970455 7.57276 0.970455C9.0364 0.970455 10.3728 1.49545 11.4228 2.35455C11.7409 2.21136 12.1069 2.13182 12.4728 2.13182C12.5046 2.13182 12.5523 2.13182 12.5841 2.13182C11.3114 0.827273 9.54549 0 7.57276 0C5.60004 0 3.83413 0.811364 2.5614 2.11591C2.59322 2.11591 2.64095 2.11591 2.67277 2.11591C3.05458 2.11591 3.40458 2.21136 3.72276 2.35455Z"
                      fill="#F5895A"
                    />
                    <path
                      d="M2.6727 6.26873C3.5477 6.26873 4.26361 5.55282 4.26361 4.67782C4.26361 3.80282 3.5477 3.08691 2.6727 3.08691C1.7977 3.08691 1.08179 3.80282 1.08179 4.67782C1.08179 5.55282 1.7977 6.26873 2.6727 6.26873Z"
                      fill="#F5895A"
                    />
                    <path
                      d="M4.07273 9.70388C4.07273 8.8607 4.39091 8.08115 4.9 7.49252C4.67727 7.15842 4.375 6.87206 4.025 6.68115C3.64318 6.95161 3.16591 7.09479 2.65682 7.09479C2.14773 7.09479 1.68636 6.9357 1.28864 6.68115C0.525 7.1107 0 7.93797 0 8.87661V9.2107C0 9.5607 0.286364 9.84706 0.636364 9.84706H4.07273V9.70388Z"
                      fill="#F5895A"
                    />
                    <path
                      d="M10.8817 4.67782C10.8817 5.55282 11.5976 6.26873 12.4726 6.26873C13.3476 6.26873 14.0635 5.55282 14.0635 4.67782C14.0635 3.80282 13.3476 3.08691 12.4726 3.08691C11.5976 3.08691 10.8817 3.80282 10.8817 4.67782Z"
                      fill="#F5895A"
                    />
                    <path
                      d="M13.841 6.69775C13.4433 6.96821 12.9819 7.11139 12.4728 7.11139C11.9637 7.11139 11.5023 6.9523 11.1046 6.69775C10.7546 6.88866 10.4523 7.17503 10.2296 7.50912C10.7546 8.08185 11.0728 8.86139 11.0728 9.70457V9.86366H14.4933C14.8433 9.86366 15.1296 9.5773 15.1296 9.2273V8.89321C15.1296 7.93866 14.6046 7.1273 13.841 6.69775Z"
                      fill="#F5895A"
                    />
                    <path
                      d="M7.57272 7.0949C8.44772 7.0949 9.16363 6.37899 9.16363 5.50399C9.16363 4.62899 8.44772 3.91309 7.57272 3.91309C6.69772 3.91309 5.98181 4.62899 5.98181 5.50399C5.98181 6.37899 6.69772 7.0949 7.57272 7.0949Z"
                      fill="#F5895A"
                    />
                    <path
                      d="M4.91577 9.70424V10.0383C4.91577 10.3883 5.20214 10.6747 5.55214 10.6747H9.57713C9.92713 10.6747 10.2135 10.3883 10.2135 10.0383V9.70424C10.2135 8.76561 9.6885 7.93833 8.92486 7.50879C8.52713 7.77924 8.06577 7.92243 7.55668 7.92243C7.04759 7.92243 6.58623 7.76333 6.1885 7.50879C5.44077 7.93833 4.91577 8.76561 4.91577 9.70424Z"
                      fill="#F5895A"
                    />
                  </svg>
                </span>
                <span> Community Name</span>
              </div>
            </td>
            <td>
              <div className="flex justify-center">
                <span className="mt-1.5 mr-1">
                  <svg
                    width="16"
                    height="12"
                    viewBox="0 0 16 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.49 6.31339L11.6741 8.15098C11.6171 8.208 11.5506 8.24738 11.4745 8.26842C11.3992 8.28811 11.3238 8.28607 11.2485 8.26435C11.1711 8.24262 11.1046 8.20393 11.0489 8.14691L9.32804 6.32617L8.41567 6.98669L9.64098 7.8685C9.69665 7.91059 9.7401 7.96218 9.77132 8.02464C9.80323 8.08573 9.81884 8.1509 9.81884 8.22015V9.3674H14.7717V7.21282L13.49 6.31339ZM13.4031 3.37192L12.226 2.52879C11.3815 3.24429 10.4115 3.53212 9.31509 3.39364C9.3918 3.78059 9.57983 4.12272 9.87989 4.41869C9.88532 4.42344 9.89143 4.42752 9.89754 4.43159C9.99597 4.5402 10.0992 4.62845 10.2057 4.69633C10.2098 4.69905 10.2139 4.70176 10.2186 4.70516C10.5479 4.92918 10.9273 5.04051 11.357 5.03915C11.8051 5.04051 12.2002 4.91764 12.543 4.66986H12.5471C12.6489 4.59587 12.746 4.51169 12.8383 4.41801C13.1349 4.12136 13.323 3.77244 13.4031 3.37192ZM9.26685 0.864915H9.27092C9.84726 0.294696 10.5424 0.00956844 11.3563 0.00956844C12.1696 0.00888964 12.8674 0.292645 13.4506 0.860832C13.452 0.863547 13.4533 0.866941 13.4547 0.868978C14.0249 1.44464 14.31 2.14316 14.3107 2.96325C14.3114 3.03792 14.308 3.11123 14.3019 3.18454L14.3025 3.21984C14.2394 3.92923 13.957 4.53476 13.4553 5.03571C13.327 5.16197 13.1926 5.27466 13.0514 5.37513H13.0555C12.564 5.72949 11.9979 5.90734 11.3571 5.90937C10.7495 5.90802 10.2119 5.74985 9.74481 5.43553C9.74074 5.43282 9.73598 5.4301 9.73191 5.42671C9.5656 5.32285 9.40607 5.18776 9.25401 5.0228L9.27166 5.0357C8.69261 4.46411 8.40274 3.77306 8.40274 2.96385V2.88103V2.85931V2.84166V2.83351C8.43125 2.06846 8.71969 1.41272 9.26685 0.864915ZM3.43223 5.5835L3.4234 5.57535C3.83275 5.85095 4.29571 5.98944 4.81367 5.98809C5.37167 5.98944 5.86249 5.83467 6.28677 5.52308V5.52715C6.40828 5.43618 6.52979 5.33503 6.65199 5.22303C7.02808 4.83134 7.2582 4.38398 7.34306 3.88027L5.853 2.80227C4.82796 3.69562 3.64004 4.04319 2.29043 3.84497C2.37325 4.37448 2.61357 4.83744 3.01136 5.23524L2.99778 5.2271C3.13966 5.35879 3.28491 5.47759 3.43223 5.5835ZM2.24153 6.40014C2.33046 6.33497 2.42888 6.30782 2.53682 6.31732C2.64408 6.32954 2.73572 6.3757 2.81039 6.45649L4.83063 8.61592L6.99893 6.43963C7.07293 6.36631 7.16117 6.32422 7.26367 6.31336C7.3655 6.3025 7.45986 6.32558 7.54607 6.38261L7.66351 6.46135L9.13185 5.40099C9.22078 5.3365 9.3192 5.30867 9.42714 5.31817C9.53508 5.32903 9.62604 5.37384 9.70071 5.45258L11.3734 7.22101L13.1329 5.43972C13.2076 5.36369 13.2972 5.32025 13.4024 5.30939C13.5083 5.29988 13.6054 5.32636 13.6937 5.38745L15.4579 6.63041C15.515 6.67114 15.5598 6.72409 15.5923 6.78654C15.6249 6.85035 15.6412 6.91688 15.6405 6.98679V9.80192C15.6412 9.92275 15.5991 10.0253 15.5143 10.1101C15.4294 10.195 15.3262 10.2364 15.2061 10.2364H9.81878V11.5655C9.81946 11.6864 9.77737 11.7882 9.69252 11.8737C9.60766 11.9586 9.50448 12.0007 9.38433 12H0.434461C0.314305 12 0.211114 11.9579 0.126273 11.8737C0.0414173 11.7889 -0.000671398 11.6864 8.09678e-06 11.5655V8.2202C8.09678e-06 8.15096 0.0156215 8.08579 0.0475275 8.02469C0.080112 7.96224 0.124915 7.91065 0.182617 7.86856L2.24153 6.40014ZM1.39027 3.29375V3.2761C1.42692 2.38817 1.76091 1.62787 2.39359 0.995191H2.39766C3.06701 0.331962 3.87211 0 4.81291 0C5.75989 0.0006788 6.57039 0.33264 7.24588 0.995191L7.24996 0.999264C7.91251 1.67539 8.24447 2.48322 8.24515 3.42407C8.24515 3.50214 8.24243 3.58292 8.23632 3.66709C8.237 3.67252 8.237 3.67863 8.23632 3.68474V3.69289V3.70646V3.72819C8.17251 4.53532 7.84395 5.242 7.24996 5.84818C7.24453 5.85361 7.23842 5.85904 7.23231 5.86582C7.08772 5.99752 6.94244 6.11564 6.79785 6.22222V6.22629C6.22558 6.64515 5.56371 6.8549 4.8122 6.85626C4.11367 6.8549 3.48777 6.66823 2.93516 6.29553C2.93244 6.29281 2.92973 6.28942 2.92633 6.28738C2.74916 6.16112 2.57538 6.01923 2.40498 5.86107C2.40091 5.85836 2.39684 5.85564 2.39208 5.85293C1.72409 5.18223 1.38944 4.37238 1.39011 3.42395V3.34996C1.38876 3.33706 1.38876 3.32416 1.39011 3.31058V3.29361L1.39027 3.29375Z"
                      fill="#59AA81"
                    />
                  </svg>
                </span>
                <span>Creator Admin</span>
              </div>
            </td>
            <td>
              <div className="flex justify-center">
                <span className="mt-1.5 mr-1">
                  <svg
                    width="20"
                    height="12"
                    viewBox="0 0 20 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.51234 6.57252C11.1233 6.57252 12.4292 5.26659 12.4292 3.65565C12.4292 2.0447 11.1233 0.73877 9.51234 0.73877C7.90139 0.73877 6.59546 2.0447 6.59546 3.65565C6.59546 5.26659 7.90139 6.57252 9.51234 6.57252Z"
                      fill="#EE5158"
                    />
                    <path
                      d="M11.7987 6.19873C11.1923 6.74467 10.3925 7.07972 9.51223 7.07972C8.63197 7.07972 7.83215 6.74467 7.2258 6.19873C6.31219 6.70576 5.46677 6.97928 5.0146 8.78723C4.81187 9.59854 4.60913 10.9173 4.60913 10.9173C4.60913 10.9173 6.50232 11.9999 9.5126 11.9999C12.5225 11.9999 14.4157 10.9173 14.4157 10.9173C14.4157 10.9173 14.213 9.59854 14.0102 8.78723C13.5577 6.97965 12.7123 6.70576 11.7987 6.19873Z"
                      fill="#EE5158"
                    />
                    <path
                      d="M12.6942 4.87393C13.1653 5.2542 13.7635 5.48288 14.4158 5.48288C15.9302 5.48288 17.1574 4.25572 17.1574 2.74169C17.1574 1.22765 15.9298 0.000488281 14.4158 0.000488281C13.3995 0.000488281 12.5141 0.554584 12.0408 1.37702C12.5867 1.98152 12.9218 2.77875 12.9218 3.65566C12.9214 4.08449 12.8402 4.49441 12.6942 4.87393Z"
                      fill="#EE5158"
                    />
                    <path
                      d="M18.6432 7.56527C18.2185 5.86629 17.4239 5.60982 16.5651 5.13281C15.9954 5.64577 15.2434 5.96043 14.4158 5.96043C13.692 5.96043 13.0252 5.71952 12.4882 5.31516C12.3877 5.49492 12.2717 5.66615 12.1409 5.82441C12.1961 5.85443 12.2521 5.88483 12.3069 5.91411C13.1531 6.36591 14.0285 6.83253 14.4881 8.66828C14.64 9.27759 14.7887 10.1423 14.8595 10.5755C17.4291 10.4781 19.0246 9.56817 19.0246 9.56817C19.0246 9.56817 18.8337 8.3284 18.6432 7.56527Z"
                      fill="#EE5158"
                    />
                    <path
                      d="M4.60876 5.48276C5.26107 5.48276 5.85964 5.25446 6.33034 4.87382C6.18468 4.49466 6.10314 4.08437 6.10314 3.65518C6.10314 2.77826 6.43857 1.98066 6.98414 1.37653C6.51084 0.554095 5.6254 0 4.60876 0C3.09472 0 1.86719 1.22753 1.86719 2.7412C1.86719 4.25597 3.09472 5.48276 4.60876 5.48276Z"
                      fill="#EE5158"
                    />
                    <path
                      d="M6.71734 5.91411C6.77219 5.88483 6.82816 5.85443 6.88376 5.82441C6.75292 5.66615 6.63729 5.49492 6.53647 5.31516C5.99943 5.71952 5.33266 5.96043 4.60881 5.96043C3.78156 5.96043 3.02955 5.6454 2.45952 5.13281C1.60076 5.60982 0.806125 5.86629 0.381381 7.56527C0.190876 8.32878 0 9.5678 0 9.5678C0 9.5678 1.59594 10.4777 4.16517 10.5752C4.23596 10.1419 4.38495 9.27722 4.53691 8.6679C4.99612 6.83216 5.87119 6.36554 6.71734 5.91411Z"
                      fill="#EE5158"
                    />
                  </svg>
                </span>
                <span>Total Members</span>
              </div>
            </td>

            <td>
              <div className="flex justify-center">
                <span className="mt-0.5 mr-1">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 0C4.03579 0 0 4.03579 0 9C0 13.9642 4.03579 18 9 18C13.9642 18 18 13.9642 18 9C18 4.03579 13.9642 0 9 0ZM14.04 9.85263H12.6758L11.3495 12.5053C11.1789 12.7895 10.8947 12.9789 10.5726 12.9789C10.2505 12.9789 9.94737 12.7895 9.81474 12.5053L7.42737 7.78737L6.63158 9.37895C6.48 9.66316 6.19579 9.85263 5.87368 9.85263H3.97895C3.50526 9.85263 3.12632 9.47368 3.12632 9C3.12632 8.52632 3.50526 8.14737 3.97895 8.14737H5.34316L6.66947 5.49474C6.95368 4.92632 7.90105 4.92632 8.18526 5.49474L10.5537 10.2126L11.3684 8.60211C11.52 8.31789 11.8042 8.12842 12.1263 8.12842H14.0211C14.4947 8.12842 14.8737 8.50737 14.8737 8.98105C14.8737 9.45474 14.5137 9.85263 14.04 9.85263Z"
                      fill="#851B69"
                    />
                  </svg>
                </span>
                <span> Status</span>
              </div>
            </td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {community.map((item, index) => (
            <tr className="rounded-md border-b border-b-gray-300 m-4">
              <td className="p-4">{item.name}</td>
              <td className="p-2">
                <div className=" flex">
                  <img
                    src="/admin.png"
                    alt=""
                    className="w-10 h-10 mr-2  rounded-full"
                  />
                  <div>
                    <h1 className="text-lg font-normal mt-1">
                      {item.creator?.name}
                    </h1>
                  </div>
                </div>
              </td>
              <td className="p-4">{item.totalMembers}</td>
              <td className="p-2">
                <div
                  className="p-2 mx-4"
                  style={{
                    backgroundColor:
                      item.status === "Active"
                        ? "rgba(0, 224, 22, 0.1)"
                        : "rgba(224, 0, 0, 0.1)",
                    color:
                      item.status === "Active"
                        ? "rgba(0, 139, 14, 1)"
                        : "rgba(224, 0, 0, 1)",
                  }}
                >
                  {" "}
                  {item.status}
                </div>
              </td>
              <td className="p-4">
                <ToggleButton
                  id={item.id}
                  status={item.status === "Active" ? true : false}
                  index={index}
                  community={community}
                  setCommunity={setCommunity}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div ref={loader} className="h-10" />
    </div>
  );
};

export default CommunityTable;
