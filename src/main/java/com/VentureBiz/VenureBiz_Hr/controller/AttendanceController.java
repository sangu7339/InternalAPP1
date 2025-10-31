package com.VentureBiz.VenureBiz_Hr.controller;

//package com.VentureBiz.VenureBiz_Hr.controller;
//
//import com.VentureBiz.VenureBiz_Hr.model.Attendance;
//import com.VentureBiz.VenureBiz_Hr.model.User;
//import com.VentureBiz.VenureBiz_Hr.repository.AttendanceRepository;
//import com.VentureBiz.VenureBiz_Hr.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.*;
//
//import java.time.*;
//import java.util.*;
//
//@CrossOrigin(origins = "http://localhost:5174")
//@RestController
//@RequestMapping("/api/attendance")
//@RequiredArgsConstructor
//public class AttendanceController {
//
//    private final AttendanceRepository attendanceRepository;
//    private final UserRepository userRepository;
//
//    // --- TIME RULES ---
//    private static final LocalTime CHECKIN_ON_TIME = LocalTime.of(9, 50);
//    private static final LocalTime LATE_LIMIT = LocalTime.of(11, 0);
//    private static final LocalTime HALF_DAY_LIMIT = LocalTime.of(12, 0);
//    private static final LocalTime ABSENT_LIMIT = LocalTime.of(14, 0);
//    private static final LocalTime CHECKOUT_FULL_DAY = LocalTime.of(18, 0);
//
//    // =================== EMPLOYEE OPERATIONS ===================
//
//    @PostMapping("/checkin")
//    @PreAuthorize("hasRole('EMPLOYEE')")
//    public String checkIn(@RequestParam String email) {
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("User not found: " + email));
//
//        LocalDate today = LocalDate.now();
//        DayOfWeek day = today.getDayOfWeek();
//        if (day == DayOfWeek.SATURDAY || day == DayOfWeek.SUNDAY)
//            return "You cannot check in on weekends!";
//
//        Optional<Attendance> existing = attendanceRepository.findByUserAndDate(user, today);
//        if (existing.isPresent()) return "Already checked in today!";
//
//        LocalTime now = LocalTime.now();
//        Attendance attendance = new Attendance();
//        attendance.setUser(user);
//        attendance.setDate(today);
//        attendance.setCheckInTime(now);
//        attendance.setStatus("PENDING");
//        attendanceRepository.save(attendance);
//
//        return "Checked in successfully at " + now;
//    }
//
//    @PostMapping("/checkout")
//    @PreAuthorize("hasRole('EMPLOYEE')")
//    public String checkOut(@RequestParam String email) {
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("User not found: " + email));
//
//        LocalDate today = LocalDate.now();
//        Attendance attendance = attendanceRepository.findByUserAndDate(user, today)
//                .orElseThrow(() -> new RuntimeException("No check-in record found!"));
//
//        if (attendance.getCheckOutTime() != null) return "Already checked out!";
//
//        LocalTime checkIn = attendance.getCheckInTime();
//        LocalTime checkOut = LocalTime.now();
//        attendance.setCheckOutTime(checkOut);
//        attendance.setStatus(determineFinalStatus(checkIn, checkOut));
//        attendanceRepository.save(attendance);
//
//        return "Checked out at " + checkOut + " (" + attendance.getStatus() + ")";
//    }
//
//    private String determineFinalStatus(LocalTime checkIn, LocalTime checkOut) {
//        if (checkIn == null) return "ABSENT";
//        if (checkIn.isAfter(ABSENT_LIMIT)) return "ABSENT";
//        if (checkOut.isBefore(CHECKOUT_FULL_DAY)) return "HALF_DAY";
//        if (checkIn.isAfter(HALF_DAY_LIMIT) && checkIn.isBefore(ABSENT_LIMIT)) return "HALF_DAY";
//        if (checkIn.isAfter(CHECKIN_ON_TIME) && checkIn.isBefore(LATE_LIMIT)) return "LATE";
//        if (checkIn.isBefore(CHECKIN_ON_TIME) || checkIn.equals(CHECKIN_ON_TIME)) return "PRESENT";
//        return "PENDING";
//    }
//
//    @GetMapping("/my")
//    @PreAuthorize("hasRole('EMPLOYEE')")
//    public List<Attendance> getMyAttendance(@RequestParam String email) {
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("User not found: " + email));
//        return attendanceRepository.findByUser(user);
//    }
//
//    @GetMapping("/my/month")
//    @PreAuthorize("hasRole('EMPLOYEE')")
//    public List<Attendance> getMyAttendanceByMonth(
//            @RequestParam String email,
//            @RequestParam int year,
//            @RequestParam int month) {
//
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("User not found: " + email));
//        return attendanceRepository.findByUserAndMonth(user, year, month);
//    }
//
//    @GetMapping("/my/month/summary")
//    @PreAuthorize("hasRole('EMPLOYEE')")
//    public Map<String, Long> getMyMonthlyAttendanceSummary(
//            @RequestParam String email,
//            @RequestParam int year,
//            @RequestParam int month) {
//
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("User not found: " + email));
//
//        List<Attendance> attendanceList = attendanceRepository.findByUserAndMonth(user, year, month);
//
//        // Skip weekends
//        attendanceList.removeIf(a -> a.getDate().getDayOfWeek() == DayOfWeek.SATURDAY
//                || a.getDate().getDayOfWeek() == DayOfWeek.SUNDAY);
//
//        Map<String, Long> summary = new HashMap<>();
//        summary.put("PRESENT", attendanceList.stream().filter(a -> "PRESENT".equals(a.getStatus())).count());
//        summary.put("LATE", attendanceList.stream().filter(a -> "LATE".equals(a.getStatus())).count());
//        summary.put("HALF_DAY", attendanceList.stream().filter(a -> "HALF_DAY".equals(a.getStatus())).count());
//        summary.put("ABSENT", attendanceList.stream().filter(a -> "ABSENT".equals(a.getStatus())).count());
//        summary.put("PENDING", attendanceList.stream().filter(a -> "PENDING".equals(a.getStatus())).count());
//
//        return summary;
//    }
//
//    // =================== HR OPERATIONS ===================
//
//    @GetMapping("/all")
//    @PreAuthorize("hasRole('HR')")
//    public List<Attendance> getAllAttendance() {
//        return attendanceRepository.findAll();
//    }
//
//    @GetMapping("/all/month")
//    @PreAuthorize("hasRole('HR')")
//    public List<Attendance> getAllByMonth(@RequestParam int year, @RequestParam int month) {
//        List<Attendance> list = attendanceRepository.findByMonth(year, month);
//
//        // Skip weekends
//        list.removeIf(a -> a.getDate().getDayOfWeek() == DayOfWeek.SATURDAY
//                || a.getDate().getDayOfWeek() == DayOfWeek.SUNDAY);
//
//        return list;
//    }
//
//    @PutMapping("/{id}/edit")
//    @PreAuthorize("hasRole('HR')")
//    public Attendance editAttendance(@PathVariable Long id, @RequestBody Attendance updated) {
//        Attendance existing = attendanceRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Attendance not found!"));
//
//        existing.setStatus(updated.getStatus());
//        existing.setCheckInTime(updated.getCheckInTime());
//        existing.setCheckOutTime(updated.getCheckOutTime());
//        existing.setReason(updated.getReason());
//
//        return attendanceRepository.save(existing);
//    }
//
//    @DeleteMapping("/{id}")
//    @PreAuthorize("hasRole('HR')")
//    public String deleteAttendance(@PathVariable Long id) {
//        attendanceRepository.deleteById(id);
//        return "Attendance record deleted successfully.";
//    }
//
//    @GetMapping("/hr/summary")
//    @PreAuthorize("hasRole('HR')")
//    public Map<String, Long> getEmployeeMonthlyAttendanceSummary(
//            @RequestParam String email,
//            @RequestParam int year,
//            @RequestParam int month) {
//
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("User not found: " + email));
//
//        List<Attendance> attendanceList = attendanceRepository.findByUserAndMonth(user, year, month);
//
//        // Skip weekends
//        attendanceList.removeIf(a -> a.getDate().getDayOfWeek() == DayOfWeek.SATURDAY
//                || a.getDate().getDayOfWeek() == DayOfWeek.SUNDAY);
//
//        Map<String, Long> summary = new HashMap<>();
//        summary.put("PRESENT", attendanceList.stream().filter(a -> "PRESENT".equals(a.getStatus())).count());
//        summary.put("LATE", attendanceList.stream().filter(a -> "LATE".equals(a.getStatus())).count());
//        summary.put("HALF_DAY", attendanceList.stream().filter(a -> "HALF_DAY".equals(a.getStatus())).count());
//        summary.put("ABSENT", attendanceList.stream().filter(a -> "ABSENT".equals(a.getStatus())).count());
//        summary.put("PENDING", attendanceList.stream().filter(a -> "PENDING".equals(a.getStatus())).count());
//
//        return summary;
//    }
//
//    @GetMapping("/hr/summary/all")
//    @PreAuthorize("hasRole('HR')")
//    public Map<String, Map<String, Long>> getAllEmployeesMonthlyAttendanceSummary(
//            @RequestParam int year,
//            @RequestParam int month) {
//
//        List<User> allUsers = userRepository.findAll();
//        Map<String, Map<String, Long>> report = new HashMap<>();
//
//        for (User user : allUsers) {
//            List<Attendance> attendanceList = attendanceRepository.findByUserAndMonth(user, year, month);
//
//            // Skip weekends
//            attendanceList.removeIf(a -> a.getDate().getDayOfWeek() == DayOfWeek.SATURDAY
//                    || a.getDate().getDayOfWeek() == DayOfWeek.SUNDAY);
//
//            Map<String, Long> summary = new HashMap<>();
//            summary.put("PRESENT", attendanceList.stream().filter(a -> "PRESENT".equals(a.getStatus())).count());
//            summary.put("LATE", attendanceList.stream().filter(a -> "LATE".equals(a.getStatus())).count());
//            summary.put("HALF_DAY", attendanceList.stream().filter(a -> "HALF_DAY".equals(a.getStatus())).count());
//            summary.put("ABSENT", attendanceList.stream().filter(a -> "ABSENT".equals(a.getStatus())).count());
//            summary.put("PENDING", attendanceList.stream().filter(a -> "PENDING".equals(a.getStatus())).count());
//
//            report.put(user.getEmail(), summary);
//        }
//
//        return report;
//    }
//}package com.VentureBiz.VenureBiz_Hr.controller;

import com.VentureBiz.VenureBiz_Hr.repository.LeaveRepository;
import com.VentureBiz.VenureBiz_Hr.repository.HolidayRepository;
import com.VentureBiz.VenureBiz_Hr.model.LeaveRequest;
import com.VentureBiz.VenureBiz_Hr.model.Holiday;

import com.VentureBiz.VenureBiz_Hr.model.Attendance;
import com.VentureBiz.VenureBiz_Hr.model.User;
import com.VentureBiz.VenureBiz_Hr.repository.AttendanceRepository;
import com.VentureBiz.VenureBiz_Hr.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.*;
import java.time.temporal.ChronoUnit;
import java.util.*;

@CrossOrigin(origins = "http://localhost:5174")
@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceRepository attendanceRepository;
    private final UserRepository userRepository;
    private final LeaveRepository leaveRepository;      // ✅ Add this
    private final HolidayRepository holidayRepository;
    // --- TIME RULES ---
    private static final LocalTime EARLIEST_CHECKIN = LocalTime.of(9, 0);
    private static final LocalTime LATEST_CHECKOUT = LocalTime.of(18, 0);
    private static final LocalTime CHECKIN_ON_TIME = LocalTime.of(9, 50);
    private static final LocalTime HALF_DAY_LIMIT = LocalTime.of(14, 0);

    // ====================== EMPLOYEE ENDPOINTS ======================

//    @PostMapping("/checkin")
//    @PreAuthorize("hasRole('EMPLOYEE')")
//    public String checkIn(@RequestParam String email) {
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("User not found: " + email));
//
//        LocalDate today = LocalDate.now();
//        if (isWeekend(today)) return "❌ You cannot check in on weekends!";
//
//        Optional<Attendance> existing = attendanceRepository.findByUserAndDate(user, today);
//        if (existing.isPresent()) return "⚠️ Already checked in today!";
//
//        LocalTime now = LocalTime.now();
//        if (now.isBefore(EARLIEST_CHECKIN)) return "❌ You cannot check in before 9:00 AM!";
//        if (now.isAfter(LATEST_CHECKOUT)) return "❌ You cannot check in after 6:00 PM!";
//
//        Attendance attendance = new Attendance();
//        attendance.setUser(user);
//        attendance.setDate(today);
//        attendance.setCheckInTime(now);
//        attendance.setStatus("PENDING");
//        attendanceRepository.save(attendance);
//
//        return "✅ Checked in successfully at " + now;
//    }

    
    @PostMapping("/checkin")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public String checkIn(@RequestParam String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));

        LocalDate today = LocalDate.now();

        if (isWeekend(today)) return "❌ You cannot check in on weekends!";

        // ✅ Block if it's a holiday
        if (isHoliday(today)) return "❌ Today is a holiday. Check-in not allowed!";

        // ✅ Block if user has approved leave today
        if (hasApprovedLeave(user, today))
            return "❌ You are on approved leave today. Check-in not allowed!";

        Optional<Attendance> existing = attendanceRepository.findByUserAndDate(user, today);
        if (existing.isPresent()) return "⚠️ Already checked in today!";

        LocalTime now = LocalTime.now();
        if (now.isBefore(EARLIEST_CHECKIN)) return "❌ You cannot check in before 9:00 AM!";
        if (now.isAfter(LATEST_CHECKOUT)) return "❌ You cannot check in after 6:00 PM!";

        Attendance attendance = new Attendance();
        attendance.setUser(user);
        attendance.setDate(today);
        attendance.setCheckInTime(now);
        attendance.setStatus("PENDING");
        attendanceRepository.save(attendance);

        return "✅ Checked in successfully at " + now;
    }

    @PostMapping("/checkout")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public String checkOut(@RequestParam String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));

        LocalDate today = LocalDate.now();

        if (isWeekend(today)) return "❌ You cannot check out on weekends!";
        if (isHoliday(today)) return "❌ Today is a holiday. Check-out not allowed!";
        if (hasApprovedLeave(user, today))
            return "❌ You are on approved leave today. Check-out not allowed!";

        Attendance attendance = attendanceRepository.findByUserAndDate(user, today)
                .orElseThrow(() -> new RuntimeException("⚠️ No check-in record found!"));

        if (attendance.getCheckOutTime() != null) return "⚠️ Already checked out!";

        LocalTime now = LocalTime.now();
        if (now.isBefore(EARLIEST_CHECKIN)) return "❌ You cannot check out before 9:00 AM!";
        if (now.isAfter(LATEST_CHECKOUT)) return "❌ You cannot check out after 6:00 PM!";

        attendance.setCheckOutTime(now);
        attendance.setStatus(determineFinalStatus(attendance.getCheckInTime(), now));
        attendanceRepository.save(attendance);

        return "✅ Checked out successfully at " + now + " (" + attendance.getStatus() + ")";
    }


    @GetMapping("/my")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public List<Attendance> getMyAttendance(@RequestParam String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));
        return attendanceRepository.findByUser(user);
    }

    @GetMapping("/my/month")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public List<Attendance> getMyAttendanceByMonth(
            @RequestParam String email,
            @RequestParam int year,
            @RequestParam int month) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));
        return attendanceRepository.findByUserAndMonth(user, year, month);
    }

    @GetMapping("/my/month/summary")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public Map<String, Long> getMyMonthlySummary(
            @RequestParam String email,
            @RequestParam int year,
            @RequestParam int month) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));

        List<Attendance> list = attendanceRepository.findByUserAndMonth(user, year, month);
        list.removeIf(a -> isWeekend(a.getDate()));

        return getSummary(list);
    }

    // ====================== HR ENDPOINTS ======================

    @GetMapping("/all")
    @PreAuthorize("hasRole('HR')")
    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    @GetMapping("/month")
    @PreAuthorize("hasRole('HR')")
    public List<Attendance> getAttendanceByMonth(@RequestParam int year, @RequestParam int month) {
        return attendanceRepository.findByMonth(year, month);
    }

    @GetMapping("/month/summary")
    @PreAuthorize("hasRole('HR')")
    public Map<String, Long> getMonthlySummary(@RequestParam int year, @RequestParam int month) {
        List<Attendance> list = attendanceRepository.findByMonth(year, month);
        list.removeIf(a -> isWeekend(a.getDate()));
        return getSummary(list);
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('HR')")
    public List<Attendance> getUserAttendance(@RequestParam String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));
        return attendanceRepository.findByUser(user);
    }

    @PutMapping("/{id}/edit")
    @PreAuthorize("hasRole('HR')")
    public Attendance editAttendance(@PathVariable Long id, @RequestBody Attendance updated) {
        Attendance existing = attendanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendance record not found!"));

        existing.setCheckInTime(updated.getCheckInTime());
        existing.setCheckOutTime(updated.getCheckOutTime());
        existing.setStatus(updated.getStatus());
        existing.setReason(updated.getReason());

        return attendanceRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('HR')")
    public String deleteAttendance(@PathVariable Long id) {
        attendanceRepository.deleteById(id);
        return "✅ Attendance record deleted successfully.";
    }

    // ====================== HELPER METHODS ======================

    private boolean isWeekend(LocalDate date) {
        DayOfWeek day = date.getDayOfWeek();
        return day == DayOfWeek.SATURDAY || day == DayOfWeek.SUNDAY;
    }

    private String determineFinalStatus(LocalTime checkIn, LocalTime checkOut) {
        if (checkIn == null || checkOut == null) return "ABSENT";

        long workedMinutes = ChronoUnit.MINUTES.between(checkIn, checkOut);
        double workedHours = workedMinutes / 60.0;

        if (checkIn.isBefore(CHECKIN_ON_TIME) && workedHours > 8) return "PRESENT";
        if (checkIn.isBefore(CHECKIN_ON_TIME) && workedHours > 3) return "HALF_DAY";
        if (checkIn.isBefore(HALF_DAY_LIMIT) && workedHours > 4) return "HALF_DAY";
        return "ABSENT";
    }

    private Map<String, Long> getSummary(List<Attendance> list) {
        Map<String, Long> summary = new HashMap<>();
        summary.put("PRESENT", list.stream().filter(a -> "PRESENT".equals(a.getStatus())).count());
        summary.put("HALF_DAY", list.stream().filter(a -> "HALF_DAY".equals(a.getStatus())).count());
        summary.put("ABSENT", list.stream().filter(a -> "ABSENT".equals(a.getStatus())).count());
        summary.put("PENDING", list.stream().filter(a -> "PENDING".equals(a.getStatus())).count());
        return summary;
    }
    private boolean isHoliday(LocalDate date) {
        return holidayRepository.findAll().stream()
                .anyMatch(h -> h.getDate().equals(date));
    }

    private boolean hasApprovedLeave(User user, LocalDate date) {
        return leaveRepository.findByEmployee(user).stream()
                .anyMatch(l ->
                        l.getLeaveStatus() == LeaveRequest.LeaveStatus.APPROVED &&
                        ( !date.isBefore(l.getStartDate()) && !date.isAfter(l.getEndDate()) )
                );
    }

}
