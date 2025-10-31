//package com.VentureBiz.VenureBiz_Hr.controller;
//
//import com.VentureBiz.VenureBiz_Hr.model.Employee;
//import com.VentureBiz.VenureBiz_Hr.model.User;
//import com.VentureBiz.VenureBiz_Hr.repository.EmployeeRepository;
//import com.VentureBiz.VenureBiz_Hr.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.*;
//import java.util.stream.Collectors;
//
//@RestController
//@RequestMapping("/api/hr")
//@CrossOrigin(origins = "http://localhost:5174")  // Allow frontend requests
//public class UserEmployeeController {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private EmployeeRepository employeeRepository;
//
//    /**
//     * ✅ Fetch all users who are not yet linked as employees.
//     * Only accessible by users with the HR role.
//     */
//    @PreAuthorize("hasRole('HR')")
//    @GetMapping("/users-not-employees")
//    public Object getUsersNotEmployees() {
//        try {
//            // Step 1: Get all users and employees
//            List<User> allUsers = userRepository.findAll();
//            List<Employee> allEmployees = employeeRepository.findAll();
//
//            // Step 2: Get the set of User IDs already linked to Employees
//            Set<Long> employeeUserIds = allEmployees.stream()
//                    .map(emp -> emp.getUser().getId())
//                    .collect(Collectors.toSet());
//
//            // Step 3: Filter out users who are already employees
//            List<User> usersNotEmployees = allUsers.stream()
//                    .filter(user -> !employeeUserIds.contains(user.getId()))
//                    .collect(Collectors.toList());
//
//            // Step 4: Handle empty case
//            if (usersNotEmployees.isEmpty()) {
//                return Map.of("message", "No users found who are not employees.");
//            }
//
//            // Step 5: Return JSON list
//            return usersNotEmployees;
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            return Map.of(
//                    "error", "Error fetching users not in employee list.",
//                    "details", e.getMessage()
//            );
//        }
//    }
//}

package com.VentureBiz.VenureBiz_Hr.controller;

import com.VentureBiz.VenureBiz_Hr.model.Employee;
import com.VentureBiz.VenureBiz_Hr.model.Role;
import com.VentureBiz.VenureBiz_Hr.model.User;
import com.VentureBiz.VenureBiz_Hr.repository.EmployeeRepository;
import com.VentureBiz.VenureBiz_Hr.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/hr")
@CrossOrigin(origins = "http://localhost:5174") // allow frontend calls
public class UserEmployeeController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    /**
     * ✅ GET /api/hr/users-not-employees
     * Returns all users who:
     *  - are NOT employees
     *  - do NOT have the HR role
     *  Accessible only by users with HR role.
     */
    @PreAuthorize("hasRole('HR')")
    @GetMapping("/users-not-employees")
    public Object getUsersNotEmployees() {
        try {
            // Step 1: Get all users and employees
            List<User> allUsers = userRepository.findAll();
            List<Employee> allEmployees = employeeRepository.findAll();

            // Step 2: Collect IDs of users already assigned as employees
            Set<Long> employeeUserIds = allEmployees.stream()
                    .map(emp -> emp.getUser().getId())
                    .collect(Collectors.toSet());

            // Step 3: Filter users who are not employees and not HR
            List<User> usersNotEmployees = allUsers.stream()
                    .filter(user -> !employeeUserIds.contains(user.getId()))
                    .filter(user -> user.getRole() != Role.HR) // <-- exclude HRs
                    .collect(Collectors.toList());

            // Step 4: Handle empty case
            if (usersNotEmployees.isEmpty()) {
                return Map.of("message", "No eligible users found (non-employees and non-HR).");
            }

            // Step 5: Return JSON list
            return usersNotEmployees;

        } catch (Exception e) {
            e.printStackTrace();
            return Map.of(
                    "error", "Error fetching users not in employee list.",
                    "details", e.getMessage()
            );
        }
    }
}
