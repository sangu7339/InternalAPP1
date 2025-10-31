package com.VentureBiz.VenureBiz_Hr.controller;

import com.VentureBiz.VenureBiz_Hr.model.Holiday;
import com.VentureBiz.VenureBiz_Hr.service.HolidayService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/employee/holidays")
@CrossOrigin(origins = "http://localhost:5174")
public class EmpHolidayController {

    private final HolidayService holidayService;

    public EmpHolidayController(HolidayService holidayService) {
        this.holidayService = holidayService;
    }

    @GetMapping
    public List<Holiday> getAllHolidays() {
        return holidayService.getAllHolidays();
    }
}
