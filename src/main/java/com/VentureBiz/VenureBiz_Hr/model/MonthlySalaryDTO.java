package com.VentureBiz.VenureBiz_Hr.model;

import java.time.YearMonth;

public class MonthlySalaryDTO {
    private Long id;
    private Employee employee;
    private YearMonth month;
    private double basic;
    private double flexibleBenefitPlan;
    private double specialAllowance;
    private double pfContributionEmployer;
    private double professionalTax;
    private double grossSalary;
    private double netSalary;
    private long presentDays;
    private long sickLeaves;
    private double payableDays;
    private Status status;
}

