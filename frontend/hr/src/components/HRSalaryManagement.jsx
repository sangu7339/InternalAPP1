import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  // ------------------ Data state ------------------
  const [salaryPackages, setSalaryPackages] = useState([]);
  const [monthlySalaries, setMonthlySalaries] = useState([]);
  const [message, setMessage] = useState('');

  // ------------------ Filters ------------------
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMonth, setFilterMonth] = useState(''); // format YYYY-MM

  const token = localStorage.getItem('token');

  // ------------------ Fetch Data ------------------
  const fetchSalaryPackages = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/hr/salary/all/packages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSalaryPackages(res.data);
    } catch (err) {
      setMessage('Error fetching salary packages');
      console.error(err);
    }
  };

  const fetchMonthlySalaries = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/hr/salary/all/monthly', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMonthlySalaries(res.data);
    } catch (err) {
      setMessage('Error fetching monthly salaries');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSalaryPackages();
    fetchMonthlySalaries();
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
      setMessage(`✅ Salary package saved for employee ${employeeId}`);
      resetForm();
      fetchSalaryPackages();
    } catch (err) {
      setMessage('❌ Error saving salary package');
      console.error(err);
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ------------------ Scheduler & Mark Paid ------------------
  const handleGenerateMonthlySalary = async () => {
    try {
      await axios.post(`http://localhost:8080/api/hr/salary/run-scheduler`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('✅ Salary scheduler executed successfully');
      fetchMonthlySalaries();
    } catch (err) {
      setMessage('❌ Error running salary scheduler');
      console.error(err);
    }
  };

  const handleMarkSalaryPaid = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/hr/salary/${id}/markpaid`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('✅ Salary marked as PAID');
      fetchMonthlySalaries();
    } catch (err) {
      setMessage('❌ Error marking salary as paid');
      console.error(err);
    }
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

  // ------------------ JSX ------------------
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>💼 HR Salary Management</h2>

      {/* ------------------ Salary Package Form ------------------ */}
      <div style={styles.formContainer}>
        <h3 style={styles.subHeader}>Create / Update Salary Package</h3>
        <form onSubmit={handleSalaryPackageSubmit} style={styles.form}>
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Employee ID *</label>
              <input type="text" value={employeeId} onChange={e => setEmployeeId(e.target.value)} required style={styles.input}/>
            </div>
            <div style={styles.formGroup}><label style={styles.label}>Bank Name</label><input type="text" value={bankName} onChange={e => setBankName(e.target.value)} style={styles.input}/></div>
            <div style={styles.formGroup}><label style={styles.label}>Account Number</label><input type="text" value={accountNumber} onChange={e => handleAccountNumberInput(e.target.value)} style={styles.input}/></div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}><label style={styles.label}>PF Number</label><input type="text" value={pfNumber} onChange={e => setPfNumber(e.target.value)} style={styles.input}/></div>
            <div style={styles.formGroup}><label style={styles.label}>UAN Number</label><input type="text" value={uanNumber} onChange={e => setUanNumber(e.target.value)} style={styles.input}/></div>
            <div style={styles.formGroup}><label style={styles.label}>ESI Number</label><input type="text" value={esiNumber} onChange={e => setEsiNumber(e.target.value)} style={styles.input}/></div>
            <div style={styles.formGroup}><label style={styles.label}>PAN Number</label><input type="text" value={panNumber} onChange={e => setPanNumber(e.target.value)} style={styles.input}/></div>
            <div style={styles.formGroup}><label style={styles.label}>LOP</label><input type="text" value={lop} onChange={e => handleNumberInput(e.target.value, setLop)} style={styles.input}/></div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}><label style={styles.label}>Basic</label><input type="text" value={basic} onChange={e => handleNumberInput(e.target.value, setBasic)} style={styles.input}/></div>
            <div style={styles.formGroup}><label style={styles.label}>HRA</label><input type="text" value={flexibleBenefitPlan} onChange={e => handleNumberInput(e.target.value, setFlexibleBenefitPlan)} style={styles.input}/></div>
            <div style={styles.formGroup}><label style={styles.label}>Special Allowance</label><input type="text" value={specialAllowance} onChange={e => handleNumberInput(e.target.value, setSpecialAllowance)} style={styles.input}/></div>
            <div style={styles.formGroup}><label style={styles.label}>PF Contribution</label><input type="text" value={pfContributionEmployer} onChange={e => handleNumberInput(e.target.value, setPfContributionEmployer)} style={styles.input}/></div>
            <div style={styles.formGroup}><label style={styles.label}>Professional Tax</label><input type="text" value={professionalTax} onChange={e => handleNumberInput(e.target.value, setProfessionalTax)} style={styles.input}/></div>
            <div style={styles.formGroup}><label style={styles.label}>Total CTC</label><input type="text" value={totalCostToCompany} onChange={e => handleNumberInput(e.target.value, setTotalCostToCompany)} style={styles.input}/></div>
          </div>

          <div style={styles.formActions}>
            <button type="submit" style={styles.primaryButton}>💾 {employeeId ? 'Update' : 'Create'} Salary Package</button>
            <button type="button" onClick={resetForm} style={styles.secondaryButton}>🗑️ Clear Form</button>
          </div>
        </form>
      </div>

      {/* ------------------ Run Scheduler ------------------ */}
      <div style={styles.actionSection}>
        <button onClick={handleGenerateMonthlySalary} style={styles.actionButton}>⚙️ Run Salary Scheduler</button>
      </div>

      {message && <div style={styles.message}>{message}</div>}

      {/* ------------------ Search & Month Filter ------------------ */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input type="text" placeholder="🔍 Search by Employee ID or Name" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={styles.searchInput}/>
        <input type="month" value={filterMonth} onChange={e => setFilterMonth(e.target.value)} style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #ddd' }}/>
        <button onClick={() => setFilterMonth('')} style={{ padding: '6px 12px', cursor: 'pointer' }}>Clear Filter</button>
      </div>

      {/* ------------------ Salary Packages Table ------------------ */}
      <div style={styles.tableContainer}>
        <h3 style={styles.subHeader}>📋 Salary Packages</h3>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Emp ID</th><th style={styles.th}>Name</th><th style={styles.th}>Bank</th><th style={styles.th}>Account</th>
                <th style={styles.th}>PF</th><th style={styles.th}>UAN</th><th style={styles.th}>ESI</th><th style={styles.th}>PAN</th><th style={styles.th}>LOP</th>
                <th style={styles.th}>Basic</th><th style={styles.th}>Flexible</th><th style={styles.th}>Allowance</th>
                <th style={styles.th}>PF Cont</th><th style={styles.th}>Tax</th><th style={styles.th}>CTC</th><th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPackages.length > 0 ? filteredPackages.map(pkg => (
                <tr key={pkg.id}>
                  <td style={styles.td}>{pkg.employee.employeeId}</td>
                  <td style={styles.td}>{pkg.employee.name}</td>
                  <td style={styles.td}>{pkg.bankName || '-'}</td>
                  <td style={styles.td}>{pkg.accountNumber || '-'}</td>
                  <td style={styles.td}>{pkg.pfNumber || '-'}</td>
                  <td style={styles.td}>{pkg.uanNumber || '-'}</td>
                  <td style={styles.td}>{pkg.esiNumber || '-'}</td>
                  <td style={styles.td}>{pkg.panNumber || '-'}</td>
                  <td style={styles.td}>{pkg.lop || 0}</td>
                  <td style={styles.td}>{pkg.basic.toLocaleString()}</td>
                  <td style={styles.td}>{pkg.flexibleBenefitPlan.toLocaleString()}</td>
                  <td style={styles.td}>{pkg.specialAllowance.toLocaleString()}</td>
                  <td style={styles.td}>{pkg.pfContributionEmployer.toLocaleString()}</td>
                  <td style={styles.td}>{pkg.professionalTax.toLocaleString()}</td>
                  <td style={styles.td}>{pkg.totalCostToCompany.toLocaleString()}</td>
                  <td style={styles.td}><button onClick={() => handleEditPackage(pkg)} style={styles.editButton}>✏️ Edit</button></td>
                </tr>
              )) : <tr><td colSpan="16" style={styles.noData}>No packages found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* ------------------ Monthly Salaries Table ------------------ */}
      <div style={styles.tableContainer}>
        <h3 style={styles.subHeader}>📆 Monthly Salaries</h3>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Emp ID</th><th style={styles.th}>Name</th><th style={styles.th}>Month</th>
                <th style={styles.th}>Basic</th><th style={styles.th}>Allowance</th><th style={styles.th}>PF</th><th style={styles.th}>Tax</th>
                <th style={styles.th}>LOP Deduction</th><th style={styles.th}>Gross</th><th style={styles.th}>Net</th>
                <th style={styles.th}>Worked/Total</th><th style={styles.th}>Status</th><th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMonthlySalaries.length > 0 ? filteredMonthlySalaries.map(ms => {
                const totalAllowance = (ms.flexibleBenefitPlan || 0) + (ms.specialAllowance || 0);
                const lopDeduction = ms.lop ? ((ms.basic + totalAllowance) / ms.totalWorkingDays) * ms.lop : 0;
                const adjustedGross = (ms.grossSalary || 0) - lopDeduction;
                const adjustedNet = (ms.netSalary || 0) - lopDeduction;

                return (
                  <tr key={ms.id}>
                    <td style={styles.td}>{ms.employee.employeeId}</td>
                    <td style={styles.td}>{ms.employee.name}</td>
                    <td style={styles.td}>{ms.month}</td>
                    <td style={styles.td}>{ms.basic?.toLocaleString() || '0'}</td>
                    <td style={styles.td}>{totalAllowance.toLocaleString()}</td>
                    <td style={styles.td}>{ms.pfContributionEmployer?.toLocaleString() || '0'}</td>
                    <td style={styles.td}>{ms.professionalTax?.toLocaleString() || '0'}</td>
                    <td style={styles.td}>{lopDeduction.toFixed(2)}</td>
                    <td style={styles.td}>{adjustedGross.toLocaleString()}</td>
                    <td style={styles.td}>{adjustedNet.toLocaleString()}</td>
                    <td style={styles.td}>{ms.workedDays}/{ms.totalWorkingDays}</td>
                    <td style={styles.td}><span style={ms.status === 'PENDING' ? styles.pending : styles.paid}>{ms.status}</span></td>
                    <td style={styles.td}>
                      {ms.status === 'PENDING' && (
                        <button onClick={() => handleMarkSalaryPaid(ms.id)} style={styles.markPaidButton}>✅ Mark Paid</button>
                      )}
                    </td>
                  </tr>
                )
              }) : <tr><td colSpan="13" style={styles.noData}>No records found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ------------------ Styles ------------------
const styles = {
  container: { padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' },
  header: { color: '#333', borderBottom: '2px solid #4CAF50', paddingBottom: '10px', marginBottom: '20px' },
  subHeader: { color: '#555', marginBottom: '15px' },
  formContainer: { backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  formRow: { display: 'flex', gap: '15px', flexWrap: 'wrap' },
  formGroup: { flex: '1', minWidth: '150px' },
  label: { display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' },
  input: { width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' },
  formActions: { display: 'flex', gap: '10px', marginTop: '10px' },
  primaryButton: { backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' },
  secondaryButton: { backgroundColor: '#6c757d', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' },
  actionSection: { marginBottom: '20px' },
  actionButton: { backgroundColor: '#2196F3', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' },
  message: { padding: '10px', marginBottom: '20px', borderRadius: '4px', backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' },
  searchInput: { padding: '8px 12px', width: '250px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' },
  tableContainer: { backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px' },
  tableWrapper: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '14px' },
  th: { backgroundColor: '#f8f9fa', padding: '12px 8px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontWeight: 'bold', color: '#333' },
  td: { padding: '10px 8px', borderBottom: '1px solid #dee2e6', verticalAlign: 'middle' },
  noData: { textAlign: 'center', padding: '20px', color: '#6c757d', fontStyle: 'italic' },
  editButton: { backgroundColor: '#ffc107', color: '#212529', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },
  markPaidButton: { backgroundColor: '#28a745', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },
  pending: { color: '#dc3545', fontWeight: 'bold' },
  paid: { color: '#28a745', fontWeight: 'bold' },
};

export default HRSalaryManagement;
