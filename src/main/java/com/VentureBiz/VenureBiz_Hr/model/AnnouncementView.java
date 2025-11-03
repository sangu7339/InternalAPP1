package com.VentureBiz.VenureBiz_Hr.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class AnnouncementView {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Announcement announcement;

    @ManyToOne(optional = false)
    private User user;

    private LocalDateTime viewedAt;
}
