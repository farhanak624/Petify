import React from "react";
import GoogleAutoComplete from "react-google-autocomplete";

const GoogleMapPickers = () => {
  const handlePlaceSelect = (place) => {
    // Handle selected place
    console.log(place);
  };

  return (
    <div>
      <GoogleAutoComplete
        apiKey={AIzaSyCjF3VqrEzbhP7VlTAz5_devJIsCDDxKuc}
        onSelect={handlePlaceSelect}
      />
    </div>
  );
};

export default GoogleMapPickers;
