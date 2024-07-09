import React, { useState } from "react";

import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';

function Datepicker({fn}) {
  const [selected, setSelected] = useState();
  if(selected){
    console.log(selected)
    fn(selected)
  }
  return (
    <div className="bg-[#766d6d]">
      <DayPicker
        mode="range"
        selected={selected}
        onSelect={setSelected}
      />
    </div>
  );
}

export default Datepicker;

