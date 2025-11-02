package com.VentureBiz.VenureBiz_Hr.controller;

import java.time.YearMonth;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.VentureBiz.VenureBiz_Hr.model.Bonus;
import com.VentureBiz.VenureBiz_Hr.model.Employee;
import com.VentureBiz.VenureBiz_Hr.repository.BonusRepository;
import com.VentureBiz.VenureBiz_Hr.repository.EmployeeRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5174")
public class BonusController {

    @Autowired
    private BonusRepository bonusRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    // ============================
    // 🔹 HR Endpoints
    // ============================

    /** ✅ Add Bonus (HR only) */
    @PreAuthorize("hasRole('HR')")
    @PostMapping("/api/hr/bonus/add/{employeeId}")
    public Bonus addBonus(@PathVariable String employeeId, @RequestBody Bonus bonus) {
        Employee employee = employeeRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + employeeId));
        bonus.setEmployee(employee);
        return bonusRepository.save(bonus);
    }

    /** ✅ Update Bonus (HR only) */
    @PreAuthorize("hasRole('HR')")
    @PutMapping("/api/hr/bonus/update/{bonusId}")
    public Bonus updateBonus(@PathVariable Long bonusId, @RequestBody Bonus updatedBonus) {
        Bonus existingBonus = bonusRepository.findById(bonusId)
                .orElseThrow(() -> new RuntimeException("Bonus not found"));

        if (updatedBonus.getIncentives() != 0) {
            existingBonus.setIncentives(updatedBonus.getIncentives());
        }
        if (updatedBonus.getStartDate() != null) {
            existingBonus.setStartDate(updatedBonus.getStartDate());
        }
        if (updatedBonus.getMonth() != null) {
            existingBonus.setMonth(updatedBonus.getMonth());
        }

        return bonusRepository.save(existingBonus);
    }

    /** ✅ Delete Bonus (HR only) */
    @PreAuthorize("hasRole('HR')")
    @DeleteMapping("/api/hr/bonus/delete/{bonusId}")
    public String deleteBonus(@PathVariable Long bonusId) {
        if (!bonusRepository.existsById(bonusId)) {
            throw new RuntimeException("Bonus not found");
        }
        bonusRepository.deleteById(bonusId);
        return "Bonus deleted successfully!";
    }

    /** ✅ Fetch all Bonuses (HR only) */
    @PreAuthorize("hasRole('HR')")
    @GetMapping("/api/hr/bonus/all")
    public List<Bonus> getAllBonuses() {
        return bonusRepository.findAll();
    }

    /** ✅ Fetch by Month-Year (HR only) */
    @PreAuthorize("hasRole('HR')")
    @GetMapping("/api/hr/bonus/month")
    public List<Bonus> getBonusesByMonth(@RequestParam String monthYear) {
        YearMonth ym = YearMonth.parse(monthYear);
        return bonusRepository.findAll().stream()
                .filter(b -> ym.equals(b.getMonth()))
                .toList();
    }

    // ============================
    // 🔹 Employee Endpoints
    // ============================

    /** ✅ Employee: View their own bonuses */
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('HR')")
    @GetMapping("/api/employee/bonus/{employeeId}")
    public List<Bonus> getBonusesByEmployee(@PathVariable String employeeId) {
        Employee employee = employeeRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + employeeId));
        return bonusRepository.findByEmployee(employee);
    }

    /** ✅ Employee: View their own bonuses for a specific month */
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('HR')")
    @GetMapping("/api/employee/bonus/month/{employeeId}")
    public List<Bonus> getEmployeeBonusesByMonth(
            @PathVariable String employeeId,
            @RequestParam String monthYear) {

        YearMonth ym = YearMonth.parse(monthYear);
        Employee employee = employeeRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + employeeId));

        return bonusRepository.findByEmployee(employee).stream()
                .filter(b -> ym.equals(b.getMonth()))
                .toList();
    }
}
