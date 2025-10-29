package com.VentureBiz.VenureBiz_Hr.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SalaryPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne
    @JoinColumn(name = "employee_id", nullable = false, unique = true)
    private Employee employee;

    private double basic;
    private double flexibleBenefitPlan;
    private double specialAllowance;
    private double pfContributionEmployer;
    private double professionalTax;
    private double totalCostToCompany;

    // 🏦 Banking details
    @Column(length = 100)
    private String bankName;

    @Column(length = 30)
    private String accountNumber;

    // 🧾 Compliance and identification details
    @Column(length = 30)
    private String pfNumber;          // Provident Fund Number

    @Column(length = 30)
    private String uanNumber;         // Universal Account Number

    @Column(length = 30)
    private String esiNumber;         // Employee State Insurance Number

    @Column(length = 15)
    private String panNumber;         // Permanent Account Number

    // 🚫 Leave details
    private double lop;               // Loss of Pay (in days or amount)
}
