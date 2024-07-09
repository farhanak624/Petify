import React, { useState } from "react";
import Multiselect from "multiselect-react-dropdown";

const ServiceModal = () => {
  const [petTypes, setPetTypes] = useState([]);
  const [serviceType, setServiceType] = useState([]);
  const petTypeList = [
    "Dog",
    "Cat",
    "Rabbit",
    "Bird",
    "Fish",
    "Turtle",
    "Hamster",
    "Guinea Pig",
    "Horse",
    "Pig",
    "Cow",
    "Sheep",
    "Goat",
    "Chicken",
    "Duck",
    "Turkey",
    "Pigeon",
  ];
  const serviceTypeList = [
    "Full in Store  Grooming",
    "Full Mobile Grooming",
    "Grooming Packages",
    "Medicated Instore Grooming",
  ];

  const onSelect2 = (selectedList, selectedItem) => {
    setServiceType(selectedList);
  };

  const onRemove2 = (selectedList, removedItem) => {
    setServiceType(selectedList);
  };
  const onSelect = (selectedList, selectedItem) => {
    setPetTypes(selectedList);
  };

  const onRemove = (selectedList, removedItem) => {
    setPetTypes(selectedList);
  };
  return (
    <div>
      <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
        <div class="bg-card text-card-foreground rounded-3xl p-6 w-full max-w-2xl bg-white">
          <h2 class="text-2xl font-normal text-center mb-4">
            Create New Service
          </h2>
          <p class="font-thin text-center mb-6">Craft Your Pampering Package</p>
          <form class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  for="service-name"
                  class="block text-sm font-medium text-muted-foreground"
                >
                  Service Name
                </label>
                <input
                  type="text"
                  id="service-name"
                  class="mt-1 block w-full rounded-md border border-input bg-background p-2 text-foreground"
                />
              </div>
              <div>
                <label
                  for="prize"
                  class="block text-sm font-medium text-muted-foreground"
                >
                  Price
                </label>
                <input
                  type="text"
                  id="prize"
                  class="mt-1 block w-full rounded-md border border-input bg-background p-2 text-foreground"
                />
              </div>
              <div>
                <label
                  for="service-time"
                  class="block text-sm font-medium text-muted-foreground"
                >
                  Service Time
                </label>
                <input
                  type="text"
                  id="service-time"
                  class="mt-1 block w-full rounded-md border border-input bg-background p-2 text-foreground"
                />
              </div>
              <div>
                <label
                  for="pet-type"
                  class="block text-sm font-medium text-muted-foreground mb-1"
                >
                  Pet Type
                </label>
                <div class="">
                  <Multiselect
                    options={petTypeList}
                    selectedValues={petTypes}
                    onSelect={onSelect}
                    onRemove={onRemove}
                    isObject={false}
                    customCloseIcon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 ml-1 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    }
                    placeholder="Select Services"
                    className="w-full p-0.5 border rounded bg-input text-foreground"
                    style={{
                      chips: {
                        background: "#F5895A",
                        color: "#FFFFFF",
                        borderRadius: "4px",
                      }, // Selected items
                      searchBox: { border: "none" }, // Search box
                      multiselectContainer: {
                        background: "#ffffff",
                        color: "#000000",
                        borderRadius: "4px",
                      },
                      optionContainer: {
                        background: "#FFFFFF", // Options container background
                        color: "#000000", // Options text color
                      },
                      option: {
                        background: "#FFFFFF", // Default option background
                        color: "#000000", // Default option text color
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                for="service-type"
                class="block text-sm font-medium text-muted-foreground"
              >
                Service Type
              </label>
              <div class="">
                <Multiselect
                  options={serviceTypeList}
                  selectedValues={serviceType}
                  onSelect={onSelect2}
                  onRemove={onRemove2}
                  isObject={false}
                  customCloseIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 ml-1 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  }
                  placeholder="Select Services"
                  className="w-full p-1 border rounded bg-input text-foreground"
                  style={{
                    chips: {
                      background: "#F5895A",
                      color: "#FFFFFF",
                      borderRadius: "4px",
                    }, // Selected items
                    searchBox: { border: "none" }, // Search box
                    multiselectContainer: {
                      background: "#ffffff",
                      color: "#000000",
                      borderRadius: "4px",
                    },
                    optionContainer: {
                      background: "#FFFFFF", // Options container background
                      color: "#000000", // Options text color
                    },
                    option: {
                      background: "#FFFFFF", // Default option background
                      color: "#000000", // Default option text color
                    },
                  }}
                />
              </div>
            </div>
            <div class="text-start">
              <button
                type="submit"
                className="border-[#F5895A] border-2  font-bold py-2 px-4 rounded-xl text-[#F5895A] hover:bg-[#F5895A] hover:text-white transition duration-300 ease-in-out"
              >
                Create Service
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
