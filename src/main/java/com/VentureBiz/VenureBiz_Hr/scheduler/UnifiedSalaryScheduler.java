package com.VentureBiz.VenureBiz_Hr.scheduler;

import com.VentureBiz.VenureBiz_Hr.model.Employee;
import com.VentureBiz.VenureBiz_Hr.model.MonthlySalary;
import com.VentureBiz.VenureBiz_Hr.model.SalaryPackage;
import com.VentureBiz.VenureBiz_Hr.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class UnifiedSalaryScheduler {

    private final MonthlySalaryRepository monthlySalaryRepository;
    private final SalaryPackageRepository salaryPackageRepository;
    private final EmployeeRepository employeeRepository;
    private final AttendanceRepository attendanceRepository;
    private final LeaveRepository leaveRepository;

    /**
     * Runs once daily at 12:10 AM
     * Handles:
     * 1. Marking last month's salaries as PAID
     * 2. Creating current month salaries if missing
     * 3. Recalculating current month salaries based on attendance, leave & LOP
     */
    @Scheduled(cron = "0 10 0 * * *")
    public void processSalaries() {
        LocalDate today = LocalDate.now();
        YearMonth currentMonth = YearMonth.from(today);
        YearMonth previousMonth = currentMonth.minusMonths(1);

        log.info("💼 Salary processing started for {}", currentMonth);

        // 1️⃣ Mark previous month salaries as PAID
        monthlySalaryRepository.findByMonth(previousMonth).forEach(ms -> {
            if (ms.getStatus() != MonthlySalary.Status.PAID) {
                ms.setStatus(MonthlySalary.Status.PAID);
                monthlySalaryRepository.save(ms);
                log.info("✅ Marked salary as PAID for {} ({})", ms.getEmployee().getName(), previousMonth);
            }
        });

        // 2️⃣ Process current month salaries
        List<Employee> employees = employeeRepository.findAll();
        int workingDays = getWorkingDaysInMonth(currentMonth);

        for (Employee emp : employees) {
            MonthlySalary ms = monthlySalaryRepository
                    .findByEmployeeAndMonth(emp, currentMonth)
                    .orElseGet(() -> createNewMonthlySalary(emp, currentMonth, workingDays));

            // Count attendance & approved sick leaves
            long presentDays = attendanceRepository.countByUserAndStatusAndMonth(
                    emp.getUser(), "PRESENT", currentMonth.getYear(), currentMonth.getMonthValue());
            long sickLeaves = leaveRepository.countApprovedSickLeaves(
                    emp.getUser(), currentMonth.getYear(), currentMonth.getMonthValue());

            // 🧾 Calculate payable days (considering LOP)
            SalaryPackage sp = salaryPackageRepository.findByEmployee(emp)
                    .orElseThrow(() -> new RuntimeException("Salary package not found for " + emp.getName()));

            long lopDays = sp.getLop() != 0 ? Math.round(sp.getLop()) : 0; // ✅ fixed: safe cast from double → long
            long payableDays = Math.max(0, presentDays + sickLeaves - lopDays);
            double factor = (double) payableDays / workingDays;

            // Salary calculation
            double basic = sp.getBasic() / 12 * factor;
            double flexible = sp.getFlexibleBenefitPlan() / 12 * factor;
            double special = sp.getSpecialAllowance() / 12 * factor;
            double pf = sp.getPfContributionEmployer() / 12 * factor;
            double tax = sp.getProfessionalTax() / 12 * factor;
            double gross = basic + flexible + special + pf;
            double net = gross - tax;

            // Update record
            ms.setBasic(basic);
            ms.setFlexibleBenefitPlan(flexible);
            ms.setSpecialAllowance(special);
            ms.setPfContributionEmployer(pf);
            ms.setProfessionalTax(tax);
            ms.setGrossSalary(gross);
            ms.setNetSalary(net);
            ms.setWorkedDays((int) payableDays);
            ms.setTotalWorkingDays(workingDays);
            ms.setStatus(MonthlySalary.Status.RUNNING);

            monthlySalaryRepository.save(ms);
        }

        log.info("✅ Salary recalculation & status update completed for {}", currentMonth);
    }

    // Utility: get working days excluding weekends
    private int getWorkingDaysInMonth(YearMonth ym) {
        int workingDays = 0;
        for (int day = 1; day <= ym.lengthOfMonth(); day++) {
            DayOfWeek dow = ym.atDay(day).getDayOfWeek();
            if (dow != DayOfWeek.SATURDAY && dow != DayOfWeek.SUNDAY) {
                workingDays++;
            }
        }
        return workingDays;
    }

    // Overload to allow direct int params
    private int getWorkingDaysInMonth(int year, int month) {
        return getWorkingDaysInMonth(YearMonth.of(year, month));
    }

    // Create new salary entry if missing
    private MonthlySalary createNewMonthlySalary(Employee emp, YearMonth ym, int workingDays) {
        MonthlySalary ms = MonthlySalary.builder()
                .employee(emp)
                .month(ym)
                .basic(0)
                .flexibleBenefitPlan(0)
                .specialAllowance(0)
                .pfContributionEmployer(0)
                .professionalTax(0)
                .grossSalary(0)
                .netSalary(0)
                .totalWorkingDays(workingDays)
                .workedDays(0)
                .status(MonthlySalary.Status.RUNNING)
                .build();

        return monthlySalaryRepository.save(ms);
    }
}
