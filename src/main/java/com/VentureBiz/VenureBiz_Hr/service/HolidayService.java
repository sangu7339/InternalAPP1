package com.VentureBiz.VenureBiz_Hr.service;

import com.VentureBiz.VenureBiz_Hr.model.Holiday;
import com.VentureBiz.VenureBiz_Hr.repository.HolidayRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class HolidayService {

    private final HolidayRepository holidayRepository;

    public HolidayService(HolidayRepository holidayRepository) {
        this.holidayRepository = holidayRepository;
    }

    public List<Holiday> getAllHolidays() {
        return holidayRepository.findAll();
    }

    public Holiday addHoliday(Holiday holiday) {
        return holidayRepository.save(holiday);
    }

    public void deleteHoliday(Long id) {
        holidayRepository.deleteById(id);
    }
}
