// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Profile = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // ✅ Load token from localStorage
//   const token = localStorage.getItem("token");

//   // ✅ Redirect to login if no token
//   useEffect(() => {
//     if (!token) {
//       window.location.href = "/login"; // or your login route
//     }
//   }, [token]);

//   // ✅ Fetch profile from backend
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8080/api/employee/me",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setProfile(response.data);
//       } catch (err) {
//         console.error("❌ Failed to load profile:", err);
//         if (err.response?.status === 401) {
//           setError("Session expired. Please log in again.");
//           localStorage.removeItem("token");
//           setTimeout(() => (window.location.href = "/login"), 2000);
//         } else if (err.response?.status === 404) {
//           setError("Profile not found. Please contact HR.");
//         } else {
//           setError("Unable to load profile. Please try again later.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (token) fetchProfile();
//   }, [token]);

//   // ✅ Loading state
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <p className="text-lg font-medium text-gray-600 animate-pulse">
//           Loading your profile...
//         </p>
//       </div>
//     );
//   }

//   // ✅ Error state
//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <div className="bg-white shadow-md rounded-xl p-6 text-center max-w-md">
//           <p className="text-red-600 font-medium mb-2">{error}</p>
//           <button
//             onClick={() => (window.location.href = "/login")}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg mt-3"
//           >
//             Go to Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ✅ Profile data
//   return (
//     <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
//       <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
//           My Profile
//         </h2>

//         <div className="grid grid-cols-2 gap-4 text-gray-700">
//           <p>
//             <strong>Name:</strong> {profile.name || "—"}
//           </p>
//           <p>
//             <strong>Email:</strong> {profile.userEmail || profile.user?.email || "—"}
//           </p>
//           <p>
//             <strong>Employee ID:</strong> {profile.employeeId || "—"}
//           </p>
//           <p>
//             <strong>Department:</strong> {profile.department || "—"}
//           </p>
//           <p>
//             <strong>Role:</strong> {profile.deptRole || "—"}
//           </p>
//           <p>
//             <strong>Status:</strong> {profile.status || "—"}
//           </p>
//           <p>
//             <strong>Date of Joining:</strong>{" "}
//             {profile.dateOfJoining || "—"}
//           </p>
//         </div>

//         <div className="mt-8 text-center">
//           <button
//             onClick={() => window.history.back()}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
//           >
//             ← Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Modern navigation hook

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // ✅ Redirect if no token
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  // ✅ Fetch profile data
  const fetchProfile = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/employee/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(response.data);
    } catch (err) {
      console.error("❌ Profile fetch error:", err);
      if (err.response?.status === 401) {
        setError("Session expired. Please log in again.");
        localStorage.removeItem("token");
        setTimeout(() => navigate("/login"), 2000);
      } else if (err.response?.status === 404) {
        setError("Profile not found. Please contact HR.");
      } else {
        setError("Unable to load profile. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchProfile();
  }, [token]);

  // ✅ Loading skeletons
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-64"></div>
          <div className="h-6 bg-gray-200 rounded w-48"></div>
          <div className="h-6 bg-gray-200 rounded w-56"></div>
        </div>
      </div>
    );
  }

  // ✅ Error state with retry
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="bg-white shadow-md rounded-xl p-6 text-center max-w-md">
          <p className="text-red-600 font-semibold mb-4">{error}</p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
              Go to Login
            </button>
            <button
              onClick={() => {
                setError("");
                setLoading(true);
                fetchProfile();
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-lg"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Profile UI
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl">
        <div className="flex items-center gap-6 mb-6 border-b pb-4">
          {profile.profilePicture ? (
            <img
              src={profile.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl font-bold">
              {profile.name?.[0]?.toUpperCase() || "?"}
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {profile.name || "Unnamed"}
            </h2>
            <p className="text-gray-500">{profile.userEmail || profile.user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-gray-700">
          <p>
            <strong>Employee ID:</strong> {profile.employeeId || "—"}
          </p>
          <p>
            <strong>Department:</strong> {profile.department || "—"}
          </p>
          <p>
            <strong>Role:</strong> {profile.deptRole || "—"}
          </p>
          <p>
            <strong>Status:</strong> {profile.status || "—"}
          </p>
          <p>
            <strong>Date of Joining:</strong> {profile.dateOfJoining || "—"}
          </p>
          {profile.manager && (
            <p>
              <strong>Manager:</strong> {profile.manager.name || "—"}
            </p>
          )}
        </div>

        <div className="mt-8 text-center">
       
        </div>
      </div>
    </div>
  );
};

export default Profile;
