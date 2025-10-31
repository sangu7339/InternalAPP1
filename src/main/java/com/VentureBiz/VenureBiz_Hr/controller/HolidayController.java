package com.VentureBiz.VenureBiz_Hr.controller;

import com.VentureBiz.VenureBiz_Hr.model.Holiday;
import com.VentureBiz.VenureBiz_Hr.service.HolidayService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/hr/holidays")
@CrossOrigin(origins = "http://localhost:5174")
public class HolidayController {

    private final HolidayService holidayService;

    public HolidayController(HolidayService holidayService) {
        this.holidayService = holidayService;
    }

    @GetMapping
    public List<Holiday> getAllHolidays() {
        return holidayService.getAllHolidays();
    }

    @PostMapping
    public Holiday addHoliday(@RequestBody Holiday holiday) {
        return holidayService.addHoliday(holiday);
    }

    @DeleteMapping("/{id}")
    public void deleteHoliday(@PathVariable Long id) {
        holidayService.deleteHoliday(id);
    }
}
