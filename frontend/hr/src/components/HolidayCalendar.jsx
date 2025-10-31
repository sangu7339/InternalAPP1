
import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function HolidayCalendar() {
  const [holidays, setHolidays] = useState([]);
  const [newHoliday, setNewHoliday] = useState({ title: "", date: "", type: "" });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:8080/api/hr/holidays";

  // GET all holidays
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

  // POST new holiday
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(API_URL, newHoliday, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      setHolidays([...holidays, res.data]);
      setNewHoliday({ title: "", date: "", type: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  // DELETE holiday
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${selectedEvent.id}`, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      setHolidays(holidays.filter((h) => h.id !== selectedEvent.id));
      setShowModal(false);
      setSelectedEvent(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEventClick = (clickInfo) => {
    const event = holidays.find((h) => h.id.toString() === clickInfo.event.id);
    setSelectedEvent(event);
    setShowModal(true);
  };

  // Convert data to FullCalendar event format
  const calendarEvents = holidays.map((h) => ({
    id: h.id.toString(),
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
        .form-container {
          background: #f9f9f9;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          margin-bottom: 25px;
        }
        .form-container input, 
        .form-container select {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-right: 10px;
        }
        .form-container button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 5px;
          cursor: pointer;
        }
        .form-container button:hover {
          background-color: #0056b3;
        }
        .calendar-box {
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          padding: 10px;
        }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }
        .modal-box {
          background: white;
          padding: 20px;
          border-radius: 10px;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        .modal-title {
          color: #d32f2f;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .modal-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 20px;
        }
        .cancel-btn {
          background: #ccc;
          border: none;
          padding: 8px 14px;
          border-radius: 5px;
          cursor: pointer;
        }
        .delete-btn {
          background: #d32f2f;
          border: none;
          color: white;
          padding: 8px 14px;
          border-radius: 5px;
          cursor: pointer;
        }
        .delete-btn:hover {
          background: #b71c1c;
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

      <h2 className="header">Holiday Calendar</h2>

      {/* Add Holiday Form */}
      <form className="form-container" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Title"
          value={newHoliday.title}
          onChange={(e) => setNewHoliday({ ...newHoliday, title: e.target.value })}
          required
        />
        <input
          type="date"
          value={newHoliday.date}
          onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
          required
        />
        <select
          value={newHoliday.type}
          onChange={(e) => setNewHoliday({ ...newHoliday, type: e.target.value })}
          required
        >
          <option value="">Type</option>
          <option value="holiday">Holiday</option>
          <option value="meeting">Meeting</option>
          <option value="birthday">Birthday</option>
        </select>
        <button type="submit">Add</button>
      </form>

      {/* Calendar */}
      <div className="calendar-box">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={calendarEvents}
          eventClick={handleEventClick}
          height="80vh"
        />
      </div>

      {/* Delete Modal */}
      {showModal && selectedEvent && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3 className="modal-title">Delete Holiday</h3>
            <p>
              Are you sure you want to delete <b>{selectedEvent.title}</b> on{" "}
              <b>{selectedEvent.date}</b>?
            </p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="delete-btn" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {error && <div className="error-box">Error: {error}</div>}
    </div>
  );
}
