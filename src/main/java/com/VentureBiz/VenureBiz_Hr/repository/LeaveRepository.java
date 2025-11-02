////package com.VentureBiz.VenureBiz_Hr.repository;
////
////import com.VentureBiz.VenureBiz_Hr.model.LeaveRequest;
////import com.VentureBiz.VenureBiz_Hr.model.User;
////import org.springframework.data.jpa.repository.JpaRepository;
////import org.springframework.data.jpa.repository.Query;
////import org.springframework.data.repository.query.Param;
////
////import java.util.List;
////
////public interface LeaveRepository extends JpaRepository<LeaveRequest, Long> {
////
////    // Find all leaves by employee
////    List<LeaveRequest> findByEmployee(User employee);
////
////    // Count approved sick leaves for a user in a specific month
////    @Query("SELECT COUNT(l) FROM LeaveRequest l WHERE l.employee = :user " +
////            "AND l.leaveType = 'SICK' AND l.leaveStatus = 'APPROVED' " +
////            "AND YEAR(l.startDate) = :year AND MONTH(l.startDate) = :month")
////    long countApprovedSickLeaves(@Param("user") User user,
////                                 @Param("year") int year,
////                                 @Param("month") int month);
////}
//
//package com.VentureBiz.VenureBiz_Hr.repository;
//
//import com.VentureBiz.VenureBiz_Hr.model.LeaveRequest;
//import com.VentureBiz.VenureBiz_Hr.model.User;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//
//import java.util.List;
//
//public interface LeaveRepository extends JpaRepository<LeaveRequest, Long> {
//
//    List<LeaveRequest> findByEmployee(User employee);
//
//    @Query("SELECT COUNT(l) FROM LeaveRequest l WHERE l.employee = :user " +
//           "AND l.leaveType = 'SICK' AND l.leaveStatus = 'APPROVED' " +
//           "AND YEAR(l.startDate) = :year AND MONTH(l.startDate) = :month")
//    long countApprovedSickLeaves(@Param("user") User user,
//                                 @Param("year") int year,
//                                 @Param("month") int month);
//}
//
package com.VentureBiz.VenureBiz_Hr.repository;

import com.VentureBiz.VenureBiz_Hr.model.LeaveRequest;
import com.VentureBiz.VenureBiz_Hr.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface LeaveRepository extends JpaRepository<LeaveRequest, Long> {

    // 🔹 Find all leaves for a specific employee
    List<LeaveRequest> findByEmployee(User employee);

    // 🔹 Check if employee has approved leave for a specific date
    @Query("SELECT CASE WHEN COUNT(l) > 0 THEN TRUE ELSE FALSE END " +
           "FROM LeaveRequest l " +
           "WHERE l.employee = :user " +
           "AND l.leaveStatus = com.VentureBiz.VenureBiz_Hr.model.LeaveRequest$LeaveStatus.APPROVED " +
           "AND :date BETWEEN l.startDate AND l.endDate")
    boolean existsApprovedLeaveForDate(@Param("user") User user,
                                       @Param("date") LocalDate date);

    // 🔹 Count approved sick leaves for reports
    @Query("SELECT COUNT(l) FROM LeaveRequest l WHERE l.employee = :user " +
           "AND l.leaveType = com.VentureBiz.VenureBiz_Hr.model.LeaveRequest$LeaveType.SICK " +
           "AND l.leaveStatus = com.VentureBiz.VenureBiz_Hr.model.LeaveRequest$LeaveStatus.APPROVED " +
           "AND YEAR(l.startDate) = :year AND MONTH(l.startDate) = :month")
    long countApprovedSickLeaves(@Param("user") User user,
                                 @Param("year") int year,
                                 @Param("month") int month);
    
    
    
}
