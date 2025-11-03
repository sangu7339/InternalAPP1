// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AnnouncementManagement = ({ user }) => {
//   const [announcements, setAnnouncements] = useState([]);
//   const [newAnnouncement, setNewAnnouncement] = useState({ title: "", message: "" });
//   const [loading, setLoading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const token = localStorage.getItem("token");
//   const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };
//   const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

//   const fetchAnnouncements = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/announcements/all`, axiosConfig);
//       setAnnouncements(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
//     } catch (err) {
//       toast.error("Error fetching announcements!");
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchAnnouncements();
//   }, []);

//   const handleCreate = async (e) => {
//     e.preventDefault();

//     const hrEmail = user?.email || user?.hrEmail || user?.emailAddress;
//     if (!hrEmail) {
//       toast.warning("⚠️ HR email not found. Cannot create announcement.");
//       return;
//     }

//     if (!newAnnouncement.title || !newAnnouncement.message) {
//       toast.warning("⚠️ Please fill in all fields");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await axios.post(
//         `${API_URL}/api/announcements/create?hrEmail=${encodeURIComponent(hrEmail)}`,
//         { title: newAnnouncement.title, message: newAnnouncement.message },
//         axiosConfig
//       );
//       toast.success("✅ Announcement created successfully!");
//       setNewAnnouncement({ title: "", message: "" });
//       setIsModalOpen(false);
//       fetchAnnouncements();
//     } catch (err) {
//       toast.error(`❌ Failed to create announcement: ${err.response?.data?.message || err.message}`);
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this announcement?")) return;

//     try {
//       await axios.delete(`${API_URL}/api/announcements/${id}`, axiosConfig);
//       toast.success("✅ Announcement deleted successfully!");
//       fetchAnnouncements();
//     } catch (err) {
//       toast.error("❌ Failed to delete announcement.");
//       console.error(err);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <ToastContainer position="top-right" autoClose={3000} />
//       {/* <h2 style={styles.heading}>Announcements</h2> */}

//       <div style={{ marginBottom: 20, textAlign: "center" }}>
//         <button style={styles.addBtn} onClick={() => setIsModalOpen(true)}>
//           ➕ Add Announcement
//         </button>
//       </div>

//       <div style={styles.chatList}>
//         {announcements.length > 0 ? (
//           announcements.map((a) => (
//             <div key={a.id} style={styles.chatBubble}>
//               <div>
//                 <strong>{a.title}</strong>
//                 <p style={styles.message}>{a.message}</p>
//                 <small style={styles.date}>{new Date(a.createdAt).toLocaleString()}</small>
//               </div>
//               <button style={styles.deleteBtn} onClick={() => handleDelete(a.id)}>
//                 ❌ Delete
//               </button>
//             </div>
//           ))
//         ) : (
//           <p style={{ textAlign: "center", color: "#888" }}>No announcements yet.</p>
//         )}
//       </div>

//       {isModalOpen && (
//         <div style={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
//           <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
//             <h3 style={{ marginBottom: 15 }}>New Announcement</h3>
//             <form style={{ display: "flex", flexDirection: "column", gap: 15 }} onSubmit={handleCreate}>
//               <input
//                 type="text"
//                 placeholder="Title"
//                 value={newAnnouncement.title}
//                 onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
//                 style={styles.input}
//               />
//               <textarea
//                 placeholder="Message"
//                 value={newAnnouncement.message}
//                 onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
//                 style={styles.textarea}
//               />
//               <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
//                 <button type="button" style={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>
//                   Cancel
//                 </button>
//                 <button type="submit" style={styles.button} disabled={loading}>
//                   {loading ? "Posting..." : "Post"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Styles (delete button with hover)
// const styles = {
//   container: { width: "100vw", minHeight: "100vh", padding: "20px", fontFamily: "'Poppins', sans-serif", background: "#f9f9f9", boxSizing: "border-box" },
//   heading: { fontSize: 28, textAlign: "center", marginBottom: 20 },
//   addBtn: { padding: "10px 20px", borderRadius: 8, border: "none", background: "#16a34a", color: "white", fontWeight: 600, cursor: "pointer" },
//   chatList: { display: "flex", flexDirection: "column", gap: 15, maxWidth: 700, margin: "0 auto" },
//   chatBubble: { background: "#e1f5fe", padding: 15, borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
//   message: { margin: "5px 0", color: "#333" },
//   date: { fontSize: 12, color: "#666" },
//   deleteBtn: {
//     border: "none",
//     backgroundColor: "#ef4444",
//     color: "white",
//     padding: "6px 12px",
//     borderRadius: 8,
//     cursor: "pointer",
//     fontWeight: 600,
//     transition: "all 0.2s ease",
//     boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
//   },
//   modalOverlay: { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 },
//   modalContent: { background: "#fff", borderRadius: 12, padding: 25, width: "90%", maxWidth: 500 },
//   input: { padding: 10, borderRadius: 8, border: "1px solid #ccc", fontSize: 16 },
//   textarea: { padding: 10, borderRadius: 8, border: "1px solid #ccc", fontSize: 16, minHeight: 100, resize: "vertical" },
//   button: { padding: "10px 20px", borderRadius: 8, border: "none", background: "#16a34a", color: "white", cursor: "pointer", fontWeight: 600 },
//   cancelBtn: { padding: "10px 20px", borderRadius: 8, border: "none", background: "#ccc", cursor: "pointer" },
// };

// export default AnnouncementManagement;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AnnouncementManagement = ({ user }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [viewMode, setViewMode] = useState(false);

  const token = localStorage.getItem("token");
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/announcements/all`, axiosConfig);
      setAnnouncements(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (err) {
      toast.error("Error fetching announcements!");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    const hrEmail = user?.email || user?.hrEmail || user?.emailAddress;
    if (!hrEmail) {
      toast.warning("⚠️ HR email not found. Cannot create announcement.");
      return;
    }

    if (!newAnnouncement.title || !newAnnouncement.message) {
      toast.warning("⚠️ Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${API_URL}/api/announcements/create?hrEmail=${encodeURIComponent(hrEmail)}`,
        { title: newAnnouncement.title, message: newAnnouncement.message },
        axiosConfig
      );
      toast.success("✅ Announcement created successfully!");
      setNewAnnouncement({ title: "", message: "" });
      setIsModalOpen(false);
      fetchAnnouncements();
    } catch (err) {
      toast.error(`❌ Failed to create announcement: ${err.response?.data?.message || err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) return;

    try {
      await axios.delete(`${API_URL}/api/announcements/${id}`, axiosConfig);
      toast.success("✅ Announcement deleted successfully!");
      fetchAnnouncements();
    } catch (err) {
      toast.error("❌ Failed to delete announcement.");
      console.error(err);
    }
  };

  const openViewModal = (announcement) => {
    setSelectedAnnouncement(announcement);
    setViewMode(true);
  };

  const closeViewModal = () => {
    setSelectedAnnouncement(null);
    setViewMode(false);
  };

  // Inline Styles
  const styles = {
    container: {
      minHeight: "100vh",
      padding: "24px",
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    header: {
      textAlign: "center",
      marginBottom: "32px",
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
    addButton: {
      background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      padding: "12px 24px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s",
      boxShadow: "0 4px 6px rgba(59, 130, 246, 0.25)",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      margin: "0 auto 32px",
    },
    announcementsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
      gap: "24px",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    announcementCard: {
      background: "white",
      borderRadius: "16px",
      padding: "24px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      border: "1px solid #e2e8f0",
      transition: "all 0.3s ease",
      cursor: "pointer",
      position: "relative",
      overflow: "hidden",
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "16px",
    },
    cardTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#1e293b",
      margin: "0 0 8px 0",
      lineHeight: "1.4",
    },
    cardMessage: {
      color: "#475569",
      lineHeight: "1.6",
      margin: "0 0 16px 0",
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    },
    cardDate: {
      fontSize: "14px",
      color: "#64748b",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    cardActions: {
      display: "flex",
      gap: "8px",
      marginTop: "16px",
    },
    viewButton: {
      background: "#f1f5f9",
      color: "#475569",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      padding: "8px 16px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    deleteButton: {
      background: "#ef4444",
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: "8px 16px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    emptyState: {
      textAlign: "center",
      color: "#64748b",
      padding: "60px 20px",
      background: "white",
      borderRadius: "16px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      maxWidth: "400px",
      margin: "0 auto",
    },
    emptyIcon: {
      fontSize: "48px",
      marginBottom: "16px",
      opacity: "0.5",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      backdropFilter: "blur(4px)",
    },
    modalContent: {
      background: "white",
      borderRadius: "16px",
      padding: "32px",
      maxWidth: "600px",
      width: "90%",
      maxHeight: "90vh",
      overflow: "auto",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    },
    modalHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
    },
    modalTitle: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#1e293b",
      margin: 0,
    },
    closeButton: {
      background: "none",
      border: "none",
      fontSize: "24px",
      cursor: "pointer",
      color: "#64748b",
      padding: "4px",
      borderRadius: "4px",
      transition: "all 0.2s",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    input: {
      padding: "12px 16px",
      borderRadius: "12px",
      border: "1px solid #d1d5db",
      background: "white",
      fontSize: "16px",
      outline: "none",
      transition: "all 0.2s",
    },
    textarea: {
      padding: "12px 16px",
      borderRadius: "12px",
      border: "1px solid #d1d5db",
      background: "white",
      fontSize: "16px",
      outline: "none",
      transition: "all 0.2s",
      minHeight: "120px",
      resize: "vertical",
      fontFamily: "inherit",
    },
    formActions: {
      display: "flex",
      gap: "12px",
      justifyContent: "flex-end",
      marginTop: "24px",
    },
    cancelButton: {
      background: "#f8fafc",
      color: "#475569",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      padding: "12px 24px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    submitButton: {
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      padding: "12px 24px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s",
      boxShadow: "0 4px 6px rgba(16, 185, 129, 0.25)",
    },
    viewModalContent: {
      background: "white",
      borderRadius: "16px",
      padding: "32px",
      maxWidth: "600px",
      width: "90%",
      maxHeight: "90vh",
      overflow: "auto",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    },
    viewTitle: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#1e293b",
      margin: "0 0 16px 0",
    },
    viewMessage: {
      color: "#475569",
      lineHeight: "1.6",
      fontSize: "16px",
      margin: "0 0 24px 0",
      whiteSpace: "pre-wrap",
    },
    viewMeta: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: "#64748b",
      fontSize: "14px",
      paddingTop: "16px",
      borderTop: "1px solid #e2e8f0",
    },
    loadingSpinner: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px",
    },
    spinner: {
      width: "40px",
      height: "40px",
      border: "4px solid #f3f4f6",
      borderLeft: "4px solid #3b82f6",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
  };

  // Add CSS animations
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
      }
      
      input:focus, textarea:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
      
      .announcement-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
      }
      
      .close-button:hover {
        background-color: #f1f5f9;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div style={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Announcements</h1>
        <p style={styles.subtitle}>Keep your team informed with important updates</p>
      </div>

      {/* Add Announcement Button */}
      <button 
        style={styles.addButton}
        onClick={() => setIsModalOpen(true)}
        onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
        onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
      >
        <span>📢</span>
        Create New Announcement
      </button>

      {/* Announcements Grid */}
      {announcements.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📢</div>
          <h3 style={{ color: '#374151', marginBottom: '8px' }}>No Announcements Yet</h3>
          <p style={{ color: '#64748b', margin: 0 }}>
            Create your first announcement to keep everyone informed
          </p>
        </div>
      ) : (
        <div style={styles.announcementsGrid}>
          {announcements.map((announcement) => (
            <div 
              key={announcement.id} 
              style={styles.announcementCard}
              className="announcement-card"
              onClick={() => openViewModal(announcement)}
            >
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>{announcement.title}</h3>
              </div>
              <p style={styles.cardMessage}>{announcement.message}</p>
              <div style={styles.cardDate}>
                <span>📅</span>
                {new Date(announcement.createdAt).toLocaleString()}
              </div>
              <div style={styles.cardActions}>
                <button 
                  style={styles.viewButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    openViewModal(announcement);
                  }}
                >
                  👁️ View
                </button>
                <button 
                  style={styles.deleteButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(announcement.id);
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Announcement Modal */}
      {isModalOpen && (
        <div style={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Create New Announcement</h2>
              <button 
                style={styles.closeButton}
                onClick={() => setIsModalOpen(false)}
                className="close-button"
              >
                ×
              </button>
            </div>
            <form style={styles.form} onSubmit={handleCreate}>
              <input
                type="text"
                placeholder="Announcement Title"
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                style={styles.input}
                required
              />
              <textarea
                placeholder="Announcement Message"
                value={newAnnouncement.message}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
                style={styles.textarea}
                required
              />
              <div style={styles.formActions}>
                <button 
                  type="button" 
                  style={styles.cancelButton}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={styles.submitButton}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div style={{...styles.spinner, width: '16px', height: '16px', borderWidth: '2px', marginRight: '8px'}}></div>
                      Posting...
                    </>
                  ) : (
                    'Post Announcement'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Announcement Modal */}
      {viewMode && selectedAnnouncement && (
        <div style={styles.modalOverlay} onClick={closeViewModal}>
          <div style={styles.viewModalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Announcement</h2>
              <button 
                style={styles.closeButton}
                onClick={closeViewModal}
                className="close-button"
              >
                ×
              </button>
            </div>
            <h3 style={styles.viewTitle}>{selectedAnnouncement.title}</h3>
            <p style={styles.viewMessage}>{selectedAnnouncement.message}</p>
            <div style={styles.viewMeta}>
              <span>📅</span>
              <span>Posted on {new Date(selectedAnnouncement.createdAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementManagement;
