package com.VentureBiz.VenureBiz_Hr.controller;

import com.VentureBiz.VenureBiz_Hr.model.LeaveRequest;
import com.VentureBiz.VenureBiz_Hr.model.User;
import com.VentureBiz.VenureBiz_Hr.repository.LeaveRepository;
import com.VentureBiz.VenureBiz_Hr.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@RestController
@RequestMapping("/api/leave")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5174")
public class LeaveController {

    private final LeaveRepository leaveRepository;
    private final UserRepository userRepository;

    // ✅ Employee applies for leave
    @PostMapping("/apply")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public LeaveRequest applyLeave(@RequestBody LeaveRequest leaveRequest, @RequestParam String email) {
        User employee = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        long days = ChronoUnit.DAYS.between(leaveRequest.getStartDate(), leaveRequest.getEndDate()) + 1;
        if (days > 3) {
            throw new RuntimeException("Leave cannot be more than 3 days");
        }

        leaveRequest.setEmployee(employee);
        leaveRequest.setLeaveStatus(LeaveRequest.LeaveStatus.PENDING);
        leaveRequest.setDays(days);
        leaveRequest.setAppliedOn(LocalDate.now()); // ✅ LocalDate only

        return leaveRepository.save(leaveRequest);
    }

    // ✅ Employee views their leaves
    @GetMapping("/my")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public List<LeaveRequest> myLeaves(@RequestParam String email) {
        User employee = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return leaveRepository.findByEmployee(employee);
    }

    // ✅ Employee edits leave (only if pending)
    @PutMapping("/{id}/edit")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public LeaveRequest editLeave(@PathVariable Long id, @RequestBody LeaveRequest updatedLeave, @RequestParam String email) {
        LeaveRequest leave = leaveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave not found"));

        if (!leave.getEmployee().getEmail().equals(email)) {
            throw new RuntimeException("You can only edit your own leave");
        }
        if (leave.getLeaveStatus() != LeaveRequest.LeaveStatus.PENDING) {
            throw new RuntimeException("Only pending leaves can be edited");
        }

        long days = ChronoUnit.DAYS.between(updatedLeave.getStartDate(), updatedLeave.getEndDate()) + 1;
        if (days > 3) {
            throw new RuntimeException("Leave cannot be more than 3 days");
        }

        leave.setLeaveType(updatedLeave.getLeaveType());
        leave.setStartDate(updatedLeave.getStartDate());
        leave.setEndDate(updatedLeave.getEndDate());
        leave.setDays(days);
        leave.setReason(updatedLeave.getReason());

        return leaveRepository.save(leave);
    }

    // ✅ Employee deletes leave (only if pending)
    @DeleteMapping("/{id}/delete")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public String deleteLeave(@PathVariable Long id, @RequestParam String email) {
        LeaveRequest leave = leaveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave not found"));

        if (!leave.getEmployee().getEmail().equals(email)) {
            throw new RuntimeException("You can only delete your own leave");
        }
        if (leave.getLeaveStatus() != LeaveRequest.LeaveStatus.PENDING) {
            throw new RuntimeException("Only pending leaves can be deleted");
        }

        leaveRepository.delete(leave);
        return "Leave deleted successfully";
    }

    // ✅ HR views all leaves
    @GetMapping("/all")
    @PreAuthorize("hasRole('HR')")
    public List<LeaveRequest> allLeaves() {
        return leaveRepository.findAll();
    }

//    // ✅ HR updates leave status (approve/reject)
//    @PutMapping("/{id}/status")
//    @PreAuthorize("hasRole('HR')")
//    public LeaveRequest updateLeaveStatus(@PathVariable Long id, @RequestParam LeaveRequest.LeaveStatus leaveStatus) {
//        LeaveRequest leave = leaveRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Leave not found"));
//
//        // Optional: track who changed status and when
//        leave.setLeaveStatus(leaveStatus);
//  //      leave.setApprovedByHr("HR_EMAIL_OR_PRINCIPAL"); // Optional, get from logged-in HR
// //       leave.setApprovedOn(LocalDate.now());           // Optional timestamp
//
//        return leaveRepository.save(leave);
//    }
    
    
    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('HR')")
    public LeaveRequest updateLeaveStatus(@PathVariable Long id,
                                          @RequestParam LeaveRequest.LeaveStatus leaveStatus) {
        LeaveRequest leave = leaveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave not found"));

        // ✅ Allow status change anytime
        leave.setLeaveStatus(leaveStatus);

        // Track who updated and when
        String hrEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        leave.setApprovedByHr(hrEmail);
        leave.setApprovedOn(LocalDate.now());

        return leaveRepository.save(leave);
    }

}
//
//
//package com.VentureBiz.VenureBiz_Hr.controller;
//
//import com.VentureBiz.VenureBiz_Hr.model.LeaveRequest;
//import com.VentureBiz.VenureBiz_Hr.model.User;
//import com.VentureBiz.VenureBiz_Hr.repository.LeaveRepository;
//import com.VentureBiz.VenureBiz_Hr.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.*;
//import java.time.LocalDate;
//import java.time.temporal.ChronoUnit;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/leave")
//@RequiredArgsConstructor
//@CrossOrigin(origins = "http://localhost:5174")
//public class LeaveController {
//
//    private final LeaveRepository leaveRepository;
//    private final UserRepository userRepository;
//
//    // APPLY LEAVE
//    @PostMapping("/apply")
//    @PreAuthorize("hasRole('EMPLOYEE')")
//    public LeaveRequest applyLeave(@RequestBody LeaveRequest leaveRequest, @RequestParam String email) {
//        User employee = userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        LocalDate start = leaveRequest.getStartDate();
//        LocalDate end = leaveRequest.getEndDate();
//        LocalDate today = LocalDate.now();
//
//        // Must be today or future
//        if (start.isBefore(today)) {
//            throw new RuntimeException("Start date cannot be in the past");
//        }
//
//        long days = ChronoUnit.DAYS.between(start, end) + 1;
//        if (days > 3) {
//            throw new RuntimeException("Leave cannot exceed 3 days");
//        }
//
//        // SICK LEAVE: Only 1 per current month
//        if (leaveRequest.getLeaveType() == LeaveRequest.LeaveType.SICK) {
//            validateSickLeaveLimit(employee, start, end, null);
//        }
//
//        leaveRequest.setEmployee(employee);
//        leaveRequest.setLeaveStatus(LeaveRequest.LeaveStatus.PENDING);
//        leaveRequest.setDays(days);
//        leaveRequest.setAppliedOn(LocalDate.now());
//
//        return leaveRepository.save(leaveRequest);
//    }
//
//    // EDIT LEAVE (PENDING only)
//    @PutMapping("/{id}/edit")
//    @PreAuthorize("hasRole('EMPLOYEE')")
//    public LeaveRequest editLeave(@PathVariable Long id, @RequestBody LeaveRequest updatedLeave, @RequestParam String email) {
//        LeaveRequest leave = leaveRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Leave not found"));
//
//        if (!leave.getEmployee().getEmail().equals(email)) {
//            throw new RuntimeException("You can only edit your own leave");
//        }
//        if (leave.getLeaveStatus() != LeaveRequest.LeaveStatus.PENDING) {
//            throw new RuntimeException("Only pending leaves can be edited");
//        }
//
//        LocalDate start = updatedLeave.getStartDate();
//        LocalDate end = updatedLeave.getEndDate();
//        LocalDate today = LocalDate.now();
//
//        if (start.isBefore(today)) {
//            throw new RuntimeException("Start date cannot be in the past");
//        }
//
//        long days = ChronoUnit.DAYS.between(start, end) + 1;
//        if (days > 3) {
//            throw new RuntimeException("Leave cannot exceed 3 days");
//        }
//
//        // Re-validate sick leave if type is SICK or was SICK
//        if (updatedLeave.getLeaveType() == LeaveRequest.LeaveType.SICK) {
//            validateSickLeaveLimit(leave.getEmployee(), start, end, leave.getId());
//        }
//
//        leave.setLeaveType(updatedLeave.getLeaveType());
//        leave.setStartDate(start);
//        leave.setEndDate(end);
//        leave.setDays(days);
//        leave.setReason(updatedLeave.getReason());
//
//        return leaveRepository.save(leave);
//    }
//
//    // DELETE LEAVE (PENDING only)
//    @DeleteMapping("/{id}/delete")
//    @PreAuthorize("hasRole('EMPLOYEE')")
//    public String deleteLeave(@PathVariable Long id, @RequestParam String email) {
//        LeaveRequest leave = leaveRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Leave not found"));
//
//        if (!leave.getEmployee().getEmail().equals(email)) {
//            throw new RuntimeException("You can only delete your own leave");
//        }
//        if (leave.getLeaveStatus() != LeaveRequest.LeaveStatus.PENDING) {
//            throw new RuntimeException("Only pending leaves can be deleted");
//        }
//
//        leaveRepository.delete(leave);
//        return "Leave deleted successfully";
//    }
//
//    // MY LEAVES
//    @GetMapping("/my")
//    @PreAuthorize("hasRole('EMPLOYEE')")
//    public List<LeaveRequest> myLeaves(@RequestParam String email) {
//        User employee = userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//        return leaveRepository.findByEmployee(employee);
//    }
//
//    // ALL LEAVES (HR)
//    @GetMapping("/all")
//    @PreAuthorize("hasRole('HR')")
//    public List<LeaveRequest> allLeaves() {
//        return leaveRepository.findAll();
//    }
//
//    // UPDATE STATUS (HR)
//    @PutMapping("/{id}/status")
//    @PreAuthorize("hasRole('HR')")
//    public LeaveRequest updateLeaveStatus(@PathVariable Long id, @RequestParam LeaveRequest.LeaveStatus leaveStatus) {
//        LeaveRequest leave = leaveRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Leave not found"));
//
//        leave.setLeaveStatus(leaveStatus);
//        String hrEmail = SecurityContextHolder.getContext().getAuthentication().getName();
//        leave.setApprovedByHr(hrEmail);
//        leave.setApprovedOn(LocalDate.now());
//
//        return leaveRepository.save(leave);
//    }
//
//    // HELPER: Validate 1 sick leave per month
//    private void validateSickLeaveLimit(User employee, LocalDate start, LocalDate end, Long excludeId) {
//        LocalDate today = LocalDate.now();
//        int currentMonth = today.getMonthValue();
//        int currentYear = today.getYear();
//
//        long count = leaveRepository.findByEmployee(employee).stream()
//                .filter(l -> l.getLeaveType() == LeaveRequest.LeaveType.SICK)
//                .filter(l -> l.getLeaveStatus() == LeaveRequest.LeaveStatus.APPROVED ||
//                             l.getLeaveStatus() == LeaveRequest.LeaveStatus.PENDING)
//                .filter(l -> excludeId == null || !l.getId().equals(excludeId))
//                .filter(l -> {
//                    LocalDate lStart = l.getStartDate();
//                    LocalDate lEnd = l.getEndDate();
//                    LocalDate monthStart = today.withDayOfMonth(1);
//                    LocalDate monthEnd = today.withDayOfMonth(today.lengthOfMonth());
//                    return !(lStart.isAfter(monthEnd) || lEnd.isBefore(monthStart));
//                })
//                .count();
//
//        if (count > 0) {
//            throw new RuntimeException("Only one sick leave is allowed per month. You already have one.");
//        }
//    }
//}
