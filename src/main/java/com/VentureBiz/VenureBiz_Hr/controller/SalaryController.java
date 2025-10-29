package com.VentureBiz.VenureBiz_Hr.controller;

import com.VentureBiz.VenureBiz_Hr.model.*;
import com.VentureBiz.VenureBiz_Hr.repository.*;
import com.VentureBiz.VenureBiz_Hr.scheduler.UnifiedSalaryScheduler;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class SalaryController {

    private final SalaryPackageRepository salaryPackageRepository;
    private final MonthlySalaryRepository monthlySalaryRepository;
    private final EmployeeRepository employeeRepository;
    private final AttendanceRepository attendanceRepository;
    private final LeaveRepository leaveRepository;
    private final UnifiedSalaryScheduler salaryScheduler;

    // ---------------------- EMPLOYEE ----------------------
    @GetMapping("/employee/salary/mypackage")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public SalaryPackage getMySalaryPackage(@RequestParam String email) {
        Employee employee = employeeRepository.findByUser_Email(email)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        return salaryPackageRepository.findByEmployee(employee)
                .orElseThrow(() -> new RuntimeException("Salary package not found"));
    }

    @GetMapping("/employee/salary/mymonthsalary")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public List<MonthlySalary> getMyMonthlySalary(@RequestParam String email) {
        Employee employee = employeeRepository.findByUser_Email(email)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        return monthlySalaryRepository.findByEmployee(employee);
    }

    // ---------------------- HR ----------------------

    /** ✅ 1. Create or Update Salary Package (with bank and compliance details) */
    @PostMapping("/hr/salary/package")
    @PreAuthorize("hasRole('HR')")
    public SalaryPackage createOrUpdateSalaryPackage(@RequestParam String employeeId,
                                                     @RequestBody SalaryPackage salaryPackage) {
        Employee employee = employeeRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        return salaryPackageRepository.findByEmployee(employee)
                .map(existing -> {
                    existing.setBasic(salaryPackage.getBasic());
                    existing.setFlexibleBenefitPlan(salaryPackage.getFlexibleBenefitPlan());
                    existing.setSpecialAllowance(salaryPackage.getSpecialAllowance());
                    existing.setPfContributionEmployer(salaryPackage.getPfContributionEmployer());
                    existing.setProfessionalTax(salaryPackage.getProfessionalTax());
                    existing.setTotalCostToCompany(salaryPackage.getTotalCostToCompany());
                    existing.setBankName(salaryPackage.getBankName());
                    existing.setAccountNumber(salaryPackage.getAccountNumber());

                    // ✅ Newly added fields
                    existing.setPfNumber(salaryPackage.getPfNumber());
                    existing.setUanNumber(salaryPackage.getUanNumber());
                    existing.setEsiNumber(salaryPackage.getEsiNumber());
                    existing.setPanNumber(salaryPackage.getPanNumber());
                    existing.setLop(salaryPackage.getLop());

                    return salaryPackageRepository.save(existing);
                })
                .orElseGet(() -> {
                    salaryPackage.setEmployee(employee);
                    return salaryPackageRepository.save(salaryPackage);
                });
    }

    /** ✅ 2. Edit existing salary package (HR can modify anytime) */
    @PutMapping("/hr/salary/package/edit/{employeeId}")
    @PreAuthorize("hasRole('HR')")
    public SalaryPackage editSalaryPackage(@PathVariable String employeeId,
                                           @RequestBody SalaryPackage updatedPackage) {
        Employee employee = employeeRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        SalaryPackage sp = salaryPackageRepository.findByEmployee(employee)
                .orElseThrow(() -> new RuntimeException("Salary package not found"));

        sp.setBasic(updatedPackage.getBasic());
        sp.setFlexibleBenefitPlan(updatedPackage.getFlexibleBenefitPlan());
        sp.setSpecialAllowance(updatedPackage.getSpecialAllowance());
        sp.setPfContributionEmployer(updatedPackage.getPfContributionEmployer());
        sp.setProfessionalTax(updatedPackage.getProfessionalTax());
        sp.setTotalCostToCompany(updatedPackage.getTotalCostToCompany());
        sp.setBankName(updatedPackage.getBankName());
        sp.setAccountNumber(updatedPackage.getAccountNumber());

        // ✅ Newly added fields
        sp.setPfNumber(updatedPackage.getPfNumber());
        sp.setUanNumber(updatedPackage.getUanNumber());
        sp.setEsiNumber(updatedPackage.getEsiNumber());
        sp.setPanNumber(updatedPackage.getPanNumber());
        sp.setLop(updatedPackage.getLop());

        return salaryPackageRepository.save(sp);
    }

    /** ✅ 3. Apply Salary Hike by Percentage */
    @PutMapping("/hr/salary/package/hike/{employeeId}")
    @PreAuthorize("hasRole('HR')")
    public SalaryPackage applySalaryHike(@PathVariable String employeeId,
                                         @RequestParam double percentage) {
        Employee employee = employeeRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        SalaryPackage sp = salaryPackageRepository.findByEmployee(employee)
                .orElseThrow(() -> new RuntimeException("Salary package not found"));

        double factor = 1 + (percentage / 100);
        sp.setBasic(sp.getBasic() * factor);
        sp.setFlexibleBenefitPlan(sp.getFlexibleBenefitPlan() * factor);
        sp.setSpecialAllowance(sp.getSpecialAllowance() * factor);
        sp.setPfContributionEmployer(sp.getPfContributionEmployer() * factor);
        sp.setProfessionalTax(sp.getProfessionalTax() * factor);
        sp.setTotalCostToCompany(sp.getTotalCostToCompany() * factor);

        // keep bank and compliance info unchanged
        return salaryPackageRepository.save(sp);
    }

    /** ✅ 4. Manual salary generation (triggers scheduler) */
    @PostMapping("/hr/salary/generate")
    @PreAuthorize("hasRole('HR')")
    public String generateMonthlySalary(@RequestParam int year, @RequestParam int month) {
        salaryScheduler.processSalaries();
        return "✅ Salary recalculation triggered for " + year + "-" + month;
    }

    /** ✅ 5. Mark a monthly salary as PAID */
    @PutMapping("/hr/salary/{id}/markpaid")
    @PreAuthorize("hasRole('HR')")
    public MonthlySalary markSalaryPaid(@PathVariable Long id) {
        MonthlySalary ms = monthlySalaryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Monthly salary not found"));
        ms.setStatus(MonthlySalary.Status.PAID);
        return monthlySalaryRepository.save(ms);
    }

    /** ✅ 6. Get all monthly salary records */
    @GetMapping("/hr/salary/all/monthly")
    @PreAuthorize("hasRole('HR')")
    public List<MonthlySalary> getAllMonthlySalary() {
        return monthlySalaryRepository.findAll();
    }

    /** ✅ 7. Get all salary packages */
    @GetMapping("/hr/salary/all/packages")
    @PreAuthorize("hasRole('HR')")
    public List<SalaryPackage> getAllSalaryPackages() {
        return salaryPackageRepository.findAll();
    }

    /** ✅ 8. Manual Scheduler Trigger (for testing) */
    @PostMapping("/hr/salary/run-scheduler")
    @PreAuthorize("hasRole('HR')")
    public String runSalaryScheduler() {
        salaryScheduler.processSalaries();
        return "✅ Unified salary scheduler executed manually";
    }

    @GetMapping("/employee/me")
    @PreAuthorize("hasAnyRole('EMPLOYEE', 'HR')")
    public ResponseEntity<?> getOwnProfile() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName(); // assuming JWT subject is email

        return employeeRepository.findByUser_Email(email)
                .map(emp -> {
                    EmployeeProfileDTO dto = new EmployeeProfileDTO(
                            emp.getEmployeeId(),
                            emp.getName(),
                            emp.getDepartment(),
                            emp.getDeptRole(),
                            emp.getDateOfJoining(),
                            emp.getStatus() != null ? emp.getStatus().name() : "N/A",
                            emp.getUser().getEmail()
                    );
                    return ResponseEntity.ok(dto);
                })
                .orElseGet(() -> ResponseEntity.status(404).body(null));
    }
}
