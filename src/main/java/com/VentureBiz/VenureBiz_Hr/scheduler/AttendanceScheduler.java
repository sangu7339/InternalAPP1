//////package com.VentureBiz.VenureBiz_Hr.scheduler;
//////
//////
//////import com.VentureBiz.VenureBiz_Hr.model.Attendance;
//////import com.VentureBiz.VenureBiz_Hr.model.User;
//////import com.VentureBiz.VenureBiz_Hr.repository.AttendanceRepository;
//////import com.VentureBiz.VenureBiz_Hr.repository.UserRepository;
//////import lombok.RequiredArgsConstructor;
//////import org.springframework.scheduling.annotation.Scheduled;
//////import org.springframework.stereotype.Service;
//////
//////import java.time.*;
//////import java.util.*;
//////
//////@Service
//////@RequiredArgsConstructor
//////public class AttendanceScheduler {
//////
//////    private final AttendanceRepository attendanceRepository;
//////    private final UserRepository userRepository;
//////
//////    /**
//////     * Runs every day at 10 PM to auto-update attendance
//////     */
//////    @Scheduled(cron = "0 0 22 * * *")
//////    public void markAbsenteesAndHalfDay() {
//////        LocalDate today = LocalDate.now();
//////        DayOfWeek day = today.getDayOfWeek();
//////
//////        // Skip weekends
//////        if (day == DayOfWeek.SATURDAY || day == DayOfWeek.SUNDAY) return;
//////
//////        List<User> users = userRepository.findAll();
//////
//////        for (User user : users) {
//////            Optional<Attendance> optionalAttendance = attendanceRepository.findByUserAndDate(user, today);
//////
//////            if (optionalAttendance.isEmpty()) {
//////                // No check-in → mark ABSENT
//////                Attendance absent = new Attendance();
//////                absent.setUser(user);
//////                absent.setDate(today);
//////                absent.setStatus("ABSENT");
//////                attendanceRepository.save(absent);
//////            } else {
//////                Attendance attendance = optionalAttendance.get();
//////                if (attendance.getCheckOutTime() == null && "PENDING".equals(attendance.getStatus())) {
//////                    // Checked in but no checkout → mark HALF_DAY
//////                    attendance.setStatus("HALF_DAY");
//////                    attendanceRepository.save(attendance);
//////                }
//////            }
//////        }
//////
//////        System.out.println("✅ Auto attendance update completed for " + today);
//////    }
//////}
////package com.VentureBiz.VenureBiz_Hr.scheduler;
////
////import com.VentureBiz.VenureBiz_Hr.model.Attendance;
////import com.VentureBiz.VenureBiz_Hr.model.User;
////import com.VentureBiz.VenureBiz_Hr.repository.AttendanceRepository;
////import com.VentureBiz.VenureBiz_Hr.repository.UserRepository;
////import lombok.RequiredArgsConstructor;
////import org.springframework.scheduling.annotation.Scheduled;
////import org.springframework.stereotype.Service;
////
////import java.time.*;
////import java.util.*;
////
////@Service
////@RequiredArgsConstructor
////public class AttendanceScheduler {
////
////    private final AttendanceRepository attendanceRepository;
////    private final UserRepository userRepository;
////
////    // 🔄 Every day at 6:35 PM — auto checkout
////    @Scheduled(cron = "0 35 18 * * *")
////    public void autoCheckout() {
////        try {
////            LocalDate today = LocalDate.now();
////            DayOfWeek day = today.getDayOfWeek();
////            if (day == DayOfWeek.SATURDAY || day == DayOfWeek.SUNDAY) return;
////
////            List<Attendance> list = attendanceRepository.findByDate(today);
////            for (Attendance att : list) {
////                if (att.getCheckOutTime() == null && att.getCheckInTime() != null) {
////                    att.setCheckOutTime(LocalTime.of(18, 30));
////                    att.setStatus("PRESENT");
////                    attendanceRepository.save(att);
////                }
////            }
////            System.out.println("✅ Auto check-out completed for " + today);
////
////        } catch (Exception e) {
////            System.err.println("❌ Error in autoCheckout scheduler: " + e.getMessage());
////            e.printStackTrace();
////        }
////    }
////
////    // 🔄 Every night at 10 PM — mark absentees
////    @Scheduled(cron = "0 0 22 * * *")
////    public void markAbsentees() {
////        try {
////            LocalDate today = LocalDate.now();
////            if (today.getDayOfWeek() == DayOfWeek.SATURDAY || today.getDayOfWeek() == DayOfWeek.SUNDAY) return;
////
////            List<User> users = userRepository.findAll();
////
////            for (User user : users) {
////                Optional<Attendance> optional = attendanceRepository.findByUserAndDate(user, today);
////                if (optional.isEmpty()) {
////                    Attendance absent = new Attendance();
////                    absent.setUser(user);
////                    absent.setDate(today);
////                    absent.setStatus("ABSENT");
////                    attendanceRepository.save(absent);
////                }
////            }
////            System.out.println("✅ Auto absentee marking completed for " + today);
////
////        } catch (Exception e) {
////            System.err.println("❌ Error in markAbsentees scheduler: " + e.getMessage());
////            e.printStackTrace();
////        }
////    }
////}
////
//package com.VentureBiz.VenureBiz_Hr.scheduler;
//
//import com.VentureBiz.VenureBiz_Hr.model.Attendance;
//import com.VentureBiz.VenureBiz_Hr.model.User;
//import com.VentureBiz.VenureBiz_Hr.repository.AttendanceRepository;
//import com.VentureBiz.VenureBiz_Hr.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Service;
//
//import java.time.*;
//import java.time.temporal.ChronoUnit;
//import java.util.*;
//
//@Service
//@RequiredArgsConstructor
//public class AttendanceScheduler {
//
//    private final AttendanceRepository attendanceRepository;
//    private final UserRepository userRepository;
//
//    private static final LocalTime AUTO_CHECKOUT_TIME = LocalTime.of(18, 30);
//    private static final LocalTime CHECKIN_ON_TIME = LocalTime.of(9, 50);
//
//    // 🔄 Every day at 6:35 PM — Auto Checkout
//    @Scheduled(cron = "0 35 18 * * *")
//    public void autoCheckout() {
//        try {
//            LocalDate today = LocalDate.now();
//            if (today.getDayOfWeek() == DayOfWeek.SATURDAY || today.getDayOfWeek() == DayOfWeek.SUNDAY) return;
//
//            List<Attendance> list = attendanceRepository.findByDate(today);
//
//            for (Attendance att : list) {
//                if (att.getCheckInTime() != null && att.getCheckOutTime() == null) {
//                    att.setCheckOutTime(AUTO_CHECKOUT_TIME);
//                    att.setStatus(determineFinalStatus(att.getCheckInTime(), AUTO_CHECKOUT_TIME));
//                    attendanceRepository.save(att);
//                }
//            }
//
//            System.out.println("✅ Auto check-out completed successfully for " + today);
//        } catch (Exception e) {
//            System.err.println("❌ Error in autoCheckout scheduler: " + e.getMessage());
//            e.printStackTrace();
//        }
//    }
//

//    // 🔄 Every night at 10 PM — Mark Absentees
//    @Scheduled(cron = "0 0 22 * * *")
//    public void markAbsentees() {
//        try {
//            LocalDate today = LocalDate.now();
//            if (today.getDayOfWeek() == DayOfWeek.SATURDAY || today.getDayOfWeek() == DayOfWeek.SUNDAY) return;
//
//            List<User> users = userRepository.findAll();
//
//            for (User user : users) {
//                Optional<Attendance> optional = attendanceRepository.findByUserAndDate(user, today);
//                if (optional.isEmpty()) {
//                    Attendance absent = new Attendance();
//                    absent.setUser(user);
//                    absent.setDate(today);
//                    absent.setStatus("ABSENT");
//                    attendanceRepository.save(absent);
//                }
//            }
//
//            System.out.println("✅ Auto absentee marking completed for " + today);
//        } catch (Exception e) {
//            System.err.println("❌ Error in markAbsentees scheduler: " + e.getMessage());
//            e.printStackTrace();
//        }
//    }
//
//    // ✅ Use same attendance rules for consistency
//    private String determineFinalStatus(LocalTime checkIn, LocalTime checkOut) {
//        if (checkIn == null || checkOut == null) return "ABSENT";
//
//        long workedMinutes = ChronoUnit.MINUTES.between(checkIn, checkOut);
//        double workedHours = workedMinutes / 60.0;
//
//        // 1. If checked in before 9:50 AM and worked > 8 hours → Present
//        if (checkIn.isBefore(CHECKIN_ON_TIME) && workedHours > 8) return "PRESENT";
//
//        // 2. If checked in before 9:50 AM and worked > 3 hours → Half Day
//        if (checkIn.isBefore(CHECKIN_ON_TIME) && workedHours > 3) return "HALF_DAY";
//
//        // 3. If checked in before 2:00 PM and worked > 4 hours → Half Day
//        if (checkIn.isBefore(LocalTime.of(14, 0)) && workedHours > 4) return "HALF_DAY";
//
//        // 4. Otherwise mark as Absent
//        return "ABSENT";
//    }
//}
//
package com.VentureBiz.VenureBiz_Hr.scheduler;

import com.VentureBiz.VenureBiz_Hr.model.Attendance;
import com.VentureBiz.VenureBiz_Hr.model.User;
import com.VentureBiz.VenureBiz_Hr.repository.AttendanceRepository;
import com.VentureBiz.VenureBiz_Hr.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.*;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AttendanceScheduler {

    private final AttendanceRepository attendanceRepository;
    private final UserRepository userRepository;

    private static final LocalTime AUTO_CHECKOUT_TIME = LocalTime.of(18, 30);
    private static final LocalTime CHECKIN_ON_TIME = LocalTime.of(9, 50);
    private static final LocalTime HALF_DAY_LIMIT = LocalTime.of(14, 0);

    // 🔁 Auto Checkout (6:30 PM)
    @Scheduled(cron = "0 30 18 * * *")
    public void autoCheckout() {
        LocalDate today = LocalDate.now();
        if (isWeekend(today)) return;

        try {
            List<Attendance> list = attendanceRepository.findByDate(today);
            for (Attendance att : list) {
                if (att.getCheckInTime() != null && att.getCheckOutTime() == null) {
                    att.setCheckOutTime(AUTO_CHECKOUT_TIME);
                    att.setStatus(determineFinalStatus(att.getCheckInTime(), AUTO_CHECKOUT_TIME));
                    attendanceRepository.save(att);
                }
            }
            System.out.println(" Auto checkout completed for " + today);
        } catch (Exception e) {
            System.err.println(" AutoCheckout failed: " + e.getMessage());
        }
    }

    // 🔁 Mark Absentees (10:00 PM)
    @Scheduled(cron = "0 0 22 * * *")
    public void markAbsentees() {
        LocalDate today = LocalDate.now();
        if (isWeekend(today)) return;

        try {
            List<User> users = userRepository.findAll();

            for (User user : users) {
                if (attendanceRepository.findByUserAndDate(user, today).isEmpty()) {
                    Attendance absent = new Attendance();
                    absent.setUser(user);
                    absent.setDate(today);
                    absent.setStatus("ABSENT");
                    attendanceRepository.save(absent);
                }
            }
            System.out.println(" Absentee marking completed for " + today);
        } catch (Exception e) {
            System.err.println(" MarkAbsentees failed: " + e.getMessage());
        }
    }

    // --- Helper Methods ---
    private boolean isWeekend(LocalDate date) {
        return date.getDayOfWeek() == DayOfWeek.SATURDAY || date.getDayOfWeek() == DayOfWeek.SUNDAY;
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
}
