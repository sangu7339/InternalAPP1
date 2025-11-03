
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";

// export default function HolidayCalendar() {
//   const [holidays, setHolidays] = useState([]);
//   const [newHoliday, setNewHoliday] = useState({ title: "", date: "", type: "" });
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [error, setError] = useState(null);

//   const API_URL = "http://localhost:8080/api/hr/holidays";

//   // GET all holidays
//   const fetchHolidays = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get(API_URL, {
//         headers: {
//           "Content-Type": "application/json",
//           ...(token && { Authorization: `Bearer ${token}` }),
//         },
//       });
//       setHolidays(res.data);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   useEffect(() => {
//     fetchHolidays();
//   }, []);

//   // POST new holiday
//   const handleAdd = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.post(API_URL, newHoliday, {
//         headers: {
//           "Content-Type": "application/json",
//           ...(token && { Authorization: `Bearer ${token}` }),
//         },
//       });
//       setHolidays([...holidays, res.data]);
//       setNewHoliday({ title: "", date: "", type: "" });
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   // DELETE holiday
//   const handleDelete = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`${API_URL}/${selectedEvent.id}`, {
//         headers: {
//           "Content-Type": "application/json",
//           ...(token && { Authorization: `Bearer ${token}` }),
//         },
//       });
//       setHolidays(holidays.filter((h) => h.id !== selectedEvent.id));
//       setShowModal(false);
//       setSelectedEvent(null);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleEventClick = (clickInfo) => {
//     const event = holidays.find((h) => h.id.toString() === clickInfo.event.id);
//     setSelectedEvent(event);
//     setShowModal(true);
//   };

//   // Convert data to FullCalendar event format
//   const calendarEvents = holidays.map((h) => ({
//     id: h.id.toString(),
//     title: `${h.title} (${h.type})`,
//     start: h.date,
//     backgroundColor:
//       h.type === "holiday"
//         ? "#28a745"
//         : h.type === "meeting"
//         ? "#007bff"
//         : "#ff9800",
//   }));

//   return (
//     <div className="holiday-wrapper">
//       <style>{`
//         .holiday-wrapper {
//           max-width: 1100px;
//           margin: 30px auto;
//           font-family: Arial, sans-serif;
//         }
//         .header {
//           font-size: 24px;
//           font-weight: bold;
//           color: #1e4da8;
//           margin-bottom: 20px;
//           text-align: center;
//         }
//         .form-container {
//           background: #f9f9f9;
//           padding: 15px;
//           border-radius: 10px;
//           box-shadow: 0 2px 5px rgba(0,0,0,0.1);
//           margin-bottom: 25px;
//         }
//         .form-container input, 
//         .form-container select {
//           padding: 8px;
//           border: 1px solid #ccc;
//           border-radius: 5px;
//           margin-right: 10px;
//         }
//         .form-container button {
//           background-color: #007bff;
//           color: white;
//           border: none;
//           padding: 8px 15px;
//           border-radius: 5px;
//           cursor: pointer;
//         }
//         .form-container button:hover {
//           background-color: #0056b3;
//         }
//         .calendar-box {
//           background: white;
//           border-radius: 10px;
//           box-shadow: 0 2px 6px rgba(0,0,0,0.1);
//           padding: 10px;
//         }
//         .modal-overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0,0,0,0.4);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           z-index: 999;
//         }
//         .modal-box {
//           background: white;
//           padding: 20px;
//           border-radius: 10px;
//           max-width: 400px;
//           width: 90%;
//           box-shadow: 0 2px 6px rgba(0,0,0,0.2);
//         }
//         .modal-title {
//           color: #d32f2f;
//           font-weight: bold;
//           margin-bottom: 10px;
//         }
//         .modal-buttons {
//           display: flex;
//           justify-content: flex-end;
//           gap: 10px;
//           margin-top: 20px;
//         }
//         .cancel-btn {
//           background: #ccc;
//           border: none;
//           padding: 8px 14px;
//           border-radius: 5px;
//           cursor: pointer;
//         }
//         .delete-btn {
//           background: #d32f2f;
//           border: none;
//           color: white;
//           padding: 8px 14px;
//           border-radius: 5px;
//           cursor: pointer;
//         }
//         .delete-btn:hover {
//           background: #b71c1c;
//         }
//         .error-box {
//           background: #ffeaea;
//           color: #d32f2f;
//           padding: 10px;
//           border-radius: 5px;
//           margin-top: 15px;
//           text-align: center;
//         }
//       `}</style>

//       <h2 className="header">Holiday Calendar</h2>

//       {/* Add Holiday Form */}
//       <form className="form-container" onSubmit={handleAdd}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={newHoliday.title}
//           onChange={(e) => setNewHoliday({ ...newHoliday, title: e.target.value })}
//           required
//         />
//         <input
//           type="date"
//           value={newHoliday.date}
//           onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
//           required
//         />
//         <select
//           value={newHoliday.type}
//           onChange={(e) => setNewHoliday({ ...newHoliday, type: e.target.value })}
//           required
//         >
//           <option value="">Type</option>
//           <option value="holiday">Holiday</option>
//           <option value="meeting">Meeting</option>
//           <option value="birthday">Birthday</option>
//         </select>
//         <button type="submit">Add</button>
//       </form>

//       {/* Calendar */}
//       <div className="calendar-box">
//         <FullCalendar
//           plugins={[dayGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           events={calendarEvents}
//           eventClick={handleEventClick}
//           height="80vh"
//         />
//       </div>

//       {/* Delete Modal */}
//       {showModal && selectedEvent && (
//         <div className="modal-overlay">
//           <div className="modal-box">
//             <h3 className="modal-title">Delete Holiday</h3>
//             <p>
//               Are you sure you want to delete <b>{selectedEvent.title}</b> on{" "}
//               <b>{selectedEvent.date}</b>?
//             </p>
//             <div className="modal-buttons">
//               <button className="cancel-btn" onClick={() => setShowModal(false)}>
//                 Cancel
//               </button>
//               <button className="delete-btn" onClick={handleDelete}>
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {error && <div className="error-box">Error: {error}</div>}
//     </div>
//   );
// }

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
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const API_URL = "http://localhost:8080/api/hr/holidays";

  // GET all holidays
  const fetchHolidays = async () => {
    setLoading(true);
    setError(null);
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
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  // POST new holiday
  const handleAdd = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
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
      setSuccessMessage("Holiday added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  // DELETE holiday
  const handleDelete = async () => {
    setError(null);
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
      setSuccessMessage("Holiday deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
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
        ? "#10b981"
        : h.type === "meeting"
        ? "#3b82f6"
        : "#f59e0b",
    borderColor:
      h.type === "holiday"
        ? "#059669"
        : h.type === "meeting"
        ? "#2563eb"
        : "#d97706",
    textColor: "#ffffff",
  }));

  const getEventTypeIcon = (type) => {
    switch (type) {
      case "holiday": return "🎉";
      case "meeting": return "📅";
      case "birthday": return "🎂";
      default: return "📌";
    }
  };

  // Inline Styles
  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "24px",
      fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f8fafc",
      minHeight: "100vh",
    },
    
    // Header Styles
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "32px",
      flexWrap: "wrap",
      gap: "20px",
    },
    headerContent: {
      flex: "1",
    },
    title: {
      fontSize: "32px",
      fontWeight: "700",
      color: "#1e293b",
      margin: "0 0 8px 0",
    },
    subtitle: {
      fontSize: "16px",
      color: "#64748b",
      margin: "0",
    },
    statsContainer: {
      display: "flex",
      gap: "20px",
    },
    statItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "white",
      padding: "16px",
      borderRadius: "12px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      minWidth: "100px",
    },
    statNumber: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#3b82f6",
    },
    statLabel: {
      fontSize: "14px",
      color: "#64748b",
      marginTop: "4px",
    },
    
    // Form Styles
    formCard: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "24px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      marginBottom: "24px",
    },
    formTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#1e293b",
      margin: "0 0 20px 0",
    },
    form: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "16px",
      alignItems: "end",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#374151",
      marginBottom: "6px",
    },
    input: {
      padding: "10px 12px",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      fontSize: "14px",
      outline: "none",
      transition: "all 0.2s",
    },
    select: {
      padding: "10px 12px",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      fontSize: "14px",
      outline: "none",
      backgroundColor: "white",
      transition: "all 0.2s",
    },
    addButton: {
      padding: "12px 20px",
      backgroundColor: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      transition: "all 0.2s",
      height: "fit-content",
    },
    buttonIcon: {
      fontSize: "18px",
      fontWeight: "bold",
    },
    
    // Message Styles
    successMessage: {
      backgroundColor: "#dcfce7",
      color: "#166534",
      padding: "12px 16px",
      borderRadius: "8px",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      border: "1px solid #bbf7d0",
    },
    successIcon: {
      fontWeight: "bold",
    },
    errorMessage: {
      backgroundColor: "#fef2f2",
      color: "#dc2626",
      padding: "12px 16px",
      borderRadius: "8px",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      border: "1px solid #fecaca",
    },
    errorIcon: {
      fontWeight: "bold",
    },
    
    // Calendar Styles
    calendarSection: {
      marginBottom: "32px",
    },
    calendarHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "16px",
      flexWrap: "wrap",
      gap: "16px",
    },
    calendarTitle: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#1e293b",
      margin: "0",
    },
    legend: {
      display: "flex",
      gap: "16px",
      flexWrap: "wrap",
    },
    legendItem: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontSize: "14px",
      color: "#64748b",
    },
    legendColor: {
      width: "12px",
      height: "12px",
      borderRadius: "4px",
    },
    calendarCard: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      overflow: "hidden",
    },
    loadingContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 20px",
      color: "#64748b",
    },
    spinner: {
      width: "40px",
      height: "40px",
      border: "4px solid #f3f4f6",
      borderLeft: "4px solid #3b82f6",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      marginBottom: "16px",
    },
    
    // Modal Styles
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      backdropFilter: "blur(4px)",
    },
    modal: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "0",
      maxWidth: "480px",
      width: "90%",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      overflow: "hidden",
    },
    modalHeader: {
      display: "flex",
      alignItems: "center",
      padding: "24px 24px 0",
      gap: "12px",
    },
    modalIcon: {
      fontSize: "24px",
    },
    modalTitle: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#1e293b",
      margin: "0",
      flex: "1",
    },
    closeButton: {
      background: "none",
      border: "none",
      fontSize: "24px",
      cursor: "pointer",
      color: "#64748b",
      padding: "0",
      width: "30px",
      height: "30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "4px",
    },
    modalBody: {
      padding: "20px 24px",
    },
    modalText: {
      fontSize: "16px",
      color: "#374151",
      margin: "0 0 16px 0",
    },
    eventDetails: {
      backgroundColor: "#f8fafc",
      padding: "16px",
      borderRadius: "8px",
    },
    eventDetail: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "8px",
      fontSize: "14px",
    },
    typeBadge: {
      padding: "4px 8px",
      borderRadius: "12px",
      fontSize: "12px",
      fontWeight: "500",
      color: "white",
      marginLeft: "8px",
    },
    modalFooter: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "12px",
      padding: "0 24px 24px",
    },
    cancelButton: {
      padding: "10px 20px",
      backgroundColor: "#f8fafc",
      color: "#374151",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    deleteButton: {
      padding: "10px 20px",
      backgroundColor: "#ef4444",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s",
    },
  };

  // Add CSS for spinner animation and FullCalendar styling
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      .fc { 
        font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important; 
      }
      
      .fc-toolbar-title {
        font-size: 1.5em !important;
        font-weight: 600 !important;
        color: #1e293b !important;
      }
      
      .fc-button {
        background-color: #3b82f6 !important;
        border-color: #3b82f6 !important;
        font-weight: 500 !important;
      }
      
      .fc-button:hover {
        background-color: #2563eb !important;
        border-color: #2563eb !important;
      }
      
      .fc-button-active {
        background-color: #1d4ed8 !important;
        border-color: #1d4ed8 !important;
      }
      
      .fc-day-today {
        background-color: #dbeafe !important;
      }
      
      .fc-event {
        border-radius: 6px !important;
        border: none !important;
        padding: 2px 4px !important;
        font-size: 12px !important;
        font-weight: 500 !important;
      }
      
      input:focus, select:focus {
        border-color: #3b82f6 !important;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
      }
      
      button:hover {
        transform: translateY(-1px);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>Holiday Calendar</h1>
          <p style={styles.subtitle}>Manage company holidays and events</p>
        </div>
        <div style={styles.statsContainer}>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>{holidays.filter(h => h.type === 'holiday').length}</span>
            <span style={styles.statLabel}>Holidays</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>{holidays.filter(h => h.type === 'meeting').length}</span>
            <span style={styles.statLabel}>Meetings</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>{holidays.filter(h => h.type === 'birthday').length}</span>
            <span style={styles.statLabel}>Birthdays</span>
          </div>
        </div>
      </div>

      {/* Add Holiday Form */}
      <div style={styles.formCard}>
        <h3 style={styles.formTitle}>Add New Event</h3>
        <form onSubmit={handleAdd} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Event Title</label>
            <input
              type="text"
              placeholder="Enter event title..."
              value={newHoliday.title}
              onChange={(e) => setNewHoliday({ ...newHoliday, title: e.target.value })}
              style={styles.input}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Date</label>
            <input
              type="date"
              value={newHoliday.date}
              onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
              style={styles.input}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Event Type</label>
            <select
              value={newHoliday.type}
              onChange={(e) => setNewHoliday({ ...newHoliday, type: e.target.value })}
              style={styles.select}
              required
            >
              <option value="">Select Type</option>
              <option value="holiday">Holiday</option>
              <option value="meeting">Meeting</option>
              <option value="birthday">Birthday</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            style={styles.addButton}
            onMouseOver={(e) => e.target.style.backgroundColor = "#2563eb"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#3b82f6"}
          >
            <span style={styles.buttonIcon}>+</span>
            Add Event
          </button>
        </form>
      </div>

      {/* Messages */}
      {successMessage && (
        <div style={styles.successMessage}>
          <span style={styles.successIcon}>✓</span>
          {successMessage}
        </div>
      )}
      
      {error && (
        <div style={styles.errorMessage}>
          <span style={styles.errorIcon}>⚠</span>
          Error: {error}
        </div>
      )}

      {/* Calendar Section */}
      <div style={styles.calendarSection}>
        <div style={styles.calendarHeader}>
          <h3 style={styles.calendarTitle}>Company Calendar</h3>
          <div style={styles.legend}>
            <div style={styles.legendItem}>
              <div style={{...styles.legendColor, backgroundColor: "#10b981"}}></div>
              <span>Holidays</span>
            </div>
            <div style={styles.legendItem}>
              <div style={{...styles.legendColor, backgroundColor: "#3b82f6"}}></div>
              <span>Meetings</span>
            </div>
            <div style={styles.legendItem}>
              <div style={{...styles.legendColor, backgroundColor: "#f59e0b"}}></div>
              <span>Birthdays</span>
            </div>
          </div>
        </div>
        
        <div style={styles.calendarCard}>
          {loading ? (
            <div style={styles.loadingContainer}>
              <div style={styles.spinner}></div>
              <p>Loading calendar events...</p>
            </div>
          ) : (
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={calendarEvents}
              eventClick={handleEventClick}
              height="auto"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,dayGridWeek"
              }}
              dayMaxEventRows={3}
              eventDisplay="block"
            />
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && selectedEvent && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={styles.modalIcon}>
                {getEventTypeIcon(selectedEvent.type)}
              </div>
              <h3 style={styles.modalTitle}>Delete Event</h3>
              <button 
                style={styles.closeButton}
                onClick={() => setShowModal(false)}
                onMouseOver={(e) => e.target.style.backgroundColor = "#f1f5f9"}
                onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
              >
                ×
              </button>
            </div>
            
            <div style={styles.modalBody}>
              <p style={styles.modalText}>
                Are you sure you want to delete this event?
              </p>
              <div style={styles.eventDetails}>
                <div style={styles.eventDetail}>
                  <strong>Title:</strong> {selectedEvent.title}
                </div>
                <div style={styles.eventDetail}>
                  <strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}
                </div>
                <div style={styles.eventDetail}>
                  <strong>Type:</strong> 
                  <span style={{
                    ...styles.typeBadge,
                    backgroundColor: 
                      selectedEvent.type === 'holiday' ? '#10b981' :
                      selectedEvent.type === 'meeting' ? '#3b82f6' : '#f59e0b'
                  }}>
                    {selectedEvent.type}
                  </span>
                </div>
              </div>
            </div>
            
            <div style={styles.modalFooter}>
              <button 
                style={styles.cancelButton}
                onClick={() => setShowModal(false)}
                onMouseOver={(e) => e.target.style.backgroundColor = "#e2e8f0"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#f8fafc"}
              >
                Cancel
              </button>
              <button 
                style={styles.deleteButton}
                onClick={handleDelete}
                onMouseOver={(e) => e.target.style.backgroundColor = "#dc2626"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#ef4444"}
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}