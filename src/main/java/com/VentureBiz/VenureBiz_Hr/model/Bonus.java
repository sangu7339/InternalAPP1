package com.VentureBiz.VenureBiz_Hr.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Bonus {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	 @ManyToOne
	    @JoinColumn(name = "employee_id")
	    private Employee employee;
	 
	 private long Incentives;
	 
	 @Column(nullable = false)
	    private LocalDate startDate;

}
