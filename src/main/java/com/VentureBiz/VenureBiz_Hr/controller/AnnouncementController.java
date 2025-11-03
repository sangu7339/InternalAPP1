//package com.VentureBiz.VenureBiz_Hr.controller;
//
//import com.VentureBiz.VenureBiz_Hr.model.*;
//import com.VentureBiz.VenureBiz_Hr.repository.*;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.*;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@RestController
//@RequestMapping("/api/announcements")
//@RequiredArgsConstructor
//@CrossOrigin(origins = "http://localhost:5174")
//public class AnnouncementController {
//
//    private final AnnouncementRepository announcementRepository;
//    private final AnnouncementViewRepository announcementViewRepository;
//    private final UserRepository userRepository;
//
//    // ✅ HR creates announcement
//    @PostMapping("/create")
//    @PreAuthorize("hasRole('HR')")
//    public Announcement createAnnouncement(@RequestBody Announcement announcement,
//                                           @RequestParam("hrEmail") String hrEmail) {
//        User hr = userRepository.findByEmail(hrEmail)
//                .orElseThrow(() -> new RuntimeException("HR not found"));
//        announcement.setCreatedBy(hr);
//        announcement.setCreatedAt(LocalDateTime.now());
//        return announcementRepository.save(announcement);
//    }
//
//    // ✅ Get all announcements (for HR & Employees)
//    @GetMapping("/all")
//    @PreAuthorize("hasAnyRole('HR','EMPLOYEE')")
//    public List<Announcement> getAllAnnouncements() {
//        return announcementRepository.findAllByOrderByCreatedAtDesc();
//    }
//
//    // ✅ Count unseen announcements for a specific user
//    @GetMapping("/unseen-count")
//    @PreAuthorize("hasAnyRole('EMPLOYEE','HR')")
//    public long getUnseenCount(@RequestParam("email") String email) {
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//        List<Announcement> all = announcementRepository.findAll();
//
//        List<Long> seenIds = announcementViewRepository.findByUser(user)
//                .stream()
//                .map(v -> v.getAnnouncement().getId())
//                .collect(Collectors.toList());
//
//        return all.stream()
//                .filter(a -> !seenIds.contains(a.getId()))
//                .count();
//    }
//
//    // ✅ Mark all announcements as seen for a user
//    @PostMapping("/mark-seen")
//    @PreAuthorize("hasAnyRole('EMPLOYEE','HR')")
//    public String markAllSeen(@RequestParam("email") String email) {
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//        List<Announcement> all = announcementRepository.findAll();
//
//        for (Announcement a : all) {
//            if (announcementViewRepository.findByUserAndAnnouncement(user, a).isEmpty()) {
//                AnnouncementView view = new AnnouncementView();
//                view.setUser(user);
//                view.setAnnouncement(a);
//                view.setViewedAt(LocalDateTime.now());
//                announcementViewRepository.save(view);
//            }
//        }
//        return "All announcements marked as seen";
//    }
//
////    // ✅ HR deletes announcement
////    @DeleteMapping("/{id}")
////    @PreAuthorize("hasRole('HR')")
////    public String deleteAnnouncement(@PathVariable Long id) {
////        Announcement announcement = announcementRepository.findById(id)
////                .orElseThrow(() -> new RuntimeException("Announcement not found"));
////        announcementRepository.delete(announcement);
////        return "Announcement deleted successfully";
////    }
//    @DeleteMapping("/{id}")
//    @PreAuthorize("hasRole('HR')")
//    public String deleteAnnouncement(@PathVariable Long id) {
//        Announcement announcement = announcementRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Announcement not found"));
//
//        // Delete related AnnouncementViews first to avoid foreign key constraint issues
//        List<AnnouncementView> relatedViews = announcementViewRepository.findByAnnouncement(announcement);
//        announcementViewRepository.deleteAll(relatedViews);
//
//        announcementRepository.delete(announcement);
//        return "Announcement deleted successfully";
//    }
//
//}
package com.VentureBiz.VenureBiz_Hr.controller;

import com.VentureBiz.VenureBiz_Hr.model.*;
import com.VentureBiz.VenureBiz_Hr.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/announcements")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5174")
public class AnnouncementController {

    private final AnnouncementRepository announcementRepository;
    private final AnnouncementViewRepository announcementViewRepository;
    private final UserRepository userRepository;

    // ✅ Custom Exception for cleaner error handling
    @ResponseStatus(HttpStatus.NOT_FOUND)
    static class ResourceNotFoundException extends RuntimeException {
        public ResourceNotFoundException(String message) {
            super(message);
        }
    }

    // ✅ HR creates announcement
    @PostMapping("/create")
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<?> createAnnouncement(@RequestBody Announcement announcement,
                                                @RequestParam("hrEmail") String hrEmail) {
        try {
            User hr = userRepository.findByEmail(hrEmail)
                    .orElseThrow(() -> new ResourceNotFoundException("HR not found"));
            announcement.setCreatedBy(hr);
            announcement.setCreatedAt(LocalDateTime.now());
            Announcement saved = announcementRepository.save(announcement);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to create announcement: " + e.getMessage());
        }
    }

    // ✅ Get all announcements (for HR & Employees)
    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('HR','EMPLOYEE')")
    public ResponseEntity<List<Announcement>> getAllAnnouncements() {
        List<Announcement> announcements = announcementRepository.findAllByOrderByCreatedAtDesc();
        return ResponseEntity.ok(announcements);
    }

    // ✅ Count unseen announcements for a specific user
    @GetMapping("/unseen-count")
    @PreAuthorize("hasAnyRole('EMPLOYEE','HR')")
    public ResponseEntity<Long> getUnseenCount(@RequestParam("email") String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Announcement> all = announcementRepository.findAll();
        List<Long> seenIds = announcementViewRepository.findByUser(user)
                .stream()
                .map(v -> v.getAnnouncement().getId())
                .collect(Collectors.toList());

        long unseenCount = all.stream()
                .filter(a -> !seenIds.contains(a.getId()))
                .count();

        return ResponseEntity.ok(unseenCount);
    }

    // ✅ Mark all announcements as seen for a user
    @PostMapping("/mark-seen")
    @PreAuthorize("hasAnyRole('EMPLOYEE','HR')")
    public ResponseEntity<String> markAllSeen(@RequestParam("email") String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Announcement> all = announcementRepository.findAll();

        for (Announcement a : all) {
            if (announcementViewRepository.findByUserAndAnnouncement(user, a).isEmpty()) {
                AnnouncementView view = new AnnouncementView();
                view.setUser(user);
                view.setAnnouncement(a);
                view.setViewedAt(LocalDateTime.now());
                announcementViewRepository.save(view);
            }
        }

        return ResponseEntity.ok("All announcements marked as seen");
    }

    // ✅ HR deletes announcement safely
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<String> deleteAnnouncement(@PathVariable Long id) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Announcement not found"));

        // 🧩 Delete related AnnouncementView records first
        List<AnnouncementView> relatedViews = announcementViewRepository.findByAnnouncement(announcement);
        if (!relatedViews.isEmpty()) {
            announcementViewRepository.deleteAll(relatedViews);
        }

        // ✅ Now delete the announcement safely
        announcementRepository.delete(announcement);

        return ResponseEntity.ok("Announcement deleted successfully");
    }
}

