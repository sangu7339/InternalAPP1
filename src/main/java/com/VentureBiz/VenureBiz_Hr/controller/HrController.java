//package com.VentureBiz.VenureBiz_Hr.controller;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import com.VentureBiz.VenureBiz_Hr.model.Employee;
//import com.VentureBiz.VenureBiz_Hr.model.EmployeeProfileDTO;
//import com.VentureBiz.VenureBiz_Hr.model.User;
//import com.VentureBiz.VenureBiz_Hr.repository.EmployeeRepository;
//import com.VentureBiz.VenureBiz_Hr.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//
//import java.time.LocalDate;
//import java.util.List;
//@CrossOrigin(origins = "http://localhost:5173") // match frontend
//@RestController
//@RequestMapping("/api/hr")
//@RequiredArgsConstructor
//public class HrController {
//
//    private final EmployeeRepository employeeRepository;
//    private final UserRepository userRepository;
//    private final PasswordEncoder passwordEncoder;
//
//    // ✅ Get all employees
//    @GetMapping("/employees")
//    @PreAuthorize("hasRole('HR')")
//    public List<Employee> getAllEmployees() {
//        return employeeRepository.findAll();
//    }
//
//    // ✅ Add new employee
//    @PostMapping("/employees")
//    @PreAuthorize("hasRole('HR')")
//    public ResponseEntity<?> addEmployee(@RequestBody Employee employee) {
//
//        User user = resolveUser(employee.getUser());
//
//        if (employeeRepository.findByUser_Email(user.getEmail()).isPresent()) {
//            return ResponseEntity.status(409).body("⚠️ Employee already exists for user: " + user.getEmail());
//        }
//
//        employee.setUser(user);
//
//        // Default Date of Joining to today if not provided
//        if (employee.getDateOfJoining() == null) {
//            employee.setDateOfJoining(LocalDate.now());
//        }
//
//        Employee saved = employeeRepository.save(employee);
//        return ResponseEntity.ok(saved);
//    }
//
//    // ✅ Update employee
//    @PutMapping("/employees/{id}")
//    @PreAuthorize("hasRole('HR')")
//    public ResponseEntity<?> updateEmployee(@PathVariable Long id, @RequestBody Employee updated) {
//
//        Employee existing = employeeRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + id));
//
//        existing.setEmployeeId(updated.getEmployeeId());
//        existing.setName(updated.getName());
//        existing.setDepartment(updated.getDepartment());
//        existing.setDeptRole(updated.getDeptRole());
//        existing.setStatus(updated.getStatus());
//
//        // ✅ Update Date of Joining
//        if (updated.getDateOfJoining() != null) {
//            existing.setDateOfJoining(updated.getDateOfJoining());
//        }
//
//        if (updated.getUser() != null) {
//            String email = updated.getUser().getEmail();
//            User user = userRepository.findByEmail(email)
//                    .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
//
//            if (updated.getUser().getPassword() != null && !updated.getUser().getPassword().isBlank()) {
//                user.setPassword(passwordEncoder.encode(updated.getUser().getPassword()));
//                userRepository.save(user);
//            }
//
//            existing.setUser(user);
//        }
//
//        Employee saved = employeeRepository.save(existing);
//        return ResponseEntity.ok(saved);
//    }
//
//    // ✅ Delete employee
//    @DeleteMapping("/employees/{id}")
//    @PreAuthorize("hasRole('HR')")
//    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
//        if (!employeeRepository.existsById(id)) {
//            return ResponseEntity.status(404).body("❌ Employee not found with ID: " + id);
//        }
//
//        employeeRepository.deleteById(id);
//        return ResponseEntity.ok("✅ Employee deleted successfully");
//    }
//
//    // Helper: resolve user by ID or email
//    private User resolveUser(User userInput) {
//        if (userInput == null) {
//            throw new RuntimeException("User information must be provided");
//        }
//
//        if (userInput.getId() != null) {
//            return userRepository.findById(userInput.getId())
//                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + userInput.getId()));
//        } else if (userInput.getEmail() != null) {
//            return userRepository.findByEmail(userInput.getEmail())
//                    .orElseThrow(() -> new RuntimeException("User not found with email: " + userInput.getEmail()));
//        } else {
//            throw new RuntimeException("User id or email must be provided");
//        }
//    }
//    
//
//
//}
package com.VentureBiz.VenureBiz_Hr.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.VentureBiz.VenureBiz_Hr.model.Employee;
import com.VentureBiz.VenureBiz_Hr.model.EmployeeProfileDTO;
import com.VentureBiz.VenureBiz_Hr.model.User;
import com.VentureBiz.VenureBiz_Hr.repository.EmployeeRepository;
import com.VentureBiz.VenureBiz_Hr.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173") // match frontend
@RestController
@RequestMapping("/api/hr")
@RequiredArgsConstructor
public class HrController {

    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // ✅ Get all employees
    @GetMapping("/employees")
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<?> getAllEmployees() {
        try {
            List<Employee> employees = employeeRepository.findAll();
            return ResponseEntity.ok(employees);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ Failed to fetch employees: " + e.getMessage());
        }
    }

    // ✅ Add new employee
//    @PostMapping("/employees")
//    @PreAuthorize("hasRole('HR')")
//    public ResponseEntity<?> addEmployee(@RequestBody Employee employee) {
//        try {
//            User user = resolveUser(employee.getUser());
//
//            if (employeeRepository.findByUser_Email(user.getEmail()).isPresent()) {
//                return ResponseEntity.status(409)
//                        .body("⚠️ Employee already exists for user: " + user.getEmail());
//            }
//
//            employee.setUser(user);
//
//            if (employee.getDateOfJoining() == null) {
//                employee.setDateOfJoining(LocalDate.now());
//            }
//
//            Employee saved = employeeRepository.save(employee);
//            return ResponseEntity.ok(saved);
//        } catch (RuntimeException e) {
//            return ResponseEntity.badRequest()
//                    .body("⚠️ " + e.getMessage());
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("❌ Failed to add employee: " + e.getMessage());
//        }
//    }

    // ✅ Update employee
    @PutMapping("/employees/{id}")
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<?> updateEmployee(@PathVariable Long id, @RequestBody Employee updated) {
        try {
            Employee existing = employeeRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + id));

            existing.setEmployeeId(updated.getEmployeeId());
            existing.setName(updated.getName());
            existing.setDepartment(updated.getDepartment());
            existing.setDeptRole(updated.getDeptRole());
            existing.setStatus(updated.getStatus());

            if (updated.getDateOfJoining() != null) {
                existing.setDateOfJoining(updated.getDateOfJoining());
            }

            if (updated.getUser() != null) {
                String email = updated.getUser().getEmail();
                User user = userRepository.findByEmail(email)
                        .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

                if (updated.getUser().getPassword() != null && !updated.getUser().getPassword().isBlank()) {
                    user.setPassword(passwordEncoder.encode(updated.getUser().getPassword()));
                    userRepository.save(user);
                }

                existing.setUser(user);
            }

            Employee saved = employeeRepository.save(existing);
            return ResponseEntity.ok(saved);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body("⚠️ " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ Failed to update employee: " + e.getMessage());
        }
    }
//    @PostMapping("/employees")
//    @PreAuthorize("hasRole('HR')")
//    public ResponseEntity<?> addEmployee(@RequestBody Employee employee) {
//        try {
//            User userInput = employee.getUser();
//
//            if (userInput == null || userInput.getEmail() == null || userInput.getEmail().isBlank()) {
//                return ResponseEntity.badRequest().body("⚠️ Employee must have an email for user account creation.");
//            }
//
//            // 🔹 Check if user already exists
//            User user = userRepository.findByEmail(userInput.getEmail()).orElse(null);
//
//            if (user == null) {
//                // 🔹 Create new user if not found
//                user = new User();
//                user.setEmail(userInput.getEmail());
//                user.setRole(com.VentureBiz.VenureBiz_Hr.model.Role.EMPLOYEE);
//
//                // 🔹 Build default password = name + email (if not provided)
//                String rawPassword;
//                if (userInput.getPassword() != null && !userInput.getPassword().isBlank()) {
//                    rawPassword = userInput.getPassword();
//                } else {
//                    String namePart = (employee.getName() != null) ? employee.getName().replaceAll("\\s+", "") : "User";
//                    rawPassword = namePart + userInput.getEmail();
//                }
//
//                user.setPassword(passwordEncoder.encode(rawPassword));
//                userRepository.save(user);
//            } else if (employeeRepository.findByUser_Email(user.getEmail()).isPresent()) {
//                return ResponseEntity.status(409)
//                        .body("⚠️ Employee already exists for user: " + user.getEmail());
//            }
//
//            // 🔹 Link user to employee
//            employee.setUser(user);
//
//            // Default date of joining
//            if (employee.getDateOfJoining() == null) {
//                employee.setDateOfJoining(LocalDate.now());
//            }
//
//            // Default status
//            if (employee.getStatus() == null) {
//                employee.setStatus(com.VentureBiz.VenureBiz_Hr.model.Status.ACTIVE);
//            }
//
//            Employee saved = employeeRepository.save(employee);
//
//            return ResponseEntity.ok(Map.of(
//                    "message", "✅ Employee and user account created successfully.",
//                    "employeeId", saved.getEmployeeId(),
//                    "userEmail", user.getEmail()
//            ));
//
//        } catch (RuntimeException e) {
//            return ResponseEntity.badRequest().body("⚠️ " + e.getMessage());
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("❌ Failed to add employee: " + e.getMessage());
//        }
//    }
    @PostMapping("/employees")
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<?> addEmployee(@RequestBody Employee employee) {
        try {
            User userInput = employee.getUser();

            if (userInput == null || userInput.getEmail() == null || userInput.getEmail().isBlank()) {
                return ResponseEntity.badRequest().body("⚠️ Employee must have an email for user account creation.");
            }

            // 🔹 Check if user already exists
            User user = userRepository.findByEmail(userInput.getEmail()).orElse(null);

            if (user == null) {
                // 🔹 Create new user if not found
                user = new User();
                user.setEmail(userInput.getEmail());
                user.setRole(com.VentureBiz.VenureBiz_Hr.model.Role.EMPLOYEE);

                // ✅ Default password is the employee's email
                String password = userInput.getPassword();
                if (password == null || password.isBlank()) {
                    password = userInput.getEmail();
                }

                user.setPassword(passwordEncoder.encode(password));
                userRepository.save(user);
            } else if (employeeRepository.findByUser_Email(user.getEmail()).isPresent()) {
                return ResponseEntity.status(409)
                        .body("⚠️ Employee already exists for user: " + user.getEmail());
            }

            // 🔹 Link user to employee
            employee.setUser(user);

            // Default date of joining
            if (employee.getDateOfJoining() == null) {
                employee.setDateOfJoining(LocalDate.now());
            }

            // Default status
            if (employee.getStatus() == null) {
                employee.setStatus(com.VentureBiz.VenureBiz_Hr.model.Status.ACTIVE);
            }

            Employee saved = employeeRepository.save(employee);

            return ResponseEntity.ok(Map.of(
                    "message", "✅ Employee and user account created successfully.",
                    "employeeId", saved.getEmployeeId(),
                    "userEmail", user.getEmail()
            ));

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("⚠️ " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ Failed to add employee: " + e.getMessage());
        }
    }


    // ✅ Delete employee
    @DeleteMapping("/employees/{id}")
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
        try {
            if (!employeeRepository.existsById(id)) {
                return ResponseEntity.status(404)
                        .body("❌ Employee not found with ID: " + id);
            }

            employeeRepository.deleteById(id);
            return ResponseEntity.ok("✅ Employee deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ Failed to delete employee: " + e.getMessage());
        }
    }

    // ✅ Helper method
    private User resolveUser(User userInput) {
        if (userInput == null) {
            throw new RuntimeException("User information must be provided");
        }

        if (userInput.getId() != null) {
            return userRepository.findById(userInput.getId())
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + userInput.getId()));
        } else if (userInput.getEmail() != null) {
            return userRepository.findByEmail(userInput.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found with email: " + userInput.getEmail()));
        } else {
            throw new RuntimeException("User id or email must be provided");
        }
    }
}
