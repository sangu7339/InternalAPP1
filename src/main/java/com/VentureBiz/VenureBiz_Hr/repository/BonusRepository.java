package com.VentureBiz.VenureBiz_Hr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.VentureBiz.VenureBiz_Hr.model.Bonus;
import com.VentureBiz.VenureBiz_Hr.model.Employee;

public interface BonusRepository extends JpaRepository<Bonus, Long> {
    List<Bonus> findByEmployee(Employee employee);
}
