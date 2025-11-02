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
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const axiosConfig = token ? { headers: { Authorization: `Bearer ${token}` } } : null;

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
    
    return monthStr; // fallback to original format if parsing fails
  };

  /* ---------- Fetch Monthly Salaries ---------- */
  const fetchMonthlySalaries = async () => {
    if (!axiosConfig || !email) return;
    try {
      const res = await axios.get(
        `http://localhost:8080/api/employee/salary/mymonthsalary?email=${email}`,
        axiosConfig
      );
      setMonthlySalaries(res.data || []);
    } catch (err) {
      console.error("Error fetching monthly salaries:", err);
      setMessage("Error fetching monthly salaries.");
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
    
    // ✅ Updated: Use formatted month in words
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
      ["Incentives", totalIncentives.toFixed(2), "Total Deductions", totalDeductions.toFixed(2)],
      ["Total Earnings", earningsGross.toFixed(2), "", ""],
      ["Net Pay", "", "", netPay?.toFixed(2) || "0.00"],
    ];
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

  /* ---------- Render ---------- */
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>My Salary Details</h2>
      {message && <p style={{ color: "red" }}>{message}</p>}
      {/* ---------- Salary Package Section ---------- */}
      {salaryPackage && (
        <div
          style={{
            margin: "20px 0",
            padding: "15px",
            backgroundColor: "#f9f9f9",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>My Salary Package</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}>
            <div><strong>Bank Name:</strong></div><div>{salaryPackage.bankName || "-"}</div>
            <div><strong>Account Number:</strong></div><div>{salaryPackage.accountNumber || "-"}</div>
            <div><strong>PF Number:</strong></div><div>{salaryPackage.pfNumber || "-"}</div>
            <div><strong>UAN Number:</strong></div><div>{salaryPackage.uanNumber || "-"}</div>
            <div><strong>Basic:</strong></div><div>₹{salaryPackage.basic?.toFixed(2) || "0.00"}</div>
            <div><strong>HRA:</strong></div><div>₹{salaryPackage.hra?.toFixed(2) || "0.00"}</div>
            <div><strong>Special Allowance:</strong></div><div>₹{salaryPackage.specialAllowance?.toFixed(2) || "0.00"}</div>
            <div><strong>LOP:</strong></div><div>₹{salaryPackage.lop?.toFixed(2) || "0.00"}</div>
          </div>
        </div>
      )}
      {/* ---------- Month Selector ---------- */}
      <div style={{ marginBottom: "20px" }}>
        <label>
          Select Month:
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px", fontSize: "14px" }}
          >
            <option value="">--Select--</option>
            {monthlySalaries.map((ms) => (
              <option key={ms.id} value={ms.month}>
                {formatMonthToWords(ms.month)}
              </option>
            ))}
          </select>
        </label>
      </div>
      {/* ---------- Desktop Table ---------- */}
      {!isMobile && (
        <div style={{ overflowX: "auto" }}>
          <table border="1" cellPadding="5" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f0f0f0" }}>
                <th>Month</th>
                <th>Basic</th>
                <th>Allowance</th>
                <th>Incentives</th>
                <th>PF</th>
                <th>Tax</th>
                <th>LOP</th>
                <th>Gross</th>
                <th>Net</th>
                <th>Total Days</th>
                <th>Worked Days</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {monthlySalaries.length > 0 ? (
                monthlySalaries.map((ms) => {
                  const monthIncentives = monthlyIncentives[ms.month] || 0;
                  const lop = salaryPackage?.lop || 0;
                  const earningsGross = (ms.grossSalary || 0) + monthIncentives;
                  const net = earningsGross - (ms.pfContributionEmployer + ms.professionalTax + lop);
                  return (
                    <tr key={ms.id} style={{ textAlign: "center" }}>
                      <td>{formatMonthToWords(ms.month)}</td>
                      <td>{ms.basic?.toFixed(2) || "0.00"}</td>
                      <td>{((ms.flexibleBenefitPlan || 0) + (ms.specialAllowance || 0)).toFixed(2)}</td>
                      <td>{monthIncentives.toFixed(2)}</td>
                      <td>{ms.pfContributionEmployer?.toFixed(2) || "0.00"}</td>
                      <td>{ms.professionalTax?.toFixed(2) || "0.00"}</td>
                      <td>{lop.toFixed(2)}</td>
                      <td>{earningsGross.toFixed(2)}</td>
                      <td>{net.toFixed(2)}</td>
                      <td>{ms.totalWorkingDays}</td>
                      <td>{ms.workedDays}</td>
                      <td>{ms.status || "-"}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="12" style={{ textAlign: "center", padding: 10 }}>
                    No salary data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {/* ---------- Download Button ---------- */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={downloadPayslipPDF}
          disabled={!selectedMonth || !filteredSalary}
          style={{
            width: "100%",
            maxWidth: "320px",
            padding: "12px 0",
            fontSize: "16px",
            backgroundColor: !selectedMonth || !filteredSalary ? "#ccc" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: !selectedMonth || !filteredSalary ? "not-allowed" : "pointer",
          }}
        >
          Download Payslip as PDF
        </button>
      </div>
    </div>
  );
};

export default EmployeeSalary;