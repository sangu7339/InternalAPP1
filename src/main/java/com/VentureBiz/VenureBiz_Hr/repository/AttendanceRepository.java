package com.VentureBiz.VenureBiz_Hr.repository;

import com.VentureBiz.VenureBiz_Hr.model.Attendance;
import com.VentureBiz.VenureBiz_Hr.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    // Get attendance for a specific user on a specific date
    Optional<Attendance> findByUserAndDate(User user, LocalDate date);

    // Get all attendance for a user
    List<Attendance> findByUser(User user);

    // Get all attendance for a user in a specific month and year
    @Query("SELECT a FROM Attendance a WHERE a.user = :user AND YEAR(a.date) = :year AND MONTH(a.date) = :month")
    List<Attendance> findByUserAndMonth(@Param("user") User user,
                                        @Param("year") int year,
                                        @Param("month") int month);

    // Get all attendance for all users in a specific month and year
    @Query("SELECT a FROM Attendance a WHERE YEAR(a.date) = :year AND MONTH(a.date) = :month")
    List<Attendance> findByMonth(@Param("year") int year,
                                 @Param("month") int month);

    // Count attendance records for a user with a specific status in a given month
    @Query("SELECT COUNT(a) FROM Attendance a WHERE a.user = :user AND a.status = :status " +
           "AND YEAR(a.date) = :year AND MONTH(a.date) = :month")
    long countByUserAndStatusAndMonth(@Param("user") User user,
                                      @Param("status") String status,
                                      @Param("year") int year,
                                      @Param("month") int month);
}
