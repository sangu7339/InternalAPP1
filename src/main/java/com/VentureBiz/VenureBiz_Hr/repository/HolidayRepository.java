package com.VentureBiz.VenureBiz_Hr.repository;

import com.VentureBiz.VenureBiz_Hr.model.Holiday;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;

public interface HolidayRepository extends JpaRepository<Holiday, Long> {

    // 🔹 Check if a date is a holiday
    @Query("SELECT CASE WHEN COUNT(h) > 0 THEN TRUE ELSE FALSE END " +
           "FROM Holiday h WHERE h.date = :date")
    boolean existsByDate(@Param("date") LocalDate date);
}
