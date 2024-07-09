import React from "react";
import { calculateAge } from "../../../../Utils/Breeds";

const DetailedModal = ({ petData, setShowDetailed, currency }) => {
  console.log("sdfsfsfs", petData);
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center">
      <div className="w-[90vh] mx-auto bg-card rounded-lg shadow-lg overflow-hidden bg-white text-transform: capitalize">
        <div className="p-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold">Pet Details</h2>
          </div>
          <div className="text-right">
            <button
              onClick={() => setShowDetailed(false)}
              className="text-primary-foreground hover:text-primary-foreground/80"
            >
              <img
                undefinedhidden="true"
                alt="close"
                src="https://openui.fly.dev/openui/24x24.svg?text=✖"
              />
            </button>
          </div>
        </div>
        <div
        style={{backgroundImage: `url(/bgDraws.png)`, backgroundSize: 'cover', backgroundPosition: 'center'}}
        className="bg-[#F9996E] p-4 flex items-center  mx-4 rounded-xl text-white">
          <img
            className="w-16 h-16 rounded-xl mr-4 object-center object-cover"
            src={petData?.image}
            alt="Bella the Doberman"
          />
          <div className="">
            <h3 className="text-xl font-bold">{petData?.petName}</h3>
            <p className="text-sm">{petData?.breed}</p>
            <p className="text-sm">
              {currency} {petData?.prize}
            </p>
          </div>
          <div className="ml-auto text-right">
            <div className="flex justify-end gap-2">
              <p className="text-sm">{petData?.phone}</p>
              <svg
                width="17"
                height="16"
                className="ml-1"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.36664 1.50742e-08C3.16209 1.50742e-08 2.89181 -0.000272714 2.55825 0.0725475C2.23234 0.145368 1.97515 0.218461 1.7856 0.291281C1.40649 0.509469 1.00421 0.945845 0.579562 1.74578C0.394102 2.05969 0.255553 2.3908 0.159005 2.73008C0.158186 2.73308 0.157095 2.73581 0.156277 2.73853C0.120276 2.86645 0.0973665 2.99627 0.0739112 3.12636C0.0632746 3.18473 0.046365 3.24255 0.0384557 3.30118C0.0250916 3.39855 0.0234553 3.49728 0.0171824 3.59519C0.0120004 3.67701 0 3.7602 0 3.84093C0 3.84338 0 3.84556 0 3.84802C0 3.85047 0 3.85266 0 3.85511C0 4.0733 0.0114549 4.21785 0.0340919 4.43604C0.0643655 4.65422 0.113731 4.87268 0.181914 5.09087C0.250098 5.33361 0.303009 5.5147 0.340919 5.63634C0.374738 5.72089 0.452195 5.91699 0.526924 6.10926C0.548743 6.16654 0.55447 6.18972 0.579562 6.25409C0.693293 6.5451 0.761476 6.76383 0.784113 6.83638C0.929754 7.23566 1.09449 7.6074 1.26985 7.96277C1.41222 8.26305 1.56168 8.55188 1.72723 8.8178C2.11151 9.44127 2.59835 10.0735 3.16345 10.7199C3.47574 11.09 3.80629 11.4663 4.17339 11.8547C4.86368 12.5314 5.53734 13.1025 6.19763 13.5863C6.52846 13.8367 6.8571 14.0715 7.18193 14.2725C7.52094 14.4841 7.89759 14.6767 8.29278 14.8578C8.45888 14.935 8.62988 15.0062 8.80552 15.0708C8.93289 15.1215 9.0499 15.1799 9.1819 15.2271C9.25036 15.2497 9.42409 15.3173 9.72737 15.4316C9.8411 15.4742 9.8771 15.4859 9.96601 15.517C10.0568 15.5544 10.1354 15.583 10.2003 15.6007C10.2431 15.6157 10.3345 15.6474 10.3637 15.6591C10.4062 15.6724 10.4978 15.6975 10.5554 15.7144C10.6609 15.7611 10.7496 15.8085 10.9048 15.8552C11.0188 15.8552 11.1251 15.8732 11.2271 15.8977C11.2451 15.9024 11.2637 15.9075 11.2811 15.9119C11.3763 15.9378 11.4693 15.9675 11.5539 16H12.1561H12.1588C12.8562 16 13.5598 15.8186 14.2725 15.4319C15.0383 15.0064 15.4995 14.6069 15.6588 14.2272C15.7022 14.1293 15.7414 14.0109 15.7796 13.8765L15.781 13.8721C15.8208 13.7448 15.8593 13.5999 15.8975 13.4546C15.973 13.091 16.0112 12.8731 16.0112 12.6549C16.0112 12.5095 15.9997 12.4364 15.9771 12.3636C15.9714 12.3549 15.9288 12.3254 15.916 12.3124C15.8557 12.2417 15.7605 12.1618 15.6135 12.068C15.6114 12.0721 15.6073 12.0767 15.6051 12.0808C15.4704 11.9922 15.325 11.8978 15.1122 11.7811C14.9682 11.7082 14.764 11.5629 14.4986 11.4175C14.2332 11.2721 13.991 11.1993 13.7712 11.054C13.5588 10.9086 13.3572 10.8358 13.1674 10.6904C13.1368 10.6904 13.0425 10.6184 12.8832 10.473C12.7239 10.4002 12.5884 10.3271 12.4741 10.2543C12.368 10.1815 12.2622 10.1817 12.1558 10.1817C12.0044 10.1817 11.8146 10.2548 11.5877 10.473C11.36 10.6912 11.1502 10.9822 10.9612 11.2004C10.7714 11.4914 10.5712 11.7096 10.359 11.9278C10.1468 12.146 9.97228 12.2191 9.83619 12.2191C9.76773 12.2191 9.67964 12.218 9.57327 12.1452C9.47509 12.1452 9.399 12.0726 9.34609 12.0726C9.29317 12.0726 9.20208 12.0003 9.07335 11.9278C8.94462 11.855 8.87262 11.7816 8.85734 11.7816C7.81877 11.1999 6.92802 10.5458 6.18536 9.81846C5.4427 9.09108 4.78268 8.14632 4.20667 7.12793C4.19903 7.12793 4.15376 7.05456 4.0703 6.9092C3.99448 6.76383 3.94157 6.69074 3.91129 6.61792C3.88866 6.61792 3.85838 6.54591 3.82047 6.40055C3.78256 6.32773 3.76374 6.25463 3.76374 6.18181C3.76374 6.03644 3.86957 5.81771 4.08203 5.59952C4.30185 5.38134 4.5364 5.23679 4.7865 5.0186C5.04423 4.87323 5.28015 4.6545 5.49261 4.43631C5.71244 4.1453 5.82208 4.00075 5.82208 3.85538C5.82208 3.71001 5.79562 3.63719 5.74244 3.49183C5.68925 3.41901 5.60607 3.27364 5.49234 3.12827C5.38624 2.91008 5.32188 2.83699 5.29924 2.83699C5.18551 2.6188 5.06687 2.40034 4.9455 2.18215C4.82414 1.96396 4.69186 1.74578 4.54786 1.45477C4.40385 1.23658 4.2904 1.01785 4.20694 0.872479C3.94157 0.363283 3.74111 0.073093 3.60474 0.00027273L3.36664 1.50742e-08Z"
                  fill="white"
                />
              </svg>
            </div>

            <div className="flex justify-end gap-2">
              <p className="text-sm">{petData?.location}</p>
              <svg
                width="14"
                height="20"
                className="ml-1"
                viewBox="0 0 14 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.59875 0C2.96045 0 0 2.96045 0 6.59875C0 9.19389 3.273 14.3929 5.22529 17.2606C5.53491 17.7158 6.04769 17.9883 6.59757 17.9883C7.14746 17.9883 7.66023 17.7158 7.96986 17.2606C9.9223 14.3929 13.1951 9.19689 13.1951 6.59875C13.1951 2.96045 10.2347 0 6.5964 0H6.59875ZM6.59875 9.896C4.7811 9.896 3.30325 8.4153 3.30325 6.59775C3.30325 4.7802 4.78102 3.30225 6.59875 3.30225C8.41647 3.30225 9.89425 4.78002 9.89425 6.59775C9.89425 8.41547 8.41647 9.896 6.59875 9.896Z"
                  fill="white"
                />
                <path
                  d="M3.42753 16.3121C1.72512 16.7751 1.34226 18.1972 2.94503 19.1445C4.078 19.795 5.35262 19.9796 6.59783 20.0001C8.11564 19.9503 9.93334 19.7374 11.0087 18.4872C11.5088 17.8523 11.2539 17.0768 10.6142 16.6842C10.3495 16.5064 10.0594 16.4019 9.76931 16.3092C12.2023 17.7664 10.1346 18.8448 8.33452 19.1093C7.1947 19.2998 6.00409 19.2998 4.86425 19.1093C3.05927 18.8417 0.998411 17.7615 3.42945 16.3062L3.42753 16.3121Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center ">
          <div className="bg-input text-foreground p-2 rounded-lg shadow-md">
            <p className="text-sm font-thin">Gender</p>
            <p className="text-lg font-medium">{petData?.gender}</p>
          </div>
          <div className="bg-input text-foreground p-2 rounded-lg shadow-md">
            <p className="text-sm font-thin">Age</p>
            <p className="text-lg font-medium">
              {calculateAge(petData?.birthday)} Year
            </p>
          </div>
          <div className="bg-input text-foreground p-2 rounded-lg shadow-md">
            <p className="text-sm font-thin">Weight</p>
            <p className="text-lg font-medium">{petData?.weight} Kg</p>
          </div>
          <div className="bg-input text-foreground p-2 rounded-lg shadow-md">
            <p className="text-sm font-thin">Height</p>
            <p className="text-lg font-medium">{petData?.height} CM</p>
          </div>
        </div>
        <div className="p-4">
          <h4 className="text-md font-bold">About Bella</h4>
          <p className="text-xs mt-2 font-thin">
            {
              petData?.description
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailedModal;
