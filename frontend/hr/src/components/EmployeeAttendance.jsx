// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const statusColors = {
//   PRESENT: "#16a34a",
//   LATE: "#f59e0b",
//   HALF_DAY: "#eab308",
//   ABSENT: "#dc2626",
//   PENDING: "#3b82f6",
//   DEFAULT: "#6b7280",
// };

// const EmployeeAttendance = ({ user }) => {
//   const [attendance, setAttendance] = useState([]);
//   const [month, setMonth] = useState(new Date().getMonth() + 1);
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const token = localStorage.getItem("token");
//   const axiosConfig = token ? { headers: { Authorization: `Bearer ${token}` } } : null;

//   const fetchAttendance = async () => {
//     if (!user?.email || !axiosConfig) return;
//     try {
//       setLoading(true);
//       setMessage("");
//       const res = await axios.get(
//         `http://localhost:8080/api/attendance/my/month?email=${user.email}&year=${year}&month=${month}`,
//         axiosConfig
//       );
//       setAttendance(res.data);
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ Failed to load attendance records.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAttendance();
//   }, [month, year, user?.email]);

//   const handleCheckIn = async () => {
//     try {
//       const res = await axios.post(
//         `http://localhost:8080/api/attendance/checkin?email=${user.email}`,
//         {},
//         axiosConfig
//       );
//       alert(res.data);
//       fetchAttendance();
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to check in.");
//     }
//   };

//   const handleCheckOut = async () => {
//     // First confirmation
//     if (!window.confirm("Are you sure you want to check out?")) return;
//     // Second confirmation
//     if (!window.confirm("This action will finalize your attendance for today. Confirm check-out?")) return;

//     try {
//       const res = await axios.post(
//         `http://localhost:8080/api/attendance/checkout?email=${user.email}`,
//         {},
//         axiosConfig
//       );
//       alert(res.data);
//       fetchAttendance();
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to check out.");
//     }
//   };

//   const summary = attendance.reduce(
//     (acc, record) => {
//       acc[record.status?.toLowerCase()] = (acc[record.status?.toLowerCase()] || 0) + 1;
//       return acc;
//     },
//     { present: 0, late: 0, half_day: 0, absent: 0, pending: 0 }
//   );

//   const today = new Date().toISOString().split("T")[0];

//   return (
//     <div style={styles.container}>
//       {/* Month & Year Select */}
//       <div style={styles.controls}>
//         <select
//           value={month}
//           onChange={(e) => setMonth(Number(e.target.value))}
//           style={styles.select}
//           aria-label="Select month"
//         >
//           {Array.from({ length: 12 }, (_, i) => (
//             <option key={i + 1} value={i + 1}>
//               {new Date(0, i).toLocaleString("default", { month: "long" })}
//             </option>
//           ))}
//         </select>
//         <input
//           type="number"
//           value={year}
//           onChange={(e) => setYear(Number(e.target.value))}
//           style={styles.input}
//           min="2020"
//           max="2030"
//           aria-label="Select year"
//         />
//         <button onClick={fetchAttendance} style={styles.refreshBtn}>
//           🔄 Refresh
//         </button>
//       </div>

//       {/* --- Centered Check-in / Check-out buttons --- */}
//       <div style={styles.actions}>
//         <button
//           onClick={handleCheckIn}
//           style={{ ...styles.actionBtn, background: statusColors.PRESENT }}
//         >
//           Check In
//         </button>
//         <button
//           onClick={handleCheckOut}
//           style={{ ...styles.actionBtn, background: "#1d4ed8" }}
//         >
//           Check Out
//         </button>
//       </div>

//       {/* --- Summary Cards --- */}
//       <div style={styles.summaryContainer}>
//         {Object.entries(summaryColorsMapping).map(([key, label]) => (
//           <SummaryCard
//             key={key}
//             title={label}
//             count={summary[key] || 0}
//             color={statusColors[key.toUpperCase()] || statusColors.DEFAULT}
//           />
//         ))}
//       </div>

//       {/* --- Attendance Table --- */}
//       {loading ? (
//         <p style={{ textAlign: "center", marginTop: 20 }}>Loading...</p>
//       ) : (
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Check In</th>
//               <th>Check Out</th>
//               <th>Status</th>
//               <th>Reason</th>
//             </tr>
//           </thead>
//           <tbody>
//             {attendance.length > 0 ? (
//               attendance.map((a) => (
//                 <tr
//                   key={a.id}
//                   style={{
//                     backgroundColor: a.date === today ? "#f0fdf4" : "transparent",
//                     transition: "background 0.2s",
//                   }}
//                 >
//                   <td>{a.date}</td>
//                   <td>{a.checkInTime || "-"}</td>
//                   <td>{a.checkOutTime || "-"}</td>
//                   <td
//                     style={{
//                       color: statusColors[a.status] || statusColors.DEFAULT,
//                       fontWeight: "bold",
//                     }}
//                   >
//                     {a.status}
//                   </td>
//                   <td>{a.reason || "-"}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" style={{ textAlign: "center", padding: 16, color: "#666" }}>
//                   No attendance data found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}

//       {message && (
//         <p style={{ color: "red", textAlign: "center", marginTop: 10 }}>{message}</p>
//       )}
//     </div>
//   );
// };

// const summaryColorsMapping = {
//   present: "Present",
//   late: "Late",
//   half_day: "Half Day",
//   absent: "Absent",
//   pending: "Pending",
// };

// const SummaryCard = ({ title, count, color }) => (
//   <div style={{ ...styles.summaryCard, backgroundColor: `${color}20` }}>
//     <h4 style={{ color }}>{title}</h4>
//     <p style={{ color, fontWeight: "bold", fontSize: 16 }}>{count}</p>
//   </div>
// );

// const styles = {
//   container: {
//     background: "#fff",
//     padding: 20,
//     borderRadius: 12,
//     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//     width: "100%",
//   },
//   controls: {
//     display: "flex",
//     justifyContent: "center",
//     gap: 10,
//     marginBottom: 20,
//     flexWrap: "wrap",
//   },
//   select: { padding: 8, borderRadius: 6, border: "1px solid #ccc" },
//   input: { padding: 8, borderRadius: 6, border: "1px solid #ccc", width: 100 },
//   refreshBtn: {
//     padding: "8px 14px",
//     borderRadius: 6,
//     border: "none",
//     background: "#6b7280",
//     color: "white",
//     cursor: "pointer",
//   },
//   actions: {
//     display: "flex",
//     justifyContent: "center",
//     gap: 20,
//     marginBottom: 20,
//     marginTop: 10,
//   },
//   actionBtn: {
//     color: "white",
//     padding: "12px 20px",
//     border: "none",
//     borderRadius: 8,
//     cursor: "pointer",
//     fontWeight: 600,
//     fontSize: 16,
//   },
//   table: { width: "100%", borderCollapse: "collapse" },
//   summaryContainer: {
//     display: "flex",
//     gap: 12,
//     marginBottom: 20,
//     justifyContent: "center",
//     flexWrap: "wrap",
//   },
//   summaryCard: { padding: 12, borderRadius: 8, textAlign: "center", minWidth: 80 },
// };

// export default EmployeeAttendance;

import React, { useState, useEffect } from "react";
import axios from "axios";

const statusColors = {
  PRESENT: "#16a34a",
  LATE: "#f59e0b",
  HALF_DAY: "#eab308",
  ABSENT: "#dc2626",
  PENDING: "#3b82f6",
  DEFAULT: "#6b7280",
};

const EmployeeAttendance = ({ user }) => {
  const [attendance, setAttendance] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const token = localStorage.getItem("token");
  const axiosConfig = token ? { headers: { Authorization: `Bearer ${token}` } } : null;

  const fetchAttendance = async () => {
    if (!user?.email || !axiosConfig) return;
    try {
      setLoading(true);
      setMessage("");
      const res = await axios.get(
        `http://localhost:8080/api/attendance/my/month?email=${user.email}&year=${year}&month=${month}`,
        axiosConfig
      );
      setAttendance(res.data);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to load attendance records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [month, year, user?.email]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCheckIn = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/attendance/checkin?email=${user.email}`,
        {},
        axiosConfig
      );
      alert(res.data);
      fetchAttendance();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to check in.");
    }
  };

  const handleCheckOut = async () => {
    if (!window.confirm("Are you sure you want to check out?")) return;
    if (!window.confirm("This action will finalize your attendance for today. Confirm check-out?")) return;

    try {
      const res = await axios.post(
        `http://localhost:8080/api/attendance/checkout?email=${user.email}`,
        {},
        axiosConfig
      );
      alert(res.data);
      fetchAttendance();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to check out.");
    }
  };

  const summary = attendance.reduce(
    (acc, record) => {
      acc[record.status?.toLowerCase()] = (acc[record.status?.toLowerCase()] || 0) + 1;
      return acc;
    },
    { present: 0, late: 0, half_day: 0, absent: 0, pending: 0 }
  );

  const today = new Date().toISOString().split("T")[0];

  return (
    <div style={styles.container}>
      {/* Header */}
      <h2 style={styles.header}>Attendance Dashboard</h2>

      {/* Check-in / Check-out buttons */}
      <div style={styles.actions}>
        <button
          onClick={handleCheckIn}
          style={{ ...styles.actionBtn, background: statusColors.PRESENT }}
        >
          Check In
        </button>
        <button
          onClick={handleCheckOut}
          style={{ ...styles.actionBtn, background: "#1d4ed8" }}
        >
          Check Out
        </button>
      </div>

      {/* Summary Cards */}
      <div style={styles.summaryContainer}>
        {Object.entries(summaryColorsMapping).map(([key, label]) => (
          <SummaryCard
            key={key}
            title={label}
            count={summary[key] || 0}
            color={statusColors[key.toUpperCase()] || statusColors.DEFAULT}
          />
        ))}
      </div>

      {/* Month & Year Select + Refresh */}
      <div style={styles.controls}>
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          style={styles.select}
          aria-label="Select month"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          style={styles.input}
          min="2020"
          max="2030"
          aria-label="Select year"
        />
        <button onClick={fetchAttendance} style={styles.refreshBtn}>
          🔄
        </button>
      </div>

      {/* Attendance Records */}
      {loading ? (
        <div style={styles.loader}>
          <span style={styles.spinner}></span>
          Loading...
        </div>
      ) : isMobile ? (
        <div style={styles.cardContainer}>
          {attendance.length > 0 ? (
            attendance.map((a) => (
              <div
                key={a.id}
                style={{
                  ...styles.card,
                  backgroundColor: a.date === today ? "#f0fdf4" : "#fff",
                }}
              >
                <div style={styles.cardHeader}>
                  <span style={styles.cardDate}>{a.date}</span>
                  <span
                    style={{
                      ...styles.cardStatus,
                      color: statusColors[a.status] || statusColors.DEFAULT,
                    }}
                  >
                    {a.status}
                  </span>
                </div>
                <div style={styles.cardRow}>
                  <span style={styles.cardLabel}>Check In</span>
                  <span>{a.checkInTime || "-"}</span>
                </div>
                <div style={styles.cardRow}>
                  <span style={styles.cardLabel}>Check Out</span>
                  <span>{a.checkOutTime || "-"}</span>
                </div>
                <div style={styles.cardRow}>
                  <span style={styles.cardLabel}>Reason</span>
                  <span>{a.reason || "-"}</span>
                </div>
              </div>
            ))
          ) : (
            <p style={styles.noData}>No attendance data found.</p>
          )}
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Check In</th>
                <th style={styles.th}>Check Out</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Reason</th>
              </tr>
            </thead>
            <tbody>
              {attendance.length > 0 ? (
                attendance.map((a) => (
                  <tr
                    key={a.id}
                    style={{
                      ...styles.tr,
                      backgroundColor: a.date === today ? "#f0fdf4" : "transparent",
                    }}
                  >
                    <td style={styles.td}>{a.date}</td>
                    <td style={styles.td}>{a.checkInTime || "-"}</td>
                    <td style={styles.td}>{a.checkOutTime || "-"}</td>
                    <td
                      style={{
                        ...styles.td,
                        color: statusColors[a.status] || statusColors.DEFAULT,
                        fontWeight: "bold",
                      }}
                    >
                      {a.status}
                    </td>
                    <td style={styles.td}>{a.reason || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ ...styles.td, textAlign: "center" }}>
                    No attendance data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {message && <p style={styles.error}>{message}</p>}
    </div>
  );
};

const summaryColorsMapping = {
  present: "Present",
  late: "Late",
  half_day: "Half Day",
  absent: "Absent",
  pending: "Pending",
};

const SummaryCard = ({ title, count, color }) => (
  <div style={{ ...styles.summaryCard, backgroundColor: `${color}20` }}>
    <h4 style={{ ...styles.summaryTitle, color }}>{title}</h4>
    <p style={{ ...styles.summaryCount, color }}>{count}</p>
  </div>
);

const styles = {
  container: {
    background: "#ffffff",
    padding: "1rem",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "1200px",
    margin: "0.5rem auto",
    boxSizing: "border-box",
    fontFamily: "'Inter', sans-serif",
    minHeight: "100vh", // Ensures full height on mobile
  },
  header: {
    fontSize: "1.25rem",
    fontWeight: 600,
    color: "#1f2937",
    textAlign: "center",
    marginBottom: "1rem",
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.75rem",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  actionBtn: {
    padding: "0.75rem 1.25rem",
    borderRadius: "8px",
    border: "none",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: 600,
    flex: "1 1 140px",
    maxWidth: "180px",
    touchAction: "manipulation",
    transition: "transform 0.2s, background 0.2s",
  },
  summaryContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.75rem",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  summaryCard: {
    padding: "0.75rem",
    borderRadius: "8px",
    textAlign: "center",
    flex: "1 1 80px",
    minWidth: "80px",
    maxWidth: "120px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  summaryTitle: {
    fontSize: "0.85rem",
    fontWeight: 500,
    marginBottom: "0.25rem",
  },
  summaryCount: {
    fontSize: "1.25rem",
    fontWeight: 700,
  },
  controls: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    justifyContent: "center",
    marginBottom: "1rem",
    background: "#f9fafb",
    padding: "0.5rem",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  select: {
    padding: "0.5rem",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    background: "#ffffff",
    fontSize: "0.9rem",
    flex: "1 1 100px",
    maxWidth: "140px",
    outline: "none",
  },
  input: {
    padding: "0.5rem",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    background: "#ffffff",
    fontSize: "0.9rem",
    flex: "1 1 80px",
    maxWidth: "100px",
    outline: "none",
  },
  refreshBtn: {
    padding: "0.5rem",
    borderRadius: "6px",
    border: "none",
    background: "#6b7280",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "0.9rem",
    flex: "1 1 40px",
    maxWidth: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tableContainer: {
    overflowX: "auto",
    borderRadius: "8px",
    marginBottom: "1rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.9rem",
  },
  th: {
    padding: "0.75rem",
    background: "#f3f4f6",
    textAlign: "left",
    fontWeight: 600,
    color: "#1f2937",
    borderBottom: "1px solid #e5e7eb",
  },
  td: {
    padding: "0.75rem",
    borderBottom: "1px solid #e5e7eb",
    color: "#374151",
  },
  tr: {
    transition: "background 0.2s",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    marginBottom: "1rem",
  },
  card: {
    padding: "0.75rem",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    background: "#fff",
    transition: "background 0.2s",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "0.5rem",
    borderBottom: "1px solid #f3f4f6",
    marginBottom: "0.5rem",
  },
  cardDate: {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "#1f2937",
  },
  cardStatus: {
    fontSize: "0.85rem",
    fontWeight: 600,
    padding: "0.25rem 0.5rem",
    borderRadius: "4px",
  },
  cardRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.25rem 0",
    fontSize: "0.85rem",
  },
  cardLabel: {
    fontWeight: 500,
    color: "#1f2937",
    flex: "0 0 40%",
  },
  loader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    color: "#6b7280",
    margin: "1.5rem 0",
    fontSize: "0.9rem",
  },
  spinner: {
    width: "1.25rem",
    height: "1.25rem",
    border: "2px solid #6b7280",
    borderTopColor: "transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  noData: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: "0.9rem",
    padding: "1rem",
  },
  error: {
    color: "#dc2626",
    textAlign: "center",
    fontSize: "0.9rem",
    marginTop: "1rem",
  },
};

// Media queries and keyframe animations
const responsiveStyles = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    .container {
      padding: 0.75rem;
      margin: 0.5rem;
      min-height: calc(100vh - 1rem);
    }
    .header {
      font-size: 1.1rem;
    }
    .actions {
      flex-direction: column;
      align-items: stretch;
      gap: 0.5rem;
    }
    .actionBtn {
      flex: none;
      width: 100%;
      max-width: none;
      padding: 0.75rem;
      font-size: 0.9rem;
    }
    .actionBtn:active {
      transform: scale(0.98);
    }
    .summaryContainer {
      gap: 0.5rem;
    }
    .summaryCard {
      flex: 1 1 45%;
      max-width: none;
      padding: 0.5rem;
    }
    .summaryTitle {
      font-size: 0.8rem;
    }
    .summaryCount {
      font-size: 1.1rem;
    }
    .controls {
      flex-direction: column;
      align-items: stretch;
      padding: 0.5rem;
      gap: 0.5rem;
    }
    .select, .input, .refreshBtn {
      flex: none;
      width: 100%;
      max-width: none;
      font-size: 0.85rem;
      padding: 0.5rem;
    }
    .refreshBtn {
      max-width: 100%;
      padding: 0.5rem;
    }
    .cardContainer {
      gap: 0.5rem;
    }
    .card {
      padding: 0.5rem;
    }
    .cardHeader {
      font-size: 0.85rem;
    }
    .cardRow {
      font-size: 0.8rem;
    }
    .cardLabel {
      flex: 0 0 45%;
    }
  }

  @media (max-width: 480px) {
    .summaryCard {
      flex: 1 1 100%;
      min-width: 0;
    }
    .cardHeader {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
    }
    .cardDate, .cardStatus {
      font-size: 0.8rem;
    }
    .cardRow {
      font-size: 0.75rem;
    }
  }
`;

// Inject media queries and animations
const styleSheet = document.createElement("style");
styleSheet.innerText = responsiveStyles;
document.head.appendChild(styleSheet);

export default EmployeeAttendance;