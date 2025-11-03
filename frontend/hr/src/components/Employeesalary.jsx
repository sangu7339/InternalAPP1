// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import jsPDF from "jspdf";
// // // import autoTable from "jspdf-autotable";
// // // import companyLogo from "./download.png"; // ✅ import logo

// // // const EmployeeSalary = () => {
// // //   const [monthlySalaries, setMonthlySalaries] = useState([]);
// // //   const [selectedMonth, setSelectedMonth] = useState("");
// // //   const [message, setMessage] = useState("");
// // //   const [salaryPackage, setSalaryPackage] = useState(null); // to show LOP and bank info

// // //   const token = localStorage.getItem("token");
// // //   const email = localStorage.getItem("email");
// // //   const axiosConfig = token ? { headers: { Authorization: `Bearer ${token}` } } : null;

// // //   // Fetch monthly salaries
// // //   const fetchMonthlySalaries = async () => {
// // //     if (!axiosConfig || !email) return;
// // //     try {
// // //       const res = await axios.get(
// // //         `http://localhost:8080/api/employee/salary/mymonthsalary?email=${email}`,
// // //         axiosConfig
// // //       );
// // //       setMonthlySalaries(res.data || []);
// // //     } catch (err) {
// // //       console.error(err);
// // //       setMessage("Error fetching monthly salaries.");
// // //     }
// // //   };

// // //   // Fetch salary package
// // //   const fetchSalaryPackage = async () => {
// // //     if (!axiosConfig || !email) return;
// // //     try {
// // //       const res = await axios.get(
// // //         `http://localhost:8080/api/employee/salary/mypackage?email=${email}`,
// // //         axiosConfig
// // //       );
// // //       setSalaryPackage(res.data);
// // //     } catch (err) {
// // //       console.error("Error fetching salary package:", err);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchMonthlySalaries();
// // //     fetchSalaryPackage();
// // //   }, []);

// // //   const filteredSalary = monthlySalaries.find((ms) => ms.month === selectedMonth);

// // //   const downloadPayslipPDF = () => {
// // //     if (!filteredSalary) return;

// // //     const doc = new jsPDF();

// // //     // ✅ Add company logo
// // //     const imgProps = doc.getImageProperties(companyLogo);
// // //     const pdfWidth = doc.internal.pageSize.getWidth();
// // //     const logoWidth = 20;
// // //     const logoHeight = (imgProps.height * logoWidth) / imgProps.width;
// // //     doc.addImage(companyLogo, "PNG", pdfWidth / 2 - logoWidth / 2, 10, logoWidth, logoHeight);

// // //     doc.setFontSize(16);
// // //     doc.text("Venturebiz Promotions Private Limited", pdfWidth / 2, 35, { align: "center" });
// // //     doc.setFontSize(12);
// // //     doc.text(`Payslip for ${filteredSalary.month}`, pdfWidth / 2, 42, { align: "center" });
// // //     doc.text("Location: Bengaluru", pdfWidth / 2, 49, { align: "center" });

// // //     // Employee Details
// // //     const employee = filteredSalary.employee || {};
// // //     const employeeDetails = [
// // //       ["Name", employee.name || "-"],
// // //       ["Date of Joining", employee.dateOfJoining || "-"],
// // //       ["Designation", employee.deptRole || "-"],
// // //       ["Department", employee.department || "-"],
// // //       ["Total Work Days", filteredSalary.totalWorkingDays || 0],
// // //       ["Actual Work Days", filteredSalary.workedDays || 0],
// // //     ];

// // //     // Compliance & Banking Info
// // //     if (salaryPackage) {
// // //       employeeDetails.push(["Bank Name", salaryPackage.bankName || "-"]);
// // //       employeeDetails.push(["Account Number", salaryPackage.accountNumber || "-"]);
// // //       employeeDetails.push(["PF Number", salaryPackage.pfNumber || "-"]);
// // //       employeeDetails.push(["UAN Number", salaryPackage.uanNumber || "-"]);
// // //       employeeDetails.push(["ESI Number", salaryPackage.esiNumber || "-"]);
// // //       employeeDetails.push(["PAN Number", salaryPackage.panNumber || "-"]);
// // //       employeeDetails.push(["Loss of Pay (LOP)", salaryPackage.lop?.toFixed(2) || "0.00"]);
// // //     }

// // //     autoTable(doc, {
// // //       startY: 55,
// // //       head: [],
// // //       body: employeeDetails,
// // //       styles: { fontSize: 10 },
// // //     });

// // //     // Earnings & Deductions
// // //     const lopDeduction = salaryPackage?.lop || 0;
// // //     const totalDeductions = (filteredSalary.pfContributionEmployer || 0) +
// // //                             (filteredSalary.professionalTax || 0) +
// // //                             lopDeduction;

// // //     const earningsDeductions = [
// // //       [
// // //         "Basic",
// // //         filteredSalary.basic?.toFixed(2) || "0.00",
// // //         "PF",
// // //         filteredSalary.pfContributionEmployer?.toFixed(2) || "0.00",
// // //       ],
// // //       [
// // //         "Flexible Benefit Plan",
// // //         filteredSalary.flexibleBenefitPlan?.toFixed(2) || "0.00",
// // //         "Professional Tax",
// // //         filteredSalary.professionalTax?.toFixed(2) || "0.00",
// // //       ],
// // //       ["Special Allowance", filteredSalary.specialAllowance?.toFixed(2) || "0.00", "LOP Deduction", lopDeduction.toFixed(2)],
// // //       [
// // //         "Total Earnings",
// // //         filteredSalary.grossSalary?.toFixed(2) || "0.00",
// // //         "Total Deductions",
// // //         totalDeductions.toFixed(2),
// // //       ],
// // //       ["Net Pay", "", "", (filteredSalary.grossSalary - totalDeductions)?.toFixed(2) || "0.00"],
// // //     ];

// // //     autoTable(doc, {
// // //       startY: doc.lastAutoTable.finalY + 10,
// // //       head: [["Earnings", "Amount", "Deductions", "Amount"]],
// // //       body: earningsDeductions,
// // //       styles: { fontSize: 10 },
// // //       headStyles: { fillColor: [220, 220, 220] },
// // //     });

// // //     doc.setFontSize(10);
// // //     doc.text(
// // //       "This is a system generated payslip and does not require signature",
// // //       pdfWidth / 2,
// // //       doc.lastAutoTable.finalY + 15,
// // //       { align: "center" }
// // //     );

// // //     doc.save(`Payslip_${filteredSalary.month}.pdf`);
// // //   };

// // //   return (
// // //     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
// // //       <h2>My Salary Details</h2>
// // //       {message && <p style={{ color: "red" }}>{message}</p>}

// // //       {/* Total Work Days & Actual Work Days */}
// // //       {filteredSalary && (
// // //         <div style={{ marginBottom: "20px" }}>
// // //           <p><strong>Total Work Days:</strong> {filteredSalary.totalWorkingDays}</p>
// // //           <p><strong>Actual Work Days:</strong> {filteredSalary.workedDays}</p>
// // //         </div>
// // //       )}

// // //       {/* Month Selector */}
// // //       <label>
// // //         Select Month:
// // //         <select
// // //           value={selectedMonth}
// // //           onChange={(e) => setSelectedMonth(e.target.value)}
// // //           style={{ marginLeft: "10px", padding: "5px" }}
// // //         >
// // //           <option value="">--Select--</option>
// // //           {monthlySalaries.map((ms) => (
// // //             <option key={ms.id} value={ms.month}>
// // //               {ms.month}
// // //             </option>
// // //           ))}
// // //         </select>
// // //       </label>

// // //       {/* Salary Table */}
// // //       <table
// // //         border="1"
// // //         cellPadding="5"
// // //         style={{ width: "100%", marginTop: "15px", borderCollapse: "collapse" }}
// // //       >
// // //         <thead>
// // //           <tr style={{ backgroundColor: "#f0f0f0" }}>
// // //             <th>Month</th>
// // //             <th>Basic</th>
// // //             <th>Allowance</th>
// // //             <th>PF</th>
// // //             <th>Tax</th>
// // //             <th>LOP Deduction</th>
// // //             <th>Gross</th>
// // //             <th>Net</th>
// // //             <th>Total Work Days</th>
// // //             <th>Actual Work Days</th>
// // //             <th>Status</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {monthlySalaries.length > 0 ? (
// // //             monthlySalaries.map((ms) => (
// // //               <tr key={ms.id}>
// // //                 <td>{ms.month}</td>
// // //                 <td>{ms.basic?.toFixed(2) || "0.00"}</td>
// // //                 <td>{((ms.flexibleBenefitPlan || 0) + (ms.specialAllowance || 0)).toFixed(2)}</td>
// // //                 <td>{ms.pfContributionEmployer?.toFixed(2) || "0.00"}</td>
// // //                 <td>{ms.professionalTax?.toFixed(2) || "0.00"}</td>
// // //                 <td>{salaryPackage?.lop?.toFixed(2) || "0.00"}</td>
// // //                 <td>{ms.grossSalary?.toFixed(2) || "0.00"}</td>
// // //                 <td>{(ms.grossSalary - (ms.pfContributionEmployer + ms.professionalTax + (salaryPackage?.lop || 0)))?.toFixed(2) || "0.00"}</td>
// // //                 <td>{ms.totalWorkingDays}</td>
// // //                 <td>{ms.workedDays}</td>
// // //                 <td>{ms.status || "-"}</td>
// // //               </tr>
// // //             ))
// // //           ) : (
// // //             <tr>
// // //               <td colSpan="11" style={{ textAlign: "center", padding: 10 }}>
// // //                 No salary data found.
// // //               </td>
// // //             </tr>
// // //           )}
// // //         </tbody>
// // //       </table>

// // //       {/* Download PDF */}
// // //       <button
// // //         onClick={downloadPayslipPDF}
// // //         disabled={!selectedMonth || !filteredSalary}
// // //         style={{
// // //           marginTop: "20px",
// // //           padding: "10px 20px",
// // //           backgroundColor: "#007bff",
// // //           color: "#fff",
// // //           border: "none",
// // //           cursor: "pointer",
// // //           borderRadius: "5px",
// // //         }}
// // //       >
// // //         Download Payslip as PDF
// // //       </button>
// // //     </div>
// // //   );
// // // };

// // // export default EmployeeSalary;

// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import jsPDF from "jspdf";
// // import autoTable from "jspdf-autotable";
// // import companyLogo from "./download.png";

// // const EmployeeSalary = () => {
// //   const [monthlySalaries, setMonthlySalaries] = useState([]);
// //   const [selectedMonth, setSelectedMonth] = useState("");
// //   const [message, setMessage] = useState("");
// //   const [salaryPackage, setSalaryPackage] = useState(null);

// //   const token = localStorage.getItem("token");
// //   const email = localStorage.getItem("email");
// //   const axiosConfig = token ? { headers: { Authorization: `Bearer ${token}` } } : null;

// //   const fetchMonthlySalaries = async () => {
// //     if (!axiosConfig || !email) return;
// //     try {
// //       const res = await axios.get(
// //         `http://localhost:8080/api/employee/salary/mymonthsalary?email=${email}`,
// //         axiosConfig
// //       );
// //       setMonthlySalaries(res.data || []);
// //     } catch (err) {
// //       console.error(err);
// //       setMessage("Error fetching monthly salaries.");
// //     }
// //   };

// //   const fetchSalaryPackage = async () => {
// //     if (!axiosConfig || !email) return;
// //     try {
// //       const res = await axios.get(
// //         `http://localhost:8080/api/employee/salary/mypackage?email=${email}`,
// //         axiosConfig
// //       );
// //       setSalaryPackage(res.data);
// //     } catch (err) {
// //       console.error("Error fetching salary package:", err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchMonthlySalaries();
// //     fetchSalaryPackage();
// //   }, []);

// //   const filteredSalary = monthlySalaries.find((ms) => ms.month === selectedMonth);

// //   const downloadPayslipPDF = () => {
// //     if (!filteredSalary) return;

// //     const doc = new jsPDF();
// //     const pdfWidth = doc.internal.pageSize.getWidth();

// //     // Company logo
// //     const imgProps = doc.getImageProperties(companyLogo);
// //     const logoWidth = 25;
// //     const logoHeight = (imgProps.height * logoWidth) / imgProps.width;
// //     doc.addImage(companyLogo, "PNG", pdfWidth / 2 - logoWidth / 2, 10, logoWidth, logoHeight);

// //     // Header
// //     doc.setFontSize(16);
// //     doc.text("Venturebiz Promotions Private Limited", pdfWidth / 2, 40, { align: "center" });
// //     doc.setFontSize(12);
// //     doc.text(`Payslip for ${filteredSalary.month}`, pdfWidth / 2, 48, { align: "center" });

// //     // Employee Details (2 columns per row)
// //     const employee = filteredSalary.employee || {};
// //     const employeeDetails = [
// //       ["Name", employee.name || "-", "Date of Joining", employee.dateOfJoining || "-"],
// //       ["Designation", employee.deptRole || "-", "Department", employee.department || "-"],
// //       ["Total Work Days", filteredSalary.totalWorkingDays || 0, "Actual Work Days", filteredSalary.workedDays || 0],
// //       ["Location", "Bengaluru", "Bank Name", salaryPackage?.bankName || "-"],
// //       ["Account Number", salaryPackage?.accountNumber || "-", "PF Number", salaryPackage?.pfNumber || "-"],
// //       ["UAN Number", salaryPackage?.uanNumber || "-", "ESI Number", salaryPackage?.esiNumber || "-"],
// //       ["PAN Number", salaryPackage?.panNumber || "-", "LOP", salaryPackage?.lop?.toFixed(2) || "0.00"],
// //     ];

// //     autoTable(doc, {
// //       startY: 65,
// //       head: [],
// //       body: employeeDetails,
// //       theme: "grid",
// //       styles: { fontSize: 10 },
// //     });

// //     // Earnings & Deductions
// //     const lopDeduction = salaryPackage?.lop || 0;
// //     const totalDeductions =
// //       (filteredSalary.pfContributionEmployer || 0) +
// //       (filteredSalary.professionalTax || 0) +
// //       lopDeduction;

// //     const earningsDeductions = [
// //       ["Basic", filteredSalary.basic?.toFixed(2) || "0.00", "PF", filteredSalary.pfContributionEmployer?.toFixed(2) || "0.00"],
// //       ["Flexible Benefit Plan", filteredSalary.flexibleBenefitPlan?.toFixed(2) || "0.00", "Professional Tax", filteredSalary.professionalTax?.toFixed(2) || "0.00"],
// //       ["Special Allowance", filteredSalary.specialAllowance?.toFixed(2) || "0.00", "LOP Deduction", lopDeduction.toFixed(2)],
// //       ["Total Earnings", filteredSalary.grossSalary?.toFixed(2) || "0.00", "Total Deductions", totalDeductions.toFixed(2)],
// //       ["Net Pay", "", "", (filteredSalary.grossSalary - totalDeductions)?.toFixed(2) || "0.00"],
// //     ];

// //     autoTable(doc, {
// //       startY: doc.lastAutoTable.finalY + 10,
// //       head: [["Earnings", "Amount", "Deductions", "Amount"]],
// //       body: earningsDeductions,
// //       styles: { fontSize: 10 },
// //       headStyles: { fillColor: [50, 50, 50], textColor: [255, 255, 255] }, // Dark header
// //     });

// //     doc.setFontSize(10);
// //     doc.text(
// //       "This is a system generated payslip and does not require signature",
// //       pdfWidth / 2,
// //       doc.lastAutoTable.finalY + 15,
// //       { align: "center" }
// //     );

// //     doc.save(`Payslip_${filteredSalary.month}.pdf`);
// //   };

// //   return (
// //     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
// //       <h2>My Salary Details</h2>
// //       {message && <p style={{ color: "red" }}>{message}</p>}

// //       {/* Month Selector */}
// //       <div style={{ marginBottom: "20px" }}>
// //         <label>
// //           Select Month:
// //           <select
// //             value={selectedMonth}
// //             onChange={(e) => setSelectedMonth(e.target.value)}
// //             style={{ marginLeft: "10px", padding: "5px" }}
// //           >
// //             <option value="">--Select--</option>
// //             {monthlySalaries.map((ms) => (
// //               <option key={ms.id} value={ms.month}>
// //                 {ms.month}
// //               </option>
// //             ))}
// //           </select>
// //         </label>
// //       </div>

// //       {/* Salary Table */}
// //       <table
// //         border="1"
// //         cellPadding="5"
// //         style={{ width: "100%", marginTop: "15px", borderCollapse: "collapse" }}
// //       >
// //         <thead>
// //           <tr style={{ backgroundColor: "#f0f0f0" }}>
// //             <th>Month</th>
// //             <th>Basic</th>
// //             <th>Allowance</th>
// //             <th>PF</th>
// //             <th>Tax</th>
// //             <th>LOP Deduction</th>
// //             <th>Gross</th>
// //             <th>Net</th>
// //             <th>Total Work Days</th>
// //             <th>Actual Work Days</th>
// //             <th>Status</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {monthlySalaries.length > 0 ? (
// //             monthlySalaries.map((ms) => (
// //               <tr key={ms.id} style={{ textAlign: "center" }}>
// //                 <td>{ms.month}</td>
// //                 <td>{ms.basic?.toFixed(2) || "0.00"}</td>
// //                 <td>{((ms.flexibleBenefitPlan || 0) + (ms.specialAllowance || 0)).toFixed(2)}</td>
// //                 <td>{ms.pfContributionEmployer?.toFixed(2) || "0.00"}</td>
// //                 <td>{ms.professionalTax?.toFixed(2) || "0.00"}</td>
// //                 <td>{salaryPackage?.lop?.toFixed(2) || "0.00"}</td>
// //                 <td>{ms.grossSalary?.toFixed(2) || "0.00"}</td>
// //                 <td>{(ms.grossSalary - (ms.pfContributionEmployer + ms.professionalTax + (salaryPackage?.lop || 0)))?.toFixed(2) || "0.00"}</td>
// //                 <td>{ms.totalWorkingDays}</td>
// //                 <td>{ms.workedDays}</td>
// //                 <td>{ms.status || "-"}</td>
// //               </tr>
// //             ))
// //           ) : (
// //             <tr>
// //               <td colSpan="11" style={{ textAlign: "center", padding: 10 }}>
// //                 No salary data found.
// //               </td>
// //             </tr>
// //           )}
// //         </tbody>
// //       </table>

// //       {/* Download PDF */}
// //       <button
// //         onClick={downloadPayslipPDF}
// //         disabled={!selectedMonth || !filteredSalary}
// //         style={{
// //           marginTop: "20px",
// //           padding: "10px 20px",
// //           backgroundColor: "#007bff",
// //           color: "#fff",
// //           border: "none",
// //           cursor: "pointer",
// //           borderRadius: "5px",
// //         }}
// //       >
// //         Download Payslip as PDF
// //       </button>
// //     </div>
// //   );
// // };

// // export default EmployeeSalary;  


// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import jsPDF from "jspdf";
// // import autoTable from "jspdf-autotable";
// // import companyLogo from "./download.png";

// // const EmployeeSalary = () => {
// //   const [monthlySalaries, setMonthlySalaries] = useState([]);
// //   const [selectedMonth, setSelectedMonth] = useState("");
// //   const [message, setMessage] = useState("");
// //   const [salaryPackage, setSalaryPackage] = useState(null);

// //   const token = localStorage.getItem("token");
// //   const email = localStorage.getItem("email");
// //   const axiosConfig = token ? { headers: { Authorization: `Bearer ${token}` } } : null;

// //   const fetchMonthlySalaries = async () => {
// //     if (!axiosConfig || !email) return;
// //     try {
// //       const res = await axios.get(
// //         `http://localhost:8080/api/employee/salary/mymonthsalary?email=${email}`,
// //         axiosConfig
// //       );
// //       setMonthlySalaries(res.data || []);
// //     } catch (err) {
// //       console.error(err);
// //       setMessage("Error fetching monthly salaries.");
// //     }
// //   };

// //   const fetchSalaryPackage = async () => {
// //     if (!axiosConfig || !email) return;
// //     try {
// //       const res = await axios.get(
// //         `http://localhost:8080/api/employee/salary/mypackage?email=${email}`,
// //         axiosConfig
// //       );
// //       setSalaryPackage(res.data);
// //     } catch (err) {
// //       console.error("Error fetching salary package:", err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchMonthlySalaries();
// //     fetchSalaryPackage();
// //   }, []);

// //   const filteredSalary = monthlySalaries.find((ms) => ms.month === selectedMonth);

// //   // ✅ Convert number to words (simple Indian currency format)
// //   const numberToWords = (num) => {
// //     const a = [
// //       "",
// //       "One",
// //       "Two",
// //       "Three",
// //       "Four",
// //       "Five",
// //       "Six",
// //       "Seven",
// //       "Eight",
// //       "Nine",
// //       "Ten",
// //       "Eleven",
// //       "Twelve",
// //       "Thirteen",
// //       "Fourteen",
// //       "Fifteen",
// //       "Sixteen",
// //       "Seventeen",
// //       "Eighteen",
// //       "Nineteen",
// //     ];
// //     const b = [
// //       "",
// //       "",
// //       "Twenty",
// //       "Thirty",
// //       "Forty",
// //       "Fifty",
// //       "Sixty",
// //       "Seventy",
// //       "Eighty",
// //       "Ninety",
// //     ];

// //     const inWords = (n) => {
// //       if (n < 20) return a[n];
// //       if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
// //       if (n < 1000)
// //         return (
// //           a[Math.floor(n / 100)] +
// //           " Hundred" +
// //           (n % 100 === 0 ? "" : " and " + inWords(n % 100))
// //         );
// //       if (n < 100000)
// //         return (
// //           inWords(Math.floor(n / 1000)) +
// //           " Thousand" +
// //           (n % 1000 !== 0 ? " " + inWords(n % 1000) : "")
// //         );
// //       if (n < 10000000)
// //         return (
// //           inWords(Math.floor(n / 100000)) +
// //           " Lakh" +
// //           (n % 100000 !== 0 ? " " + inWords(n % 100000) : "")
// //         );
// //       return (
// //         inWords(Math.floor(n / 10000000)) +
// //         " Crore" +
// //         (n % 10000000 !== 0 ? " " + inWords(n % 10000000) : "")
// //       );
// //     };

// //     const rupees = Math.floor(num);
// //     const paise = Math.round((num - rupees) * 100);
// //     let words = inWords(rupees) + " Rupees";
// //     if (paise > 0) words += " and " + inWords(paise) + " Paise";
// //     return words + " Only";
// //   };

// //   const downloadPayslipPDF = () => {
// //     if (!filteredSalary) return;

// //     const doc = new jsPDF();
// //     const pdfWidth = doc.internal.pageSize.getWidth();

// //     // Company logo
// //     const imgProps = doc.getImageProperties(companyLogo);
// //     const logoWidth = 25;
// //     const logoHeight = (imgProps.height * logoWidth) / imgProps.width;
// //     doc.addImage(companyLogo, "PNG", pdfWidth / 2 - logoWidth / 2, 10, logoWidth, logoHeight);

// //     // Header
// //     doc.setFontSize(16);
// //     doc.text("Venturebiz Promotions Private Limited", pdfWidth / 2, 40, { align: "center" });
// //     doc.setFontSize(12);
// //     doc.text(`Payslip for ${filteredSalary.month}`, pdfWidth / 2, 48, { align: "center" });

// //     // Employee Details (2 columns per row)
// //     const employee = filteredSalary.employee || {};
// //     const employeeDetails = [
// //       ["Name", employee.name || "-", "Date of Joining", employee.dateOfJoining || "-"],
// //       ["Designation", employee.deptRole || "-", "Department", employee.department || "-"],
// //       ["Total Work Days", filteredSalary.totalWorkingDays || 0, "Actual Work Days", filteredSalary.workedDays || 0],
// //       ["Location", "Bengaluru", "Bank Name", salaryPackage?.bankName || "-"],
// //       ["Account Number", salaryPackage?.accountNumber || "-", "PF Number", salaryPackage?.pfNumber || "-"],
// //       ["UAN Number", salaryPackage?.uanNumber || "-", "ESI Number", salaryPackage?.esiNumber || "-"],
// //       ["PAN Number", salaryPackage?.panNumber || "-", "LOP", salaryPackage?.lop?.toFixed(2) || "0.00"],
// //     ];

// //     autoTable(doc, {
// //       startY: 65,
// //       head: [],
// //       body: employeeDetails,
// //       theme: "grid",
// //       styles: { fontSize: 10 },
// //     });

// //     // Earnings & Deductions
// //     const lopDeduction = salaryPackage?.lop || 0;
// //     const totalDeductions =
// //       (filteredSalary.pfContributionEmployer || 0) +
// //       (filteredSalary.professionalTax || 0) +
// //       lopDeduction;

// //     const netPay = filteredSalary.grossSalary - totalDeductions;
// //     const netPayInWords = numberToWords(netPay);

// //     const earningsDeductions = [
// //       ["Basic", filteredSalary.basic?.toFixed(2) || "0.00", "PF", filteredSalary.pfContributionEmployer?.toFixed(2) || "0.00"],
// //       ["Flexible Benefit Plan", filteredSalary.flexibleBenefitPlan?.toFixed(2) || "0.00", "Professional Tax", filteredSalary.professionalTax?.toFixed(2) || "0.00"],
// //       ["Special Allowance", filteredSalary.specialAllowance?.toFixed(2) || "0.00", "LOP Deduction", lopDeduction.toFixed(2)],
// //       ["Total Earnings", filteredSalary.grossSalary?.toFixed(2) || "0.00", "Total Deductions", totalDeductions.toFixed(2)],
// //       ["Net Pay", "", "", netPay?.toFixed(2) || "0.00"],
// //     ];

// //     autoTable(doc, {
// //       startY: doc.lastAutoTable.finalY + 10,
// //       head: [["Earnings", "Amount", "Deductions", "Amount"]],
// //       body: earningsDeductions,
// //       styles: { fontSize: 10 },
// //       headStyles: { fillColor: [50, 50, 50], textColor: [255, 255, 255] },
// //     });

// //     // ✅ Net Pay in Words
// //     doc.setFontSize(11);
// //     doc.text(`Net Pay : ${netPayInWords}`, 14, doc.lastAutoTable.finalY + 10);

// //     // Footer note
// //     doc.setFontSize(10);
// //     doc.text(
// //       "This is a system generated payslip and does not require signature",
// //       pdfWidth / 2,
// //       doc.lastAutoTable.finalY + 25,
// //       { align: "center" }
// //     );

// //     doc.save(`Payslip_${filteredSalary.month}.pdf`);
// //   };

// //   return (
// //     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
// //       <h2>My Salary Details</h2>
// //       {message && <p style={{ color: "red" }}>{message}</p>}

// //       {/* Month Selector */}
// //       <div style={{ marginBottom: "20px" }}>
// //         <label>
// //           Select Month:
// //           <select
// //             value={selectedMonth}
// //             onChange={(e) => setSelectedMonth(e.target.value)}
// //             style={{ marginLeft: "10px", padding: "5px" }}
// //           >
// //             <option value="">--Select--</option>
// //             {monthlySalaries.map((ms) => (
// //               <option key={ms.id} value={ms.month}>
// //                 {ms.month}
// //               </option>
// //             ))}
// //           </select>
// //         </label>
// //       </div>

// //       {/* Salary Table */}
// //       <table
// //         border="1"
// //         cellPadding="5"
// //         style={{ width: "100%", marginTop: "15px", borderCollapse: "collapse" }}
// //       >
// //         <thead>
// //           <tr style={{ backgroundColor: "#f0f0f0" }}>
// //             <th>Month</th>
// //             <th>Basic</th>
// //             <th>Allowance</th>
// //             <th>PF</th>
// //             <th>Tax</th>
// //             <th>LOP Deduction</th>
// //             <th>Gross</th>
// //             <th>Net</th>
// //             <th>Total Work Days</th>
// //             <th>Actual Work Days</th>
// //             <th>Status</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {monthlySalaries.length > 0 ? (
// //             monthlySalaries.map((ms) => (
// //               <tr key={ms.id} style={{ textAlign: "center" }}>
// //                 <td>{ms.month}</td>
// //                 <td>{ms.basic?.toFixed(2) || "0.00"}</td>
// //                 <td>{((ms.flexibleBenefitPlan || 0) + (ms.specialAllowance || 0)).toFixed(2)}</td>
// //                 <td>{ms.pfContributionEmployer?.toFixed(2) || "0.00"}</td>
// //                 <td>{ms.professionalTax?.toFixed(2) || "0.00"}</td>
// //                 <td>{salaryPackage?.lop?.toFixed(2) || "0.00"}</td>
// //                 <td>{ms.grossSalary?.toFixed(2) || "0.00"}</td>
// //                 <td>
// //                   {(ms.grossSalary -
// //                     (ms.pfContributionEmployer +
// //                       ms.professionalTax +
// //                       (salaryPackage?.lop || 0))
// //                   )?.toFixed(2) || "0.00"}
// //                 </td>
// //                 <td>{ms.totalWorkingDays}</td>
// //                 <td>{ms.workedDays}</td>
// //                 <td>{ms.status || "-"}</td>
// //               </tr>
// //             ))
// //           ) : (
// //             <tr>
// //               <td colSpan="11" style={{ textAlign: "center", padding: 10 }}>
// //                 No salary data found.
// //               </td>
// //             </tr>
// //           )}
// //         </tbody>
// //       </table>

// //       {/* Download PDF */}
// //       <button
// //         onClick={downloadPayslipPDF}
// //         disabled={!selectedMonth || !filteredSalary}
// //         style={{
// //           marginTop: "20px",
// //           padding: "10px 20px",
// //           backgroundColor: "#007bff",
// //           color: "#fff",
// //           border: "none",
// //           cursor: "pointer",
// //           borderRadius: "5px",
// //         }}
// //       >
// //         Download Payslip as PDF
// //       </button>
// //     </div>
// //   );
// // };

// // export default EmployeeSalary;

// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import jsPDF from "jspdf";
// // import autoTable from "jspdf-autotable";
// // import companyLogo from "./download.png";

// // const EmployeeSalary = () => {
// //   const [monthlySalaries, setMonthlySalaries] = useState([]);
// //   const [selectedMonth, setSelectedMonth] = useState("");
// //   const [message, setMessage] = useState("");
// //   const [salaryPackage, setSalaryPackage] = useState(null);
// //   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

// //   const token = localStorage.getItem("token");
// //   const email = localStorage.getItem("email");
// //   const axiosConfig = token ? { headers: { Authorization: `Bearer ${token}` } } : null;

// //   /* ---------- Data fetching ---------- */
// //   const fetchMonthlySalaries = async () => {
// //     if (!axiosConfig || !email) return;
// //     try {
// //       const res = await axios.get(
// //         `http://localhost:8080/api/employee/salary/mymonthsalary?email=${email}`,
// //         axiosConfig
// //       );
// //       setMonthlySalaries(res.data || []);
// //     } catch (err) {
// //       console.error(err);
// //       setMessage("Error fetching monthly salaries.");
// //     }
// //   };

// //   const fetchSalaryPackage = async () => {
// //     if (!axiosConfig || !email) return;
// //     try {
// //       const res = await axios.get(
// //         `http://localhost:8080/api/employee/salary/mypackage?email=${email}`,
// //         axiosConfig
// //       );
// //       setSalaryPackage(res.data);
// //     } catch (err) {
// //       console.error("Error fetching salary package:", err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchMonthlySalaries();
// //     fetchSalaryPackage();

// //     const handleResize = () => setIsMobile(window.innerWidth <= 768);
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   const filteredSalary = monthlySalaries.find((ms) => ms.month === selectedMonth);

// //   /* ---------- Number to words (Indian) ---------- */
// //   const numberToWords = (num) => {
// //     const a = [
// //       "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
// //       "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
// //       "Eighteen", "Nineteen",
// //     ];
// //     const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

// //     const inWords = (n) => {
// //       if (n < 20) return a[n];
// //       if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
// //       if (n < 1000)
// //         return a[Math.floor(n / 100)] + " Hundred" + (n % 100 === 0 ? "" : " and " + inWords(n % 100));
// //       if (n < 100000)
// //         return inWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 !== 0 ? " " + inWords(n % 1000) : "");
// //       if (n < 10000000)
// //         return inWords(Math.floor(n / 100000)) + " Lakh" + (n % 100000 !== 0 ? " " + inWords(n % 100000) : "");
// //       return inWords(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 !== 0 ? " " + inWords(n % 10000000) : "");
// //     };

// //     const rupees = Math.floor(num);
// //     const paise = Math.round((num - rupees) * 100);
// //     let words = inWords(rupees) + " Rupees";
// //     if (paise > 0) words += " and " + inWords(paise) + " Paise";
// //     return words + " Only";
// //   };

// //   /* ---------- PDF generation (unchanged) ---------- */
// //   const downloadPayslipPDF = () => {
// //     if (!filteredSalary) return;

// //     const doc = new jsPDF();
// //     const pdfWidth = doc.internal.pageSize.getWidth();

// //     const imgProps = doc.getImageProperties(companyLogo);
// //     const logoWidth = 25;
// //     const logoHeight = (imgProps.height * logoWidth) / imgProps.width;
// //     doc.addImage(companyLogo, "PNG", pdfWidth / 2 - logoWidth / 2, 10, logoWidth, logoHeight);

// //     doc.setFontSize(16);
// //     doc.text("Venturebiz Promotions Private Limited", pdfWidth / 2, 40, { align: "center" });
// //     doc.setFontSize(12);
// //     doc.text(`Payslip for ${filteredSalary.month}`, pdfWidth / 2, 48, { align: "center" });

// //     const employee = filteredSalary.employee || {};
// //     const employeeDetails = [
// //       ["Name", employee.name || "-", "Date of Joining", employee.dateOfJoining || "-"],
// //       ["Designation", employee.deptRole || "-", "Department", employee.department || "-"],
// //       ["Total Work Days", filteredSalary.totalWorkingDays || 0, "Actual Work Days", filteredSalary.workedDays || 0],
// //       ["Location", "Bengaluru", "Bank Name", salaryPackage?.bankName || "-"],
// //       ["Account Number", salaryPackage?.accountNumber || "-", "PF Number", salaryPackage?.pfNumber || "-"],
// //       ["UAN Number", salaryPackage?.uanNumber || "-", "ESI Number", salaryPackage?.esiNumber || "-"],
// //       ["PAN Number", salaryPackage?.panNumber || "-", "LOP", salaryPackage?.lop?.toFixed(2) || "0.00"],
// //     ];

// //     autoTable(doc, { startY: 65, head: [], body: employeeDetails, theme: "grid", styles: { fontSize: 10 } });

// //     const lopDeduction = salaryPackage?.lop || 0;
// //     const totalDeductions =
// //       (filteredSalary.pfContributionEmployer || 0) +
// //       (filteredSalary.professionalTax || 0) +
// //       lopDeduction;

// //     const netPay = filteredSalary.grossSalary - totalDeductions;
// //     const netPayInWords = numberToWords(netPay);

// //     const earningsDeductions = [
// //       ["Basic", filteredSalary.basic?.toFixed(2) || "0.00", "PF", filteredSalary.pfContributionEmployer?.toFixed(2) || "0.00"],
// //       ["Flexible Benefit Plan", filteredSalary.flexibleBenefitPlan?.toFixed(2) || "0.00", "Professional Tax", filteredSalary.professionalTax?.toFixed(2) || "0.00"],
// //       ["Special Allowance", filteredSalary.specialAllowance?.toFixed(2) || "0.00", "LOP Deduction", lopDeduction.toFixed(2)],
// //       ["Total Earnings", filteredSalary.grossSalary?.toFixed(2) || "0.00", "Total Deductions", totalDeductions.toFixed(2)],
// //       ["Net Pay", "", "", netPay?.toFixed(2) || "0.00"],
// //     ];

// //     autoTable(doc, {
// //       startY: doc.lastAutoTable.finalY + 10,
// //       head: [["Earnings", "Amount", "Deductions", "Amount"]],
// //       body: earningsDeductions,
// //       styles: { fontSize: 10 },
// //       headStyles: { fillColor: [50, 50, 50], textColor: [255, 255, 255] },
// //     });

// //     doc.setFontSize(11);
// //     doc.text(`Net Pay : ${netPayInWords}`, 14, doc.lastAutoTable.finalY + 10);

// //     doc.setFontSize(10);
// //     doc.text(
// //       "This is a system generated payslip and does not require signature",
// //       pdfWidth / 2,
// //       doc.lastAutoTable.finalY + 25,
// //       { align: "center" }
// //     );

// //     doc.save(`Payslip_${filteredSalary.month}.pdf`);
// //   };

// //   /* ---------- Render ---------- */
// //   return (
// //     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
// //       <h2>My Salary Details</h2>
// //       {message && <p style={{ color: "red" }}>{message}</p>}

// //       {/* Month selector */}
// //       <div style={{ marginBottom: "20px" }}>
// //         <label>
// //           Select Month:
// //           <select
// //             value={selectedMonth}
// //             onChange={(e) => setSelectedMonth(e.target.value)}
// //             style={{ marginLeft: "10px", padding: "5px", fontSize: "14px" }}
// //           >
// //             <option value="">--Select--</option>
// //             {monthlySalaries.map((ms) => (
// //               <option key={ms.id} value={ms.month}>
// //                 {ms.month}
// //               </option>
// //             ))}
// //           </select>
// //         </label>
// //       </div>

// //       {/* ---------- Desktop Table (unchanged) ---------- */}
// //       {!isMobile && (
// //         <div style={{ overflowX: "auto" }}>
// //           <table
// //             border="1"
// //             cellPadding="5"
// //             style={{ width: "100%", marginTop: "15px", borderCollapse: "collapse" }}
// //           >
// //             <thead>
// //               <tr style={{ backgroundColor: "#f0f0f0" }}>
// //                 <th>Month</th>
// //                 <th>Basic</th>
// //                 <th>Allowance</th>
// //                 <th>PF</th>
// //                 <th>Tax</th>
// //                 <th>LOP Deduction</th>
// //                 <th>Gross</th>
// //                 <th>Net</th>
// //                 <th>Total Work Days</th>
// //                 <th>Actual Work Days</th>
// //                 <th>Status</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {monthlySalaries.length > 0 ? (
// //                 monthlySalaries.map((ms) => {
// //                   const lop = salaryPackage?.lop || 0;
// //                   const net =
// //                     ms.grossSalary -
// //                     (ms.pfContributionEmployer + ms.professionalTax + lop);
// //                   return (
// //                     <tr key={ms.id} style={{ textAlign: "center" }}>
// //                       <td>{ms.month}</td>
// //                       <td>{ms.basic?.toFixed(2) || "0.00"}</td>
// //                       <td>{((ms.flexibleBenefitPlan || 0) + (ms.specialAllowance || 0)).toFixed(2)}</td>
// //                       <td>{ms.pfContributionEmployer?.toFixed(2) || "0.00"}</td>
// //                       <td>{ms.professionalTax?.toFixed(2) || "0.00"}</td>
// //                       <td>{lop.toFixed(2)}</td>
// //                       <td>{ms.grossSalary?.toFixed(2) || "0.00"}</td>
// //                       <td>{net.toFixed(2)}</td>
// //                       <td>{ms.totalWorkingDays}</td>
// //                       <td>{ms.workedDays}</td>
// //                       <td>{ms.status || "-"}</td>
// //                     </tr>
// //                   );
// //                 })
// //               ) : (
// //                 <tr>
// //                   <td colSpan="11" style={{ textAlign: "center", padding: 10 }}>
// //                     No salary data found.
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}

// //       {/* ---------- Mobile Two-Column Cards ---------- */}
// //       {isMobile && (
// //         <div style={{ marginTop: "15px" }}>
// //           {monthlySalaries.length > 0 ? (
// //             monthlySalaries.map((ms) => {
// //               const lop = salaryPackage?.lop || 0;
// //               const net =
// //                 ms.grossSalary -
// //                 (ms.pfContributionEmployer + ms.professionalTax + lop);
// //               const allowance =
// //                 (ms.flexibleBenefitPlan || 0) + (ms.specialAllowance || 0);

// //               return (
// //                 <div
// //                   key={ms.id}
// //                   style={{
// //                     border: "1px solid #ddd",
// //                     borderRadius: "8px",
// //                     marginBottom: "16px",
// //                     backgroundColor: "#fff",
// //                     boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
// //                   }}
// //                 >
// //                   <div style={{ padding: "12px" }}>
// //                     {/* Two-column grid – label : value */}
// //                     <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "6px 12px", fontSize: "14px" }}>
// //                       <div style={{ fontWeight: "600" }}>Month</div>
// //                       <div>{ms.month}</div>

// //                       <div style={{ fontWeight: "600" }}>Basic</div>
// //                       <div>₹{ms.basic?.toFixed(2) || "0.00"}</div>

// //                       <div style={{ fontWeight: "600" }}>Allowance</div>
// //                       <div>₹{allowance.toFixed(2)}</div>

// //                       <div style={{ fontWeight: "600" }}>PF</div>
// //                       <div>₹{ms.pfContributionEmployer?.toFixed(2) || "0.00"}</div>

// //                       <div style={{ fontWeight: "600" }}>Tax</div>
// //                       <div>₹{ms.professionalTax?.toFixed(2) || "0.00"}</div>

// //                       <div style={{ fontWeight: "600" }}>LOP Deduction</div>
// //                       <div>₹{lop.toFixed(2)}</div>

// //                       <div style={{ fontWeight: "600" }}>Gross</div>
// //                       <div>₹{ms.grossSalary?.toFixed(2) || "0.00"}</div>

// //                       <div style={{ fontWeight: "600" }}>Net Pay</div>
// //                       <div>₹{net.toFixed(2)}</div>

// //                       <div style={{ fontWeight: "600" }}>Total Days</div>
// //                       <div>{ms.totalWorkingDays}</div>

// //                       <div style={{ fontWeight: "600" }}>Worked Days</div>
// //                       <div>{ms.workedDays}</div>

// //                       <div style={{ fontWeight: "600" }}>Status</div>
// //                       <div>{ms.status || "-"}</div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               );
// //             })
// //           ) : (
// //             <p style={{ textAlign: "center", padding: "20px", color: "#666" }}>
// //               No salary data found.
// //             </p>
// //           )}
// //         </div>
// //       )}

// //       {/* ---------- Download Button (centered, full-width on mobile) ---------- */}
// //       <div style={{ textAlign: "center", marginTop: "30px" }}>
// //         <button
// //           onClick={downloadPayslipPDF}
// //           disabled={!selectedMonth || !filteredSalary}
// //           style={{
// //             width: "100%",
// //             maxWidth: "320px",
// //             padding: "12px 0",
// //             fontSize: "16px",
// //             backgroundColor: !selectedMonth || !filteredSalary ? "#ccc" : "#007bff",
// //             color: "#fff",
// //             border: "none",
// //             borderRadius: "6px",
// //             cursor: !selectedMonth || !filteredSalary ? "not-allowed" : "pointer",
// //           }}
// //         >
// //           Download Payslip as PDF
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default EmployeeSalary;

// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import jsPDF from "jspdf";
// // import autoTable from "jspdf-autotable";
// // import companyLogo from "./download.png";

// // const EmployeeSalary = () => {
// //   const [monthlySalaries, setMonthlySalaries] = useState([]);
// //   const [selectedMonth, setSelectedMonth] = useState("");
// //   const [message, setMessage] = useState("");
// //   const [salaryPackage, setSalaryPackage] = useState(null);
// //   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

// //   const token = localStorage.getItem("token");
// //   const email = localStorage.getItem("email");
// //   const axiosConfig = token ? { headers: { Authorization: `Bearer ${token}` } } : null;

// //   /* ---------- Fetch Monthly Salaries ---------- */
// //   const fetchMonthlySalaries = async () => {
// //     if (!axiosConfig || !email) return;
// //     try {
// //       const res = await axios.get(
// //         `http://localhost:8080/api/employee/salary/mymonthsalary?email=${email}`,
// //         axiosConfig
// //       );
// //       setMonthlySalaries(res.data || []);
// //     } catch (err) {
// //       console.error("Error fetching monthly salaries:", err);
// //       setMessage("Error fetching monthly salaries.");
// //     }
// //   };

// //   /* ---------- Fetch Salary Package ---------- */
// //   const fetchSalaryPackage = async () => {
// //     if (!axiosConfig || !email) {
// //       console.warn("Missing token or email in localStorage");
// //       return;
// //     }

// //     try {
// //       const res = await axios.get(
// //         `http://localhost:8080/api/employee/salary/mypackage?email=${email}`,
// //         axiosConfig
// //       );

// //       if (res.data) {
// //         setSalaryPackage(res.data);
// //         setMessage("");
// //       } else {
// //         setMessage("No salary package found for this employee.");
// //         setSalaryPackage(null);
// //       }
// //     } catch (err) {
// //       console.error("Error fetching salary package:", err);
// //       if (err.response?.status === 404) {
// //         setMessage("Salary package not found.");
// //       } else {
// //         setMessage("Error fetching salary package.");
// //       }
// //     }
// //   };

// //   /* ---------- Component Mount ---------- */
// //   useEffect(() => {
// //     fetchMonthlySalaries();
// //     fetchSalaryPackage();

// //     const handleResize = () => setIsMobile(window.innerWidth <= 768);
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   const filteredSalary = monthlySalaries.find((ms) => ms.month === selectedMonth);

// //   /* ---------- Convert Numbers to Words ---------- */
// //   const numberToWords = (num) => {
// //     const a = [
// //       "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
// //       "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
// //       "Eighteen", "Nineteen",
// //     ];
// //     const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

// //     const inWords = (n) => {
// //       if (n < 20) return a[n];
// //       if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
// //       if (n < 1000)
// //         return a[Math.floor(n / 100)] + " Hundred" + (n % 100 === 0 ? "" : " and " + inWords(n % 100));
// //       if (n < 100000)
// //         return inWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 !== 0 ? " " + inWords(n % 1000) : "");
// //       if (n < 10000000)
// //         return inWords(Math.floor(n / 100000)) + " Lakh" + (n % 100000 !== 0 ? " " + inWords(n % 100000) : "");
// //       return inWords(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 !== 0 ? " " + inWords(n % 10000000) : "");
// //     };

// //     const rupees = Math.floor(num);
// //     const paise = Math.round((num - rupees) * 100);
// //     let words = inWords(rupees) + " Rupees";
// //     if (paise > 0) words += " and " + inWords(paise) + " Paise";
// //     return words + " Only";
// //   };

// //   /* ---------- Generate PDF ---------- */
// //   const downloadPayslipPDF = () => {
// //     if (!filteredSalary) return;

// //     const doc = new jsPDF();
// //     const pdfWidth = doc.internal.pageSize.getWidth();

// //     const imgProps = doc.getImageProperties(companyLogo);
// //     const logoWidth = 25;
// //     const logoHeight = (imgProps.height * logoWidth) / imgProps.width;
// //     doc.addImage(companyLogo, "PNG", pdfWidth / 2 - logoWidth / 2, 10, logoWidth, logoHeight);

// //     doc.setFontSize(16);
// //     doc.text("Venturebiz Promotions Private Limited", pdfWidth / 2, 40, { align: "center" });
// //     doc.setFontSize(12);
// //     doc.text(`Payslip for ${filteredSalary.month}`, pdfWidth / 2, 48, { align: "center" });

// //     const employee = filteredSalary.employee || {};
// //     const employeeDetails = [
// //       ["Name", employee.name || "-", "Date of Joining", employee.dateOfJoining || "-"],
// //       ["Designation", employee.deptRole || "-", "Department", employee.department || "-"],
// //       ["Total Work Days", filteredSalary.totalWorkingDays || 0, "Actual Work Days", filteredSalary.workedDays || 0],
// //       ["Location", "Bengaluru", "Bank Name", salaryPackage?.bankName || "-"],
// //       ["Account Number", salaryPackage?.accountNumber || "-", "PF Number", salaryPackage?.pfNumber || "-"],
// //       ["UAN Number", salaryPackage?.uanNumber || "-", "ESI Number", salaryPackage?.esiNumber || "-"],
// //       ["PAN Number", salaryPackage?.panNumber || "-", "LOP", salaryPackage?.lop?.toFixed(2) || "0.00"],
// //     ];

// //     autoTable(doc, { startY: 65, head: [], body: employeeDetails, theme: "grid", styles: { fontSize: 10 } });

// //     const lopDeduction = salaryPackage?.lop || 0;
// //     const totalDeductions =
// //       (filteredSalary.pfContributionEmployer || 0) +
// //       (filteredSalary.professionalTax || 0) +
// //       lopDeduction;

// //     const netPay = filteredSalary.grossSalary - totalDeductions;
// //     const netPayInWords = numberToWords(netPay);

// //     const earningsDeductions = [
// //       ["Basic", filteredSalary.basic?.toFixed(2) || "0.00", "PF", filteredSalary.pfContributionEmployer?.toFixed(2) || "0.00"],
// //       ["Flexible Benefit Plan", filteredSalary.flexibleBenefitPlan?.toFixed(2) || "0.00", "Professional Tax", filteredSalary.professionalTax?.toFixed(2) || "0.00"],
// //       ["Special Allowance", filteredSalary.specialAllowance?.toFixed(2) || "0.00", "LOP Deduction", lopDeduction.toFixed(2)],
// //       ["Total Earnings", filteredSalary.grossSalary?.toFixed(2) || "0.00", "Total Deductions", totalDeductions.toFixed(2)],
// //       ["Net Pay", "", "", netPay?.toFixed(2) || "0.00"],
// //     ];

// //     autoTable(doc, {
// //       startY: doc.lastAutoTable.finalY + 10,
// //       head: [["Earnings", "Amount", "Deductions", "Amount"]],
// //       body: earningsDeductions,
// //       styles: { fontSize: 10 },
// //       headStyles: { fillColor: [50, 50, 50], textColor: [255, 255, 255] },
// //     });

// //     doc.setFontSize(11);
// //     doc.text(`Net Pay : ${netPayInWords}`, 14, doc.lastAutoTable.finalY + 10);

// //     doc.setFontSize(10);
// //     doc.text(
// //       "This is a system generated payslip and does not require signature",
// //       pdfWidth / 2,
// //       doc.lastAutoTable.finalY + 25,
// //       { align: "center" }
// //     );

// //     doc.save(`Payslip_${filteredSalary.month}.pdf`);
// //   };

// //   /* ---------- Render ---------- */
// //   return (
// //     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
// //       <h2>My Salary Details</h2>

// //       {message && <p style={{ color: "red" }}>{message}</p>}

// //       {/* ---------- Salary Package Section ---------- */}
// //       {salaryPackage && (
// //         <div
// //           style={{
// //             margin: "20px 0",
// //             padding: "15px",
// //             backgroundColor: "#f9f9f9",
// //             border: "1px solid #ddd",
// //             borderRadius: "8px",
// //           }}
// //         >
// //           <h3 style={{ marginBottom: "10px" }}>My Salary Package</h3>
// //           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}>
// //             <div><strong>Bank Name:</strong></div><div>{salaryPackage.bankName || "-"}</div>
// //             <div><strong>Account Number:</strong></div><div>{salaryPackage.accountNumber || "-"}</div>
// //             <div><strong>PF Number:</strong></div><div>{salaryPackage.pfNumber || "-"}</div>
// //             <div><strong>UAN Number:</strong></div><div>{salaryPackage.uanNumber || "-"}</div>
// //             <div><strong>Basic:</strong></div><div>₹{salaryPackage.basic?.toFixed(2) || "0.00"}</div>
// //             <div><strong>HRA:</strong></div><div>₹{salaryPackage.hra?.toFixed(2) || "0.00"}</div>
// //             <div><strong>Special Allowance:</strong></div><div>₹{salaryPackage.specialAllowance?.toFixed(2) || "0.00"}</div>
// //             <div><strong>LOP:</strong></div><div>₹{salaryPackage.lop?.toFixed(2) || "0.00"}</div>
// //           </div>
// //         </div>
// //       )}

// //       {/* ---------- Month Selector ---------- */}
// //       <div style={{ marginBottom: "20px" }}>
// //         <label>
// //           Select Month:
// //           <select
// //             value={selectedMonth}
// //             onChange={(e) => setSelectedMonth(e.target.value)}
// //             style={{ marginLeft: "10px", padding: "5px", fontSize: "14px" }}
// //           >
// //             <option value="">--Select--</option>
// //             {monthlySalaries.map((ms) => (
// //               <option key={ms.id} value={ms.month}>
// //                 {ms.month}
// //               </option>
// //             ))}
// //           </select>
// //         </label>
// //       </div>

// //       {/* ---------- Desktop Table ---------- */}
// //       {!isMobile && (
// //         <div style={{ overflowX: "auto" }}>
// //           <table border="1" cellPadding="5" style={{ width: "100%", borderCollapse: "collapse" }}>
// //             <thead>
// //               <tr style={{ backgroundColor: "#f0f0f0" }}>
// //                 <th>Month</th>
// //                 <th>Basic</th>
// //                 <th>Allowance</th>
// //                 <th>PF</th>
// //                 <th>Tax</th>
// //                 <th>LOP</th>
// //                 <th>Gross</th>
// //                 <th>Net</th>
// //                 <th>Total Days</th>
// //                 <th>Worked Days</th>
// //                 <th>Status</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {monthlySalaries.length > 0 ? (
// //                 monthlySalaries.map((ms) => {
// //                   const lop = salaryPackage?.lop || 0;
// //                   const net =
// //                     ms.grossSalary -
// //                     (ms.pfContributionEmployer + ms.professionalTax + lop);
// //                   return (
// //                     <tr key={ms.id} style={{ textAlign: "center" }}>
// //                       <td>{ms.month}</td>
// //                       <td>{ms.basic?.toFixed(2) || "0.00"}</td>
// //                       <td>{((ms.flexibleBenefitPlan || 0) + (ms.specialAllowance || 0)).toFixed(2)}</td>
// //                       <td>{ms.pfContributionEmployer?.toFixed(2) || "0.00"}</td>
// //                       <td>{ms.professionalTax?.toFixed(2) || "0.00"}</td>
// //                       <td>{lop.toFixed(2)}</td>
// //                       <td>{ms.grossSalary?.toFixed(2) || "0.00"}</td>
// //                       <td>{net.toFixed(2)}</td>
// //                       <td>{ms.totalWorkingDays}</td>
// //                       <td>{ms.workedDays}</td>
// //                       <td>{ms.status || "-"}</td>
// //                     </tr>
// //                   );
// //                 })
// //               ) : (
// //                 <tr>
// //                   <td colSpan="11" style={{ textAlign: "center", padding: 10 }}>
// //                     No salary data found.
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}

// //       {/* ---------- Download Button ---------- */}
// //       <div style={{ textAlign: "center", marginTop: "30px" }}>
// //         <button
// //           onClick={downloadPayslipPDF}
// //           disabled={!selectedMonth || !filteredSalary}
// //           style={{
// //             width: "100%",
// //             maxWidth: "320px",
// //             padding: "12px 0",
// //             fontSize: "16px",
// //             backgroundColor: !selectedMonth || !filteredSalary ? "#ccc" : "#007bff",
// //             color: "#fff",
// //             border: "none",
// //             borderRadius: "6px",
// //             cursor: !selectedMonth || !filteredSalary ? "not-allowed" : "pointer",
// //           }}
// //         >
// //           Download Payslip as PDF
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default EmployeeSalary;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import companyLogo from "./download.png";

// const EmployeeSalary = () => {
//   const [monthlySalaries, setMonthlySalaries] = useState([]);
//   const [monthlyIncentives, setMonthlyIncentives] = useState({});
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [message, setMessage] = useState("");
//   const [salaryPackage, setSalaryPackage] = useState(null);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   const token = localStorage.getItem("token");
//   const email = localStorage.getItem("email");
//   const axiosConfig = token ? { headers: { Authorization: `Bearer ${token}` } } : null;

//   /* ---------- Fetch Monthly Salaries ---------- */
//   const fetchMonthlySalaries = async () => {
//     if (!axiosConfig || !email) return;
//     try {
//       const res = await axios.get(
//         `http://localhost:8080/api/employee/salary/mymonthsalary?email=${email}`,
//         axiosConfig
//       );
//       setMonthlySalaries(res.data || []);
//     } catch (err) {
//       console.error("Error fetching monthly salaries:", err);
//       setMessage("Error fetching monthly salaries.");
//     }
//   };

//   /* ---------- Fetch All Monthly Incentives ---------- */
//   const fetchAllIncentives = async () => {
//     if (!axiosConfig || monthlySalaries.length === 0) return;
//     const empId = monthlySalaries[0].employee.employeeId; // Assuming consistent employeeId across salaries
//     const months = [...new Set(monthlySalaries.map((ms) => ms.month))];
//     const incentivesMap = {};
//     await Promise.all(
//       months.map(async (month) => {
//         try {
//           const res = await axios.get(
//             `http://localhost:8080/api/employee/bonus/month/${empId}?monthYear=${month}`,
//             axiosConfig
//           );
//           const total = res.data.reduce((sum, b) => sum + (b.incentives || 0), 0);
//           incentivesMap[month] = total;
//         } catch (err) {
//           console.error(`Error fetching incentives for ${month}:`, err);
//           incentivesMap[month] = 0;
//         }
//       })
//     );
//     setMonthlyIncentives(incentivesMap);
//   };

//   /* ---------- Fetch Salary Package ---------- */
//   const fetchSalaryPackage = async () => {
//     if (!axiosConfig || !email) {
//       console.warn("Missing token or email in localStorage");
//       return;
//     }
//     try {
//       const res = await axios.get(
//         `http://localhost:8080/api/employee/salary/mypackage?email=${email}`,
//         axiosConfig
//       );
//       if (res.data) {
//         setSalaryPackage(res.data);
//         setMessage("");
//       } else {
//         setMessage("No salary package found for this employee.");
//         setSalaryPackage(null);
//       }
//     } catch (err) {
//       console.error("Error fetching salary package:", err);
//       if (err.response?.status === 404) {
//         setMessage("Salary package not found.");
//       } else {
//         setMessage("Error fetching salary package.");
//       }
//     }
//   };

//   /* ---------- Component Mount ---------- */
//   useEffect(() => {
//     fetchMonthlySalaries();
//     fetchSalaryPackage();
//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   /* ---------- Fetch Incentives After Salaries ---------- */
//   useEffect(() => {
//     if (monthlySalaries.length > 0) {
//       fetchAllIncentives();
//     }
//   }, [monthlySalaries]);

//   const filteredSalary = monthlySalaries.find((ms) => ms.month === selectedMonth);
//   const totalIncentives = selectedMonth ? (monthlyIncentives[selectedMonth] || 0) : 0;

//   /* ---------- Convert Numbers to Words ---------- */
//   const numberToWords = (num) => {
//     const a = [
//       "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
//       "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
//       "Eighteen", "Nineteen",
//     ];
//     const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
//     const inWords = (n) => {
//       if (n < 20) return a[n];
//       if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
//       if (n < 1000)
//         return a[Math.floor(n / 100)] + " Hundred" + (n % 100 === 0 ? "" : " and " + inWords(n % 100));
//       if (n < 100000)
//         return inWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 !== 0 ? " " + inWords(n % 1000) : "");
//       if (n < 10000000)
//         return inWords(Math.floor(n / 100000)) + " Lakh" + (n % 100000 !== 0 ? " " + inWords(n % 100000) : "");
//       return inWords(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 !== 0 ? " " + inWords(n % 10000000) : "");
//     };
//     const rupees = Math.floor(num);
//     const paise = Math.round((num - rupees) * 100);
//     let words = inWords(rupees) + " Rupees";
//     if (paise > 0) words += " and " + inWords(paise) + " Paise";
//     return words + " Only";
//   };

//   /* ---------- Generate PDF ---------- */
//   const downloadPayslipPDF = () => {
//     if (!filteredSalary) return;
//     const doc = new jsPDF();
//     const pdfWidth = doc.internal.pageSize.getWidth();
//     const imgProps = doc.getImageProperties(companyLogo);
//     const logoWidth = 25;
//     const logoHeight = (imgProps.height * logoWidth) / imgProps.width;
//     doc.addImage(companyLogo, "PNG", pdfWidth / 2 - logoWidth / 2, 10, logoWidth, logoHeight);
//     doc.setFontSize(16);
//     doc.text("Venturebiz Promotions Private Limited", pdfWidth / 2, 40, { align: "center" });
//     doc.setFontSize(12);
//     doc.text(`Payslip for ${filteredSalary.month}`, pdfWidth / 2, 48, { align: "center" });
//     const employee = filteredSalary.employee || {};
//     const employeeDetails = [
//       ["Name", employee.name || "-", "Date of Joining", employee.dateOfJoining || "-"],
//       ["Designation", employee.deptRole || "-", "Department", employee.department || "-"],
//       ["Total Work Days", filteredSalary.totalWorkingDays || 0, "Actual Work Days", filteredSalary.workedDays || 0],
//       ["Location", "Bengaluru", "Bank Name", salaryPackage?.bankName || "-"],
//       ["Account Number", salaryPackage?.accountNumber || "-", "PF Number", salaryPackage?.pfNumber || "-"],
//       ["UAN Number", salaryPackage?.uanNumber || "-", "ESI Number", salaryPackage?.esiNumber || "-"],
//       ["PAN Number", salaryPackage?.panNumber || "-", "LOP", salaryPackage?.lop?.toFixed(2) || "0.00"],
//     ];
//     autoTable(doc, { startY: 65, head: [], body: employeeDetails, theme: "grid", styles: { fontSize: 10 } });
//     const lopDeduction = salaryPackage?.lop || 0;
//     const totalDeductions =
//       (filteredSalary.pfContributionEmployer || 0) +
//       (filteredSalary.professionalTax || 0) +
//       lopDeduction;
//     const earningsGross = (filteredSalary.grossSalary || 0) + totalIncentives;
//     const netPay = earningsGross - totalDeductions;
//     const netPayInWords = numberToWords(netPay);
//     const earningsDeductions = [
//       ["Basic", filteredSalary.basic?.toFixed(2) || "0.00", "PF", filteredSalary.pfContributionEmployer?.toFixed(2) || "0.00"],
//       ["Flexible Benefit Plan", filteredSalary.flexibleBenefitPlan?.toFixed(2) || "0.00", "Professional Tax", filteredSalary.professionalTax?.toFixed(2) || "0.00"],
//       ["Special Allowance", filteredSalary.specialAllowance?.toFixed(2) || "0.00", "LOP Deduction", lopDeduction.toFixed(2)],
//       ["Incentives", totalIncentives.toFixed(2), "Total Deductions", totalDeductions.toFixed(2)],
//       ["Total Earnings", earningsGross.toFixed(2), "", ""],
//       ["Net Pay", "", "", netPay?.toFixed(2) || "0.00"],
//     ];
//     autoTable(doc, {
//       startY: doc.lastAutoTable.finalY + 10,
//       head: [["Earnings", "Amount", "Deductions", "Amount"]],
//       body: earningsDeductions,
//       styles: { fontSize: 10 },
//       headStyles: { fillColor: [50, 50, 50], textColor: [255, 255, 255] },
//     });
//     doc.setFontSize(11);
//     doc.text(`Net Pay : ${netPayInWords}`, 14, doc.lastAutoTable.finalY + 10);
//     doc.setFontSize(10);
//     doc.text(
//       "This is a system generated payslip and does not require signature",
//       pdfWidth / 2,
//       doc.lastAutoTable.finalY + 25,
//       { align: "center" }
//     );
//     doc.save(`Payslip_${filteredSalary.month}.pdf`);
//   };

//   /* ---------- Render ---------- */
//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h2>My Salary Details</h2>
//       {message && <p style={{ color: "red" }}>{message}</p>}
//       {/* ---------- Salary Package Section ---------- */}
//       {salaryPackage && (
//         <div
//           style={{
//             margin: "20px 0",
//             padding: "15px",
//             backgroundColor: "#f9f9f9",
//             border: "1px solid #ddd",
//             borderRadius: "8px",
//           }}
//         >
//           <h3 style={{ marginBottom: "10px" }}>My Salary Package</h3>
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}>
//             <div><strong>Bank Name:</strong></div><div>{salaryPackage.bankName || "-"}</div>
//             <div><strong>Account Number:</strong></div><div>{salaryPackage.accountNumber || "-"}</div>
//             <div><strong>PF Number:</strong></div><div>{salaryPackage.pfNumber || "-"}</div>
//             <div><strong>UAN Number:</strong></div><div>{salaryPackage.uanNumber || "-"}</div>
//             <div><strong>Basic:</strong></div><div>₹{salaryPackage.basic?.toFixed(2) || "0.00"}</div>
//             <div><strong>HRA:</strong></div><div>₹{salaryPackage.hra?.toFixed(2) || "0.00"}</div>
//             <div><strong>Special Allowance:</strong></div><div>₹{salaryPackage.specialAllowance?.toFixed(2) || "0.00"}</div>
//             <div><strong>LOP:</strong></div><div>₹{salaryPackage.lop?.toFixed(2) || "0.00"}</div>
//           </div>
//         </div>
//       )}
//       {/* ---------- Month Selector ---------- */}
//       <div style={{ marginBottom: "20px" }}>
//         <label>
//           Select Month:
//           <select
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(e.target.value)}
//             style={{ marginLeft: "10px", padding: "5px", fontSize: "14px" }}
//           >
//             <option value="">--Select--</option>
//             {monthlySalaries.map((ms) => (
//               <option key={ms.id} value={ms.month}>
//                 {ms.month}
//               </option>
//             ))}
//           </select>
//         </label>
//       </div>
//       {/* ---------- Desktop Table ---------- */}
//       {!isMobile && (
//         <div style={{ overflowX: "auto" }}>
//           <table border="1" cellPadding="5" style={{ width: "100%", borderCollapse: "collapse" }}>
//             <thead>
//               <tr style={{ backgroundColor: "#f0f0f0" }}>
//                 <th>Month</th>
//                 <th>Basic</th>
//                 <th>Allowance</th>
//                 <th>Incentives</th>
//                 <th>PF</th>
//                 <th>Tax</th>
//                 <th>LOP</th>
//                 <th>Gross</th>
//                 <th>Net</th>
//                 <th>Total Days</th>
//                 <th>Worked Days</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {monthlySalaries.length > 0 ? (
//                 monthlySalaries.map((ms) => {
//                   const monthIncentives = monthlyIncentives[ms.month] || 0;
//                   const lop = salaryPackage?.lop || 0;
//                   const earningsGross = (ms.grossSalary || 0) + monthIncentives;
//                   const net = earningsGross - (ms.pfContributionEmployer + ms.professionalTax + lop);
//                   return (
//                     <tr key={ms.id} style={{ textAlign: "center" }}>
//                       <td>{ms.month}</td>
//                       <td>{ms.basic?.toFixed(2) || "0.00"}</td>
//                       <td>{((ms.flexibleBenefitPlan || 0) + (ms.specialAllowance || 0)).toFixed(2)}</td>
//                       <td>{monthIncentives.toFixed(2)}</td>
//                       <td>{ms.pfContributionEmployer?.toFixed(2) || "0.00"}</td>
//                       <td>{ms.professionalTax?.toFixed(2) || "0.00"}</td>
//                       <td>{lop.toFixed(2)}</td>
//                       <td>{earningsGross.toFixed(2)}</td>
//                       <td>{net.toFixed(2)}</td>
//                       <td>{ms.totalWorkingDays}</td>
//                       <td>{ms.workedDays}</td>
//                       <td>{ms.status || "-"}</td>
//                     </tr>
//                   );
//                 })
//               ) : (
//                 <tr>
//                   <td colSpan="12" style={{ textAlign: "center", padding: 10 }}>
//                     No salary data found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//       {/* ---------- Download Button ---------- */}
//       <div style={{ textAlign: "center", marginTop: "30px" }}>
//         <button
//           onClick={downloadPayslipPDF}
//           disabled={!selectedMonth || !filteredSalary}
//           style={{
//             width: "100%",
//             maxWidth: "320px",
//             padding: "12px 0",
//             fontSize: "16px",
//             backgroundColor: !selectedMonth || !filteredSalary ? "#ccc" : "#007bff",
//             color: "#fff",
//             border: "none",
//             borderRadius: "6px",
//             cursor: !selectedMonth || !filteredSalary ? "not-allowed" : "pointer",
//           }}
//         >
//           Download Payslip as PDF
//         </button>
//       </div>
//     </div>
//   );
// };

// // export default EmployeeSalary;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import companyLogo from "./download.png";

// const EmployeeSalary = () => {
//   const [monthlySalaries, setMonthlySalaries] = useState([]);
//   const [monthlyIncentives, setMonthlyIncentives] = useState({});
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [message, setMessage] = useState("");
//   const [salaryPackage, setSalaryPackage] = useState(null);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   const token = localStorage.getItem("token");
//   const email = localStorage.getItem("email");
//   const axiosConfig = token ? { headers: { Authorization: `Bearer ${token}` } } : null;

//   /* ---------- Format Month to Words ---------- */
//   const formatMonthToWords = (monthStr) => {
//     if (!monthStr) return "";
    
//     const [year, month] = monthStr.split('-');
//     const monthNames = [
//       "January", "February", "March", "April", "May", "June",
//       "July", "August", "September", "October", "November", "December"
//     ];
    
//     const monthIndex = parseInt(month, 10) - 1;
//     if (monthIndex >= 0 && monthIndex < 12) {
//       return `${monthNames[monthIndex]} ${year}`;
//     }
    
//     return monthStr; // fallback to original format if parsing fails
//   };

//   /* ---------- Fetch Monthly Salaries ---------- */
//   const fetchMonthlySalaries = async () => {
//     if (!axiosConfig || !email) return;
//     try {
//       const res = await axios.get(
//         `http://localhost:8080/api/employee/salary/mymonthsalary?email=${email}`,
//         axiosConfig
//       );
//       setMonthlySalaries(res.data || []);
//     } catch (err) {
//       console.error("Error fetching monthly salaries:", err);
//       setMessage("Error fetching monthly salaries.");
//     }
//   };

//   /* ---------- Fetch All Monthly Incentives ---------- */
//   const fetchAllIncentives = async () => {
//     if (!axiosConfig || monthlySalaries.length === 0) return;
//     const empId = monthlySalaries[0].employee.employeeId;
//     const months = [...new Set(monthlySalaries.map((ms) => ms.month))];
//     const incentivesMap = {};
//     await Promise.all(
//       months.map(async (month) => {
//         try {
//           const res = await axios.get(
//             `http://localhost:8080/api/employee/bonus/month/${empId}?monthYear=${month}`,
//             axiosConfig
//           );
//           const total = res.data.reduce((sum, b) => sum + (b.incentives || 0), 0);
//           incentivesMap[month] = total;
//         } catch (err) {
//           console.error(`Error fetching incentives for ${month}:`, err);
//           incentivesMap[month] = 0;
//         }
//       })
//     );
//     setMonthlyIncentives(incentivesMap);
//   };

//   /* ---------- Fetch Salary Package ---------- */
//   const fetchSalaryPackage = async () => {
//     if (!axiosConfig || !email) {
//       console.warn("Missing token or email in localStorage");
//       return;
//     }
//     try {
//       const res = await axios.get(
//         `http://localhost:8080/api/employee/salary/mypackage?email=${email}`,
//         axiosConfig
//       );
//       if (res.data) {
//         setSalaryPackage(res.data);
//         setMessage("");
//       } else {
//         setMessage("No salary package found for this employee.");
//         setSalaryPackage(null);
//       }
//     } catch (err) {
//       console.error("Error fetching salary package:", err);
//       if (err.response?.status === 404) {
//         setMessage("Salary package not found.");
//       } else {
//         setMessage("Error fetching salary package.");
//       }
//     }
//   };

//   /* ---------- Component Mount ---------- */
//   useEffect(() => {
//     fetchMonthlySalaries();
//     fetchSalaryPackage();
//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   /* ---------- Fetch Incentives After Salaries ---------- */
//   useEffect(() => {
//     if (monthlySalaries.length > 0) {
//       fetchAllIncentives();
//     }
//   }, [monthlySalaries]);

//   const filteredSalary = monthlySalaries.find((ms) => ms.month === selectedMonth);
//   const totalIncentives = selectedMonth ? (monthlyIncentives[selectedMonth] || 0) : 0;

//   /* ---------- Convert Numbers to Words ---------- */
//   const numberToWords = (num) => {
//     const a = [
//       "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
//       "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
//       "Eighteen", "Nineteen",
//     ];
//     const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
//     const inWords = (n) => {
//       if (n < 20) return a[n];
//       if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
//       if (n < 1000)
//         return a[Math.floor(n / 100)] + " Hundred" + (n % 100 === 0 ? "" : " and " + inWords(n % 100));
//       if (n < 100000)
//         return inWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 !== 0 ? " " + inWords(n % 1000) : "");
//       if (n < 10000000)
//         return inWords(Math.floor(n / 100000)) + " Lakh" + (n % 100000 !== 0 ? " " + inWords(n % 100000) : "");
//       return inWords(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 !== 0 ? " " + inWords(n % 10000000) : "");
//     };
//     const rupees = Math.floor(num);
//     const paise = Math.round((num - rupees) * 100);
//     let words = inWords(rupees) + " Rupees";
//     if (paise > 0) words += " and " + inWords(paise) + " Paise";
//     return words + " Only";
//   };

//   /* ---------- Generate PDF ---------- */
//   const downloadPayslipPDF = () => {
//     if (!filteredSalary) return;
//     const doc = new jsPDF();
//     const pdfWidth = doc.internal.pageSize.getWidth();
//     const imgProps = doc.getImageProperties(companyLogo);
//     const logoWidth = 25;
//     const logoHeight = (imgProps.height * logoWidth) / imgProps.width;
//     doc.addImage(companyLogo, "PNG", pdfWidth / 2 - logoWidth / 2, 10, logoWidth, logoHeight);
//     doc.setFontSize(16);
//     doc.text("Venturebiz Promotions Private Limited", pdfWidth / 2, 40, { align: "center" });
//     doc.setFontSize(12);
    
//     // ✅ Updated: Use formatted month in words
//     const formattedMonth = formatMonthToWords(filteredSalary.month);
//     doc.text(`Payslip for ${formattedMonth}`, pdfWidth / 2, 48, { align: "center" });
    
//     const employee = filteredSalary.employee || {};
//     const employeeDetails = [
//       ["Name", employee.name || "-", "Date of Joining", employee.dateOfJoining || "-"],
//       ["Designation", employee.deptRole || "-", "Department", employee.department || "-"],
//       ["Total Work Days", filteredSalary.totalWorkingDays || 0, "Actual Work Days", filteredSalary.workedDays || 0],
//       ["Location", "Bengaluru", "Bank Name", salaryPackage?.bankName || "-"],
//       ["Account Number", salaryPackage?.accountNumber || "-", "PF Number", salaryPackage?.pfNumber || "-"],
//       ["UAN Number", salaryPackage?.uanNumber || "-", "ESI Number", salaryPackage?.esiNumber || "-"],
//       ["PAN Number", salaryPackage?.panNumber || "-", "LOP", salaryPackage?.lop?.toFixed(2) || "0.00"],
//     ];
//     autoTable(doc, { startY: 65, head: [], body: employeeDetails, theme: "grid", styles: { fontSize: 10 } });
//     const lopDeduction = salaryPackage?.lop || 0;
//     const totalDeductions =
//       (filteredSalary.pfContributionEmployer || 0) +
//       (filteredSalary.professionalTax || 0) +
//       lopDeduction;
//     const earningsGross = (filteredSalary.grossSalary || 0) + totalIncentives;
//     const netPay = earningsGross - totalDeductions;
//     const netPayInWords = numberToWords(netPay);
//     const earningsDeductions = [
//       ["Basic", filteredSalary.basic?.toFixed(2) || "0.00", "PF", filteredSalary.pfContributionEmployer?.toFixed(2) || "0.00"],
//       ["Flexible Benefit Plan", filteredSalary.flexibleBenefitPlan?.toFixed(2) || "0.00", "Professional Tax", filteredSalary.professionalTax?.toFixed(2) || "0.00"],
//       ["Special Allowance", filteredSalary.specialAllowance?.toFixed(2) || "0.00", "LOP Deduction", lopDeduction.toFixed(2)],
//       ["Incentives", totalIncentives.toFixed(2), "Total Deductions", totalDeductions.toFixed(2)],
//       ["Total Earnings", earningsGross.toFixed(2), "", ""],
//       ["Net Pay", "", "", netPay?.toFixed(2) || "0.00"],
//     ];
//     autoTable(doc, {
//       startY: doc.lastAutoTable.finalY + 10,
//       head: [["Earnings", "Amount", "Deductions", "Amount"]],
//       body: earningsDeductions,
//       styles: { fontSize: 10 },
//       headStyles: { fillColor: [50, 50, 50], textColor: [255, 255, 255] },
//     });
//     doc.setFontSize(11);
//     doc.text(`Net Pay : ${netPayInWords}`, 14, doc.lastAutoTable.finalY + 10);
//     doc.setFontSize(10);
//     doc.text(
//       "This is a system generated payslip and does not require signature",
//       pdfWidth / 2,
//       doc.lastAutoTable.finalY + 25,
//       { align: "center" }
//     );
//     doc.save(`Payslip_${formattedMonth.replace(/\s+/g, '_')}.pdf`);
//   };

//   /* ---------- Render ---------- */
//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h2>My Salary Details</h2>
//       {message && <p style={{ color: "red" }}>{message}</p>}
//       {/* ---------- Salary Package Section ---------- */}
//       {salaryPackage && (
//         <div
//           style={{
//             margin: "20px 0",
//             padding: "15px",
//             backgroundColor: "#f9f9f9",
//             border: "1px solid #ddd",
//             borderRadius: "8px",
//           }}
//         >
//           <h3 style={{ marginBottom: "10px" }}>My Salary Package</h3>
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}>
//             <div><strong>Bank Name:</strong></div><div>{salaryPackage.bankName || "-"}</div>
//             <div><strong>Account Number:</strong></div><div>{salaryPackage.accountNumber || "-"}</div>
//             <div><strong>PF Number:</strong></div><div>{salaryPackage.pfNumber || "-"}</div>
//             <div><strong>UAN Number:</strong></div><div>{salaryPackage.uanNumber || "-"}</div>
//             <div><strong>Basic:</strong></div><div>₹{salaryPackage.basic?.toFixed(2) || "0.00"}</div>
//             <div><strong>HRA:</strong></div><div>₹{salaryPackage.hra?.toFixed(2) || "0.00"}</div>
//             <div><strong>Special Allowance:</strong></div><div>₹{salaryPackage.specialAllowance?.toFixed(2) || "0.00"}</div>
//             <div><strong>LOP:</strong></div><div>₹{salaryPackage.lop?.toFixed(2) || "0.00"}</div>
//           </div>
//         </div>
//       )}
//       {/* ---------- Month Selector ---------- */}
//       <div style={{ marginBottom: "20px" }}>
//         <label>
//           Select Month:
//           <select
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(e.target.value)}
//             style={{ marginLeft: "10px", padding: "5px", fontSize: "14px" }}
//           >
//             <option value="">--Select--</option>
//             {monthlySalaries.map((ms) => (
//               <option key={ms.id} value={ms.month}>
//                 {formatMonthToWords(ms.month)}
//               </option>
//             ))}
//           </select>
//         </label>
//       </div>
//       {/* ---------- Desktop Table ---------- */}
//       {!isMobile && (
//         <div style={{ overflowX: "auto" }}>
//           <table border="1" cellPadding="5" style={{ width: "100%", borderCollapse: "collapse" }}>
//             <thead>
//               <tr style={{ backgroundColor: "#f0f0f0" }}>
//                 <th>Month</th>
//                 <th>Basic</th>
//                 <th>Allowance</th>
//                 <th>Incentives</th>
//                 <th>PF</th>
//                 <th>Tax</th>
//                 <th>LOP</th>
//                 <th>Gross</th>
//                 <th>Net</th>
//                 <th>Total Days</th>
//                 <th>Worked Days</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {monthlySalaries.length > 0 ? (
//                 monthlySalaries.map((ms) => {
//                   const monthIncentives = monthlyIncentives[ms.month] || 0;
//                   const lop = salaryPackage?.lop || 0;
//                   const earningsGross = (ms.grossSalary || 0) + monthIncentives;
//                   const net = earningsGross - (ms.pfContributionEmployer + ms.professionalTax + lop);
//                   return (
//                     <tr key={ms.id} style={{ textAlign: "center" }}>
//                       <td>{formatMonthToWords(ms.month)}</td>
//                       <td>{ms.basic?.toFixed(2) || "0.00"}</td>
//                       <td>{((ms.flexibleBenefitPlan || 0) + (ms.specialAllowance || 0)).toFixed(2)}</td>
//                       <td>{monthIncentives.toFixed(2)}</td>
//                       <td>{ms.pfContributionEmployer?.toFixed(2) || "0.00"}</td>
//                       <td>{ms.professionalTax?.toFixed(2) || "0.00"}</td>
//                       <td>{lop.toFixed(2)}</td>
//                       <td>{earningsGross.toFixed(2)}</td>
//                       <td>{net.toFixed(2)}</td>
//                       <td>{ms.totalWorkingDays}</td>
//                       <td>{ms.workedDays}</td>
//                       <td>{ms.status || "-"}</td>
//                     </tr>
//                   );
//                 })
//               ) : (
//                 <tr>
//                   <td colSpan="12" style={{ textAlign: "center", padding: 10 }}>
//                     No salary data found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//       {/* ---------- Download Button ---------- */}
//       <div style={{ textAlign: "center", marginTop: "30px" }}>
//         <button
//           onClick={downloadPayslipPDF}
//           disabled={!selectedMonth || !filteredSalary}
//           style={{
//             width: "100%",
//             maxWidth: "320px",
//             padding: "12px 0",
//             fontSize: "16px",
//             backgroundColor: !selectedMonth || !filteredSalary ? "#ccc" : "#007bff",
//             color: "#fff",
//             border: "none",
//             borderRadius: "6px",
//             cursor: !selectedMonth || !filteredSalary ? "not-allowed" : "pointer",
//           }}
//         >
//           Download Payslip as PDF
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EmployeeSalary;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import companyLogo from "./download.png";

// const EmployeeSalary = () => {
//   const [monthlySalaries, setMonthlySalaries] = useState([]);
//   const [monthlyIncentives, setMonthlyIncentives] = useState({});
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [message, setMessage] = useState("");
//   const [salaryPackage, setSalaryPackage] = useState(null);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   const token = localStorage.getItem("token");
//   const email = localStorage.getItem("email");
//   const axiosConfig = token ? { headers: { Authorization: `Bearer ${token}` } } : null;

//   /* ---------- Format Month to Words ---------- */
//   const formatMonthToWords = (monthStr) => {
//     if (!monthStr) return "";
    
//     const [year, month] = monthStr.split('-');
//     const monthNames = [
//       "January", "February", "March", "April", "May", "June",
//       "July", "August", "September", "October", "November", "December"
//     ];
    
//     const monthIndex = parseInt(month, 10) - 1;
//     if (monthIndex >= 0 && monthIndex < 12) {
//       return `${monthNames[monthIndex]} ${year}`;
//     }
    
//     return monthStr; // fallback to original format if parsing fails
//   };

//   /* ---------- Fetch Monthly Salaries ---------- */
//   const fetchMonthlySalaries = async () => {
//     if (!axiosConfig || !email) return;
//     try {
//       const res = await axios.get(
//         `http://localhost:8080/api/employee/salary/mymonthsalary?email=${email}`,
//         axiosConfig
//       );
//       setMonthlySalaries(res.data || []);
//     } catch (err) {
//       console.error("Error fetching monthly salaries:", err);
//       setMessage("Error fetching monthly salaries.");
//     }
//   };

//   /* ---------- Fetch All Monthly Incentives ---------- */
//   const fetchAllIncentives = async () => {
//     if (!axiosConfig || monthlySalaries.length === 0) return;
//     const empId = monthlySalaries[0].employee.employeeId;
//     const months = [...new Set(monthlySalaries.map((ms) => ms.month))];
//     const incentivesMap = {};
//     await Promise.all(
//       months.map(async (month) => {
//         try {
//           const res = await axios.get(
//             `http://localhost:8080/api/employee/bonus/month/${empId}?monthYear=${month}`,
//             axiosConfig
//           );
//           const total = res.data.reduce((sum, b) => sum + (b.incentives || 0), 0);
//           incentivesMap[month] = total;
//         } catch (err) {
//           console.error(`Error fetching incentives for ${month}:`, err);
//           incentivesMap[month] = 0;
//         }
//       })
//     );
//     setMonthlyIncentives(incentivesMap);
//   };

//   /* ---------- Fetch Salary Package ---------- */
//   const fetchSalaryPackage = async () => {
//     if (!axiosConfig || !email) {
//       console.warn("Missing token or email in localStorage");
//       return;
//     }
//     try {
//       const res = await axios.get(
//         `http://localhost:8080/api/employee/salary/mypackage?email=${email}`,
//         axiosConfig
//       );
//       if (res.data) {
//         setSalaryPackage(res.data);
//         setMessage("");
//       } else {
//         setMessage("No salary package found for this employee.");
//         setSalaryPackage(null);
//       }
//     } catch (err) {
//       console.error("Error fetching salary package:", err);
//       if (err.response?.status === 404) {
//         setMessage("Salary package not found.");
//       } else {
//         setMessage("Error fetching salary package.");
//       }
//     }
//   };

//   /* ---------- Component Mount ---------- */
//   useEffect(() => {
//     fetchMonthlySalaries();
//     fetchSalaryPackage();
//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   /* ---------- Fetch Incentives After Salaries ---------- */
//   useEffect(() => {
//     if (monthlySalaries.length > 0) {
//       fetchAllIncentives();
//     }
//   }, [monthlySalaries]);

//   const filteredSalary = monthlySalaries.find((ms) => ms.month === selectedMonth);
//   const totalIncentives = selectedMonth ? (monthlyIncentives[selectedMonth] || 0) : 0;

//   /* ---------- Convert Numbers to Words ---------- */
//   const numberToWords = (num) => {
//     const a = [
//       "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
//       "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
//       "Eighteen", "Nineteen",
//     ];
//     const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
//     const inWords = (n) => {
//       if (n < 20) return a[n];
//       if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
//       if (n < 1000)
//         return a[Math.floor(n / 100)] + " Hundred" + (n % 100 === 0 ? "" : " and " + inWords(n % 100));
//       if (n < 100000)
//         return inWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 !== 0 ? " " + inWords(n % 1000) : "");
//       if (n < 10000000)
//         return inWords(Math.floor(n / 100000)) + " Lakh" + (n % 100000 !== 0 ? " " + inWords(n % 100000) : "");
//       return inWords(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 !== 0 ? " " + inWords(n % 10000000) : "");
//     };
//     const rupees = Math.floor(num);
//     const paise = Math.round((num - rupees) * 100);
//     let words = inWords(rupees) + " Rupees";
//     if (paise > 0) words += " and " + inWords(paise) + " Paise";
//     return words + " Only";
//   };

//   /* ---------- Generate PDF ---------- */
//   const downloadPayslipPDF = () => {
//     if (!filteredSalary) return;
//     const doc = new jsPDF();
//     const pdfWidth = doc.internal.pageSize.getWidth();
//     const imgProps = doc.getImageProperties(companyLogo);
//     const logoWidth = 25;
//     const logoHeight = (imgProps.height * logoWidth) / imgProps.width;
//     doc.addImage(companyLogo, "PNG", pdfWidth / 2 - logoWidth / 2, 10, logoWidth, logoHeight);
//     doc.setFontSize(16);
//     doc.text("Venturebiz Promotions Private Limited", pdfWidth / 2, 40, { align: "center" });
//     doc.setFontSize(12);
    
//     // ✅ Updated: Use formatted month in words
//     const formattedMonth = formatMonthToWords(filteredSalary.month);
//     doc.text(`Payslip for ${formattedMonth}`, pdfWidth / 2, 48, { align: "center" });
    
//     const employee = filteredSalary.employee || {};
//     const employeeDetails = [
//       ["Name", employee.name || "-", "Date of Joining", employee.dateOfJoining || "-"],
//       ["Designation", employee.deptRole || "-", "Department", employee.department || "-"],
//       ["Total Work Days", filteredSalary.totalWorkingDays || 0, "Actual Work Days", filteredSalary.workedDays || 0],
//       ["Location", "Bengaluru", "Bank Name", salaryPackage?.bankName || "-"],
//       ["Account Number", salaryPackage?.accountNumber || "-", "PF Number", salaryPackage?.pfNumber || "-"],
//       ["UAN Number", salaryPackage?.uanNumber || "-", "ESI Number", salaryPackage?.esiNumber || "-"],
//       ["PAN Number", salaryPackage?.panNumber || "-", "LOP", salaryPackage?.lop?.toFixed(2) || "0.00"],
//     ];
//     autoTable(doc, { startY: 65, head: [], body: employeeDetails, theme: "grid", styles: { fontSize: 10 } });
//     const lopDeduction = salaryPackage?.lop || 0;
//     const totalDeductions =
//       (filteredSalary.pfContributionEmployer || 0) +
//       (filteredSalary.professionalTax || 0) +
//       lopDeduction;
//     const earningsGross = (filteredSalary.grossSalary || 0) + totalIncentives;
//     const netPay = earningsGross - totalDeductions;
//     const netPayInWords = numberToWords(netPay);
    
//     // ✅ Updated: Conditionally include incentives row
//     const earningsDeductions = [
//       ["Basic", filteredSalary.basic?.toFixed(2) || "0.00", "PF", filteredSalary.pfContributionEmployer?.toFixed(2) || "0.00"],
//       ["Flexible Benefit Plan", filteredSalary.flexibleBenefitPlan?.toFixed(2) || "0.00", "Professional Tax", filteredSalary.professionalTax?.toFixed(2) || "0.00"],
//       ["Special Allowance", filteredSalary.specialAllowance?.toFixed(2) || "0.00", "LOP Deduction", lopDeduction.toFixed(2)],
//     ];
    
//     // ✅ Add incentives row only if totalIncentives > 0
//     if (totalIncentives > 0) {
//       earningsDeductions.push(["Incentives", totalIncentives.toFixed(2), "Total Deductions", totalDeductions.toFixed(2)]);
//     } else {
//       // If no incentives, add total deductions in the last row
//       earningsDeductions[earningsDeductions.length - 1][3] = totalDeductions.toFixed(2);
//     }
    
//     // Add total earnings and net pay rows
//     earningsDeductions.push(["Total Earnings", earningsGross.toFixed(2), "", ""]);
//     earningsDeductions.push(["Net Pay", "", "", netPay?.toFixed(2) || "0.00"]);
    
//     autoTable(doc, {
//       startY: doc.lastAutoTable.finalY + 10,
//       head: [["Earnings", "Amount", "Deductions", "Amount"]],
//       body: earningsDeductions,
//       styles: { fontSize: 10 },
//       headStyles: { fillColor: [50, 50, 50], textColor: [255, 255, 255] },
//     });
//     doc.setFontSize(11);
//     doc.text(`Net Pay : ${netPayInWords}`, 14, doc.lastAutoTable.finalY + 10);
//     doc.setFontSize(10);
//     doc.text(
//       "This is a system generated payslip and does not require signature",
//       pdfWidth / 2,
//       doc.lastAutoTable.finalY + 25,
//       { align: "center" }
//     );
//     doc.save(`Payslip_${formattedMonth.replace(/\s+/g, '_')}.pdf`);
//   };

//   /* ---------- Render ---------- */
//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h2>My Salary Details</h2>
//       {message && <p style={{ color: "red" }}>{message}</p>}
//       {/* ---------- Salary Package Section ---------- */}
//       {salaryPackage && (
//         <div
//           style={{
//             margin: "20px 0",
//             padding: "15px",
//             backgroundColor: "#f9f9f9",
//             border: "1px solid #ddd",
//             borderRadius: "8px",
//           }}
//         >
//           <h3 style={{ marginBottom: "10px" }}>My Salary Package</h3>
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}>
//             <div><strong>Bank Name:</strong></div><div>{salaryPackage.bankName || "-"}</div>
//             <div><strong>Account Number:</strong></div><div>{salaryPackage.accountNumber || "-"}</div>
//             <div><strong>PF Number:</strong></div><div>{salaryPackage.pfNumber || "-"}</div>
//             <div><strong>UAN Number:</strong></div><div>{salaryPackage.uanNumber || "-"}</div>
//             <div><strong>Basic:</strong></div><div>₹{salaryPackage.basic?.toFixed(2) || "0.00"}</div>
//             <div><strong>HRA:</strong></div><div>₹{salaryPackage.hra?.toFixed(2) || "0.00"}</div>
//             <div><strong>Special Allowance:</strong></div><div>₹{salaryPackage.specialAllowance?.toFixed(2) || "0.00"}</div>
//             <div><strong>LOP:</strong></div><div>₹{salaryPackage.lop?.toFixed(2) || "0.00"}</div>
//           </div>
//         </div>
//       )}
//       {/* ---------- Month Selector ---------- */}
//       <div style={{ marginBottom: "20px" }}>
//         <label>
//           Select Month:
//           <select
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(e.target.value)}
//             style={{ marginLeft: "10px", padding: "5px", fontSize: "14px" }}
//           >
//             <option value="">--Select--</option>
//             {monthlySalaries.map((ms) => (
//               <option key={ms.id} value={ms.month}>
//                 {formatMonthToWords(ms.month)}
//               </option>
//             ))}
//           </select>
//         </label>
//       </div>
//       {/* ---------- Desktop Table ---------- */}
//       {!isMobile && (
//         <div style={{ overflowX: "auto" }}>
//           <table border="1" cellPadding="5" style={{ width: "100%", borderCollapse: "collapse" }}>
//             <thead>
//               <tr style={{ backgroundColor: "#f0f0f0" }}>
//                 <th>Month</th>
//                 <th>Basic</th>
//                 <th>Allowance</th>
//                 <th>Incentives</th>
//                 <th>PF</th>
//                 <th>Tax</th>
//                 <th>LOP</th>
//                 <th>Gross</th>
//                 <th>Net</th>
//                 <th>Total Days</th>
//                 <th>Worked Days</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {monthlySalaries.length > 0 ? (
//                 monthlySalaries.map((ms) => {
//                   const monthIncentives = monthlyIncentives[ms.month] || 0;
//                   const lop = salaryPackage?.lop || 0;
//                   const earningsGross = (ms.grossSalary || 0) + monthIncentives;
//                   const net = earningsGross - (ms.pfContributionEmployer + ms.professionalTax + lop);
//                   return (
//                     <tr key={ms.id} style={{ textAlign: "center" }}>
//                       <td>{formatMonthToWords(ms.month)}</td>
//                       <td>{ms.basic?.toFixed(2) || "0.00"}</td>
//                       <td>{((ms.flexibleBenefitPlan || 0) + (ms.specialAllowance || 0)).toFixed(2)}</td>
//                       <td>{monthIncentives.toFixed(2)}</td>
//                       <td>{ms.pfContributionEmployer?.toFixed(2) || "0.00"}</td>
//                       <td>{ms.professionalTax?.toFixed(2) || "0.00"}</td>
//                       <td>{lop.toFixed(2)}</td>
//                       <td>{earningsGross.toFixed(2)}</td>
//                       <td>{net.toFixed(2)}</td>
//                       <td>{ms.totalWorkingDays}</td>
//                       <td>{ms.workedDays}</td>
//                       <td>{ms.status || "-"}</td>
//                     </tr>
//                   );
//                 })
//               ) : (
//                 <tr>
//                   <td colSpan="12" style={{ textAlign: "center", padding: 10 }}>
//                     No salary data found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//       {/* ---------- Download Button ---------- */}
//       <div style={{ textAlign: "center", marginTop: "30px" }}>
//         <button
//           onClick={downloadPayslipPDF}
//           disabled={!selectedMonth || !filteredSalary}
//           style={{
//             width: "100%",
//             maxWidth: "320px",
//             padding: "12px 0",
//             fontSize: "16px",
//             backgroundColor: !selectedMonth || !filteredSalary ? "#ccc" : "#007bff",
//             color: "#fff",
//             border: "none",
//             borderRadius: "6px",
//             cursor: !selectedMonth || !filteredSalary ? "not-allowed" : "pointer",
//           }}
//         >
//           Download Payslip as PDF
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EmployeeSalary;


import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import companyLogo from "./download.png";

const EmployeeSalary = () => {
  const [monthlySalaries, setMonthlySalaries] = useState([]);
  const [monthlyIncentives, setMonthlyIncentives] = useState({});
  const [selectedMonth, setSelectedMonth] = useState("");
  const [message, setMessage] = useState("");
  const [salaryPackage, setSalaryPackage] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const axiosConfig = token ? { headers: { Authorization: `Bearer ${token}` } } : null;

  // Modern CSS Styles
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '10px'
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#64748b',
      fontWeight: '500'
    },
    message: {
      padding: '15px 20px',
      borderRadius: '12px',
      marginBottom: '25px',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    errorMessage: {
      background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
      color: '#991b1b',
      border: '1px solid #fca5a5'
    },
    successMessage: {
      background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
      color: '#166534',
      border: '1px solid #86efac'
    },
    salaryPackage: {
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      padding: '25px',
      borderRadius: '16px',
      border: '1px solid #e2e8f0',
      marginBottom: '30px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
    },
    packageTitle: {
      fontSize: '1.4rem',
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    packageGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '15px'
    },
    packageItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 16px',
      background: 'white',
      borderRadius: '10px',
      border: '1px solid #f1f5f9'
    },
    packageLabel: {
      fontWeight: '600',
      color: '#475569',
      fontSize: '0.9rem'
    },
    packageValue: {
      fontWeight: '700',
      color: '#1e293b',
      fontSize: '0.95rem'
    },
    monthSelector: {
      marginBottom: '30px',
      background: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
    },
    selectorLabel: {
      display: 'block',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '12px',
      fontSize: '1rem'
    },
    select: {
      width: '100%',
      maxWidth: '400px',
      padding: '12px 16px',
      border: '2px solid #e2e8f0',
      borderRadius: '10px',
      fontSize: '1rem',
      background: 'white',
      cursor: 'pointer',
      outline: 'none',
      transition: 'all 0.3s ease'
    },
    tableContainer: {
      background: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
      marginBottom: '30px'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '0.9rem'
    },
    th: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '16px 12px',
      textAlign: 'left',
      fontWeight: '600',
      fontSize: '0.85rem',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    td: {
      padding: '14px 12px',
      borderBottom: '1px solid #f1f5f9',
      color: '#374151'
    },
    tr: {
      transition: 'background 0.3s ease'
    },
    trHover: {
      background: '#f8fafc'
    },
    amount: {
      fontWeight: '600',
      color: '#059669'
    },
    deduction: {
      fontWeight: '600',
      color: '#dc2626'
    },
    statusBadge: {
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: '600',
      textTransform: 'uppercase'
    },
    statusPending: {
      background: '#fef3c7',
      color: '#d97706'
    },
    statusPaid: {
      background: '#d1fae5',
      color: '#059669'
    },
    downloadSection: {
      textAlign: 'center',
      padding: '30px'
    },
    downloadButton: {
      background: 'linear-gradient(135deg, #10b981, #059669)',
      color: 'white',
      border: 'none',
      padding: '16px 40px',
      borderRadius: '12px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px'
    },
    downloadButtonDisabled: {
      background: '#9ca3af',
      cursor: 'not-allowed',
      boxShadow: 'none'
    },
    mobileCard: {
      background: 'white',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '15px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
      border: '1px solid #f1f5f9'
    },
    mobileCardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px',
      paddingBottom: '15px',
      borderBottom: '1px solid #e2e8f0'
    },
    mobileMonth: {
      fontWeight: '700',
      color: '#1e293b',
      fontSize: '1.1rem'
    },
    mobileStatus: {
      padding: '4px 10px',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: '600'
    },
    mobileGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px'
    },
    mobileItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    },
    mobileLabel: {
      fontSize: '0.8rem',
      color: '#64748b',
      fontWeight: '500'
    },
    mobileValue: {
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#1e293b'
    },
    loadingSpinner: {
      display: 'inline-block',
      width: '20px',
      height: '20px',
      border: '3px solid #ffffff',
      borderTop: '3px solid transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    noData: {
      textAlign: 'center',
      padding: '60px 20px',
      color: '#64748b'
    },
    noDataIcon: {
      fontSize: '3rem',
      marginBottom: '15px',
      opacity: 0.5
    }
  };

  /* ---------- Format Month to Words ---------- */
  const formatMonthToWords = (monthStr) => {
    if (!monthStr) return "";
    
    const [year, month] = monthStr.split('-');
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    const monthIndex = parseInt(month, 10) - 1;
    if (monthIndex >= 0 && monthIndex < 12) {
      return `${monthNames[monthIndex]} ${year}`;
    }
    
    return monthStr;
  };

  /* ---------- Fetch Monthly Salaries ---------- */
  const fetchMonthlySalaries = async () => {
    if (!axiosConfig || !email) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/employee/salary/mymonthsalary?email=${email}`,
        axiosConfig
      );
      setMonthlySalaries(res.data || []);
    } catch (err) {
      console.error("Error fetching monthly salaries:", err);
      setMessage("Error fetching monthly salaries.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Fetch All Monthly Incentives ---------- */
  const fetchAllIncentives = async () => {
    if (!axiosConfig || monthlySalaries.length === 0) return;
    const empId = monthlySalaries[0].employee.employeeId;
    const months = [...new Set(monthlySalaries.map((ms) => ms.month))];
    const incentivesMap = {};
    await Promise.all(
      months.map(async (month) => {
        try {
          const res = await axios.get(
            `http://localhost:8080/api/employee/bonus/month/${empId}?monthYear=${month}`,
            axiosConfig
          );
          const total = res.data.reduce((sum, b) => sum + (b.incentives || 0), 0);
          incentivesMap[month] = total;
        } catch (err) {
          console.error(`Error fetching incentives for ${month}:`, err);
          incentivesMap[month] = 0;
        }
      })
    );
    setMonthlyIncentives(incentivesMap);
  };

  /* ---------- Fetch Salary Package ---------- */
  const fetchSalaryPackage = async () => {
    if (!axiosConfig || !email) {
      console.warn("Missing token or email in localStorage");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/employee/salary/mypackage?email=${email}`,
        axiosConfig
      );
      if (res.data) {
        setSalaryPackage(res.data);
        setMessage("");
      } else {
        setMessage("No salary package found for this employee.");
        setSalaryPackage(null);
      }
    } catch (err) {
      console.error("Error fetching salary package:", err);
      if (err.response?.status === 404) {
        setMessage("Salary package not found.");
      } else {
        setMessage("Error fetching salary package.");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Component Mount ---------- */
  useEffect(() => {
    fetchMonthlySalaries();
    fetchSalaryPackage();
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ---------- Fetch Incentives After Salaries ---------- */
  useEffect(() => {
    if (monthlySalaries.length > 0) {
      fetchAllIncentives();
    }
  }, [monthlySalaries]);

  const filteredSalary = monthlySalaries.find((ms) => ms.month === selectedMonth);
  const totalIncentives = selectedMonth ? (monthlyIncentives[selectedMonth] || 0) : 0;

  /* ---------- Convert Numbers to Words ---------- */
  const numberToWords = (num) => {
    const a = [
      "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
      "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
      "Eighteen", "Nineteen",
    ];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const inWords = (n) => {
      if (n < 20) return a[n];
      if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
      if (n < 1000)
        return a[Math.floor(n / 100)] + " Hundred" + (n % 100 === 0 ? "" : " and " + inWords(n % 100));
      if (n < 100000)
        return inWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 !== 0 ? " " + inWords(n % 1000) : "");
      if (n < 10000000)
        return inWords(Math.floor(n / 100000)) + " Lakh" + (n % 100000 !== 0 ? " " + inWords(n % 100000) : "");
      return inWords(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 !== 0 ? " " + inWords(n % 10000000) : "");
    };
    const rupees = Math.floor(num);
    const paise = Math.round((num - rupees) * 100);
    let words = inWords(rupees) + " Rupees";
    if (paise > 0) words += " and " + inWords(paise) + " Paise";
    return words + " Only";
  };

  /* ---------- Generate PDF ---------- */
  const downloadPayslipPDF = () => {
    if (!filteredSalary) return;
    const doc = new jsPDF();
    const pdfWidth = doc.internal.pageSize.getWidth();
    const imgProps = doc.getImageProperties(companyLogo);
    const logoWidth = 25;
    const logoHeight = (imgProps.height * logoWidth) / imgProps.width;
    doc.addImage(companyLogo, "PNG", pdfWidth / 2 - logoWidth / 2, 10, logoWidth, logoHeight);
    doc.setFontSize(16);
    doc.text("Venturebiz Promotions Private Limited", pdfWidth / 2, 40, { align: "center" });
    doc.setFontSize(12);
    
    const formattedMonth = formatMonthToWords(filteredSalary.month);
    doc.text(`Payslip for ${formattedMonth}`, pdfWidth / 2, 48, { align: "center" });
    
    const employee = filteredSalary.employee || {};
    const employeeDetails = [
      ["Name", employee.name || "-", "Date of Joining", employee.dateOfJoining || "-"],
      ["Designation", employee.deptRole || "-", "Department", employee.department || "-"],
      ["Total Work Days", filteredSalary.totalWorkingDays || 0, "Actual Work Days", filteredSalary.workedDays || 0],
      ["Location", "Bengaluru", "Bank Name", salaryPackage?.bankName || "-"],
      ["Account Number", salaryPackage?.accountNumber || "-", "PF Number", salaryPackage?.pfNumber || "-"],
      ["UAN Number", salaryPackage?.uanNumber || "-", "ESI Number", salaryPackage?.esiNumber || "-"],
      ["PAN Number", salaryPackage?.panNumber || "-", "LOP", salaryPackage?.lop?.toFixed(2) || "0.00"],
    ];
    autoTable(doc, { startY: 65, head: [], body: employeeDetails, theme: "grid", styles: { fontSize: 10 } });
    const lopDeduction = salaryPackage?.lop || 0;
    const totalDeductions =
      (filteredSalary.pfContributionEmployer || 0) +
      (filteredSalary.professionalTax || 0) +
      lopDeduction;
    const earningsGross = (filteredSalary.grossSalary || 0) + totalIncentives;
    const netPay = earningsGross - totalDeductions;
    const netPayInWords = numberToWords(netPay);
    
    const earningsDeductions = [
      ["Basic", filteredSalary.basic?.toFixed(2) || "0.00", "PF", filteredSalary.pfContributionEmployer?.toFixed(2) || "0.00"],
      ["Flexible Benefit Plan", filteredSalary.flexibleBenefitPlan?.toFixed(2) || "0.00", "Professional Tax", filteredSalary.professionalTax?.toFixed(2) || "0.00"],
      ["Special Allowance", filteredSalary.specialAllowance?.toFixed(2) || "0.00", "LOP Deduction", lopDeduction.toFixed(2)],
    ];
    
    if (totalIncentives > 0) {
      earningsDeductions.push(["Incentives", totalIncentives.toFixed(2), "Total Deductions", totalDeductions.toFixed(2)]);
    } else {
      earningsDeductions[earningsDeductions.length - 1][3] = totalDeductions.toFixed(2);
    }
    
    earningsDeductions.push(["Total Earnings", earningsGross.toFixed(2), "", ""]);
    earningsDeductions.push(["Net Pay", "", "", netPay?.toFixed(2) || "0.00"]);
    
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Earnings", "Amount", "Deductions", "Amount"]],
      body: earningsDeductions,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [50, 50, 50], textColor: [255, 255, 255] },
    });
    doc.setFontSize(11);
    doc.text(`Net Pay : ${netPayInWords}`, 14, doc.lastAutoTable.finalY + 10);
    doc.setFontSize(10);
    doc.text(
      "This is a system generated payslip and does not require signature",
      pdfWidth / 2,
      doc.lastAutoTable.finalY + 25,
      { align: "center" }
    );
    doc.save(`Payslip_${formattedMonth.replace(/\s+/g, '_')}.pdf`);
  };

  // Hover state management
  const [hoverStates, setHoverStates] = useState({});

  const handleMouseEnter = (element) => {
    setHoverStates(prev => ({ ...prev, [element]: true }));
  };

  const handleMouseLeave = (element) => {
    setHoverStates(prev => ({ ...prev, [element]: false }));
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Header */}
        {/* <div style={styles.header}>
          <h1 style={styles.title}>💰 My Salary Details</h1>
          <p style={styles.subtitle}>View and download your salary information</p>
        </div> */}

        {/* Message */}
        {message && (
          <div style={{
            ...styles.message,
            ...(message.includes('Error') ? styles.errorMessage : styles.successMessage)
          }}>
            {message.includes('Error') ? '❌' : '✅'} {message}
          </div>
        )}

        {/* Salary Package Section */}
        {salaryPackage && (
          <div style={styles.salaryPackage}>
            <h3 style={styles.packageTitle}>
              <span>💼</span>
              My Salary Package
            </h3>
            <div style={styles.packageGrid}>
              {[
                { label: 'Bank Name', value: salaryPackage.bankName || '-' },
                { label: 'Account Number', value: salaryPackage.accountNumber || '-' },
                { label: 'PF Number', value: salaryPackage.pfNumber || '-' },
                { label: 'UAN Number', value: salaryPackage.uanNumber || '-' },
                { label: 'Basic Salary', value: `₹${salaryPackage.basic?.toFixed(2) || '0.00'}` },
                { label: 'HRA', value: `₹${salaryPackage.hra?.toFixed(2) || '0.00'}` },
                { label: 'Special Allowance', value: `₹${salaryPackage.specialAllowance?.toFixed(2) || '0.00'}` },
                { label: 'LOP', value: `₹${salaryPackage.lop?.toFixed(2) || '0.00'}` }
              ].map((item, index) => (
                <div key={index} style={styles.packageItem}>
                  <span style={styles.packageLabel}>{item.label}</span>
                  <span style={styles.packageValue}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Month Selector */}
        <div style={styles.monthSelector}>
          <label style={styles.selectorLabel}>📅 Select Month</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={{
              ...styles.select,
              ...(hoverStates.monthSelect ? { borderColor: '#667eea', boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)' } : {})
            }}
            onMouseEnter={() => handleMouseEnter('monthSelect')}
            onMouseLeave={() => handleMouseLeave('monthSelect')}
          >
            <option value="">-- Select Month --</option>
            {monthlySalaries.map((ms) => (
              <option key={ms.id} value={ms.month}>
                {formatMonthToWords(ms.month)}
              </option>
            ))}
          </select>
        </div>

        {/* Salary Table - Desktop */}
        {!isMobile && (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Month</th>
                  <th style={styles.th}>Basic</th>
                  <th style={styles.th}>Allowance</th>
                  <th style={styles.th}>Incentives</th>
                  <th style={styles.th}>PF</th>
                  <th style={styles.th}>Tax</th>
                  <th style={styles.th}>LOP</th>
                  <th style={styles.th}>Gross</th>
                  <th style={styles.th}>Net</th>
                  <th style={styles.th}>Days</th>
                  <th style={styles.th}>Worked</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {monthlySalaries.length > 0 ? (
                  monthlySalaries.map((ms, index) => {
                    const monthIncentives = monthlyIncentives[ms.month] || 0;
                    const lop = salaryPackage?.lop || 0;
                    const earningsGross = (ms.grossSalary || 0) + monthIncentives;
                    const net = earningsGross - (ms.pfContributionEmployer + ms.professionalTax + lop);
                    
                    return (
                      <tr 
                        key={ms.id} 
                        style={{
                          ...styles.tr,
                          ...(hoverStates[`row-${ms.id}`] ? styles.trHover : {}),
                          ...(index % 2 === 0 ? { background: '#fafbfc' } : {})
                        }}
                        onMouseEnter={() => handleMouseEnter(`row-${ms.id}`)}
                        onMouseLeave={() => handleMouseLeave(`row-${ms.id}`)}
                      >
                        <td style={styles.td}>
                          <strong>{formatMonthToWords(ms.month)}</strong>
                        </td>
                        <td style={{...styles.td, ...styles.amount}}>
                          ₹{ms.basic?.toFixed(2) || "0.00"}
                        </td>
                        <td style={{...styles.td, ...styles.amount}}>
                          ₹{((ms.flexibleBenefitPlan || 0) + (ms.specialAllowance || 0)).toFixed(2)}
                        </td>
                        <td style={{...styles.td, ...styles.amount}}>
                          ₹{monthIncentives.toFixed(2)}
                        </td>
                        <td style={{...styles.td, ...styles.deduction}}>
                          ₹{ms.pfContributionEmployer?.toFixed(2) || "0.00"}
                        </td>
                        <td style={{...styles.td, ...styles.deduction}}>
                          ₹{ms.professionalTax?.toFixed(2) || "0.00"}
                        </td>
                        <td style={{...styles.td, ...styles.deduction}}>
                          ₹{lop.toFixed(2)}
                        </td>
                        <td style={{...styles.td, ...styles.amount}}>
                          <strong>₹{earningsGross.toFixed(2)}</strong>
                        </td>
                        <td style={{...styles.td, ...styles.amount}}>
                          <strong>₹{net.toFixed(2)}</strong>
                        </td>
                        <td style={styles.td}>{ms.totalWorkingDays}</td>
                        <td style={styles.td}>{ms.workedDays}</td>
                        <td style={styles.td}>
                          <span style={{
                            ...styles.statusBadge,
                            ...(ms.status === 'PENDING' ? styles.statusPending : styles.statusPaid)
                          }}>
                            {ms.status || "-"}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="12" style={styles.noData}>
                      <div style={styles.noDataIcon}>📊</div>
                      {loading ? 'Loading salary data...' : 'No salary data found.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile Cards */}
        {isMobile && (
          <div>
            {monthlySalaries.length > 0 ? (
              monthlySalaries.map((ms) => {
                const monthIncentives = monthlyIncentives[ms.month] || 0;
                const lop = salaryPackage?.lop || 0;
                const earningsGross = (ms.grossSalary || 0) + monthIncentives;
                const net = earningsGross - (ms.pfContributionEmployer + ms.professionalTax + lop);
                
                return (
                  <div key={ms.id} style={styles.mobileCard}>
                    <div style={styles.mobileCardHeader}>
                      <div style={styles.mobileMonth}>{formatMonthToWords(ms.month)}</div>
                      <span style={{
                        ...styles.mobileStatus,
                        ...(ms.status === 'PENDING' ? styles.statusPending : styles.statusPaid)
                      }}>
                        {ms.status}
                      </span>
                    </div>
                    <div style={styles.mobileGrid}>
                      <div style={styles.mobileItem}>
                        <span style={styles.mobileLabel}>Basic</span>
                        <span style={styles.mobileValue}>₹{ms.basic?.toFixed(2) || "0.00"}</span>
                      </div>
                      <div style={styles.mobileItem}>
                        <span style={styles.mobileLabel}>Allowance</span>
                        <span style={styles.mobileValue}>₹{((ms.flexibleBenefitPlan || 0) + (ms.specialAllowance || 0)).toFixed(2)}</span>
                      </div>
                      <div style={styles.mobileItem}>
                        <span style={styles.mobileLabel}>Incentives</span>
                        <span style={styles.mobileValue}>₹{monthIncentives.toFixed(2)}</span>
                      </div>
                      <div style={styles.mobileItem}>
                        <span style={styles.mobileLabel}>Deductions</span>
                        <span style={styles.mobileValue}>₹{(ms.pfContributionEmployer + ms.professionalTax + lop).toFixed(2)}</span>
                      </div>
                      <div style={styles.mobileItem}>
                        <span style={styles.mobileLabel}>Gross</span>
                        <span style={styles.mobileValue}>₹{earningsGross.toFixed(2)}</span>
                      </div>
                      <div style={styles.mobileItem}>
                        <span style={styles.mobileLabel}>Net Salary</span>
                        <span style={styles.mobileValue}>₹{net.toFixed(2)}</span>
                      </div>
                      <div style={styles.mobileItem}>
                        <span style={styles.mobileLabel}>Total Days</span>
                        <span style={styles.mobileValue}>{ms.totalWorkingDays}</span>
                      </div>
                      <div style={styles.mobileItem}>
                        <span style={styles.mobileLabel}>Worked Days</span>
                        <span style={styles.mobileValue}>{ms.workedDays}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{...styles.mobileCard, ...styles.noData}}>
                <div style={styles.noDataIcon}>📊</div>
                {loading ? 'Loading salary data...' : 'No salary data found.'}
              </div>
            )}
          </div>
        )}

        {/* Download Button */}
        <div style={styles.downloadSection}>
          <button
            onClick={downloadPayslipPDF}
            disabled={!selectedMonth || !filteredSalary || loading}
            style={{
              ...styles.downloadButton,
              ...((!selectedMonth || !filteredSalary || loading) ? styles.downloadButtonDisabled : {}),
              ...(hoverStates.downloadButton && selectedMonth && filteredSalary && !loading ? { 
                transform: 'translateY(-2px)', 
                boxShadow: '0 6px 20px rgba(16, 185, 129, 0.5)' 
              } : {})
            }}
            onMouseEnter={() => handleMouseEnter('downloadButton')}
            onMouseLeave={() => handleMouseLeave('downloadButton')}
          >
            {loading ? (
              <>
                <div style={styles.loadingSpinner}></div>
                Processing...
              </>
            ) : (
              <>
                📥 Download Payslip as PDF
              </>
            )}
          </button>
          {selectedMonth && filteredSalary && (
            <p style={{ marginTop: '15px', color: '#64748b', fontSize: '0.9rem' }}>
              Download payslip for <strong>{formatMonthToWords(selectedMonth)}</strong>
            </p>
          )}
        </div>
      </div>

      {/* Add CSS animations */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default EmployeeSalary;