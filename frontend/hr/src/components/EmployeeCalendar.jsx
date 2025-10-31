import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function EmployeeCalendar() {
  const [holidays, setHolidays] = useState([]);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:8080/api/employee/holidays";

  // Fetch holidays for employee
  const fetchHolidays = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(API_URL, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      setHolidays(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  // Map holidays to calendar format
  const calendarEvents = holidays.map((h) => ({
    id: h.id?.toString(),
    title: `${h.title} (${h.type})`,
    start: h.date,
    backgroundColor:
      h.type === "holiday"
        ? "#28a745"
        : h.type === "meeting"
        ? "#007bff"
        : "#ff9800",
  }));

  return (
    <div className="holiday-wrapper">
      <style>{`
        .holiday-wrapper {
          max-width: 1100px;
          margin: 30px auto;
          font-family: Arial, sans-serif;
        }
        .header {
          font-size: 24px;
          font-weight: bold;
          color: #1e4da8;
          margin-bottom: 20px;
          text-align: center;
        }
        .calendar-box {
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          padding: 10px;
        }
        .error-box {
          background: #ffeaea;
          color: #d32f2f;
          padding: 10px;
          border-radius: 5px;
          margin-top: 15px;
          text-align: center;
        }
      `}</style>

     

      <div className="calendar-box">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={calendarEvents}
          height="80vh"
        />
      </div>

      {error && <div className="error-box">Error: {error}</div>}
    </div>
  );
}
