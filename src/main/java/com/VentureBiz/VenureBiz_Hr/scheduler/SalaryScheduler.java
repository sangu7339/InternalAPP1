//package com.VentureBiz.VenureBiz_Hr.scheduler;
//
//import com.VentureBiz.VenureBiz_Hr.controller.SalaryController;
//import lombok.RequiredArgsConstructor;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//
//@Component
//@RequiredArgsConstructor
//public class SalaryScheduler {
//
//    private final SalaryController salaryController;
//
//    // Run every day at 2 AM
//    @Scheduled(cron = "0 0 2 * * ?")
//    public void updateDailySalaryStatus() {
//        salaryController.autoUpdateSalaryStatus();
//    }
//}
