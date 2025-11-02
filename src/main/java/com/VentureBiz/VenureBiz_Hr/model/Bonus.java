package com.VentureBiz.VenureBiz_Hr.model;

import java.time.LocalDate;
import java.time.YearMonth;

import jakarta.persistence.*;
import lombok.*;

import com.VentureBiz.VenureBiz_Hr.config.YearMonthAttributeConverter;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "bonuses")
public class Bonus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // ✅ Use Long to match Employee

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    private long incentives;

    @Column(nullable = false)
    private LocalDate startDate; // ✅ make sure this matches exactly

    @Convert(converter = YearMonthAttributeConverter.class)
    @Column(nullable = false)
    private YearMonth month; // ✅ e.g., "2025-10"
}
