import React, { useEffect, useState } from 'react';
import Scheduler from "react-mui-scheduler";
import { useParams } from 'react-router-dom';
import { getLeaves } from '../../../../Api/AdminApi';

const MyCalendar = () => {
  const { id: clinic } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaves = async () => {
      setLoading(true);
      try {
        const res = await getLeaves(clinic);
        const leaveDates = res.data.leaveDates || [];
        console.log("Fetched leave dates:", leaveDates);

        const newEvents = leaveDates.map((date, index) => {
          const parsedDate = new Date(date);
          const day = String(parsedDate.getUTCDate()).padStart(2, '0');
          const month = String(parsedDate.getUTCMonth() + 1).padStart(2, '0');
          const year = parsedDate.getUTCFullYear();
          const formattedDate = `${year}-${month}-${day}`;

          return {
            id: `event-${index + 1}`,
            color: "rgba(238, 81, 88, 0.2)",
            date: formattedDate,
          };
        });

        console.log("Generated events:", newEvents);
        setEvents(newEvents);
      } catch (error) {
        console.error("Error fetching leaves:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, [clinic]);

  useEffect(() => {
    console.log("Events state updated:", events);
  }, [events]);

  const config = {
    options: {
      transitionMode: "zoom",
      startWeekOn: "mon",
      defaultMode: "month",
      showGrid: false,
      minWidth: 140,
      maxWidth: 340,
      minHeight: 140,
      maxHeight: 440,
    },
    toolbarProps: {
      showSearchBar: false,
      showSwitchModeButtons: false,
      showDatePicker: false,
    },
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Scheduler
            locale="pt-BR"
            events={events}
            legacyStyle={false}
            options={config.options}
            toolbarProps={config.toolbarProps}
          />
        </>
      )}
    </div>
  );
};

export default MyCalendar;
