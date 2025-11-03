// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const HRLeaveManagement = () => {
//   const [leaves, setLeaves] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [updatingId, setUpdatingId] = useState(null);
//   const [selectedReason, setSelectedReason] = useState(""); 
//   const [showReason, setShowReason] = useState(false);

//   const token = localStorage.getItem("token");
//   const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };
//   const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

//   const fetchLeaves = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await axios.get(`${API_URL}/api/leave/all`, axiosConfig);
//       setLeaves(res.data);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch leave requests.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchLeaves(); }, []);

//   const handleStatusUpdate = async (id, status) => {
//     setUpdatingId(id);
//     try {
//       await axios.put(`${API_URL}/api/leave/${id}/status?leaveStatus=${status}`, {}, axiosConfig);
//       toast.success(`Leave ${status.toLowerCase()} successfully`);
//       fetchLeaves();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to update leave status.");
//     } finally {
//       setUpdatingId(null);
//     }
//   };

//   const openReason = (reason) => {
//     setSelectedReason(reason);
//     setShowReason(true);
//   };
//   const closeReason = () => {
//     setSelectedReason("");
//     setShowReason(false);
//   };
//   const handleOverlayClick = (e) => { if (e.target.id === "reasonOverlay") closeReason(); };

//   if (loading) return <p style={styles.message}>Loading leave requests...</p>;
//   if (error) return <p style={{ ...styles.message, color: "red" }}>{error}</p>;

//   return (
//     <div style={styles.container}>
//       <ToastContainer position="top-right" />
//       <table style={styles.table}>
//         <thead>
//           <tr style={styles.tableHeaderRow}>
//             <th style={styles.th}>Employee</th>
//             <th style={styles.th}>Type</th>
//             <th style={styles.th}>Start Date</th>
//             <th style={styles.th}>End Date</th>
//             <th style={styles.th}>Days</th>
//             <th style={styles.th}>Status</th>
//             <th style={styles.th}>Approved By</th>
//             <th style={styles.th}>Approved On</th>
//             <th style={styles.th}>Reason</th>
//             <th style={styles.th}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaves.map((leave) => (
//             <tr key={leave.id} style={styles.tableRow}>
//               <td style={styles.td}>{leave.employee?.email || "-"}</td>
//               <td style={styles.td}>{leave.leaveType}</td>
//               <td style={styles.td}>{new Date(leave.startDate).toLocaleDateString()}</td>
//               <td style={styles.td}>{new Date(leave.endDate).toLocaleDateString()}</td>
//               <td style={styles.td}>{leave.days}</td>
//               <td style={{
//                 ...styles.td, fontWeight: "bold",
//                 color: leave.leaveStatus === "APPROVED" ? "green" :
//                        leave.leaveStatus === "REJECTED" ? "red" : "blue"
//               }}>{leave.leaveStatus}</td>
//               <td style={styles.td}>{leave.approvedByHr || "-"}</td>
//               <td style={styles.td}>{leave.approvedOn ? new Date(leave.approvedOn).toLocaleDateString() : "-"}</td>
//               <td style={styles.td}>
//                 {leave.reason ? (
//                   <button
//                     style={{ ...styles.button, ...styles.viewButton }}
//                     onClick={() => openReason(leave.reason)}
//                   >View</button>
//                 ) : "-"}
//               </td>
//               <td style={styles.td}>
//                 <button
//                   onClick={() => handleStatusUpdate(leave.id, "APPROVED")}
//                   disabled={updatingId === leave.id}
//                   style={{
//                     ...styles.button,
//                     ...styles.approveButton,
//                     cursor: updatingId === leave.id ? "not-allowed" : "pointer",
//                     marginBottom: "4px"
//                   }}
//                 >{updatingId === leave.id ? "Updating..." : "Approve"}</button>
//                 <button
//                   onClick={() => handleStatusUpdate(leave.id, "REJECTED")}
//                   disabled={updatingId === leave.id}
//                   style={{
//                     ...styles.button,
//                     ...styles.rejectButton,
//                     cursor: updatingId === leave.id ? "not-allowed" : "pointer"
//                   }}
//                 >{updatingId === leave.id ? "Updating..." : "Reject"}</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {showReason && (
//         <div id="reasonOverlay" style={styles.reasonOverlay} onClick={handleOverlayClick}>
//           <div style={styles.reasonBox}>
//             <h4>Leave Reason</h4>
//             <p style={styles.reasonText}>{selectedReason}</p>
//             <button onClick={closeReason} style={{ ...styles.button, backgroundColor: "#007bff", marginTop: "10px" }}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: { padding: "20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f9f9f9", minHeight: "100vh" },
//   table: { width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", boxShadow: "0 0 10px rgba(0,0,0,0.1)" },
//   tableHeaderRow: { backgroundColor: "#007bff", color: "#fff" },
//   th: { padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" },
//   tableRow: { borderBottom: "1px solid #ddd", transition: "background-color 0.2s" },
//   td: { padding: "10px", textAlign: "left" },
//   button: { padding: "5px 10px", marginRight: "5px", border: "none", borderRadius: "4px", color: "#fff" },
//   approveButton: { backgroundColor: "green" },
//   rejectButton: { backgroundColor: "red" },
//   viewButton: { backgroundColor: "#007bff" },
//   message: { padding: "20px", fontSize: "16px" },
//   reasonOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.3)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
//   reasonBox: { backgroundColor: "#fff", padding: "15px", borderRadius: "6px", width: "300px", textAlign: "center", boxShadow: "0 0 8px rgba(0,0,0,0.2)" },
//   reasonText: { wordWrap: "break-word", fontSize: "14px" },
// };

// export default HRLeaveManagement;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HRLeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedReason, setSelectedReason] = useState(""); 
  const [showReason, setShowReason] = useState(false);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const fetchLeaves = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_URL}/api/leave/all`, axiosConfig);
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch leave requests.");
      toast.error("Failed to fetch leave requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchLeaves(); 
  }, []);

  const handleStatusUpdate = async (id, status) => {
    setUpdatingId(id);
    try {
      await axios.put(
        `${API_URL}/api/leave/${id}/status?leaveStatus=${status}`, 
        {}, 
        axiosConfig
      );
      toast.success(`Leave ${status.toLowerCase()} successfully`);
      fetchLeaves();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update leave status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const openReason = (reason) => {
    setSelectedReason(reason);
    setShowReason(true);
  };

  const closeReason = () => {
    setSelectedReason("");
    setShowReason(false);
  };

  const handleOverlayClick = (e) => { 
    if (e.target.id === "reasonOverlay") closeReason(); 
  };

  // Filter leaves based on status and search term
  const filteredLeaves = leaves.filter(leave => {
    const matchesStatus = filterStatus === "ALL" || leave.leaveStatus === filterStatus;
    const matchesSearch = leave.employee?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         leave.leaveType?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && (searchTerm === "" || matchesSearch);
  });

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "APPROVED":
        return styles.approvedBadge;
      case "REJECTED":
        return styles.rejectedBadge;
      case "PENDING":
        return styles.pendingBadge;
      default:
        return styles.defaultBadge;
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading leave requests...</p>
      </div>
    );
  }

  if (error && leaves.length === 0) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorIcon}>⚠️</div>
        <p style={styles.errorText}>{error}</p>
        <button onClick={fetchLeaves} style={styles.retryButton}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Header Section */}
      <div style={styles.header}>
        <h1 style={styles.title}>Leave Management</h1>
        <p style={styles.subtitle}>Manage employee leave requests</p>
      </div>

      {/* Filters and Search Section */}
      <div style={styles.controls}>
        <div style={styles.searchBox}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search by employee or leave type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Filter by Status:</label>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        <button onClick={fetchLeaves} style={styles.refreshButton}>
          ↻ Refresh
        </button>
      </div>

      {/* Table Section */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.th}>Employee</th>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>Start Date</th>
              <th style={styles.th}>End Date</th>
              <th style={styles.th}>Days</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Approved By</th>
              <th style={styles.th}>Approved On</th>
              <th style={styles.th}>Reason</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.length === 0 ? (
              <tr>
                <td colSpan="10" style={styles.noData}>
                  {leaves.length === 0 ? "No leave requests found" : "No matching records found"}
                </td>
              </tr>
            ) : (
              filteredLeaves.map((leave) => (
                <tr key={leave.id} style={styles.tableRow}>
                  <td style={styles.td}>
                    <div style={styles.employeeCell}>
                      <div style={styles.avatar}>
                        {leave.employee?.email?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <span style={styles.email}>{leave.employee?.email || "-"}</span>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.leaveType}>{leave.leaveType}</span>
                  </td>
                  <td style={styles.td}>
                    {new Date(leave.startDate).toLocaleDateString()}
                  </td>
                  <td style={styles.td}>
                    {new Date(leave.endDate).toLocaleDateString()}
                  </td>
                  <td style={styles.td}>
                    <span style={styles.daysBadge}>{leave.days}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={getStatusBadgeStyle(leave.leaveStatus)}>
                      {leave.leaveStatus}
                    </span>
                  </td>
                  <td style={styles.td}>{leave.approvedByHr || "-"}</td>
                  <td style={styles.td}>
                    {leave.approvedOn ? new Date(leave.approvedOn).toLocaleDateString() : "-"}
                  </td>
                  <td style={styles.td}>
                    {leave.reason ? (
                      <button
                        style={styles.viewReasonButton}
                        onClick={() => openReason(leave.reason)}
                      >
                        View Reason
                      </button>
                    ) : (
                      <span style={styles.noReason}>-</span>
                    )}
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actionButtons}>
                      <button
                        onClick={() => handleStatusUpdate(leave.id, "APPROVED")}
                        disabled={updatingId === leave.id || leave.leaveStatus === "APPROVED"}
                        style={{
                          ...styles.button,
                          ...styles.approveButton,
                          ...(updatingId === leave.id && styles.disabledButton),
                          ...(leave.leaveStatus === "APPROVED" && styles.disabledButton)
                        }}
                      >
                        {updatingId === leave.id ? "..." : "Approve"}
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(leave.id, "REJECTED")}
                        disabled={updatingId === leave.id || leave.leaveStatus === "REJECTED"}
                        style={{
                          ...styles.button,
                          ...styles.rejectButton,
                          ...(updatingId === leave.id && styles.disabledButton),
                          ...(leave.leaveStatus === "REJECTED" && styles.disabledButton)
                        }}
                      >
                        {updatingId === leave.id ? "..." : "Reject"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Reason Modal */}
      {showReason && (
        <div 
          id="reasonOverlay" 
          style={styles.reasonOverlay} 
          onClick={handleOverlayClick}
        >
          <div style={styles.reasonModal}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Leave Reason</h3>
              <button onClick={closeReason} style={styles.closeButton}>
                ×
              </button>
            </div>
            <div style={styles.modalBody}>
              <p style={styles.reasonText}>{selectedReason}</p>
            </div>
            <div style={styles.modalFooter}>
              <button onClick={closeReason} style={styles.closeModalButton}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { 
    padding: "24px", 
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
    backgroundColor: "#f8fafc", 
    minHeight: "100vh",
    maxWidth: "100%",
    overflowX: "auto"
  },
  
  // Header Styles
  header: {
    marginBottom: "24px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 4px 0",
  },
  subtitle: {
    fontSize: "14px",
    color: "#64748b",
    margin: "0",
  },

  // Controls Styles
  controls: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    marginBottom: "24px",
    flexWrap: "wrap",
  },
  searchBox: {
    position: "relative",
    flex: "1",
    minWidth: "250px",
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#64748b",
  },
  searchInput: {
    width: "100%",
    padding: "10px 10px 10px 36px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.2s",
    backgroundColor: "white",
    ":focus": {
      borderColor: "#3b82f6",
      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
    }
  },
  filterGroup: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  filterLabel: {
    fontSize: "14px",
    color: "#374151",
    fontWeight: "500",
  },
  filterSelect: {
    padding: "8px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
    backgroundColor: "white",
  },
  refreshButton: {
    padding: "8px 16px",
    backgroundColor: "#f1f5f9",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    color: "#475569",
    transition: "all 0.2s",
    ":hover": {
      backgroundColor: "#e2e8f0",
    }
  },

  // Table Container
  tableContainer: {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    overflow: "hidden",
    border: "1px solid #e2e8f0",
  },

  // Table Styles
  table: { 
    width: "100%", 
    borderCollapse: "collapse",
    fontSize: "14px",
  },
  tableHeaderRow: { 
    backgroundColor: "#f8fafc",
    borderBottom: "1px solid #e2e8f0",
  },
  th: { 
    padding: "16px 12px", 
    textAlign: "left", 
    fontWeight: "600",
    color: "#374151",
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  tableRow: { 
    borderBottom: "1px solid #f1f5f9",
    transition: "background-color 0.15s",
    ":hover": {
      backgroundColor: "#f8fafc",
    }
  },
  td: { 
    padding: "16px 12px", 
    textAlign: "left",
    color: "#374151",
  },

  // Cell Styles
  employeeCell: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  avatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "#3b82f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "600",
    fontSize: "12px",
  },
  email: {
    fontWeight: "500",
  },
  leaveType: {
    fontWeight: "500",
    color: "#1e293b",
  },
  daysBadge: {
    backgroundColor: "#f1f5f9",
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#475569",
  },

  // Status Badges
  approvedBadge: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
    display: "inline-block",
  },
  rejectedBadge: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
    display: "inline-block",
  },
  pendingBadge: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
    display: "inline-block",
  },
  defaultBadge: {
    backgroundColor: "#f3f4f6",
    color: "#374151",
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
    display: "inline-block",
  },

  // Button Styles
  button: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
    minWidth: "70px",
  },
  approveButton: { 
    backgroundColor: "#10b981",
    ":hover": {
      backgroundColor: "#059669",
    }
  },
  rejectButton: { 
    backgroundColor: "#ef4444",
    ":hover": {
      backgroundColor: "#dc2626",
    }
  },
  disabledButton: {
    backgroundColor: "#9ca3af",
    cursor: "not-allowed",
    opacity: 0.6,
    ":hover": {
      backgroundColor: "#9ca3af",
    }
  },

  // Action Buttons Container
  actionButtons: {
    display: "flex",
    gap: "6px",
  },

  // View Reason Button
  viewReasonButton: {
    padding: "6px 12px",
    backgroundColor: "transparent",
    border: "1px solid #3b82f6",
    borderRadius: "6px",
    color: "#3b82f6",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
    ":hover": {
      backgroundColor: "#3b82f6",
      color: "white",
    }
  },
  noReason: {
    color: "#9ca3af",
    fontStyle: "italic",
  },

  // No Data Style
  noData: {
    textAlign: "center",
    padding: "40px",
    color: "#64748b",
    fontSize: "14px",
  },

  // Loading Styles
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
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
  loadingText: {
    fontSize: "16px",
    color: "#64748b",
    margin: "0",
  },

  // Error Styles
  errorContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
    textAlign: "center",
  },
  errorIcon: {
    fontSize: "48px",
    marginBottom: "16px",
  },
  errorText: {
    fontSize: "16px",
    color: "#ef4444",
    margin: "0 0 20px 0",
  },
  retryButton: {
    padding: "10px 20px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
    ":hover": {
      backgroundColor: "#2563eb",
    }
  },

  // Reason Modal Styles
  reasonOverlay: { 
    position: "fixed", 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    backgroundColor: "rgba(0,0,0,0.5)", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    zIndex: 1000,
    backdropFilter: "blur(2px)",
  },
  reasonModal: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "500px",
    maxHeight: "80vh",
    overflow: "hidden",
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px 0",
  },
  modalTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1e293b",
    margin: "0",
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
    ":hover": {
      backgroundColor: "#f1f5f9",
    }
  },
  modalBody: {
    padding: "20px 24px",
    maxHeight: "300px",
    overflowY: "auto",
  },
  reasonText: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#374151",
    margin: "0",
    whiteSpace: "pre-wrap",
  },
  modalFooter: {
    padding: "0 24px 20px",
    display: "flex",
    justifyContent: "flex-end",
  },
  closeModalButton: {
    padding: "8px 16px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    ":hover": {
      backgroundColor: "#2563eb",
    }
  },
};

// Add CSS for spinner animation
const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(spinnerStyle);

export default HRLeaveManagement;
