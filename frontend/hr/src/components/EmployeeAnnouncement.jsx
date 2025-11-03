// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";

// // // const EmployeeAnnocement  = ({ user }) => {
// // //   const [announcements, setAnnouncements] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState("");

// // //   const token = localStorage.getItem("token");
// // //   const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

// // //   // Fetch announcements for employees
// // //   const fetchAnnouncements = async () => {
// // //     try {
// // //       setLoading(true);
// // //       setError("");
// // //       const res = await axios.get("http://localhost:8080/api/announcements/all", axiosConfig);
// // //       setAnnouncements(res.data);
// // //     } catch (err) {
// // //       console.error(err);
// // //       setError("❌ Failed to load announcements.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchAnnouncements();
// // //   }, []);

// // //   if (loading) return <p style={{ textAlign: "center" }}>Loading announcements...</p>;
// // //   if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

// // //   return (
// // //     <div style={{ maxWidth: 900, margin: "20px auto", padding: 20, background: "#fff", borderRadius: 12 }}>
// // //       <h2>📢 Announcements</h2>
// // //       {announcements.length === 0 ? (
// // //         <p>No announcements available.</p>
// // //       ) : (
// // //         announcements.map((a) => (
// // //           <div key={a.id} style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>
// // //             <h3 style={{ margin: 0 }}>{a.title}</h3>
// // //             <p style={{ margin: "5px 0", color: "#555" }}>{a.message}</p>
// // //             <p style={{ fontSize: "0.8rem", color: "#888" }}>
// // //               By: {a.createdBy?.email || "HR"} | {new Date(a.createdAt).toLocaleString()}
// // //             </p>
// // //           </div>
// // //         ))
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default EmployeeAnnocement;


// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // const EmployeeAnnouncement = ({ user }) => {
// //   const [announcements, setAnnouncements] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   const token = localStorage.getItem("token");
// //   const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

// //   const fetchAnnouncements = async () => {
// //     try {
// //       setLoading(true);
// //       setError("");
// //       const res = await axios.get("http://localhost:8080/api/announcements/all", axiosConfig);
// //       setAnnouncements(res.data);
// //     } catch (err) {
// //       console.error(err);
// //       setError("❌ Failed to load announcements.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAnnouncements();
// //   }, []);

// //   if (loading) return <p style={{ textAlign: "center" }}>Loading announcements...</p>;
// //   if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

// //   return (
// //     <div style={{ maxWidth: 900, margin: "20px auto", padding: 20, background: "#fff", borderRadius: 12 }}>
// //       {/* <h2>📢 Announcements</h2> */}
// //       {announcements.length === 0 ? (
// //         <p>No announcements available.</p>
// //       ) : (
// //         announcements.map((a) => (
// //           <div key={a.id} style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>
// //             <h3 style={{ margin: 0 }}>{a.title}</h3>
// //             <p style={{ margin: "5px 0", color: "#555" }}>{a.message}</p>
// //             <p style={{ fontSize: "0.8rem", color: "#888" }}>
// //               By: {a.createdBy?.email || "HR"} | {new Date(a.createdAt).toLocaleString()}
// //             </p>
// //           </div>
// //         ))
// //       )}
// //     </div>
// //   );
// // };

// // export default EmployeeAnnouncement;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const EmployeeAnnouncement = ({ user }) => {
//   const [announcements, setAnnouncements] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const token = localStorage.getItem("token");
//   const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

//   const fetchAnnouncements = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const res = await axios.get("http://localhost:8080/api/announcements/all", axiosConfig);
//       setAnnouncements(res.data);
//     } catch (err) {
//       console.error(err);
//       setError("❌ Failed to load announcements.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAnnouncements();
//   }, []);

//   return (
//     <>
//       <style>
//         {`
//           .announcement-container {
//             max-width: 800px;
//             width: 95%;
//             margin: 1.5rem auto;
//             padding: 1rem;
//             background: #e5eef4;
//             border-radius: 10px;
//             min-height: 80vh;
//             font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//             display: flex;
//             flex-direction: column;
//             gap: 1rem;
//           }

//           .announcement-title {
//             font-size: 1.6rem;
//             font-weight: 500;
//             color: #ffffff;
//             background: #3390ec;
//             padding: 0.75rem 1rem;
//             border-radius: 8px;
//             margin: 0 0 1rem 0;
//             display: flex;
//             align-items: center;
//             gap: 0.5rem;
//             position: sticky;
//             top: 0;
//             z-index: 10;
//           }

//           .announcement-list {
//             display: grid;
//             gap: 1rem;
//             padding: 0 0.5rem;
//           }

//           .announcement-card {
//             background: #ffffff;
//             border-radius: 10px;
//             padding: 1.25rem;
//             border-left: 4px solid #33c481;
//             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
//             transition: box-shadow 0.2s ease, transform 0.2s ease;
//           }

//           .announcement-card:hover {
//             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
//             transform: translateY(-2px);
//           }

//           .announcement-item-title {
//             font-size: 1.2rem;
//             font-weight: 500;
//             color: #222222;
//             margin: 0 0 0.5rem 0;
//           }

//           .announcement-message {
//             font-size: 0.95rem;
//             color: #444444;
//             line-height: 1.5;
//             margin: 0 0 0.75rem 0;
//           }

//           .announcement-meta {
//             font-size: 0.8rem;
//             color: #667788;
//             margin: 0;
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             flex-wrap: wrap;
//           }

//           .loading-text {
//             text-align: center;
//             font-size: 0.95rem;
//             color: #444444;
//             padding: 2rem;
//           }

//           .error-text {
//             text-align: center;
//             font-size: 0.95rem;
//             color: #d32f2f;
//             padding: 2rem;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             gap: 0.5rem;
//           }

//           @media (max-width: 600px) {
//             .announcement-container {
//               width: 100%;
//               margin: 0;
//               padding: 0.75rem;
//               border-radius: 0;
//             }

//             .announcement-title {
//               font-size: 1.3rem;
//               padding: 0.5rem 0.75rem;
//               border-radius: 6px;
//             }

//             .announcement-card {
//               padding: 1rem;
//               border-left-width: 3px;
//               border-radius: 8px;
//             }

//             .announcement-item-title {
//               font-size: 1.1rem;
//             }

//             .announcement-message {
//               font-size: 0.9rem;
//             }

//             .announcement-meta {
//               font-size: 0.75rem;
//               flex-direction: column;
//               align-items: flex-start;
//               gap: 0.25rem;
//             }

//             .loading-text,
//             .error-text {
//               font-size: 0.9rem;
//               padding: 1.5rem;
//             }
//           }
//         `}
//       </style>

//       {loading ? (
//         <p className="loading-text">Loading announcements...</p>
//       ) : error ? (
//         <p className="error-text">{error}</p>
//       ) : (
//         <div className="announcement-container" role="region" aria-label="Announcements">
//           {/* <h2 className="announcement-title">📢 Announcements</h2> */}
//           {announcements.length === 0 ? (
//             <p className="announcement-message">No announcements available.</p>
//           ) : (
//             <div className="announcement-list">
//               {announcements.map((a) => (
//                 <div key={a.id} className="announcement-card" role="article">
//                   <h3 className="announcement-item-title">{a.title}</h3>
//                   <p className="announcement-message">{a.message}</p>
//                   <p className="announcement-meta">
//                     <span>By: {a.createdBy?.email || "HR"}</span>
//                     <span>{new Date(a.createdAt).toLocaleString()}</span>
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default EmployeeAnnouncement;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const EmployeeAnnouncement = ({ user }) => {
//   const [announcements, setAnnouncements] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const token = localStorage.getItem("token");
//   const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

//   const fetchAnnouncements = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const res = await axios.get(
//         "http://localhost:8080/api/announcements/all",
//         axiosConfig
//       );
//       setAnnouncements(res.data);

//       // ✅ Mark all fetched announcements as seen
//       const seenIds = res.data.map((a) => a.id);
//       localStorage.setItem("seenAnnouncements", JSON.stringify(seenIds));
//     } catch (err) {
//       console.error(err);
//       setError("❌ Failed to load announcements.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAnnouncements();
//   }, []);

//   return (
//     <>
//       <style>
//         {`
//           .announcement-container {
//             max-width: 800px;
//             width: 95%;
//             margin: 1.5rem auto;
//             padding: 1rem;
//             background: #e5eef4;
//             border-radius: 10px;
//             min-height: 80vh;
//             font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//             display: flex;
//             flex-direction: column;
//             gap: 1rem;
//           }

//           .announcement-list {
//             display: grid;
//             gap: 1rem;
//             padding: 0 0.5rem;
//           }

//           .announcement-card {
//             background: #ffffff;
//             border-radius: 10px;
//             padding: 1.25rem;
//             border-left: 4px solid #33c481;
//             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
//             transition: box-shadow 0.2s ease, transform 0.2s ease;
//           }

//           .announcement-card:hover {
//             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
//             transform: translateY(-2px);
//           }

//           .announcement-item-title {
//             font-size: 1.2rem;
//             font-weight: 500;
//             color: #222222;
//             margin: 0 0 0.5rem 0;
//           }

//           .announcement-message {
//             font-size: 0.95rem;
//             color: #444444;
//             line-height: 1.5;
//             margin: 0 0 0.75rem 0;
//           }

//           .announcement-meta {
//             font-size: 0.8rem;
//             color: #667788;
//             margin: 0;
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             flex-wrap: wrap;
//           }

//           .loading-text,
//           .error-text {
//             text-align: center;
//             font-size: 0.95rem;
//             color: #444444;
//             padding: 2rem;
//           }

//           .error-text { color: #d32f2f; }
//         `}
//       </style>

//       {loading ? (
//         <p className="loading-text">Loading announcements...</p>
//       ) : error ? (
//         <p className="error-text">{error}</p>
//       ) : (
//         <div className="announcement-container" role="region" aria-label="Announcements">
//           {announcements.length === 0 ? (
//             <p className="announcement-message">No announcements available.</p>
//           ) : (
//             <div className="announcement-list">
//               {announcements.map((a) => (
//                 <div key={a.id} className="announcement-card" role="article">
//                   <h3 className="announcement-item-title">{a.title}</h3>
//                   <p className="announcement-message">{a.message}</p>
//                   <p className="announcement-meta">
//                     <span>By: {a.createdBy?.email || "HR"}</span>
//                     <span>{new Date(a.createdAt).toLocaleString()}</span>
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default EmployeeAnnouncement;

import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeAnnouncement = ({ user }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(
        "http://localhost:8080/api/announcements/all",
        axiosConfig
      );
      setAnnouncements(res.data);
    } catch (err) {
      console.error(err);
      setError("❌ Failed to load announcements.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <>
      <style>
        {`
          .announcement-container {
            max-width: 800px;
            width: 95%;
            margin: 1.5rem auto;
            padding: 1rem;
            background: #e5eef4;
            border-radius: 10px;
            min-height: 80vh;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .announcement-list {
            display: grid;
            gap: 1rem;
            padding: 0 0.5rem;
          }

          .announcement-card {
            background: #ffffff;
            border-radius: 10px;
            padding: 1.25rem;
            border-left: 4px solid #33c481;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
            transition: box-shadow 0.2s ease, transform 0.2s ease;
          }

          .announcement-card:hover {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
            transform: translateY(-2px);
          }

          .announcement-item-title {
            font-size: 1.2rem;
            font-weight: 500;
            color: #222222;
            margin: 0 0 0.5rem 0;
          }

          .announcement-message {
            font-size: 0.95rem;
            color: #444444;
            line-height: 1.5;
            margin: 0 0 0.75rem 0;
          }

          .announcement-meta {
            font-size: 0.8rem;
            color: #667788;
            margin: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
          }

          .loading-text,
          .error-text {
            text-align: center;
            font-size: 0.95rem;
            color: #444444;
            padding: 2rem;
          }

          .error-text { color: #d32f2f; }
        `}
      </style>

      {loading ? (
        <p className="loading-text">Loading announcements...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <div className="announcement-container" role="region" aria-label="Announcements">
          {announcements.length === 0 ? (
            <p className="announcement-message">No announcements available.</p>
          ) : (
            <div className="announcement-list">
              {announcements.map((a) => (
                <div key={a.id} className="announcement-card" role="article">
                  <h3 className="announcement-item-title">{a.title}</h3>
                  <p className="announcement-message">{a.message}</p>
                  <p className="announcement-meta">
                    <span>By: {a.createdBy?.email || "HR"}</span>
                    <span>{new Date(a.createdAt).toLocaleString()}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default EmployeeAnnouncement;
