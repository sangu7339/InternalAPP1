package com.VentureBiz.VenureBiz_Hr.repository;

import com.VentureBiz.VenureBiz_Hr.model.Employee;
import com.VentureBiz.VenureBiz_Hr.model.MonthlySalary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

public interface MonthlySalaryRepository extends JpaRepository<MonthlySalary, Long> {

    Optional<MonthlySalary> findByEmployeeAndMonth(Employee employee, YearMonth month);

    List<MonthlySalary> findByMonth(YearMonth month);

    List<MonthlySalary> findByEmployee(Employee employee);
}
