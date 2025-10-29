package com.VentureBiz.VenureBiz_Hr.repository;

import com.VentureBiz.VenureBiz_Hr.model.Employee;
import com.VentureBiz.VenureBiz_Hr.model.SalaryPackage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SalaryPackageRepository extends JpaRepository<SalaryPackage, Long> {
    Optional<SalaryPackage> findByEmployee(Employee employee);
}
