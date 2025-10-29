// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import Swal from "sweetalert2";

// // function Register() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [role, setRole] = useState("EMPLOYEE");
// //   const navigate = useNavigate();

// //   const handleRegister = async (e) => {
// //     e.preventDefault();
// //     if (!email || !password) {
// //       Swal.fire("Warning", "Please fill in all fields", "warning");
// //       return;
// //     }

// //     try {
// //       const response = await fetch("http://localhost:8080/api/auth/register", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email, password, role }),
// //       });

// //       const data = await response.json();
// //       if (!response.ok) throw new Error(data.message || "Registration failed");

// //       await Swal.fire("Success", "Registration successful", "success");
// //       navigate("/login");
// //     } catch (err) {
// //       Swal.fire("Error", err.message, "error");
// //     }
// //   };

// //   return (
// //     <div style={styles.container}>
// //       <div style={styles.card}>
// //         <h2 style={styles.title}>Register</h2>
// //         <form onSubmit={handleRegister} style={styles.form}>
// //           <input
// //             type="email"
// //             placeholder="Email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             style={styles.input}
// //           />
// //           <input
// //             type="password"
// //             placeholder="Password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             style={styles.input}
// //           />
// //           <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.input}>
// //             <option value="EMPLOYEE">Employee</option>
// //             <option value="HR">HR</option>
// //           </select>
// //           <button type="submit" style={styles.button}>Register</button>
// //         </form>
// //         <p style={styles.link} onClick={() => navigate("/login")}>
// //           Already have an account? Login
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // const styles = {
// //   container: {
// //     display: "flex",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     height: "100vh",
// //     width: "100vw",
// //     backgroundColor: "#f5f5f5",
// //     padding: "20px",
// //     boxSizing: "border-box",
// //   },
// //   card: {
// //     backgroundColor: "#fff",
// //     padding: "30px",
// //     borderRadius: "10px",
// //     boxShadow: "0 0 10px rgba(0,0,0,0.1)",
// //     width: "100%",
// //     maxWidth: "400px",
// //     textAlign: "center",
// //   },
// //   title: { marginBottom: "20px" },
// //   form: { display: "flex", flexDirection: "column", gap: "15px" },
// //   input: { padding: "10px", borderRadius: "5px", border: "1px solid #ccc" },
// //   button: {
// //     backgroundColor: "#28a745",
// //     color: "#fff",
// //     border: "none",
// //     padding: "10px",
// //     borderRadius: "5px",
// //     cursor: "pointer",
// //   },
// //   link: { marginTop: "15px", color: "#28a745", cursor: "pointer", fontSize: "14px" },
// // };

// // export default Register;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("EMPLOYEE");
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!email || !password) {
//       Swal.fire("Warning", "Please fill in all fields", "warning");
//       return;
//     }

//     // ✅ Restrict to @venturebiz.in domain only
//     if (!email.endsWith("@venturebiz.in")) {
//       Swal.fire("Invalid Email", "Only @venturebiz.in emails are allowed", "error");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:8080/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password, role }),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || "Registration failed");

//       await Swal.fire("Success", "Registration successful", "success");
//       navigate("/login");
//     } catch (err) {
//       Swal.fire("Error", err.message, "error");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2 style={styles.title}>Register</h2>
//         <form onSubmit={handleRegister} style={styles.form}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             style={styles.input}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             style={styles.input}
//           />
//           <select
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             style={styles.input}
//           >
//             <option value="EMPLOYEE">Employee</option>
//             <option value="HR">HR</option>
//           </select>
//           <button type="submit" style={styles.button}>
//             Register
//           </button>
//         </form>
//         <p style={styles.link} onClick={() => navigate("/login")}>
//           Already have an account? Login
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
//     padding: "20px",
//     boxSizing: "border-box",
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
//     backgroundColor: "#28a745",
//     color: "#fff",
//     border: "none",
//     padding: "10px",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
//   link: {
//     marginTop: "15px",
//     color: "#28a745",
//     cursor: "pointer",
//     fontSize: "14px",
//   },
// };

// export default Register;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import companyLogo from "../assets/download.png"; // ✅ same image as Login page

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role] = useState("EMPLOYEE"); // ✅ Default role shown in input field
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire("Warning", "Please fill in all fields", "warning");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");

      await Swal.fire("Success", "Registration successful ✅", "success");
      navigate("/login");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div style={styles.container}>
      {/* Left Panel (Brand/Visual) */}
      <div style={styles.leftPanel}>
        <div style={styles.overlay}>
          <img src={companyLogo} alt="Company Logo" style={styles.leftLogo} />
          <h1 style={styles.brandTitle}>Welcome to Venturebiz Portal</h1>
          <p style={styles.brandSubtitle}>
            Manage your employee lifecycle with ease and security.
          </p>
        </div>
      </div>

      {/* Right Panel (Form) */}
      <div style={styles.rightPanel}>
        <div style={styles.formContainer}>
          <img src={companyLogo} alt="Company Logo" style={styles.logo} />

          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Join our digital workspace today</p>

          <form onSubmit={handleRegister} style={styles.form}>
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

            {/* ✅ Input field showing 'EMPLOYEE' by default (not editable) */}
            <input
              type="text"
              value={role}
              style={{ ...styles.input, backgroundColor: "#f0f0f0", color: "#555" }}
              readOnly
            />

            <button type="submit" style={styles.button}>
              Register
            </button>
          </form>

          <p style={styles.link}>
            Already have an account?{" "}
            <span
              style={styles.linkHighlight}
              onClick={() => navigate("/login")}
            >
              Login here
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
      "url('https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?auto=format&fit=crop&w=1500&q=80')",
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
    maxWidth: "400px",
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

export default Register;