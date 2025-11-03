//package com.VentureBiz.VenureBiz_Hr.repository;
//
//import com.VentureBiz.VenureBiz_Hr.model.Announcement;
//import com.VentureBiz.VenureBiz_Hr.model.AnnouncementView;
//import com.VentureBiz.VenureBiz_Hr.model.User;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.List;
//import java.util.Optional;
//
//public interface AnnouncementViewRepository extends JpaRepository<AnnouncementView, Long> {
//    List<AnnouncementView> findByUser(User user);
//    Optional<AnnouncementView> findByUserAndAnnouncement(User user, Announcement announcement);
//    long countByUserAndAnnouncementIn(User user, List<Announcement> announcements);
//  //  List<AnnouncementView> findByUser(User user);
//
//    // 🔹 Find all views for a given announcement
//    List<AnnouncementView> findByAnnouncement(Announcement announcement);
//
//    // 🔹 Find specific view for a user-announcement pair
//   // List<AnnouncementView> findByUserAndAnnouncement(User user, Announcement announcement);
//
//    // (optional) Single view lookup
//    Optional<AnnouncementView> findOneByUserAndAnnouncement(User user, Announcement announcement);
//}

package com.VentureBiz.VenureBiz_Hr.repository;

import com.VentureBiz.VenureBiz_Hr.model.Announcement;
import com.VentureBiz.VenureBiz_Hr.model.AnnouncementView;
import com.VentureBiz.VenureBiz_Hr.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AnnouncementViewRepository extends JpaRepository<AnnouncementView, Long> {

    // 🔹 Find all announcement views for a specific user
    List<AnnouncementView> findByUser(User user);

    // 🔹 Find all views related to a specific announcement
    List<AnnouncementView> findByAnnouncement(Announcement announcement);

    // 🔹 Find a specific view for a user-announcement pair (returns Optional)
    Optional<AnnouncementView> findByUserAndAnnouncement(User user, Announcement announcement);

    // 🔹 Count how many of a given list of announcements a user has seen
    long countByUserAndAnnouncementIn(User user, List<Announcement> announcements);
}

