// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// function Login({ onLogin }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       Swal.fire("Warning", "Please fill in all fields", "warning");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:8080/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const text = await res.text();
//       const data = text ? JSON.parse(text) : {};

//       if (!res.ok) throw new Error(data.message || "Login failed");

//       const { token, role, employeeCode } = data;

//       if (!token || !role) throw new Error("Invalid server response");

//       // Save token and role
//       localStorage.setItem("token", token);
//       localStorage.setItem("email", email);
//       localStorage.setItem("role", role);

//       // Save employeeCode only if user is EMPLOYEE
//       if (role === "EMPLOYEE" && employeeCode) {
//         localStorage.setItem("employeeCode", employeeCode);
//       }

//       onLogin({ email, role, token, employeeCode });

//       await Swal.fire("Success", "Login successful ✅", "success");

//       // Navigate based on role
//       if (role === "HR") {
//         navigate("/hr-dashboard");
//       } else if (role === "EMPLOYEE") {
//         navigate("/employee-dashboard");
//       } else {
//         navigate("/"); // fallback
//       }
//     } catch (err) {
//       Swal.fire("Error", err.message || "Login failed ❌", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2 style={styles.title}>Login</h2>
//         <form onSubmit={handleLogin} style={styles.form}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             style={styles.input}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             style={styles.input}
//             required
//           />
//           <button type="submit" style={styles.button} disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//         <p style={styles.link} onClick={() => navigate("/register")}>
//           Don’t have an account? Register
//         </p>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100vh",
//     width: "100vw",
//     backgroundColor: "#f5f5f5",
//   },
//   card: {
//     backgroundColor: "#fff",
//     padding: "30px",
//     borderRadius: "10px",
//     boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//     width: "100%",
//     maxWidth: "400px",
//     textAlign: "center",
//   },
//   title: { marginBottom: "20px" },
//   form: { display: "flex", flexDirection: "column", gap: "15px" },
//   input: { padding: "10px", borderRadius: "5px", border: "1px solid #ccc" },
//   button: {
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     padding: "10px",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
//   link: {
//     marginTop: "15px",
//     color: "#007bff",
//     cursor: "pointer",
//     fontSize: "14px",
//   },
// };

// export default Login;

// import { } from "framer-motion/m";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import Company Logo from "../assets/download.png"
// function Login({ onLogin }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       Swal.fire("Warning", "Please fill in all fields", "warning");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:8080/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const text = await res.text();
//       const data = text ? JSON.parse(text) : {};

//       if (!res.ok) throw new Error(data.message || "Login failed");

//       const { token, role, employeeCode } = data;
//       if (!token || !role) throw new Error("Invalid server response");

//       localStorage.setItem("token", token);
//       localStorage.setItem("email", email);
//       localStorage.setItem("role", role);
//       if (role === "EMPLOYEE" && employeeCode) {
//         localStorage.setItem("employeeCode", employeeCode);
//       }

//       onLogin({ email, role, token, employeeCode });
//       await Swal.fire("Success", "Login successful ✅", "success");

//       if (role === "HR") navigate("/hr-dashboard");
//       else if (role === "EMPLOYEE") navigate("/employee-dashboard");
//       else navigate("/");
//     } catch (err) {
//       Swal.fire("Error", err.message || "Login failed ❌", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       {/* Left Side (Image Panel) */}
//       <div style={styles.leftPanel}>
//         <div style={styles.overlay}>
//           {/* Optional: Add a small logo on left panel */}
//           <img
//             src="/assets/download.png" // ✅ place your logo inside public/assets
//             alt="Company Logo"
//             style={styles.leftLogo}
//           />
//           <h1 style={styles.brandTitle}>Welcome to the HR Portal</h1>
//           <p style={styles.brandSubtitle}>
//             Empowering employees and HR teams to connect, collaborate, and grow together.
//           </p>
//         </div>
//       </div>

//       {/* Right Side (Form Panel) */}
//       <div style={styles.rightPanel}>
//         <div style={styles.formContainer}>
//           {/* ✅ Add logo above Sign In */}
//           <img
//             src="/assets/company-logo.png" // place your logo in public/assets
//             alt="Company Logo"
//             style={styles.logo}
//           />

//           <h2 style={styles.title}>Sign In</h2>
//           <p style={styles.subtitle}>Access your dashboard</p>

//           <form onSubmit={handleLogin} style={styles.form}>
//             <input
//               type="email"
//               placeholder="Work Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               style={styles.input}
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               style={styles.input}
//               required
//             />
//             <button type="submit" style={styles.button} disabled={loading}>
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>

//           <p style={styles.link}>
//             Don’t have an account?{" "}
//             <span
//               style={styles.linkHighlight}
//               onClick={() => navigate("/register")}
//             >
//               Register here
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     display: "flex",
//     height: "100vh",
//     width: "100vw",
//     fontFamily: "'Poppins', sans-serif",
//   },
//   leftPanel: {
//     flex: 1,
//     backgroundImage:
//       "url('https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=1600&q=80')",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     position: "relative",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     color: "#fff",
//   },
//   overlay: {
//     backgroundColor: "rgba(0, 0, 0, 0.55)",
//     padding: "60px",
//     borderRadius: "12px",
//     textAlign: "center",
//     maxWidth: "420px",
//   },
//   leftLogo: {
//     width: "90px",
//     marginBottom: "15px",
//   },
//   brandTitle: {
//     fontSize: "2.2rem",
//     fontWeight: "700",
//     marginBottom: "15px",
//   },
//   brandSubtitle: {
//     fontSize: "1rem",
//     lineHeight: "1.6",
//     color: "#ddd",
//   },
//   rightPanel: {
//     flex: 1,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f8f9fc",
//   },
//   formContainer: {
//     backgroundColor: "#fff",
//     padding: "40px 50px",
//     borderRadius: "12px",
//     boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
//     width: "100%",
//     maxWidth: "400px",
//     textAlign: "center",
//   },
//   logo: {
//     width: "100px",
//     marginBottom: "15px",
//   },
//   title: {
//     fontSize: "1.8rem",
//     marginBottom: "10px",
//     color: "#333",
//     fontWeight: "600",
//   },
//   subtitle: {
//     color: "#777",
//     fontSize: "0.95rem",
//     marginBottom: "25px",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "15px",
//   },
//   input: {
//     padding: "12px",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//     outline: "none",
//     fontSize: "14px",
//     transition: "border-color 0.2s, box-shadow 0.2s",
//   },
//   button: {
//     background: "linear-gradient(90deg, #007bff, #6610f2)",
//     color: "#fff",
//     border: "none",
//     padding: "12px",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontWeight: "600",
//     letterSpacing: "0.5px",
//     transition: "transform 0.2s ease, opacity 0.3s ease",
//   },
//   link: {
//     marginTop: "20px",
//     color: "#555",
//     fontSize: "14px",
//   },
//   linkHighlight: {
//     color: "#007bff",
//     fontWeight: "600",
//     cursor: "pointer",
//   },
// };

// export default Login;
import {} from "framer-motion/m";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import companyLogo from "../assets/download.png"; // ✅ Corrected import

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire("Warning", "Please fill in all fields", "warning");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (!res.ok) throw new Error(data.message || "Login failed");

      const { token, role, employeeCode } = data;
      if (!token || !role) throw new Error("Invalid server response");

      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("role", role);
      if (role === "EMPLOYEE" && employeeCode) {
        localStorage.setItem("employeeCode", employeeCode);
      }

      onLogin({ email, role, token, employeeCode });
      await Swal.fire("Success", "Login successful ✅", "success");

      if (role === "HR") navigate("/hr-dashboard");
      else if (role === "EMPLOYEE") navigate("/employee-dashboard");
      else navigate("/");
    } catch (err) {
      Swal.fire("Error", err.message || "Login failed ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Left Side (Image Panel) */}
      <div style={styles.leftPanel}>
        <div style={styles.overlay}>
          {/* ✅ Left panel logo */}
          <img
            src={companyLogo}
            alt="Company Logo"
            style={styles.leftLogo}
          />
          <h1 style={styles.brandTitle}>Welcome to the Venturebiz Portal</h1>
          <p style={styles.brandSubtitle}>
            Empowering employees and HR teams to connect, collaborate, and grow together.
          </p>
        </div>
      </div>

      {/* Right Side (Form Panel) */}
      <div style={styles.rightPanel}>
        <div style={styles.formContainer}>
          {/* ✅ Top logo above Sign In */}
          <img
            src={companyLogo}
            alt="Company Logo"
            style={styles.logo}
          />

          <h2 style={styles.title}>Sign In</h2>
          <p style={styles.subtitle}>Access your dashboard</p>

          <form onSubmit={handleLogin} style={styles.form}>
            <input
              type="email"
              placeholder="Work Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p style={styles.link}>
            Don’t have an account?{" "}
            <span
              style={styles.linkHighlight}
              onClick={() => navigate("/register")}
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    fontFamily: "'Poppins', sans-serif",
  },
  leftPanel: {
    flex: 1,
    backgroundImage:
      "url('https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=1600&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    padding: "60px",
    borderRadius: "12px",
    textAlign: "center",
    maxWidth: "420px",
  },
  leftLogo: {
    width: "90px",
    marginBottom: "15px",
  },
  brandTitle: {
    fontSize: "2.2rem",
    fontWeight: "700",
    marginBottom: "15px",
  },
  brandSubtitle: {
    fontSize: "1rem",
    lineHeight: "1.6",
    color: "#ddd",
  },
  rightPanel: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fc",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: "40px 50px",
    borderRadius: "12px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  logo: {
    width: "100px",
    marginBottom: "15px",
  },
  title: {
    fontSize: "1.8rem",
    marginBottom: "10px",
    color: "#333",
    fontWeight: "600",
  },
  subtitle: {
    color: "#777",
    fontSize: "0.95rem",
    marginBottom: "25px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  button: {
    background: "linear-gradient(90deg, #007bff, #6610f2)",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    letterSpacing: "0.5px",
    transition: "transform 0.2s ease, opacity 0.3s ease",
  },
  link: {
    marginTop: "20px",
    color: "#555",
    fontSize: "14px",
  },
  linkHighlight: {
    color: "#007bff",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Login;