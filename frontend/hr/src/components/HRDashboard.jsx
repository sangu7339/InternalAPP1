// // import React, { useState } from "react";
// // import EmpManagement from "./EmpManagement";
// // import Attendance from "./Attendance";
// // import LeaveManagement from "./HRLeaveManagement";
// // import HRSalaryManagement from "./HRSalaryManagement";
// // import AnnouncementManagement from "./AnnouncementManagement";

// // // Holiday Calendar Component
// // const holidays = [
// //   { sl: "01", date: "15-Aug-2025", day: "Friday", name: "Independence Day" },
// //   { sl: "02", date: "27-Aug-2025", day: "Wednesday", name: "Ganesh Chaturthi" },
// //   { sl: "03", date: "01-Oct-2025", day: "Wednesday", name: "Ayudha Puja / Vijayadashami" },
// //   { sl: "04", date: "02-Oct-2025", day: "Thursday", name: "Gandhi Jayanti & Vijayadashami" },
// //   { sl: "05", date: "07-Oct-2025", day: "Tuesday", name: "Maharshi Valmiki Jayanti" },
// //   { sl: "06", date: "22-Oct-2025", day: "Wednesday", name: "Balipadyami / Deepavali" },
// //   { sl: "07", date: "01-Nov-2025", day: "Saturday", name: "Kannada Rajyotsava" },
// //   { sl: "08", date: "25-Dec-2025", day: "Thursday", name: "Christmas Day" },
// // ];

// // function HolidayCalendar() {
// //   return (
// //     <>
// //       <style>{`
// //         .holiday-table {
// //           width: 100%;
// //           border-collapse: collapse;
// //           background-color: #fff;
// //           box-shadow: 0 2px 6px rgba(0,0,0,0.1);
// //         }
// //         .holiday-table th, .holiday-table td {
// //           border: 1px solid #e5e7eb;
// //           padding: 12px 16px;
// //           text-align: left;
// //         }
// //         .holiday-table th {
// //           background-color: #111827;
// //           color: #fff;
// //         }
// //         .holiday-table tr:nth-child(even) {
// //           background-color: #f9fafb;
// //         }
// //         .holiday-table tr:hover {
// //           background-color: #e0e7ff;
// //         }
// //       `}</style>

// //       <h2 style={{ marginBottom: "16px", color: "#111827" }}>2025 Holiday Calendar</h2>
// //       <table className="holiday-table">
// //         <thead>
// //           <tr>
// //             <th>SL NO</th>
// //             <th>Date</th>
// //             <th>Day</th>
// //             <th>Holiday Name</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {holidays.map((holiday) => (
// //             <tr key={holiday.sl}>
// //               <td>{holiday.sl}</td>
// //               <td>{holiday.date}</td>
// //               <td>{holiday.day}</td>
// //               <td>{holiday.name}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </>
// //   );
// // }

// // // Main HR Dashboard
// // function HRDashboard() {
// //   const [activeTab, setActiveTab] = useState("overview");
// //   const userEmail = localStorage.getItem("email");

// //   const tabs = [
// //     { key: "employees", label: "Employee Management", icon: "👥" },
// //     { key: "attendance", label: "Attendance Tracking", icon: "⏰" },
// //     { key: "leaves", label: "Leave Management", icon: "📅" },
// //     { key: "salary", label: "Salary Management", icon: "💰" },
// //     { key: "announcements", label: "Announcements & Notices", icon: "🔔" },
// //     { key: "calendar", label: "Calendar & Events", icon: "📆" },
// //   ];

// //   const renderTab = () => {
// //     switch (activeTab) {
// //       case "employees":
// //         return <EmpManagement />;
// //       case "attendance":
// //         return <Attendance />;
// //       case "leaves":
// //         return <LeaveManagement />;
// //       case "salary":
// //         return <HRSalaryManagement />;
// //       case "announcements":
// //         return <AnnouncementManagement user={{ email: userEmail }} />;
// //       case "calendar":
// //         return <HolidayCalendar />;
// //       default:
// //         return (
// //           <div className="overview-content">
// //             <h2>Welcome, {userEmail || "HR Admin"} 👋</h2>
// //             {/* <h1>Welcome Rajesh......!</h1> */}
// //             <p>Select a module from the menu above to get started.</p>
// //           </div>
// //         );
// //     }
// //   };

// //   return (
// //     <>
// //       <style>{`
// //         * { box-sizing: border-box; font-family: "Segoe UI", Roboto, sans-serif; }
// //         html, body, #root { margin: 0; padding: 0; height: 100%; width: 100%; overflow: hidden; background-color: #2a4969ff; }
// //         .dashboard { display: flex; flex-direction: column; height: 100%; width: 100%; }
// //         .header { display: flex; justify-content: space-between; align-items: center; padding: 16px 32px; background-color: #fff; border-bottom: 1px solid #e5e7eb; box-shadow: 0 1px 3px rgba(151, 33, 70, 0.05); flex-shrink: 0; }
// //         .header-left h1 { font-size: 22px; margin: 0; font-weight: 600; color: #190207d2; }
// //         .header-actions { display: flex; align-items: center; gap: 12px; }
// //         .action-btn { display: flex; align-items: center; gap: 6px; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 14px; cursor: pointer; transition: all 0.2s ease; font-size: 14px; }
// //         .action-btn:hover { background: #f9fafb; }
// //         .logout-btn { background-color: #ef4444; color: white; border: none; }
// //         .logout-btn:hover { background-color: #dc2626; }
// //         .tab-bar { display: flex; justify-content: space-evenly; align-items: center; padding: 0 32px; background: #fff; border-bottom: 1px solid #e5e7eb; overflow-x: auto; flex-shrink: 0; }
// //         .tab-item { display: flex; align-items: center; gap: 8px; padding: 16px 0; font-size: 15px; color: #6b7280; cursor: pointer; border-bottom: 2px solid transparent; white-space: nowrap; transition: all 0.2s ease; }
// //         .tab-item:hover { color: #111827; }
// //         .tab-item.active { color: #111827; font-weight: 600; border-bottom: 2px solid #111827; }
// //         .content { flex: 1; background-color: #f9fafb; padding: 24px 32px; overflow-y: auto; min-height: 0; }
// //         .overview-content { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; text-align: center; color: #374151; }
// //         .overview-content h2 { font-size: 26px; margin-bottom: 10px; }
// //         ::-webkit-scrollbar { width: 8px; }
// //         ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 8px; }
// //         ::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
// //       `}</style>

// //       <div className="dashboard">
// //         {/* Header */}
// //         <header className="header">
// //           <div className="header-left">
// //             <h1>Core HR Dashboard</h1>
// //           </div>
// //           <div className="header-actions">
// //             <button className="action-btn" onClick={() => setActiveTab("calendar")}>
// //               📆 Calendar & Events
// //             </button>
// //             <button className="action-btn">👤 {userEmail || "HR Admin"}</button>
// //             <button
// //               className="action-btn logout-btn"
// //               onClick={() => {
// //                 if (window.confirm("Are you sure you want to logout?")) {
// //                   localStorage.clear();
// //                   window.location.reload(); // back to login
// //                 }
// //               }}
// //             >
// //               Logout
// //             </button>
// //           </div>
// //         </header>

// //         {/* Tabs */}
// //         <nav className="tab-bar">
// //           {tabs.map((tab) => (
// //             <div
// //               key={tab.key}
// //               className={`tab-item ${activeTab === tab.key ? "active" : ""}`}
// //               onClick={() => setActiveTab(tab.key)}
// //             >
// //               <span>{tab.icon}</span>
// //               <span>{tab.label}</span>
// //             </div>
// //           ))}
// //         </nav>

// //         {/* Main Content */}
// //         <main className="content">{renderTab()}</main>
// //       </div>
// //     </>
// //   );
// // }

// // export default HRDashboard;  

// // // HRDashboard.jsx
// // import React, { useState } from "react";
// // import EmpManagement from "./EmpManagement";
// // import Attendance from "./Attendance";
// // import LeaveManagement from "./HRLeaveManagement";
// // import HRSalaryManagement from "./HRSalaryManagement";
// // import AnnouncementManagement from "./AnnouncementManagement";
// // import HolidayCalendar from "./HolidayCalendar"; // Imported separately

// // function HRDashboard() {
// //   const [activeTab, setActiveTab] = useState("overview");
// //   const userEmail = localStorage.getItem("email");

// //   const tabs = [
// //     { key: "employees", label: "Employee Management", icon: "👥" },
// //     { key: "attendance", label: "Attendance Tracking", icon: "⏰" },
// //     { key: "leaves", label: "Leave Management", icon: "📅" },
// //     { key: "salary", label: "Salary Management", icon: "💰" },
// //     { key: "announcements", label: "Announcements & Notices", icon: "🔔" },
// //     { key: "calendar", label: "Calendar & Events", icon: "📆" },
// //   ];

// //   const renderTab = () => {
// //     switch (activeTab) {
// //       case "employees":
// //         return <EmpManagement />;
// //       case "attendance":
// //         return <Attendance />;
// //       case "leaves":
// //         return <LeaveManagement />;
// //       case "salary":
// //         return <HRSalaryManagement />;
// //       case "announcements":
// //         return <AnnouncementManagement user={{ email: userEmail }} />;
// //       case "calendar":
// //         return <HolidayCalendar />;
// //       default:
// //         return (
// //           <div className="overview-content">
// //             <h2>Welcome, {userEmail || "HR Admin"} 👋</h2>
// //             <p>Select a module from the menu above to get started.</p>
// //           </div>
// //         );
// //     }
// //   };

// //   return (
// //     <>
// //       <style>{`
// //         * { box-sizing: border-box; font-family: "Segoe UI", Roboto, sans-serif; }
// //         html, body, #root { margin: 0; padding: 0; height: 100%; width: 100%; overflow: hidden; background-color: #2a4969ff; }
// //         .dashboard { display: flex; flex-direction: column; height: 100%; width: 100%; }
// //         .header { display: flex; justify-content: space-between; align-items: center; padding: 16px 32px; background-color: #fff; border-bottom: 1px solid #e5e7eb; box-shadow: 0 1px 3px rgba(151, 33, 70, 0.05); flex-shrink: 0; }
// //         .header-left h1 { font-size: 22px; margin: 0; font-weight: 600; color: #190207d2; }
// //         .header-actions { display: flex; align-items: center; gap: 12px; }
// //         .action-btn { display: flex; align-items: center; gap: 6px; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 14px; cursor: pointer; transition: all 0.2s ease; font-size: 14px; }
// //         .action-btn:hover { background: #f9fafb; }
// //         .logout-btn { background-color: #ef4444; color: white; border: none; }
// //         .logout-btn:hover { background-color: #dc2626; }
// //         .tab-bar { display: flex; justify-content: space-evenly; align-items: center; padding: 0 32px; background: #fff; border-bottom: 1px solid #e5e7eb; overflow-x: auto; flex-shrink: 0; }
// //         .tab-item { display: flex; align-items: center; gap: 8px; padding: 16px 0; font-size: 15px; color: #6b7280; cursor: pointer; border-bottom: 2px solid transparent; white-space: nowrap; transition: all 0.2s ease; }
// //         .tab-item:hover { color: #111827; }
// //         .tab-item.active { color: #111827; font-weight: 600; border-bottom: 2px solid #111827; }
// //         .content { flex: 1; background-color: #f9fafb; padding: 24px 32px; overflow-y: auto; min-height: 0; }
// //         .overview-content { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; text-align: center; color: #374151; }
// //         .overview-content h2 { font-size: 26px; margin-bottom: 10px; }
// //         ::-webkit-scrollbar { width: 8px; }
// //         ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 8px; }
// //         ::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
// //       `}</style>

// //       <div className="dashboard">
// //         {/* Header */}
// //         <header className="header">
// //           <div className="header-left">
// //             <h1>Core HR Dashboard</h1>
// //           </div>
// //           <div className="header-actions">
// //             <button className="action-btn" onClick={() => setActiveTab("calendar")}>
// //               📆 Calendar & Events
// //             </button>
// //             <button className="action-btn">👤 {userEmail || "HR Admin"}</button>
// //             <button
// //               className="action-btn logout-btn"
// //               onClick={() => {
// //                 if (window.confirm("Are you sure you want to logout?")) {
// //                   localStorage.clear();
// //                   window.location.reload();
// //                 }
// //               }}
// //             >
// //               Logout
// //             </button>
// //           </div>
// //         </header>

// //         {/* Tabs */}
// //         <nav className="tab-bar">
// //           {tabs.map((tab) => (
// //             <div
// //               key={tab.key}
// //               className={`tab-item ${activeTab === tab.key ? "active" : ""}`}
// //               onClick={() => setActiveTab(tab.key)}
// //             >
// //               <span>{tab.icon}</span>
// //               <span>{tab.label}</span>
// //             </div>
// //           ))}
// //         </nav>

// //         {/* Main Content */}
// //         <main className="content">{renderTab()}</main>
// //       </div>
// //     </>
// //   );
// // }

// // export default HRDashboard;
// // HRDashboard.jsx
// // import React, { useState, useEffect } from "react";
// // import EmpManagement from "./EmpManagement";
// // import Attendance from "./Attendance";
// // import LeaveManagement from "./HRLeaveManagement";
// // import HRSalaryManagement from "./HRSalaryManagement";
// // import AnnouncementManagement from "./AnnouncementManagement";
// // import HolidayCalendar from "./HolidayCalendar";

// // function HRDashboard() {
// //   const [activeTab, setActiveTab] = useState("overview");
// //   const [pendingUsersCount, setPendingUsersCount] = useState(0); // 🔔 notification count
// //   const userEmail = localStorage.getItem("email");

// //   // 🔄 Fetch users not yet assigned as employees
// //   useEffect(() => {
// //     const fetchPendingUsers = async () => {
// //       try {
// //         const response = await fetch("http://localhost:8080/api/hr/users-not-employees", {
// //           method: "GET",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //         });

// //         if (!response.ok) {
// //           console.error("Failed to fetch pending users");
// //           return;
// //         }

// //         const data = await response.json();
// //         if (Array.isArray(data)) {
// //           setPendingUsersCount(data.length);
// //         } else {
// //           setPendingUsersCount(0);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching pending users:", error);
// //       }
// //     };

// //     fetchPendingUsers();

// //     // Optional auto-refresh every 30s
// //     const interval = setInterval(fetchPendingUsers, 30000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   const tabs = [
// //     { key: "employees", label: "Employee Management", icon: "👥" },
// //     { key: "attendance", label: "Attendance Tracking", icon: "⏰" },
// //     { key: "leaves", label: "Leave Management", icon: "📅" },
// //     { key: "salary", label: "Salary Management", icon: "💰" },
// //     { key: "announcements", label: "Announcements & Notices", icon: "🔔" },
// //     { key: "calendar", label: "Calendar & Events", icon: "📆" },
// //   ];

// //   const renderTab = () => {
// //     switch (activeTab) {
// //       case "employees":
// //         return <EmpManagement />;
// //       case "attendance":
// //         return <Attendance />;
// //       case "leaves":
// //         return <LeaveManagement />;
// //       case "salary":
// //         return <HRSalaryManagement />;
// //       case "announcements":
// //         return <AnnouncementManagement user={{ email: userEmail }} />;
// //       case "calendar":
// //         return <HolidayCalendar />;
// //       default:
// //         return (
// //           <div className="overview-content">
// //             <h2>Welcome, {userEmail || "HR Admin"} 👋</h2>
// //             <p>Select a module from the menu above to get started.</p>
// //           </div>
// //         );
// //     }
// //   };

// //   return (
// //     <>
// //       <style>{`
// //         * { box-sizing: border-box; font-family: "Segoe UI", Roboto, sans-serif; }
// //         html, body, #root { margin: 0; padding: 0; height: 100%; width: 100%; overflow: hidden; background-color: #2a4969ff; }
// //         .dashboard { display: flex; flex-direction: column; height: 100%; width: 100%; }
// //         .header { display: flex; justify-content: space-between; align-items: center; padding: 16px 32px; background-color: #fff; border-bottom: 1px solid #e5e7eb; box-shadow: 0 1px 3px rgba(151, 33, 70, 0.05); flex-shrink: 0; }
// //         .header-left h1 { font-size: 22px; margin: 0; font-weight: 600; color: #190207d2; }
// //         .header-actions { display: flex; align-items: center; gap: 12px; }
// //         .action-btn { display: flex; align-items: center; gap: 6px; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 14px; cursor: pointer; transition: all 0.2s ease; font-size: 14px; }
// //         .action-btn:hover { background: #f9fafb; }
// //         .logout-btn { background-color: #ef4444; color: white; border: none; }
// //         .logout-btn:hover { background-color: #dc2626; }

// //         .tab-bar { display: flex; justify-content: space-evenly; align-items: center; padding: 0 32px; background: #fff; border-bottom: 1px solid #e5e7eb; overflow-x: auto; flex-shrink: 0; }
// //         .tab-item { position: relative; display: flex; align-items: center; gap: 8px; padding: 16px 0; font-size: 15px; color: #6b7280; cursor: pointer; border-bottom: 2px solid transparent; white-space: nowrap; transition: all 0.2s ease; }
// //         .tab-item:hover { color: #111827; }
// //         .tab-item.active { color: #111827; font-weight: 600; border-bottom: 2px solid #111827; }

// //         /* 🔔 Animated notification badge */
// //         .notification-dot {
// //           position: absolute;
// //           top: 8px;
// //           right: -8px;
// //           background-color: #ef4444;
// //           color: white;
// //           font-size: 10px;
// //           font-weight: bold;
// //           padding: 2px 6px;
// //           border-radius: 9999px;
// //           min-width: 18px;
// //           text-align: center;
// //           box-shadow: 0 0 0 rgba(239, 68, 68, 0.4);
// //           animation: pulse 1.5s infinite;
// //         }

// //         @keyframes pulse {
// //           0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.5); }
// //           70% { transform: scale(1.2); box-shadow: 0 0 10px 5px rgba(239, 68, 68, 0.2); }
// //           100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
// //         }

// //         .content { flex: 1; background-color: #f9fafb; padding: 24px 32px; overflow-y: auto; min-height: 0; }
// //         .overview-content { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; text-align: center; color: #374151; }
// //         .overview-content h2 { font-size: 26px; margin-bottom: 10px; }

// //         ::-webkit-scrollbar { width: 8px; }
// //         ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 8px; }
// //         ::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
// //       `}</style>

// //       <div className="dashboard">
// //         {/* Header */}
// //         <header className="header">
// //           <div className="header-left">
// //             <h1>Core HR Dashboard</h1>
// //           </div>
// //           <div className="header-actions">
// //             <button className="action-btn" onClick={() => setActiveTab("calendar")}>
// //               📆 Calendar & Events
// //             </button>
// //             <button className="action-btn">👤 {userEmail || "HR Admin"}</button>
// //             <button
// //               className="action-btn logout-btn"
// //               onClick={() => {
// //                 if (window.confirm("Are you sure you want to logout?")) {
// //                   localStorage.clear();
// //                   window.location.reload();
// //                 }
// //               }}
// //             >
// //               Logout
// //             </button>
// //           </div>
// //         </header>

// //         {/* Tabs */}
// //         <nav className="tab-bar">
// //           {tabs.map((tab) => (
// //             <div
// //               key={tab.key}
// //               className={`tab-item ${activeTab === tab.key ? "active" : ""}`}
// //               onClick={() => setActiveTab(tab.key)}
// //             >
// //               <span>{tab.icon}</span>
// //               <span>{tab.label}</span>

// //               {/* 🔔 Animated badge for Employee tab */}
// //               {tab.key === "employees" && pendingUsersCount > 0 && (
// //                 <span className="notification-dot">{pendingUsersCount}</span>
// //               )}
// //             </div>
// //           ))}
// //         </nav>

// //         {/* Main Content */}
// //         <main className="content">{renderTab()}</main>
// //       </div>
// //     </>
// //   );
// // }

// // export default HRDashboard;
// // HRDashboard.jsx
// import React, { useState, useEffect } from "react";
// import EmpManagement from "./EmpManagement";
// import Attendance from "./Attendance";
// import LeaveManagement from "./HRLeaveManagement";
// import HRSalaryManagement from "./HRSalaryManagement";
// import AnnouncementManagement from "./AnnouncementManagement";
// import HolidayCalendar from "./HolidayCalendar";

// function HRDashboard() {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [pendingUsers, setPendingUsers] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const userEmail = localStorage.getItem("email");

//   // ✅ Fetch list of users-not-employees (backend API)
//   const fetchPendingUsers = async () => {
//     try {
//       const token = localStorage.getItem("token"); // if you use JWT
//       const res = await fetch("http://localhost:8080/api/hr/users-not-employees", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//       });

//       if (!res.ok) throw new Error("Failed to fetch");
//       const data = await res.json();

//       // If backend returns message instead of array
//       if (Array.isArray(data)) setPendingUsers(data);
//       else setPendingUsers([]);
//     } catch (error) {
//       console.error("Error fetching pending users:", error);
//       setPendingUsers([]);
//     }
//   };

//   useEffect(() => {
//     fetchPendingUsers();
//     const interval = setInterval(fetchPendingUsers, 30000); // auto-refresh every 30s
//     return () => clearInterval(interval);
//   }, []);

//   const tabs = [
//     { key: "employees", label: "Employee Management", icon: "👥" },
//     { key: "attendance", label: "Attendance Tracking", icon: "⏰" },
//     { key: "leaves", label: "Leave Management", icon: "📅" },
//     { key: "salary", label: "Salary Management", icon: "💰" },
//     { key: "announcements", label: "Announcements & Notices", icon: "🔔" },
//     { key: "calendar", label: "Calendar & Events", icon: "📆" },
//   ];

//   const renderTab = () => {
//     switch (activeTab) {
//       case "employees":
//         return <EmpManagement />;
//       case "attendance":
//         return <Attendance />;
//       case "leaves":
//         return <LeaveManagement />;
//       case "salary":
//         return <HRSalaryManagement />;
//       case "announcements":
//         return <AnnouncementManagement user={{ email: userEmail }} />;
//       case "calendar":
//         return <HolidayCalendar />;
//       default:
//         return (
//           <div className="overview-content">
//             <h2>Welcome, {userEmail || "HR Admin"} 👋</h2>
//             <p>Select a module from the menu above to get started.</p>
//           </div>
//         );
//     }
//   };

//   return (
//     <>
//       <style>{`
//         * { box-sizing: border-box; font-family: "Segoe UI", Roboto, sans-serif; }
//         html, body, #root { margin: 0; padding: 0; height: 100%; width: 100%; background-color: #2a4969ff; }
//         .dashboard { display: flex; flex-direction: column; height: 100%; width: 100%; }
//         .header { display: flex; justify-content: space-between; align-items: center; padding: 16px 32px; background-color: #fff; border-bottom: 1px solid #e5e7eb; box-shadow: 0 1px 3px rgba(151, 33, 70, 0.05); flex-shrink: 0; position: relative; }
//         .header-left h1 { font-size: 22px; margin: 0; font-weight: 600; color: #190207d2; }
//         .header-actions { display: flex; align-items: center; gap: 12px; position: relative; }
//         .action-btn { display: flex; align-items: center; gap: 6px; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 14px; cursor: pointer; transition: all 0.2s ease; font-size: 14px; position: relative; }
//         .action-btn:hover { background: #f9fafb; }
//         .logout-btn { background-color: #ef4444; color: white; border: none; }
//         .logout-btn:hover { background-color: #dc2626; }
//         .notification-bell { position: relative; font-size: 20px; cursor: pointer; }
//         .notification-bell.red { color: red; }
//         .notification-count { position: absolute; top: -6px; right: -6px; background: red; color: white; border-radius: 50%; font-size: 12px; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; }
//         .notification-dropdown { position: absolute; top: 40px; right: 0; background: white; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); width: 300px; max-height: 300px; overflow-y: auto; z-index: 100; }
//         .notification-item { padding: 10px 12px; border-bottom: 1px solid #eee; cursor: pointer; }
//         .notification-item:hover { background: #f9fafb; }
//         .tab-bar { display: flex; justify-content: space-evenly; align-items: center; padding: 0 32px; background: #fff; border-bottom: 1px solid #e5e7eb; overflow-x: auto; flex-shrink: 0; }
//         .tab-item { display: flex; align-items: center; gap: 8px; padding: 16px 0; font-size: 15px; color: #6b7280; cursor: pointer; border-bottom: 2px solid transparent; white-space: nowrap; transition: all 0.2s ease; }
//         .tab-item:hover { color: #111827; }
//         .tab-item.active { color: #111827; font-weight: 600; border-bottom: 2px solid #111827; }
//         .content { flex: 1; background-color: #f9fafb; padding: 24px 32px; overflow-y: auto; min-height: 0; }
//         .overview-content { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; text-align: center; color: #374151; }
//         .overview-content h2 { font-size: 26px; margin-bottom: 10px; }
//         ::-webkit-scrollbar { width: 8px; }
//         ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 8px; }
//         ::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
//       `}</style>

//       <div className="dashboard">
//         {/* Header */}
//         <header className="header">
//           <div className="header-left">
//             <h1>Core HR Dashboard</h1>
//           </div>

//           <div className="header-actions">
//             {/* 🔔 Notification Bell */}
//             <div
//               className={`notification-bell ${pendingUsers.length > 0 ? "red" : ""}`}
//               onClick={() => setShowNotifications(!showNotifications)}
//             >
//               🔔
//               {pendingUsers.length > 0 && (
//                 <span className="notification-count">{pendingUsers.length}</span>
//               )}

//               {showNotifications && (
//                 <div className="notification-dropdown">
//                   {pendingUsers.length === 0 ? (
//                     <div className="notification-item">No pending users 🎉</div>
//                   ) : (
//                     pendingUsers.map((user) => (
//                       <div key={user.id} className="notification-item">
//                         <strong>{user.email}</strong> — {user.role}
//                       </div>
//                     ))
//                   )}
//                 </div>
//               )}
//             </div>

//             <button className="action-btn" onClick={() => setActiveTab("calendar")}>
//               📆 Calendar & Events
//             </button>

//             <button className="action-btn">👤 {userEmail || "HR Admin"}</button>

//             <button
//               className="action-btn logout-btn"
//               onClick={() => {
//                 if (window.confirm("Are you sure you want to logout?")) {
//                   localStorage.clear();
//                   window.location.reload();
//                 }
//               }}
//             >
//               Logout
//             </button>
//           </div>
//         </header>

//         {/* Tabs */}
//         <nav className="tab-bar">
//           {tabs.map((tab) => (
//             <div
//               key={tab.key}
//               className={`tab-item ${activeTab === tab.key ? "active" : ""}`}
//               onClick={() => setActiveTab(tab.key)}
//             >
//               <span>{tab.icon}</span>
//               <span>{tab.label}</span>
//             </div>
//           ))}
//         </nav>

//         {/* Main Content */}
//         <main className="content">{renderTab()}</main>
//       </div>
//     </>
//   );
// }

// export default HRDashboard;
// HRDashboard.jsx
// import React, { useState, useEffect } from "react";
// import EmpManagement from "./EmpManagement";
// import Attendance from "./Attendance";
// import LeaveManagement from "./HRLeaveManagement";
// import HRSalaryManagement from "./HRSalaryManagement";
// import AnnouncementManagement from "./AnnouncementManagement";
// import HolidayCalendar from "./HolidayCalendar";

// function HRDashboard() {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [pendingUsers, setPendingUsers] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const userEmail = localStorage.getItem("email");

//   // ✅ Change this if your backend runs on another port
//   const API_BASE_URL = "http://localhost:8080";

//   // ✅ Fetch pending users (users-not-employees)
//   const fetchPendingUsers = async () => {
//     try {
//       const token = localStorage.getItem("token"); // if using JWT

//       const response = await fetch(`${API_BASE_URL}/api/hr/users-not-employees`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//       });

//       if (!response.ok) {
//         console.error("❌ Backend returned an error:", response.status, response.statusText);
//         setPendingUsers([]);
//         return;
//       }

//       const data = await response.json();

//       if (Array.isArray(data)) {
//         setPendingUsers(data);
//       } else if (data.message) {
//         console.log("ℹ️ Backend message:", data.message);
//         setPendingUsers([]);
//       } else {
//         setPendingUsers([]);
//       }
//     } catch (error) {
//       console.error("⚠️ Fetch error: Could not connect to backend. Details:", error);
//       setPendingUsers([]);
//     }
//   };

//   useEffect(() => {
//     fetchPendingUsers();
//     const interval = setInterval(fetchPendingUsers, 30000); // auto-refresh every 30s
//     return () => clearInterval(interval);
//   }, []);

//   const tabs = [
//     { key: "employees", label: "Employee Management", icon: "👥" },
//     { key: "attendance", label: "Attendance Tracking", icon: "⏰" },
//     { key: "leaves", label: "Leave Management", icon: "📅" },
//     { key: "salary", label: "Salary Management", icon: "💰" },
//     { key: "announcements", label: "Announcements & Notices", icon: "🔔" },
//     { key: "calendar", label: "Calendar & Events", icon: "📆" },
//   ];

//   const renderTab = () => {
//     switch (activeTab) {
//       case "employees":
//         return <EmpManagement />;
//       case "attendance":
//         return <Attendance />;
//       case "leaves":
//         return <LeaveManagement />;
//       case "salary":
//         return <HRSalaryManagement />;
//       case "announcements":
//         return <AnnouncementManagement user={{ email: userEmail }} />;
//       case "calendar":
//         return <HolidayCalendar />;
//       default:
//         return (
//           <div className="overview-content">
//             <h2>Welcome, {userEmail || "HR Admin"} 👋</h2>
//             <p>Select a module from the menu above to get started.</p>
//           </div>
//         );
//     }
//   };

//   return (
//     <>
//       <style>{`
//         * { box-sizing: border-box; font-family: "Segoe UI", Roboto, sans-serif; }
//         html, body, #root { margin: 0; padding: 0; height: 100%; width: 100%; background-color: #2a4969ff; }
//         .dashboard { display: flex; flex-direction: column; height: 100%; width: 100%; }
//         .header { display: flex; justify-content: space-between; align-items: center; padding: 16px 32px; background-color: #fff; border-bottom: 1px solid #e5e7eb; box-shadow: 0 1px 3px rgba(151, 33, 70, 0.05); position: relative; }
//         .header-left h1 { font-size: 22px; margin: 0; font-weight: 600; color: #190207d2; }
//         .header-actions { display: flex; align-items: center; gap: 12px; position: relative; }
//         .action-btn { display: flex; align-items: center; gap: 6px; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 14px; cursor: pointer; transition: all 0.2s ease; font-size: 14px; }
//         .action-btn:hover { background: #f9fafb; }
//         .logout-btn { background-color: #ef4444; color: white; border: none; }
//         .logout-btn:hover { background-color: #dc2626; }
//         .notification-bell { position: relative; font-size: 20px; cursor: pointer; }
//         .notification-bell.red { color: red; }
//         .notification-count { position: absolute; top: -6px; right: -6px; background: red; color: white; border-radius: 50%; font-size: 12px; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; }
//         .notification-dropdown { position: absolute; top: 40px; right: 0; background: white; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); width: 300px; max-height: 300px; overflow-y: auto; z-index: 100; }
//         .notification-item { padding: 10px 12px; border-bottom: 1px solid #eee; cursor: pointer; }
//         .notification-item:hover { background: #f9fafb; }
//         .tab-bar { display: flex; justify-content: space-evenly; align-items: center; padding: 0 32px; background: #fff; border-bottom: 1px solid #e5e7eb; overflow-x: auto; }
//         .tab-item { display: flex; align-items: center; gap: 8px; padding: 16px 0; font-size: 15px; color: #6b7280; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s ease; }
//         .tab-item:hover { color: #111827; }
//         .tab-item.active { color: #111827; font-weight: 600; border-bottom: 2px solid #111827; }
//         .content { flex: 1; background-color: #f9fafb; padding: 24px 32px; overflow-y: auto; min-height: 0; }
//         .overview-content { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; text-align: center; color: #374151; }
//         .overview-content h2 { font-size: 26px; margin-bottom: 10px; }
//       `}</style>

//       <div className="dashboard">
//         {/* Header */}
//         <header className="header">
//           <div className="header-left">
//             <h1>Core HR Dashboard</h1>
//           </div>

//           <div className="header-actions">
//             {/* 🔔 Notification Bell */}
//             <div
//               className={`notification-bell ${pendingUsers.length > 0 ? "red" : ""}`}
//               onClick={() => setShowNotifications(!showNotifications)}
//             >
//               🔔
//               {pendingUsers.length > 0 && (
//                 <span className="notification-count">{pendingUsers.length}</span>
//               )}

//               {showNotifications && (
//                 <div className="notification-dropdown">
//                   {pendingUsers.length === 0 ? (
//                     <div className="notification-item">No pending users 🎉</div>
//                   ) : (
//                     pendingUsers.map((user) => (
//                       <div key={user.id} className="notification-item">
//                         <strong>{user.email}</strong> — {user.role}
//                       </div>
//                     ))
//                   )}
//                 </div>
//               )}
//             </div>

//             <button className="action-btn" onClick={() => setActiveTab("calendar")}>
//               📆 Calendar & Events
//             </button>

//             <button className="action-btn">👤 {userEmail || "HR Admin"}</button>

//             <button
//               className="action-btn logout-btn"
//               onClick={() => {
//                 if (window.confirm("Are you sure you want to logout?")) {
//                   localStorage.clear();
//                   window.location.reload();
//                 }
//               }}
//             >
//               Logout
//             </button>
//           </div>
//         </header>

//         {/* Tabs */}
//         <nav className="tab-bar">
//           {tabs.map((tab) => (
//             <div
//               key={tab.key}
//               className={`tab-item ${activeTab === tab.key ? "active" : ""}`}
//               onClick={() => setActiveTab(tab.key)}
//             >
//               <span>{tab.icon}</span>
//               <span>{tab.label}</span>
//             </div>
//           ))}
//         </nav>

//         {/* Main Content */}
//         <main className="content">{renderTab()}</main>
//       </div>
//     </>
//   );
// }

// export default HRDashboard;

// import React, { useState, useEffect, useRef } from "react";
// import EmpManagement from "./EmpManagement";
// import Attendance from "./Attendance";
// import LeaveManagement from "./HRLeaveManagement";
// import HRSalaryManagement from "./HRSalaryManagement";
// import AnnouncementManagement from "./AnnouncementManagement";
// import HolidayCalendar from "./HolidayCalendar";

// function HRDashboard() {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [pendingUsers, setPendingUsers] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const userEmail = localStorage.getItem("email");

//   // ✅ Change this if your backend runs on another port
//   const API_BASE_URL = "http://localhost:8080";

//   // Create a ref for the notification dropdown
//   const notificationRef = useRef(null);

//   // ✅ Fetch pending users (users-not-employees)
//   const fetchPendingUsers = async () => {
//     try {
//       const token = localStorage.getItem("token"); // if using JWT

//       const response = await fetch(`${API_BASE_URL}/api/hr/users-not-employees`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//       });

//       if (!response.ok) {
//         console.error("❌ Backend returned an error:", response.status, response.statusText);
//         setPendingUsers([]);
//         return;
//       }

//       const data = await response.json();

//       if (Array.isArray(data)) {
//         setPendingUsers(data);
//       } else if (data.message) {
//         console.log("ℹ️ Backend message:", data.message);
//         setPendingUsers([]);
//       } else {
//         setPendingUsers([]);
//       }
//     } catch (error) {
//       console.error("⚠️ Fetch error: Could not connect to backend. Details:", error);
//       setPendingUsers([]);
//     }
//   };

//   useEffect(() => {
//     fetchPendingUsers();
//     const interval = setInterval(fetchPendingUsers, 30000); // auto-refresh every 30s
//     return () => clearInterval(interval);
//   }, []);

//   // Click outside handler for notifications
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (notificationRef.current && !notificationRef.current.contains(event.target)) {
//         setShowNotifications(false);
//       }
//     };

//     // Add event listener when notifications are shown
//     if (showNotifications) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     // Clean up event listener
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showNotifications]);

//   const tabs = [
//     { key: "employees", label: "Employee Management", icon: "👥" },
//     { key: "attendance", label: "Attendance Tracking", icon: "⏰" },
//     { key: "leaves", label: "Leave Management", icon: "📅" },
//     { key: "salary", label: "Salary Management", icon: "💰" },
//     { key: "announcements", label: "Announcements & Notices", icon: "🔔" },
//     { key: "calendar", label: "Calendar & Events", icon: "📆" },
//   ];

//   const renderTab = () => {
//     switch (activeTab) {
//       case "employees":
//         return <EmpManagement />;
//       case "attendance":
//         return <Attendance />;
//       case "leaves":
//         return <LeaveManagement />;
//       case "salary":
//         return <HRSalaryManagement />;
//       case "announcements":
//         return <AnnouncementManagement user={{ email: userEmail }} />;
//       case "calendar":
//         return <HolidayCalendar />;
//       default:
//         return (
//           <div className="overview-content">
//             <h2>Welcome, {userEmail || "HR Admin"} 👋</h2>
//             <p>Select a module from the menu above to get started.</p>
//           </div>
//         );
//     }
//   };

//   return (
//     <>
//       <style>{`
//         * { box-sizing: border-box; font-family: "Segoe UI", Roboto, sans-serif; }
//         html, body, #root { margin: 0; padding: 0; height: 100%; width: 100%; background-color: #2a4969ff; }
//         .dashboard { display: flex; flex-direction: column; height: 100%; width: 100%; }
//         .header { display: flex; justify-content: space-between; align-items: center; padding: 16px 32px; background-color: #fff; border-bottom: 1px solid #e5e7eb; box-shadow: 0 1px 3px rgba(151, 33, 70, 0.05); position: relative; }
//         .header-left h1 { font-size: 22px; margin: 0; font-weight: 600; color: #190207d2; }
//         .header-actions { display: flex; align-items: center; gap: 12px; position: relative; }
//         .action-btn { display: flex; align-items: center; gap: 6px; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 14px; cursor: pointer; transition: all 0.2s ease; font-size: 14px; }
//         .action-btn:hover { background: #f9fafb; }
//         .logout-btn { background-color: #ef4444; color: white; border: none; }
//         .logout-btn:hover { background-color: #dc2626; }
//         .notification-bell { position: relative; font-size: 20px; cursor: pointer; }
//         .notification-bell.red { color: red; }
//         .notification-count { position: absolute; top: -6px; right: -6px; background: red; color: white; border-radius: 50%; font-size: 12px; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; }
//         .notification-dropdown { position: absolute; top: 40px; right: 0; background: white; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); width: 300px; max-height: 300px; overflow-y: auto; z-index: 100; }
//         .notification-item { padding: 10px 12px; border-bottom: 1px solid #eee; cursor: pointer; }
//         .notification-item:hover { background: #f9fafb; }
//         .tab-bar { display: flex; justify-content: space-evenly; align-items: center; padding: 0 32px; background: #fff; border-bottom: 1px solid #e5e7eb; overflow-x: auto; }
//         .tab-item { display: flex; align-items: center; gap: 8px; padding: 16px 0; font-size: 15px; color: #6b7280; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s ease; }
//         .tab-item:hover { color: #111827; }
//         .tab-item.active { color: #111827; font-weight: 600; border-bottom: 2px solid #111827; }
//         .content { flex: 1; background-color: #f9fafb; padding: 24px 32px; overflow-y: auto; min-height: 0; }
//         .overview-content { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; text-align: center; color: #374151; }
//         .overview-content h2 { font-size: 26px; margin-bottom: 10px; }
//       `}</style>

//       <div className="dashboard">
//         {/* Header */}
//         <header className="header">
//           <div className="header-left">
//             <h1>Core HR Dashboard</h1>
//           </div>

//           <div className="header-actions">
//             {/* 🔔 Notification Bell with ref */}
//             <div 
//               ref={notificationRef}
//               style={{ position: 'relative' }}
//             >
//               {/* <div
//                 className={`notification-bell ${pendingUsers.length > 0 ? "red" : ""}`}
//                 onClick={() => setShowNotifications(!showNotifications)}
//               >
//                 🔔
//                 {pendingUsers.length > 0 && (
//                   <span className="notification-count">{pendingUsers.length}</span>
//                 )}
//               </div> */}

//               {showNotifications && (
//                 <div className="notification-dropdown">
//                   {pendingUsers.length === 0 ? (
//                     <div className="notification-item">No pending users 🎉</div>
//                   ) : (
//                     pendingUsers.map((user) => (
//                       <div key={user.id} className="notification-item">
//                         <strong>{user.email}</strong> — {user.role}
//                       </div>
//                     ))
//                   )}
//                 </div>
//               )}
//             </div>

//             <button className="action-btn" onClick={() => setActiveTab("calendar")}>
//               📆 Calendar & Events
//             </button>

//             <button className="action-btn">👤 {userEmail || "HR Admin"}</button>

//             <button
//               className="action-btn logout-btn"
//               onClick={() => {
//                 if (window.confirm("Are you sure you want to logout?")) {
//                   localStorage.clear();
//                   window.location.reload();
//                 }
//               }}
//             >
//               Logout
//             </button>
//           </div>
//         </header>

//         {/* Tabs */}
//         <nav className="tab-bar">
//           {tabs.map((tab) => (
//             <div
//               key={tab.key}
//               className={`tab-item ${activeTab === tab.key ? "active" : ""}`}
//               onClick={() => setActiveTab(tab.key)}
//             >
//               <span>{tab.icon}</span>
//               <span>{tab.label}</span>
//             </div>
//           ))}
//         </nav>

//         {/* Main Content */}
//         <main className="content">{renderTab()}</main>
//       </div>
//     </>
//   );
// }

// export default HRDashboard;

import React, { useState, useEffect, useRef } from "react";
import EmpManagement from "./EmpManagement";
import Attendance from "./Attendance";
import LeaveManagement from "./HRLeaveManagement";
import HRSalaryManagement from "./HRSalaryManagement";
import AnnouncementManagement from "./AnnouncementManagement";
import HolidayCalendar from "./HolidayCalendar";

function HRDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [pendingUsers, setPendingUsers] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const userEmail = localStorage.getItem("email");

  // ✅ Change this if your backend runs on another port
  const API_BASE_URL = "http://localhost:8080";

  // Create refs for dropdowns
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // ✅ Fetch pending users (users-not-employees)
  const fetchPendingUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // if using JWT

      const response = await fetch(`${API_BASE_URL}/api/hr/users-not-employees`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!response.ok) {
        console.error("❌ Backend returned an error:", response.status, response.statusText);
        setPendingUsers([]);
        return;
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setPendingUsers(data);
      } else if (data.message) {
        console.log("ℹ️ Backend message:", data.message);
        setPendingUsers([]);
      } else {
        setPendingUsers([]);
      }
    } catch (error) {
      console.error("⚠️ Fetch error: Could not connect to backend. Details:", error);
      setPendingUsers([]);
    }
  };

  // ✅ Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setIsUpdatingPassword(true);

    if (newPassword !== confirmNewPassword) {
      setPasswordError("New passwords do not match.");
      setIsUpdatingPassword(false);
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters long.");
      setIsUpdatingPassword(false);
      return;
    }

    try {
      const token = localStorage.getItem("token"); // if using JWT

      const response = await fetch(`${API_BASE_URL}/api/hr/update-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update password");
      }

      const data = await response.json();
      alert(data.message || "Password updated successfully!"); // Or use a toast notification
      setShowPasswordModal(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      setPasswordError(error.message || "An error occurred while updating the password.");
      console.error("Password update error:", error);
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  useEffect(() => {
    fetchPendingUsers();
    const interval = setInterval(fetchPendingUsers, 30000); // auto-refresh every 30s
    return () => clearInterval(interval);
  }, []);

  // Click outside handler for notifications
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const tabs = [
    { key: "employees", label: "Employee Management", icon: "👥" },
    { key: "attendance", label: "Attendance Tracking", icon: "⏰" },
    { key: "leaves", label: "Leave Management", icon: "📅" },
    { key: "salary", label: "Salary Management", icon: "💰" },
    { key: "announcements", label: "Announcements & Notices", icon: "🔔" },
    { key: "calendar", label: "Calendar & Events", icon: "📆" },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case "employees":
        return <EmpManagement />;
      case "attendance":
        return <Attendance />;
      case "leaves":
        return <LeaveManagement />;
      case "salary":
        return <HRSalaryManagement />;
      case "announcements":
        return <AnnouncementManagement user={{ email: userEmail }} />;
      case "calendar":
        return <HolidayCalendar />;
      default:
        return (
          <div className="overview-content">
            <h2>Welcome, {userEmail || "HR Admin"} 👋</h2>
            <p>Select a module from the menu above to get started.</p>
          </div>
        );
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; font-family: "Segoe UI", Roboto, sans-serif; }
        html, body, #root { margin: 0; padding: 0; height: 100%; width: 100%; background-color: #2a4969ff; }
        .dashboard { display: flex; flex-direction: column; height: 100%; width: 100%; }
        .header { display: flex; justify-content: space-between; align-items: center; padding: 16px 32px; background-color: #fff; border-bottom: 1px solid #e5e7eb; box-shadow: 0 1px 3px rgba(151, 33, 70, 0.05); position: relative; }
        .header-left h1 { font-size: 22px; margin: 0; font-weight: 600; color: #190207d2; }
        .header-actions { display: flex; align-items: center; gap: 12px; position: relative; }
        .action-btn { display: flex; align-items: center; gap: 6px; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 14px; cursor: pointer; transition: all 0.2s ease; font-size: 14px; }
        .action-btn:hover { background: #f9fafb; }
        .profile-btn { position: relative; }
        .logout-btn { background-color: #ef4444; color: white; border: none; }
        .logout-btn:hover { background-color: #dc2626; }
        .notification-bell { position: relative; font-size: 20px; cursor: pointer; }
        .notification-bell.red { color: red; }
        .notification-count { position: absolute; top: -6px; right: -6px; background: red; color: white; border-radius: 50%; font-size: 12px; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; }
        .dropdown { position: absolute; top: 40px; right: 0; background: white; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); width: 200px; z-index: 100; }
        .dropdown-item { padding: 10px 12px; border-bottom: 1px solid #eee; cursor: pointer; }
        .dropdown-item:hover { background: #f9fafb; }
        .dropdown-item:last-child { border-bottom: none; }
        .tab-bar { display: flex; justify-content: space-evenly; align-items: center; padding: 0 32px; background: #fff; border-bottom: 1px solid #e5e7eb; overflow-x: auto; }
        .tab-item { display: flex; align-items: center; gap: 8px; padding: 16px 0; font-size: 15px; color: #6b7280; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s ease; }
        .tab-item:hover { color: #111827; }
        .tab-item.active { color: #111827; font-weight: 600; border-bottom: 2px solid #111827; }
        .content { flex: 1; background-color: #f9fafb; padding: 24px 32px; overflow-y: auto; min-height: 0; }
        .overview-content { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; text-align: center; color: #374151; }
        .overview-content h2 { font-size: 26px; margin-bottom: 10px; }
        /* Password Modal Styles */
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal { background: white; padding: 32px; border-radius: 8px; width: 100%; max-width: 400px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
        .modal h3 { margin: 0 0 20px 0; color: #111827; }
        .form-group { margin-bottom: 16px; }
        .form-group label { display: block; margin-bottom: 4px; font-weight: 500; color: #374151; }
        .form-group input { width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 14px; }
        .form-group input:focus { outline: none; border-color: #3b82f6; }
        .error { color: #ef4444; font-size: 12px; margin-top: 4px; }
        .modal-buttons { display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px; }
        .btn { padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; transition: background 0.2s; }
        .btn-primary { background: #3b82f6; color: white; }
        .btn-primary:hover { background: #2563eb; }
        .btn-secondary { background: #f3f4f6; color: #374151; }
        .btn-secondary:hover { background: #e5e7eb; }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>

      <div className="dashboard">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <h1>Core HR Dashboard</h1>
          </div>

          <div className="header-actions">
            {/* 🔔 Notification Bell with ref */}
            <div 
              ref={notificationRef}
              style={{ position: 'relative' }}
            >
              {/* <div
                className={`notification-bell ${pendingUsers.length > 0 ? "red" : ""}`}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                🔔
                {pendingUsers.length > 0 && (
                  <span className="notification-count">{pendingUsers.length}</span>
                )}
              </div> */}

              {showNotifications && (
                <div className="notification-dropdown">
                  {pendingUsers.length === 0 ? (
                    <div className="notification-item">No pending users 🎉</div>
                  ) : (
                    pendingUsers.map((user) => (
                      <div key={user.id} className="notification-item">
                        <strong>{user.email}</strong> — {user.role}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <button className="action-btn" onClick={() => setActiveTab("calendar")}>
              📆 Calendar & Events
            </button>

            {/* 👤 Profile Dropdown */}
            <div 
              ref={profileRef}
              className="profile-btn"
            >
              <button 
                className="action-btn" 
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                👤 {userEmail || "HR Admin"}
              </button>
              {showProfileDropdown && (
                <div className="dropdown">
                  <div 
                    className="dropdown-item" 
                    onClick={() => {
                      setShowProfileDropdown(false);
                      setShowPasswordModal(true);
                    }}
                  >
                    🔒 Change Password
                  </div>
                  {/* Add more profile options here if needed */}
                </div>
              )}
            </div>

            <button
              className="action-btn logout-btn"
              onClick={() => {
                if (window.confirm("Are you sure you want to logout?")) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Tabs */}
        <nav className="tab-bar">
          {tabs.map((tab) => (
            <div
              key={tab.key}
              className={`tab-item ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </div>
          ))}
        </nav>

        {/* Main Content */}
        <main className="content">{renderTab()}</main>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Change Password</h3>
            <form onSubmit={handlePasswordChange}>
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmNewPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmNewPassword"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
                {passwordError && <div className="error">{passwordError}</div>}
              </div>
              <div className="modal-buttons">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowPasswordModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isUpdatingPassword}
                >
                  {isUpdatingPassword ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default HRDashboard;