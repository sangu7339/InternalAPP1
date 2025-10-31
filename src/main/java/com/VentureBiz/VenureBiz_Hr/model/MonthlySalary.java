package com.VentureBiz.VenureBiz_Hr.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.YearMonth;

import com.VentureBiz.VenureBiz_Hr.config.YearMonthAttributeConverter;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "monthly_salaries")
public class MonthlySalary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;
    @Convert(converter = YearMonthAttributeConverter.class)
    private YearMonth month; // e.g., 2025-10

    private double basic;
    private double flexibleBenefitPlan;
    private double specialAllowance;
    private double pfContributionEmployer;
    private double professionalTax;
    private double grossSalary;
    private double netSalary;

    private int totalWorkingDays;   // ✅ total weekdays in the month
    private int workedDays;         // ✅ actual worked days (attendance + approved leaves)

    @Enumerated(EnumType.STRING)
    private Status status;  // ✅ salary processing status

    public enum Status {
        PENDING,   // salary not generated or future month
        RUNNING,   // current month, being updated daily
        PAID       // completed and paid
    }
}
