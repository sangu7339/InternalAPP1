package com.VentureBiz.VenureBiz_Hr.repository;

import com.VentureBiz.VenureBiz_Hr.model.Employee;
import com.VentureBiz.VenureBiz_Hr.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // Find employee by linked user's email
    Optional<Employee> findByUser_Email(String email);

    // Find employee by Employee ID
    Optional<Employee> findByEmployeeId(String employeeId);

    // Find employee by User object
    Optional<Employee> findByUser(User user);

    // Optional: keep findByUserEmail for compatibility (can be removed if unused)
    Optional<Employee> findByUserEmail(String email);
}
