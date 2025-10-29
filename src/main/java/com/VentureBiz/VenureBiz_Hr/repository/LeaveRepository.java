package com.VentureBiz.VenureBiz_Hr.repository;

import com.VentureBiz.VenureBiz_Hr.model.LeaveRequest;
import com.VentureBiz.VenureBiz_Hr.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LeaveRepository extends JpaRepository<LeaveRequest, Long> {

    // Find all leaves by employee
    List<LeaveRequest> findByEmployee(User employee);

    // Count approved sick leaves for a user in a specific month
    @Query("SELECT COUNT(l) FROM LeaveRequest l WHERE l.employee = :user " +
            "AND l.leaveType = 'SICK' AND l.leaveStatus = 'APPROVED' " +
            "AND YEAR(l.startDate) = :year AND MONTH(l.startDate) = :month")
    long countApprovedSickLeaves(@Param("user") User user,
                                 @Param("year") int year,
                                 @Param("month") int month);
}
