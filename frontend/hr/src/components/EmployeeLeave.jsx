// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const MAX_LEAVE_DAYS = 3;
// const HR_EMAIL = "hr@venturebiz.in"; // Replace with actual HR email

// const EmployeeLeave = ({ user }) => {
//   const [leaves, setLeaves] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [editingLeave, setEditingLeave] = useState(null);
//   const [formData, setFormData] = useState({ leaveType: "", startDate: "", endDate: "", reason: "" });
//   const [message, setMessage] = useState("");
//   const [showContactHR, setShowContactHR] = useState(false);

//   const token = localStorage.getItem("token");
//   const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

//   const fetchLeaves = async () => {
//     if (!user?.email) return;
//     try {
//       setLoading(true);
//       const res = await axios.get(`http://localhost:8080/api/leave/my?email=${user.email}`, axiosConfig);
//       setLeaves(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchLeaves(); }, []);

//   const openForm = (leave = null) => {
//     if (leave) {
//       setEditingLeave(leave);
//       setFormData({
//         leaveType: leave.leaveType,
//         startDate: leave.startDate,
//         endDate: leave.endDate,
//         reason: leave.reason,
//       });
//     } else {
//       setEditingLeave(null);
//       setFormData({ leaveType: "", startDate: "", endDate: "", reason: "" });
//     }
//     setShowForm(true);
//     setMessage("");
//     setShowContactHR(false);
//   };

//   const calculateDays = (start, end) => {
//     const diff = (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24) + 1;
//     return diff > 0 ? diff : 0;
//   };

//   const handleApplyLeave = async () => {
//     const days = calculateDays(formData.startDate, formData.endDate);

//     if (days <= 0) {
//       setMessage("❌ End date must be after start date.");
//       return;
//     }

//     if (days > MAX_LEAVE_DAYS) {
//       setShowContactHR(true);
//       setMessage(`Leave exceeds maximum ${MAX_LEAVE_DAYS} days.`);
//       return;
//     }

//     try {
//       if (editingLeave) {
//         await axios.put(
//           `http://localhost:8080/api/leave/${editingLeave.id}/edit?email=${user.email}`,
//           formData,
//           axiosConfig
//         );
//         setMessage("✅ Leave updated successfully");
//       } else {
//         await axios.post(
//           `http://localhost:8080/api/leave/apply?email=${user.email}`,
//           formData,
//           axiosConfig
//         );
//         setMessage("✅ Leave applied successfully");
//       }

//       setShowForm(false);
//       setEditingLeave(null);
//       setFormData({ leaveType: "", startDate: "", endDate: "", reason: "" });
//       setShowContactHR(false);
//       fetchLeaves();
//     } catch (err) {
//       console.error(err);
//       const errorMsg =
//         err.response?.data?.message ||
//         err.response?.data ||
//         err.message;
//       setMessage(`❌ Failed to submit leave: ${errorMsg}`);
//     }
//   };

//   const handleDeleteLeave = async (leaveId) => {
//     if (!window.confirm("Are you sure you want to delete this leave request?")) return;

//     try {
//       await axios.delete(`http://localhost:8080/api/leave/${leaveId}/delete?email=${user.email}`, axiosConfig);
//       setMessage("✅ Leave deleted successfully");
//       fetchLeaves();
//     } catch (err) {
//       console.error(err);
//       const errorMsg =
//         err.response?.data?.message ||
//         err.response?.data ||
//         err.message;
//       setMessage(`❌ Failed to delete leave: ${errorMsg}`);
//     }
//   };

//   return (
//     <div style={styles.fullScreenContainer}>
//       <div style={styles.contentWrapper}>
//         <h3>My Leaves</h3>

//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <div style={styles.tableWrapper}>
//             <table style={styles.table}>
//               <thead>
//                 <tr>
//                   <th>Type</th>
//                   <th>Start</th>
//                   <th>End</th>
//                   <th>Days</th>
//                   <th>Status</th>
//                   <th>Reason</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {leaves.length > 0 ? (
//                   leaves.map(l => (
//                     <tr key={l.id}>
//                       <td>{l.leaveType}</td>
//                       <td>{l.startDate}</td>
//                       <td>{l.endDate}</td>
//                       <td>{l.days}</td>
//                       <td>{l.leaveStatus}</td>
//                       <td>{l.reason}</td>
//                       <td style={{ display: "flex", gap: 6 }}>
//                         {l.leaveStatus === "PENDING" && (
//                           <>
//                             <button
//                               onClick={() => openForm(l)}
//                               style={styles.editButton}
//                             >
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDeleteLeave(l.id)}
//                               style={styles.deleteButton}
//                             >
//                               Delete
//                             </button>
//                           </>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" style={{ textAlign: "center", padding: 16 }}>No leave records found.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {message && (
//           <p style={{ color: message.includes("❌") ? "red" : "green", marginTop: 10 }}>{message}</p>
//         )}

//         {!showForm && (
//           <button
//             onClick={() => openForm()}
//             style={styles.applyButton}
//           >
//             Apply Leave
//           </button>
//         )}

//         {showForm && (
//           <div style={styles.formContainer}>
//             <h4>{editingLeave ? "Edit Leave" : "Apply Leave"}</h4>

//             <select
//               value={formData.leaveType}
//               onChange={e => setFormData({ ...formData, leaveType: e.target.value })}
//               style={styles.input}
//             >
//               <option value="">Select Type</option>
//               <option value="SICK">Sick</option>
//               <option value="CASUAL">Casual</option>
//             </select>

//             <div style={{ display: "flex", gap: 10 }}>
//               <input
//                 type="date"
//                 value={formData.startDate}
//                 onChange={e => setFormData({ ...formData, startDate: e.target.value })}
//                 style={{ flex: 1, ...styles.input }}
//               />
//               <input
//                 type="date"
//                 value={formData.endDate}
//                 onChange={e => setFormData({ ...formData, endDate: e.target.value })}
//                 style={{ flex: 1, ...styles.input }}
//               />
//             </div>

//             <input
//               type="text"
//               placeholder="Reason"
//               value={formData.reason}
//               onChange={e => setFormData({ ...formData, reason: e.target.value })}
//               style={styles.input}
//             />

//             <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
//               <button
//                 onClick={handleApplyLeave}
//                 style={styles.submitButton}
//               >
//                 {editingLeave ? "Update" : "Submit"}
//               </button>
//               <button
//                 onClick={() => {
//                   setShowForm(false);
//                   setEditingLeave(null);
//                   setMessage("");
//                   setShowContactHR(false);
//                 }}
//                 style={styles.cancelButton}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}

//         {showContactHR && (
//           <div style={{ marginTop: 20, textAlign: "center" }}>
//             <p>Leave exceeds maximum allowed days. Please contact HR.</p>
//             <a
//               href={`mailto:${HR_EMAIL}?subject=Leave%20Request%20Assistance&body=Hi%20HR,%20I%20need%20assistance%20with%20my%20leave%20request.`}
//             >
//               <button style={styles.contactHRButton}>
//                 Contact HR
//               </button>
//             </a>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   fullScreenContainer: {
//     minHeight: "100vh",
//     width: "100%",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "flex-start",
//     backgroundColor: "#f0f2f5",
//     padding: 20,
//     boxSizing: "border-box",
//   },
//   contentWrapper: {
//     width: "100%",
//     maxWidth: 1200,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 20,
//     boxSizing: "border-box",
//     flex: 1,
//   },
//   tableWrapper: {
//     overflowX: "auto",
//     marginTop: 10,
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//   },
//   editButton: {
//     padding: "4px 8px",
//     borderRadius: 4,
//     background: "#16a34a",
//     color: "white",
//     border: "none",
//     cursor: "pointer",
//   },
//   deleteButton: {
//     padding: "4px 8px",
//     borderRadius: 4,
//     background: "#dc2626",
//     color: "white",
//     border: "none",
//     cursor: "pointer",
//   },
//   applyButton: {
//     marginTop: 20,
//     padding: "10px 20px",
//     borderRadius: 6,
//     background: "#1d4ed8",
//     color: "white",
//     border: "none",
//     cursor: "pointer",
//   },
//   formContainer: {
//     marginTop: 20,
//     padding: 20,
//     border: "1px solid #ccc",
//     borderRadius: 8,
//     display: "flex",
//     flexDirection: "column",
//     gap: 10,
//   },
//   input: {
//     padding: 8,
//     borderRadius: 6,
//     border: "1px solid #ccc",
//     width: "100%",
//     boxSizing: "border-box",
//   },
//   submitButton: {
//     padding: "8px 16px",
//     borderRadius: 6,
//     background: "#16a34a",
//     color: "white",
//     border: "none",
//     cursor: "pointer",
//   },
//   cancelButton: {
//     padding: "8px 16px",
//     borderRadius: 6,
//     background: "#ccc",
//     color: "#333",
//     border: "none",
//     cursor: "pointer",
//   },
//   contactHRButton: {
//     padding: "8px 16px",
//     borderRadius: 6,
//     background: "#1d4ed8",
//     color: "white",
//     border: "none",
//     cursor: "pointer",
//   },
// };

// export default EmployeeLeave;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const MAX_LEAVE_DAYS = 3;
// const HR_EMAIL = "hr@venturebiz.in";

// const EmployeeLeave = ({ user }) => {
//   const [leaves, setLeaves] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [editingLeave, setEditingLeave] = useState(null);
//   const [formData, setFormData] = useState({ leaveType: "", startDate: "", endDate: "", reason: "" });
//   const [message, setMessage] = useState("");
//   const [showContactHR, setShowContactHR] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   const token = localStorage.getItem("token");
//   const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

//   // Handle window resize for responsive behavior
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const fetchLeaves = async () => {
//     if (!user?.email) return;
//     try {
//       setLoading(true);
//       const res = await axios.get(`http://localhost:8080/api/leave/my?email=${user.email}`, axiosConfig);
//       setLeaves(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchLeaves(); }, []);

//   const openForm = (leave = null) => {
//     if (leave) {
//       setEditingLeave(leave);
//       setFormData({
//         leaveType: leave.leaveType,
//         startDate: leave.startDate,
//         endDate: leave.endDate,
//         reason: leave.reason,
//       });
//     } else {
//       setEditingLeave(null);
//       setFormData({ leaveType: "", startDate: "", endDate: "", reason: "" });
//     }
//     setShowForm(true);
//     setMessage("");
//     setShowContactHR(false);
//   };

//   const calculateDays = (start, end) => {
//     const diff = (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24) + 1;
//     return diff > 0 ? diff : 0;
//   };

//   const handleApplyLeave = async () => {
//     const days = calculateDays(formData.startDate, formData.endDate);

//     if (days <= 0) {
//       setMessage("❌ End date must be after start date.");
//       return;
//     }

//     if (days > MAX_LEAVE_DAYS) {
//       setShowContactHR(true);
//       setMessage(`Leave exceeds maximum ${MAX_LEAVE_DAYS} days.`);
//       return;
//     }

//     try {
//       if (editingLeave) {
//         await axios.put(
//           `http://localhost:8080/api/leave/${editingLeave.id}/edit?email=${user.email}`,
//           formData,
//           axiosConfig
//         );
//         setMessage("✅ Leave updated successfully");
//       } else {
//         await axios.post(
//           `http://localhost:8080/api/leave/apply?email=${user.email}`,
//           formData,
//           axiosConfig
//         );
//         setMessage("✅ Leave applied successfully");
//       }

//       setShowForm(false);
//       setEditingLeave(null);
//       setFormData({ leaveType: "", startDate: "", endDate: "", reason: "" });
//       setShowContactHR(false);
//       fetchLeaves();
//     } catch (err) {
//       console.error(err);
//       const errorMsg =
//         err.response?.data?.message ||
//         err.response?.data ||
//         err.message;
//       setMessage(`❌ Failed to submit leave: ${errorMsg}`);
//     }
//   };

//   const handleDeleteLeave = async (leaveId) => {
//     if (!window.confirm("Are you sure you want to delete this leave request?")) return;

//     try {
//       await axios.delete(`http://localhost:8080/api/leave/${leaveId}/delete?email=${user.email}`, axiosConfig);
//       setMessage("✅ Leave deleted successfully");
//       fetchLeaves();
//     } catch (err) {
//       console.error(err);
//       const errorMsg =
//         err.response?.data?.message ||
//         err.response?.data ||
//         err.message;
//       setMessage(`❌ Failed to delete leave: ${errorMsg}`);
//     }
//   };

//   // Mobile card view for leaves
//   const renderMobileLeaves = () => (
//     <div style={styles.mobileLeavesContainer}>
//       {leaves.length > 0 ? (
//         leaves.map(l => (
//           <div key={l.id} style={styles.mobileCard}>
//             <div style={styles.mobileCardHeader}>
//               <span style={styles.leaveType}>{l.leaveType}</span>
//               <span style={{
//                 ...styles.statusBadge,
//                 color: getStatusColor(l.leaveStatus),
//                 borderColor: getStatusColor(l.leaveStatus)
//               }}>
//                 {l.leaveStatus}
//               </span>
//             </div>
//             <div style={styles.mobileCardBody}>
//               <div style={styles.dateRow}>
//                 <span style={styles.dateLabel}>Dates:</span>
//                 <span>{l.startDate} to {l.endDate}</span>
//               </div>
//               <div style={styles.dateRow}>
//                 <span style={styles.dateLabel}>Days:</span>
//                 <span>{l.days}</span>
//               </div>
//               <div style={styles.reasonRow}>
//                 <span style={styles.dateLabel}>Reason:</span>
//                 <span style={styles.reasonText}>{l.reason}</span>
//               </div>
//             </div>
//             {l.leaveStatus === "PENDING" && (
//               <div style={styles.mobileCardActions}>
//                 <button
//                   onClick={() => openForm(l)}
//                   style={styles.mobileEditButton}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDeleteLeave(l.id)}
//                   style={styles.mobileDeleteButton}
//                 >
//                   Delete
//                 </button>
//               </div>
//             )}
//           </div>
//         ))
//       ) : (
//         <div style={styles.noDataMobile}>No leave records found.</div>
//       )}
//     </div>
//   );

//   // Desktop table view for leaves
//   const renderDesktopLeaves = () => (
//     <div style={styles.tableWrapper}>
//       <table style={styles.table}>
//         <thead>
//           <tr>
//             <th>Type</th>
//             <th>Start</th>
//             <th>End</th>
//             <th>Days</th>
//             <th>Status</th>
//             <th>Reason</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaves.length > 0 ? (
//             leaves.map(l => (
//               <tr key={l.id}>
//                 <td>{l.leaveType}</td>
//                 <td>{l.startDate}</td>
//                 <td>{l.endDate}</td>
//                 <td>{l.days}</td>
//                 <td>{l.leaveStatus}</td>
//                 <td>{l.reason}</td>
//                 <td style={{ display: "flex", gap: 6 }}>
//                   {l.leaveStatus === "PENDING" && (
//                     <>
//                       <button
//                         onClick={() => openForm(l)}
//                         style={styles.editButton}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDeleteLeave(l.id)}
//                         style={styles.deleteButton}
//                       >
//                         Delete
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="7" style={{ textAlign: "center", padding: 16 }}>No leave records found.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'APPROVED': return '#16a34a';
//       case 'REJECTED': return '#dc2626';
//       case 'PENDING': return '#d97706';
//       default: return '#6b7280';
//     }
//   };

//   return (
//     <div style={styles.fullScreenContainer}>
//       <div style={styles.contentWrapper}>
//         <div style={styles.header}>
//           <h3 style={styles.title}>My Leaves</h3>
//           {!showForm && (
//             <button
//               onClick={() => openForm()}
//               style={isMobile ? styles.mobileApplyButton : styles.smallApplyButton}
//             >
//               Apply Leave
//             </button>
//           )}
//         </div>

//         {loading ? (
//           <p style={styles.loadingText}>Loading...</p>
//         ) : (
//           isMobile ? renderMobileLeaves() : renderDesktopLeaves()
//         )}

//         {message && (
//           <p style={{
//             ...styles.message,
//             color: message.includes("❌") ? "#dc2626" : "#16a34a"
//           }}>
//             {message}
//           </p>
//         )}

//         {showForm && (
//           <div style={styles.formContainer}>
//             <h4 style={styles.formTitle}>{editingLeave ? "Edit Leave" : "Apply Leave"}</h4>

//             <select
//               value={formData.leaveType}
//               onChange={e => setFormData({ ...formData, leaveType: e.target.value })}
//               style={styles.input}
//             >
//               <option value="">Select Type</option>
//               <option value="SICK">Sick</option>
//               <option value="CASUAL">Casual</option>
//             </select>

//             <div style={styles.dateInputs}>
//               <input
//                 type="date"
//                 value={formData.startDate}
//                 onChange={e => setFormData({ ...formData, startDate: e.target.value })}
//                 style={styles.dateInput}
//               />
//               <input
//                 type="date"
//                 value={formData.endDate}
//                 onChange={e => setFormData({ ...formData, endDate: e.target.value })}
//                 style={styles.dateInput}
//               />
//             </div>

//             <input
//               type="text"
//               placeholder="Reason"
//               value={formData.reason}
//               onChange={e => setFormData({ ...formData, reason: e.target.value })}
//               style={styles.input}
//             />

//             <div style={styles.formActions}>
//               <button
//                 onClick={handleApplyLeave}
//                 style={styles.submitButton}
//               >
//                 {editingLeave ? "Update" : "Submit"}
//               </button>
//               <button
//                 onClick={() => {
//                   setShowForm(false);
//                   setEditingLeave(null);
//                   setMessage("");
//                   setShowContactHR(false);
//                 }}
//                 style={styles.cancelButton}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}

//         {showContactHR && (
//           <div style={styles.contactHRSection}>
//             <p style={styles.contactHRText}>Leave exceeds maximum allowed days. Please contact HR.</p>
//             <a
//               href={`mailto:${HR_EMAIL}?subject=Leave%20Request%20Assistance&body=Hi%20HR,%20I%20need%20assistance%20with%20my%20leave%20request.`}
//               style={styles.contactHRLink}
//             >
//               <button style={styles.contactHRButton}>
//                 Contact HR
//               </button>
//             </a>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   fullScreenContainer: {
//     minHeight: "100vh",
//     width: "100%",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "flex-start",
//     backgroundColor: "#f0f2f5",
//     padding: "16px 12px",
//     boxSizing: "border-box",
//   },
//   contentWrapper: {
//     width: "100%",
//     maxWidth: 1200,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: "20px 16px",
//     boxSizing: "border-box",
//     flex: 1,
//   },
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "16px",
//     flexDirection: "column",
//     gap: "16px",
//     "@media (min-width: 768px)": {
//       flexDirection: "row",
//     }
//   },
//   title: {
//     fontSize: "1.5rem",
//     margin: 0,
//     textAlign: "center",
//     "@media (min-width: 768px)": {
//       textAlign: "left",
//     }
//   },
//   // Small Apply Button for Web
//   smallApplyButton: {
//     padding: "8px 16px",
//     borderRadius: 6,
//     background: "#1d4ed8",
//     color: "white",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "14px",
//     fontWeight: "500",
//     whiteSpace: "nowrap",
//     transition: "background-color 0.2s",
//     ":hover": {
//       backgroundColor: "#1e40af",
//     }
//   },
//   // Mobile Apply Button - Now in header
//   mobileApplyButton: {
//     padding: "12px 20px",
//     borderRadius: 6,
//     background: "#1d4ed8",
//     color: "white",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "16px",
//     fontWeight: "500",
//     width: "100%",
//     maxWidth: "200px",
//     boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//   },
//   // Table Styles
//   tableWrapper: {
//     overflowX: "auto",
//     marginTop: 10,
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     fontSize: "14px",
//   },
//   // Mobile Styles
//   mobileLeavesContainer: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "12px",
//     marginTop: "16px",
//   },
//   mobileCard: {
//     border: "1px solid #e5e7eb",
//     borderRadius: "8px",
//     padding: "16px",
//     backgroundColor: "#fafafa",
//     boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//   },
//   mobileCardHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "12px",
//   },
//   leaveType: {
//     fontWeight: "bold",
//     fontSize: "16px",
//     color: "#1f2937",
//   },
//   statusBadge: {
//     fontSize: "12px",
//     fontWeight: "600",
//     padding: "4px 8px",
//     borderRadius: "12px",
//     border: "1px solid",
//     backgroundColor: "transparent",
//   },
//   mobileCardBody: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "8px",
//   },
//   dateRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     fontSize: "14px",
//   },
//   dateLabel: {
//     fontWeight: "600",
//     color: "#4b5563",
//     minWidth: "60px",
//   },
//   reasonRow: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "4px",
//     fontSize: "14px",
//   },
//   reasonText: {
//     color: "#6b7280",
//     wordBreak: "break-word",
//   },
//   mobileCardActions: {
//     display: "flex",
//     gap: "8px",
//     marginTop: "12px",
//   },
//   mobileEditButton: {
//     flex: 1,
//     padding: "8px 12px",
//     borderRadius: "6px",
//     background: "#16a34a",
//     color: "white",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "14px",
//   },
//   mobileDeleteButton: {
//     flex: 1,
//     padding: "8px 12px",
//     borderRadius: "6px",
//     background: "#dc2626",
//     color: "white",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "14px",
//   },
//   noDataMobile: {
//     textAlign: "center",
//     padding: "32px 16px",
//     color: "#6b7280",
//     fontSize: "16px",
//   },
//   // Button Styles
//   editButton: {
//     padding: "6px 12px",
//     borderRadius: 4,
//     background: "#16a34a",
//     color: "white",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "14px",
//   },
//   deleteButton: {
//     padding: "6px 12px",
//     borderRadius: 4,
//     background: "#dc2626",
//     color: "white",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "14px",
//   },
//   // Form Styles
//   formContainer: {
//     marginTop: 20,
//     padding: 20,
//     border: "1px solid #ccc",
//     borderRadius: 8,
//     display: "flex",
//     flexDirection: "column",
//     gap: 12,
//   },
//   formTitle: {
//     marginBottom: "8px",
//     fontSize: "18px",
//   },
//   input: {
//     padding: "12px",
//     borderRadius: 6,
//     border: "1px solid #ccc",
//     width: "100%",
//     boxSizing: "border-box",
//     fontSize: "16px",
//   },
//   dateInputs: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "10px",
//     "@media (min-width: 480px)": {
//       flexDirection: "row",
//     }
//   },
//   dateInput: {
//     flex: 1,
//     padding: "12px",
//     borderRadius: 6,
//     border: "1px solid #ccc",
//     boxSizing: "border-box",
//     fontSize: "16px",
//   },
//   formActions: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "10px",
//     marginTop: 10,
//     "@media (min-width: 480px)": {
//       flexDirection: "row",
//     }
//   },
//   submitButton: {
//     padding: "12px 20px",
//     borderRadius: 6,
//     background: "#16a34a",
//     color: "white",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "16px",
//     flex: 1,
//   },
//   cancelButton: {
//     padding: "12px 20px",
//     borderRadius: 6,
//     background: "#9ca3af",
//     color: "white",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "16px",
//     flex: 1,
//   },
//   // Message and Contact HR
//   message: {
//     marginTop: 10,
//     padding: "12px",
//     borderRadius: "6px",
//     textAlign: "center",
//     fontSize: "14px",
//   },
//   loadingText: {
//     textAlign: "center",
//     padding: "20px",
//     fontSize: "16px",
//   },
//   contactHRSection: {
//     marginTop: 20,
//     textAlign: "center",
//     padding: "16px",
//     border: "1px solid #e5e7eb",
//     borderRadius: "8px",
//     backgroundColor: "#f3f4f6",
//   },
//   contactHRText: {
//     marginBottom: "12px",
//     fontSize: "14px",
//     color: "#374151",
//   },
//   contactHRLink: {
//     textDecoration: "none",
//     display: "inline-block",
//   },
//   contactHRButton: {
//     padding: "12px 24px",
//     borderRadius: 6,
//     background: "#1d4ed8",
//     color: "white",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "16px",
//     width: "100%",
//     "@media (min-width: 480px)": {
//       width: "auto",
//     }
//   },
// };

// export default EmployeeLeave;

import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";

const MAX_LEAVE_DAYS = 3;
const HR_EMAIL = "hr@venturebiz.in";

const EmployeeLeave = ({ user }) => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingLeave, setEditingLeave] = useState(null);
  const [formData, setFormData] = useState({ leaveType: "", startDate: "", endDate: "", reason: "" });
  const [showContactHR, setShowContactHR] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const token = localStorage.getItem("token");
  const axiosConfig = useMemo(() => ({ headers: { Authorization: `Bearer ${token}` } }), [token]);

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  // Min: today, Max: 6 months ahead
  const getMinDate = () => today;
  const getMaxDate = () => {
    const max = new Date();
    max.setMonth(max.getMonth() + 6);
    return max.toISOString().split("T")[0];
  };

  // Toast
  const showToast = useCallback((msg, isError = false) => {
    const toast = document.createElement("div");
    toast.textContent = msg;
    toast.style.cssText = `
      position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
      background: ${isError ? '#dc2626' : '#16a34a'}; color: white;
      padding: 12px 24px; border-radius: 8px; z-index: 1000;
      animation: fadeInOut 3s forwards; font-size: 0.9rem; font-weight: 500;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }, []);

  // Fetch + sort by startDate descending
  const fetchLeaves = useCallback(async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:8080/api/leave/my?email=${user.email}`, axiosConfig);
      const sorted = res.data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      setLeaves(sorted);
    } catch (err) {
      showToast("Failed to load leaves", true);
    } finally {
      setLoading(false);
    }
  }, [user?.email, axiosConfig, showToast]);

  useEffect(() => { fetchLeaves(); }, [fetchLeaves]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Pull-to-refresh
  useEffect(() => {
    if (!isMobile) return;
    let startY;
    const onStart = (e) => { startY = e.touches[0].clientY; };
    const onEnd = (e) => {
      if (!startY || window.scrollY > 10) return;
      const endY = e.changedTouches[0].clientY;
      if (endY - startY > 120) fetchLeaves();
    };
    document.addEventListener("touchstart", onStart);
    document.addEventListener("touchend", onEnd);
    return () => {
      document.removeEventListener("touchstart", onStart);
      document.removeEventListener("touchend", onEnd);
    };
  }, [isMobile, fetchLeaves]);

  const openForm = (leave = null) => {
    if (leave) {
      setEditingLeave(leave);
      setFormData({
        leaveType: leave.leaveType,
        startDate: leave.startDate,
        endDate: leave.endDate,
        reason: leave.reason || "",
      });
    } else {
      setEditingLeave(null);
      setFormData({ leaveType: "", startDate: "", endDate: "", reason: "" });
    }
    setShowForm(true);
    setShowContactHR(false);
  };

  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const diff = (new Date(end) - new Date(start)) / 86400000 + 1;
    return diff > 0 ? Math.ceil(diff) : 0;
  };

  const handleApplyLeave = async () => {
    const days = calculateDays(formData.startDate, formData.endDate);

    if (!formData.leaveType) return showToast("Select leave type", true);
    if (!formData.startDate || !formData.endDate) return showToast("Select both dates", true);
    if (days <= 0) return showToast("End date must be after start", true);
    if (days > MAX_LEAVE_DAYS) {
      setShowContactHR(true);
      return showToast(`Max ${MAX_LEAVE_DAYS} days allowed`, true);
    }

    try {
      if (editingLeave) {
        await axios.put(
          `http://localhost:8080/api/leave/${editingLeave.id}/edit?email=${user.email}`,
          formData,
          axiosConfig
        );
        showToast("Leave updated");
      } else {
        await axios.post(
          `http://localhost:8080/api/leave/apply?email=${user.email}`,
          formData,
          axiosConfig
        );
        showToast("Leave applied");
      }
      setShowForm(false);
      setEditingLeave(null);
      setFormData({ leaveType: "", startDate: "", endDate: "", reason: "" });
      setShowContactHR(false);
      fetchLeaves();
    } catch (err) {
      const msg = err.response?.data || err.message;
      if (msg.includes("sick leave")) showToast("Only one sick leave per month!", true);
      else if (msg.includes("past")) showToast("Cannot select past dates", true);
      else showToast(msg, true);
    }
  };

  const handleDeleteLeave = async (leaveId) => {
    if (!window.confirm("Delete this leave?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/leave/${leaveId}/delete?email=${user.email}`, axiosConfig);
      showToast("Leave deleted");
      fetchLeaves();
    } catch (err) {
      showToast(err.response?.data || "Delete failed", true);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED": return "#16a34a";
      case "REJECTED": return "#dc2626";
      case "PENDING": return "#d97706";
      default: return "#6b7280";
    }
  };

  const formatDate = (date) => new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

  const isToday = (date) => date === today;

  // Mobile Cards
  const renderMobile = () => (
    <div style={styles.mobileContainer}>
      {loading ? (
        <div style={styles.skeletonContainer}>
          {[1, 2].map(i => (
            <div key={i} style={styles.skeletonCard}>
              <div style={styles.skeletonLine}></div>
              <div style={{ ...styles.skeletonLine, width: "70%" }}></div>
            </div>
          ))}
        </div>
      ) : leaves.length === 0 ? (
        <p style={styles.noData}>No leave records.</p>
      ) : (
        leaves.map(l => (
          <div
            key={l.id}
            style={{
              ...styles.mobileCard,
              borderLeft: `4px solid ${getStatusColor(l.leaveStatus)}`,
              backgroundColor: isToday(l.startDate) ? "#f0fdf4" : "#fafafa",
            }}
          >
            <div style={styles.mobileHeader}>
              <span style={styles.leaveType}>{l.leaveType}</span>
              <span style={{
                ...styles.statusBadge,
                color: getStatusColor(l.leaveStatus),
                backgroundColor: `${getStatusColor(l.leaveStatus)}20`,
              }}>
                {l.leaveStatus}
              </span>
            </div>
            <div style={styles.mobileBody}>
              <div style={styles.row}><span>Dates:</span> <span>{formatDate(l.startDate)} – {formatDate(l.endDate)}</span></div>
              <div style={styles.row}><span>Days:</span> <span>{l.days}</span></div>
              {l.reason && <div style={styles.row}><span>Reason:</span> <span>{l.reason}</span></div>}
            </div>
            {l.leaveStatus === "PENDING" && (
              <div style={styles.mobileActions}>
                <button onClick={() => openForm(l)} style={styles.mobileEditBtn}>Edit</button>
                <button onClick={() => handleDeleteLeave(l.id)} style={styles.mobileDeleteBtn}>Delete</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );

  // Desktop Table
  const renderDesktop = () => (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Type</th>
            <th>Start</th>
            <th>End</th>
            <th>Days</th>
            <th>Status</th>
            <th>Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="7" style={styles.loadingTd}>Loading...</td></tr>
          ) : leaves.length === 0 ? (
            <tr><td colSpan="7" style={styles.noDataTd}>No leave records.</td></tr>
          ) : (
            leaves.map(l => (
              <tr key={l.id} style={{ backgroundColor: isToday(l.startDate) ? "#f0fdf4" : "transparent" }}>
                <td>{l.leaveType}</td>
                <td>{formatDate(l.startDate)}</td>
                <td>{formatDate(l.endDate)}</td>
                <td>{l.days}</td>
                <td style={{ color: getStatusColor(l.leaveStatus), fontWeight: "bold" }}>{l.leaveStatus}</td>
                <td>{l.reason || "-"}</td>
                <td style={styles.actionsTd}>
                  {l.leaveStatus === "PENDING" && (
                    <>
                      <button onClick={() => openForm(l)} style={styles.editBtn}>Edit</button>
                      <button onClick={() => handleDeleteLeave(l.id)} style={styles.deleteBtn}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.header}>
          <h3 style={styles.title}>My Leaves</h3>
          <button onClick={() => openForm()} style={isMobile ? styles.mobileApplyBtn : styles.applyBtn}>
            Apply Leave
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div style={styles.form}>
            <h4 style={styles.formTitle}>{editingLeave ? "Edit Leave" : "Apply Leave"}</h4>

            <select
              value={formData.leaveType}
              onChange={e => setFormData({ ...formData, leaveType: e.target.value })}
              style={styles.select}
            >
              <option value="">Select Type</option>
              <option value="SICK">Sick (1/month)</option>
              <option value="CASUAL">Casual</option>
            </select>

            <div style={styles.dateGroup}>
              <input
                type="date"
                value={formData.startDate}
                onChange={e => {
                  const val = e.target.value;
                  setFormData({
                    ...formData,
                    startDate: val,
                    endDate: formData.endDate && formData.endDate < val ? "" : formData.endDate,
                  });
                }}
                min={getMinDate()}
                max={getMaxDate()}
                style={styles.dateInput}
                required
              Hacienda/>
              <input
                type="date"
                value={formData.endDate}
                onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                min={formData.startDate || getMinDate()}
                max={getMaxDate()}
                style={styles.dateInput}
                required
              />
            </div>

            {formData.startDate && formData.endDate && (
              <div style={styles.daysPreview}>
                {calculateDays(formData.startDate, formData.endDate)} day{calculateDays(formData.startDate, formData.endDate) > 1 ? "s" : ""}
                {calculateDays(formData.startDate, formData.endDate) > MAX_LEAVE_DAYS && " (Max 3)"}
              </div>
            )}

            <input
              type="text"
              placeholder="Reason (optional)"
              value={formData.reason}
              onChange={e => setFormData({ ...formData, reason: e.target.value })}
              style={styles.input}
            />

            <div style={styles.formActions}>
              <button onClick={handleApplyLeave} style={styles.submitBtn}>
                {editingLeave ? "Update" : "Submit"}
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingLeave(null);
                  setShowContactHR(false);
                }}
                style={styles.cancelBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Contact HR */}
        {showContactHR && (
          <div style={styles.contactHR}>
            <p>Leave exceeds {MAX_LEAVE_DAYS} days. Contact HR for approval.</p>
            <a href={`mailto:${HR_EMAIL}?subject=Leave%20Request`} style={styles.hrLink}>
              <button style={styles.hrBtn}>Contact HR</button>
            </a>
          </div>
        )}

        {/* Leaves List */}
        {isMobile ? renderMobile() : renderDesktop()}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: { minHeight: "100vh", background: "#f3f4f6", padding: "16px", fontFamily: "'Inter', sans-serif" },
  wrapper: { maxWidth: 1200, margin: "0 auto", background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 },
  title: { margin: 0, fontSize: "1.5rem", color: "#1f2937" },
  applyBtn: { padding: "8px 16px", background: "#1d4ed8", color: "#fff", border: "none", borderRadius: 6, fontWeight: 500, cursor: "pointer" },
  mobileApplyBtn: { padding: "12px", background: "#1d4ed8", color: "#fff", border: "none", borderRadius: 6, fontSize: "1rem", width: "100%", maxWidth: 300 },
  form: { border: "1px solid #e5e7eb", borderRadius: 8, padding: 16, marginBottom: 20, background: "#f9fafb" },
  formTitle: { margin: "0 0 12px", fontSize: "1.1rem" },
  select: { width: "100%", padding: 12, borderRadius: 6, border: "1px solid #d1d5db", marginBottom: 12, fontSize: "1rem" },
  dateGroup: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 12 },
  dateInput: { padding: 12, borderRadius: 6, border: "1px solid #d1d5db", fontSize: "1rem" },
  daysPreview: { fontSize: "0.875rem", color: "#6b7280", marginBottom: 12, fontWeight: 500 },
  input: { width: "100%", padding: 12, borderRadius: 6, border: "1px solid #d1d5db", marginBottom: 12, fontSize: "1rem" },
  formActions: { display: "flex", gap: 10 },
  submitBtn: { flex: 1, padding: 12, background: "#16a34a", color: "#fff", border: "none", borderRadius: 6, fontWeight: 600, cursor: "pointer" },
  cancelBtn: { flex: 1, padding: 12, background: "#9ca3af", color: "#fff", border: "none", borderRadius: 6, fontWeight: 600, cursor: "pointer" },
  contactHR: { textAlign: "center", padding: 16, background: "#fef3c7", borderRadius: 8, marginBottom: 20 },
  hrLink: { textDecoration: "none" },
  hrBtn: { padding: "10px 20px", background: "#1d4ed8", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" },
  tableWrapper: { overflowX: "auto", borderRadius: 8, marginTop: 10 },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" },
  loadingTd: { textAlign: "center", padding: 20, color: "#6b7280" },
  noDataTd: { textAlign: "center", padding: 20, color: "#6b7280" },
  actionsTd: { whiteSpace: "nowrap" },
  editBtn: { padding: "6px 12px", background: "#16a34a", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer", marginRight: 6 },
  deleteBtn: { padding: "6px 12px", background: "#dc2626", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" },
  mobileContainer: { display: "flex", flexDirection: "column", gap: 12, marginTop: 16 },
  mobileCard: { borderRadius: 8, padding: 16, background: "#fafafa", border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
  mobileHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  leaveType: { fontWeight: 600, fontSize: "1rem", color: "#1f2937" },
  statusBadge: { fontSize: "0.75rem", padding: "4px 8px", borderRadius: 12, fontWeight: 600 },
  mobileBody: { display: "flex", flexDirection: "column", gap: 8, fontSize: "0.9rem" },
  row: { display: "flex", justifyContent: "space-between" },
  mobileActions: { display: "flex", gap: 8, marginTop: 12 },
  mobileEditBtn: { flex: 1, padding: 10, background: "#16a34a", color: "#fff", border: "none", borderRadius: 6, fontSize: "0.9rem" },
  mobileDeleteBtn: { flex: 1, padding: 10, background: "#dc2626", color: "#fff", border: "none", borderRadius: 6, fontSize: "0.9rem" },
  noData: { textAlign: "center", padding: 32, color: "#6b7280", fontSize: "1rem" },
  skeletonContainer: { display: "flex", flexDirection: "column", gap: 12 },
  skeletonCard: { padding: 16, background: "#f3f4f6", borderRadius: 8, border: "1px dashed #d1d5db" },
  skeletonLine: { height: 16, background: "#e5e7eb", borderRadius: 4, marginBottom: 8 },
};

// Inject animation
const styleSheet = document.createElement("style");
styleSheet.innerText = `@keyframes fadeInOut { 0%,100% {opacity:0} 20%,80% {opacity:1} }`;
document.head.appendChild(styleSheet);

export default EmployeeLeave;