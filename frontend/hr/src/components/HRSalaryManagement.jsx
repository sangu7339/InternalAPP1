// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const HRSalaryManagement = () => {
//   // ------------------ Form state ------------------
//   const [employeeId, setEmployeeId] = useState('');
//   const [basic, setBasic] = useState('');
//   const [flexibleBenefitPlan, setFlexibleBenefitPlan] = useState('');
//   const [specialAllowance, setSpecialAllowance] = useState('');
//   const [pfContributionEmployer, setPfContributionEmployer] = useState('');
//   const [professionalTax, setProfessionalTax] = useState('');
//   const [totalCostToCompany, setTotalCostToCompany] = useState('');
//   const [bankName, setBankName] = useState('');
//   const [accountNumber, setAccountNumber] = useState('');

//   // Compliance fields
//   const [pfNumber, setPfNumber] = useState('');
//   const [uanNumber, setUanNumber] = useState('');
//   const [esiNumber, setEsiNumber] = useState('');
//   const [panNumber, setPanNumber] = useState('');
//   const [lop, setLop] = useState('');

//   // ------------------ Data state ------------------
//   const [salaryPackages, setSalaryPackages] = useState([]);
//   const [monthlySalaries, setMonthlySalaries] = useState([]);
//   const [message, setMessage] = useState('');

//   // ------------------ Filters ------------------
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterMonth, setFilterMonth] = useState(''); // format YYYY-MM

//   const token = localStorage.getItem('token');

//   // ------------------ Fetch Data ------------------
//   const fetchSalaryPackages = async () => {
//     try {
//       const res = await axios.get('http://localhost:8080/api/hr/salary/all/packages', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSalaryPackages(res.data);
//     } catch (err) {
//       setMessage('Error fetching salary packages');
//       console.error(err);
//     }
//   };

//   const fetchMonthlySalaries = async () => {
//     try {
//       const res = await axios.get('http://localhost:8080/api/hr/salary/all/monthly', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMonthlySalaries(res.data);
//     } catch (err) {
//       setMessage('Error fetching monthly salaries');
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchSalaryPackages();
//     fetchMonthlySalaries();
//   }, []);

//   // ------------------ Input validation ------------------
//   const handleNumberInput = (value, setter) => {
//     if (value === '' || /^\d*\.?\d*$/.test(value)) setter(value);
//   };
//   const handleAccountNumberInput = (value) => {
//     if (value === '' || /^\d*$/.test(value)) setAccountNumber(value);
//   };

//   // ------------------ Salary Package Submit ------------------
//   const handleSalaryPackageSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       basic: parseFloat(basic) || 0,
//       flexibleBenefitPlan: parseFloat(flexibleBenefitPlan) || 0,
//       specialAllowance: parseFloat(specialAllowance) || 0,
//       pfContributionEmployer: parseFloat(pfContributionEmployer) || 0,
//       professionalTax: parseFloat(professionalTax) || 0,
//       totalCostToCompany: parseFloat(totalCostToCompany) || 0,
//       bankName,
//       accountNumber,
//       pfNumber,
//       uanNumber,
//       esiNumber,
//       panNumber,
//       lop: parseFloat(lop) || 0,
//     };

//     try {
//       await axios.post(
//         `http://localhost:8080/api/hr/salary/package?employeeId=${employeeId}`,
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setMessage(`✅ Salary package saved for employee ${employeeId}`);
//       resetForm();
//       fetchSalaryPackages();
//     } catch (err) {
//       setMessage('❌ Error saving salary package');
//       console.error(err);
//     }
//   };

//   const resetForm = () => {
//     setEmployeeId('');
//     setBasic('');
//     setFlexibleBenefitPlan('');
//     setSpecialAllowance('');
//     setPfContributionEmployer('');
//     setProfessionalTax('');
//     setTotalCostToCompany('');
//     setBankName('');
//     setAccountNumber('');
//     setPfNumber('');
//     setUanNumber('');
//     setEsiNumber('');
//     setPanNumber('');
//     setLop('');
//   };

//   const handleEditPackage = (pkg) => {
//     setEmployeeId(pkg.employee.employeeId);
//     setBasic(pkg.basic.toString());
//     setFlexibleBenefitPlan(pkg.flexibleBenefitPlan.toString());
//     setSpecialAllowance(pkg.specialAllowance.toString());
//     setPfContributionEmployer(pkg.pfContributionEmployer.toString());
//     setProfessionalTax(pkg.professionalTax.toString());
//     setTotalCostToCompany(pkg.totalCostToCompany.toString());
//     setBankName(pkg.bankName || '');
//     setAccountNumber(pkg.accountNumber || '');
//     setPfNumber(pkg.pfNumber || '');
//     setUanNumber(pkg.uanNumber || '');
//     setEsiNumber(pkg.esiNumber || '');
//     setPanNumber(pkg.panNumber || '');
//     setLop(pkg.lop?.toString() || '');
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // ------------------ Scheduler & Mark Paid ------------------
//   const handleGenerateMonthlySalary = async () => {
//     try {
//       await axios.post(`http://localhost:8080/api/hr/salary/run-scheduler`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setMessage('✅ Salary scheduler executed successfully');
//       fetchMonthlySalaries();
//     } catch (err) {
//       setMessage('❌ Error running salary scheduler');
//       console.error(err);
//     }
//   };

//   const handleMarkSalaryPaid = async (id) => {
//     try {
//       await axios.put(`http://localhost:8080/api/hr/salary/${id}/markpaid`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setMessage('✅ Salary marked as PAID');
//       fetchMonthlySalaries();
//     } catch (err) {
//       setMessage('❌ Error marking salary as paid');
//       console.error(err);
//     }
//   };

//   // ------------------ Filtering ------------------
//   const filteredPackages = salaryPackages.filter(
//     pkg =>
//       pkg.employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       pkg.employee.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const filteredMonthlySalaries = monthlySalaries
//     .filter(ms =>
//       ms.employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       ms.employee.name.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .filter(ms => !filterMonth || ms.month === filterMonth);

//   // ------------------ JSX ------------------
//   return (
//     <div style={styles.container}>
//       <h2 style={styles.header}>💼 HR Salary Management</h2>

//       {/* ------------------ Salary Package Form ------------------ */}
//       <div style={styles.formContainer}>
//         <h3 style={styles.subHeader}>Create / Update Salary Package</h3>
//         <form onSubmit={handleSalaryPackageSubmit} style={styles.form}>
//           <div style={styles.formRow}>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Employee ID *</label>
//               <input type="text" value={employeeId} onChange={e => setEmployeeId(e.target.value)} required style={styles.input}/>
//             </div>
//             <div style={styles.formGroup}><label style={styles.label}>Bank Name</label><input type="text" value={bankName} onChange={e => setBankName(e.target.value)} style={styles.input}/></div>
//             <div style={styles.formGroup}><label style={styles.label}>Account Number</label><input type="text" value={accountNumber} onChange={e => handleAccountNumberInput(e.target.value)} style={styles.input}/></div>
//           </div>

//           <div style={styles.formRow}>
//             <div style={styles.formGroup}><label style={styles.label}>PF Number</label><input type="text" value={pfNumber} onChange={e => setPfNumber(e.target.value)} style={styles.input}/></div>
//             <div style={styles.formGroup}><label style={styles.label}>UAN Number</label><input type="text" value={uanNumber} onChange={e => setUanNumber(e.target.value)} style={styles.input}/></div>
//             <div style={styles.formGroup}><label style={styles.label}>ESI Number</label><input type="text" value={esiNumber} onChange={e => setEsiNumber(e.target.value)} style={styles.input}/></div>
//             <div style={styles.formGroup}><label style={styles.label}>PAN Number</label><input type="text" value={panNumber} onChange={e => setPanNumber(e.target.value)} style={styles.input}/></div>
//             <div style={styles.formGroup}><label style={styles.label}>LOP</label><input type="text" value={lop} onChange={e => handleNumberInput(e.target.value, setLop)} style={styles.input}/></div>
//           </div>

//           <div style={styles.formRow}>
//             <div style={styles.formGroup}><label style={styles.label}>Basic</label><input type="text" value={basic} onChange={e => handleNumberInput(e.target.value, setBasic)} style={styles.input}/></div>
//             <div style={styles.formGroup}><label style={styles.label}>HRA</label><input type="text" value={flexibleBenefitPlan} onChange={e => handleNumberInput(e.target.value, setFlexibleBenefitPlan)} style={styles.input}/></div>
//             <div style={styles.formGroup}><label style={styles.label}>Special Allowance</label><input type="text" value={specialAllowance} onChange={e => handleNumberInput(e.target.value, setSpecialAllowance)} style={styles.input}/></div>
//             <div style={styles.formGroup}><label style={styles.label}>PF Contribution</label><input type="text" value={pfContributionEmployer} onChange={e => handleNumberInput(e.target.value, setPfContributionEmployer)} style={styles.input}/></div>
//             <div style={styles.formGroup}><label style={styles.label}>Professional Tax</label><input type="text" value={professionalTax} onChange={e => handleNumberInput(e.target.value, setProfessionalTax)} style={styles.input}/></div>
//             <div style={styles.formGroup}><label style={styles.label}>Total CTC</label><input type="text" value={totalCostToCompany} onChange={e => handleNumberInput(e.target.value, setTotalCostToCompany)} style={styles.input}/></div>
//           </div>

//           <div style={styles.formActions}>
//             <button type="submit" style={styles.primaryButton}>💾 {employeeId ? 'Update' : 'Create'} Salary Package</button>
//             <button type="button" onClick={resetForm} style={styles.secondaryButton}>🗑️ Clear Form</button>
//           </div>
//         </form>
//       </div>

//       {/* ------------------ Run Scheduler ------------------ */}
//       <div style={styles.actionSection}>
//         <button onClick={handleGenerateMonthlySalary} style={styles.actionButton}>⚙️ Run Salary Scheduler</button>
//       </div>

//       {message && <div style={styles.message}>{message}</div>}

//       {/* ------------------ Search & Month Filter ------------------ */}
//       <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
//         <input type="text" placeholder="🔍 Search by Employee ID or Name" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={styles.searchInput}/>
//         <input type="month" value={filterMonth} onChange={e => setFilterMonth(e.target.value)} style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #ddd' }}/>
//         <button onClick={() => setFilterMonth('')} style={{ padding: '6px 12px', cursor: 'pointer' }}>Clear Filter</button>
//       </div>

//       {/* ------------------ Salary Packages Table ------------------ */}
//       <div style={styles.tableContainer}>
//         <h3 style={styles.subHeader}>📋 Salary Packages</h3>
//         <div style={styles.tableWrapper}>
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th style={styles.th}>Emp ID</th><th style={styles.th}>Name</th><th style={styles.th}>Bank</th><th style={styles.th}>Account</th>
//                 <th style={styles.th}>PF</th><th style={styles.th}>UAN</th><th style={styles.th}>ESI</th><th style={styles.th}>PAN</th><th style={styles.th}>LOP</th>
//                 <th style={styles.th}>Basic</th><th style={styles.th}>Flexible</th><th style={styles.th}>Allowance</th>
//                 <th style={styles.th}>PF Cont</th><th style={styles.th}>Tax</th><th style={styles.th}>CTC</th><th style={styles.th}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredPackages.length > 0 ? filteredPackages.map(pkg => (
//                 <tr key={pkg.id}>
//                   <td style={styles.td}>{pkg.employee.employeeId}</td>
//                   <td style={styles.td}>{pkg.employee.name}</td>
//                   <td style={styles.td}>{pkg.bankName || '-'}</td>
//                   <td style={styles.td}>{pkg.accountNumber || '-'}</td>
//                   <td style={styles.td}>{pkg.pfNumber || '-'}</td>
//                   <td style={styles.td}>{pkg.uanNumber || '-'}</td>
//                   <td style={styles.td}>{pkg.esiNumber || '-'}</td>
//                   <td style={styles.td}>{pkg.panNumber || '-'}</td>
//                   <td style={styles.td}>{pkg.lop || 0}</td>
//                   <td style={styles.td}>{pkg.basic.toLocaleString()}</td>
//                   <td style={styles.td}>{pkg.flexibleBenefitPlan.toLocaleString()}</td>
//                   <td style={styles.td}>{pkg.specialAllowance.toLocaleString()}</td>
//                   <td style={styles.td}>{pkg.pfContributionEmployer.toLocaleString()}</td>
//                   <td style={styles.td}>{pkg.professionalTax.toLocaleString()}</td>
//                   <td style={styles.td}>{pkg.totalCostToCompany.toLocaleString()}</td>
//                   <td style={styles.td}><button onClick={() => handleEditPackage(pkg)} style={styles.editButton}>✏️ Edit</button></td>
//                 </tr>
//               )) : <tr><td colSpan="16" style={styles.noData}>No packages found.</td></tr>}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ------------------ Monthly Salaries Table ------------------ */}
//       <div style={styles.tableContainer}>
//         <h3 style={styles.subHeader}>📆 Monthly Salaries</h3>
//         <div style={styles.tableWrapper}>
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th style={styles.th}>Emp ID</th><th style={styles.th}>Name</th><th style={styles.th}>Month</th>
//                 <th style={styles.th}>Basic</th><th style={styles.th}>Allowance</th><th style={styles.th}>PF</th><th style={styles.th}>Tax</th>
//                 <th style={styles.th}>LOP Deduction</th><th style={styles.th}>Gross</th><th style={styles.th}>Net</th>
//                 <th style={styles.th}>Worked/Total</th><th style={styles.th}>Status</th><th style={styles.th}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredMonthlySalaries.length > 0 ? filteredMonthlySalaries.map(ms => {
//                 const totalAllowance = (ms.flexibleBenefitPlan || 0) + (ms.specialAllowance || 0);
//                 const lopDeduction = ms.lop ? ((ms.basic + totalAllowance) / ms.totalWorkingDays) * ms.lop : 0;
//                 const adjustedGross = (ms.grossSalary || 0) - lopDeduction;
//                 const adjustedNet = (ms.netSalary || 0) - lopDeduction;

//                 return (
//                   <tr key={ms.id}>
//                     <td style={styles.td}>{ms.employee.employeeId}</td>
//                     <td style={styles.td}>{ms.employee.name}</td>
//                     <td style={styles.td}>{ms.month}</td>
//                     <td style={styles.td}>{ms.basic?.toLocaleString() || '0'}</td>
//                     <td style={styles.td}>{totalAllowance.toLocaleString()}</td>
//                     <td style={styles.td}>{ms.pfContributionEmployer?.toLocaleString() || '0'}</td>
//                     <td style={styles.td}>{ms.professionalTax?.toLocaleString() || '0'}</td>
//                     <td style={styles.td}>{lopDeduction.toFixed(2)}</td>
//                     <td style={styles.td}>{adjustedGross.toLocaleString()}</td>
//                     <td style={styles.td}>{adjustedNet.toLocaleString()}</td>
//                     <td style={styles.td}>{ms.workedDays}/{ms.totalWorkingDays}</td>
//                     <td style={styles.td}><span style={ms.status === 'PENDING' ? styles.pending : styles.paid}>{ms.status}</span></td>
//                     <td style={styles.td}>
//                       {ms.status === 'PENDING' && (
//                         <button onClick={() => handleMarkSalaryPaid(ms.id)} style={styles.markPaidButton}>✅ Mark Paid</button>
//                       )}
//                     </td>
//                   </tr>
//                 )
//               }) : <tr><td colSpan="13" style={styles.noData}>No records found.</td></tr>}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ------------------ Styles ------------------
// const styles = {
//   container: { padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' },
//   header: { color: '#333', borderBottom: '2px solid #4CAF50', paddingBottom: '10px', marginBottom: '20px' },
//   subHeader: { color: '#555', marginBottom: '15px' },
//   formContainer: { backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px' },
//   form: { display: 'flex', flexDirection: 'column', gap: '15px' },
//   formRow: { display: 'flex', gap: '15px', flexWrap: 'wrap' },
//   formGroup: { flex: '1', minWidth: '150px' },
//   label: { display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' },
//   input: { width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' },
//   formActions: { display: 'flex', gap: '10px', marginTop: '10px' },
//   primaryButton: { backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' },
//   secondaryButton: { backgroundColor: '#6c757d', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' },
//   actionSection: { marginBottom: '20px' },
//   actionButton: { backgroundColor: '#2196F3', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' },
//   message: { padding: '10px', marginBottom: '20px', borderRadius: '4px', backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' },
//   searchInput: { padding: '8px 12px', width: '250px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' },
//   tableContainer: { backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px' },
//   tableWrapper: { overflowX: 'auto' },
//   table: { width: '100%', borderCollapse: 'collapse', fontSize: '14px' },
//   th: { backgroundColor: '#f8f9fa', padding: '12px 8px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontWeight: 'bold', color: '#333' },
//   td: { padding: '10px 8px', borderBottom: '1px solid #dee2e6', verticalAlign: 'middle' },
//   noData: { textAlign: 'center', padding: '20px', color: '#6c757d', fontStyle: 'italic' },
//   editButton: { backgroundColor: '#ffc107', color: '#212529', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },
//   markPaidButton: { backgroundColor: '#28a745', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },
//   pending: { color: '#dc3545', fontWeight: 'bold' },
//   paid: { color: '#28a745', fontWeight: 'bold' },
// };

// export default HRSalaryManagement;

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // const HRSalaryManagement = () => {
// //   // ------------------ Form state ------------------
// //   const [employeeId, setEmployeeId] = useState('');
// //   const [basic, setBasic] = useState('');
// //   const [flexibleBenefitPlan, setFlexibleBenefitPlan] = useState('');
// //   const [specialAllowance, setSpecialAllowance] = useState('');
// //   const [pfContributionEmployer, setPfContributionEmployer] = useState('');
// //   const [professionalTax, setProfessionalTax] = useState('');
// //   const [totalCostToCompany, setTotalCostToCompany] = useState('');
// //   const [bankName, setBankName] = useState('');
// //   const [accountNumber, setAccountNumber] = useState('');

// //   // Compliance fields
// //   const [pfNumber, setPfNumber] = useState('');
// //   const [uanNumber, setUanNumber] = useState('');
// //   const [esiNumber, setEsiNumber] = useState('');
// //   const [panNumber, setPanNumber] = useState('');
// //   const [lop, setLop] = useState('');

// //   // ------------------ Bonus state ------------------
// //   const [bonuses, setBonuses] = useState([]);
// //   const [bonusForm, setBonusForm] = useState({
// //     employeeId: '',
// //     incentives: '',
// //     month: ''
// //   });
// //   const [editingBonus, setEditingBonus] = useState(null);

// //   // ------------------ Data state ------------------
// //   const [salaryPackages, setSalaryPackages] = useState([]);
// //   const [monthlySalaries, setMonthlySalaries] = useState([]);
// //   const [message, setMessage] = useState('');

// //   // ------------------ Filters ------------------
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [filterMonth, setFilterMonth] = useState(''); // format YYYY-MM
// //   const [bonusFilterMonth, setBonusFilterMonth] = useState('');

// //   const token = localStorage.getItem('token');

// //   // ------------------ Fetch Data ------------------
// //   const fetchSalaryPackages = async () => {
// //     try {
// //       const res = await axios.get('http://localhost:8080/api/hr/salary/all/packages', {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setSalaryPackages(res.data);
// //     } catch (err) {
// //       setMessage('Error fetching salary packages');
// //       console.error(err);
// //     }
// //   };

// //   const fetchMonthlySalaries = async () => {
// //     try {
// //       const res = await axios.get('http://localhost:8080/api/hr/salary/all/monthly', {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setMonthlySalaries(res.data);
// //     } catch (err) {
// //       setMessage('Error fetching monthly salaries');
// //       console.error(err);
// //     }
// //   };

// //   const fetchBonuses = async () => {
// //     try {
// //       const res = await axios.get('http://localhost:8080/api/hr/bonus/all', {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setBonuses(res.data);
// //     } catch (err) {
// //       setMessage('Error fetching bonuses');
// //       console.error(err);
// //     }
// //   };

// //   const fetchBonusesByMonth = async (monthYear) => {
// //     try {
// //       const res = await axios.get(`http://localhost:8080/api/hr/bonus/month?monthYear=${monthYear}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setBonuses(res.data);
// //     } catch (err) {
// //       setMessage('Error fetching bonuses by month');
// //       console.error(err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchSalaryPackages();
// //     fetchMonthlySalaries();
// //     fetchBonuses();
// //   }, []);

// //   // ------------------ Input validation ------------------
// //   const handleNumberInput = (value, setter) => {
// //     if (value === '' || /^\d*\.?\d*$/.test(value)) setter(value);
// //   };
// //   const handleAccountNumberInput = (value) => {
// //     if (value === '' || /^\d*$/.test(value)) setAccountNumber(value);
// //   };

// //   // ------------------ Salary Package Submit ------------------
// //   const handleSalaryPackageSubmit = async (e) => {
// //     e.preventDefault();
// //     const payload = {
// //       basic: parseFloat(basic) || 0,
// //       flexibleBenefitPlan: parseFloat(flexibleBenefitPlan) || 0,
// //       specialAllowance: parseFloat(specialAllowance) || 0,
// //       pfContributionEmployer: parseFloat(pfContributionEmployer) || 0,
// //       professionalTax: parseFloat(professionalTax) || 0,
// //       totalCostToCompany: parseFloat(totalCostToCompany) || 0,
// //       bankName,
// //       accountNumber,
// //       pfNumber,
// //       uanNumber,
// //       esiNumber,
// //       panNumber,
// //       lop: parseFloat(lop) || 0,
// //     };

// //     try {
// //       await axios.post(
// //         `http://localhost:8080/api/hr/salary/package?employeeId=${employeeId}`,
// //         payload,
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       setMessage(`✅ Salary package saved for employee ${employeeId}`);
// //       resetForm();
// //       fetchSalaryPackages();
// //     } catch (err) {
// //       setMessage('❌ Error saving salary package');
// //       console.error(err);
// //     }
// //   };

// //   const resetForm = () => {
// //     setEmployeeId('');
// //     setBasic('');
// //     setFlexibleBenefitPlan('');
// //     setSpecialAllowance('');
// //     setPfContributionEmployer('');
// //     setProfessionalTax('');
// //     setTotalCostToCompany('');
// //     setBankName('');
// //     setAccountNumber('');
// //     setPfNumber('');
// //     setUanNumber('');
// //     setEsiNumber('');
// //     setPanNumber('');
// //     setLop('');
// //   };

// //   const handleEditPackage = (pkg) => {
// //     setEmployeeId(pkg.employee.employeeId);
// //     setBasic(pkg.basic.toString());
// //     setFlexibleBenefitPlan(pkg.flexibleBenefitPlan.toString());
// //     setSpecialAllowance(pkg.specialAllowance.toString());
// //     setPfContributionEmployer(pkg.pfContributionEmployer.toString());
// //     setProfessionalTax(pkg.professionalTax.toString());
// //     setTotalCostToCompany(pkg.totalCostToCompany.toString());
// //     setBankName(pkg.bankName || '');
// //     setAccountNumber(pkg.accountNumber || '');
// //     setPfNumber(pkg.pfNumber || '');
// //     setUanNumber(pkg.uanNumber || '');
// //     setEsiNumber(pkg.esiNumber || '');
// //     setPanNumber(pkg.panNumber || '');
// //     setLop(pkg.lop?.toString() || '');
// //     window.scrollTo({ top: 0, behavior: 'smooth' });
// //   };

// //   // ------------------ Bonus Management ------------------
// //   const handleBonusSubmit = async (e) => {
// //     e.preventDefault();
// //     const payload = {
// //       incentives: parseFloat(bonusForm.incentives) || 0,
// //       startDate: `${bonusForm.month}-01`, // Set to first day of month
// //       month: bonusForm.month,
// //     };

// //     try {
// //       if (editingBonus) {
// //         // Update existing bonus
// //         await axios.put(
// //           `http://localhost:8080/api/hr/bonus/update/${editingBonus.id}`,
// //           { incentives: payload.incentives },
// //           { headers: { Authorization: `Bearer ${token}` } }
// //         );
// //         setMessage('✅ Bonus updated successfully');
// //       } else {
// //         // Create new bonus
// //         await axios.post(
// //           `http://localhost:8080/api/hr/bonus/add/${bonusForm.employeeId}`,
// //           payload,
// //           { headers: { Authorization: `Bearer ${token}` } }
// //         );
// //         setMessage('✅ Bonus added successfully');
// //       }
// //       resetBonusForm();
// //       fetchBonuses();
// //     } catch (err) {
// //       setMessage('❌ Error saving bonus');
// //       console.error(err);
// //     }
// //   };

// //   const handleEditBonus = (bonus) => {
// //     setBonusForm({
// //       employeeId: bonus.employee.employeeId,
// //       incentives: bonus.incentives.toString(),
// //       month: bonus.month
// //     });
// //     setEditingBonus(bonus);
// //     window.scrollTo({ top: 0, behavior: 'smooth' });
// //   };

// //   const handleDeleteBonus = async (bonusId) => {
// //     if (window.confirm('Are you sure you want to delete this bonus?')) {
// //       try {
// //         await axios.delete(`http://localhost:8080/api/hr/bonus/delete/${bonusId}`, {
// //           headers: { Authorization: `Bearer ${token}` }
// //         });
// //         setMessage('✅ Bonus deleted successfully');
// //         fetchBonuses();
// //       } catch (err) {
// //         setMessage('❌ Error deleting bonus');
// //         console.error(err);
// //       }
// //     }
// //   };

// //   const resetBonusForm = () => {
// //     setBonusForm({
// //       employeeId: '',
// //       incentives: '',
// //       month: ''
// //     });
// //     setEditingBonus(null);
// //   };

// //   const handleBonusFilter = () => {
// //     if (bonusFilterMonth) {
// //       fetchBonusesByMonth(bonusFilterMonth);
// //     } else {
// //       fetchBonuses();
// //     }
// //   };

// //   // ------------------ Scheduler & Mark Paid ------------------
// //   const handleGenerateMonthlySalary = async () => {
// //     try {
// //       await axios.post(`http://localhost:8080/api/hr/salary/run-scheduler`, {}, {
// //         headers: { Authorization: `Bearer ${token}` }
// //       });
// //       setMessage('✅ Salary scheduler executed successfully');
// //       fetchMonthlySalaries();
// //     } catch (err) {
// //       setMessage('❌ Error running salary scheduler');
// //       console.error(err);
// //     }
// //   };

// //   const handleMarkSalaryPaid = async (id) => {
// //     try {
// //       await axios.put(`http://localhost:8080/api/hr/salary/${id}/markpaid`, {}, {
// //         headers: { Authorization: `Bearer ${token}` }
// //       });
// //       setMessage('✅ Salary marked as PAID');
// //       fetchMonthlySalaries();
// //     } catch (err) {
// //       setMessage('❌ Error marking salary as paid');
// //       console.error(err);
// //     }
// //   };

// //   // ------------------ Filtering ------------------
// //   const filteredPackages = salaryPackages.filter(
// //     pkg =>
// //       pkg.employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       pkg.employee.name.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   const filteredMonthlySalaries = monthlySalaries
// //     .filter(ms =>
// //       ms.employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       ms.employee.name.toLowerCase().includes(searchTerm.toLowerCase())
// //     )
// //     .filter(ms => !filterMonth || ms.month === filterMonth);

// //   const filteredBonuses = bonuses.filter(bonus =>
// //     bonus.employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     bonus.employee.name.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   // ------------------ JSX ------------------
// //   return (
// //     <div style={styles.container}>
// //       <h2 style={styles.header}>💼 HR Salary Management</h2>

// //       {/* ------------------ Salary Package Form ------------------ */}
// //       <div style={styles.formContainer}>
// //         <h3 style={styles.subHeader}>Create / Update Salary Package</h3>
// //         <form onSubmit={handleSalaryPackageSubmit} style={styles.form}>
// //           <div style={styles.formRow}>
// //             <div style={styles.formGroup}>
// //               <label style={styles.label}>Employee ID *</label>
// //               <input type="text" value={employeeId} onChange={e => setEmployeeId(e.target.value)} required style={styles.input}/>
// //             </div>
// //             <div style={styles.formGroup}><label style={styles.label}>Bank Name</label><input type="text" value={bankName} onChange={e => setBankName(e.target.value)} style={styles.input}/></div>
// //             <div style={styles.formGroup}><label style={styles.label}>Account Number</label><input type="text" value={accountNumber} onChange={e => handleAccountNumberInput(e.target.value)} style={styles.input}/></div>
// //           </div>

// //           <div style={styles.formRow}>
// //             <div style={styles.formGroup}><label style={styles.label}>PF Number</label><input type="text" value={pfNumber} onChange={e => setPfNumber(e.target.value)} style={styles.input}/></div>
// //             <div style={styles.formGroup}><label style={styles.label}>UAN Number</label><input type="text" value={uanNumber} onChange={e => setUanNumber(e.target.value)} style={styles.input}/></div>
// //             <div style={styles.formGroup}><label style={styles.label}>ESI Number</label><input type="text" value={esiNumber} onChange={e => setEsiNumber(e.target.value)} style={styles.input}/></div>
// //             <div style={styles.formGroup}><label style={styles.label}>PAN Number</label><input type="text" value={panNumber} onChange={e => setPanNumber(e.target.value)} style={styles.input}/></div>
// //             <div style={styles.formGroup}><label style={styles.label}>LOP</label><input type="text" value={lop} onChange={e => handleNumberInput(e.target.value, setLop)} style={styles.input}/></div>
// //           </div>

// //           <div style={styles.formRow}>
// //             <div style={styles.formGroup}><label style={styles.label}>Basic</label><input type="text" value={basic} onChange={e => handleNumberInput(e.target.value, setBasic)} style={styles.input}/></div>
// //             <div style={styles.formGroup}><label style={styles.label}>HRA</label><input type="text" value={flexibleBenefitPlan} onChange={e => handleNumberInput(e.target.value, setFlexibleBenefitPlan)} style={styles.input}/></div>
// //             <div style={styles.formGroup}><label style={styles.label}>Special Allowance</label><input type="text" value={specialAllowance} onChange={e => handleNumberInput(e.target.value, setSpecialAllowance)} style={styles.input}/></div>
// //             <div style={styles.formGroup}><label style={styles.label}>PF Contribution</label><input type="text" value={pfContributionEmployer} onChange={e => handleNumberInput(e.target.value, setPfContributionEmployer)} style={styles.input}/></div>
// //             <div style={styles.formGroup}><label style={styles.label}>Professional Tax</label><input type="text" value={professionalTax} onChange={e => handleNumberInput(e.target.value, setProfessionalTax)} style={styles.input}/></div>
// //             <div style={styles.formGroup}><label style={styles.label}>Total CTC</label><input type="text" value={totalCostToCompany} onChange={e => handleNumberInput(e.target.value, setTotalCostToCompany)} style={styles.input}/></div>
// //           </div>

// //           <div style={styles.formActions}>
// //             <button type="submit" style={styles.primaryButton}>💾 {employeeId ? 'Update' : 'Create'} Salary Package</button>
// //             <button type="button" onClick={resetForm} style={styles.secondaryButton}>🗑️ Clear Form</button>
// //           </div>
// //         </form>
// //       </div>

// //       {/* ------------------ Bonus Management Form ------------------ */}
// //       <div style={styles.formContainer}>
// //         <h3 style={styles.subHeader}>🎯 Bonus/Incentives Management</h3>
// //         <form onSubmit={handleBonusSubmit} style={styles.form}>
// //           <div style={styles.formRow}>
// //             <div style={styles.formGroup}>
// //               <label style={styles.label}>Employee ID *</label>
// //               <input 
// //                 type="text" 
// //                 value={bonusForm.employeeId} 
// //                 onChange={e => setBonusForm({...bonusForm, employeeId: e.target.value})} 
// //                 required 
// //                 style={styles.input}
// //               />
// //             </div>
// //             <div style={styles.formGroup}>
// //               <label style={styles.label}>Incentives Amount *</label>
// //               <input 
// //                 type="text" 
// //                 value={bonusForm.incentives} 
// //                 onChange={e => handleNumberInput(e.target.value, (val) => setBonusForm({...bonusForm, incentives: val}))} 
// //                 required 
// //                 style={styles.input}
// //               />
// //             </div>
// //             <div style={styles.formGroup}>
// //               <label style={styles.label}>Month *</label>
// //               <input 
// //                 type="month" 
// //                 value={bonusForm.month} 
// //                 onChange={e => setBonusForm({...bonusForm, month: e.target.value})} 
// //                 required 
// //                 style={styles.input}
// //               />
// //             </div>
// //           </div>
// //           <div style={styles.formActions}>
// //             <button type="submit" style={styles.primaryButton}>
// //               💰 {editingBonus ? 'Update' : 'Add'} Bonus
// //             </button>
// //             <button type="button" onClick={resetBonusForm} style={styles.secondaryButton}>
// //               🗑️ Clear
// //             </button>
// //           </div>
// //         </form>
// //       </div>

// //       {/* ------------------ Run Scheduler ------------------ */}
// //       <div style={styles.actionSection}>
// //         {/* <button onClick={handleGenerateMonthlySalary} style={styles.actionButton}>⚙️ Run Salary Scheduler</button> */}
// //       </div>

// //       {message && <div style={styles.message}>{message}</div>}

// //       {/* ------------------ Search & Month Filter ------------------ */}
// //       <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
// //         <input type="text" placeholder="🔍 Search by Employee ID or Name" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={styles.searchInput}/>
// //         <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
// //           <label style={styles.filterLabel}>Salary Month:</label>
// //           <input type="month" value={filterMonth} onChange={e => setFilterMonth(e.target.value)} style={styles.filterInput}/>
// //           <button onClick={() => setFilterMonth('')} style={styles.clearButton}>Clear</button>
// //         </div>
// //         <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
// //           <label style={styles.filterLabel}>Bonus Month:</label>
// //           <input type="month" value={bonusFilterMonth} onChange={e => setBonusFilterMonth(e.target.value)} style={styles.filterInput}/>
// //           <button onClick={handleBonusFilter} style={styles.filterButton}>Filter</button>
// //           <button onClick={() => { setBonusFilterMonth(''); fetchBonuses(); }} style={styles.clearButton}>Clear</button>
// //         </div>
// //       </div>

// //       {/* ------------------ Bonuses Table ------------------ */}
// //       <div style={styles.tableContainer}>
// //         <h3 style={styles.subHeader}>🎯 Bonuses & Incentives</h3>
// //         <div style={styles.tableWrapper}>
// //           <table style={styles.table}>
// //             <thead>
// //               <tr>
// //                 <th style={styles.th}>Emp ID</th>
// //                 <th style={styles.th}>Name</th>
// //                 <th style={styles.th}>Incentives</th>
// //                 <th style={styles.th}>Month</th>
// //                 <th style={styles.th}>Start Date</th>
// //                 <th style={styles.th}>Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {filteredBonuses.length > 0 ? filteredBonuses.map(bonus => (
// //                 <tr key={bonus.id}>
// //                   <td style={styles.td}>{bonus.employee.employeeId}</td>
// //                   <td style={styles.td}>{bonus.employee.name}</td>
// //                   <td style={styles.td}>₹{bonus.incentives.toLocaleString()}</td>
// //                   <td style={styles.td}>{bonus.month}</td>
// //                   <td style={styles.td}>{bonus.startDate}</td>
// //                   <td style={styles.td}>
// //                     <button onClick={() => handleEditBonus(bonus)} style={styles.editButton}>✏️ Edit</button>
// //                     <button onClick={() => handleDeleteBonus(bonus.id)} style={styles.deleteButton}>🗑️ Delete</button>
// //                   </td>
// //                 </tr>
// //               )) : <tr><td colSpan="6" style={styles.noData}>No bonuses found.</td></tr>}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       {/* ------------------ Salary Packages Table ------------------ */}
// //       <div style={styles.tableContainer}>
// //         <h3 style={styles.subHeader}>📋 Salary Packages</h3>
// //         <div style={styles.tableWrapper}>
// //           <table style={styles.table}>
// //             <thead>
// //               <tr>
// //                 <th style={styles.th}>Emp ID</th><th style={styles.th}>Name</th><th style={styles.th}>Bank</th><th style={styles.th}>Account</th>
// //                 <th style={styles.th}>PF</th><th style={styles.th}>UAN</th><th style={styles.th}>ESI</th><th style={styles.th}>PAN</th><th style={styles.th}>LOP</th>
// //                 <th style={styles.th}>Basic</th><th style={styles.th}>Flexible</th><th style={styles.th}>Allowance</th>
// //                 <th style={styles.th}>PF Cont</th><th style={styles.th}>Tax</th><th style={styles.th}>CTC</th><th style={styles.th}>Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {filteredPackages.length > 0 ? filteredPackages.map(pkg => (
// //                 <tr key={pkg.id}>
// //                   <td style={styles.td}>{pkg.employee.employeeId}</td>
// //                   <td style={styles.td}>{pkg.employee.name}</td>
// //                   <td style={styles.td}>{pkg.bankName || '-'}</td>
// //                   <td style={styles.td}>{pkg.accountNumber || '-'}</td>
// //                   <td style={styles.td}>{pkg.pfNumber || '-'}</td>
// //                   <td style={styles.td}>{pkg.uanNumber || '-'}</td>
// //                   <td style={styles.td}>{pkg.esiNumber || '-'}</td>
// //                   <td style={styles.td}>{pkg.panNumber || '-'}</td>
// //                   <td style={styles.td}>{pkg.lop || 0}</td>
// //                   <td style={styles.td}>{pkg.basic.toLocaleString()}</td>
// //                   <td style={styles.td}>{pkg.flexibleBenefitPlan.toLocaleString()}</td>
// //                   <td style={styles.td}>{pkg.specialAllowance.toLocaleString()}</td>
// //                   <td style={styles.td}>{pkg.pfContributionEmployer.toLocaleString()}</td>
// //                   <td style={styles.td}>{pkg.professionalTax.toLocaleString()}</td>
// //                   <td style={styles.td}>{pkg.totalCostToCompany.toLocaleString()}</td>
// //                   <td style={styles.td}><button onClick={() => handleEditPackage(pkg)} style={styles.editButton}>✏️ Edit</button></td>
// //                 </tr>
// //               )) : <tr><td colSpan="16" style={styles.noData}>No packages found.</td></tr>}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       {/* ------------------ Monthly Salaries Table ------------------ */}
// //       <div style={styles.tableContainer}>
// //         <h3 style={styles.subHeader}>📆 Monthly Salaries (Including Bonuses)</h3>
// //         <div style={styles.tableWrapper}>
// //           <table style={styles.table}>
// //             <thead>
// //               <tr>
// //                 <th style={styles.th}>Emp ID</th><th style={styles.th}>Name</th><th style={styles.th}>Month</th>
// //                 <th style={styles.th}>Basic</th><th style={styles.th}>Allowance</th><th style={styles.th}>Bonus</th>
// //                 <th style={styles.th}>PF</th><th style={styles.th}>Tax</th>
// //                 <th style={styles.th}>LOP Deduction</th><th style={styles.th}>Gross</th><th style={styles.th}>Net</th>
// //                 <th style={styles.th}>Worked/Total</th><th style={styles.th}>Status</th><th style={styles.th}>Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {filteredMonthlySalaries.length > 0 ? filteredMonthlySalaries.map(ms => {
// //                 // Calculate monthly bonuses for this employee and month
// //                 const monthlyBonus = bonuses
// //                   .filter(b => b.employee.employeeId === ms.employee.employeeId && b.month === ms.month)
// //                   .reduce((sum, bonus) => sum + bonus.incentives, 0);

// //                 const totalAllowance = (ms.flexibleBenefitPlan || 0) + (ms.specialAllowance || 0);
// //                 const lopDeduction = ms.lop ? ((ms.basic + totalAllowance) / ms.totalWorkingDays) * ms.lop : 0;
                
// //                 // Include bonus in calculations
// //                 const adjustedGross = (ms.grossSalary || 0) - lopDeduction + monthlyBonus;
// //                 const adjustedNet = (ms.netSalary || 0) - lopDeduction + monthlyBonus;

// //                 return (
// //                   <tr key={ms.id}>
// //                     <td style={styles.td}>{ms.employee.employeeId}</td>
// //                     <td style={styles.td}>{ms.employee.name}</td>
// //                     <td style={styles.td}>{ms.month}</td>
// //                     <td style={styles.td}>{ms.basic?.toLocaleString() || '0'}</td>
// //                     <td style={styles.td}>{totalAllowance.toLocaleString()}</td>
// //                     <td style={styles.td}>{monthlyBonus.toLocaleString()}</td>
// //                     <td style={styles.td}>{ms.pfContributionEmployer?.toLocaleString() || '0'}</td>
// //                     <td style={styles.td}>{ms.professionalTax?.toLocaleString() || '0'}</td>
// //                     <td style={styles.td}>{lopDeduction.toFixed(2)}</td>
// //                     <td style={styles.td}>{adjustedGross.toLocaleString()}</td>
// //                     <td style={styles.td}>{adjustedNet.toLocaleString()}</td>
// //                     <td style={styles.td}>{ms.workedDays}/{ms.totalWorkingDays}</td>
// //                     <td style={styles.td}><span style={ms.status === 'PENDING' ? styles.pending : styles.paid}>{ms.status}</span></td>
// //                     <td style={styles.td}>
// //                       {ms.status === 'PENDING' && (
// //                         <button onClick={() => handleMarkSalaryPaid(ms.id)} style={styles.markPaidButton}>✅ Mark Paid</button>
// //                       )}
// //                     </td>
// //                   </tr>
// //                 )
// //               }) : <tr><td colSpan="14" style={styles.noData}>No records found.</td></tr>}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // ------------------ Updated Styles ------------------
// // const styles = {
// //   container: { padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' },
// //   header: { color: '#333', borderBottom: '2px solid #4CAF50', paddingBottom: '10px', marginBottom: '20px' },
// //   subHeader: { color: '#555', marginBottom: '15px' },
// //   formContainer: { backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px' },
// //   form: { display: 'flex', flexDirection: 'column', gap: '15px' },
// //   formRow: { display: 'flex', gap: '15px', flexWrap: 'wrap' },
// //   formGroup: { flex: '1', minWidth: '150px' },
// //   label: { display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' },
// //   input: { width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' },
// //   formActions: { display: 'flex', gap: '10px', marginTop: '10px' },
// //   primaryButton: { backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' },
// //   secondaryButton: { backgroundColor: '#6c757d', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' },
// //   actionSection: { marginBottom: '20px' },
// //   actionButton: { backgroundColor: '#2196F3', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' },
// //   message: { padding: '10px', marginBottom: '20px', borderRadius: '4px', backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' },
// //   searchInput: { padding: '8px 12px', width: '250px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' },
// //   filterLabel: { fontSize: '14px', fontWeight: 'bold', color: '#555' },
// //   filterInput: { padding: '6px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' },
// //   filterButton: { backgroundColor: '#17a2b8', color: 'white', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' },
// //   clearButton: { backgroundColor: '#6c757d', color: 'white', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' },
// //   tableContainer: { backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px' },
// //   tableWrapper: { overflowX: 'auto' },
// //   table: { width: '100%', borderCollapse: 'collapse', fontSize: '14px' },
// //   th: { backgroundColor: '#f8f9fa', padding: '12px 8px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontWeight: 'bold', color: '#333' },
// //   td: { padding: '10px 8px', borderBottom: '1px solid #dee2e6', verticalAlign: 'middle' },
// //   noData: { textAlign: 'center', padding: '20px', color: '#6c757d', fontStyle: 'italic' },
// //   editButton: { backgroundColor: '#ffc107', color: '#212529', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', marginRight: '5px' },
// //   deleteButton: { backgroundColor: '#dc3545', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },
// //   markPaidButton: { backgroundColor: '#28a745', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },
// //   pending: { color: '#dc3545', fontWeight: 'bold' },
// //   paid: { color: '#28a745', fontWeight: 'bold' },
// // };

// // // export default HRSalaryManagement;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const HRSalaryManagement = () => {
//   // ------------------ Form state ------------------
//   const [employeeId, setEmployeeId] = useState('');
//   const [basic, setBasic] = useState('');
//   const [flexibleBenefitPlan, setFlexibleBenefitPlan] = useState('');
//   const [specialAllowance, setSpecialAllowance] = useState('');
//   const [pfContributionEmployer, setPfContributionEmployer] = useState('');
//   const [professionalTax, setProfessionalTax] = useState('');
//   const [totalCostToCompany, setTotalCostToCompany] = useState('');
//   const [bankName, setBankName] = useState('');
//   const [accountNumber, setAccountNumber] = useState('');

//   // Compliance fields
//   const [pfNumber, setPfNumber] = useState('');
//   const [uanNumber, setUanNumber] = useState('');
//   const [esiNumber, setEsiNumber] = useState('');
//   const [panNumber, setPanNumber] = useState('');
//   const [lop, setLop] = useState('');

//   // ------------------ Bonus state ------------------
//   const [bonuses, setBonuses] = useState([]);
//   const [bonusForm, setBonusForm] = useState({
//     employeeId: '',
//     incentives: '',
//     month: ''
//   });
//   const [editingBonus, setEditingBonus] = useState(null);

//   // ------------------ Data state ------------------
//   const [salaryPackages, setSalaryPackages] = useState([]);
//   const [monthlySalaries, setMonthlySalaries] = useState([]);
//   const [message, setMessage] = useState('');

//   // ------------------ Filters ------------------
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterMonth, setFilterMonth] = useState(''); // format YYYY-MM
//   const [bonusFilterMonth, setBonusFilterMonth] = useState('');

//   const token = localStorage.getItem('token');

//   // ------------------ Fetch Data ------------------
//   const fetchSalaryPackages = async () => {
//     try {
//       const res = await axios.get('http://localhost:8080/api/hr/salary/all/packages', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSalaryPackages(res.data);
//     } catch (err) {
//       setMessage('Error fetching salary packages');
//       console.error(err);
//     }
//   };

//   const fetchMonthlySalaries = async () => {
//     try {
//       const res = await axios.get('http://localhost:8080/api/hr/salary/all/monthly', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMonthlySalaries(res.data);
//     } catch (err) {
//       setMessage('Error fetching monthly salaries');
//       console.error(err);
//     }
//   };

//   const fetchBonuses = async () => {
//     try {
//       const res = await axios.get('http://localhost:8080/api/hr/bonus/all', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setBonuses(res.data);
//     } catch (err) {
//       setMessage('Error fetching bonuses');
//       console.error(err);
//     }
//   };

//   const fetchBonusesByMonth = async (monthYear) => {
//     try {
//       const res = await axios.get(`http://localhost:8080/api/hr/bonus/month?monthYear=${monthYear}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setBonuses(res.data);
//     } catch (err) {
//       setMessage('Error fetching bonuses by month');
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchSalaryPackages();
//     fetchMonthlySalaries();
//     fetchBonuses();
//   }, []);

//   // ------------------ Input validation ------------------
//   const handleNumberInput = (value, setter) => {
//     if (value === '' || /^\d*\.?\d*$/.test(value)) setter(value);
//   };
//   const handleAccountNumberInput = (value) => {
//     if (value === '' || /^\d*$/.test(value)) setAccountNumber(value);
//   };

//   // ------------------ Salary Package Submit ------------------
//   const handleSalaryPackageSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       basic: parseFloat(basic) || 0,
//       flexibleBenefitPlan: parseFloat(flexibleBenefitPlan) || 0,
//       specialAllowance: parseFloat(specialAllowance) || 0,
//       pfContributionEmployer: parseFloat(pfContributionEmployer) || 0,
//       professionalTax: parseFloat(professionalTax) || 0,
//       totalCostToCompany: parseFloat(totalCostToCompany) || 0,
//       bankName,
//       accountNumber,
//       pfNumber,
//       uanNumber,
//       esiNumber,
//       panNumber,
//       lop: parseFloat(lop) || 0,
//     };

//     try {
//       await axios.post(
//         `http://localhost:8080/api/hr/salary/package?employeeId=${employeeId}`,
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setMessage(`✅ Salary package saved for employee ${employeeId}`);
//       resetForm();
//       fetchSalaryPackages();
//     } catch (err) {
//       setMessage('❌ Error saving salary package');
//       console.error(err);
//     }
//   };

//   const resetForm = () => {
//     setEmployeeId('');
//     setBasic('');
//     setFlexibleBenefitPlan('');
//     setSpecialAllowance('');
//     setPfContributionEmployer('');
//     setProfessionalTax('');
//     setTotalCostToCompany('');
//     setBankName('');
//     setAccountNumber('');
//     setPfNumber('');
//     setUanNumber('');
//     setEsiNumber('');
//     setPanNumber('');
//     setLop('');
//   };

//   const handleEditPackage = (pkg) => {
//     setEmployeeId(pkg.employee.employeeId);
//     setBasic(pkg.basic.toString());
//     setFlexibleBenefitPlan(pkg.flexibleBenefitPlan.toString());
//     setSpecialAllowance(pkg.specialAllowance.toString());
//     setPfContributionEmployer(pkg.pfContributionEmployer.toString());
//     setProfessionalTax(pkg.professionalTax.toString());
//     setTotalCostToCompany(pkg.totalCostToCompany.toString());
//     setBankName(pkg.bankName || '');
//     setAccountNumber(pkg.accountNumber || '');
//     setPfNumber(pkg.pfNumber || '');
//     setUanNumber(pkg.uanNumber || '');
//     setEsiNumber(pkg.esiNumber || '');
//     setPanNumber(pkg.panNumber || '');
//     setLop(pkg.lop?.toString() || '');
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // ------------------ Bonus Management ------------------
//   const handleBonusSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       incentives: parseFloat(bonusForm.incentives) || 0,
//       startDate: `${bonusForm.month}-01`, // Set to first day of month
//       month: bonusForm.month,
//     };

//     try {
//       if (editingBonus) {
//         // Update existing bonus
//         await axios.put(
//           `http://localhost:8080/api/hr/bonus/update/${editingBonus.id}`,
//           { incentives: payload.incentives },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setMessage('✅ Bonus updated successfully');
//       } else {
//         // Create new bonus
//         await axios.post(
//           `http://localhost:8080/api/hr/bonus/add/${bonusForm.employeeId}`,
//           payload,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setMessage('✅ Bonus added successfully');
//       }
//       resetBonusForm();
//       fetchBonuses();
//     } catch (err) {
//       setMessage('❌ Error saving bonus');
//       console.error(err);
//     }
//   };

//   const handleEditBonus = (bonus) => {
//     setBonusForm({
//       employeeId: bonus.employee.employeeId,
//       incentives: bonus.incentives.toString(),
//       month: bonus.month
//     });
//     setEditingBonus(bonus);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleDeleteBonus = async (bonusId) => {
//     if (window.confirm('Are you sure you want to delete this bonus?')) {
//       try {
//         await axios.delete(`http://localhost:8080/api/hr/bonus/delete/${bonusId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setMessage('✅ Bonus deleted successfully');
//         fetchBonuses();
//       } catch (err) {
//         setMessage('❌ Error deleting bonus');
//         console.error(err);
//       }
//     }
//   };

//   const resetBonusForm = () => {
//     setBonusForm({
//       employeeId: '',
//       incentives: '',
//       month: ''
//     });
//     setEditingBonus(null);
//   };

//   const handleBonusFilter = () => {
//     if (bonusFilterMonth) {
//       fetchBonusesByMonth(bonusFilterMonth);
//     } else {
//       fetchBonuses();
//     }
//   };

//   // ------------------ Scheduler & Mark Paid ------------------
//   const handleGenerateMonthlySalary = async () => {
//     try {
//       await axios.post(`http://localhost:8080/api/hr/salary/run-scheduler`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setMessage('✅ Salary scheduler executed successfully');
//       fetchMonthlySalaries();
//     } catch (err) {
//       setMessage('❌ Error running salary scheduler');
//       console.error(err);
//     }
//   };

//   const handleMarkSalaryPaid = async (id) => {
//     try {
//       await axios.put(`http://localhost:8080/api/hr/salary/${id}/markpaid`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setMessage('✅ Salary marked as PAID');
//       fetchMonthlySalaries();
//     } catch (err) {
//       setMessage('❌ Error marking salary as paid');
//       console.error(err);
//     }
//   };

//   // ------------------ Filtering ------------------
//   const filteredPackages = salaryPackages.filter(
//     pkg =>
//       pkg.employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       pkg.employee.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const filteredMonthlySalaries = monthlySalaries
//     .filter(ms =>
//       ms.employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       ms.employee.name.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .filter(ms => !filterMonth || ms.month === filterMonth);

//   const filteredBonuses = bonuses.filter(bonus =>
//     bonus.employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     bonus.employee.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // ------------------ JSX ------------------
//   return (
//     <div style={styles.container}>
//       <h2 style={styles.header}>💼 HR Salary Management</h2>

//       {/* ------------------ Salary Package Form ------------------ */}
//       <div style={styles.formContainer}>
//         <h3 style={styles.subHeader}>Create / Update Salary Package</h3>
//         <form onSubmit={handleSalaryPackageSubmit} style={styles.form}>
//           <div style={styles.formRow}>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Employee ID *</label>
//               <input type="text" value={employeeId} onChange={e => setEmployeeId(e.target.value)} required style={styles.input}/>
//             </div>
//             <div style={styles.formGroup}><label style={styles.label}>Bank Name</label><input type="text" value={bankName} onChange={e => setBankName(e.target.value)} style={styles.input}/></div>
//             <div style={styles.formGroup}><label style={styles.label}>Account Number</label><input type="text" value={accountNumber} onChange={e => handleAccountNumberInput(e.target.value)} style={styles.input}/></div>
//           </div>

//           <div style={styles.formRow}>
//             <div style={styles.formGroup}><label style={styles.label}>PF Number</label><input type="text" value={pfNumber} onChange={e => setPfNumber(e.target.value)} style={styles.input}/></div>
//             <div style={styles.formGroup}><label style={styles.label}>UAN Number</label><input type="text" value={uanNumber} onChange={e => setUanNumber(e.target.value)} style={styles.input}/></div>
//             <div style={styles.formGroup}><label style={styles.label}>ESI Number</label><input type="text" value={esiNumber} onChange={e => setEsiNumber(e.target.value)} style={styles.input}/></div>
//             <div style={styles.formGroup}><label style={styles.label}>PAN Number</label><input type="text" value={panNumber} onChange={e => setPanNumber(e.target.value)} style={styles.input}/></div>
//             <div style={styles.formGroup}><label style={styles.label}>LOP</label><input type="text" value={lop} onChange={e => handleNumberInput(e.target.value, setLop)} style={styles.input}/></div>
//           </div>

//           <div style={styles.formRow}>
//             <div style={styles.formGroup}><label style={styles.label}>Basic</label><input type="text" value={basic} onChange={e => handleNumberInput(e.target.value, setBasic)} style={styles.input}/></div>
//             <div style={styles.formGroup}><label style={styles.label}>HRA</label><input type="text" value={flexibleBenefitPlan} onChange={e => handleNumberInput(e.target.value, setFlexibleBenefitPlan)} style={styles.input}/></div>
//             <div style={styles.formGroup}><label style={styles.label}>Special Allowance</label><input type="text" value={specialAllowance} onChange={e => handleNumberInput(e.target.value, setSpecialAllowance)} style={styles.input}/></div>
//             <div style={styles.formGroup}><label style={styles.label}>PF Contribution</label><input type="text" value={pfContributionEmployer} onChange={e => handleNumberInput(e.target.value, setPfContributionEmployer)} style={styles.input}/></div>
//             <div style={styles.formGroup}><label style={styles.label}>Professional Tax</label><input type="text" value={professionalTax} onChange={e => handleNumberInput(e.target.value, setProfessionalTax)} style={styles.input}/></div>
//             <div style={styles.formGroup}><label style={styles.label}>Total CTC</label><input type="text" value={totalCostToCompany} onChange={e => handleNumberInput(e.target.value, setTotalCostToCompany)} style={styles.input}/></div>
//           </div>

//           <div style={styles.formActions}>
//             <button type="submit" style={styles.primaryButton}>💾 {employeeId ? 'Update' : 'Create'} Salary Package</button>
//             <button type="button" onClick={resetForm} style={styles.secondaryButton}>🗑️ Clear Form</button>
//           </div>
//         </form>
//       </div>

//       {/* ------------------ Bonus Management Form ------------------ */}
//       <div style={styles.formContainer}>
//         <h3 style={styles.subHeader}>🎯 Bonus/Incentives Management</h3>
//         <form onSubmit={handleBonusSubmit} style={styles.form}>
//           <div style={styles.formRow}>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Employee ID *</label>
//               <input 
//                 type="text" 
//                 value={bonusForm.employeeId} 
//                 onChange={e => setBonusForm({...bonusForm, employeeId: e.target.value})} 
//                 required 
//                 style={styles.input}
//               />
//             </div>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Incentives Amount *</label>
//               <input 
//                 type="text" 
//                 value={bonusForm.incentives} 
//                 onChange={e => handleNumberInput(e.target.value, (val) => setBonusForm({...bonusForm, incentives: val}))} 
//                 required 
//                 style={styles.input}
//               />
//             </div>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Month *</label>
//               <input 
//                 type="month" 
//                 value={bonusForm.month} 
//                 onChange={e => setBonusForm({...bonusForm, month: e.target.value})} 
//                 required 
//                 style={styles.input}
//               />
//             </div>
//           </div>
//           <div style={styles.formActions}>
//             <button type="submit" style={styles.primaryButton}>
//               💰 {editingBonus ? 'Update' : 'Add'} Bonus
//             </button>
//             <button type="button" onClick={resetBonusForm} style={styles.secondaryButton}>
//               🗑️ Clear
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* ------------------ Run Scheduler ------------------ */}
//       <div style={styles.actionSection}>
//         <button onClick={handleGenerateMonthlySalary} style={styles.actionButton}>⚙️ Run Salary Scheduler</button>
//       </div>

//       {message && <div style={styles.message}>{message}</div>}

//       {/* ------------------ Search & Month Filter ------------------ */}
//       <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
//         <input type="text" placeholder="🔍 Search by Employee ID or Name" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={styles.searchInput}/>
//         <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
//           <label style={styles.filterLabel}>Salary Month:</label>
//           <input type="month" value={filterMonth} onChange={e => setFilterMonth(e.target.value)} style={styles.filterInput}/>
//           <button onClick={() => setFilterMonth('')} style={styles.clearButton}>Clear</button>
//         </div>
//         <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
//           <label style={styles.filterLabel}>Bonus Month:</label>
//           <input type="month" value={bonusFilterMonth} onChange={e => setBonusFilterMonth(e.target.value)} style={styles.filterInput}/>
//           <button onClick={handleBonusFilter} style={styles.filterButton}>Filter</button>
//           <button onClick={() => { setBonusFilterMonth(''); fetchBonuses(); }} style={styles.clearButton}>Clear</button>
//         </div>
//       </div>

//       {/* ------------------ Bonuses Table ------------------ */}
//       <div style={styles.tableContainer}>
//         <h3 style={styles.subHeader}>🎯 Bonuses & Incentives</h3>
//         <div style={styles.tableWrapper}>
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th style={styles.th}>Emp ID</th>
//                 <th style={styles.th}>Name</th>
//                 <th style={styles.th}>Incentives</th>
//                 <th style={styles.th}>Month</th>
//                 <th style={styles.th}>Start Date</th>
//                 <th style={styles.th}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredBonuses.length > 0 ? filteredBonuses.map(bonus => (
//                 <tr key={bonus.id}>
//                   <td style={styles.td}>{bonus.employee.employeeId}</td>
//                   <td style={styles.td}>{bonus.employee.name}</td>
//                   <td style={styles.td}>₹{bonus.incentives.toLocaleString()}</td>
//                   <td style={styles.td}>{bonus.month}</td>
//                   <td style={styles.td}>{bonus.startDate}</td>
//                   <td style={styles.td}>
//                     <button onClick={() => handleEditBonus(bonus)} style={styles.editButton}>✏️ Edit</button>
//                     <button onClick={() => handleDeleteBonus(bonus.id)} style={styles.deleteButton}>🗑️ Delete</button>
//                   </td>
//                 </tr>
//               )) : <tr><td colSpan="6" style={styles.noData}>No bonuses found.</td></tr>}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ------------------ Salary Packages Table ------------------ */}
//       <div style={styles.tableContainer}>
//         <h3 style={styles.subHeader}>📋 Salary Packages</h3>
//         <div style={styles.tableWrapper}>
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th style={styles.th}>Emp ID</th><th style={styles.th}>Name</th><th style={styles.th}>Bank</th><th style={styles.th}>Account</th>
//                 <th style={styles.th}>PF</th><th style={styles.th}>UAN</th><th style={styles.th}>ESI</th><th style={styles.th}>PAN</th><th style={styles.th}>LOP</th>
//                 <th style={styles.th}>Basic</th><th style={styles.th}>Flexible</th><th style={styles.th}>Allowance</th>
//                 <th style={styles.th}>PF Cont</th><th style={styles.th}>Tax</th><th style={styles.th}>CTC</th><th style={styles.th}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredPackages.length > 0 ? filteredPackages.map(pkg => (
//                 <tr key={pkg.id}>
//                   <td style={styles.td}>{pkg.employee.employeeId}</td>
//                   <td style={styles.td}>{pkg.employee.name}</td>
//                   <td style={styles.td}>{pkg.bankName || '-'}</td>
//                   <td style={styles.td}>{pkg.accountNumber || '-'}</td>
//                   <td style={styles.td}>{pkg.pfNumber || '-'}</td>
//                   <td style={styles.td}>{pkg.uanNumber || '-'}</td>
//                   <td style={styles.td}>{pkg.esiNumber || '-'}</td>
//                   <td style={styles.td}>{pkg.panNumber || '-'}</td>
//                   <td style={styles.td}>{pkg.lop || 0}</td>
//                   <td style={styles.td}>{pkg.basic.toLocaleString()}</td>
//                   <td style={styles.td}>{pkg.flexibleBenefitPlan.toLocaleString()}</td>
//                   <td style={styles.td}>{pkg.specialAllowance.toLocaleString()}</td>
//                   <td style={styles.td}>{pkg.pfContributionEmployer.toLocaleString()}</td>
//                   <td style={styles.td}>{pkg.professionalTax.toLocaleString()}</td>
//                   <td style={styles.td}>{pkg.totalCostToCompany.toLocaleString()}</td>
//                   <td style={styles.td}><button onClick={() => handleEditPackage(pkg)} style={styles.editButton}>✏️ Edit</button></td>
//                 </tr>
//               )) : <tr><td colSpan="16" style={styles.noData}>No packages found.</td></tr>}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ------------------ Monthly Salaries Table ------------------ */}
//       <div style={styles.tableContainer}>
//         <h3 style={styles.subHeader}>📆 Monthly Salaries (Including Bonuses)</h3>
//         <div style={styles.tableWrapper}>
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th style={styles.th}>Emp ID</th><th style={styles.th}>Name</th><th style={styles.th}>Month</th>
//                 <th style={styles.th}>Basic</th><th style={styles.th}>Allowance</th><th style={styles.th}>Bonus</th>
//                 <th style={styles.th}>PF</th><th style={styles.th}>Tax</th>
//                 <th style={styles.th}>LOP Deduction</th><th style={styles.th}>Gross</th><th style={styles.th}>Net</th>
//                 <th style={styles.th}>Worked/Total</th><th style={styles.th}>Status</th><th style={styles.th}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredMonthlySalaries.length > 0 ? filteredMonthlySalaries.map(ms => {
//                 // Calculate monthly bonuses for this employee and month
//                 const monthlyBonus = bonuses
//                   .filter(b => b.employee.employeeId === ms.employee.employeeId && b.month === ms.month)
//                   .reduce((sum, bonus) => sum + bonus.incentives, 0);

//                 const totalAllowance = (ms.flexibleBenefitPlan || 0) + (ms.specialAllowance || 0);
//                 const lopDeduction = ms.lop ? ((ms.basic + totalAllowance) / ms.totalWorkingDays) * ms.lop : 0;
                
//                 // Include bonus in calculations
//                 const adjustedGross = (ms.grossSalary || 0) - lopDeduction + monthlyBonus;
//                 const adjustedNet = (ms.netSalary || 0) - lopDeduction + monthlyBonus;

//                 return (
//                   <tr key={ms.id}>
//                     <td style={styles.td}>{ms.employee.employeeId}</td>
//                     <td style={styles.td}>{ms.employee.name}</td>
//                     <td style={styles.td}>{ms.month}</td>
//                     <td style={styles.td}>{ms.basic?.toLocaleString() || '0'}</td>
//                     <td style={styles.td}>{totalAllowance.toLocaleString()}</td>
//                     <td style={styles.td}>{monthlyBonus.toLocaleString()}</td>
//                     <td style={styles.td}>{ms.pfContributionEmployer?.toLocaleString() || '0'}</td>
//                     <td style={styles.td}>{ms.professionalTax?.toLocaleString() || '0'}</td>
//                     <td style={styles.td}>{lopDeduction.toFixed(2)}</td>
//                     <td style={styles.td}>{adjustedGross.toLocaleString()}</td>
//                     <td style={styles.td}>{adjustedNet.toLocaleString()}</td>
//                     <td style={styles.td}>{ms.workedDays}/{ms.totalWorkingDays}</td>
//                     <td style={styles.td}><span style={ms.status === 'PENDING' ? styles.pending : styles.paid}>{ms.status}</span></td>
//                     <td style={styles.td}>
//                       {ms.status === 'PENDING' && (
//                         <button onClick={() => handleMarkSalaryPaid(ms.id)} style={styles.markPaidButton}>✅ Mark Paid</button>
//                       )}
//                     </td>
//                   </tr>
//                 )
//               }) : <tr><td colSpan="14" style={styles.noData}>No records found.</td></tr>}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ------------------ Styles ------------------
// const styles = {
//   container: { padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' },
//   header: { color: '#333', borderBottom: '2px solid #4CAF50', paddingBottom: '10px', marginBottom: '20px' },
//   subHeader: { color: '#555', marginBottom: '15px' },
//   formContainer: { backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px' },
//   form: { display: 'flex', flexDirection: 'column', gap: '15px' },
//   formRow: { display: 'flex', gap: '15px', flexWrap: 'wrap' },
//   formGroup: { flex: '1', minWidth: '150px' },
//   label: { display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' },
//   input: { width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' },
//   formActions: { display: 'flex', gap: '10px', marginTop: '10px' },
//   primaryButton: { backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' },
//   secondaryButton: { backgroundColor: '#6c757d', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' },
//   actionSection: { marginBottom: '20px' },
//   actionButton: { backgroundColor: '#2196F3', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' },
//   message: { padding: '10px', marginBottom: '20px', borderRadius: '4px', backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' },
//   searchInput: { padding: '8px 12px', width: '250px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' },
//   filterLabel: { fontSize: '14px', fontWeight: 'bold', color: '#555' },
//   filterInput: { padding: '6px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' },
//   filterButton: { backgroundColor: '#17a2b8', color: 'white', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' },
//   clearButton: { backgroundColor: '#6c757d', color: 'white', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' },
//   tableContainer: { backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px' },
//   tableWrapper: { overflowX: 'auto' },
//   table: { width: '100%', borderCollapse: 'collapse', fontSize: '14px' },
//   th: { backgroundColor: '#f8f9fa', padding: '12px 8px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontWeight: 'bold', color: '#333' },
//   td: { padding: '10px 8px', borderBottom: '1px solid #dee2e6', verticalAlign: 'middle' },
//   noData: { textAlign: 'center', padding: '20px', color: '#6c757d', fontStyle: 'italic' },
//   editButton: { backgroundColor: '#ffc107', color: '#212529', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', marginRight: '5px' },
//   deleteButton: { backgroundColor: '#dc3545', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },
//   markPaidButton: { backgroundColor: '#28a745', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },
//   pending: { color: '#dc3545', fontWeight: 'bold' },
//   paid: { color: '#28a745', fontWeight: 'bold' },
// };

// export default HRSalaryManagement;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const HRSalaryManagement = () => {
//   // ------------------ Form state ------------------
//   const [employeeId, setEmployeeId] = useState('');
//   const [basic, setBasic] = useState('');
//   const [flexibleBenefitPlan, setFlexibleBenefitPlan] = useState('');
//   const [specialAllowance, setSpecialAllowance] = useState('');
//   const [pfContributionEmployer, setPfContributionEmployer] = useState('');
//   const [professionalTax, setProfessionalTax] = useState('');
//   const [totalCostToCompany, setTotalCostToCompany] = useState('');
//   const [bankName, setBankName] = useState('');
//   const [accountNumber, setAccountNumber] = useState('');

//   // Compliance fields
//   const [pfNumber, setPfNumber] = useState('');
//   const [uanNumber, setUanNumber] = useState('');
//   const [esiNumber, setEsiNumber] = useState('');
//   const [panNumber, setPanNumber] = useState('');
//   const [lop, setLop] = useState('');

//   // ------------------ Bonus state ------------------
//   const [bonuses, setBonuses] = useState([]);
//   const [bonusForm, setBonusForm] = useState({
//     employeeId: '',
//     incentives: '',
//     month: ''
//   });
//   const [editingBonus, setEditingBonus] = useState(null);

//   // ------------------ Data state ------------------
//   const [salaryPackages, setSalaryPackages] = useState([]);
//   const [monthlySalaries, setMonthlySalaries] = useState([]);
//   const [message, setMessage] = useState({ type: '', text: '' });
//   const [activeTab, setActiveTab] = useState('salaryPackage');
//   const [loading, setLoading] = useState(false);

//   // ------------------ Filters ------------------
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterMonth, setFilterMonth] = useState('');
//   const [bonusFilterMonth, setBonusFilterMonth] = useState('');

//   const token = localStorage.getItem('token');

//   // ------------------ Fetch Data ------------------
//   const fetchSalaryPackages = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get('http://localhost:8080/api/hr/salary/all/packages', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSalaryPackages(res.data);
//     } catch (err) {
//       setMessage({ type: 'error', text: 'Error fetching salary packages' });
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchMonthlySalaries = async () => {
//     try {
//       const res = await axios.get('http://localhost:8080/api/hr/salary/all/monthly', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMonthlySalaries(res.data);
//     } catch (err) {
//       setMessage({ type: 'error', text: 'Error fetching monthly salaries' });
//       console.error(err);
//     }
//   };

//   const fetchBonuses = async () => {
//     try {
//       const res = await axios.get('http://localhost:8080/api/hr/bonus/all', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setBonuses(res.data);
//     } catch (err) {
//       setMessage({ type: 'error', text: 'Error fetching bonuses' });
//       console.error(err);
//     }
//   };

//   const fetchBonusesByMonth = async (monthYear) => {
//     try {
//       const res = await axios.get(`http://localhost:8080/api/hr/bonus/month?monthYear=${monthYear}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setBonuses(res.data);
//     } catch (err) {
//       setMessage({ type: 'error', text: 'Error fetching bonuses by month' });
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchSalaryPackages();
//     fetchMonthlySalaries();
//     fetchBonuses();
//   }, []);

//   // ------------------ Input validation ------------------
//   const handleNumberInput = (value, setter) => {
//     if (value === '' || /^\d*\.?\d*$/.test(value)) setter(value);
//   };

//   const handleAccountNumberInput = (value) => {
//     if (value === '' || /^\d*$/.test(value)) setAccountNumber(value);
//   };

//   // ------------------ Salary Package Submit ------------------
//   const handleSalaryPackageSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     const payload = {
//       basic: parseFloat(basic) || 0,
//       flexibleBenefitPlan: parseFloat(flexibleBenefitPlan) || 0,
//       specialAllowance: parseFloat(specialAllowance) || 0,
//       pfContributionEmployer: parseFloat(pfContributionEmployer) || 0,
//       professionalTax: parseFloat(professionalTax) || 0,
//       totalCostToCompany: parseFloat(totalCostToCompany) || 0,
//       bankName,
//       accountNumber,
//       pfNumber,
//       uanNumber,
//       esiNumber,
//       panNumber,
//       lop: parseFloat(lop) || 0,
//     };

//     try {
//       await axios.post(
//         `http://localhost:8080/api/hr/salary/package?employeeId=${employeeId}`,
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setMessage({ type: 'success', text: `Salary package saved for employee ${employeeId}` });
//       resetForm();
//       fetchSalaryPackages();
//     } catch (err) {
//       setMessage({ type: 'error', text: 'Error saving salary package' });
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setEmployeeId('');
//     setBasic('');
//     setFlexibleBenefitPlan('');
//     setSpecialAllowance('');
//     setPfContributionEmployer('');
//     setProfessionalTax('');
//     setTotalCostToCompany('');
//     setBankName('');
//     setAccountNumber('');
//     setPfNumber('');
//     setUanNumber('');
//     setEsiNumber('');
//     setPanNumber('');
//     setLop('');
//   };

//   const handleEditPackage = (pkg) => {
//     setEmployeeId(pkg.employee.employeeId);
//     setBasic(pkg.basic.toString());
//     setFlexibleBenefitPlan(pkg.flexibleBenefitPlan.toString());
//     setSpecialAllowance(pkg.specialAllowance.toString());
//     setPfContributionEmployer(pkg.pfContributionEmployer.toString());
//     setProfessionalTax(pkg.professionalTax.toString());
//     setTotalCostToCompany(pkg.totalCostToCompany.toString());
//     setBankName(pkg.bankName || '');
//     setAccountNumber(pkg.accountNumber || '');
//     setPfNumber(pkg.pfNumber || '');
//     setUanNumber(pkg.uanNumber || '');
//     setEsiNumber(pkg.esiNumber || '');
//     setPanNumber(pkg.panNumber || '');
//     setLop(pkg.lop?.toString() || '');
//     setActiveTab('salaryPackage');
//   };

//   // ------------------ Bonus Management ------------------
//   const handleBonusSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     const payload = {
//       incentives: parseFloat(bonusForm.incentives) || 0,
//       startDate: `${bonusForm.month}-01`,
//       month: bonusForm.month,
//     };

//     try {
//       if (editingBonus) {
//         await axios.put(
//           `http://localhost:8080/api/hr/bonus/update/${editingBonus.id}`,
//           { incentives: payload.incentives },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setMessage({ type: 'success', text: 'Bonus updated successfully' });
//       } else {
//         await axios.post(
//           `http://localhost:8080/api/hr/bonus/add/${bonusForm.employeeId}`,
//           payload,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setMessage({ type: 'success', text: 'Bonus added successfully' });
//       }
//       resetBonusForm();
//       fetchBonuses();
//     } catch (err) {
//       setMessage({ type: 'error', text: 'Error saving bonus' });
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditBonus = (bonus) => {
//     setBonusForm({
//       employeeId: bonus.employee.employeeId,
//       incentives: bonus.incentives.toString(),
//       month: bonus.month
//     });
//     setEditingBonus(bonus);
//     setActiveTab('bonusManagement');
//   };

//   const handleDeleteBonus = async (bonusId) => {
//     if (window.confirm('Are you sure you want to delete this bonus?')) {
//       setLoading(true);
//       try {
//         await axios.delete(`http://localhost:8080/api/hr/bonus/delete/${bonusId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setMessage({ type: 'success', text: 'Bonus deleted successfully' });
//         fetchBonuses();
//       } catch (err) {
//         setMessage({ type: 'error', text: 'Error deleting bonus' });
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const resetBonusForm = () => {
//     setBonusForm({
//       employeeId: '',
//       incentives: '',
//       month: ''
//     });
//     setEditingBonus(null);
//   };

//   const handleBonusFilter = () => {
//     if (bonusFilterMonth) {
//       fetchBonusesByMonth(bonusFilterMonth);
//     } else {
//       fetchBonuses();
//     }
//   };

//   // ------------------ Scheduler & Mark Paid ------------------
//   const handleGenerateMonthlySalary = async () => {
//     setLoading(true);
//     try {
//       await axios.post(`http://localhost:8080/api/hr/salary/run-scheduler`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setMessage({ type: 'success', text: 'Salary scheduler executed successfully' });
//       fetchMonthlySalaries();
//     } catch (err) {
//       setMessage({ type: 'error', text: 'Error running salary scheduler' });
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMarkSalaryPaid = async (id) => {
//     setLoading(true);
//     try {
//       await axios.put(`http://localhost:8080/api/hr/salary/${id}/markpaid`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setMessage({ type: 'success', text: 'Salary marked as PAID' });
//       fetchMonthlySalaries();
//     } catch (err) {
//       setMessage({ type: 'error', text: 'Error marking salary as paid' });
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ------------------ Filtering ------------------
//   const filteredPackages = salaryPackages.filter(
//     pkg =>
//       pkg.employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       pkg.employee.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const filteredMonthlySalaries = monthlySalaries
//     .filter(ms =>
//       ms.employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       ms.employee.name.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .filter(ms => !filterMonth || ms.month === filterMonth);

//   const filteredBonuses = bonuses.filter(bonus =>
//     bonus.employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     bonus.employee.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Calculate summary statistics
//   const totalMonthlySalary = filteredMonthlySalaries.reduce((sum, ms) => sum + (ms.netSalary || 0), 0);
//   const totalBonuses = filteredBonuses.reduce((sum, bonus) => sum + bonus.incentives, 0);
//   const pendingSalaries = filteredMonthlySalaries.filter(ms => ms.status === 'PENDING').length;

//   // ------------------ Styles ------------------
//   const styles = {
//     container: {
//       minHeight: '100vh',
//       backgroundColor: '#f8fafc',
//       fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
//     },
    
//     // Header Styles
//     header: {
//       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//       color: 'white',
//       padding: '2rem 0',
//       boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
//     },
//     headerContent: {
//       maxWidth: '1200px',
//       margin: '0 auto',
//       padding: '0 2rem'
//     },
//     headerMain: {
//       marginBottom: '2rem'
//     },
//     headerTitle: {
//       fontSize: '2.5rem',
//       fontWeight: '700',
//       margin: '0 0 0.5rem 0',
//       background: 'linear-gradient(45deg, #fff, #e0e7ff)',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent'
//     },
//     headerSubtitle: {
//       fontSize: '1.1rem',
//       opacity: 0.9,
//       margin: 0
//     },
//     headerStats: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//       gap: '1rem'
//     },
//     statCard: {
//       background: 'rgba(255, 255, 255, 0.1)',
//       backdropFilter: 'blur(10px)',
//       padding: '1.5rem',
//       borderRadius: '12px',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '1rem',
//       border: '1px solid rgba(255, 255, 255, 0.2)'
//     },
//     statIcon: {
//       fontSize: '2rem'
//     },
//     statNumber: {
//       fontSize: '1.5rem',
//       fontWeight: '700'
//     },
//     headerStatLabel: {
//       fontSize: '0.9rem',
//       opacity: 0.8
//     },

//     // Tab Styles
//     tabContainer: {
//       background: 'white',
//       borderBottom: '1px solid #e2e8f0',
//       position: 'sticky',
//       top: 0,
//       zIndex: 100
//     },
//     tabs: {
//       maxWidth: '1200px',
//       margin: '0 auto',
//       padding: '0 2rem',
//       display: 'flex',
//       gap: '0'
//     },
//     tab: {
//       padding: '1rem 1.5rem',
//       background: 'none',
//       border: 'none',
//       borderBottom: '3px solid transparent',
//       cursor: 'pointer',
//       fontSize: '0.9rem',
//       fontWeight: '500',
//       color: '#64748b',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       transition: 'all 0.2s ease'
//     },
//     activeTab: {
//       color: '#6366f1',
//       borderBottomColor: '#6366f1',
//       background: '#f8fafc'
//     },
//     tabIcon: {
//       fontSize: '1.1rem'
//     },

//     // Main Content
//     mainContent: {
//       maxWidth: '1200px',
//       margin: '0 auto',
//       padding: '2rem'
//     },

//     // Search Section
//     searchSection: {
//       marginBottom: '2rem'
//     },
//     searchContainer: {
//       display: 'flex',
//       gap: '1rem',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       flexWrap: 'wrap'
//     },
//     searchInputContainer: {
//       position: 'relative',
//       flex: '1',
//       minWidth: '300px'
//     },
//     searchIcon: {
//       position: 'absolute',
//       left: '12px',
//       top: '50%',
//       transform: 'translateY(-50%)',
//       color: '#64748b'
//     },
//     searchInput: {
//       width: '100%',
//       padding: '0.75rem 1rem 0.75rem 2.5rem',
//       border: '1px solid #e2e8f0',
//       borderRadius: '8px',
//       fontSize: '0.9rem',
//       background: 'white',
//       boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
//     },
//     filterGroup: {
//       display: 'flex',
//       gap: '0.5rem',
//       alignItems: 'center'
//     },
//     filterSelect: {
//       padding: '0.75rem 1rem',
//       border: '1px solid #e2e8f0',
//       borderRadius: '8px',
//       background: 'white',
//       fontSize: '0.9rem'
//     },
//     runPayrollButton: {
//       background: 'linear-gradient(135deg, #10b981, #059669)',
//       color: 'white',
//       border: 'none',
//       padding: '0.75rem 1.5rem',
//       borderRadius: '8px',
//       fontWeight: '600',
//       cursor: 'pointer',
//       fontSize: '0.9rem',
//       boxShadow: '0 2px 4px rgba(16, 185, 129, 0.3)'
//     },

//     // Message Styles
//     message: {
//       padding: '1rem 1.5rem',
//       borderRadius: '8px',
//       marginBottom: '2rem',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       fontSize: '0.9rem',
//       fontWeight: '500'
//     },
//     successMessage: {
//       background: '#dcfce7',
//       color: '#166534',
//       border: '1px solid #bbf7d0'
//     },
//     errorMessage: {
//       background: '#fee2e2',
//       color: '#991b1b',
//       border: '1px solid #fecaca'
//     },
//     messageClose: {
//       background: 'none',
//       border: 'none',
//       fontSize: '1.2rem',
//       cursor: 'pointer',
//       marginLeft: 'auto'
//     },

//     // Loading Overlay
//     loadingOverlay: {
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       background: 'rgba(0, 0, 0, 0.5)',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       color: 'white',
//       zIndex: 1000
//     },
//     loadingSpinner: {
//       width: '40px',
//       height: '40px',
//       border: '4px solid #f3f3f3',
//       borderTop: '4px solid #6366f1',
//       borderRadius: '50%',
//       animation: 'spin 1s linear infinite',
//       marginBottom: '1rem'
//     },

//     // Tab Content
//     tabContent: {
//       animation: 'fadeIn 0.3s ease'
//     },

//     // Form Styles
//     formSection: {
//       marginBottom: '2rem'
//     },
//     formCard: {
//       background: 'white',
//       padding: '2rem',
//       borderRadius: '12px',
//       boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
//       border: '1px solid #e2e8f0'
//     },
//     formTitle: {
//       fontSize: '1.25rem',
//       fontWeight: '600',
//       marginBottom: '1.5rem',
//       color: '#1e293b'
//     },
//     form: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '1.5rem'
//     },
//     formGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//       gap: '1.5rem'
//     },
//     formRow: {
//       display: 'flex',
//       gap: '1rem',
//       flexWrap: 'wrap'
//     },
//     formGroup: {
//       flex: '1',
//       minWidth: '200px'
//     },
//     label: {
//       display: 'block',
//       marginBottom: '0.5rem',
//       fontWeight: '500',
//       color: '#374151',
//       fontSize: '0.9rem'
//     },
//     input: {
//       width: '100%',
//       padding: '0.75rem 1rem',
//       border: '1px solid #d1d5db',
//       borderRadius: '8px',
//       fontSize: '0.9rem',
//       transition: 'all 0.2s ease',
//       boxSizing: 'border-box'
//     },
//     salaryBreakdown: {
//       gridColumn: '1 / -1'
//     },
//     breakdownTitle: {
//       fontSize: '1.1rem',
//       fontWeight: '600',
//       marginBottom: '1rem',
//       color: '#1e293b'
//     },
//     breakdownGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//       gap: '1rem'
//     },
//     formActions: {
//       display: 'flex',
//       gap: '1rem',
//       marginTop: '1rem'
//     },
//     primaryButton: {
//       background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
//       color: 'white',
//       border: 'none',
//       padding: '0.75rem 1.5rem',
//       borderRadius: '8px',
//       fontWeight: '600',
//       cursor: 'pointer',
//       fontSize: '0.9rem',
//       boxShadow: '0 2px 4px rgba(99, 102, 241, 0.3)',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem'
//     },
//     secondaryButton: {
//       background: '#6b7280',
//       color: 'white',
//       border: 'none',
//       padding: '0.75rem 1.5rem',
//       borderRadius: '8px',
//       fontWeight: '600',
//       cursor: 'pointer',
//       fontSize: '0.9rem',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem'
//     },

//     // Table Styles
//     tableSection: {
//       background: 'white',
//       padding: '2rem',
//       borderRadius: '12px',
//       boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
//       border: '1px solid #e2e8f0'
//     },
//     sectionTitle: {
//       fontSize: '1.25rem',
//       fontWeight: '600',
//       marginBottom: '1.5rem',
//       color: '#1e293b'
//     },
//     tableHeader: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '1.5rem',
//       flexWrap: 'wrap',
//       gap: '1rem'
//     },
//     tableFilters: {
//       display: 'flex',
//       gap: '0.5rem',
//       alignItems: 'center'
//     },
//     filterInput: {
//       padding: '0.5rem 1rem',
//       border: '1px solid #e2e8f0',
//       borderRadius: '6px',
//       fontSize: '0.9rem'
//     },
//     filterButton: {
//       background: '#3b82f6',
//       color: 'white',
//       border: 'none',
//       padding: '0.5rem 1rem',
//       borderRadius: '6px',
//       cursor: 'pointer',
//       fontSize: '0.9rem'
//     },
//     clearButton: {
//       background: '#6b7280',
//       color: 'white',
//       border: 'none',
//       padding: '0.5rem 1rem',
//       borderRadius: '6px',
//       cursor: 'pointer',
//       fontSize: '0.9rem'
//     },
//     tableContainer: {
//       overflowX: 'auto',
//       borderRadius: '8px',
//       border: '1px solid #e2e8f0'
//     },
//     table: {
//       width: '100%',
//       borderCollapse: 'collapse',
//       fontSize: '0.9rem'
//     },
//     th: {
//       background: '#f8fafc',
//       padding: '1rem',
//       textAlign: 'left',
//       fontWeight: '600',
//       color: '#374151',
//       borderBottom: '1px solid #e2e8f0',
//       whiteSpace: 'nowrap'
//     },
//     tr: {
//       borderBottom: '1px solid #f1f5f9',
//       transition: 'background 0.2s ease'
//     },
//     td: {
//       padding: '1rem',
//       borderBottom: '1px solid #f1f5f9',
//       verticalAlign: 'middle'
//     },

//     // Component Specific Styles
//     employeeInfo: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '0.25rem'
//     },
//     employeeId: {
//       fontWeight: '600',
//       color: '#1e293b',
//       fontSize: '0.85rem'
//     },
//     employeeName: {
//       color: '#64748b',
//       fontSize: '0.8rem'
//     },
//     bankInfo: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '0.25rem'
//     },
//     accountNumber: {
//       fontFamily: 'monospace',
//       fontSize: '0.8rem',
//       color: '#64748b'
//     },
//     ctc: {
//       fontWeight: '600',
//       color: '#059669'
//     },
//     bonusAmount: {
//       fontWeight: '600',
//       color: '#d97706'
//     },
//     monthBadge: {
//       background: '#eff6ff',
//       color: '#1d4ed8',
//       padding: '0.25rem 0.5rem',
//       borderRadius: '6px',
//       fontSize: '0.8rem',
//       fontWeight: '500',
//       display: 'inline-block'
//     },
//     statusBadge: {
//       padding: '0.25rem 0.75rem',
//       borderRadius: '9999px',
//       fontSize: '0.8rem',
//       fontWeight: '500',
//       display: 'inline-block'
//     },
//     pendingBadge: {
//       background: '#fef3c7',
//       color: '#d97706'
//     },
//     paidBadge: {
//       background: '#d1fae5',
//       color: '#059669'
//     },
//     actionButtons: {
//       display: 'flex',
//       gap: '0.5rem'
//     },
//     editButton: {
//       background: '#fbbf24',
//       color: '#78350f',
//       border: 'none',
//       padding: '0.5rem 0.75rem',
//       borderRadius: '6px',
//       cursor: 'pointer',
//       fontSize: '0.8rem',
//       fontWeight: '500'
//     },
//     deleteButton: {
//       background: '#ef4444',
//       color: 'white',
//       border: 'none',
//       padding: '0.5rem 0.75rem',
//       borderRadius: '6px',
//       cursor: 'pointer',
//       fontSize: '0.8rem',
//       fontWeight: '500'
//     },
//     markPaidButton: {
//       background: '#10b981',
//       color: 'white',
//       border: 'none',
//       padding: '0.5rem 1rem',
//       borderRadius: '6px',
//       cursor: 'pointer',
//       fontSize: '0.8rem',
//       fontWeight: '500'
//     },
//     deduction: {
//       color: '#ef4444',
//       fontWeight: '500'
//     },
//     netSalary: {
//       fontWeight: '700',
//       color: '#059669',
//       fontSize: '0.95rem'
//     },

//     // Payroll Overview
//     payrollOverview: {
//       background: 'white',
//       padding: '2rem',
//       borderRadius: '12px',
//       boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
//       border: '1px solid #e2e8f0'
//     },
//     overviewHeader: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '2rem',
//       flexWrap: 'wrap',
//       gap: '1rem'
//     },
//     overviewStats: {
//       display: 'flex',
//       gap: '2rem'
//     },
//     overviewStat: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center'
//     },
//     overviewStatValue: {
//       fontSize: '1.5rem',
//       fontWeight: '700',
//       color: '#1e293b'
//     },
//     overviewStatLabel: {
//       fontSize: '0.8rem',
//       color: '#64748b',
//       marginTop: '0.25rem'
//     },

//     // Reports
//     reportsGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//       gap: '2rem'
//     },
//     reportCard: {
//       background: 'white',
//       padding: '1.5rem',
//       borderRadius: '12px',
//       boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
//       border: '1px solid #e2e8f0'
//     },
//     reportTitle: {
//       fontSize: '1.1rem',
//       fontWeight: '600',
//       marginBottom: '1rem',
//       color: '#1e293b'
//     },
//     reportContent: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '1rem'
//     },
//     reportItem: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       padding: '0.75rem 0',
//       borderBottom: '1px solid #f1f5f9'
//     },
//     quickActionButton: {
//       background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
//       color: 'white',
//       border: 'none',
//       padding: '0.75rem 1rem',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontSize: '0.9rem',
//       fontWeight: '500',
//       textAlign: 'center'
//     },

//     // No Data
//     noData: {
//       textAlign: 'center',
//       padding: '3rem',
//       color: '#64748b',
//       fontSize: '1rem'
//     }
//   };

//   return (
//     <div style={styles.container}>
//       {/* Header Section */}
//       <div style={styles.header}>
//         <div style={styles.headerContent}>
//           <div style={styles.headerMain}>
//             <h1 style={styles.headerTitle}>💰 HR Salary Management</h1>
//             <p style={styles.headerSubtitle}>Manage employee salaries, bonuses, and payroll processing</p>
//           </div>
//           <div style={styles.headerStats}>
//             <div style={styles.statCard}>
//               <div style={styles.statIcon}>👥</div>
//               <div>
//                 <div style={styles.statNumber}>{salaryPackages.length}</div>
//                 <div style={styles.headerStatLabel}>Employees</div>
//               </div>
//             </div>
//             <div style={styles.statCard}>
//               <div style={styles.statIcon}>💵</div>
//               <div>
//                 <div style={styles.statNumber}>₹{(totalMonthlySalary/100000).toFixed(1)}L</div>
//                 <div style={styles.headerStatLabel}>Monthly Payroll</div>
//               </div>
//             </div>
//             <div style={styles.statCard}>
//               <div style={styles.statIcon}>🎯</div>
//               <div>
//                 <div style={styles.statNumber}>₹{(totalBonuses/100000).toFixed(1)}L</div>
//                 <div style={styles.headerStatLabel}>Total Bonuses</div>
//               </div>
//             </div>
//             <div style={styles.statCard}>
//               <div style={styles.statIcon}>⏳</div>
//               <div>
//                 <div style={styles.statNumber}>{pendingSalaries}</div>
//                 <div style={styles.headerStatLabel}>Pending</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div style={styles.tabContainer}>
//         <div style={styles.tabs}>
//           {[
//             { id: 'salaryPackage', label: '💼 Salary Package', icon: '📋' },
//             { id: 'bonusManagement', label: '🎯 Bonus Management', icon: '💰' },
//             { id: 'payroll', label: '📊 Payroll Overview', icon: '📈' },
//             { id: 'reports', label: '📋 Salary Reports', icon: '📄' }
//           ].map(tab => (
//             <button
//               key={tab.id}
//               style={{
//                 ...styles.tab,
//                 ...(activeTab === tab.id ? styles.activeTab : {})
//               }}
//               onClick={() => setActiveTab(tab.id)}
//             >
//               <span style={styles.tabIcon}>{tab.icon}</span>
//               {tab.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div style={styles.mainContent}>
//         {/* Search and Filters */}
//         <div style={styles.searchSection}>
//           <div style={styles.searchContainer}>
//             <div style={styles.searchInputContainer}>
//               <span style={styles.searchIcon}>🔍</span>
//               <input
//                 type="text"
//                 placeholder="Search by Employee ID or Name..."
//                 value={searchTerm}
//                 onChange={e => setSearchTerm(e.target.value)}
//                 style={styles.searchInput}
//               />
//             </div>
//             <div style={styles.filterGroup}>
//               <select 
//                 value={filterMonth} 
//                 onChange={e => setFilterMonth(e.target.value)}
//                 style={styles.filterSelect}
//               >
//                 <option value="">All Months</option>
//                 <option value="2024-01">January 2024</option>
//                 <option value="2024-02">February 2024</option>
//                 <option value="2024-03">March 2024</option>
//               </select>
//               <button 
//                 onClick={handleGenerateMonthlySalary}
//                 style={styles.runPayrollButton}
//                 disabled={loading}
//               >
//                 {loading ? '⏳' : '⚡'} Run Payroll
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Message Alert */}
//         {message.text && (
//           <div style={{
//             ...styles.message,
//             ...(message.type === 'success' ? styles.successMessage : styles.errorMessage)
//           }}>
//             <span style={styles.messageIcon}>
//               {message.type === 'success' ? '✅' : '❌'}
//             </span>
//             {message.text}
//             <button onClick={() => setMessage({ type: '', text: '' })} style={styles.messageClose}>×</button>
//           </div>
//         )}

//         {/* Loading Overlay */}
//         {loading && (
//           <div style={styles.loadingOverlay}>
//             <div style={styles.loadingSpinner}></div>
//             <p>Processing...</p>
//           </div>
//         )}

//         {/* Salary Package Tab */}
//         {activeTab === 'salaryPackage' && (
//           <div style={styles.tabContent}>
//             <div style={styles.formSection}>
//               <div style={styles.formCard}>
//                 <h3 style={styles.formTitle}>
//                   {employeeId ? '✏️ Update Salary Package' : '➕ Create Salary Package'}
//                 </h3>
//                 <form onSubmit={handleSalaryPackageSubmit} style={styles.form}>
//                   <div style={styles.formGrid}>
//                     <div style={styles.formGroup}>
//                       <label style={styles.label}>Employee ID *</label>
//                       <input 
//                         type="text" 
//                         value={employeeId} 
//                         onChange={e => setEmployeeId(e.target.value)} 
//                         required 
//                         style={styles.input}
//                         placeholder="Enter employee ID"
//                       />
//                     </div>
                    
//                     <div style={styles.formGroup}>
//                       <label style={styles.label}>Bank Details</label>
//                       <input 
//                         type="text" 
//                         value={bankName} 
//                         onChange={e => setBankName(e.target.value)} 
//                         style={styles.input}
//                         placeholder="Bank name"
//                       />
//                       <input 
//                         type="text" 
//                         value={accountNumber} 
//                         onChange={e => handleAccountNumberInput(e.target.value)} 
//                         style={{...styles.input, marginTop: '8px'}}
//                         placeholder="Account number"
//                       />
//                     </div>

//                     <div style={styles.formGroup}>
//                       <label style={styles.label}>Compliance Details</label>
//                       <input type="text" value={pfNumber} onChange={e => setPfNumber(e.target.value)} style={styles.input} placeholder="PF Number"/>
//                       <input type="text" value={uanNumber} onChange={e => setUanNumber(e.target.value)} style={{...styles.input, marginTop: '8px'}} placeholder="UAN Number"/>
//                       <input type="text" value={esiNumber} onChange={e => setEsiNumber(e.target.value)} style={{...styles.input, marginTop: '8px'}} placeholder="ESI Number"/>
//                       <input type="text" value={panNumber} onChange={e => setPanNumber(e.target.value)} style={{...styles.input, marginTop: '8px'}} placeholder="PAN Number"/>
//                     </div>

//                     <div style={styles.salaryBreakdown}>
//                       <h4 style={styles.breakdownTitle}>Salary Breakdown</h4>
//                       <div style={styles.breakdownGrid}>
//                         <div style={styles.formGroup}>
//                           <label style={styles.label}>Basic Salary</label>
//                           <input type="text" value={basic} onChange={e => handleNumberInput(e.target.value, setBasic)} style={styles.input}/>
//                         </div>
//                         <div style={styles.formGroup}>
//                           <label style={styles.label}>HRA</label>
//                           <input type="text" value={flexibleBenefitPlan} onChange={e => handleNumberInput(e.target.value, setFlexibleBenefitPlan)} style={styles.input}/>
//                         </div>
//                         <div style={styles.formGroup}>
//                           <label style={styles.label}>Special Allowance</label>
//                           <input type="text" value={specialAllowance} onChange={e => handleNumberInput(e.target.value, setSpecialAllowance)} style={styles.input}/>
//                         </div>
//                         <div style={styles.formGroup}>
//                           <label style={styles.label}>PF Contribution</label>
//                           <input type="text" value={pfContributionEmployer} onChange={e => handleNumberInput(e.target.value, setPfContributionEmployer)} style={styles.input}/>
//                         </div>
//                         <div style={styles.formGroup}>
//                           <label style={styles.label}>Professional Tax</label>
//                           <input type="text" value={professionalTax} onChange={e => handleNumberInput(e.target.value, setProfessionalTax)} style={styles.input}/>
//                         </div>
//                         <div style={styles.formGroup}>
//                           <label style={styles.label}>LOP Days</label>
//                           <input type="text" value={lop} onChange={e => handleNumberInput(e.target.value, setLop)} style={styles.input}/>
//                         </div>
//                         <div style={styles.formGroup}>
//                           <label style={styles.label}>Total CTC</label>
//                           <input type="text" value={totalCostToCompany} onChange={e => handleNumberInput(e.target.value, setTotalCostToCompany)} style={styles.input}/>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div style={styles.formActions}>
//                     <button type="submit" style={styles.primaryButton} disabled={loading}>
//                       {loading ? '⏳' : '💾'} {employeeId ? 'Update' : 'Create'} Salary Package
//                     </button>
//                     <button type="button" onClick={resetForm} style={styles.secondaryButton}>
//                       🗑️ Clear Form
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>

//             {/* Salary Packages Table */}
//             <div style={styles.tableSection}>
//               <h3 style={styles.sectionTitle}>📋 Salary Packages</h3>
//               <div style={styles.tableContainer}>
//                 <table style={styles.table}>
//                   <thead>
//                     <tr>
//                       <th style={styles.th}>Employee</th>
//                       <th style={styles.th}>Bank Details</th>
//                       <th style={styles.th}>Basic</th>
//                       <th style={styles.th}>HRA</th>
//                       <th style={styles.th}>Allowance</th>
//                       <th style={styles.th}>CTC</th>
//                       <th style={styles.th}>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredPackages.map(pkg => (
//                       <tr key={pkg.id} style={styles.tr}>
//                         <td style={styles.td}>
//                           <div style={styles.employeeInfo}>
//                             <div style={styles.employeeId}>{pkg.employee.employeeId}</div>
//                             <div style={styles.employeeName}>{pkg.employee.name}</div>
//                           </div>
//                         </td>
//                         <td style={styles.td}>
//                           <div style={styles.bankInfo}>
//                             <div>{pkg.bankName || '-'}</div>
//                             <div style={styles.accountNumber}>{pkg.accountNumber || '-'}</div>
//                           </div>
//                         </td>
//                         <td style={styles.td}>₹{pkg.basic.toLocaleString()}</td>
//                         <td style={styles.td}>₹{pkg.flexibleBenefitPlan.toLocaleString()}</td>
//                         <td style={styles.td}>₹{pkg.specialAllowance.toLocaleString()}</td>
//                         <td style={styles.td}>
//                           <div style={styles.ctc}>₹{pkg.totalCostToCompany.toLocaleString()}</div>
//                         </td>
//                         <td style={styles.td}>
//                           <button 
//                             onClick={() => handleEditPackage(pkg)}
//                             style={styles.editButton}
//                           >
//                             ✏️ Edit
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 {filteredPackages.length === 0 && (
//                   <div style={styles.noData}>
//                     📝 No salary packages found
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Bonus Management Tab */}
//         {activeTab === 'bonusManagement' && (
//           <div style={styles.tabContent}>
//             <div style={styles.formSection}>
//               <div style={styles.formCard}>
//                 <h3 style={styles.formTitle}>
//                   {editingBonus ? '✏️ Update Bonus' : '➕ Add Bonus/Incentives'}
//                 </h3>
//                 <form onSubmit={handleBonusSubmit} style={styles.form}>
//                   <div style={styles.formRow}>
//                     <div style={styles.formGroup}>
//                       <label style={styles.label}>Employee ID *</label>
//                       <input 
//                         type="text" 
//                         value={bonusForm.employeeId} 
//                         onChange={e => setBonusForm({...bonusForm, employeeId: e.target.value})} 
//                         required 
//                         style={styles.input}
//                       />
//                     </div>
//                     <div style={styles.formGroup}>
//                       <label style={styles.label}>Incentives Amount *</label>
//                       <input 
//                         type="text" 
//                         value={bonusForm.incentives} 
//                         onChange={e => handleNumberInput(e.target.value, (val) => setBonusForm({...bonusForm, incentives: val}))} 
//                         required 
//                         style={styles.input}
//                       />
//                     </div>
//                     <div style={styles.formGroup}>
//                       <label style={styles.label}>Month *</label>
//                       <input 
//                         type="month" 
//                         value={bonusForm.month} 
//                         onChange={e => setBonusForm({...bonusForm, month: e.target.value})} 
//                         required 
//                         style={styles.input}
//                       />
//                     </div>
//                   </div>
//                   <div style={styles.formActions}>
//                     <button type="submit" style={styles.primaryButton} disabled={loading}>
//                       💰 {editingBonus ? 'Update' : 'Add'} Bonus
//                     </button>
//                     <button type="button" onClick={resetBonusForm} style={styles.secondaryButton}>
//                       🗑️ Clear
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>

//             {/* Bonuses Table */}
//             <div style={styles.tableSection}>
//               <div style={styles.tableHeader}>
//                 <h3 style={styles.sectionTitle}>🎯 Bonuses & Incentives</h3>
//                 <div style={styles.tableFilters}>
//                   <input 
//                     type="month" 
//                     value={bonusFilterMonth} 
//                     onChange={e => setBonusFilterMonth(e.target.value)} 
//                     style={styles.filterInput}
//                   />
//                   <button onClick={handleBonusFilter} style={styles.filterButton}>
//                     🔍 Filter
//                   </button>
//                   <button 
//                     onClick={() => { setBonusFilterMonth(''); fetchBonuses(); }} 
//                     style={styles.clearButton}
//                   >
//                     🗑️ Clear
//                   </button>
//                 </div>
//               </div>
//               <div style={styles.tableContainer}>
//                 <table style={styles.table}>
//                   <thead>
//                     <tr>
//                       <th style={styles.th}>Employee</th>
//                       <th style={styles.th}>Incentives</th>
//                       <th style={styles.th}>Month</th>
//                       <th style={styles.th}>Date Added</th>
//                       <th style={styles.th}>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredBonuses.map(bonus => (
//                       <tr key={bonus.id} style={styles.tr}>
//                         <td style={styles.td}>
//                           <div style={styles.employeeInfo}>
//                             <div style={styles.employeeId}>{bonus.employee.employeeId}</div>
//                             <div style={styles.employeeName}>{bonus.employee.name}</div>
//                           </div>
//                         </td>
//                         <td style={styles.td}>
//                           <div style={styles.bonusAmount}>
//                             ₹{bonus.incentives.toLocaleString()}
//                           </div>
//                         </td>
//                         <td style={styles.td}>
//                           <div style={styles.monthBadge}>{bonus.month}</div>
//                         </td>
//                         <td style={styles.td}>{bonus.startDate}</td>
//                         <td style={styles.td}>
//                           <div style={styles.actionButtons}>
//                             <button 
//                               onClick={() => handleEditBonus(bonus)} 
//                               style={styles.editButton}
//                             >
//                               ✏️
//                             </button>
//                             <button 
//                               onClick={() => handleDeleteBonus(bonus.id)} 
//                               style={styles.deleteButton}
//                             >
//                               🗑️
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 {filteredBonuses.length === 0 && (
//                   <div style={styles.noData}>
//                     🎯 No bonuses found
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Payroll Overview Tab */}
//         {activeTab === 'payroll' && (
//           <div style={styles.tabContent}>
//             <div style={styles.payrollOverview}>
//               <div style={styles.overviewHeader}>
//                 <h3 style={styles.sectionTitle}>📊 Payroll Overview</h3>
//                 <div style={styles.overviewStats}>
//                   <div style={styles.overviewStat}>
//                     <span style={styles.overviewStatValue}>₹{totalMonthlySalary.toLocaleString()}</span>
//                     <span style={styles.overviewStatLabel}>Total Monthly</span>
//                   </div>
//                   <div style={styles.overviewStat}>
//                     <span style={styles.overviewStatValue}>{pendingSalaries}</span>
//                     <span style={styles.overviewStatLabel}>Pending</span>
//                   </div>
//                   <div style={styles.overviewStat}>
//                     <span style={styles.overviewStatValue}>{filteredMonthlySalaries.length - pendingSalaries}</span>
//                     <span style={styles.overviewStatLabel}>Paid</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Monthly Salaries Table */}
//               <div style={styles.tableContainer}>
//                 <table style={styles.table}>
//                   <thead>
//                     <tr>
//                       <th style={styles.th}>Employee</th>
//                       <th style={styles.th}>Month</th>
//                       <th style={styles.th}>Basic</th>
//                       <th style={styles.th}>Allowances</th>
//                       <th style={styles.th}>Bonus</th>
//                       <th style={styles.th}>Deductions</th>
//                       <th style={styles.th}>Net Salary</th>
//                       <th style={styles.th}>Status</th>
//                       <th style={styles.th}>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredMonthlySalaries.map(ms => {
//                       const monthlyBonus = bonuses
//                         .filter(b => b.employee.employeeId === ms.employee.employeeId && b.month === ms.month)
//                         .reduce((sum, bonus) => sum + bonus.incentives, 0);

//                       const totalAllowance = (ms.flexibleBenefitPlan || 0) + (ms.specialAllowance || 0);
//                       const lopDeduction = ms.lop ? ((ms.basic + totalAllowance) / ms.totalWorkingDays) * ms.lop : 0;
//                       const adjustedNet = (ms.netSalary || 0) - lopDeduction + monthlyBonus;

//                       return (
//                         <tr key={ms.id} style={styles.tr}>
//                           <td style={styles.td}>
//                             <div style={styles.employeeInfo}>
//                               <div style={styles.employeeId}>{ms.employee.employeeId}</div>
//                               <div style={styles.employeeName}>{ms.employee.name}</div>
//                             </div>
//                           </td>
//                           <td style={styles.td}>
//                             <div style={styles.monthBadge}>{ms.month}</div>
//                           </td>
//                           <td style={styles.td}>₹{ms.basic?.toLocaleString() || '0'}</td>
//                           <td style={styles.td}>₹{totalAllowance.toLocaleString()}</td>
//                           <td style={styles.td}>
//                             <div style={styles.bonusAmount}>₹{monthlyBonus.toLocaleString()}</div>
//                           </td>
//                           <td style={styles.td}>
//                             <div style={styles.deduction}>₹{lopDeduction.toFixed(0)}</div>
//                           </td>
//                           <td style={styles.td}>
//                             <div style={styles.netSalary}>₹{adjustedNet.toLocaleString()}</div>
//                           </td>
//                           <td style={styles.td}>
//                             <span style={{
//                               ...styles.statusBadge,
//                               ...(ms.status === 'PENDING' ? styles.pendingBadge : styles.paidBadge)
//                             }}>
//                               {ms.status}
//                             </span>
//                           </td>
//                           <td style={styles.td}>
//                             {ms.status === 'PENDING' && (
//                               <button 
//                                 onClick={() => handleMarkSalaryPaid(ms.id)}
//                                 style={styles.markPaidButton}
//                                 disabled={loading}
//                               >
//                                 ✅ Pay
//                               </button>
//                             )}
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//                 {filteredMonthlySalaries.length === 0 && (
//                   <div style={styles.noData}>
//                     📊 No payroll records found
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Reports Tab */}
//         {activeTab === 'reports' && (
//           <div style={styles.tabContent}>
//             <div style={styles.reportsGrid}>
//               <div style={styles.reportCard}>
//                 <h4 style={styles.reportTitle}>📈 Salary Summary</h4>
//                 <div style={styles.reportContent}>
//                   <div style={styles.reportItem}>
//                     <span>Total Employees:</span>
//                     <span>{salaryPackages.length}</span>
//                   </div>
//                   <div style={styles.reportItem}>
//                     <span>Monthly Payroll:</span>
//                     <span>₹{totalMonthlySalary.toLocaleString()}</span>
//                   </div>
//                   <div style={styles.reportItem}>
//                     <span>Total Bonuses:</span>
//                     <span>₹{totalBonuses.toLocaleString()}</span>
//                   </div>
//                 </div>
//               </div>
              
//               <div style={styles.reportCard}>
//                 <h4 style={styles.reportTitle}>📋 Quick Actions</h4>
//                 <div style={styles.reportContent}>
//                   <button style={styles.quickActionButton} onClick={handleGenerateMonthlySalary}>
//                     ⚡ Run Payroll
//                   </button>
//                   <button style={styles.quickActionButton} onClick={() => setActiveTab('bonusManagement')}>
//                     💰 Add Bonus
//                   </button>
//                   <button style={styles.quickActionButton} onClick={() => setActiveTab('salaryPackage')}>
//                     👥 Add Employee
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HRSalaryManagement;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

const HRSalaryManagement = () => {
  // ------------------ Form state ------------------
  const [employeeId, setEmployeeId] = useState('');
  const [basic, setBasic] = useState('');
  const [flexibleBenefitPlan, setFlexibleBenefitPlan] = useState('');
  const [specialAllowance, setSpecialAllowance] = useState('');
  const [pfContributionEmployer, setPfContributionEmployer] = useState('');
  const [professionalTax, setProfessionalTax] = useState('');
  const [totalCostToCompany, setTotalCostToCompany] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  // Compliance fields
  const [pfNumber, setPfNumber] = useState('');
  const [uanNumber, setUanNumber] = useState('');
  const [esiNumber, setEsiNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [lop, setLop] = useState('');

  // ------------------ Bonus state ------------------
  const [bonuses, setBonuses] = useState([]);
  const [bonusForm, setBonusForm] = useState({
    employeeId: '',
    incentives: '',
    month: ''
  });
  const [editingBonus, setEditingBonus] = useState(null);

  // ------------------ Data state ------------------
  const [salaryPackages, setSalaryPackages] = useState([]);
  const [monthlySalaries, setMonthlySalaries] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState('salaryPackage');
  const [loading, setLoading] = useState(false);

  // ------------------ Filters ------------------
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [bonusFilterMonth, setBonusFilterMonth] = useState('');
  const [selectedPayrollMonth, setSelectedPayrollMonth] = useState('');
  const [availableMonths, setAvailableMonths] = useState([]);

  const token = localStorage.getItem('token');

  // ------------------ Fetch Available Months from Database ------------------
  const fetchAvailableMonths = async () => {
    try {
      // Fetch months from monthly salaries
      const salaryRes = await axios.get('http://localhost:8080/api/hr/salary/all/monthly', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Fetch months from bonuses
      const bonusRes = await axios.get('http://localhost:8080/api/hr/bonus/all', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Extract unique months from both sources
      const salaryMonths = salaryRes.data.map(salary => salary.month);
      const bonusMonths = bonusRes.data.map(bonus => bonus.month);
      
      // Combine and get unique months, sort in descending order (newest first)
      const allMonths = [...new Set([...salaryMonths, ...bonusMonths])]
        .filter(month => month) // Remove null/undefined
        .sort()
        .reverse();

      setAvailableMonths(allMonths);

      // Set current month as default for payroll generation if available
      const currentMonth = new Date().toISOString().slice(0, 7);
      if (allMonths.includes(currentMonth)) {
        setSelectedPayrollMonth(currentMonth);
      } else if (allMonths.length > 0) {
        setSelectedPayrollMonth(allMonths[0]); // Set to most recent month
      }
    } catch (err) {
      console.error('Error fetching available months:', err);
      // Fallback to generated months if API fails
      generateFallbackMonths();
    }
  };

  // Fallback method to generate months if database fetch fails
  const generateFallbackMonths = () => {
    const months = [];
    const currentDate = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthValue = date.toISOString().slice(0, 7);
      months.push(monthValue);
    }
    setAvailableMonths(months);
    
    // Set current month as default
    const currentMonth = new Date().toISOString().slice(0, 7);
    setSelectedPayrollMonth(currentMonth);
  };

  // ------------------ Fetch Data ------------------
  const fetchSalaryPackages = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8080/api/hr/salary/all/packages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSalaryPackages(res.data);
    } catch (err) {
      setMessage({ type: 'error', text: 'Error fetching salary packages' });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMonthlySalaries = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/hr/salary/all/monthly', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMonthlySalaries(res.data);
    } catch (err) {
      setMessage({ type: 'error', text: 'Error fetching monthly salaries' });
      console.error(err);
    }
  };

  const fetchBonuses = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/hr/bonus/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBonuses(res.data);
    } catch (err) {
      setMessage({ type: 'error', text: 'Error fetching bonuses' });
      console.error(err);
    }
  };

  const fetchBonusesByMonth = async (monthYear) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/hr/bonus/month?monthYear=${monthYear}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBonuses(res.data);
    } catch (err) {
      setMessage({ type: 'error', text: 'Error fetching bonuses by month' });
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSalaryPackages();
    fetchMonthlySalaries();
    fetchBonuses();
    fetchAvailableMonths();
  }, []);

  // ------------------ Input validation ------------------
  const handleNumberInput = (value, setter) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) setter(value);
  };

  const handleAccountNumberInput = (value) => {
    if (value === '' || /^\d*$/.test(value)) setAccountNumber(value);
  };

  // ------------------ Salary Package Submit ------------------
  const handleSalaryPackageSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = {
      basic: parseFloat(basic) || 0,
      flexibleBenefitPlan: parseFloat(flexibleBenefitPlan) || 0,
      specialAllowance: parseFloat(specialAllowance) || 0,
      pfContributionEmployer: parseFloat(pfContributionEmployer) || 0,
      professionalTax: parseFloat(professionalTax) || 0,
      totalCostToCompany: parseFloat(totalCostToCompany) || 0,
      bankName,
      accountNumber,
      pfNumber,
      uanNumber,
      esiNumber,
      panNumber,
      lop: parseFloat(lop) || 0,
    };

    try {
      await axios.post(
        `http://localhost:8080/api/hr/salary/package?employeeId=${employeeId}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage({ type: 'success', text: `Salary package saved for employee ${employeeId}` });
      resetForm();
      fetchSalaryPackages();
    } catch (err) {
      setMessage({ type: 'error', text: 'Error saving salary package' });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmployeeId('');
    setBasic('');
    setFlexibleBenefitPlan('');
    setSpecialAllowance('');
    setPfContributionEmployer('');
    setProfessionalTax('');
    setTotalCostToCompany('');
    setBankName('');
    setAccountNumber('');
    setPfNumber('');
    setUanNumber('');
    setEsiNumber('');
    setPanNumber('');
    setLop('');
  };

  const handleEditPackage = (pkg) => {
    setEmployeeId(pkg.employee.employeeId);
    setBasic(pkg.basic.toString());
    setFlexibleBenefitPlan(pkg.flexibleBenefitPlan.toString());
    setSpecialAllowance(pkg.specialAllowance.toString());
    setPfContributionEmployer(pkg.pfContributionEmployer.toString());
    setProfessionalTax(pkg.professionalTax.toString());
    setTotalCostToCompany(pkg.totalCostToCompany.toString());
    setBankName(pkg.bankName || '');
    setAccountNumber(pkg.accountNumber || '');
    setPfNumber(pkg.pfNumber || '');
    setUanNumber(pkg.uanNumber || '');
    setEsiNumber(pkg.esiNumber || '');
    setPanNumber(pkg.panNumber || '');
    setLop(pkg.lop?.toString() || '');
    setActiveTab('salaryPackage');
  };

  // ------------------ Bonus Management ------------------
  const handleBonusSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = {
      incentives: parseFloat(bonusForm.incentives) || 0,
      startDate: `${bonusForm.month}-01`,
      month: bonusForm.month,
    };

    try {
      if (editingBonus) {
        await axios.put(
          `http://localhost:8080/api/hr/bonus/update/${editingBonus.id}`,
          { incentives: payload.incentives },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage({ type: 'success', text: 'Bonus updated successfully' });
      } else {
        await axios.post(
          `http://localhost:8080/api/hr/bonus/add/${bonusForm.employeeId}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage({ type: 'success', text: 'Bonus added successfully' });
      }
      resetBonusForm();
      fetchBonuses();
      fetchAvailableMonths(); // Refresh available months
    } catch (err) {
      setMessage({ type: 'error', text: 'Error saving bonus' });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditBonus = (bonus) => {
    setBonusForm({
      employeeId: bonus.employee.employeeId,
      incentives: bonus.incentives.toString(),
      month: bonus.month
    });
    setEditingBonus(bonus);
    setActiveTab('bonusManagement');
  };

  const handleDeleteBonus = async (bonusId) => {
    if (window.confirm('Are you sure you want to delete this bonus?')) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:8080/api/hr/bonus/delete/${bonusId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage({ type: 'success', text: 'Bonus deleted successfully' });
        fetchBonuses();
        fetchAvailableMonths(); // Refresh available months
      } catch (err) {
        setMessage({ type: 'error', text: 'Error deleting bonus' });
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const resetBonusForm = () => {
    setBonusForm({
      employeeId: '',
      incentives: '',
      month: ''
    });
    setEditingBonus(null);
  };

  const handleBonusFilter = () => {
    if (bonusFilterMonth) {
      fetchBonusesByMonth(bonusFilterMonth);
    } else {
      fetchBonuses();
    }
  };

  // ------------------ Monthly Payroll Functions ------------------
  const handleGenerateMonthlySalary = async () => {
    if (!selectedPayrollMonth) {
      setMessage({ type: 'error', text: 'Please select a month for payroll generation' });
      return;
    }

    setLoading(true);
    try {
      await axios.post(`http://localhost:8080/api/hr/salary/run-scheduler?month=${selectedPayrollMonth}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage({ type: 'success', text: `Payroll generated successfully for ${getMonthName(selectedPayrollMonth)}` });
      fetchMonthlySalaries();
      fetchAvailableMonths(); // Refresh available months
    } catch (err) {
      setMessage({ type: 'error', text: 'Error running salary scheduler' });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkSalaryPaid = async (id, month) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:8080/api/hr/salary/${id}/markpaid`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage({ type: 'success', text: `Salary marked as PAID for ${getMonthName(month)}` });
      fetchMonthlySalaries();
    } catch (err) {
      setMessage({ type: 'error', text: 'Error marking salary as paid' });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAllPaid = async (month) => {
    if (!window.confirm(`Mark ALL salaries as PAID for ${getMonthName(month)}?`)) {
      return;
    }

    setLoading(true);
    try {
      const pendingSalaries = monthlySalaries.filter(ms => 
        ms.month === month && ms.status === 'PENDING'
      );

      for (const salary of pendingSalaries) {
        await axios.put(`http://localhost:8080/api/hr/salary/${salary.id}/markpaid`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      setMessage({ type: 'success', text: `All salaries marked as PAID for ${getMonthName(month)}` });
      fetchMonthlySalaries();
    } catch (err) {
      setMessage({ type: 'error', text: 'Error marking salaries as paid' });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ------------------ Excel Export Functions ------------------
  const exportToExcel = (data, fileName, sheetName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${fileName}_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const handleDownloadPayroll = (specificMonth = null) => {
    const targetMonth = specificMonth || filterMonth;
    let payrollData = filteredMonthlySalaries;

    if (targetMonth) {
      payrollData = payrollData.filter(ms => ms.month === targetMonth);
    }

    const exportData = payrollData.map(ms => {
      const monthlyBonus = bonuses
        .filter(b => b.employee.employeeId === ms.employee.employeeId && b.month === ms.month)
        .reduce((sum, bonus) => sum + bonus.incentives, 0);

      const totalAllowance = (ms.flexibleBenefitPlan || 0) + (ms.specialAllowance || 0);
      const lopDeduction = ms.lop ? ((ms.basic + totalAllowance) / ms.totalWorkingDays) * ms.lop : 0;
      const adjustedNet = (ms.netSalary || 0) - lopDeduction + monthlyBonus;

      return {
        'Employee ID': ms.employee.employeeId,
        'Employee Name': ms.employee.name,
        'Month': ms.month,
        'Basic Salary': ms.basic || 0,
        'HRA': ms.flexibleBenefitPlan || 0,
        'Special Allowance': ms.specialAllowance || 0,
        'Total Allowances': totalAllowance,
        'Bonus': monthlyBonus,
        'PF Contribution': ms.pfContributionEmployer || 0,
        'Professional Tax': ms.professionalTax || 0,
        'LOP Deduction': lopDeduction,
        'Gross Salary': (ms.grossSalary || 0) - lopDeduction + monthlyBonus,
        'Net Salary': adjustedNet,
        'Total Working Days': ms.totalWorkingDays,
        'Worked Days': ms.workedDays,
        'LOP Days': ms.lop || 0,
        'Status': ms.status,
        'Bank Name': ms.bankName || '-',
        'Account Number': ms.accountNumber || '-'
      };
    });

    const fileName = targetMonth ? `Payroll_${targetMonth}` : 'Complete_Payroll';
    exportToExcel(exportData, fileName, 'Payroll');
    setMessage({ type: 'success', text: `Payroll data exported for ${targetMonth ? getMonthName(targetMonth) : 'all months'}` });
  };

  const handleDownloadSalaryPackages = () => {
    const packageData = filteredPackages.map(pkg => ({
      'Employee ID': pkg.employee.employeeId,
      'Employee Name': pkg.employee.name,
      'Bank Name': pkg.bankName || '-',
      'Account Number': pkg.accountNumber || '-',
      'PF Number': pkg.pfNumber || '-',
      'UAN Number': pkg.uanNumber || '-',
      'ESI Number': pkg.esiNumber || '-',
      'PAN Number': pkg.panNumber || '-',
      'Basic Salary': pkg.basic,
      'HRA': pkg.flexibleBenefitPlan,
      'Special Allowance': pkg.specialAllowance,
      'PF Contribution': pkg.pfContributionEmployer,
      'Professional Tax': pkg.professionalTax,
      'Total CTC': pkg.totalCostToCompany,
      'LOP Days': pkg.lop || 0
    }));

    exportToExcel(packageData, 'Salary_Packages', 'Salary Packages');
    setMessage({ type: 'success', text: 'Salary packages exported to Excel' });
  };

  const handleDownloadBonuses = (specificMonth = null) => {
    let bonusData = filteredBonuses;

    if (specificMonth) {
      bonusData = bonusData.filter(bonus => bonus.month === specificMonth);
    }

    const exportData = bonusData.map(bonus => ({
      'Employee ID': bonus.employee.employeeId,
      'Employee Name': bonus.employee.name,
      'Incentives Amount': bonus.incentives,
      'Month': bonus.month,
      'Start Date': bonus.startDate,
      'Department': bonus.employee.department || '-',
      'Designation': bonus.employee.designation || '-'
    }));

    const fileName = specificMonth ? `Bonuses_${specificMonth}` : 'All_Bonuses';
    exportToExcel(exportData, fileName, 'Bonuses');
    setMessage({ type: 'success', text: `Bonuses data exported ${specificMonth ? `for ${getMonthName(specificMonth)}` : 'for all months'}` });
  };

  // ------------------ Utility Functions ------------------
  const getMonthName = (monthValue) => {
    const date = new Date(monthValue + '-01');
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const getMonthOptions = () => {
    return availableMonths.map(month => ({
      value: month,
      label: getMonthName(month)
    }));
  };

  const getMonthSummary = (month) => {
    const monthSalaries = monthlySalaries.filter(ms => ms.month === month);
    const monthBonuses = bonuses.filter(b => b.month === month);
    
    const totalSalary = monthSalaries.reduce((sum, ms) => sum + (ms.netSalary || 0), 0);
    const totalBonus = monthBonuses.reduce((sum, b) => sum + b.incentives, 0);
    const pendingCount = monthSalaries.filter(ms => ms.status === 'PENDING').length;
    const paidCount = monthSalaries.filter(ms => ms.status === 'PAID').length;

    return {
      totalSalary,
      totalBonus,
      pendingCount,
      paidCount,
      totalEmployees: monthSalaries.length
    };
  };

  // ------------------ Filtering ------------------
  const filteredPackages = salaryPackages.filter(
    pkg =>
      pkg.employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMonthlySalaries = monthlySalaries
    .filter(ms =>
      ms.employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ms.employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(ms => !filterMonth || ms.month === filterMonth);

  const filteredBonuses = bonuses.filter(bonus =>
    bonus.employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bonus.employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate summary statistics
  const totalMonthlySalary = filteredMonthlySalaries.reduce((sum, ms) => sum + (ms.netSalary || 0), 0);
  const totalBonuses = filteredBonuses.reduce((sum, bonus) => sum + bonus.incentives, 0);
  const pendingSalaries = filteredMonthlySalaries.filter(ms => ms.status === 'PENDING').length;

  // Group salaries by month for overview
  const salariesByMonth = getMonthOptions();

  // ------------------ Styles (same as before) ------------------
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    
    // Header Styles
    header: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '2rem 0',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 2rem'
    },
    headerMain: {
      marginBottom: '2rem'
    },
    headerTitle: {
      fontSize: '2.5rem',
      fontWeight: '700',
      margin: '0 0 0.5rem 0',
      background: 'linear-gradient(45deg, #fff, #e0e7ff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    headerSubtitle: {
      fontSize: '1.1rem',
      opacity: 0.9,
      margin: 0
    },
    headerStats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem'
    },
    statCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      padding: '1.5rem',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    statIcon: {
      fontSize: '2rem'
    },
    statNumber: {
      fontSize: '1.5rem',
      fontWeight: '700'
    },
    headerStatLabel: {
      fontSize: '0.9rem',
      opacity: 0.8
    },

    // Tab Styles
    tabContainer: {
      background: 'white',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 100
    },
    tabs: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 2rem',
      display: 'flex',
      gap: '0'
    },
    tab: {
      padding: '1rem 1.5rem',
      background: 'none',
      border: 'none',
      borderBottom: '3px solid transparent',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '500',
      color: '#64748b',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.2s ease'
    },
    activeTab: {
      color: '#6366f1',
      borderBottomColor: '#6366f1',
      background: '#f8fafc'
    },
    tabIcon: {
      fontSize: '1.1rem'
    },

    // Main Content
    mainContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem'
    },

    // Search Section
    searchSection: {
      marginBottom: '2rem'
    },
    searchContainer: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap'
    },
    searchInputContainer: {
      position: 'relative',
      flex: '1',
      minWidth: '300px'
    },
    searchIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#64748b'
    },
    searchInput: {
      width: '100%',
      padding: '0.75rem 1rem 0.75rem 2.5rem',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '0.9rem',
      background: 'white',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
    },
    filterGroup: {
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    filterSelect: {
      padding: '0.75rem 1rem',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      background: 'white',
      fontSize: '0.9rem',
      minWidth: '150px'
    },
    runPayrollButton: {
      background: 'linear-gradient(135deg, #10b981, #059669)',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '0.9rem',
      boxShadow: '0 2px 4px rgba(16, 185, 129, 0.3)'
    },
    downloadButton: {
      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '0.9rem',
      boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    secondaryButton: {
      background: '#6b7280',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.8rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },

    // Message Styles
    message: {
      padding: '1rem 1.5rem',
      borderRadius: '8px',
      marginBottom: '2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.9rem',
      fontWeight: '500'
    },
    successMessage: {
      background: '#dcfce7',
      color: '#166534',
      border: '1px solid #bbf7d0'
    },
    errorMessage: {
      background: '#fee2e2',
      color: '#991b1b',
      border: '1px solid #fecaca'
    },
    messageClose: {
      background: 'none',
      border: 'none',
      fontSize: '1.2rem',
      cursor: 'pointer',
      marginLeft: 'auto'
    },

    // Loading Overlay
    loadingOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      zIndex: 1000
    },
    loadingSpinner: {
      width: '40px',
      height: '40px',
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #6366f1',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '1rem'
    },

    // Tab Content
    tabContent: {
      animation: 'fadeIn 0.3s ease'
    },

    // Form Styles
    formSection: {
      marginBottom: '2rem'
    },
    formCard: {
      background: 'white',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e2e8f0'
    },
    formTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '1.5rem',
      color: '#1e293b'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem'
    },
    formRow: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap'
    },
    formGroup: {
      flex: '1',
      minWidth: '200px'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '500',
      color: '#374151',
      fontSize: '0.9rem'
    },
    input: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '0.9rem',
      transition: 'all 0.2s ease',
      boxSizing: 'border-box'
    },
    salaryBreakdown: {
      gridColumn: '1 / -1'
    },
    breakdownTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      marginBottom: '1rem',
      color: '#1e293b'
    },
    breakdownGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem'
    },
    formActions: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1rem'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '0.9rem',
      boxShadow: '0 2px 4px rgba(99, 102, 241, 0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },

    // Table Styles
    tableSection: {
      background: 'white',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e2e8f0'
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '1.5rem',
      color: '#1e293b'
    },
    tableHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    tableActions: {
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    tableFilters: {
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    filterInput: {
      padding: '0.5rem 1rem',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      fontSize: '0.9rem'
    },
    filterButton: {
      background: '#3b82f6',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.9rem'
    },
    clearButton: {
      background: '#6b7280',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.9rem'
    },
    tableContainer: {
      overflowX: 'auto',
      borderRadius: '8px',
      border: '1px solid #e2e8f0'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '0.9rem'
    },
    th: {
      background: '#f8fafc',
      padding: '1rem',
      textAlign: 'left',
      fontWeight: '600',
      color: '#374151',
      borderBottom: '1px solid #e2e8f0',
      whiteSpace: 'nowrap'
    },
    tr: {
      borderBottom: '1px solid #f1f5f9',
      transition: 'background 0.2s ease'
    },
    td: {
      padding: '1rem',
      borderBottom: '1px solid #f1f5f9',
      verticalAlign: 'middle'
    },

    // Component Specific Styles
    employeeInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem'
    },
    employeeId: {
      fontWeight: '600',
      color: '#1e293b',
      fontSize: '0.85rem'
    },
    employeeName: {
      color: '#64748b',
      fontSize: '0.8rem'
    },
    bankInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem'
    },
    accountNumber: {
      fontFamily: 'monospace',
      fontSize: '0.8rem',
      color: '#64748b'
    },
    ctc: {
      fontWeight: '600',
      color: '#059669'
    },
    bonusAmount: {
      fontWeight: '600',
      color: '#d97706'
    },
    monthBadge: {
      background: '#eff6ff',
      color: '#1d4ed8',
      padding: '0.25rem 0.5rem',
      borderRadius: '6px',
      fontSize: '0.8rem',
      fontWeight: '500',
      display: 'inline-block'
    },
    statusBadge: {
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.8rem',
      fontWeight: '500',
      display: 'inline-block'
    },
    pendingBadge: {
      background: '#fef3c7',
      color: '#d97706'
    },
    paidBadge: {
      background: '#d1fae5',
      color: '#059669'
    },
    actionButtons: {
      display: 'flex',
      gap: '0.5rem'
    },
    editButton: {
      background: '#fbbf24',
      color: '#78350f',
      border: 'none',
      padding: '0.5rem 0.75rem',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.8rem',
      fontWeight: '500'
    },
    deleteButton: {
      background: '#ef4444',
      color: 'white',
      border: 'none',
      padding: '0.5rem 0.75rem',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.8rem',
      fontWeight: '500'
    },
    markPaidButton: {
      background: '#10b981',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.8rem',
      fontWeight: '500'
    },
    markAllButton: {
      background: '#8b5cf6',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.8rem',
      fontWeight: '500'
    },
    deduction: {
      color: '#ef4444',
      fontWeight: '500'
    },
    netSalary: {
      fontWeight: '700',
      color: '#059669',
      fontSize: '0.95rem'
    },
    daysInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem',
      fontSize: '0.8rem'
    },
    workedDays: {
      color: '#059669',
      fontWeight: '600'
    },
    totalDays: {
      color: '#64748b'
    },

    // Payroll Overview
    payrollOverview: {
      background: 'white',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e2e8f0'
    },
    overviewHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    overviewStats: {
      display: 'flex',
      gap: '2rem',
      flexWrap: 'wrap'
    },
    overviewStat: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    overviewStatValue: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1e293b'
    },
    overviewStatLabel: {
      fontSize: '0.8rem',
      color: '#64748b',
      marginTop: '0.25rem'
    },

    // Month Cards
    monthCards: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    monthCard: {
      background: 'white',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    },
    monthCardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem'
    },
    monthCardTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: '#1e293b'
    },
    monthCardStats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1rem',
      marginBottom: '1rem'
    },
    monthCardStat: {
      textAlign: 'center'
    },
    monthCardStatValue: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#1e293b'
    },
    monthCardStatLabel: {
      fontSize: '0.75rem',
      color: '#64748b',
      marginTop: '0.25rem'
    },
    monthCardActions: {
      display: 'flex',
      gap: '0.5rem',
      justifyContent: 'flex-end'
    },

    // Reports
    reportsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem'
    },
    reportCard: {
      background: 'white',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e2e8f0'
    },
    reportTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      marginBottom: '1rem',
      color: '#1e293b'
    },
    reportContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    reportItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem 0',
      borderBottom: '1px solid #f1f5f9'
    },
    quickActionButton: {
      background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '500',
      textAlign: 'center'
    },

    // No Data
    noData: {
      textAlign: 'center',
      padding: '3rem',
      color: '#64748b',
      fontSize: '1rem'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerMain}>
            <h1 style={styles.headerTitle}>💰 HR Salary Management</h1>
            <p style={styles.headerSubtitle}>Manage employee salaries, bonuses, and payroll processing</p>
          </div>
          <div style={styles.headerStats}>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>👥</div>
              <div>
                <div style={styles.statNumber}>{salaryPackages.length}</div>
                <div style={styles.headerStatLabel}>Employees</div>
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>💵</div>
              <div>
                <div style={styles.statNumber}>₹{(totalMonthlySalary/100000).toFixed(1)}L</div>
                <div style={styles.headerStatLabel}>Monthly Payroll</div>
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>🎯</div>
              <div>
                <div style={styles.statNumber}>₹{(totalBonuses/100000).toFixed(1)}L</div>
                <div style={styles.headerStatLabel}>Total Bonuses</div>
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>⏳</div>
              <div>
                <div style={styles.statNumber}>{pendingSalaries}</div>
                <div style={styles.headerStatLabel}>Pending</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={styles.tabContainer}>
        <div style={styles.tabs}>
          {[
            { id: 'salaryPackage', label: '💼 Salary Package', icon: '📋' },
            { id: 'bonusManagement', label: '🎯 Bonus Management', icon: '💰' },
            { id: 'payroll', label: '📊 Payroll Overview', icon: '📈' },
            { id: 'reports', label: '📋 Salary Reports', icon: '📄' }
          ].map(tab => (
            <button
              key={tab.id}
              style={{
                ...styles.tab,
                ...(activeTab === tab.id ? styles.activeTab : {})
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              <span style={styles.tabIcon}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Search and Filters */}
        <div style={styles.searchSection}>
          <div style={styles.searchContainer}>
            <div style={styles.searchInputContainer}>
              <span style={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search by Employee ID or Name..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
            </div>
            <div style={styles.filterGroup}>
              <select 
                value={filterMonth} 
                onChange={e => setFilterMonth(e.target.value)}
                style={styles.filterSelect}
              >
                <option value="">All Months</option>
                {getMonthOptions().map(month => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
              
              <select 
                value={selectedPayrollMonth} 
                onChange={e => setSelectedPayrollMonth(e.target.value)}
                style={styles.filterSelect}
              >
                <option value="">Select Month for Payroll</option>
                {getMonthOptions().map(month => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
              
              <button 
                onClick={handleGenerateMonthlySalary}
                style={styles.runPayrollButton}
                disabled={loading || !selectedPayrollMonth}
              >
                {loading ? '⏳' : '⚡'} Generate {selectedPayrollMonth ? getMonthName(selectedPayrollMonth) : 'Payroll'}
              </button>
            </div>
          </div>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div style={{
            ...styles.message,
            ...(message.type === 'success' ? styles.successMessage : styles.errorMessage)
          }}>
            <span style={styles.messageIcon}>
              {message.type === 'success' ? '✅' : '❌'}
            </span>
            {message.text}
            <button onClick={() => setMessage({ type: '', text: '' })} style={styles.messageClose}>×</button>
          </div>
        )}

        {/* Loading Overlay */}
        {loading && (
          <div style={styles.loadingOverlay}>
            <div style={styles.loadingSpinner}></div>
            <p>Processing...</p>
          </div>
        )}

        {/* Salary Package Tab */}
        {activeTab === 'salaryPackage' && (
          <div style={styles.tabContent}>
            <div style={styles.formSection}>
              <div style={styles.formCard}>
                <h3 style={styles.formTitle}>
                  {employeeId ? '✏️ Update Salary Package' : '➕ Create Salary Package'}
                </h3>
                <form onSubmit={handleSalaryPackageSubmit} style={styles.form}>
                  {/* Salary Package Form Content */}
                  <div style={styles.formGrid}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Employee ID *</label>
                      <input 
                        type="text" 
                        value={employeeId} 
                        onChange={e => setEmployeeId(e.target.value)} 
                        required 
                        style={styles.input}
                        placeholder="Enter employee ID"
                      />
                    </div>
                    
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Bank Details</label>
                      <input 
                        type="text" 
                        value={bankName} 
                        onChange={e => setBankName(e.target.value)} 
                        style={styles.input}
                        placeholder="Bank name"
                      />
                      <input 
                        type="text" 
                        value={accountNumber} 
                        onChange={e => handleAccountNumberInput(e.target.value)} 
                        style={{...styles.input, marginTop: '8px'}}
                        placeholder="Account number"
                      />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Compliance Details</label>
                      <input type="text" value={pfNumber} onChange={e => setPfNumber(e.target.value)} style={styles.input} placeholder="PF Number"/>
                      <input type="text" value={uanNumber} onChange={e => setUanNumber(e.target.value)} style={{...styles.input, marginTop: '8px'}} placeholder="UAN Number"/>
                      <input type="text" value={esiNumber} onChange={e => setEsiNumber(e.target.value)} style={{...styles.input, marginTop: '8px'}} placeholder="ESI Number"/>
                      <input type="text" value={panNumber} onChange={e => setPanNumber(e.target.value)} style={{...styles.input, marginTop: '8px'}} placeholder="PAN Number"/>
                    </div>

                    <div style={styles.salaryBreakdown}>
                      <h4 style={styles.breakdownTitle}>Salary Breakdown</h4>
                      <div style={styles.breakdownGrid}>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>Basic Salary</label>
                          <input type="text" value={basic} onChange={e => handleNumberInput(e.target.value, setBasic)} style={styles.input}/>
                        </div>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>HRA</label>
                          <input type="text" value={flexibleBenefitPlan} onChange={e => handleNumberInput(e.target.value, setFlexibleBenefitPlan)} style={styles.input}/>
                        </div>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>Special Allowance</label>
                          <input type="text" value={specialAllowance} onChange={e => handleNumberInput(e.target.value, setSpecialAllowance)} style={styles.input}/>
                        </div>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>PF Contribution</label>
                          <input type="text" value={pfContributionEmployer} onChange={e => handleNumberInput(e.target.value, setPfContributionEmployer)} style={styles.input}/>
                        </div>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>Professional Tax</label>
                          <input type="text" value={professionalTax} onChange={e => handleNumberInput(e.target.value, setProfessionalTax)} style={styles.input}/>
                        </div>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>LOP Days</label>
                          <input type="text" value={lop} onChange={e => handleNumberInput(e.target.value, setLop)} style={styles.input}/>
                        </div>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>Total CTC</label>
                          <input type="text" value={totalCostToCompany} onChange={e => handleNumberInput(e.target.value, setTotalCostToCompany)} style={styles.input}/>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={styles.formActions}>
                    <button type="submit" style={styles.primaryButton} disabled={loading}>
                      {loading ? '⏳' : '💾'} {employeeId ? 'Update' : 'Create'} Salary Package
                    </button>
                    <button type="button" onClick={resetForm} style={styles.secondaryButton}>
                      🗑️ Clear Form
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Salary Packages Table */}
            <div style={styles.tableSection}>
              <div style={styles.tableHeader}>
                <h3 style={styles.sectionTitle}>📋 Salary Packages</h3>
                <div style={styles.tableActions}>
                  <button onClick={handleDownloadSalaryPackages} style={styles.downloadButton}>
                    📥 Export to Excel
                  </button>
                </div>
              </div>
              <div style={styles.tableContainer}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Employee</th>
                      <th style={styles.th}>Bank Details</th>
                      <th style={styles.th}>Basic</th>
                      <th style={styles.th}>HRA</th>
                      <th style={styles.th}>Allowance</th>
                      <th style={styles.th}>PF Cont</th>
                      <th style={styles.th}>Tax</th>
                      <th style={styles.th}>CTC</th>
                      <th style={styles.th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPackages.map(pkg => (
                      <tr key={pkg.id} style={styles.tr}>
                        <td style={styles.td}>
                          <div style={styles.employeeInfo}>
                            <div style={styles.employeeId}>{pkg.employee.employeeId}</div>
                            <div style={styles.employeeName}>{pkg.employee.name}</div>
                          </div>
                        </td>
                        <td style={styles.td}>
                          <div style={styles.bankInfo}>
                            <div>{pkg.bankName || '-'}</div>
                            <div style={styles.accountNumber}>{pkg.accountNumber || '-'}</div>
                          </div>
                        </td>
                        <td style={styles.td}>₹{pkg.basic.toLocaleString()}</td>
                        <td style={styles.td}>₹{pkg.flexibleBenefitPlan.toLocaleString()}</td>
                        <td style={styles.td}>₹{pkg.specialAllowance.toLocaleString()}</td>
                        <td style={styles.td}>₹{pkg.pfContributionEmployer.toLocaleString()}</td>
                        <td style={styles.td}>₹{pkg.professionalTax.toLocaleString()}</td>
                        <td style={styles.td}>
                          <div style={styles.ctc}>₹{pkg.totalCostToCompany.toLocaleString()}</div>
                        </td>
                        <td style={styles.td}>
                          <button 
                            onClick={() => handleEditPackage(pkg)}
                            style={styles.editButton}
                          >
                            ✏️ Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredPackages.length === 0 && (
                  <div style={styles.noData}>
                    📝 No salary packages found
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Bonus Management Tab */}
        {activeTab === 'bonusManagement' && (
          <div style={styles.tabContent}>
            <div style={styles.formSection}>
              <div style={styles.formCard}>
                <h3 style={styles.formTitle}>
                  {editingBonus ? '✏️ Update Bonus' : '➕ Add Bonus/Incentives'}
                </h3>
                <form onSubmit={handleBonusSubmit} style={styles.form}>
                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Employee ID *</label>
                      <input 
                        type="text" 
                        value={bonusForm.employeeId} 
                        onChange={e => setBonusForm({...bonusForm, employeeId: e.target.value})} 
                        required 
                        style={styles.input}
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Incentives Amount *</label>
                      <input 
                        type="text" 
                        value={bonusForm.incentives} 
                        onChange={e => handleNumberInput(e.target.value, (val) => setBonusForm({...bonusForm, incentives: val}))} 
                        required 
                        style={styles.input}
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Month *</label>
                      <select 
                        value={bonusForm.month} 
                        onChange={e => setBonusForm({...bonusForm, month: e.target.value})} 
                        required 
                        style={styles.input}
                      >
                        <option value="">Select Month</option>
                        {getMonthOptions().map(month => (
                          <option key={month.value} value={month.value}>
                            {month.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div style={styles.formActions}>
                    <button type="submit" style={styles.primaryButton} disabled={loading}>
                      💰 {editingBonus ? 'Update' : 'Add'} Bonus
                    </button>
                    <button type="button" onClick={resetBonusForm} style={styles.secondaryButton}>
                      🗑️ Clear
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Bonuses Table */}
            <div style={styles.tableSection}>
              <div style={styles.tableHeader}>
                <h3 style={styles.sectionTitle}>🎯 Bonuses & Incentives</h3>
                <div style={styles.tableActions}>
                  <div style={styles.tableFilters}>
                    <select 
                      value={bonusFilterMonth} 
                      onChange={e => setBonusFilterMonth(e.target.value)}
                      style={styles.filterInput}
                    >
                      <option value="">All Months</option>
                      {getMonthOptions().map(month => (
                        <option key={month.value} value={month.value}>
                          {month.label}
                        </option>
                      ))}
                    </select>
                    <button onClick={handleBonusFilter} style={styles.filterButton}>
                      🔍 Filter
                    </button>
                    <button 
                      onClick={() => { setBonusFilterMonth(''); fetchBonuses(); }} 
                      style={styles.clearButton}
                    >
                      🗑️ Clear
                    </button>
                  </div>
                  <button onClick={() => handleDownloadBonuses()} style={styles.downloadButton}>
                    📥 Export All
                  </button>
                </div>
              </div>
              <div style={styles.tableContainer}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Employee</th>
                      <th style={styles.th}>Incentives</th>
                      <th style={styles.th}>Month</th>
                      <th style={styles.th}>Date Added</th>
                      <th style={styles.th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBonuses.map(bonus => (
                      <tr key={bonus.id} style={styles.tr}>
                        <td style={styles.td}>
                          <div style={styles.employeeInfo}>
                            <div style={styles.employeeId}>{bonus.employee.employeeId}</div>
                            <div style={styles.employeeName}>{bonus.employee.name}</div>
                          </div>
                        </td>
                        <td style={styles.td}>
                          <div style={styles.bonusAmount}>
                            ₹{bonus.incentives.toLocaleString()}
                          </div>
                        </td>
                        <td style={styles.td}>
                          <div style={styles.monthBadge}>{bonus.month}</div>
                        </td>
                        <td style={styles.td}>{bonus.startDate}</td>
                        <td style={styles.td}>
                          <div style={styles.actionButtons}>
                            <button 
                              onClick={() => handleEditBonus(bonus)} 
                              style={styles.editButton}
                            >
                              ✏️
                            </button>
                            <button 
                              onClick={() => handleDeleteBonus(bonus.id)} 
                              style={styles.deleteButton}
                            >
                              🗑️
                            </button>
                            <button 
                              onClick={() => handleDownloadBonuses(bonus.month)} 
                              style={styles.secondaryButton}
                              title="Export this month's bonuses"
                            >
                              📥
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredBonuses.length === 0 && (
                  <div style={styles.noData}>
                    🎯 No bonuses found
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Payroll Overview Tab */}
        {activeTab === 'payroll' && (
          <div style={styles.tabContent}>
            <div style={styles.payrollOverview}>
              <div style={styles.overviewHeader}>
                <h3 style={styles.sectionTitle}>📊 Payroll Overview - Month by Month</h3>
                <div style={styles.tableActions}>
                  <button onClick={() => handleDownloadPayroll()} style={styles.downloadButton}>
                    📥 Export All Months
                  </button>
                </div>
              </div>

              {/* Month Cards */}
              <div style={styles.monthCards}>
                {salariesByMonth.map(month => {
                  const summary = getMonthSummary(month.value);
                  return (
                    <div key={month.value} style={styles.monthCard}>
                      <div style={styles.monthCardHeader}>
                        <h4 style={styles.monthCardTitle}>{month.label}</h4>
                        <span style={{
                          ...styles.statusBadge,
                          ...(summary.pendingCount > 0 ? styles.pendingBadge : styles.paidBadge)
                        }}>
                          {summary.pendingCount > 0 ? `${summary.pendingCount} Pending` : 'All Paid'}
                        </span>
                      </div>
                      <div style={styles.monthCardStats}>
                        <div style={styles.monthCardStat}>
                          <div style={styles.monthCardStatValue}>₹{summary.totalSalary.toLocaleString()}</div>
                          <div style={styles.monthCardStatLabel}>Total Salary</div>
                        </div>
                        <div style={styles.monthCardStat}>
                          <div style={styles.monthCardStatValue}>₹{summary.totalBonus.toLocaleString()}</div>
                          <div style={styles.monthCardStatLabel}>Total Bonus</div>
                        </div>
                        <div style={styles.monthCardStat}>
                          <div style={styles.monthCardStatValue}>{summary.paidCount}</div>
                          <div style={styles.monthCardStatLabel}>Paid</div>
                        </div>
                        <div style={styles.monthCardStat}>
                          <div style={styles.monthCardStatValue}>{summary.pendingCount}</div>
                          <div style={styles.monthCardStatLabel}>Pending</div>
                        </div>
                      </div>
                      <div style={styles.monthCardActions}>
                        <button 
                          onClick={() => setFilterMonth(month.value)}
                          style={styles.secondaryButton}
                        >
                          👀 View
                        </button>
                        <button 
                          onClick={() => handleDownloadPayroll(month.value)}
                          style={styles.secondaryButton}
                        >
                          📥 Export
                        </button>
                        {summary.pendingCount > 0 && (
                          <button 
                            onClick={() => handleMarkAllPaid(month.value)}
                            style={styles.markAllButton}
                          >
                            ✅ Mark All Paid
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Monthly Salaries Table */}
              {filterMonth && (
                <>
                  <div style={styles.tableHeader}>
                    <h3 style={styles.sectionTitle}>
                      📋 Payroll Details for {getMonthName(filterMonth)}
                      <span style={{ fontSize: '0.9rem', color: '#64748b', marginLeft: '1rem' }}>
                        (Showing {filteredMonthlySalaries.length} employees)
                      </span>
                    </h3>
                    <div style={styles.tableActions}>
                      <button onClick={() => handleDownloadPayroll(filterMonth)} style={styles.downloadButton}>
                        📥 Export This Month
                      </button>
                      {pendingSalaries > 0 && (
                        <button 
                          onClick={() => handleMarkAllPaid(filterMonth)}
                          style={styles.markAllButton}
                        >
                          ✅ Mark All Paid
                        </button>
                      )}
                    </div>
                  </div>

                  <div style={styles.tableContainer}>
                    <table style={styles.table}>
                      <thead>
                        <tr>
                          <th style={styles.th}>Employee</th>
                          <th style={styles.th}>Basic</th>
                          <th style={styles.th}>Allowances</th>
                          <th style={styles.th}>Bonus</th>
                          <th style={styles.th}>Deductions</th>
                          <th style={styles.th}>Net Salary</th>
                          <th style={styles.th}>Working Days</th>
                          <th style={styles.th}>Status</th>
                          <th style={styles.th}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredMonthlySalaries.map(ms => {
                          const monthlyBonus = bonuses
                            .filter(b => b.employee.employeeId === ms.employee.employeeId && b.month === ms.month)
                            .reduce((sum, bonus) => sum + bonus.incentives, 0);

                          const totalAllowance = (ms.flexibleBenefitPlan || 0) + (ms.specialAllowance || 0);
                          const lopDeduction = ms.lop ? ((ms.basic + totalAllowance) / ms.totalWorkingDays) * ms.lop : 0;
                          const adjustedNet = (ms.netSalary || 0) - lopDeduction + monthlyBonus;

                          return (
                            <tr key={ms.id} style={styles.tr}>
                              <td style={styles.td}>
                                <div style={styles.employeeInfo}>
                                  <div style={styles.employeeId}>{ms.employee.employeeId}</div>
                                  <div style={styles.employeeName}>{ms.employee.name}</div>
                                </div>
                              </td>
                              <td style={styles.td}>₹{ms.basic?.toLocaleString() || '0'}</td>
                              <td style={styles.td}>₹{totalAllowance.toLocaleString()}</td>
                              <td style={styles.td}>
                                <div style={styles.bonusAmount}>₹{monthlyBonus.toLocaleString()}</div>
                              </td>
                              <td style={styles.td}>
                                <div style={styles.deduction}>₹{lopDeduction.toFixed(0)}</div>
                              </td>
                              <td style={styles.td}>
                                <div style={styles.netSalary}>₹{adjustedNet.toLocaleString()}</div>
                              </td>
                              <td style={styles.td}>
                                <div style={styles.daysInfo}>
                                  <span style={styles.workedDays}>{ms.workedDays} worked</span>
                                  <span style={styles.totalDays}>/ {ms.totalWorkingDays} total</span>
                                  {ms.lop > 0 && <span style={styles.deduction}>{ms.lop} LOP</span>}
                                </div>
                              </td>
                              <td style={styles.td}>
                                <span style={{
                                  ...styles.statusBadge,
                                  ...(ms.status === 'PENDING' ? styles.pendingBadge : styles.paidBadge)
                                }}>
                                  {ms.status}
                                </span>
                              </td>
                              <td style={styles.td}>
                                {ms.status === 'PENDING' && (
                                  <button 
                                    onClick={() => handleMarkSalaryPaid(ms.id, ms.month)}
                                    style={styles.markPaidButton}
                                    disabled={loading}
                                  >
                                    ✅ Pay
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    {filteredMonthlySalaries.length === 0 && (
                      <div style={styles.noData}>
                        📊 No payroll records found for {getMonthName(filterMonth)}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div style={styles.tabContent}>
            <div style={styles.reportsGrid}>
              <div style={styles.reportCard}>
                <h4 style={styles.reportTitle}>📈 Salary Summary</h4>
                <div style={styles.reportContent}>
                  <div style={styles.reportItem}>
                    <span>Total Employees:</span>
                    <span>{salaryPackages.length}</span>
                  </div>
                  <div style={styles.reportItem}>
                    <span>Monthly Payroll:</span>
                    <span>₹{totalMonthlySalary.toLocaleString()}</span>
                  </div>
                  <div style={styles.reportItem}>
                    <span>Total Bonuses:</span>
                    <span>₹{totalBonuses.toLocaleString()}</span>
                  </div>
                  <div style={styles.reportItem}>
                    <span>Pending Salaries:</span>
                    <span>{pendingSalaries}</span>
                  </div>
                  <div style={styles.reportItem}>
                    <span>Available Months:</span>
                    <span>{availableMonths.length}</span>
                  </div>
                </div>
              </div>
              
              <div style={styles.reportCard}>
                <h4 style={styles.reportTitle}>📋 Quick Actions</h4>
                <div style={styles.reportContent}>
                  <button style={styles.quickActionButton} onClick={handleGenerateMonthlySalary}>
                    ⚡ Generate Payroll
                  </button>
                  <button style={styles.quickActionButton} onClick={() => setActiveTab('bonusManagement')}>
                    💰 Add Bonus
                  </button>
                  <button style={styles.quickActionButton} onClick={() => setActiveTab('salaryPackage')}>
                    👥 Add Employee
                  </button>
                </div>
              </div>

              <div style={styles.reportCard}>
                <h4 style={styles.reportTitle}>📊 Export Data</h4>
                <div style={styles.reportContent}>
                  <button style={styles.quickActionButton} onClick={handleDownloadSalaryPackages}>
                    📥 Salary Packages
                  </button>
                  <button style={styles.quickActionButton} onClick={() => handleDownloadBonuses()}>
                    📥 All Bonuses
                  </button>
                  <button style={styles.quickActionButton} onClick={() => handleDownloadPayroll()}>
                    📥 Complete Payroll
                  </button>
                  {salariesByMonth.slice(0, 3).map(month => (
                    <button 
                      key={month.value} 
                      style={styles.quickActionButton}
                      onClick={() => handleDownloadPayroll(month.value)}
                    >
                      📥 {getMonthName(month.value)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HRSalaryManagement;