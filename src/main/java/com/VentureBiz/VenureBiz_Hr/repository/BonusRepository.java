package com.VentureBiz.VenureBiz_Hr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.VentureBiz.VenureBiz_Hr.model.Bonus;

@Repository
public interface BonusRepository extends JpaRepository<Bonus, Integer> {
}
